import React from 'react';
import { gameState } from '../services/gameState';
import { Marisol } from './Marisol';
import type { Category } from '../types/game';
import { CheckCircle, Lock, Film, Tv, Sparkles, Music, Cpu, Rocket, Globe, HelpCircle } from 'lucide-react';

interface PassportCategory {
  category: Category;
  stampName: string;
  icon: any;
  color: string;
  requiredQuestions: number;
}

const PASSPORT_CATEGORIES: PassportCategory[] = [
  { category: 'Movies', stampName: 'Cinema Maven', icon: Film, color: 'bg-coral-500 text-white', requiredQuestions: 5 },
  { category: 'Bollywood', stampName: 'Desi Filmy Star', icon: Sparkles, color: 'bg-doodleGold text-ink', requiredQuestions: 5 },
  { category: 'TV Shows', stampName: 'Binge Master', icon: Tv, color: 'bg-plum-500 text-white', requiredQuestions: 5 },
  { category: 'Music', stampName: '80s Melody Icon', icon: Music, color: 'bg-doodleTeal text-white', requiredQuestions: 3 },
  { category: 'Science', stampName: 'Lab Genius', icon: Cpu, color: 'bg-doodlePink text-white', requiredQuestions: 3 },
  { category: 'Space', stampName: 'Cosmic Voyager', icon: Rocket, color: 'bg-indigo-600 text-white', requiredQuestions: 3 },
  { category: 'Geography', stampName: 'Globe Trotter', icon: Globe, color: 'bg-amber-600 text-white', requiredQuestions: 3 },
  { category: 'Weird Facts', stampName: 'Curiosity Titan', icon: HelpCircle, color: 'bg-emerald-500 text-white', requiredQuestions: 3 },
];

export const KnowledgePassport: React.FC = () => {
  const player = gameState.getPlayer();

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-doodleTeal">
          📘 OFFICIAL DOCUMENT
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700">
          KNOWLEDGE PASSPORT
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Collect illustrated stamps as you master categories across the Factory of Fun!
        </p>
      </div>

      {/* Marisol Passport Guide */}
      <div className="max-w-xl mx-auto mb-8 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol expression="proud" size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-lg text-ink">Marisol's Stamp Book</h3>
          <p className="font-handwritten text-base text-ink-light">
            "Look at all these stamps! Play challenges in every category to stamp your passport."
          </p>
        </div>
      </div>

      {/* Stamp Collection Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PASSPORT_CATEGORIES.map(item => {
          const Icon = item.icon;
          const isStamped = player.questionsAnswered >= item.requiredQuestions;

          return (
            <div
              key={item.category}
              className={`
                relative bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg flex flex-col items-center text-center space-y-3 transition-all
                ${isStamped ? 'hover:-translate-y-1' : 'opacity-60 bg-paper-100'}
              `}
            >
              {/* Stamp Seal Badge */}
              <div 
                className={`
                  w-20 h-20 rounded-full border-3 border-ink flex items-center justify-center shadow-sketch relative
                  ${isStamped ? item.color : 'bg-paper-200 text-ink-light'}
                `}
              >
                {isStamped ? (
                  <Icon className="w-10 h-10" />
                ) : (
                  <Lock className="w-8 h-8" />
                )}

                {/* Ink Seal Rim */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-ink/40 pointer-events-none" />
              </div>

              <div>
                <h3 className="font-display font-black text-lg text-ink">
                  {item.stampName}
                </h3>
                <p className="font-handwritten text-sm text-coral-500 font-bold">
                  {item.category}
                </p>
              </div>

              <div className="w-full pt-2 border-t-1.5 border-dashed border-ink/20 font-sans text-xs">
                {isStamped ? (
                  <span className="font-bold text-doodleTeal flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4" /> STAMP UNLOCKED
                  </span>
                ) : (
                  <span className="text-ink-light">
                    Answer {item.requiredQuestions} {item.category} questions to unlock
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
