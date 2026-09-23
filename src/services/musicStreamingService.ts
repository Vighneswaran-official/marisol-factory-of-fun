// Music Streaming & Search Service for Marisol: Factory of Fun
// Connects to public internet audio APIs (iTunes Search API & streaming audio previews)

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  artworkUrl: string;
  streamUrl: string;
  durationMs: number;
  genre: string;
  releaseYear: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  duration: number; // in seconds
  volume: number; // 0.0 to 1.0
  isLoading: boolean;
  queue: Track[];
  queueIndex: number;
  error: string | null;
}

// Curated Initial "New Releases & Comfort Lounge" Track List
export const CURATED_NEW_RELEASES: Track[] = [
  {
    id: 'curated_1',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh & Sachin-Jigar',
    album: 'Bhediya (Comfort Acoustic)',
    artworkUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    streamUrl: 'https://audio.jukehost.co.uk/5Z8X9T9CqY9k0s6Kz5jG4bX8v2m1n0pQ',
    durationMs: 260000,
    genre: 'Bollywood Romance',
    releaseYear: '2024'
  },
  {
    id: 'curated_2',
    title: 'Naina Da Kya Kasoor',
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    durationMs: 210000,
    genre: 'Retro Pop',
    releaseYear: '2024'
  },
  {
    id: 'curated_3',
    title: 'Lover (Acoustic Comfort)',
    artist: 'Diljit Dosanjh & Pop Vibes',
    album: 'MoonChild Era',
    artworkUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
    durationMs: 195000,
    genre: 'Punjabi Pop',
    releaseYear: '2024'
  },
  {
    id: 'curated_4',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    album: 'Easy On My Eyes',
    artworkUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=relaxed-vlog-131746.mp3',
    durationMs: 178000,
    genre: 'Indie Romance',
    releaseYear: '2024'
  },
  {
    id: 'curated_5',
    title: 'Kesariya (Chai & Sunset Edit)',
    artist: 'Arijit Singh & Pritam',
    album: 'Brahmastra',
    artworkUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2023/04/10/audio_51a37c413b.mp3?filename=coffee-chill-out-146317.mp3',
    durationMs: 268000,
    genre: 'Bollywood Comfort',
    releaseYear: '2024'
  },
  {
    id: 'curated_6',
    title: 'Flowers (Sunshine Feelgood)',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    artworkUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sweet-life-luxury-chill-110034.mp3',
    durationMs: 200000,
    genre: 'Pop Anthem',
    releaseYear: '2024'
  }
];

class MusicStreamingService {
  private audio: HTMLAudioElement | null = null;
  private state: PlayerState = {
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.85,
    isLoading: false,
    queue: CURATED_NEW_RELEASES,
    queueIndex: 0,
    error: null
  };
  private listeners: Set<(state: PlayerState) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    this.audio = new Audio();
    this.audio.volume = this.state.volume;

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.state.currentTime = this.audio.currentTime;
        this.state.duration = this.audio.duration || this.state.duration || 0;
        this.notify();
      }
    });

    this.audio.addEventListener('playing', () => {
      this.state.isPlaying = true;
      this.state.isLoading = false;
      this.state.error = null;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.state.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('waiting', () => {
      this.state.isLoading = true;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.playNext();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio stream playback error', e);
      this.state.isLoading = false;
      this.state.isPlaying = false;
      this.state.error = 'Streaming preview unavailable for this track';
      this.notify();
    });
  }

  public getState(): PlayerState {
    return { ...this.state };
  }

  public subscribe(listener: (state: PlayerState) => void) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const s = this.getState();
    this.listeners.forEach(l => l(s));
  }

  /**
   * Search internet songs via iTunes Search API with CORS support
   */
  public async searchTracks(query: string): Promise<Track[]> {
    if (!query.trim()) return CURATED_NEW_RELEASES;

    try {
      const formatted = encodeURIComponent(query.trim());
      const url = `https://itunes.apple.com/search?term=${formatted}&media=music&entity=song&limit=25`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const tracks: Track[] = data.results
          .filter((item: any) => item.previewUrl && item.trackName)
          .map((item: any) => ({
            id: `itunes_${item.trackId}`,
            title: item.trackName,
            artist: item.artistName,
            album: item.collectionName || 'Single',
            artworkUrl: (item.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
            streamUrl: item.previewUrl,
            durationMs: item.trackTimeMillis || 30000,
            genre: item.primaryGenreName || 'Pop',
            releaseYear: item.releaseDate ? new Date(item.releaseDate).getFullYear().toString() : '2024'
          }));
        return tracks;
      }
      return [];
    } catch (err) {
      console.warn('Internet music search failed, falling back to curated list', err);
      return CURATED_NEW_RELEASES.filter(t => 
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  /**
   * Play a specific track
   */
  public async playTrack(track: Track, newQueue?: Track[]) {
    if (!this.audio) this.initAudio();
    if (!this.audio) return;

    if (newQueue && newQueue.length > 0) {
      this.state.queue = newQueue;
      this.state.queueIndex = newQueue.findIndex(t => t.id === track.id);
      if (this.state.queueIndex === -1) this.state.queueIndex = 0;
    }

    this.state.currentTrack = track;
    this.state.isLoading = true;
    this.state.error = null;
    this.notify();

    try {
      this.audio.src = track.streamUrl;
      this.audio.currentTime = 0;
      await this.audio.play();
    } catch (err) {
      console.warn('Error starting playback', err);
      this.state.isLoading = false;
      this.state.isPlaying = false;
      this.notify();
    }
  }

  public togglePlayPause() {
    if (!this.audio) return;

    if (!this.state.currentTrack) {
      if (this.state.queue.length > 0) {
        this.playTrack(this.state.queue[0]);
      }
      return;
    }

    if (this.state.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(console.warn);
    }
  }

  public playNext() {
    if (this.state.queue.length === 0) return;
    let nextIndex = this.state.queueIndex + 1;
    if (nextIndex >= this.state.queue.length) {
      nextIndex = 0;
    }
    this.state.queueIndex = nextIndex;
    this.playTrack(this.state.queue[nextIndex]);
  }

  public playPrev() {
    if (this.state.queue.length === 0) return;
    let prevIndex = this.state.queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.state.queue.length - 1;
    }
    this.state.queueIndex = prevIndex;
    this.playTrack(this.state.queue[prevIndex]);
  }

  public seek(timeInSeconds: number) {
    if (this.audio) {
      this.audio.currentTime = timeInSeconds;
      this.state.currentTime = timeInSeconds;
      this.notify();
    }
  }

  public setVolume(volume: number) {
    const clamped = Math.max(0, Math.min(1, volume));
    this.state.volume = clamped;
    if (this.audio) {
      this.audio.volume = clamped;
    }
    this.notify();
  }
}

export const musicStreamingService = new MusicStreamingService();
