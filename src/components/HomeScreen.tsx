import React, { useState, useRef } from 'react';
import type { ScreenState } from '../types/game';
import { audioEngine } from '../services/synthAudioEngine';
import { authService } from '../services/authService';
import { 
  KRITIKA_STICKER_MOODS, 
  getMoodMacaroni, 
  type MoodProfileSetting 
} from '../services/moodQuizService';
import { moodHistoryManager } from '../services/moodRotationService';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, 
  MessageCircle, UserCheck, CheckCircle2,
  Clock, Film, Heart, Calendar, Lock, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import heroBannerVideoSrc from '../assets/Hero Banner video.mp4';

interface HomeScreenProps {
  onNavigate: (screen: ScreenState) => void;
  onStartMoodQuiz: (moodId: string) => void;
  onOpenGoogleSignIn?: () => void;
  onOpenMoodHistory?: () => void;
  onOpenComfortShelf?: () => void;
  activeMoodId: string;
  onSelectMood: (moodId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onStartMoodQuiz,
  onOpenGoogleSignIn,
  onOpenMoodHistory,
  onOpenComfortShelf,
  activeMoodId,
  onSelectMood
}) => {
  const [, setTick] = useState(0);
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  // Video Player State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Private Note State
  const [privateNote, setPrivateNote] = useState('');
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Active Selected Mood & Matching Macaroni
  const currentMoodSetting: MoodProfileSetting = 
    KRITIKA_STICKER_MOODS.find(m => m.id === activeMoodId) || KRITIKA_STICKER_MOODS[0];
  const currentMacaroni = getMoodMacaroni(activeMoodId);
  const isMacaroniBookmarked = moodHistoryManager.isBookmarked(currentMacaroni.id);

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
    
    // Log to history
    const matchingMacaroni = getMoodMacaroni(mood.id);
    moodHistoryManager.recordMoodCheckIn(
      mood.scaleNumber,
      mood.id,
      mood.label,
      mood.emoji,
      matchingMacaroni.id,
      privateNote.trim() || undefined
    );

    if (isAuthenticated) {
      authService.updateDailyMood(mood.label, mood.emoji, mood.dialogue.slice(0, 75));
    }
    setTick(t => t + 1);
  };

  const handleSavePrivateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });

    moodHistoryManager.recordMoodCheckIn(
      currentMoodSetting.scaleNumber,
      currentMoodSetting.id,
      currentMoodSetting.label,
      currentMoodSetting.emoji,
      currentMacaroni.id,
      privateNote.trim() || undefined
    );

    if (isAuthenticated) {
      authService.updateDailyMood(
        currentMoodSetting.label, 
        currentMoodSetting.emoji, 
        privateNote.trim() || currentMoodSetting.dialogue.slice(0, 75)
      );
    }

    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 3000);
    setTick(t => t + 1);
  };

  const handleToggleBookmarkMacaroni = () => {
    audioEngine.playSfx('pop');
    moodHistoryManager.toggleBookmark({
      id: currentMacaroni.id,
      type: 'macaroni',
      title: currentMacaroni.name,
      subtitle: currentMacaroni.pairingMovie ? `Watch with ${currentMacaroni.pairingMovie}` : currentMacaroni.cookTime,
      emoji: currentMacaroni.emoji,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
    setTick(t => t + 1);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* 1. TOP HEADER & COMFORT SHORTCUTS */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-display font-black text-rose-600 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MARISOL • KRITIKA'S COMFORT SPACE</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-stone-900">
              Factory of Fun 👑✨
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mood Calendar Button */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onOpenMoodHistory?.();
              }}
              className="p-2 rounded-2xl bg-white hover:bg-rose-50 border border-stone-200 text-stone-700 hover:text-rose-600 transition-all shadow-xs cursor-pointer"
              title="14-Day Mood Calendar & Heatmap"
            >
              <Calendar className="w-4 h-4 text-rose-500" />
            </button>

            {/* Comfort Shelf Bookmarks Button */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onOpenComfortShelf?.();
              }}
              className="p-2 rounded-2xl bg-white hover:bg-pink-50 border border-stone-200 text-stone-700 hover:text-pink-600 transition-all shadow-xs cursor-pointer"
              title="Comfort Shelf (Saved Macaronis & Notes)"
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </button>

            {/* Google Connect Account */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onOpenGoogleSignIn?.();
              }}
              className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 px-3 py-1.5 rounded-2xl text-xs font-display font-black shadow-xs transition-all cursor-pointer shrink-0"
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
                  <span className="hidden sm:inline">GOOGLE CONNECT</span>
                  <span className="sm:hidden">LOGIN</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 2. HER HERO VIDEO BANNER (Front and Center) */}
        <div className="relative rounded-3xl border-2 border-stone-800/80 overflow-hidden shadow-md bg-black group">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Video Badge & Title Overlay */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between pointer-events-none">
            <div className="space-y-0.5">
              <span className="bg-rose-500 text-white font-display text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 fill-white" />
                <span>KRITIKA VERMA 👑</span>
              </span>
              <h2 className="font-display font-black text-white text-base sm:text-xl drop-shadow-md">
                Queen of Factory of Fun
              </h2>
              <p className="font-handwritten text-white/95 text-xs sm:text-sm font-bold drop-shadow-sm">
                "Main apni favourite hoon! Savoring every sweet memory ♡"
              </p>
            </div>

            {/* Video Play/Pause & Mute Buttons */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                onClick={toggleVideoMute}
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-white border border-stone-400 flex items-center justify-center text-stone-900 transition-transform active:scale-95 shadow-xs cursor-pointer"
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
              </button>

              <button
                onClick={toggleVideoPlay}
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-white border border-stone-400 flex items-center justify-center text-stone-900 transition-transform active:scale-95 shadow-xs cursor-pointer"
                title={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-stone-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. PINTEREST 1–9 VISUAL MOOD SCALE GRID */}
        <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌸</span>
              <div>
                <h3 className="font-display font-black text-xs sm:text-sm text-stone-900 uppercase tracking-wide">
                  Visual Mood Scale (1–9):
                </h3>
                <p className="text-[10px] text-stone-500 font-medium">
                  Select your current vibe to personalize today's quiz & Macaroni!
                </p>
              </div>
            </div>
            <span className="text-[10px] font-handwritten font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 shrink-0">
              Pinterest Scale ✨
            </span>
          </div>

          {/* 3x3 Grid of 9 Mood Archetypes */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {KRITIKA_STICKER_MOODS.map(mood => {
              const isSelected = mood.id === activeMoodId;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodClick(mood)}
                  className={`relative p-2.5 sm:p-3 rounded-2xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/90 text-stone-900 border-rose-400 ring-2 ring-rose-200 shadow-sm scale-102 font-bold'
                      : 'bg-[#FAF9F7] hover:bg-pink-50/60 border-stone-200 text-stone-700 shadow-2xs hover:border-pink-200'
                  }`}
                >
                  {/* Scale Number Badge */}
                  <span className={`absolute top-1.5 left-2 text-[9px] font-display font-black px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-rose-500 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    #{mood.scaleNumber}
                  </span>

                  <span className="text-2xl sm:text-3xl mt-2 mb-1">{mood.emoji}</span>
                  <span className="font-display font-black text-[11px] sm:text-xs leading-tight line-clamp-1">
                    {mood.label}
                  </span>
                  <span className={`text-[9px] font-handwritten truncate max-w-full mt-0.5 hidden sm:inline ${
                    isSelected ? 'text-rose-700 font-bold' : 'text-stone-500'
                  }`}>
                    {mood.stickerQuote}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Private Daily Note Check-In Form */}
          <form onSubmit={handleSavePrivateCheckIn} className="pt-2 border-t border-stone-100 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-medium text-[11px]">Private note for today's check-in (only you see this):</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={privateNote}
                onChange={(e) => setPrivateNote(e.target.value)}
                placeholder={`How are you feeling as #${currentMoodSetting.scaleNumber} ${currentMoodSetting.label}?`}
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-400 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {noteSavedToast ? <Check className="w-3.5 h-3.5" /> : <span>Log Check-In</span>}
              </button>
            </div>
            {noteSavedToast && (
              <span className="text-[11px] font-handwritten font-bold text-emerald-600 block text-right animate-fade-in">
                ✓ Check-in saved to your 14-day history!
              </span>
            )}
          </form>
        </div>

        {/* 4. CURRENT MOOD STATUS & AFFIRMATION */}
        <div className="bg-gradient-to-r from-pink-50/90 via-rose-50/70 to-amber-50/80 border border-pink-200/80 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white border border-pink-200 flex items-center justify-center text-2xl shadow-xs">
                {currentMoodSetting.emoji}
              </div>
              <div>
                <span className="text-[10px] font-display font-black uppercase text-rose-700 tracking-wider">
                  SCALE #{currentMoodSetting.scaleNumber} • COMFORT STATUS
                </span>
                <h4 className="font-display font-black text-base text-stone-900 leading-tight">
                  {currentMoodSetting.label}
                </h4>
              </div>
            </div>
            <span className="bg-white/90 border border-pink-200 px-2.5 py-1 rounded-full text-xs font-handwritten font-bold text-rose-900 shadow-2xs">
              "{currentMoodSetting.stickerQuote}"
            </span>
          </div>

          <p className="font-handwritten text-sm sm:text-base text-stone-800 font-bold leading-relaxed bg-white/80 p-3 rounded-2xl border border-pink-100">
            "{currentMoodSetting.dialogue}"
          </p>
        </div>

        {/* 5. MOOD-MATCHED MACARONI DISH (With Comfort Shelf Bookmark) */}
        <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentMacaroni.emoji}</span>
              <div>
                <span className="text-[10px] font-display font-black uppercase text-amber-700 tracking-wider">
                  SCALE #{currentMoodSetting.scaleNumber} COMFORT MACARONI
                </span>
                <h3 className="font-display font-black text-base text-stone-900 leading-tight">
                  {currentMacaroni.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleBookmarkMacaroni}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isMacaroniBookmarked
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-stone-50 hover:bg-pink-50 border-stone-200 text-stone-400 hover:text-rose-500'
                }`}
                title={isMacaroniBookmarked ? "Saved to Comfort Shelf" : "Save to Comfort Shelf"}
              >
                <Heart className={`w-4 h-4 ${isMacaroniBookmarked ? 'fill-rose-600' : ''}`} />
              </button>

              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-[11px] font-display font-bold text-amber-900 shrink-0">
                <Clock className="w-3 h-3 text-amber-700" />
                <span>{currentMacaroni.cookTime}</span>
              </div>
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
                className="bg-stone-100 border border-stone-200/80 px-2.5 py-0.5 rounded-full text-[11px] font-handwritten font-bold text-stone-700"
              >
                {ing}
              </span>
            ))}
          </div>

          {/* Movie Pairing */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-2.5 flex items-center justify-between gap-2 text-xs">
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
            className="p-4 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white flex items-center justify-between gap-3 shadow-md hover:shadow-lg cursor-pointer hover:scale-101 active:scale-98 transition-all"
          >
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-display font-black uppercase text-pink-200 tracking-wider">
                MOOD-ADAPTED TRIVIA
              </span>
              <div className="font-display font-black text-base text-white">
                Play {currentMoodSetting.label} Quiz 🎯
              </div>
              <p className="font-handwritten text-xs text-white/90 font-bold">
                Earn Macaronis & unlock comfort vibes!
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
            className="p-4 rounded-3xl bg-white border border-stone-200 hover:border-purple-300 flex items-center justify-between gap-3 shadow-sm hover:shadow-md cursor-pointer hover:scale-101 active:scale-98 transition-all"
          >
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-display font-black uppercase text-purple-700 tracking-wider">
                ASYNC COMMUNITY
              </span>
              <div className="font-display font-black text-base text-stone-900">
                Bulletin Chat 📌
              </div>
              <p className="font-handwritten text-xs text-stone-600 font-bold">
                Read notes & reply at your own time!
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
