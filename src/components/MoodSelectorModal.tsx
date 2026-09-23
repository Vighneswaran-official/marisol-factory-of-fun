import React from 'react';
import { STICKERS, type StickerData } from '../data/stickers';
import { RECIPES_BY_MOOD } from '../data/recipes';
import { BaseModal } from './BaseModal';
import { Sparkles, Utensils } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface MoodSelectorModalProps {
  currentMood: string;
  onSelectMood: (moodAlias: string) => void;
  onClose: () => void;
  onOpenComfortCorner?: () => void;
}

export const MoodSelectorModal: React.FC<MoodSelectorModalProps> = ({
  currentMood,
  onSelectMood,
  onClose,
  onOpenComfortCorner,
}) => {
  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-2xl"
      icon={<div className="w-full h-full bg-coral-500 rounded-xl flex items-center justify-center text-white"><Utensils className="w-5 h-5 text-white" /></div>}
      title="SELECT YOUR COOKING MOOD ♡"
      subtitle="Pick from Kritika's 11 mood stickers to flavor your trivia and unlock a matching recipe!"
    >
      <div className="space-y-4">

        {/* Girl's Perspective Angry / Stressed Quick Action */}
        {onOpenComfortCorner && (
          <button
            onClick={() => {
              audioEngine.playSfx('powerup');
              onClose();
              onOpenComfortCorner();
            }}
            className="w-full bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 border-2 border-coral-500 rounded-2xl p-3 text-left flex items-center justify-between shadow-sketch-xs hover:scale-101 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-coral-500 text-white flex items-center justify-center text-lg shadow-inner shrink-0">
                😤
              </div>
              <div>
                <div className="font-display font-black text-xs sm:text-sm text-ink group-hover:text-coral-600 transition-colors flex items-center gap-1.5">
                  <span>Feeling Angry, Hangry, or Stressed?</span>
                  <span className="bg-coral-500 text-white text-[10px] px-2 py-0.5 rounded-full font-handwritten">GIRL'S TLC ♡</span>
                </div>
                <div className="font-handwritten text-xs text-ink-light font-bold">
                  Tap here for validation, hangry comfort food, vent poppers & free cucumber sandwiches!
                </div>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-coral-500 shrink-0" />
          </button>
        )}

        {/* 11 Mood Stickers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {STICKERS.map((sticker: StickerData) => {
            const isSelected = sticker.alias === currentMood;
            const pairedRecipe = RECIPES_BY_MOOD[sticker.alias];

            return (
              <button
                key={sticker.id}
                onClick={() => {
                  audioEngine.playSfx('click');
                  onSelectMood(sticker.alias);
                }}
                className={`
                  p-3 rounded-2xl border-2.5 transition-all text-left flex items-center gap-3.5 relative group
                  ${
                    isSelected
                      ? 'border-ink bg-doodleGold/30 ring-2 ring-doodleGold shadow-sketch'
                      : 'border-ink/30 bg-white hover:border-ink hover:bg-paper-100 hover:shadow-sketch-sm'
                  }
                `}
              >
                {/* Sticker Avatar */}
                <div className="w-14 h-14 rounded-full border-2 border-ink overflow-hidden shrink-0 bg-[#FAF7F0] shadow-sm group-hover:scale-105 transition-transform">
                  <img
                    src={sticker.avatarUrl}
                    alt={sticker.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{sticker.badgeEmoji}</span>
                    <span className="font-display font-black text-xs sm:text-sm text-ink truncate block">
                      {sticker.quote.replace(' ♡', '')}
                    </span>
                  </div>

                  <div className="font-handwritten text-xs text-ink-light font-bold truncate mt-0.5">
                    "{sticker.vibe}"
                  </div>

                  {pairedRecipe && (
                    <div className="mt-1 text-[11px] font-sans font-semibold text-coral-600 truncate flex items-center gap-1">
                      <span>🍲 Dish:</span>
                      <span className="truncate">{pairedRecipe.title.split('&')[0]}</span>
                    </div>
                  )}
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-coral-500 text-white rounded-full px-2 py-0.5 font-handwritten text-[10px] font-bold border border-ink shadow-xs">
                    ACTIVE
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Tip */}
        <div className="bg-amber-50 border-1.5 border-ink/30 rounded-2xl p-3 text-center">
          <p className="font-handwritten text-xs text-ink font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-doodleGold" />
            <span>Every correct question earns Cucumber Sandwiches 🥪 and gathers secret ingredients!</span>
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
