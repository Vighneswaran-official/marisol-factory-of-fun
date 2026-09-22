import React from 'react';
import type { Question } from '../types/game';
import { Marisol } from './Marisol';
import { audioEngine } from '../services/synthAudioEngine';
import { CheckCircle2, XCircle, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';

interface LearningCardProps {
  question: Question;
  isCorrect: boolean;
  userAnswer: string;
  earnedXp?: number;
  earnedSandwiches?: number;
  onNext: () => void;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  question,
  isCorrect,
  userAnswer,
  earnedXp,
  earnedSandwiches = 3,
  onNext
}) => {
  const sandwichReward = earnedSandwiches || (earnedXp ? Math.max(1, Math.round(earnedXp / 50)) : 3);
  return (
    <div className="bg-white border-3 border-ink rounded-3xl p-5 sm:p-6 shadow-sketch-xl max-w-lg w-full mx-auto animate-fade-in space-y-5">
      
      {/* Result Status Banner */}
      <div 
        className={`
          flex items-center justify-between p-3.5 rounded-2xl border-2.5 border-ink shadow-sketch
          ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-coral-500 text-white'}
        `}
      >
        <div className="flex items-center gap-2.5">
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 stroke-[3]" />
          ) : (
            <XCircle className="w-6 h-6 stroke-[3]" />
          )}
          <span className="font-display font-black text-lg sm:text-xl uppercase">
            {isCorrect ? 'SPOT ON!' : 'CLOSE ONE!'}
          </span>
        </div>

        <div className="font-display font-black text-sm bg-white/20 px-3 py-1 rounded-full border-1.5 border-white">
          {isCorrect ? `+${sandwichReward} 🥪 Cucumber Sandwiches` : '+0 🥪'}
        </div>
      </div>

      {/* Secret Ingredient Unlock Banner */}
      {isCorrect && question.secretIngredient && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-500 rounded-2xl p-3 flex items-center justify-between shadow-sketch-sm animate-bounce-gentle">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider font-handwritten">
                SECRET INGREDIENT UNLOCKED!
              </span>
              <span className="font-display font-black text-sm text-ink">
                {question.secretIngredient}
              </span>
            </div>
          </div>
          <span className="font-handwritten text-xs font-bold text-emerald-800 bg-white border border-emerald-400 px-2 py-0.5 rounded-full">
            Added to Cauldron 🍲
          </span>
        </div>
      )}

      {/* Marisol / Kritika Reaction */}
      <div className="flex justify-center my-2">
        <Marisol
          pose={isCorrect ? 'wink_conquer' : 'silly_vibe'}
          size="medium"
          dialogue={
            isCorrect
              ? 'YES! Spot on, chef! Secret ingredient captured for our recipe!'
              : 'Silly is a vibe! No stress, chef — every mistake sharpens the knife!'
          }
          bubblePosition="top"
        />
      </div>

      {/* Answer Summary */}
      <div className="bg-paper-50 p-3.5 rounded-2xl border-2 border-ink space-y-1 text-sm font-sans">
        <div className="text-ink-light font-medium">Correct Answer:</div>
        <div className="font-bold text-ink text-base text-plum-700">{question.correctAnswer}</div>
        {!isCorrect && (
          <div className="text-xs text-coral-600">Your choice: {userAnswer}</div>
        )}
      </div>

      {/* DID YOU KNOW? Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-plum-700 font-display font-bold text-base">
          <Lightbulb className="w-5 h-5 text-doodleGold" />
          <span>DID YOU KNOW?</span>
        </div>
        <p className="font-handwritten text-lg sm:text-xl text-ink leading-snug bg-paper-100 p-4 rounded-2xl border-2 border-ink">
          "{question.explanation}"
        </p>
      </div>

      {/* FUN FACT Section */}
      {question.funFact && (
        <div className="bg-doodleGold/15 border-2 border-doodleGold p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 font-display font-bold text-xs text-doodleGold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FUN FACT</span>
          </div>
          <p className="font-handwritten text-base text-ink font-semibold">
            {question.funFact}
          </p>
        </div>
      )}

      {/* Next CTA */}
      <button
        onClick={() => {
          audioEngine.playSfx('click');
          onNext();
        }}
        className="sketch-btn-primary w-full py-3.5 text-lg font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg hover:scale-105 active:scale-95 transition-all"
      >
        <span>CONTINUE ADVENTURE</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
