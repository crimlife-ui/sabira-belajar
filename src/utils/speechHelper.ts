// Text to Speech in Indonesian with Voice & Persona Selection for Kids

export interface VoicePersona {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  pitch: number;
  rate: number;
}

export const VOICE_PERSONAS: VoicePersona[] = [
  { id: "ceria", name: "Kakak Ceria", desc: "Nada riang, cerah, dan penuh semangat", emoji: "👧🏻", pitch: 1.2, rate: 0.95 },
  { id: "lembut", name: "Ibu Lembut", desc: "Nada tenang, ramah, dan penuh kasih sayang", emoji: "👩🏻", pitch: 1.05, rate: 0.88 },
  { id: "ramah", name: "Paman Ramah", desc: "Nada hangat, santai, dan bersahabat", emoji: "👨🏻", pitch: 0.85, rate: 0.9 },
  { id: "robot", name: "Robot Sahabat", desc: "Nada tinggi lucu kesukaan anak-anak", emoji: "🤖", pitch: 1.45, rate: 0.9 },
];

class SpeechHelper {
  private voice: SpeechSynthesisVoice | null = null;
  private englishVoice: SpeechSynthesisVoice | null = null;
  private speechEnabled = true;
  private selectedVoiceURI: string | null = null;
  private currentPersonaId: string = "ceria";
  // Nomor sesi ucapan: setiap speak()/speakSequence() baru menaikkannya agar
  // rantai bacaan lama otomatis batal tanpa perlu timer manual di komponen.
  private currentSeq = 0;

