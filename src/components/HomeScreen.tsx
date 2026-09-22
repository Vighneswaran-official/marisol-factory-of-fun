import React, { useEffect, useState } from 'react';
import type { ScreenState } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { wellnessState, KRITIKA_MOODS, type KritikaMoodId } from '../services/wellnessState';
import { Marisol } from './Marisol';
import { LittleLoveNote } from './LittleLoveNote';
import { SparkleStreak } from './SparkleStreak';
import { 
  Play, 
  Sparkles, 
  Heart, 
  Lock, 
  Camera, 
  Music,
  Film
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenState) => void;
  onQuickPlay: () => void;
  onOpenMusic: () => void;
  onOpenComfortCorner: () => void;
  onOpenSecretLocket: () => void;
  onOpenGlowUpWeek: () => void;
  onOpenCozyMode: () => void;
  onOpenCartoonTalkies: (mode?: 'video' | 'magazine') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onQuickPlay,
  onOpenMusic,
  onOpenComfortCorner,
  onOpenSecretLocket,
  onOpenGlowUpWeek,
  onOpenCozyMode,
  onOpenCartoonTalkies,
}) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentQueenMood = wellnessState.getQueenMood();
  const moodProfile = wellnessState.getMoodProfile();

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const handleSelectQueenMood = (moodId: KritikaMoodId) => {
    audioEngine.playSfx('click');
    wellnessState.setQueenMood(moodId);
  };

  // Dialogue adapted to queen's selected mood
  const getQueenDialogue = () => {
    switch (currentQueenMood) {
      case 'Tired':
        return "You've worked so hard today, Kritika. Let's wrap in a warm blanket and recharge. 🌙💤";
      case 'Stressed':
        return "Deep breath, darling. Drop your shoulders, sip some chai. You are doing amazing! 🌸💆‍♀️";
      case 'Cozy':
        return "Hot cup of ginger chai & zero stress on our agenda today, queen! ☕☁️";
      case 'Excited':
        return "Tell me everything! What great news are we celebrating today?! 👑✨🎉";
      case 'Low':
        return "Sending you the biggest, warmest sisterly hug. You are so cherished, Kritika! 💕🧸";
      case 'Romantic':
        return "Main apni favourite hoon! Savor every dreamy moment and sweet daydream! 🎀🌷";
      case 'Happy':
      default:
        return player.streak >= 3
          ? `You're on a ${player.streak}-question streak! Unstoppable glow, queen! ✨`
          : `Ready for today's comfort snack & good Bollywood tunes, babe? 💖`;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] p-3 sm:p-5 pb-28 text-ink">
      <div className="max-w-xl mx-auto space-y-4">
        
        {/* TOP BAR: How is Kritika doing today? 💗 & Cozy Mode Button */}
        <div 
          className="border-2 border-pink-200/90 rounded-3xl p-4 shadow-sketch-sm space-y-3 transition-all duration-500"
          style={{ background: moodProfile.bgAtmosphere }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-pulse">💗</span>
              <div>
                <h2 className="font-display font-black text-sm sm:text-base text-pink-950 tracking-tight flex items-center gap-1.5">
                  HOW IS KRITIKA DOING TODAY?
                </h2>
                <p className="text-[11px] font-handwritten font-bold text-pink-800/80">
                  Tap your mood to personalize your entire comfort sanctuary ♡
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  audioEngine.playSfx('powerup');
                  onOpenComfortCorner();
                }}
                className="inline-flex items-center gap-1 bg-pink-100 hover:bg-pink-200 border border-pink-300 text-pink-900 font-display font-black text-xs px-2.5 py-1.5 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all"
                title="Girl's Comfort Corner & Mood TLC"
              >
                <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                <span>TLC</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playSfx('powerup');
                  onOpenCozyMode();
                }}
                className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white border-2 border-pink-300 text-pink-900 font-display font-black text-xs px-3 py-1.5 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all"
              >
                <span>Cozy Mode</span>
                <span>🤍</span>
              </button>
            </div>
          </div>

          {/* 7 Mood Selector Chips: Happy, Tired, Stressed, Cozy, Excited, Low, Romantic */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
            {KRITIKA_MOODS.map(mood => {
              const isSelected = mood.id === currentQueenMood;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleSelectQueenMood(mood.id)}
                  className={`
                    px-3 py-1.5 rounded-2xl border transition-all shrink-0 flex items-center gap-1.5
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-600 shadow-sm scale-105 font-black ring-2 ring-pink-300'
                        : 'bg-white/80 text-ink-light border-pink-200 hover:bg-white hover:border-pink-400'
                    }
                  `}
                >
                  <span className="text-sm">{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Sisterly Reassurance Banner */}
          <div className="bg-white/85 backdrop-blur-xs border border-pink-200 p-2.5 rounded-2xl flex items-center gap-2.5 animate-fade-in shadow-2xs">
            <span className="text-xl">🌸</span>
            <p className="text-xs font-handwritten font-black text-pink-900 leading-snug">
              {moodProfile.reassurance}
            </p>
          </div>
        </div>

        {/* CARTOON TALKIES VIDEO & COMIC MAGAZINE SHOWCASE */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-700 text-white border-3 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl shadow-inner shrink-0 animate-bounce">
                🎬
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-display font-black text-sm sm:text-base uppercase tracking-tight">
                    KRITIKA'S CARTOON TALKIES
                  </span>
                  <span className="bg-amber-400 text-ink text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    SPEAKING VIDEO STUDIO
                  </span>
                </div>
                <p className="font-handwritten text-xs text-pink-100 font-bold mt-0.5">
                  Watch cartoon speak aloud with lip-sync in Bollywood, Chef, Anime & Sci-Fi! 🍿
                </p>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => {
                  audioEngine.playSfx('fanfare');
                  onOpenCartoonTalkies('video');
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-pink-900 font-display font-black text-xs rounded-2xl shadow-md hover:bg-pink-100 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-pink-900" />
                <span>Watch Video 🎥</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenCartoonTalkies('magazine');
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-pink-950/40 border border-white/30 text-white font-display font-black text-xs rounded-2xl shadow-sm hover:bg-pink-950/60 transition flex items-center justify-center gap-1.5"
              >
                <span>Read Magazine 📖</span>
              </button>
            </div>
          </div>
        </div>

        {/* HERO CARD 2: Kritika Companion & Chef Score Hub */}
        <div className="bg-white border-3 border-pink-200/90 rounded-3xl p-5 shadow-sketch text-center space-y-3.5 relative overflow-hidden">
          
          {/* Active Mood Pill */}
          <div className="inline-flex items-center gap-1.5 bg-pink-50 border border-pink-200 px-3 py-0.5 rounded-full font-handwritten text-xs font-bold text-pink-800">
            <span>{moodProfile.emoji}</span>
            <span>Active Vibe: {moodProfile.label}</span>
            <Sparkles className="w-3 h-3 text-pink-400" />
          </div>

          {/* Kritika Companion with Dynamic Dialogue */}
          <div className="flex justify-center pt-0.5">
            <Marisol
              pose={player.activeSticker}
              expression={player.streak >= 3 ? 'excited' : 'welcome'}
              size="large"
              dialogue={getQueenDialogue()}
              bubblePosition="top"
              onClick={() => {
                audioEngine.playSfx('powerup');
                onNavigate('stickers');
              }}
            />
          </div>

          {/* Chef Rank & Cucumber Sandwiches Score Board */}
          <div className="space-y-1.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-pink-50 border-2 border-emerald-400/40 rounded-2xl p-3 text-left shadow-inner">
            <div className="flex justify-between items-center font-display text-xs sm:text-sm font-black text-ink">
              <span className="text-emerald-900 flex items-center gap-1">
                <span>👩‍🍳</span> {player.chefTitle || 'Apprentice Chopper 🥒'}
              </span>
              <span className="text-emerald-800 bg-white border border-emerald-400 px-2.5 py-0.5 rounded-xl shadow-2xs font-black">
                {player.cucumberSandwiches || 0} 🥪 Cucumber Sandwiches
              </span>
            </div>

            {/* Progress to Next Chef Title */}
            <div className="w-full h-3 bg-white border border-ink/30 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-pink-400 border-r border-ink/40 transition-all duration-500"
                style={{ width: `${Math.min(100, ((player.cucumberSandwiches || 0) % 25) * 4)}%` }}
              />
            </div>

            <div className="flex justify-between items-center font-handwritten text-[11px] text-ink-light font-bold">
              <span>+3 Cucumber Sandwiches per correct trivia</span>
              <span>Next Title at {(Math.floor((player.cucumberSandwiches || 0) / 25) + 1) * 25} 🥪</span>
            </div>
          </div>
        </div>

        {/* LITTLE LOVE NOTE (Sticky Note Affirmation) */}
        <LittleLoveNote />

        {/* SPARKLE STREAK (Consecutive Day Tracker) */}
        <SparkleStreak />

        {/* PRIMARY ACTION: COOKING & CINEMA TRIVIA */}
        <button
          onClick={() => {
            audioEngine.playSfx('click');
            onQuickPlay();
          }}
          className="sketch-btn-primary w-full p-4 sm:p-5 text-xl sm:text-2xl font-black uppercase flex items-center justify-between shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🍳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span>COOKING & CINEMA TRIVIA</span>
                <span className="bg-white text-rose-800 font-display text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ENDLESS
                </span>
              </div>
              <span className="block font-handwritten text-xs sm:text-sm text-paper-100 normal-case font-bold mt-0.5">
                Answer trivia, collect secret ingredients & unlock mouth-watering recipes!
              </span>
            </div>
          </div>
          <Play className="w-7 h-7 fill-white shrink-0 ml-2" />
        </button>

        {/* SECTION TILES: Bollywood Lounge & Food-Movie Pairings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Card: Hindi Bollywood Songs (YouTube Connected) */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenMusic();
            }}
            className="w-full bg-gradient-to-br from-red-600 via-rose-600 to-purple-700 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl border-2 border-white/40 overflow-hidden bg-rose-200 shrink-0 shadow-inner">
                <img 
                  src="/marisol/avatars/11_music_mood.png" 
                  alt="Kritika Headphones" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-display font-black text-sm uppercase">YOUTUBE JUKEBOX</span>
                  <span className="bg-red-500 text-white font-display text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white/40">
                    🔴 YT CONNECTED
                  </span>
                </div>
                <div className="font-handwritten text-xs text-rose-100 font-bold truncate">
                  Stream Bollywood hits, search & pin songs! 🎵
                </div>
              </div>
            </div>
            <Music className="w-5 h-5 text-rose-200 group-hover:rotate-45 transition-transform shrink-0" />
          </button>

          {/* Card: Food & Movie Pairings */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('recipes');
            }}
            className="w-full bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl border-2 border-white/40 bg-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🎬
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-sm uppercase">FOOD & MOVIES</span>
                  <span className="bg-white/25 text-[9px] px-1.5 py-0.5 rounded-full font-handwritten">PAIRED</span>
                </div>
                <div className="font-handwritten text-xs text-rose-100 font-bold truncate">
                  Highway Chai, Rajma Chawal & cinema!
                </div>
              </div>
            </div>
            <Film className="w-5 h-5 text-white group-hover:scale-125 transition-transform shrink-0" />
          </button>
        </div>

        {/* DEDICATED WELLNESS SHORTCUTS: Secret Locket & Glow-Up Week */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Secret Locket */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenSecretLocket();
            }}
            className="bg-white border-2.5 border-pink-300 rounded-3xl p-3.5 flex flex-col items-center justify-center text-center gap-1 shadow-sketch-sm hover:border-pink-500 hover:scale-102 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-700 shadow-2xs">
              <Lock className="w-5 h-5" />
            </div>
            <span className="font-display font-black text-xs sm:text-sm text-ink">
              SECRET LOCKET 🔐
            </span>
            <span className="font-handwritten text-[11px] text-pink-700 font-bold">
              Notes & Voice Memos
            </span>
          </button>

          {/* Glow-Up Week Scrapbook */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenGlowUpWeek();
            }}
            className="bg-white border-2.5 border-purple-300 rounded-3xl p-3.5 flex flex-col items-center justify-center text-center gap-1 shadow-sketch-sm hover:border-purple-500 hover:scale-102 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shadow-2xs">
              <Camera className="w-5 h-5" />
            </div>
            <span className="font-display font-black text-xs sm:text-sm text-ink">
              GLOW-UP WEEK 📸
            </span>
            <span className="font-handwritten text-[11px] text-purple-700 font-bold">
              Polaroid Scrapbook
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
