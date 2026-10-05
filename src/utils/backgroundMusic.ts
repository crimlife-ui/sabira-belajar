// Musik latar lembut yang disintesis via WebAudio (tanpa file audio).
// Pola arpeggio pentatonik ala kotak musik, volume rendah, ramah anak.

class BackgroundMusicManager {
  private ctx: AudioContext | null = null;
  private gain: GainNode | null = null;
  private timer: number | null = null;
  private enabled = false;
  private volume = 0.4;
  private stepIdx = 0;

  setVolume(v: number): void {
    this.volume = Math.min(1, Math.max(0, v));
    if (this.gain && this.ctx) {
      this.gain.gain.setTargetAtTime(this.volume * 0.5, this.ctx.currentTime, 0.1);
    }
  }

  setEnabled(on: boolean): void {
    this.enabled = on;
    if (on) {
      this.start();
    } else {
      this.stop();
    }
  }

  private start(): void {
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.gain = this.ctx.createGain();
      this.gain.gain.value = this.volume * 0.5;
      this.gain.connect(this.ctx.destination);
    }
    // Browser mengunci audio sampai ada interaksi pengguna; step() akan mencoba resume.
    this.ctx.resume().catch(() => {});
    if (this.timer === null) {
      this.step();
      this.timer = window.setInterval(() => this.step(), 1250);
    }
  }

  private stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.ctx.state === "running") {
      this.ctx.suspend().catch(() => {});
    }
  }

  private step(): void {
    if (!this.enabled || !this.ctx || !this.gain) return;
    if (this.ctx.state !== "running") {
      this.ctx.resume().catch(() => {});
      return;
    }

    // Pentatonik C mayor (C4 D4 E4 G4 A4 C5 D5 E5)
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.26];
    const pattern = [0, 2, 4, 5, 4, 2, 6, 4];
    const idx = pattern[this.stepIdx % pattern.length];
    this.playNote(scale[idx], 1.8, 0.5);

    // Nada jawaban tinggi sesekali, seperti denting kotak musik
    if (this.stepIdx % 4 === 2) {
      this.playNote(scale[(idx + 2) % scale.length] * 2, 1.1, 0.22);
    }
    this.stepIdx++;
  }

  private playNote(freq: number, dur: number, peak: number): void {
    const ctx = this.ctx;
    const master = this.gain;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = ctx.currentTime;
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(peak, t + 0.06);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(env);
    env.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.1);
  }
}

export const music = new BackgroundMusicManager();
