import React, { useState } from 'react';
import type { ScreenState, Recipe } from '../types/game';
import { RecipeVault } from './RecipeVault';
import { StickerCollection } from './StickerCollection';
import { KnowledgePassport } from './KnowledgePassport';
import { Utensils, Sparkles, BookOpen } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { RECIPES } from '../data/recipes';

export type VaultTab = 'recipes' | 'stickers' | 'passport';

interface VaultHubProps {
  initialTab?: VaultTab;
  onNavigate: (screen: ScreenState) => void;
  onCookRecipe: (recipe: Recipe) => void;
  onSelectMood?: (stickerAlias: string) => void;
}

export const VaultHub: React.FC<VaultHubProps> = ({
  initialTab = 'recipes',
  onNavigate,
  onCookRecipe,
  onSelectMood,
}) => {
  const [activeVaultTab, setActiveVaultTab] = useState<VaultTab>(initialTab);
  const unlockedRecipesCount = gameState.getUnlockedRecipes().length;

  return (
    <div className="min-h-screen bg-[#FAF7F0] pb-24 text-ink">
      {/* Top Floating Vault Category Switcher */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-ink/20 shadow-xs py-2.5 px-3 sm:px-6">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-1.5 bg-paper-100 p-1.5 rounded-2xl border-2 border-ink/40 shadow-inner">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveVaultTab('recipes');
            }}
            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-display text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all ${
              activeVaultTab === 'recipes'
                ? 'bg-emerald-600 text-white shadow-sketch-xs border-1.5 border-ink scale-102'
                : 'text-ink-light hover:text-ink hover:bg-white/60'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">RECIPES ({unlockedRecipesCount}/{RECIPES.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveVaultTab('stickers');
            }}
            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-display text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all ${
              activeVaultTab === 'stickers'
                ? 'bg-pink-600 text-white shadow-sketch-xs border-1.5 border-ink scale-102'
                : 'text-ink-light hover:text-ink hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">STICKERS (11/11)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveVaultTab('passport');
            }}
            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-display text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all ${
              activeVaultTab === 'passport'
                ? 'bg-plum-700 text-white shadow-sketch-xs border-1.5 border-ink scale-102'
                : 'text-ink-light hover:text-ink hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">PASSPORT</span>
          </button>
        </div>
      </div>

      {/* Render Active Sub-Vault Screen */}
      <div className="animate-fade-in">
        {activeVaultTab === 'recipes' && (
          <RecipeVault
            onNavigate={onNavigate}
            onCookRecipe={onCookRecipe}
            hideHomeButton
          />
        )}

        {activeVaultTab === 'stickers' && (
          <StickerCollection
            onNavigate={onNavigate}
            onSelectMood={onSelectMood}
            hideHomeButton
          />
        )}

        {activeVaultTab === 'passport' && (
          <KnowledgePassport
            onNavigate={onNavigate}
            hideHomeButton
          />
        )}
      </div>
    </div>
  );
};
