// Musik latar via WebAudio (tanpa file audio), dua gaya:
// - "lullaby": melodi nursery lembut, pad + bass, 92 BPM (C - Am - F - G)
// - "8bit":    chiptune NES — lead square staccato, bass triangle kiprah
//              kuart-kuener, hi-hat noise tipis, 132 BPM
// Semua nada melodi adalah chord tone sehingga tidak ada dissonans.
// Dijadwalkan dengan lookahead scheduler agar tempo stabil (tidak jitter).

export type MusicStyle = "lullaby" | "8bit";

class BackgroundMusicManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private tone: BiquadFilterNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private timer: number | null = null;
  private enabled = false;
  private volume = 0.4;
  private style: MusicStyle = "lullaby";
  private beatIndex = 0;
  private nextBeatTime = 0;

  // Progresi & melodi yang sama dipakai kedua gaya (16 ketukan = 4 bar)
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

  private get beatDur(): number {
    return this.style === "8bit" ? 60 / 132 : 60 / 92;
  }

  private get filterFreq(): number {
    // 8-bit butuh harmonik square yang terasa; nurseri dibulatkan agar hangat.
    return this.style === "8bit" ? 5200 : 2000;
  }

  setVolume(v: number): void {
    this.volume = Math.min(1, Math.max(0, v));
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.volume * 0.5, this.ctx.currentTime, 0.1);
    }
  }

  setStyle(style: MusicStyle): void {
    if (style === this.style) return;
    this.style = style;
    if (this.tone && this.ctx) {
      this.tone.frequency.setTargetAtTime(this.filterFreq, this.ctx.currentTime, 0.05);
    }
    if (this.timer !== null && this.ctx) {
      // Sedang berputar: mulai ulang agar groove gaya baru dimulai dari awal
      clearInterval(this.timer);
      this.timer = null;
      this.beatIndex = 0;
      this.nextBeatTime = this.ctx.currentTime + 0.1;
      this.timer = window.setInterval(() => this.scheduleAhead(), 250);
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
      this.tone = this.ctx.createBiquadFilter();
      this.tone.type = "lowpass";
      this.tone.frequency.value = this.filterFreq;
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
    const beat = this.beatDur;
    while (this.nextBeatTime < now + 0.8) {
      const pos = this.beatIndex % 16;
      const bar = Math.floor(pos / 4);
      const chord = BackgroundMusicManager.CHORDS[bar];
      const t = this.nextBeatTime;

      if (this.style === "lullaby") {
        if (pos % 4 === 0) {
          this.playPad(chord.pad, t, 4 * beat);
          this.playBass(chord.bass, t);
        }
        this.playMelodyNote(BackgroundMusicManager.MELODY[bar][pos % 4], t);
      } else {
        // 8-bit: lead square kuart staccato, bass triangle kuart-kuener,
        // hi-hat noise tipis di offbeat.
        this.playChipLead(BackgroundMusicManager.MELODY[bar][pos % 4], t);
        const eighth = beat / 2;
        this.playChipBass(chord.bass, t, eighth);
        this.playChipBass(chord.bass * 1.5, t + eighth, eighth);
        this.playNoise(t + eighth, 0.03);
        if (pos % 4 === 0) this.playNoise(t, 0.05);
      }

      this.nextBeatTime += beat;
      this.beatIndex++;
    }
  }

  // ===== Gaya nurseri =====

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

  // ===== Gaya 8-bit =====

  // Lead square staccato — karakter NES. Gain dipagari agar tidak menembus telinga.
  private playChipLead(freq: number, t: number): void {
    const ctx = this.ctx;
    const dest = this.tone;
    if (!ctx || !dest) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.13, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  // Bass triangle kiprah kuart-kuener (akar & kuint) — pasangan klasik lead square.
  private playChipBass(freq: number, t: number, dur: number): void {
    const ctx = this.ctx;
    const dest = this.tone;
    if (!ctx || !dest) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 1.6);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + dur * 1.6 + 0.05);
  }

  // Hi-hat noise tipis untuk penguat ritme.
  private playNoise(t: number, peak: number): void {
    const ctx = this.ctx;
    const dest = this.tone;
    if (!ctx || !dest) return;
    if (!this.noiseBuffer) {
      const len = Math.floor(ctx.sampleRate * 0.05);
      this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const g = ctx.createGain();
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    src.connect(g);
    g.connect(dest);
    src.start(t);
    src.stop(t + 0.06);
  }
}

export const music = new BackgroundMusicManager();
