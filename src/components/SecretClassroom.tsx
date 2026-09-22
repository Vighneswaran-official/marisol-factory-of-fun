import React, { useEffect, useState } from 'react';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import confetti from 'canvas-confetti';
import { Sparkles, Star, ArrowRight } from 'lucide-react';

interface SecretClassroomProps {
  onBackToHome: () => void;
}

export const SecretClassroom: React.FC<SecretClassroomProps> = ({ onBackToHome }) => {
  const teacher = gameState.getTeacherProfile();
  const [slide, setSlide] = useState<number>(1);

  useEffect(() => {
    // Start warm emotional synth music
    audioEngine.startMusic('final');

    const timer = setTimeout(() => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNextSlide = () => {
    audioEngine.playSfx('click');
    if (slide < 3) {
      setSlide(prev => prev + 1);
    } else {
      onBackToHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center p-4 sm:p-6 text-ink relative overflow-hidden">
      
      {/* Background Chalkboard & Doodle Accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="w-full h-full border-12 border-ink/20 rounded-3xl m-4" />
      </div>

      <div className="max-w-2xl w-full z-10 space-y-6 text-center animate-fade-in">
        
        {slide === 1 && (
          <div className="space-y-6">
            <div className="inline-block bg-coral-500 text-white font-handwritten text-lg font-bold px-4 py-1 rounded-full border-2 border-ink shadow-sketch">
              SECRET LEVEL UNLOCKED 🔑
            </div>

            <Marisol
              expression="welcome"
              size="full"
              dialogue={`"Okay... I've been keeping something from you! This whole Factory of Fun was created as a special surprise..."`}
              bubblePosition="top"
            />

            <button
              onClick={handleNextSlide}
              className="sketch-btn-primary w-full py-4 text-xl font-black uppercase shadow-sketch-lg hover:scale-105 transition-all mt-4"
            >
              ENTER THE SECRET CLASSROOM ❤️
            </button>
          </div>
        )}

        {slide === 2 && (
          <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6 text-left">
            <div className="text-center">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
                CLASSROOM MEMORIES 📸
              </h1>
              <p className="font-handwritten text-xl text-coral-500 font-bold">
                Dedicated to {teacher.teacherName}
              </p>
            </div>

            {/* Classmate Quotes & Memories Cards */}
            <div className="space-y-3 font-handwritten text-lg text-ink">
              {teacher.classroomMemories.map((mem, idx) => (
                <div key={idx} className="bg-paper-50 p-4 rounded-2xl border-2 border-ink shadow-sketch flex items-start gap-3">
                  <Star className="w-5 h-5 text-doodleGold flex-shrink-0 mt-0.5" />
                  <span>"{mem}"</span>
                </div>
              ))}
            </div>

            {/* Teacher Quotes */}
            <div className="bg-plum-500/10 border-2 border-plum-500 p-4 rounded-2xl space-y-2">
              <div className="font-display font-bold text-xs text-plum-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>FAMOUS TEACHER PHRASES WE WILL NEVER FORGET:</span>
              </div>
              <ul className="font-handwritten text-lg text-plum-700 list-disc list-inside space-y-1">
                {teacher.famousPhrases.map((phrase, i) => (
                  <li key={i}>{phrase}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleNextSlide}
              className="sketch-btn-gold w-full py-3.5 text-lg font-black uppercase shadow-sketch flex items-center justify-center gap-2"
            >
              <span>THE FINAL MESSAGE</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {slide === 3 && (
          <div className="bg-white border-3 border-ink rounded-3xl p-8 sm:p-10 shadow-sketch-xl space-y-8 text-center animate-fade-in">
            
            <div className="flex justify-center">
              <Marisol expression="proud" size="large" showSpeechBubble={false} />
            </div>

            <div className="space-y-4">
              <p className="font-handwritten text-2xl sm:text-3xl text-ink font-semibold italic">
                "Some lessons stay on the page."
              </p>
              <p className="font-handwritten text-3xl sm:text-4xl text-plum-700 font-bold">
                "Some stay with you."
              </p>
            </div>

            <div className="pt-4 border-t-2 border-dashed border-ink/30 space-y-3">
              <h2 className="font-display font-black text-4xl sm:text-5xl text-coral-500">
                Thank you, {teacher.teacherName}. ❤️
              </h2>
              <p className="font-handwritten text-xl text-ink-light">
                {teacher.customMessage}
              </p>
              <p className="font-handwritten text-2xl font-bold text-doodleTeal">
                Made with love by your class. ✨
              </p>
            </div>

            <button
              onClick={onBackToHome}
              className="sketch-btn-primary px-8 py-3.5 text-lg font-black uppercase shadow-sketch hover:scale-105 transition-all"
            >
              RETURN TO MAIN MENU 🏠
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
