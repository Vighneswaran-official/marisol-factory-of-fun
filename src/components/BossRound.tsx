import React, { useState } from 'react';
import type { Zone, Question } from '../types/game';
import { QUESTIONS_DATABASE } from '../data/questions';
import { QuestionCard } from './QuestionCard';
import { LearningCard } from './LearningCard';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { Film, ArrowRight } from 'lucide-react';

interface BossRoundProps {
  zone: Zone;
  onComplete: (success: boolean) => void;
}

export const BossRound: React.FC<BossRoundProps> = ({ zone, onComplete }) => {
  const [questions] = useState<Question[]>(() => {
    // Select 10 questions for the Boss Battle
    const available = QUESTIONS_DATABASE.filter(q => q.category === zone.category || q.category === 'Movies');
    return available.slice(0, 10);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<{ option: string; isCorrect: boolean } | null>(null);
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleAnswer = (selectedOption: string, _timeTakenMs: number) => {
    const isCorrect = selectedOption === currentQ.correctAnswer;
    const qXp = isCorrect ? 250 : 0;

    setCurrentAnswer({ option: selectedOption, isCorrect });
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setEarnedXp(prev => prev + qXp);
    }

    setShowLearningCard(true);
  };

  const handleNextQuestion = () => {
    setShowLearningCard(false);
    setCurrentAnswer(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished 10 Boss Questions
      setIsFinished(true);
      const passed = correctCount >= 7; // Need 7/10 to pass Boss
      if (passed) {
        audioEngine.playSfx('fanfare');
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameState.unlockZone(zone.id);
        gameState.addXp(earnedXp + 500); // 500 XP Boss Bonus
      }
    }
  };

  if (isFinished) {
    const passed = correctCount >= 7;

    return (
      <div className="min-h-screen bg-paper-50 p-4 sm:p-6 flex items-center justify-center text-ink">
        <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl max-w-lg w-full text-center space-y-6 animate-fade-in">
          
          <Marisol
            expression={passed ? 'celebrating' : 'encouraging'}
            size="large"
            dialogue={
              passed
                ? `PROJECTOR FULLY POWERED! You conquered ${zone.bossName}!`
                : `So close! You powered ${correctCount}/10 light bulbs. Try again anytime!`
            }
            bubblePosition="top"
          />

          <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
            {passed ? 'BOSS DEFEATED! 🎉' : 'PROJECTOR DIMMED'}
          </h1>

          <div className="bg-paper-50 border-2 border-ink p-4 rounded-2xl space-y-2 font-sans">
            <div className="text-sm text-ink-light">Projector Power Score:</div>
            <div className="font-display font-black text-3xl text-coral-500">
              {correctCount} / 10 BULBS LIT
            </div>
            {passed && (
              <div className="text-xs font-bold text-doodleTeal uppercase tracking-wider">
                +500 BONUS XP EARNED!
              </div>
            )}
          </div>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onComplete(passed);
            }}
            className="sketch-btn-primary w-full py-4 text-xl font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg"
          >
            <span>RETURN TO MAP</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Boss Header: Vintage Projector Light Meter */}
      <div className="max-w-xl mx-auto mb-6 bg-white border-3 border-ink rounded-2xl p-4 shadow-sketch-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-black text-base text-plum-700">
            <Film className="w-5 h-5 text-coral-500 animate-spin" />
            <span>BOSS: {zone.bossName}</span>
          </div>
          <div className="font-handwritten text-sm font-bold text-ink-light">
            PROJECTOR POWER: {correctCount}/10
          </div>
        </div>

        {/* 10 Bulb Light Meter */}
        <div className="grid grid-cols-10 gap-1.5 pt-1">
          {Array.from({ length: 10 }).map((_, idx) => {
            const isLit = idx < correctCount;
            return (
              <div
                key={idx}
                className={`
                  h-4 rounded-md border-1.5 border-ink transition-all duration-300
                  ${isLit ? 'bg-doodleGold shadow-sketch scale-105' : 'bg-paper-200'}
                `}
              />
            );
          })}
        </div>
      </div>

      {/* Question or Learning Card */}
      {!showLearningCard ? (
        <QuestionCard
          question={currentQ}
          questionNumber={currentIndex + 1}
          totalQuestions={10}
          onAnswer={handleAnswer}
        />
      ) : (
        <LearningCard
          question={currentQ}
          isCorrect={currentAnswer?.isCorrect || false}
          userAnswer={currentAnswer?.option || ''}
          earnedXp={currentAnswer?.isCorrect ? 250 : 0}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
};
