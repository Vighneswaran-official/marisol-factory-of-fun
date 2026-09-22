import React from 'react';
import { wellnessState } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import { RECIPES } from '../data/recipes';
import { X, Coffee, Film } from 'lucide-react';

interface CozyModeOverlayProps {
  onClose: () => void;
  onOpenMusic: () => void;
}

export const CozyModeOverlay: React.FC<CozyModeOverlayProps> = ({ onClose, onOpenMusic }) => {
  const pinnedIds = wellnessState.getPinnedSongIds();
  const allSongs = wellnessState.getAllSongs();
  const favoriteSong = allSongs.find(s => pinnedIds.includes(s.id)) || allSongs[0];
  const chaiRecipe = RECIPES.find(r => r.id === 'bollywood_masala_chai') || RECIPES[1];

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#372E3A]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Blanket-Wrap Transition Container */}
      <div 
        className="bg-gradient-to-br from-[#FFFDF7] via-[#FFF8F0] to-[#FAF5FF] border-3 border-pink-300/80 rounded-4xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-sketch-2xl space-y-4 relative animate-blanket-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border-2 border-pink-200 flex items-center justify-center font-black bg-white hover:bg-pink-100 transition-colors z-20 shadow-xs"
        >
          <X className="w-5 h-5 text-pink-700" />
        </button>

        {/* Cozy Blanket Header */}
        <div className="text-center space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full font-handwritten text-xs font-bold shadow-2xs">
            <span>☁️</span>
            <span>COZY MODE ACTIVATED</span>
            <span>🤍</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
            Wrap Yourself in Warmth, Babe
          </h2>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold max-w-sm mx-auto">
            Notifications on pause. Warm chai steaming. Your favorite song ready. You've earned this tranquility.
          </p>
        </div>

        {/* Cozy Trifecta: Pinned Song, Tapri Chai, Movie Recommendation */}
        <div className="space-y-3 pt-1">
          
          {/* Item 1: Favorite Pinned Song */}
          <div className="bg-white/90 border-2 border-pink-200 rounded-3xl p-4 flex items-center justify-between shadow-sketch-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                {favoriteSong.emoji}
              </div>
              <div>
                <span className="text-[10px] uppercase font-handwritten font-bold text-pink-600 block">
                  YOUR #1 PINNED TRACK 🎵
                </span>
                <h4 className="font-display font-black text-sm text-ink truncate">
                  {favoriteSong.title}
                </h4>
                <p className="font-handwritten text-xs text-ink-light font-bold">
                  {favoriteSong.movie} • {favoriteSong.singers}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onClose();
                onOpenMusic();
              }}
              className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-display font-black text-xs rounded-xl shadow-xs shrink-0"
            >
              PLAY NOW
            </button>
          </div>

          {/* Item 2: Highway Tapri Masala Chai */}
          <div className="bg-white/90 border-2 border-amber-200 rounded-3xl p-4 flex items-center justify-between shadow-sketch-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-handwritten font-bold text-amber-700 block">
                  COZY CHAI PRESCRIPTION ☕
                </span>
                <h4 className="font-display font-black text-sm text-ink truncate">
                  {chaiRecipe.title.split('&')[0]}
                </h4>
                <p className="font-handwritten text-xs text-ink-light font-bold">
                  Crushed ginger, green cardamom & warm milk hug
                </p>
              </div>
            </div>

            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-amber-300 font-handwritten">
              20 Mins
            </span>
          </div>

          {/* Item 3: Recommended Movie Pairing */}
          <div className="bg-white/90 border-2 border-purple-200 rounded-3xl p-4 flex items-center justify-between shadow-sketch-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-400 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-handwritten font-bold text-purple-700 block">
                  MOVIE NIGHT PAIRING 🎬
                </span>
                <h4 className="font-display font-black text-sm text-ink truncate">
                  Jab We Met & Dil Se
                </h4>
                <p className="font-handwritten text-xs text-ink-light font-bold">
                  Monsoon romance & unstoppable smiles
                </p>
              </div>
            </div>

            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-purple-300 font-handwritten">
              Feel Good
            </span>
          </div>

        </div>

        {/* Ambient Affirmation */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 text-center">
          <p className="font-handwritten text-xs sm:text-sm text-amber-900 font-bold italic">
            "Give yourself permission to just be. The world can wait while you enjoy your warm sip." 🤍
          </p>
        </div>

        {/* Return Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:from-amber-300 hover:to-purple-300 text-ink font-display font-black text-xs uppercase rounded-2xl border-2 border-ink shadow-sketch hover:scale-101 active:scale-98 transition-all"
        >
          STAY IN COZY PEACE ☁️
        </button>

      </div>
    </div>
  );
};
