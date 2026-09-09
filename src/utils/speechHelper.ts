// Text to Speech in Indonesian for Kids

class SpeechHelper {
  private voice: SpeechSynthesisVoice | null = null;
  private speechEnabled = true;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize Indonesian voice
    const indonesianVoice = voices.find(
      (v) => v.lang === "id-ID" || v.lang.startsWith("id")
    );
    if (indonesianVoice) {
      this.voice = indonesianVoice;
    } else {
      // Fallback to any natural voice
      this.voice = voices[0] || null;
    }
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

  public speak(text: string, rate: number = 0.9, pitch: number = 1.1) {
    if (!this.speechEnabled) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop any previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.lang = "id-ID";
      utterance.rate = rate; // slightly slower for young children
      utterance.pitch = pitch; // slightly higher/warmer tone for kids
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech error
    }
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
    this.speak(praises[randomIndex], 1.0, 1.2);
  }

  public encourage() {
    const encourages = [
      "Yuk coba lagi, pasti bisa!",
      "Hampir benar!",
      "Coba sekali lagi ya!"
    ];
    const randomIndex = Math.floor(Math.random() * encourages.length);
    this.speak(encourages[randomIndex], 0.95, 1.1);
  }
}

export const speech = new SpeechHelper();
