import React from 'react';
import { BaseModal } from './BaseModal';
import { moodHistoryManager, type MoodHistoryEntry } from '../services/moodRotationService';
import { Calendar, Lock, Sparkles } from 'lucide-react';

interface MoodHistoryModalProps {
  onClose: () => void;
}

export const MoodHistoryModal: React.FC<MoodHistoryModalProps> = ({ onClose }) => {
  const history = moodHistoryManager.getMoodHistory();

  // Generate last 14 days for the soft heatmap
  const last14Days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toISOString().split('T')[0];
    const match = history.find(h => h.date === dateStr);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const dayNumber = d.getDate();
    return { dateStr, dayLabel, dayNumber, match };
  });

  return (
    <BaseModal
      onClose={onClose}
      title="MOOD CALENDAR & STREAK"
      subtitle="Kritika's 14-Day Comfort & Mood Heatmap"
      icon={<Calendar className="w-5 h-5 text-rose-600" />}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 text-left">
        {/* Soft Heatmap Grid */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200 rounded-3xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-display font-black text-xs uppercase text-rose-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>14-Day Mood Flow</span>
            </span>
            <span className="text-[10px] font-handwritten font-bold text-rose-700 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200">
              {history.length} Check-ins Recorded
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-1">
            {last14Days.map(d => {
              const isCheckedIn = Boolean(d.match);
              return (
                <div
                  key={d.dateStr}
                  className={`p-2 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                    isCheckedIn
                      ? 'bg-white border-pink-300 shadow-xs'
                      : 'bg-white/40 border-stone-200/60 opacity-60'
                  }`}
                  title={d.match ? `${d.dateStr}: ${d.match.moodLabel} (Scale ${d.match.scaleNumber}/9)` : `${d.dateStr}: No entry`}
                >
                  <span className="text-[10px] font-bold text-stone-500">{d.dayLabel}</span>
                  <span className="text-xs font-black text-stone-800">{d.dayNumber}</span>
                  <span className="text-base my-0.5">
                    {d.match ? d.match.emoji : '·'}
                  </span>
                  {d.match && (
                    <span className="text-[9px] font-display font-bold text-rose-600">
                      #{d.match.scaleNumber}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Past Check-Ins */}
        <div className="space-y-2">
          <span className="font-display font-black text-xs uppercase text-stone-700 block">
            Recent Check-In Entries:
          </span>

          {history.length === 0 ? (
            <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-6 text-center text-stone-500 font-handwritten text-xs font-bold">
              No mood check-ins recorded yet. Tap any mood on the scale to log today's feeling! 🌸
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {history.map((entry: MoodHistoryEntry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-stone-200 rounded-2xl p-3 shadow-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{entry.emoji}</span>
                      <div>
                        <div className="font-display font-black text-xs text-stone-800">
                          {entry.moodLabel} (Scale #{entry.scaleNumber})
                        </div>
                        <div className="text-[10px] text-stone-500 font-medium">
                          {entry.date}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-handwritten font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      Comfort Macaroni 🧀
                    </span>
                  </div>

                  {entry.privateNote && (
                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-200/80 text-xs font-handwritten text-stone-700 flex items-start gap-1.5 mt-1">
                      <Lock className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                      <span className="italic">"{entry.privateNote}"</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
