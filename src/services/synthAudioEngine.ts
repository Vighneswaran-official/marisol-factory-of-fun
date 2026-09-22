// 80s Synth & Sound Effects Audio Engine powered by Web Audio API
import type { AudioSettings } from '../types/game';

export interface MusicTrack {
  id: string;
  title: string;
  emoji: string;
  genre: string;
  tagline: string;
  vibe: string;
  color: string;
  tempoMs: number;
  pattern: number[];
  oscType: OscillatorType;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'girl_power',
    title: 'Girl Power Anthem ♡',
    emoji: '👑',
    genre: 'Upbeat Disco Synth',
    tagline: 'Boss-girl sparkle for running the world and conquering your day!',
    vibe: 'Empowered & Sparkling',
    color: '#EC4899',
    tempoMs: 200,
    pattern: [523.25, 659.25, 783.99, 1046.50, 880.00, 783.99, 659.25, 880.00, 1046.50, 1174.66, 1046.50, 880.00],
    oscType: 'triangle'
  },
  {
    id: 'cozy_chai',
    title: 'Tapri Chai & Rainy Day Lo-Fi',
    emoji: '☕',
    genre: 'Soulful Monsoon Lo-Fi',
    tagline: 'Warm ginger-cardamom comfort while raindrops hit the windowpane.',
    vibe: 'Warm, Cozy & Mindful',
    color: '#F97316',
    tempoMs: 320,
    pattern: [220.00, 277.18, 329.63, 415.30, 440.00, 329.63, 277.18, 220.00, 196.00, 246.94, 293.66, 369.99],
    oscType: 'sine'
  },
  {
    id: 'bollywood',
    title: 'Bollywood Thumka Beats',
    emoji: '💃',
    genre: 'Desi Celebratory Pop',
    tagline: 'Infectious upbeat rhythm to snap your fingers and dance away tension!',
    vibe: 'Bubbly, Joyous & Sassy',
    color: '#EAB308',
    tempoMs: 190,
    pattern: [293.66, 329.63, 369.99, 440.00, 493.88, 440.00, 369.99, 329.63, 293.66, 220.00, 293.66, 369.99],
    oscType: 'triangle'
  },
  {
    id: 'retro_synth',
    title: '80s Neon Sunset Drive',
    emoji: '🌆',
    genre: 'Retro Synthwave',
    tagline: 'Cruising down neon highways with cool confidence and zero drama.',
    vibe: 'Dreamy, Nostalgic & Cool',
    color: '#8B5CF6',
    tempoMs: 220,
    pattern: [164.81, 196.00, 246.94, 329.63, 293.66, 246.94, 196.00, 146.83, 164.81, 220.00, 261.63, 329.63],
    oscType: 'sawtooth'
  },
  {
    id: 'zen_chill',
    title: 'Zen Mind Spa & Calm',
    emoji: '🧘',
    genre: 'Ambient Mindful Chimes',
    tagline: 'Soft chimes and deep breath tempo to gently dissolve overthinking.',
    vibe: 'Peaceful, Serene & Grounded',
    color: '#10B981',
    tempoMs: 380,
    pattern: [392.00, 440.00, 523.25, 659.25, 523.25, 440.00, 329.63, 392.00],
    oscType: 'sine'
  },
  {
    id: 'rage_buster',
    title: 'Hangry Rage Popper & Vent Beat',
    emoji: '💥',
    genre: 'High-Octane Mood Lifter',
    tagline: 'Fast punchy groove to channel anger into unstoppable superstar energy!',
    vibe: 'Punchy, Fiery & Cathartic',
    color: '#EF4444',
    tempoMs: 160,
    pattern: [130.81, 164.81, 196.00, 261.63, 196.00, 164.81, 220.00, 261.63, 329.63, 261.63, 220.00, 174.61],
    oscType: 'sawtooth'
  }
];

class SynthAudioEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private isPlayingMusic = false;
  private currentMusicState: string = 'none';
  private currentTrackId: string = 'girl_power';
  private musicInterval: any = null;
  private listeners: Set<() => void> = new Set();
  
  private settings: AudioSettings = {
    musicOn: false,
    sfxOn: true,
    musicVolume: 0.5,
    sfxVolume: 0.7,
  };

  constructor() {
    // AudioContext will be initialized on first user interaction
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

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.settings.musicOn ? this.settings.musicVolume * 0.4 : 0;
      this.musicGain.connect(this.masterGain);

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
    if (this.musicGain) {
      this.musicGain.gain.value = this.settings.musicOn ? this.settings.musicVolume * 0.4 : 0;
    }
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.settings.sfxOn ? this.settings.sfxVolume : 0;
    }
    if (!this.settings.musicOn && this.isPlayingMusic) {
      this.stopMusic();
    }
    this.notify();
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public getTracks(): MusicTrack[] {
    return MUSIC_TRACKS;
  }

  public getCurrentTrack(): MusicTrack {
    return MUSIC_TRACKS.find(t => t.id === this.currentTrackId) || MUSIC_TRACKS[0];
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public getCurrentMusicState(): string {
    return this.currentMusicState;
  }

  // Play retro synth sound effects
  public playSfx(type: 'click' | 'correct' | 'wrong' | 'streak' | 'levelup' | 'fanfare' | 'powerup' | 'boss' | 'pop') {
    if (!this.settings.sfxOn) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'pop': {
        // Satisfying bubble bubble pop sound for stress reliever
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 300, now);
        osc.frequency.exponentialRampToValueAtTime(1200 + Math.random() * 200, now + 0.06);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case 'correct': {
        // Bright 80s synth chime arpeggio (C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const startTime = now + idx * 0.07;
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.4, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + 0.25);
        });
        break;
      }

      case 'wrong': {
        // Soft retro comedic blip (E3 -> Bb2)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(164.81, now);
        osc.frequency.linearRampToValueAtTime(116.54, now + 0.2);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }

      case 'streak': {
        // Rising synth sequence
        const freqs = [440, 554.37, 659.25, 880, 1108.73];
        freqs.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          const startTime = now + i * 0.06;
          osc.frequency.setValueAtTime(f, startTime);

          gain.gain.setValueAtTime(0.25, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + 0.15);
        });
        break;
      }

      case 'levelup':
      case 'fanfare': {
        // Energetic 80s victory fanfare
        const notes = [
          { f: 523.25, d: 0.1, t: 0 },
          { f: 659.25, d: 0.1, t: 0.1 },
          { f: 783.99, d: 0.1, t: 0.2 },
          { f: 1046.50, d: 0.3, t: 0.3 },
          { f: 880.00, d: 0.15, t: 0.5 },
          { f: 1046.50, d: 0.5, t: 0.65 }
        ];

        notes.forEach(n => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          const startTime = now + n.t;
          osc.frequency.setValueAtTime(n.f, startTime);

          gain.gain.setValueAtTime(0.3, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.d);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + n.d);
        });
        break;
      }

      case 'powerup': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }
    }
  }

  // Play a specific curated track
  public playTrack(trackId: string) {
    const track = MUSIC_TRACKS.find(t => t.id === trackId) || MUSIC_TRACKS[0];
    this.currentTrackId = track.id;

    if (!this.settings.musicOn) {
      this.updateSettings({ musicOn: true });
    }

    this.initCtx();
    this.stopMusicIntervalOnly();

    this.isPlayingMusic = true;
    this.currentMusicState = track.id;

    let noteIdx = 0;
    const tempoMs = track.tempoMs;

    this.musicInterval = setInterval(() => {
      if (!this.isPlayingMusic || !this.ctx || !this.musicGain || !this.settings.musicOn) return;

      const freq = track.pattern[noteIdx % track.pattern.length];
      noteIdx++;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = track.oscType;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (tempoMs / 1000) * 0.95);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + (tempoMs / 1000) * 0.95);
    }, tempoMs);

    this.notify();
  }

  public togglePlayPause() {
    if (this.isPlayingMusic) {
      this.stopMusic();
    } else {
      this.playTrack(this.currentTrackId);
    }
  }

  public nextTrack() {
    const currentIdx = MUSIC_TRACKS.findIndex(t => t.id === this.currentTrackId);
    const nextIdx = (currentIdx + 1) % MUSIC_TRACKS.length;
    this.playTrack(MUSIC_TRACKS[nextIdx].id);
  }

  public prevTrack() {
    const currentIdx = MUSIC_TRACKS.findIndex(t => t.id === this.currentTrackId);
    const prevIdx = (currentIdx - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    this.playTrack(MUSIC_TRACKS[prevIdx].id);
  }

  // 80s Synth Background Loop Engine (Legacy / Screen-state integration)
  public startMusic(state: 'menu' | 'map' | 'quiz' | 'boss' | 'final' | string = 'menu') {
    // Map screen state to appropriate track
    if (state === 'quiz') {
      this.playTrack('girl_power');
    } else if (state === 'map') {
      this.playTrack('retro_synth');
    } else if (state === 'final') {
      this.playTrack('cozy_chai');
    } else {
      // Menu / default
      if (!this.isPlayingMusic) {
        this.playTrack(this.currentTrackId || 'girl_power');
      }
    }
  }

  private stopMusicIntervalOnly() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    this.currentMusicState = 'none';
    this.stopMusicIntervalOnly();
    this.notify();
  }
}

export const audioEngine = new SynthAudioEngine();
