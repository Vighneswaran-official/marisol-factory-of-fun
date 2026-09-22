import React, { useState } from 'react';
import { QUESTIONS_DATABASE } from '../data/questions';
import type { Question } from '../types/game';
import { QuestionCard } from './QuestionCard';
import { LearningCard } from './LearningCard';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { Calendar, ArrowRight } from 'lucide-react';

interface DailyChallengeProps {
  onComplete: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ onComplete }) => {
  const [questions] = useState<Question[]>(() => {
    // 5 mixed daily questions
    const pool = [...QUESTIONS_DATABASE];
    return pool.slice(0, 5);
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
    const qXp = isCorrect ? 150 : 0;

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
      setIsFinished(true);
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 90, spread: 60 });
      gameState.addXp(earnedXp + 200); // 200 Daily Bonus XP
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-paper-50 p-4 sm:p-6 flex items-center justify-center text-ink">
        <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl max-w-lg w-full text-center space-y-6 animate-fade-in">
          
          <Marisol
            pose="chai_happiness"
            size="large"
            dialogue={`"Chai = Happiness! Pretty solid brain workout! You finished today's Brain Snack!"`}
            bubblePosition="top"
          />

          <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
            TODAY'S BRAIN SNACK
          </h1>

          <div className="bg-paper-50 border-2 border-ink p-4 rounded-2xl space-y-2 font-sans">
            <div className="text-sm text-ink-light">FINAL SCORE:</div>
            <div className="font-display font-black text-4xl text-coral-500">
              {correctCount} / 5 CORRECT
            </div>
            <div className="text-xs font-bold text-doodleTeal uppercase tracking-wider">
              +{earnedXp + 200} TOTAL XP EARNED TODAY!
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onComplete();
            }}
            className="sketch-btn-primary w-full py-4 text-xl font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg"
          >
            <span>BACK TO HOME</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-xl mx-auto mb-6 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-doodleTeal text-white font-handwritten text-base font-bold px-3 py-1 rounded-full border-1.5 border-ink">
          <Calendar className="w-4 h-4" />
          <span>DAILY BRAIN SNACK</span>
        </div>
      </div>

      {!showLearningCard ? (
        <QuestionCard
          question={currentQ}
          questionNumber={currentIndex + 1}
          totalQuestions={5}
          onAnswer={handleAnswer}
        />
      ) : (
        <LearningCard
          question={currentQ}
          isCorrect={currentAnswer?.isCorrect || false}
          userAnswer={currentAnswer?.option || ''}
          earnedXp={currentAnswer?.isCorrect ? 150 : 0}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
};
