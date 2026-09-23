import React, { useState, useMemo } from 'react';
import type { ScreenState, Recipe } from '../types/game';
import { RECIPES } from '../data/recipes';
import { gameState } from '../services/gameState';
import { ArrowLeft, ChefHat, Film, Clock, Lock, Sparkles, Search, X, Utensils } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';
import { BaseModal } from './BaseModal';

interface RecipeVaultProps {
  onNavigate?: (screen: ScreenState) => void;
  onCookRecipe?: (recipe: Recipe) => void;
  initialCuisine?: string;
  hideHomeButton?: boolean;
}

export const RecipeVault: React.FC<RecipeVaultProps> = ({ 
  onNavigate, 
  onCookRecipe,
  initialCuisine = 'All',
  hideHomeButton = false
}) => {
  const player = gameState.getPlayer();
  const unlockedIds = gameState.getUnlockedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);

  // Extract unique cuisines
  const cuisines = useMemo(() => {
    const list = Array.from(new Set(RECIPES.map(r => r.cuisine)));
    return ['All', ...list];
  }, []);

  // Filter recipes by search query and cuisine
  const filteredRecipes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return RECIPES.filter(recipe => {
      // Cuisine filter
      if (selectedCuisine !== 'All' && recipe.cuisine !== selectedCuisine) {
        return false;
      }

      // Search query filter
      if (!q) return true;

      const titleMatch = recipe.title.toLowerCase().includes(q);
      const subtitleMatch = recipe.subtitle.toLowerCase().includes(q);
      const cuisineMatch = recipe.cuisine.toLowerCase().includes(q);
      const movieMatch = recipe.moviePairing.movie.toLowerCase().includes(q);
      const secretIngMatch = recipe.secretIngredients.some(ing => ing.toLowerCase().includes(q));
      const fullIngMatch = recipe.fullIngredients.some(ing => ing.toLowerCase().includes(q));

      return titleMatch || subtitleMatch || cuisineMatch || movieMatch || secretIngMatch || fullIngMatch;
    });
  }, [searchQuery, selectedCuisine]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2">
          {!hideHomeButton && onNavigate ? (
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('home');
              }}
              className="sketch-btn p-2.5 sm:p-3 bg-white flex items-center gap-1.5 sm:gap-2 shadow-sketch"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-display font-bold text-xs sm:text-sm hidden sm:inline">HOME</span>
            </button>
          ) : <div className="w-9" />}

          <div className="text-center">
            <div className="font-handwritten text-emerald-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1">
              <ChefHat className="w-4 h-4" /> KRITIKA'S CULINARY ARCHIVE
            </div>
            <h1 className="font-display text-xl sm:text-3xl font-black tracking-tight">
              THE SECRET RECIPE VAULT 📖
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-handwritten text-xs sm:text-sm font-bold shadow-sketch">
            <span className="text-emerald-600 font-black">{unlockedIds.length}</span> / {RECIPES.length} DISHES
          </div>
        </div>

        {/* Chef Status Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2.5 border-ink bg-doodleGold flex items-center justify-center text-3xl shadow-sketch shrink-0">
              🥪
            </div>
            <div>
              <div className="font-handwritten text-[11px] font-bold text-ink-light uppercase tracking-wider">
                ACTIVE CHEF TITLE
              </div>
              <h2 className="font-display font-black text-lg sm:text-2xl text-plum-700">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </h2>
              <p className="font-sans text-xs text-ink-light">
                Total Score: <span className="font-bold text-emerald-600">{player.cucumberSandwiches || 0} Cucumber Sandwiches</span> 🥪
              </p>
            </div>
          </div>

          {onCookRecipe && (
            <div className="text-center sm:text-right w-full sm:w-auto">
              <button
                onClick={() => onCookRecipe(RECIPES[0])}
                className="sketch-btn-primary w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold uppercase flex items-center justify-center gap-2 shadow-sketch"
              >
                <Sparkles className="w-4 h-4" />
                <span>PLAY FOR NEXT RECIPE</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border-2.5 border-ink rounded-3xl p-3.5 sm:p-4 shadow-sketch space-y-3">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-ink-light pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients (e.g. ginger, mascarpone), or movie pairings..."
              className="w-full pl-10 pr-9 py-2.5 bg-paper-50 border-2 border-ink/40 focus:border-ink rounded-2xl font-sans text-xs sm:text-sm outline-none transition-all placeholder:text-ink-light/60 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-ink-light hover:text-ink hover:bg-paper-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cuisine Pill Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-display font-black text-ink-light uppercase flex items-center gap-1 shrink-0 mr-1">
              <Utensils className="w-3 h-3" /> Cuisines:
            </span>
            {cuisines.map((cuisine) => {
              const isActive = selectedCuisine === cuisine;
              return (
                <button
                  key={cuisine}
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setSelectedCuisine(cuisine);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-handwritten font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white border-2 border-ink shadow-sketch-xs scale-102'
                      : 'bg-paper-100 hover:bg-paper-200 text-ink-light border border-ink/30'
                  }`}
                >
                  {cuisine}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State when no recipes match */}
        {filteredRecipes.length === 0 ? (
          <div className="bg-white border-3 border-dashed border-ink/30 rounded-3xl p-8 sm:p-12 text-center space-y-3.5 shadow-sketch">
            <div className="text-4xl sm:text-5xl animate-bounce-gentle">🍳💭</div>
            <h3 className="font-display font-black text-lg sm:text-xl text-ink">
              No recipes found matching your craving
            </h3>
            <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold max-w-md mx-auto leading-relaxed">
              We couldn't find any dish matching "<span className="text-coral-500">{searchQuery || selectedCuisine}</span>". Try clearing filters or cook new dishes in trivia!
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setSearchQuery('');
                  setSelectedCuisine('All');
                }}
                className="sketch-btn px-4 py-2 text-xs font-display font-black uppercase bg-emerald-50 border-2 border-ink shadow-sketch hover:bg-emerald-100"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          /* Recipes Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {filteredRecipes.map((recipe) => {
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
                    bg-white border-2.5 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch-lg transition-all
                    ${isUnlocked ? 'hover:shadow-sketch-xl hover:-translate-y-1 cursor-pointer' : 'opacity-70 bg-paper-100'}
                  `}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl border-2 border-ink flex items-center justify-center text-2xl bg-[#FAF7F0] shadow-xs shrink-0">
                      {isUnlocked ? recipe.emoji : <Lock className="w-5 h-5 text-ink-light" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-handwritten text-xs font-bold text-coral-600 uppercase tracking-wide block truncate">
                        {recipe.cuisine}
                      </span>
                      <h3 className="font-display font-black text-base sm:text-lg text-ink leading-tight line-clamp-1">
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
                        <span className="flex items-center gap-1 font-bold text-plum-700 truncate max-w-[150px]">
                          <Film className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{recipe.moviePairing.movie.split('(')[0]}</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          audioEngine.playSfx('click');
                          setSelectedRecipe(recipe);
                        }}
                        className="w-full py-2 bg-paper-100 hover:bg-paper-200 border-1.5 border-ink rounded-xl font-display font-bold text-xs uppercase text-center transition-colors"
                      >
                        VIEW RECIPE & STEPS
                      </button>
                    </div>
                  ) : (
                    <div className="pt-3 border-t-1.5 border-dashed border-ink/20 flex items-center justify-between">
                      <span className="font-handwritten text-xs text-ink-light">
                        🔒 Answer 5 food questions to unlock
                      </span>
                      {onCookRecipe && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCookRecipe(recipe);
                          }}
                          className="text-xs font-bold text-coral-500 font-display hover:underline"
                        >
                          Cook Now →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Full Recipe Details using BaseModal */}
        {selectedRecipe && (
          <BaseModal 
            onClose={() => setSelectedRecipe(null)}
            title={selectedRecipe.title}
            subtitle={`${selectedRecipe.cuisine} • ${selectedRecipe.prepTime}`}
            icon={<span>{selectedRecipe.emoji}</span>}
            maxWidth="max-w-xl"
          >
            <div className="space-y-4 text-left">
              {/* Movie Pairing Note */}
              <div className="bg-purple-50 border-1.5 border-purple-300 rounded-2xl p-3 text-xs space-y-1">
                <span className="font-display font-bold text-purple-900 flex items-center gap-1.5">
                  <Film className="w-4 h-4" /> Watch Pairing: {selectedRecipe.moviePairing.movie}
                </span>
                <p className="font-handwritten text-ink italic">
                  "{selectedRecipe.moviePairing.quote}"
                </p>
                <p className="font-sans text-ink-light text-[11px] pt-1">
                  {selectedRecipe.moviePairing.whyWatch}
                </p>
              </div>

              {/* Hunger Trigger */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-center gap-2.5">
                <span className="text-xl shrink-0">🤤</span>
                <p className="font-handwritten text-xs text-amber-950 font-bold">
                  {selectedRecipe.hungerTrigger}
                </p>
              </div>

              {/* Secret Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secret Ingredients:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRecipe.secretIngredients.map((item, idx) => (
                    <span key={idx} className="bg-emerald-50 border border-emerald-300 text-emerald-900 font-handwritten text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Kitchen Pantry Ingredients:
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
                  Step-by-Step Method:
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
                  className="sketch-btn-primary w-full py-3 text-xs font-bold uppercase shadow-sketch"
                >
                  Close Cookbook
                </button>
              </div>
            </div>
          </BaseModal>
        )}

      </div>
    </div>
  );
};
