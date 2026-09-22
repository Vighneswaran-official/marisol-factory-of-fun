import React from 'react';
import { gameState } from '../services/gameState';
import { wellnessState } from '../services/wellnessState';
import { RECIPES } from '../data/recipes';
import { X, Sparkles, Heart, Camera } from 'lucide-react';

interface GlowUpWeekModalProps {
  onClose: () => void;
}

export const GlowUpWeekModal: React.FC<GlowUpWeekModalProps> = ({ onClose }) => {
  const player = gameState.getPlayer();
  const pinnedIds = wellnessState.getPinnedSongIds();
  const allSongs = wellnessState.getAllSongs();
  const topSong = allSongs.find(s => pinnedIds.includes(s.id)) || allSongs[0];
  const unlockedRecipes = RECIPES.filter(r => (player.unlockedRecipes || []).includes(r.id));
  const featuredRecipe = unlockedRecipes[0] || RECIPES[0];

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-lg sm:text-xl text-ink leading-tight">
                  YOUR GLOW-UP WEEK 📸
                </h2>
                <span className="bg-pink-100 text-pink-700 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-300">
                  SCRAPBOOK
                </span>
              </div>
              <p className="font-handwritten text-xs text-ink-light font-bold">
                A polaroid memory reel of your triumphs, songs, and flavors!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          
          {/* Polaroid 1: Chef Rank & Cucumber Sandwiches */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[-1deg] text-center space-y-2 relative">
            <div className="washi-tape w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-emerald-50 rounded-xl border border-emerald-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">🥪</span>
              <span className="font-display font-black text-xl text-emerald-800">
                {player.cucumberSandwiches || 0} Sandwiches
              </span>
              <span className="font-handwritten text-[11px] text-emerald-700 font-bold">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Brain fuel earned with flying colors!" ♡
            </p>
          </div>

          {/* Polaroid 2: Pinned Song Jam */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[1.5deg] text-center space-y-2 relative">
            <div className="washi-tape-lavender w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-purple-50 rounded-xl border border-purple-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">{topSong.emoji}</span>
              <span className="font-display font-black text-sm text-purple-900 truncate max-w-full">
                {topSong.title}
              </span>
              <span className="font-handwritten text-[11px] text-purple-700 font-bold truncate">
                {topSong.movie}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Your weekly soundtrack vibe!" 🎵
            </p>
          </div>

          {/* Polaroid 3: Unlocked Recipe Milestone */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[1deg] text-center space-y-2 relative">
            <div className="washi-tape w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-rose-50 rounded-xl border border-rose-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">{featuredRecipe.emoji}</span>
              <span className="font-display font-black text-xs text-rose-900 truncate max-w-full">
                {featuredRecipe.title.split('&')[0]}
              </span>
              <span className="font-handwritten text-[10px] text-rose-700 font-bold">
                Paired with {featuredRecipe.moviePairing.movie.split('(')[0]}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Signature dish of the week!" 🍳
            </p>
          </div>

          {/* Polaroid 4: Queen's Companion Sticker */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[-1.5deg] text-center space-y-2 relative">
            <div className="washi-tape-lavender w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-amber-50 rounded-xl border border-amber-300 flex items-center justify-center p-2 shadow-inner overflow-hidden">
              <img 
                src="/marisol/avatars/03_wink_conquer.png" 
                alt="Kritika wink" 
                className="h-full object-contain"
              />
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Wink & conquer every challenge!" 😉
            </p>
          </div>

        </div>

        {/* Weekly Sisterly Summary Banner */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-amber-100 border-2 border-pink-300 rounded-2xl p-3.5 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-display font-black text-xs text-pink-900">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            <span>QUEEN'S VERDICT</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-handwritten text-xs sm:text-sm text-ink font-bold">
            "You brought warmth, wisdom, and unmatched style to every single day this week. So proud of you, Kritika!" ♡
          </p>
        </div>

      </div>
    </div>
  );
};
