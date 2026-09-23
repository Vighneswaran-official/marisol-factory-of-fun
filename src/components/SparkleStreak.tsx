import React, { useState, useEffect } from 'react';
import { wellnessState } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { Flame, Sparkles } from 'lucide-react';

export const SparkleStreak: React.FC = () => {
  const [, setTick] = useState(0);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const { streak } = wellnessState.getSparkleStreak();
  const heatmapDays = wellnessState.getStreakHeatmap();

  const handleSparkleCheckIn = () => {
    audioEngine.playSfx('fanfare');
    const checked = wellnessState.checkInDaily();
    if (checked) {
      wellnessState.addSparkleStreak();
    }
    setJustCheckedIn(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F59E0B', '#F43F5E', '#A855F7']
    });
    setTimeout(() => setJustCheckedIn(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50/95 via-rose-50/90 to-purple-50/95 border-2.5 border-amber-300 rounded-3xl p-4 shadow-sketch text-left space-y-3 relative overflow-hidden">
      
      {/* Header with Flame Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-sketch-xs border-1.5 border-ink">
            <Flame className="w-5 h-5 fill-white animate-bounce-gentle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-display font-black text-sm text-ink uppercase tracking-wider">
                DAILY FLAME STREAK
              </h3>
              <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-white font-display text-[10px] font-black px-2 py-0.5 rounded-full border border-ink shadow-2xs">
                🔥 {streak} {streak === 1 ? 'DAY' : 'DAYS'}
              </span>
            </div>
            <p className="font-handwritten text-xs text-ink-light font-bold">
              Consecutive days of checking in & choosing joy, queen!
            </p>
          </div>
        </div>

        <button
          onClick={handleSparkleCheckIn}
          disabled={justCheckedIn}
          className={`
            px-3 py-1.5 rounded-2xl font-display font-black text-xs uppercase border-2 shadow-sketch-xs transition-all flex items-center gap-1.5 shrink-0
            ${
              justCheckedIn
                ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                : 'bg-white hover:bg-amber-100 text-amber-950 border-ink hover:scale-105 active:scale-95'
            }
          `}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{justCheckedIn ? 'Checked In! ✨' : 'Check In'}</span>
        </button>
      </div>

      {/* 7-Day Doodle Heatmap Grid */}
      <div className="bg-white/80 border-2 border-amber-200/90 rounded-2xl p-2.5 shadow-inner">
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {heatmapDays.map((item) => (
            <div key={item.date} className="flex flex-col items-center gap-1">
              <span className="font-handwritten text-[10px] font-bold text-ink-light">
                {item.dayLabel}
              </span>

              <div
                title={`${item.date} ${item.active ? '(Active)' : '(Missed)'}`}
                className={`
                  w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center text-xs font-black transition-all relative
                  ${
                    item.active
                      ? 'bg-gradient-to-tr from-amber-400 to-rose-400 text-white border-ink shadow-xs scale-102'
                      : 'bg-paper-100 border-ink/20 text-stone-300'
                  }
                  ${item.isToday ? 'ring-2 ring-rose-400 ring-offset-1' : ''}
                `}
              >
                {item.active ? (
                  <span className="text-sm">🔥</span>
                ) : (
                  <span className="text-stone-300 text-[10px]">•</span>
                )}

                {item.isToday && (
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-rose-500 border border-white rounded-full animate-ping" />
                )}
              </div>

              <span className="font-display font-bold text-[9px] text-ink-light">
                {item.date.split('-')[2]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement Footer */}
      <div className="text-center font-handwritten text-xs text-amber-900 font-bold bg-white/70 py-1 px-3 rounded-full border border-amber-200/80">
        "Consistency is a love letter to your future self." 🎀 Keep glowing!
      </div>
    </div>
  );
};
