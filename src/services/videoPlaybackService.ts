// Video Playback Service for background & picture-in-picture floating mini-player

export interface FloatingVideo {
  type: 'mp4' | 'youtube';
  src: string;
  title: string;
  subtitle?: string;
  isPlaying: boolean;
  isMuted: boolean;
  currentTime?: number;
}

class VideoPlaybackService {
  private currentVideo: FloatingVideo | null = null;
  private isMinimized: boolean = false;
  private listeners: Set<() => void> = new Set();
  private expandHandler: (() => void) | null = null;

  public getVideo(): FloatingVideo | null {
    return this.currentVideo;
  }

  public getIsMinimized(): boolean {
    return this.isMinimized && this.currentVideo !== null;
  }

  public setExpandHandler(handler: (() => void) | null) {
    this.expandHandler = handler;
  }

  public minimizeVideo(video: {
    type: 'mp4' | 'youtube';
    src: string;
    title: string;
    subtitle?: string;
    isMuted?: boolean;
    currentTime?: number;
  }, onExpand?: () => void) {
    this.currentVideo = {
      type: video.type,
      src: video.src,
      title: video.title,
      subtitle: video.subtitle,
      isPlaying: true,
      isMuted: video.isMuted ?? true,
      currentTime: video.currentTime ?? 0,
    };
    this.isMinimized = true;
    if (onExpand) {
      this.expandHandler = onExpand;
    }
    this.notify();
  }

  public expandVideo() {
    if (this.expandHandler) {
      this.expandHandler();
    }
    this.isMinimized = false;
    this.notify();
  }

  public closeVideo() {
    this.currentVideo = null;
    this.isMinimized = false;
    this.expandHandler = null;
    this.notify();
  }

  public togglePlay() {
    if (this.currentVideo) {
      this.currentVideo.isPlaying = !this.currentVideo.isPlaying;
      this.notify();
    }
  }

  public toggleMute() {
    if (this.currentVideo) {
      this.currentVideo.isMuted = !this.currentVideo.isMuted;
      this.notify();
    }
  }

  public updateTime(currentTime: number) {
    if (this.currentVideo) {
      this.currentVideo.currentTime = currentTime;
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const videoPlaybackService = new VideoPlaybackService();
