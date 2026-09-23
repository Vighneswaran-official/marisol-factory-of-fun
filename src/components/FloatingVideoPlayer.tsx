import React, { useEffect, useRef, useState } from 'react';
import { videoPlaybackService } from '../services/videoPlaybackService';
import { audioEngine } from '../services/synthAudioEngine';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles } from 'lucide-react';

export const FloatingVideoPlayer: React.FC = () => {
  const [, setTick] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const unsub = videoPlaybackService.subscribe(() => setTick(t => t + 1));
    return () => { unsub(); };
  }, []);

  const video = videoPlaybackService.getVideo();
  const isMinimized = videoPlaybackService.getIsMinimized();

  useEffect(() => {
    if (videoRef.current && video) {
      if (video.currentTime) {
        try {
          videoRef.current.currentTime = video.currentTime;
        } catch {}
      }
      if (video.isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
      videoRef.current.muted = video.isMuted;
    }
  }, [video, isMinimized]);

  if (!isMinimized || !video) return null;

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    videoPlaybackService.togglePlay();
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    videoPlaybackService.toggleMute();
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('pop');
    if (videoRef.current) {
      videoPlaybackService.updateTime(videoRef.current.currentTime);
    }
    videoPlaybackService.expandVideo();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    videoPlaybackService.closeVideo();
  };

  return (
    <div
      className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-60 sm:w-72 bg-ink border-2.5 border-ink rounded-2xl shadow-sketch-xl overflow-hidden animate-scale-up select-none group"
      title="Background Minimized Video (Picture-in-Picture)"
    >
      {/* Mini Title Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-950 px-2.5 py-1.5 flex items-center justify-between text-white border-b border-white/20">
        <div className="flex items-center gap-1.5 min-w-0 pr-1">
          <Sparkles className="w-3.5 h-3.5 text-doodleGold animate-spin shrink-0" />
          <span className="font-display font-black text-[11px] truncate tracking-wide">
            {video.title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleExpand}
            className="p-1 hover:bg-white/20 rounded-md text-white transition-colors"
            title="Expand to Full View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 hover:bg-rose-500 rounded-md text-white transition-colors"
            title="Close Video"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Viewport */}
      <div className="relative aspect-video w-full bg-black cursor-pointer" onClick={handleExpand}>
        {video.type === 'mp4' ? (
          <video
            ref={videoRef}
            src={video.src}
            autoPlay
            loop
            playsInline
            muted={video.isMuted}
            className="w-full h-full object-cover"
            onTimeUpdate={() => {
              if (videoRef.current) {
                videoPlaybackService.updateTime(videoRef.current.currentTime);
              }
            }}
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.src}?autoplay=1&enablejsapi=1&playsinline=1`}
            title={video.title}
            className="w-full h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}

        {/* Hover / Touch Quick Floating Controls */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePlayToggle}
              className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-all active:scale-95"
            >
              {video.isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={handleMuteToggle}
              className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-all active:scale-95"
            >
              {video.isMuted ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>

          <button
            type="button"
            onClick={handleExpand}
            className="text-[10px] font-display font-black bg-pink-600 hover:bg-pink-700 px-2 py-1 rounded-lg border border-pink-400 text-white flex items-center gap-1 shadow-xs transition-colors"
          >
            <span>EXPAND</span>
            <Maximize2 className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
