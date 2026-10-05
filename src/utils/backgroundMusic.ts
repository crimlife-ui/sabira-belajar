// Musik latar lembut via WebAudio (tanpa file audio).
// Melodi nursery 4-bar di atas progresi C - Am - F - G; semua nada melodi
// adalah chord tone sehingga tidak ada ketegangan/dissonans.
// Dijadwalkan dengan lookahead scheduler agar tempo stabil (tidak jitter).

class BackgroundMusicManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private tone: BiquadFilterNode | null = null;
  private timer: number | null = null;
  private enabled = false;
  private volume = 0.4;
  private beatIndex = 0;
  private nextBeatTime = 0;

  // 92 BPM — jalan santai khas lagu pengantar tidur
  private static readonly BEAT = 60 / 92;

  // Melodi (Hz): tiap nada adalah anggota akor yang sedang berbunyi.
  private static readonly MELODY: number[][] = [
    [659.26, 523.25, 392.0, 523.25], // C:  E5 C5 G4 C5
    [440.0, 523.25, 659.26, 523.25], // Am: A4 C5 E5 C5
    [349.23, 440.0, 523.25, 440.0], //  F:  F4 A4 C5 A4
    [392.0, 493.88, 587.33, 493.88], // G:  G4 B4 D5 B4
  ];

  private static readonly CHORDS: { pad: number[]; bass: number }[] = [
    { pad: [261.63, 329.63, 392.0], bass: 130.81 }, // C
    { pad: [220.0, 261.63, 329.63], bass: 110.0 }, //  Am
    { pad: [174.61, 220.0, 261.63], bass: 87.31 }, //  F
    { pad: [196.0, 246.94, 293.66], bass: 98.0 }, //   G
  ];

  setVolume(v: number): void {
    this.volume = Math.min(1, Math.max(0, v));
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.volume * 0.5, this.ctx.currentTime, 0.1);
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
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume * 0.5;
      // Lowpass lembut: buang nada tajam/pedih yang bikin "seram"
      this.tone = this.ctx.createBiquadFilter();
      this.tone.type = "lowpass";
      this.tone.frequency.value = 2000;
      this.tone.Q.value = 0.4;
      this.tone.connect(this.master);
      this.master.connect(this.ctx.destination);
    }
    // Browser mengunci audio sampai ada interaksi; scheduler mencoba resume tiap tick.
    this.ctx.resume().catch(() => {});
    if (this.timer === null) {
      this.beatIndex = 0;
      this.nextBeatTime = this.ctx.currentTime + 0.15;
      this.timer = window.setInterval(() => this.scheduleAhead(), 250);
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

  // Jadwalkan semua ketukan dalam 0,8 detik ke depan — tempo konsisten tanpa drift.
  private scheduleAhead(): void {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state !== "running") {
      this.ctx.resume().catch(() => {});
      return;
    }
    const now = this.ctx.currentTime;
    const beat = BackgroundMusicManager.BEAT;
    while (this.nextBeatTime < now + 0.8) {
      const pos = this.beatIndex % 16;
      const bar = Math.floor(pos / 4);
      const chord = BackgroundMusicManager.CHORDS[bar];

      if (pos % 4 === 0) {
        this.playPad(chord.pad, this.nextBeatTime, 4 * beat);
        this.playBass(chord.bass, this.nextBeatTime);
      }
      this.playMelodyNote(BackgroundMusicManager.MELODY[bar][pos % 4], this.nextBeatTime);

      this.nextBeatTime += beat;
      this.beatIndex++;
    }
  }

  // Nada melodi: sine + sedikit triangle (kalimba hangat), attack cepat, decay halus.
  private playMelodyNote(freq: number, t: number): void {
    const ctx = this.ctx;
    const dest = this.tone;
    if (!ctx || !dest) return;

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.34, t + 0.035);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
    env.connect(dest);

    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = freq;
    o1.connect(env);

    const o2 = ctx.createOscillator();
    o2.type = "triangle";
    o2.frequency.value = freq;
    const g2 = ctx.createGain();
    g2.gain.value = 0.35;
    o2.connect(g2);
    g2.connect(env);

    o1.start(t);
    o2.start(t);
    o1.stop(t + 1.1);
    o2.stop(t + 1.1);
  }

  // Pad akor: tiga sine panjang dengan attack pelan — mengisi ruang, tidak kesepi.
  private playPad(freqs: number[], t: number, dur: number): void {
    const ctx = this.ctx;
    const dest = this.tone;
    if (!ctx || !dest) return;
    for (const f of freqs) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.05, t + 0.55);
      g.gain.setValueAtTime(0.05, t + dur - 0.8);
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      osc.connect(g);
      g.connect(dest);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    }
  }

  // Bass lembut satu nada per akor — fondasi hangat di register rendah.
  private playBass(freq: number, t: number): void {
    const ctx = this.ctx;
    const dest = this.tone;
    if (!ctx || !dest) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.13, t + 0.07);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.9);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + 2.0);
  }
}

export const music = new BackgroundMusicManager();
