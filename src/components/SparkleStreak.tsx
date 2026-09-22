import React, { useState, useEffect } from 'react';
import { wellnessState } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Flame } from 'lucide-react';

export const SparkleStreak: React.FC = () => {
  const [, setTick] = useState(0);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const { streak, trail } = wellnessState.getSparkleStreak();

  const handleSparkleCheckIn = () => {
    audioEngine.playSfx('fanfare');
    wellnessState.addSparkleStreak();
    setJustCheckedIn(true);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F59E0B', '#F43F5E', '#A855F7']
    });
    setTimeout(() => setJustCheckedIn(false), 2000);
  };

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-gradient-to-r from-amber-50/90 via-pink-50/80 to-purple-50/90 border-2.5 border-amber-300/80 rounded-3xl p-4 shadow-sketch text-left space-y-3 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-white flex items-center justify-center shadow-xs">
            <Flame className="w-4 h-4 fill-white animate-bounce-gentle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-black text-xs sm:text-sm text-ink uppercase tracking-wider">
                SPARKLE STREAK ✨
              </h3>
              <span className="bg-amber-100 text-amber-800 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                {streak} Days Glowing
              </span>
            </div>
            <p className="font-handwritten text-[11px] text-ink-light font-bold">
              Consecutive days of taking time for yourself, queen!
            </p>
          </div>
        </div>

        <button
          onClick={handleSparkleCheckIn}
          disabled={justCheckedIn}
          className={`
            px-2.5 py-1 rounded-xl font-display font-black text-[11px] uppercase border shadow-2xs transition-all flex items-center gap-1
            ${
              justCheckedIn
                ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300 hover:scale-105 active:scale-95'
            }
          `}
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{justCheckedIn ? 'Glow Added!' : 'Add Sparkle ✨'}</span>
        </button>
      </div>

      {/* Constellation Trail Visual */}
      <div className="flex items-center justify-between pt-1 relative">
        {/* Connecting Ribbon Line */}
        <div className="absolute top-1/2 left-3 right-3 h-1 bg-amber-200/70 -translate-y-1/2 z-0 rounded-full" />

        {trail.map((active, idx) => (
          <div key={idx} className="flex flex-col items-center relative z-10 gap-1">
            <div 
              className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-2xs
                ${
                  active
                    ? 'bg-amber-400 border-amber-600 text-white scale-110 ring-2 ring-amber-300'
                    : 'bg-white border-amber-200 text-amber-300 scale-95'
                }
              `}
            >
              <Star className={`w-3.5 h-3.5 ${active ? 'fill-white animate-pulse' : ''}`} />
            </div>
            <span className="font-handwritten text-[10px] text-ink-light font-bold">
              {dayLabels[idx]}
            </span>
          </div>
        ))}
      </div>

      {/* Encouragement Footer */}
      <div className="text-center font-handwritten text-xs text-amber-900 font-bold bg-white/60 py-1 px-3 rounded-full border border-amber-200/50">
        "Consistency is a love letter to your future self." 🎀 Keep shining!
      </div>
    </div>
  );
};