  constructor() {
    if (typeof window !== "undefined") {
      this.selectedVoiceURI = localStorage.getItem("sabira_voice_uri");
      const savedPersona = localStorage.getItem("sabira_voice_persona");
      if (savedPersona && VOICE_PERSONAS.some((p) => p.id === savedPersona)) {
        this.currentPersonaId = savedPersona;
      }

      if ("speechSynthesis" in window) {
        this.initVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => this.initVoices();
        }
        // Beberapa browser (mis. Android Chrome) mengisi daftar voice terlambat
        // dan tidak selalu memicu onvoiceschanged — polling ringan sebagai jaring aman.
        let attempts = 0;
        const tryLoad = () => {
          if (this.voice || attempts >= 10) return;
          attempts++;
          this.initVoices();
          if (!this.voice) window.setTimeout(tryLoad, 400);
        };
        if (!this.voice) window.setTimeout(tryLoad, 400);
      }
    }
  }

  public initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;

    // 1. If user previously chose a specific voice URI, use that
    if (this.selectedVoiceURI) {
      const found = voices.find((v) => v.voiceURI === this.selectedVoiceURI);
      if (found) {
        this.voice = found;
        return;
      }
    }

    // 2. Otherwise prioritize Indonesian voice
    const indonesianVoice = voices.find(
      (v) => v.lang === "id-ID" || v.lang.startsWith("id")
    );
    if (indonesianVoice) {
      this.voice = indonesianVoice;
      this.selectedVoiceURI = indonesianVoice.voiceURI;
    } else {
      this.voice = voices[0] || null;
    }

    this.pickEnglishVoice(voices);
  }

  // Voice khusus bahasa Inggris untuk modul English (tidak mengganggu
  // voice Indonesia yang dipakai persona di seluruh aplikasi).
  private pickEnglishVoice(voices: SpeechSynthesisVoice[]) {
    if (this.englishVoice && this.englishVoice.lang.startsWith("en")) return;
    const preferred =
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang.startsWith("en")) ||
      null;
    this.englishVoice = preferred;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
    return window.speechSynthesis.getVoices();
  }

  public setSelectedVoiceURI(voiceURI: string) {
    this.selectedVoiceURI = voiceURI;
    if (typeof window !== "undefined") {
      localStorage.setItem("sabira_voice_uri", voiceURI);
    }
    const voices = this.getAvailableVoices();
    const found = voices.find((v) => v.voiceURI === voiceURI);
    if (found) {
      this.voice = found;
    }
  }

  public getSelectedVoiceURI(): string | null {
    return this.selectedVoiceURI;
  }

  public setPersona(personaId: string) {
    if (VOICE_PERSONAS.some((p) => p.id === personaId)) {
      this.currentPersonaId = personaId;
      if (typeof window !== "undefined") {
        localStorage.setItem("sabira_voice_persona", personaId);
      }
    }
  }

  public getPersonaId(): string {
    return this.currentPersonaId;
  }

  public getCurrentPersona(): VoicePersona {
    return (
      VOICE_PERSONAS.find((p) => p.id === this.currentPersonaId) ||
      VOICE_PERSONAS[0]
    );
  }

  public setSpeechEnabled(enabled: boolean) {
    this.speechEnabled = enabled;
    if (!enabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isSpeechEnabled(): boolean {
    return this.speechEnabled;
  }

  // Mesin ucapan bersama: menangani cancel yang aman (iOS Safari menggulir
  // selamanya bila cancel() tepat sebelum speak(); Android Chrome menjalankan
  // cancel() secara asinkron sehingga speak() yang terlalu cepat menabrak
  // ucapan lama — suara jadi tumpang tindih/kepotong). Karena itu: hanya
  // cancel bila memang sedang bersuara, lalu beri jeda kecil sebelum mulai.
  private speakWithEnd(
    text: string,
    customRate: number | undefined,
    customPitch: number | undefined,
    onEnd?: () => void,
    isCancelled?: () => boolean
  ) {
    if (!this.speechEnabled) {
      if (onEnd) onEnd();
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      const synth = window.speechSynthesis;
      const start = () => {
        if (isCancelled && isCancelled()) return;
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) {
          utterance.voice = this.voice;
          // Samakan lang dengan voice terpilih. Memaksa "id-ID" di atas voice
          // non-Indonesia membuat Chrome di sebagian perangkat diam total.
          utterance.lang = this.voice.lang || "id-ID";
        } else {
          utterance.lang = "id-ID";
        }

        const persona = this.getCurrentPersona();
        utterance.rate = customRate ?? persona.rate;
        utterance.pitch = customPitch ?? persona.pitch;

        if (onEnd) {
          utterance.onend = onEnd;
          utterance.onerror = onEnd;
        }
        synth.speak(utterance);
      };

      if (synth.speaking || synth.pending) {
        synth.cancel();
        window.setTimeout(start, 80);
      } else {
        start();
      }
    } catch {
      // Jangan biarkan rantai bacaan macet bila speak() melempar error
      if (onEnd) onEnd();
    }
  }

  public speak(text: string, customRate?: number, customPitch?: number) {
    const mySeq = ++this.currentSeq;
    this.speakWithEnd(
      text,
      customRate,
      customPitch,
      undefined,
      () => mySeq !== this.currentSeq
    );
  }

  public stopSequence() {
    this.currentSeq++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }

  /**
   * Membaca daftar teks SATU PER SATU — menunggu ucapan sebenarnya selesai
   * (event onend) sebelum lanjut, bukan memakai timer tetap yang memotong
   * ucapan di tengah kalimat pada engine TTS yang lambat.
   * Dipakai mis. "Dengar Semua" pada Tabel Hitung.
   */
  public speakSequence(
    items: string[],
    options: {
      onIndex?: (index: number) => void;
      onDone?: () => void;
      gapMs?: number;
      rate?: number;
      pitch?: number;
    } = {}
  ): number {
    const mySeq = ++this.currentSeq;
    const gapMs = options.gapMs ?? 450;
    // Suara mati / engine tak tersedia: tetap jalankan sorotan baris agar
    // "Dengar Semua" terlihat berjalan, memakai perkiraan durasi per baris.
    const canSpeak =
      this.speechEnabled &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window;

    const step = (index: number) => {
      if (mySeq !== this.currentSeq) return;
      if (index >= items.length) {
        options.onDone?.();
        return;
      }

      const text = items[index];
      options.onIndex?.(index);

      let advanced = false;
      const advance = () => {
        if (mySeq !== this.currentSeq || advanced) return;
        advanced = true;
        window.setTimeout(() => step(index + 1), gapMs);
      };

      if (!canSpeak) {
        window.setTimeout(advance, Math.max(1200, text.length * 80));
        return;
      }

      // Jaring pengaman: kalau engine TTS macet dan onend tidak menyala,
      // lanjutkan tetap (dengan batas yang jauh lebih longgar dari durasi
      // wajar ucapan supaya engine lambat tidak terpotong).
      const watchdog = window.setTimeout(
        advance,
        Math.max(6000, text.length * 180)
      );
      this.speakWithEnd(
        text,
        options.rate,
        options.pitch,
        () => {
          window.clearTimeout(watchdog);
          advance();
        },
        () => mySeq !== this.currentSeq
      );
    };

    step(0);
    return mySeq;
  }

  public testVoice(persona?: VoicePersona) {
    const p = persona || this.getCurrentPersona();
    const testLines = [
      `Halo! Ini adalah suara ${p.name}. Ayo belajar bersama dengan ceria!`,
      `Pintar sekali! Suara ${p.name} siap menemani kamu belajar membaca dan berhitung!`,
    ];
    const text = testLines[Math.floor(Math.random() * testLines.length)];
    this.speak(text, p.rate, p.pitch);
  }

  public praise() {
    const praises = [
      "Hebat sekali!",
      "Pintar!",
      "Luar biasa!",
      "Keren banget!",
      "Wah, benar!",
      "Kamu jago!"
    ];
    const randomIndex = Math.floor(Math.random() * praises.length);
    this.speak(praises[randomIndex]);
  }

  public speakHijaiyah(name: string, harakatName?: string, sound?: string) {
    if (harakatName && sound) {
      this.speak(`${name}, berharakat ${harakatName}, dibaca ${sound}`, 0.9, 1.15);
    } else {
      this.speak(`Huruf ${name}`, 0.9, 1.15);
    }
  }

  // Bicara bahasa Inggris memakai voice en-* (fallback: voice apa pun dengan
  // lang en-US agar mesin TTS memilih aksen Inggris bila tersedia).
  public speakEnglish(text: string, customRate?: number, customPitch?: number) {
    if (!this.speechEnabled) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
      // Daftar voice bisa terisi belakangan — coba ambil lagi.
      if (!this.englishVoice) {
        this.pickEnglishVoice(window.speechSynthesis.getVoices());
      }
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.englishVoice) {
        utterance.voice = this.englishVoice;
        utterance.lang = this.englishVoice.lang;
      } else {
        utterance.lang = "en-US";
      }

      const persona = this.getCurrentPersona();
      utterance.rate = customRate ?? Math.min(persona.rate, 0.85);
      utterance.pitch = customPitch ?? persona.pitch;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech errors
    }
  }

  public praiseEnglish() {
    const praises = [
      "Great job!",
      "Well done!",
      "Excellent!",
      "Awesome!",
      "You got it!",
      "Amazing!",
    ];
    this.speakEnglish(praises[Math.floor(Math.random() * praises.length)], 0.9, 1.15);
  }

  public encourageEnglish() {
    const encourages = [
      "Try again, you can do it!",
      "Almost right! One more time!",
      "Good try! Let's try once more!",
    ];
    this.speakEnglish(encourages[Math.floor(Math.random() * encourages.length)], 0.9, 1.15);
  }

  public speakArabicNumber(arabicName: string, latinNum: number, indonesianName: string) {
    this.speak(`${arabicName}. Angka ${latinNum}, ${indonesianName}`, 0.9, 1.15);
  }

  public encourage() {
    const encourages = [
      "Yuk coba lagi, pasti bisa!",
      "Hampir benar!",
      "Coba sekali lagi ya!"
    ];
    const randomIndex = Math.floor(Math.random() * encourages.length);
    this.speak(encourages[randomIndex]);
  }
}

export const speech = new SpeechHelper();
