export type VisemeState = 'closed' | 'open_small' | 'open_wide' | 'smile';

class CartoonSpeechEngine {
  private isSpeaking: boolean = false;
  private visemeInterval: number | null = null;
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeech();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private initAudio() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play cute cartoon speech chirps as fallback or accompaniment
  public playCartoonChirp(pitch: number = 600) {
    if (this.isMuted) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.12);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public speakDialogue(
    text: string,
    onVisemeChange: (viseme: VisemeState) => void,
    onEnd: () => void
  ): void {
    this.stopSpeech();
    if (this.isMuted) {
      // If muted, simulate mouth movement for the duration of text
      this.simulateMouthMovement(text, onVisemeChange, onEnd);
      return;
    }

    if (!('speechSynthesis' in window)) {
      this.simulateMouthMovement(text, onVisemeChange, onEnd);
      return;
    }

    try {
      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Select cute, upbeat female voice if available
      const voices = synth.getVoices();
      const preferredVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria')) &&
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.pitch = 1.25; // Slightly high-pitched, enthusiastic cartoon voice
      utterance.rate = 1.08; // Energetic cadence

      this.isSpeaking = true;

      // Animate mouth visemes dynamically while speech is running
      const visemes: VisemeState[] = ['open_wide', 'open_small', 'open_wide', 'smile', 'open_small'];
      let vIndex = 0;
      this.visemeInterval = window.setInterval(() => {
        if (!this.isSpeaking) return;
        const currentViseme = visemes[vIndex % visemes.length];
        onVisemeChange(currentViseme);
        this.playCartoonChirp(450 + (vIndex % 4) * 80);
        vIndex++;
      }, 140);

      utterance.onend = () => {
        this.stopSpeech();
        onVisemeChange('smile');
        onEnd();
      };

      utterance.onerror = () => {
        this.stopSpeech();
        this.simulateMouthMovement(text, onVisemeChange, onEnd);
      };

      synth.speak(utterance);
    } catch {
      this.simulateMouthMovement(text, onVisemeChange, onEnd);
    }
  }

  private simulateMouthMovement(
    text: string,
    onVisemeChange: (viseme: VisemeState) => void,
    onEnd: () => void
  ) {
    const durationMs = Math.max(3000, text.length * 65);
    const visemes: VisemeState[] = ['open_wide', 'open_small', 'open_wide', 'smile'];
    let vIndex = 0;
    this.isSpeaking = true;

    this.visemeInterval = window.setInterval(() => {
      onVisemeChange(visemes[vIndex % visemes.length]);
      this.playCartoonChirp(480 + (vIndex % 4) * 70);
      vIndex++;
    }, 150);

    setTimeout(() => {
      this.stopSpeech();
      onVisemeChange('smile');
      onEnd();
    }, durationMs);
  }

  public stopSpeech(): void {
    this.isSpeaking = false;
    if (this.visemeInterval) {
      clearInterval(this.visemeInterval);
      this.visemeInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const cartoonSpeech = new CartoonSpeechEngine();
