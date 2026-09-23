import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { Marisol } from './Marisol';
import type { Category, ScreenState } from '../types/game';
import { CheckCircle, Lock, Film, Tv, Sparkles, Music, Cpu, Rocket, Globe, HelpCircle, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

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

interface KnowledgePassportProps {
  onNavigate?: (screen: ScreenState) => void;
  hideHomeButton?: boolean;
}

export const KnowledgePassport: React.FC<KnowledgePassportProps> = ({ 
  onNavigate,
  hideHomeButton = false
}) => {
  const player = gameState.getPlayer();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'in_progress'>('all');

  const stampedCount = PASSPORT_CATEGORIES.filter(
    item => player.questionsAnswered >= item.requiredQuestions
  ).length;

  const filteredCategories = PASSPORT_CATEGORIES.filter(item => {
    const isStamped = player.questionsAnswered >= item.requiredQuestions;
    if (filter === 'unlocked') return isStamped;
    if (filter === 'in_progress') return !isStamped;
    return true;
  });

  return (
    <div className="min-h-screen bg-paper-50 p-3 sm:p-6 pb-28 text-ink">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 space-y-3">
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
            <div className="inline-block bg-white border-2 border-ink px-3 py-1 rounded-full shadow-sketch font-handwritten text-xs sm:text-sm font-bold text-doodleTeal">
              📘 OFFICIAL DOCUMENT
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-plum-700 mt-1">
              KNOWLEDGE PASSPORT
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-handwritten text-xs sm:text-sm font-bold shadow-sketch">
            <span className="text-emerald-600 font-black">{stampedCount}</span> / {PASSPORT_CATEGORIES.length} STAMPS
          </div>
        </div>

        <p className="font-handwritten text-sm sm:text-base text-ink-light max-w-lg mx-auto text-center font-bold">
          Collect illustrated stamps as you master categories across the Factory of Fun!
        </p>
      </div>

      {/* Marisol Passport Guide */}
      <div className="max-w-xl mx-auto mb-6 bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol expression={stampedCount > 3 ? 'celebrating' : 'proud'} size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-base text-ink">Marisol's Stamp Book</h3>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
            "{stampedCount === PASSPORT_CATEGORIES.length 
              ? 'Incredible! You have officially conquered every single passport category!' 
              : 'Look at that progress! Play challenges in every category to complete your world passport.'}"
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center">
        <div className="bg-white border-2 border-ink p-1 rounded-2xl shadow-sketch flex items-center gap-1">
          {[
            { key: 'all', label: `All Stamps (${PASSPORT_CATEGORIES.length})` },
            { key: 'unlocked', label: `🌟 Unlocked (${stampedCount})` },
            { key: 'in_progress', label: `⏳ In Progress (${PASSPORT_CATEGORIES.length - stampedCount})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                audioEngine.playSfx('click');
                setFilter(tab.key as any);
              }}
              className={`px-3 py-1.5 rounded-xl font-handwritten text-xs sm:text-sm font-bold transition-all ${
                filter === tab.key
                  ? 'bg-ink text-white shadow-sketch-xs'
                  : 'text-ink-light hover:bg-paper-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 ? (
        <div className="max-w-md mx-auto bg-white border-3 border-dashed border-ink/30 rounded-3xl p-8 text-center space-y-3 shadow-sketch">
          <div className="text-4xl animate-bounce-gentle">📘✨</div>
          <h3 className="font-display font-black text-lg text-ink">
            {filter === 'unlocked' ? 'No stamps unlocked yet' : 'All stamps unlocked!'}
          </h3>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
            {filter === 'unlocked'
              ? 'Play quizzes across cinema, science, and geography to earn your first passport stamps!'
              : 'You have earned every stamp in this passport book! Amazing achievement, queen!'}
          </p>
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setFilter('all');
            }}
            className="sketch-btn px-4 py-2 text-xs font-display font-black uppercase bg-teal-50 border-2 border-ink shadow-sketch"
          >
            Show All Stamps
          </button>
        </div>
      ) : (
        /* Stamp Collection Grid */
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCategories.map(item => {
            const Icon = item.icon;
            const isStamped = player.questionsAnswered >= item.requiredQuestions;

            return (
              <div
                key={item.category}
                className={`
                  relative bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg flex flex-col items-center text-center space-y-3 transition-all
                  ${isStamped ? 'hover:-translate-y-1 hover:shadow-sketch-xl' : 'opacity-70 bg-paper-100'}
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
      )}
    </div>
  );
};
