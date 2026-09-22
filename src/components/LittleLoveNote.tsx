import React, { useState } from 'react';
import { wellnessState } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';

export const LittleLoveNote: React.FC = () => {
  const [loveNote, setLoveNote] = useState(() => wellnessState.getCurrentLoveNote());
  const [isFlipping, setIsFlipping] = useState(false);

  const handleDrawNext = () => {
    audioEngine.playSfx('powerup');
    setIsFlipping(true);
    setTimeout(() => {
      const next = wellnessState.drawNextLoveNote();
      setLoveNote(next);
      setIsFlipping(false);
    }, 200);
  };

  const washiClass = 
    loveNote.washiColor === 'pink' 
      ? 'washi-tape' 
      : loveNote.washiColor === 'lavender' 
      ? 'washi-tape-lavender' 
      : 'washi-tape';

  return (
    <div className="relative pt-3">
      {/* Washi Tape Strip on Top */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 z-10 w-28 h-5 ${washiClass} rounded-xs shadow-xs`} />

      {/* Pastel Sticky Love Note Card */}
      <div className={`
        bg-gradient-to-br from-rose-50/90 via-pink-50 to-amber-50/80
        border-2.5 border-pink-300 rounded-3xl p-5 shadow-sketch relative overflow-hidden transition-all duration-300
        ${isFlipping ? 'scale-95 opacity-50 rotate-1' : 'scale-100 opacity-100 rotate-0'}
      `}>
        {/* Background Notebook Line Effect */}
        <div className="absolute inset-0 notebook-lines pointer-events-none opacity-40" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10 pb-2 border-b border-pink-200/60">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-heart-pop" />
            <span className="font-display font-black text-xs uppercase tracking-wider text-pink-900">
              LITTLE LOVE NOTE FOR KRITIKA 💌
            </span>
          </div>

          <button
            onClick={handleDrawNext}
            className="flex items-center gap-1 font-handwritten text-xs font-bold text-pink-700 hover:text-pink-900 bg-white/70 px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs hover:scale-105 active:scale-95 transition-all"
            title="Draw another love note"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Draw Note 🎀</span>
          </button>
        </div>

        {/* Note Content */}
        <div className="pt-3 pb-2 relative z-10 space-y-2 text-left">
          <p className="font-handwritten text-base sm:text-lg text-ink font-bold leading-relaxed italic">
            "{loveNote.quote}"
          </p>

          <p className="font-sans text-xs text-pink-700 font-medium">
            ✨ {loveNote.subtext}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="font-handwritten text-xs text-ink-light font-bold">
              {loveNote.from}
            </span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
