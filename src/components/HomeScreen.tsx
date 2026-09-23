import React, { useState, useRef } from 'react';
import type { ScreenState } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { authService } from '../services/authService';
import { 
  KRITIKA_STICKER_MOODS, 
  getMoodMacaroni, 
  type MoodProfileSetting 
} from '../services/moodQuizService';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, 
  MessageCircle, UserCheck, CheckCircle2, Flame,
  Clock, Film
} from 'lucide-react';
import confetti from 'canvas-confetti';
import heroBannerVideoSrc from '../assets/Hero Banner video.mp4';

interface HomeScreenProps {
  onNavigate: (screen: ScreenState) => void;
  onStartMoodQuiz: (moodId: string) => void;
  onOpenGoogleSignIn?: () => void;
  activeMoodId: string;
  onSelectMood: (moodId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onStartMoodQuiz,
  onOpenGoogleSignIn,
  activeMoodId,
  onSelectMood
}) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  // Video Player State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Active Selected Mood & Matching Macaroni
  const currentMoodSetting: MoodProfileSetting = 
    KRITIKA_STICKER_MOODS.find(m => m.id === activeMoodId) || KRITIKA_STICKER_MOODS[0];
  const currentMacaroni = getMoodMacaroni(activeMoodId);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleMoodClick = (mood: MoodProfileSetting) => {
    audioEngine.playSfx('click');
    onSelectMood(mood.id);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    if (isAuthenticated) {
      authService.updateDailyMood(mood.label, mood.emoji, mood.dialogue.slice(0, 75));
    }
    setTick(t => t + 1);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* 1. TOP HEADER & GOOGLE CONNECT BAR */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-ink/10 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-display font-black text-rose-600 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MARISOL • KRITIKA'S COMFORT SPACE</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-ink">
              Factory of Fun 👑✨
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-paper-100 border border-ink/20 px-2.5 py-1 rounded-xl text-xs font-bold shadow-2xs">
              <span>🧀 {player.cucumberSandwiches} Macaronis</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-amber-700">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>{player.streak}</span>
              </span>
            </div>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onOpenGoogleSignIn?.();
              }}
              className="flex items-center gap-1.5 bg-white hover:bg-paper-100 border-2 border-ink px-3 py-1.5 rounded-2xl text-xs font-display font-black shadow-sketch transition-all cursor-pointer shrink-0"
              title="Account & Real-Time Sync"
            >
              {isAuthenticated && currentUser ? (
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="max-w-[75px] truncate">{currentUser.name.split(' ')[0]}</span>
                </span>
              ) : (
                <span className="text-blue-700 flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  <span>GOOGLE CONNECT</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 2. HER HERO VIDEO BANNER (Front and Center) */}
        <div className="relative rounded-3xl border-2.5 border-ink overflow-hidden shadow-sketch bg-black group">
          <video
            ref={videoRef}
            src={heroBannerVideoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-56 sm:h-72 object-cover"
          />

          {/* Video Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Video Badge & Title Overlay */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between pointer-events-none">
            <div className="space-y-0.5">
              <span className="bg-rose-500 text-white font-display text-[10px] font-black uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 fill-white" />
                <span>KRITIKA VERMA 👑</span>
              </span>
              <h2 className="font-display font-black text-white text-base sm:text-xl drop-shadow-md">
                Queen of Factory of Fun
              </h2>
              <p className="font-handwritten text-white/90 text-xs sm:text-sm font-bold drop-shadow-sm">
                "Main apni favourite hoon! Savoring every sweet memory ♡"
              </p>
            </div>

            {/* Video Play/Pause & Mute Buttons */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                onClick={toggleVideoMute}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-ink/30 flex items-center justify-center text-ink transition-transform active:scale-95 shadow-xs cursor-pointer"
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
              </button>

              <button
                onClick={toggleVideoPlay}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-ink/30 flex items-center justify-center text-ink transition-transform active:scale-95 shadow-xs cursor-pointer"
                title={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-ink" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. KRITIKA'S MOOD SELECTOR (Adapted from her real sticker sheet) */}
        <div className="bg-white border-2.5 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xl">🌸</span>
              <h3 className="font-display font-black text-sm text-ink uppercase tracking-wide">
                Pick Her Mood to Adapt Quiz & Macaronis:
              </h3>
            </div>
            <span className="text-[10px] font-handwritten font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Adapts Instantly ✨
            </span>
          </div>

          {/* Mood Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {KRITIKA_STICKER_MOODS.map(mood => {
              const isSelected = mood.id === activeMoodId;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodClick(mood)}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                    isSelected
                      ? 'bg-ink text-white border-ink shadow-sketch-xs scale-102 font-bold'
                      : 'bg-paper-50 hover:bg-pink-50 border-ink/20 text-ink shadow-2xs'
                  }`}
                >
                  <span className="text-2xl mb-1">{mood.emoji}</span>
                  <span className="font-display font-black text-xs leading-none">
                    {mood.label}
                  </span>
                  <span className={`text-[9px] font-handwritten truncate max-w-[120px] mt-1 ${
                    isSelected ? 'text-pink-200' : 'text-stone-500'
                  }`}>
                    {mood.stickerQuote}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. CURRENT MOOD STATUS & REASSURANCE CARD */}
        <div className="bg-gradient-to-r from-pink-50/90 via-purple-50/70 to-amber-50/80 border-2.5 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-ink flex items-center justify-center text-2xl shadow-xs">
                {currentMoodSetting.emoji}
              </div>
              <div>
                <span className="text-[10px] font-display font-black uppercase text-rose-700 tracking-wider">
                  CURRENT COMFORT STATUS
                </span>
                <h4 className="font-display font-black text-base text-ink leading-tight">
                  {currentMoodSetting.label}
                </h4>
              </div>
            </div>
            <span className="bg-white/90 border border-ink/20 px-2.5 py-1 rounded-full text-xs font-handwritten font-bold text-ink-light shadow-2xs">
              "{currentMoodSetting.stickerQuote}"
            </span>
          </div>

          <p className="font-handwritten text-sm sm:text-base text-stone-800 font-bold leading-relaxed bg-white/70 p-3 rounded-2xl border border-ink/15">
            "{currentMoodSetting.dialogue}"
          </p>
        </div>

        {/* 5. MOOD-MATCHED MACARONI DISH (Delicious culinary comfort) */}
        <div className="bg-white border-2.5 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentMacaroni.emoji}</span>
              <div>
                <span className="text-[10px] font-display font-black uppercase text-amber-700 tracking-wider">
                  TODAY'S MOOD MACARONI REWARD
                </span>
                <h3 className="font-display font-black text-base text-ink leading-tight">
                  {currentMacaroni.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-full text-[11px] font-display font-bold text-amber-900 shrink-0">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>{currentMacaroni.cookTime}</span>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
            {currentMacaroni.description}
          </p>

          {/* Secret Ingredients tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentMacaroni.secretIngredients.map(ing => (
              <span 
                key={ing}
                className="bg-paper-100 border border-ink/20 px-2 py-0.5 rounded-full text-[11px] font-handwritten font-bold text-ink"
              >
                {ing}
              </span>
            ))}
          </div>

          {/* Movie Pairing */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-2.5 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-display font-black text-amber-950">Watch With: </span>
                <span className="font-medium text-stone-700">{currentMacaroni.pairingMovie}</span>
              </div>
            </div>
            <span className="font-handwritten text-[11px] text-amber-900 font-bold hidden sm:inline italic">
              {currentMacaroni.pairingQuote}
            </span>
          </div>
        </div>

        {/* 6. PRIMARY ACTIONS: START MOOD QUIZ & OPEN BULLETIN CHAT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Action 1: Start Quiz for this Mood */}
          <button
            onClick={() => {
              audioEngine.playSfx('fanfare');
              onStartMoodQuiz(activeMoodId);
            }}
            className="sketch-btn-primary p-4 rounded-3xl flex items-center justify-between gap-3 shadow-sketch cursor-pointer hover:scale-101 active:scale-98 transition-all"
          >
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-display font-black uppercase text-pink-200 tracking-wider">
                MOOD-ADAPTED TRIVIA
              </span>
              <div className="font-display font-black text-base text-white">
                Play {currentMoodSetting.label} Quiz 🎯
              </div>
              <p className="font-handwritten text-xs text-white/90 font-bold">
                Earn Macaronis & comfort rewards!
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white text-rose-600 flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Play className="w-5 h-5 fill-rose-600" />
            </div>
          </button>

          {/* Action 2: Open Bulletin Board */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('batch_wall');
            }}
            className="p-4 rounded-3xl bg-white border-2.5 border-ink hover:border-purple-600 flex items-center justify-between gap-3 shadow-sketch cursor-pointer hover:scale-101 active:scale-98 transition-all"
          >
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-display font-black uppercase text-purple-700 tracking-wider">
                ASYNC COMMUNITY
              </span>
              <div className="font-display font-black text-base text-ink">
                Bulletin Chat 📌
              </div>
              <p className="font-handwritten text-xs text-stone-600 font-bold">
                Read notes & reply at your own time!
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 border border-ink/20 flex items-center justify-center font-bold shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
