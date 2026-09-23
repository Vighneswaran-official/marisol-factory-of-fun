// Tactile Audio & Click Sound Engine powered by Web Audio API
import type { AudioSettings } from '../types/game';

class SynthAudioEngine {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private listeners: Set<() => void> = new Set();
  
  private settings: AudioSettings = {
    musicOn: false, // Background music disabled as requested
    sfxOn: true,    // Keyboard and tap clicks enabled
    musicVolume: 0.0,
    sfxVolume: 0.8,
  };

  constructor() {
    // Context initialized on first user tap
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.settings.sfxOn ? this.settings.sfxVolume : 0;
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public updateSettings(newSettings: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.settings.sfxOn ? this.settings.sfxVolume : 0;
    }
    this.notify();
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  // Crisp keyboard / tap click and celebratory SFX
  public playSfx(type: 'click' | 'correct' | 'wrong' | 'streak' | 'levelup' | 'fanfare' | 'powerup' | 'pop') {
    if (!this.settings.sfxOn) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'click': {
        // Crisp tactile mechanical keyboard / switch click sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.025);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case 'pop': {
        // Soft bubble tap pop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(1300, now + 0.04);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'correct':
      case 'fanfare':
      case 'levelup': {
        // Gentle celebratory chime
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const startTime = now + idx * 0.05;
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.25, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + 0.18);
        });
        break;
      }

      case 'wrong': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.1);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'streak':
      case 'powerup': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
    }
  }

  // App music is turned off (no background synth noise)
  public startMusic(_state: string = 'none') {}
  public stopMusic() {}
  public togglePlayPause() {}
}

export const audioEngine = new SynthAudioEngine();
