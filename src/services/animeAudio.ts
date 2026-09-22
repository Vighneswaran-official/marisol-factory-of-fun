// Procedural ambient sound synthesis using Web Audio API for anime comfort scenes

class AnimeAudioEngine {
  private ctx: AudioContext | null = null;
  private currentSource: { stop: () => void } | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playAmbientSound(type: string): void {
    if (this.isMuted) return;
    this.stopAmbientSound();

    try {
      this.initCtx();
      if (!this.ctx) return;

      if (type === 'rain_lofi') {
        this.playRainLofi();
      } else if (type === 'night_crickets') {
        this.playNightCrickets();
      } else if (type === 'bubbly_chimes') {
        this.playBubblyChimes();
      } else if (type === 'sparkle_fanfare') {
        this.playSparkleFanfare();
      } else {
        this.playGentleChords();
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbientSound(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch {
        // ignore
      }
      this.currentSource = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientSound();
    }
    return this.isMuted;
  }

  private playRainLofi(): void {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise for rain
      lastOut = output[i];
      output[i] *= 0.15;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    whiteNoise.start();
    this.currentSource = whiteNoise;
  }

  private playNightCrickets(): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();

    this.currentSource = osc;
  }

  private playBubblyChimes(): void {
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    let noteIdx = 0;
    const interval = setInterval(() => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = notes[noteIdx % notes.length];
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
      noteIdx++;
    }, 600);

    this.currentSource = {
      stop: () => clearInterval(interval)
    };
  }

  private playSparkleFanfare(): void {
    if (!this.ctx) return;
    const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = this.ctx!.currentTime + idx * 0.15;
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(startTime);
      osc.stop(startTime + 1.6);
    });
  }

  private playGentleChords(): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, this.ctx.currentTime); // E4
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    this.currentSource = osc;
  }
}

export const animeAudio = new AnimeAudioEngine();
