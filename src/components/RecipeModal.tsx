import React, { useState } from 'react';
import type { Recipe, ChefTitle } from '../types/game';
import { Sparkles, Film, Clock, ChefHat, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, BookOpen } from 'lucide-react';
import { Marisol } from './Marisol';

interface RecipeModalProps {
  recipe: Recipe;
  earnedSandwiches: number;
  chefTitle: ChefTitle;
  titleUpgraded: boolean;
  collectedIngredients: string[];
  activeMood: string;
  onNextCourse: () => void;
  onViewVault: () => void;
  onGoHome: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  earnedSandwiches,
  chefTitle,
  titleUpgraded,
  collectedIngredients,
  activeMood,
  onNextCourse,
  onViewVault,
  onGoHome
}) => {
  const [showFullRecipe, setShowFullRecipe] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-2xl w-full my-6 p-4 sm:p-6 shadow-sketch-2xl space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti Banner */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-doodleGold border-1.5 border-ink px-3 py-1 rounded-full font-handwritten text-xs sm:text-sm font-black text-ink shadow-sketch-sm">
            <Sparkles className="w-4 h-4" />
            <span>COURSE COMPLETE • SECRET RECIPE REVEALED!</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink leading-tight">
            {recipe.emoji} {recipe.title}
          </h2>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
            {recipe.subtitle}
          </p>
        </div>

        {/* Score & Chef Rank Ribbon */}
        <div className="bg-white border-2 border-ink rounded-2xl p-3 flex flex-wrap items-center justify-around gap-2 shadow-sketch text-center">
          <div>
            <span className="font-handwritten text-xs text-ink-light font-bold block">REWARD EARNED</span>
            <span className="font-display font-black text-xl text-emerald-600 flex items-center justify-center gap-1">
              <span>+{earnedSandwiches}</span>
              <span className="text-base">🥪 Cucumber Sandwiches</span>
            </span>
          </div>

          <div className="h-8 w-px bg-ink/20 hidden sm:block" />

          <div>
            <span className="font-handwritten text-xs text-ink-light font-bold block">CHEF RANKING</span>
            <span className="font-display font-black text-base text-plum-700 flex items-center justify-center gap-1">
              <ChefHat className="w-4 h-4 text-doodleGold" />
              <span>{chefTitle}</span>
            </span>
          </div>

          {titleUpgraded && (
            <div className="w-full text-center bg-coral-500 text-white font-handwritten text-xs font-black py-0.5 rounded-lg animate-bounce-gentle">
              🌟 CHEF PROMOTION UNLOCKED!
            </div>
          )}
        </div>

        {/* Chef Kritika Companion Commentary */}
        <div className="bg-white border-2 border-ink rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sketch">
          <Marisol pose={activeMood} size="small" showSpeechBubble={false} />
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-xs uppercase text-coral-600">
              Chef Kritika's Kitchen Notes ♡
            </div>
            <p className="font-handwritten text-xs sm:text-sm text-ink font-bold leading-snug">
              "Look at that spread! We gathered all secret ingredients through trivia — now time to feast!"
            </p>
          </div>
        </div>

        {/* Secret Ingredients Collected Grid */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-display font-bold text-ink">
            <span>SECRET INGREDIENTS UNLOCKED (5/5):</span>
            <span className="text-emerald-600 flex items-center gap-1 font-handwritten text-sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Captured!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(recipe.secretIngredients || collectedIngredients).map((ingredient, i) => (
              <div 
                key={i}
                className="bg-emerald-50 border-1.5 border-emerald-500/40 rounded-xl p-2 text-xs font-bold text-ink flex items-center gap-1.5 shadow-2xs"
              >
                <span className="text-sm">✨</span>
                <span className="truncate">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Movie Pairing Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-ink rounded-2xl p-3.5 shadow-sketch space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="font-display font-black text-xs sm:text-sm text-plum-800 flex items-center gap-1.5">
              <Film className="w-4 h-4 text-plum-700" />
              <span>PERFECT MOVIE PAIRING: {recipe.moviePairing.movie}</span>
            </div>
            <span className="bg-plum-700 text-white font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full">
              WATCH WHILE EATING
            </span>
          </div>

          <p className="font-handwritten text-xs text-ink-light italic">
            {recipe.moviePairing.quote}
          </p>

          <p className="font-sans text-xs text-ink leading-relaxed">
            {recipe.moviePairing.whyWatch}
          </p>
        </div>

        {/* Hunger Trigger Craving Alert */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex items-start gap-2.5">
          <span className="text-2xl">🤤</span>
          <div>
            <span className="font-display font-black text-xs text-amber-900 block">
              HUNGER ALERT • CRAVING RATING: 10/10
            </span>
            <p className="font-handwritten text-xs sm:text-sm text-ink font-semibold leading-snug">
              {recipe.hungerTrigger}
            </p>
          </div>
        </div>

        {/* Toggle Full Cooking Recipe */}
        <div>
          <button
            onClick={() => setShowFullRecipe(!showFullRecipe)}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-ink bg-white font-display font-bold text-xs uppercase flex items-center justify-between shadow-sketch-sm hover:bg-paper-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-doodleTeal" />
              <span>{showFullRecipe ? 'Hide Full Cooking Recipe' : `View Recipe & Chef Steps (${recipe.prepTime})`}</span>
            </span>
            {showFullRecipe ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFullRecipe && (
            <div className="mt-3 bg-white border-2 border-ink rounded-2xl p-4 shadow-sketch space-y-4 animate-scale-up text-left">
              {/* Full Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Kitchen Pantry Ingredients:
                </h4>
                <ul className="space-y-1 font-sans text-xs text-ink-light list-disc pl-4">
                  {recipe.fullIngredients.map((item, idx) => (
                    <li key={idx} className="leading-tight">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Step-by-Step Cooking Method:
                </h4>
                <ol className="space-y-2 font-sans text-xs text-ink list-decimal pl-4">
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx} className="leading-snug">
                      <span className="font-semibold text-ink">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <button
            onClick={onNextCourse}
            className="sketch-btn-primary py-3.5 text-sm sm:text-base font-black uppercase flex items-center justify-center gap-2 sm:col-span-2 shadow-sketch-lg hover:scale-102 transition-all"
          >
            <span>START NEXT ENDLESS COURSE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewVault}
            className="sketch-btn py-3 text-xs font-bold uppercase bg-white border-2 border-ink flex items-center justify-center gap-1.5 shadow-sketch hover:bg-paper-100"
          >
            <BookOpen className="w-4 h-4 text-plum-700" />
            <span>RECIPE VAULT</span>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onGoHome}
            className="font-handwritten text-xs font-bold text-ink-light hover:text-ink underline"
          >
            Back to Factory Home
          </button>
        </div>

      </div>
    </div>
  );
};
