import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { Sparkles, Volume2, VolumeX, Play, Pause, ArrowRight, Trophy } from 'lucide-react';
import heroBannerVideoSrc from '../assets/Hero Banner video.mp4';

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
    // Play celebratory sound fanfare
    audioEngine.playSfx('fanfare');

    // Confetti celebration shower
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

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative text-center overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Sparkles & Crown Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">👑</span>
            <div className="text-left">
              <h3 className="font-display font-black text-lg sm:text-xl text-ink leading-tight flex items-center gap-1.5">
                <span>{title}</span>
                <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
              </h3>
              <p className="font-handwritten text-xs text-pink-700 font-bold">
                {subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-bold bg-white hover:bg-paper-200 transition-colors shadow-xs shrink-0"
          >
            ✕
          </button>
        </div>

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

            <button
              type="button"
              onClick={handleReplay}
              className="text-xs font-handwritten font-bold text-pink-200 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              Watch Again 🔄
            </button>
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

        {/* PRIMARY CONTINUE ACTION */}
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

      </div>
    </div>
  );
};
