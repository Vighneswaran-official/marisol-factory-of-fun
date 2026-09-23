import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { BaseModal } from './BaseModal';
import { Sparkles, Volume2, VolumeX, Play, Pause, ArrowRight, Trophy, Minimize2 } from 'lucide-react';
import heroBannerVideoSrc from '../assets/Hero Banner video.mp4';
import { videoPlaybackService } from '../services/videoPlaybackService';

interface LevelClearHeroModalProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
  earnedSandwiches?: number;
}

export const LevelClearHeroModal: React.FC<LevelClearHeroModalProps> = ({
  onClose,
  title = "LEVEL CLEARED, QUEEN! 👑💖",
  subtitle = "You crushed this culinary milestone with absolute grace & style!",
  earnedSandwiches = 5
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = gameState.getPlayer();

  useEffect(() => {
    audioEngine.playSfx('fanfare');

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F43F5E', '#EC4899', '#FBBF24', '#A855F7', '#10B981', '#38BDF8']
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
      audioEngine.playSfx('click');
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      audioEngine.playSfx('click');
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      audioEngine.playSfx('click');
    }
  };

  const handleMinimize = () => {
    audioEngine.playSfx('pop');
    videoPlaybackService.minimizeVideo({
      type: 'mp4',
      src: heroBannerVideoSrc,
      title: 'Level Clear Celebration 👑',
      subtitle: 'Playing in background',
      isMuted,
      currentTime: videoRef.current?.currentTime || 0,
    });
    onClose();
  };

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-lg"
      icon={<span className="text-2xl animate-bounce">👑</span>}
      title={
        <span className="flex items-center gap-1.5">
          <span>{title}</span>
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
        </span>
      }
      subtitle={subtitle}
    >
      <div className="space-y-4 text-center">
        {/* HERO BANNER VIDEO PLAYER */}
        <div className="relative rounded-2xl overflow-hidden border-2.5 border-ink bg-black shadow-sketch group aspect-video">
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={heroBannerVideoSrc} type="video/mp4" />
            <source src="/hero-banner-video.mp4" type="video/mp4" />
            <source src="/Hero Banner video.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Quick Overlay Controls on Hover/Tap */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white opacity-90 transition-opacity">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white transition-all active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white transition-all active:scale-95"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMinimize}
                className="text-xs font-handwritten font-bold text-white px-2.5 py-1 rounded-lg bg-pink-600/80 hover:bg-pink-600 border border-pink-400 flex items-center gap-1 transition-all"
                title="Minimize video to floating window"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Minimize 🗗</span>
              </button>

              <button
                type="button"
                onClick={handleReplay}
                className="text-xs font-handwritten font-bold text-pink-200 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Watch Again 🔄
              </button>
            </div>
          </div>
        </div>

        {/* REWARD & SCORE SUMMARY */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-pink-50 border-2 border-emerald-300 rounded-2xl p-3 flex items-center justify-between text-left shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
              🥪
            </div>
            <div>
              <div className="font-display font-black text-xs sm:text-sm text-emerald-950 flex items-center gap-1">
                <span>+{earnedSandwiches} Cucumber Sandwiches</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-full font-bold">LEVEL BONUS</span>
              </div>
              <div className="font-handwritten text-[11px] text-emerald-800 font-bold">
                Chef Rank: {player.chefTitle || 'Apprentice Chopper 🥒'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-display font-black text-sm text-emerald-900 bg-white border border-emerald-300 px-2 py-1 rounded-xl shadow-2xs">
              {player.cucumberSandwiches || 0} 🥪
            </span>
          </div>
        </div>

        {/* PRIMARY CONTINUE & MINIMIZE ACTIONS */}
        <div className="space-y-2">
          <button
            onClick={() => {
              audioEngine.playSfx('fanfare');
              onClose();
            }}
            className="sketch-btn-primary w-full py-3.5 text-base sm:text-lg font-black uppercase flex items-center justify-center gap-2 shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>REVEAL SECRET RECIPE REWARD</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleMinimize}
            className="w-full py-2 bg-purple-50 hover:bg-purple-100 border-2 border-dashed border-purple-300 rounded-xl font-handwritten text-xs font-bold text-purple-900 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-purple-700" />
            <span>Minimize video to corner & explore app in background</span>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

