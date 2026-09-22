import React, { useEffect, useState } from 'react';
import type { ScreenState } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { wellnessState, QUEEN_MOODS } from '../services/wellnessState';
import { Marisol } from './Marisol';
import { LittleLoveNote } from './LittleLoveNote';
import { SparkleStreak } from './SparkleStreak';
import { 
  Play, 
  Sparkles, 
  Heart, 
  Lock, 
  Camera, 
  Map, 
  Award 
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenState) => void;
  onQuickPlay: () => void;
  onOpenMusic: () => void;
  onOpenComfortCorner: () => void;
  onOpenSecretLocket: () => void;
  onOpenGlowUpWeek: () => void;
  onOpenCozyMode: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onQuickPlay,
  onOpenMusic,
  onOpenComfortCorner,
  onOpenSecretLocket,
  onOpenGlowUpWeek,
  onOpenCozyMode,
}) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentQueenMood = wellnessState.getQueenMood();
  const activeMoodObj = QUEEN_MOODS.find(m => m.id === currentQueenMood) || QUEEN_MOODS[0];

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const handleSelectQueenMood = (moodId: string) => {
    audioEngine.playSfx('click');
    wellnessState.setQueenMood(moodId);
    if (moodId === 'hangry' || moodId === 'need_tlc') {
      // Suggest comfort corner
      onOpenComfortCorner();
    }
  };

  // Dialogue adapted to queen's selected mood
  const getQueenDialogue = () => {
    switch (currentQueenMood) {
      case 'cozy_chai':
        return "Hot cup of ginger chai & zero stress on our agenda today, babe! ☕☁️";
      case 'need_tlc':
        return "Sending you the biggest, warmest sisterly hug. You are so loved! 🌸🥺";
      case 'sassy_bold':
        return "Main apni favourite hoon! Let's conquer everything with unmatched style! 💅👑";
      case 'hangry':
        return "Emergency carbs inbound! Have +5 cucumber sandwiches and let them wait! 🥪😤";
      case 'radiant':
      default:
        return player.streak >= 3
          ? `You're on a ${player.streak}-question streak! Unstoppable glow, queen! ✨`
          : `Ready for today's trivia snack & good Bollywood tunes, babe? 💖`;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] p-3 sm:p-5 pb-28 text-ink">
      <div className="max-w-xl mx-auto space-y-4">
        
        {/* TOP BAR: How's My Queen Feeling Today? 👑 & Cozy Mode Button */}
        <div className="bg-white border-2 border-pink-200/80 rounded-3xl p-3.5 shadow-sketch-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xl">👑</span>
              <h2 className="font-display font-black text-xs sm:text-sm text-pink-900 tracking-wide">
                HOW'S MY QUEEN FEELING TODAY?
              </h2>
            </div>

            <button
              onClick={() => {
                audioEngine.playSfx('powerup');
                onOpenCozyMode();
              }}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-pink-100 hover:from-amber-200 hover:to-pink-200 border border-pink-300 text-pink-900 font-display font-black text-[11px] px-2.5 py-1 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all"
            >
              <span>Cozy Mode</span>
              <span>🤍</span>
            </button>
          </div>

          {/* Labeled Mood Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
            {QUEEN_MOODS.map(mood => {
              const isSelected = mood.id === currentQueenMood;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleSelectQueenMood(mood.id)}
                  className={`
                    px-3 py-1.5 rounded-2xl border transition-all shrink-0 flex items-center gap-1.5
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-600 shadow-xs scale-102 font-black'
                        : 'bg-white text-ink-light border-pink-200 hover:border-pink-400'
                    }
                  `}
                >
                  <span className="text-sm">{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* HERO CARD: Kritika Companion & Chef Score Hub */}
        <div className="bg-white border-3 border-pink-200/90 rounded-3xl p-5 shadow-sketch text-center space-y-3.5 relative overflow-hidden">
          
          {/* Active Mood Pill */}
          <div className="inline-flex items-center gap-1.5 bg-pink-50 border border-pink-200 px-3 py-0.5 rounded-full font-handwritten text-xs font-bold text-pink-800">
            <span>{activeMoodObj.emoji}</span>
            <span>Current Vibe: {activeMoodObj.label}</span>
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

        {/* PRIMARY ACTION 1: COOKING & CINEMA TRIVIA */}
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

        {/* PRIMARY ACTION 2 & 3: BOLLYWOOD HINDI SONGS & GIRL'S COMFORT SOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Card: Hindi Bollywood Songs */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenMusic();
            }}
            className="w-full bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl border-2 border-white/40 overflow-hidden bg-purple-200 shrink-0 shadow-inner">
                <img 
                  src="/marisol/avatars/11_music_mood.png" 
                  alt="Kritika Headphones"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-sm uppercase">BOLLYWOOD SONGS</span>
                  <span className="text-xs">🎵</span>
                </div>
                <div className="font-handwritten text-xs text-purple-100 font-bold truncate">
                  Search & pin your favorite songs! 📌
                </div>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-purple-200 group-hover:rotate-45 transition-transform shrink-0" />
          </button>

          {/* Card: Girl's Comfort SOS */}
          <button
            onClick={() => {
              audioEngine.playSfx('powerup');
              onOpenComfortCorner();
            }}
            className="w-full bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl border-2 border-white/40 bg-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                💖
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-sm uppercase">GIRL'S COMFORT SOS</span>
                  <span className="bg-white/25 text-[9px] px-1.5 py-0.5 rounded-full font-handwritten">TLC</span>
                </div>
                <div className="font-handwritten text-xs text-rose-100 font-bold truncate">
                  Angry or hangry? Vent popper & +5 sandwiches!
                </div>
              </div>
            </div>
            <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform shrink-0" />
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
              Private Notes Vault
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

        {/* CULINARY VAULT & 11 MOOD STICKERS */}
        <div className="grid grid-cols-2 gap-3">
          
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('recipes');
            }}
            className="bg-white border-2.5 border-emerald-300 rounded-3xl p-3.5 flex flex-col items-center justify-center text-center gap-1 shadow-sketch-sm hover:border-emerald-500 hover:scale-102 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 text-xl shadow-2xs">
              📖
            </div>
            <span className="font-display font-black text-xs sm:text-sm text-ink">
              RECIPE VAULT
            </span>
            <span className="font-handwritten text-[11px] text-emerald-700 font-bold">
              Dishes & Movie Pairings
            </span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('stickers');
            }}
            className="bg-white border-2.5 border-amber-300 rounded-3xl p-3.5 flex flex-col items-center justify-center text-center gap-1 shadow-sketch-sm hover:border-amber-500 hover:scale-102 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 text-xl shadow-2xs">
              🎨
            </div>
            <span className="font-display font-black text-xs sm:text-sm text-ink">
              11 MOOD STICKERS
            </span>
            <span className="font-handwritten text-[11px] text-amber-700 font-bold">
              Kritika Poses & Quotes
            </span>
          </button>
        </div>

        {/* BOTTOM NAVIGATION: Map, Stats, Classroom Tribute */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('map');
            }}
            className="bg-white border-2 border-pink-200 rounded-2xl p-2.5 flex flex-col items-center text-center space-y-0.5 shadow-2xs hover:border-pink-400 transition-all"
          >
            <Map className="w-4 h-4 text-pink-600" />
            <span className="font-display font-black text-[11px]">THE MAP</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('profile');
            }}
            className="bg-white border-2 border-amber-200 rounded-2xl p-2.5 flex flex-col items-center text-center space-y-0.5 shadow-2xs hover:border-amber-400 transition-all"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-display font-black text-[11px]">CHEF STATS</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('fanfare');
              onNavigate('secret_classroom');
            }}
            className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white border-2 border-ink rounded-2xl p-2.5 flex flex-col items-center text-center space-y-0.5 shadow-2xs hover:opacity-95 transition-all"
          >
            <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
            <span className="font-display font-black text-[11px]">CLASS TRIBUTE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
