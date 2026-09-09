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
  private speechEnabled = true;
  private selectedVoiceURI: string | null = null;
  private currentPersonaId: string = "ceria";

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

  public speak(text: string, customRate?: number, customPitch?: number) {
    if (!this.speechEnabled) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop previous voice
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.lang = "id-ID";

      const persona = this.getCurrentPersona();
      utterance.rate = customRate ?? persona.rate;
      utterance.pitch = customPitch ?? persona.pitch;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech errors
    }
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
