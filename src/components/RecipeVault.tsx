import React, { useState } from 'react';
import type { ScreenState, Recipe } from '../types/game';
import { RECIPES } from '../data/recipes';
import { gameState } from '../services/gameState';
import { ArrowLeft, ChefHat, Film, Clock, Lock, Sparkles } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface RecipeVaultProps {
  onNavigate: (screen: ScreenState) => void;
  onCookRecipe: (recipe: Recipe) => void;
}

export const RecipeVault: React.FC<RecipeVaultProps> = ({ onNavigate, onCookRecipe }) => {
  const player = gameState.getPlayer();
  const unlockedIds = gameState.getUnlockedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-4 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="sketch-btn p-3 bg-white flex items-center gap-2 shadow-sketch"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display font-bold text-sm hidden sm:inline">HOME</span>
          </button>

          <div className="text-center">
            <div className="font-handwritten text-emerald-600 font-bold text-sm flex items-center justify-center gap-1">
              <ChefHat className="w-4 h-4" /> KRITIKA'S CULINARY ARCHIVE
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight">
              THE SECRET RECIPE VAULT 📖
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-3 py-1.5 rounded-full font-handwritten text-sm font-bold shadow-sketch">
            <span className="text-emerald-600">{unlockedIds.length}</span> / {RECIPES.length} DISHES
          </div>
        </div>

        {/* Chef Status Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2.5 border-ink bg-doodleGold flex items-center justify-center text-3xl shadow-sketch">
              🥪
            </div>
            <div>
              <div className="font-handwritten text-xs font-bold text-ink-light uppercase tracking-wider">
                ACTIVE CHEF TITLE
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-plum-700">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </h2>
              <p className="font-sans text-xs text-ink-light">
                Total Score: <span className="font-bold text-emerald-600">{player.cucumberSandwiches || 0} Cucumber Sandwiches</span> 🥪
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <button
              onClick={() => onCookRecipe(RECIPES[0])}
              className="sketch-btn-primary px-4 py-2.5 text-xs sm:text-sm font-bold uppercase flex items-center gap-2 shadow-sketch"
            >
              <Sparkles className="w-4 h-4" />
              <span>PLAY FOR NEXT RECIPE</span>
            </button>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {RECIPES.map((recipe) => {
            const isUnlocked = unlockedIds.includes(recipe.id);

            return (
              <div
                key={recipe.id}
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.playSfx('click');
                    setSelectedRecipe(recipe);
                  }
                }}
                className={`
                  bg-white border-2.5 border-ink rounded-3xl p-5 shadow-sketch-lg transition-all
                  ${isUnlocked ? 'hover:shadow-sketch-xl hover:-translate-y-1 cursor-pointer' : 'opacity-70 bg-paper-100'}
                `}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl border-2 border-ink flex items-center justify-center text-2xl bg-[#FAF7F0] shadow-sm shrink-0">
                    {isUnlocked ? recipe.emoji : <Lock className="w-5 h-5 text-ink-light" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-handwritten text-xs font-bold text-coral-600 uppercase tracking-wide block">
                      {recipe.cuisine}
                    </span>
                    <h3 className="font-display font-black text-lg text-ink leading-tight">
                      {recipe.title}
                    </h3>
                  </div>
                </div>

                <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold mb-3 line-clamp-2">
                  {recipe.subtitle}
                </p>

                {isUnlocked ? (
                  <div className="space-y-2.5 pt-2 border-t-1.5 border-dashed border-ink/20">
                    <div className="flex items-center justify-between text-xs font-sans text-ink-light">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-doodleTeal" />
                        <span>{recipe.prepTime}</span>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-plum-700">
                        <Film className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">{recipe.moviePairing.movie}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecipe(recipe);
                      }}
                      className="w-full py-2 bg-paper-100 hover:bg-paper-200 border-1.5 border-ink rounded-xl font-display font-bold text-xs uppercase text-center"
                    >
                      VIEW RECIPE & STEPS
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t-1.5 border-dashed border-ink/20 flex items-center justify-between">
                    <span className="font-handwritten text-xs text-ink-light">
                      🔒 Answer 5 food questions to unlock
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCookRecipe(recipe);
                      }}
                      className="text-xs font-bold text-coral-500 font-display hover:underline"
                    >
                      Cook Now →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal: Full Recipe Details */}
        {selectedRecipe && (
          <div
            className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedRecipe(null)}
          >
            <div
              className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-xl w-full my-6 p-5 sm:p-6 shadow-sketch-2xl space-y-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
                <div>
                  <span className="font-handwritten text-xs text-coral-500 font-bold uppercase">
                    {selectedRecipe.cuisine} • {selectedRecipe.prepTime}
                  </span>
                  <h3 className="font-display font-black text-xl text-ink">
                    {selectedRecipe.emoji} {selectedRecipe.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200"
                >
                  ✕
                </button>
              </div>

              {/* Movie Pairing Note */}
              <div className="bg-purple-50 border-1.5 border-purple-300 rounded-2xl p-3 text-xs space-y-1">
                <span className="font-display font-bold text-purple-900 flex items-center gap-1.5">
                  <Film className="w-4 h-4" /> Watch: {selectedRecipe.moviePairing.movie}
                </span>
                <p className="font-handwritten text-ink italic">
                  {selectedRecipe.moviePairing.quote}
                </p>
              </div>

              {/* Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Ingredients:
                </h4>
                <ul className="space-y-1 font-sans text-xs text-ink-light list-disc pl-4 max-h-36 overflow-y-auto">
                  {selectedRecipe.fullIngredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Method:
                </h4>
                <ol className="space-y-2 font-sans text-xs text-ink list-decimal pl-4 max-h-48 overflow-y-auto">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="leading-snug">{step}</li>
                  ))}
                </ol>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="sketch-btn-primary w-full py-3 text-xs font-bold uppercase"
                >
                  Close Cookbook
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
