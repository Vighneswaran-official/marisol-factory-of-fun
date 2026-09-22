import React, { useEffect, useState } from 'react';
import type { ScreenState } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import { Play, Award, Map, Sparkles, Music2, Heart, Flame } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenState) => void;
  onQuickPlay: () => void;
  onOpenMusic: () => void;
  onOpenComfortCorner: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onQuickPlay,
  onOpenMusic,
  onOpenComfortCorner,
}) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-28 text-ink">
      <div className="max-w-xl mx-auto space-y-5">
        
        {/* TOP STATUS BAR: Quick Music Mini-Controller */}
        <div className="bg-white border-2 border-ink rounded-2xl p-2.5 shadow-sketch-sm flex items-center justify-between gap-3">
          <button
            onClick={onOpenMusic}
            className="flex items-center gap-2 min-w-0 text-left hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
              <Music2 className="w-4 h-4 animate-bounce" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-handwritten font-bold text-purple-700 block">
                HINDI BOLLYWOOD JUKEBOX 🎵
              </span>
              <span className="font-display font-black text-xs text-ink truncate block">
                🌸 Love You Zindagi, Ilahi, Yeh Ishq Hai & more
              </span>
            </div>
          </button>

          <button
            onClick={onOpenMusic}
            className="px-3 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 border border-ink text-purple-900 font-display font-black text-xs shrink-0 shadow-xs"
          >
            OPEN SONGS
          </button>
        </div>

        {/* HERO CARD: Kritika Companion & Chef Score Hub */}
        <div className="bg-white border-3 border-ink rounded-3xl p-5 sm:p-6 shadow-sketch-xl text-center space-y-4 relative overflow-hidden">
          
          {/* Top Mentor Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-doodleGold/20 border border-ink/40 px-3 py-1 rounded-full font-handwritten text-xs font-bold text-ink">
              <Sparkles className="w-3.5 h-3.5 text-doodleGold" />
              <span>KRITIKA'S FACTORY OF FUN</span>
            </div>

            {player.streak > 0 && (
              <div className="inline-flex items-center gap-1 bg-amber-500 text-white font-display font-black text-xs px-2.5 py-0.5 rounded-full border border-ink shadow-xs">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>STREAK: {player.streak}</span>
              </div>
            )}
          </div>

          {/* Kritika Companion with Dialogue */}
          <div className="flex justify-center pt-1">
            <Marisol
              pose={player.activeSticker}
              expression={player.streak >= 3 ? 'excited' : 'welcome'}
              size="large"
              dialogue={
                player.streak >= 3
                  ? `You're on a ${player.streak}-question streak! You're unstoppable!`
                  : `Ready for fresh cooking trivia & cucumber sandwiches? ♡`
              }
              bubblePosition="top"
              onClick={() => {
                audioEngine.playSfx('powerup');
                onNavigate('stickers');
              }}
            />
          </div>

          {/* Quick Mood Sticker Switcher */}
          <div>
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('stickers');
              }}
              className="inline-flex items-center gap-2 bg-[#FAF7F0] border-1.5 border-ink hover:border-coral-500 px-3.5 py-1.5 rounded-full font-handwritten text-xs font-bold shadow-xs transition-all hover:scale-102"
            >
              <span>✨</span>
              <span>11 Mood Stickers — Tap to Change Vibe</span>
              <Sparkles className="w-3 h-3 text-coral-500" />
            </button>
          </div>

          {/* Chef Rank & Cucumber Sandwiches Score Board */}
          <div className="space-y-2 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-3.5 text-left shadow-inner">
            <div className="flex justify-between items-center font-display text-xs sm:text-sm font-black text-ink">
              <span className="text-emerald-900 flex items-center gap-1.5">
                <span className="text-base">👩‍🍳</span> {player.chefTitle || 'Apprentice Chopper 🥒'}
              </span>
              <span className="text-emerald-800 bg-white border-1.5 border-emerald-500 px-2.5 py-1 rounded-xl shadow-xs font-black">
                {player.cucumberSandwiches || 0} 🥪 Cucumber Sandwiches
              </span>
            </div>

            {/* Progress to Next Chef Title */}
            <div className="w-full h-3.5 bg-white border-1.5 border-ink rounded-full overflow-hidden shadow-inner relative">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 border-r-1.5 border-ink transition-all duration-500"
                style={{ width: `${Math.min(100, ((player.cucumberSandwiches || 0) % 25) * 4)}%` }}
              />
            </div>

            <div className="flex justify-between items-center font-handwritten text-[11px] text-ink-light font-bold">
              <span>Earn +3 Cucumber Sandwiches per correct trivia answer</span>
              <span>Next Chef Rank at {(Math.floor((player.cucumberSandwiches || 0) / 25) + 1) * 25} 🥪</span>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTION 1: BIG VIBRANT COOKING & CINEMA TRIVIA BUTTON */}
        <button
          onClick={() => {
            audioEngine.playSfx('click');
            onQuickPlay();
          }}
          className="sketch-btn-primary w-full p-4 sm:p-5 text-xl sm:text-2xl font-black uppercase flex items-center justify-between shadow-sketch-xl hover:scale-102 active:scale-98 transition-all bg-emerald-600 hover:bg-emerald-700 border-3 border-ink"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🍳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span>COOKING & CINEMA TRIVIA</span>
                <span className="bg-white text-emerald-800 font-display text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ENDLESS
                </span>
              </div>
              <span className="block font-handwritten text-xs sm:text-sm text-paper-100 normal-case font-bold mt-0.5">
                Pick mood, answer food & film questions, reveal secret ingredients & unlock recipes!
              </span>
            </div>
          </div>
          <Play className="w-7 h-7 fill-white shrink-0 ml-2" />
        </button>

        {/* PRIMARY ACTION 2 & 3: MUSIC JUKEBOX & GIRL'S COMFORT CORNER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Card: Music Jukebox */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenMusic();
            }}
            className="w-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
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
                  <span className="font-display font-black text-sm uppercase">BOLLYWOOD HITS</span>
                  <span className="text-xs">🎵</span>
                </div>
                <div className="font-handwritten text-xs text-purple-100 font-bold truncate">
                  Love You Zindagi, Yeh Ishq Hai & more!
                </div>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-purple-200 group-hover:rotate-45 transition-transform shrink-0" />
          </button>

          {/* Card: Girl's Comfort Corner (Angry/Stressed/Hangry SOS) */}
          <button
            onClick={() => {
              audioEngine.playSfx('powerup');
              onOpenComfortCorner();
            }}
            className="w-full bg-gradient-to-br from-rose-400 to-pink-600 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
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
                  Angry or hangry? Validation, popper & +5 free sandwiches!
                </div>
              </div>
            </div>
            <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform shrink-0" />
          </button>
        </div>

        {/* PRIMARY ACTION 4 & 5: RECIPE VAULT & 11 STICKERS VAULT */}
        <div className="grid grid-cols-2 gap-3.5">
          
          {/* Recipe Vault */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('recipes');
            }}
            className="sketch-btn p-4 flex flex-col items-center justify-center text-center gap-1.5 bg-white shadow-sketch hover:scale-102 transition-all border-2.5 border-ink rounded-3xl"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border-1.5 border-emerald-500 flex items-center justify-center text-emerald-800 text-xl shadow-inner">
              📖
            </div>
            <span className="font-display font-black text-xs sm:text-sm">RECIPE VAULT</span>
            <span className="font-handwritten text-[11px] text-ink-light font-bold">
              Movie Pairings & Dishes
            </span>
          </button>

          {/* 11 Mood Stickers Vault */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('stickers');
            }}
            className="sketch-btn p-4 flex flex-col items-center justify-center text-center gap-1.5 bg-white shadow-sketch hover:scale-102 transition-all border-2.5 border-ink rounded-3xl"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-100 border-1.5 border-pink-500 flex items-center justify-center text-pink-800 text-xl shadow-inner">
              🎨
            </div>
            <span className="font-display font-black text-xs sm:text-sm">11 MOOD STICKERS</span>
            <span className="font-handwritten text-[11px] text-ink-light font-bold">
              Kritika Poses & Quotes
            </span>
          </button>
        </div>

        {/* SECONDARY ROW: EXPLORATION & CLASSROOM */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('map');
            }}
            className="bg-white border-2 border-ink rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-sketch-xs hover:border-doodleTeal transition-all"
          >
            <Map className="w-5 h-5 text-doodleTeal" />
            <span className="font-display font-black text-[11px]">THE MAP</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('profile');
            }}
            className="bg-white border-2 border-ink rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-sketch-xs hover:border-doodleGold transition-all"
          >
            <Award className="w-5 h-5 text-doodleGold" />
            <span className="font-display font-black text-[11px]">CHEF STATS</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('fanfare');
              onNavigate('secret_classroom');
            }}
            className="bg-plum-700 text-white border-2 border-ink rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-sketch-xs hover:bg-plum-600 transition-all"
          >
            <Heart className="w-5 h-5 text-coral-400 fill-coral-400" />
            <span className="font-display font-black text-[11px]">CLASS TRIBUTE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
