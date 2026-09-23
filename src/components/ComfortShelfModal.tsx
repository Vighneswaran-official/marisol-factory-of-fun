import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { moodHistoryManager, type ComfortBookmark } from '../services/moodRotationService';
import { Heart, Trash2 } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface ComfortShelfModalProps {
  onClose: () => void;
}

export const ComfortShelfModal: React.FC<ComfortShelfModalProps> = ({ onClose }) => {
  const [, setTick] = useState(0);
  const bookmarks = moodHistoryManager.getBookmarks();

  const handleRemove = (b: ComfortBookmark) => {
    audioEngine.playSfx('click');
    moodHistoryManager.toggleBookmark(b);
    setTick(t => t + 1);
  };

  return (
    <BaseModal
      onClose={onClose}
      title="COMFORT SHELF"
      subtitle="Kritika's Saved Macaronis & Favorite Notes"
      icon={<Heart className="w-5 h-5 text-rose-500 fill-rose-500" />}
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {bookmarks.length === 0 ? (
          <div className="bg-pink-50/50 border border-dashed border-pink-200 rounded-3xl p-8 text-center space-y-2">
            <div className="text-3xl">🧀💖</div>
            <h4 className="font-display font-black text-sm text-stone-800">
              Your Comfort Shelf is Empty
            </h4>
            <p className="font-handwritten text-xs text-stone-600 font-bold">
              Tap the heart icon on any Macaroni dish or affirmation to save it here for instant comfort anytime!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {bookmarks.map((b: ComfortBookmark) => (
              <div
                key={b.id}
                className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-xs flex items-center justify-between gap-3 hover:border-pink-300 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {b.emoji}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-display font-black text-xs text-stone-800 truncate">
                      {b.title}
                    </h5>
                    <p className="font-sans text-[11px] text-stone-500 truncate">
                      {b.subtitle}
                    </p>
                    <span className="text-[9px] font-handwritten text-rose-600 font-bold">
                      Saved {b.savedAt}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(b)}
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                  title="Remove from Comfort Shelf"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseModal>
  );
};
