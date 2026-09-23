import React, { useState, useEffect } from 'react';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import type { TeacherProfile } from '../types/game';
import { Marisol } from './Marisol';
import confetti from 'canvas-confetti';
import { Users, Trophy, Copy, Check, Sparkles, Star, ArrowRight, Save, Lock, GraduationCap, ArrowLeft } from 'lucide-react';

export type ClassroomModeType = 'student' | 'secret' | 'teacher';

interface ClassroomProps {
  mode?: ClassroomModeType;
  onNavigateHome: () => void;
  onStartQuiz: () => void;
}

const DUMMY_LEADERBOARD = [
  { rank: 1, name: 'Aarav (Movie Expert)', xp: 1450, badge: '👑 Class Champion' },
  { rank: 2, name: 'Riya (Fastest Thinker)', xp: 1220, badge: '⚡ Flash Brain' },
  { rank: 3, name: 'Ananya (Fact Collector)', xp: 1150, badge: '📚 Curiosity Queen' },
  { rank: 4, name: 'You (Curious Explorer)', xp: 980, badge: '🔥 Comeback Star' },
  { rank: 5, name: 'Karan (Bollywood Soul)', xp: 850, badge: '🎬 Filmy Star' },
];

export const Classroom: React.FC<ClassroomProps> = ({
  mode = 'student',
  onNavigateHome,
  onStartQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<ClassroomModeType>(mode);

  // Synchronize if prop changes
  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  // STUDENT ARENA STATE
  const [roomCode] = useState('MARISOL-482');
  const [selectedBattleMode, setSelectedBattleMode] = useState<'1v1' | 'team' | 'class'>('1v1');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    audioEngine.playSfx('click');
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SECRET CLASSROOM STATE
  const teacher = gameState.getTeacherProfile();
  const [secretSlide, setSecretSlide] = useState<number>(1);

  useEffect(() => {
    if (activeTab === 'secret') {
      audioEngine.startMusic('final');
      const timer = setTimeout(() => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleNextSecretSlide = () => {
    audioEngine.playSfx('click');
    if (secretSlide < 3) {
      setSecretSlide(prev => prev + 1);
    } else {
      onNavigateHome();
    }
  };

  // TEACHER MODE STATE
  const [teacherForm, setTeacherForm] = useState<TeacherProfile>({ ...teacher });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSfx('fanfare');
    gameState.saveTeacherProfile(teacherForm);
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onNavigateHome();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Classroom Navigation Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-ink/20 pb-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigateHome();
              }}
              className="sketch-btn p-2 sm:px-3 bg-white flex items-center gap-1.5 shadow-sketch text-xs font-display font-bold shrink-0 hover:bg-paper-100"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">HOME</span>
            </button>

            <div className="text-left">
              <div className="inline-block bg-white border-2 border-ink px-2.5 py-0.5 rounded-full shadow-sketch font-handwritten text-[11px] font-bold text-coral-500 uppercase tracking-wider">
                🏫 Classroom Hub
              </div>
              <h1 className="font-display font-black text-xl sm:text-3xl text-plum-700 tracking-tight mt-0.5">
                MARISOL'S CLASSROOM
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white border-2.5 border-ink rounded-full p-1.5 shadow-sketch">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setActiveTab('student');
              }}
              className={`px-3 py-1.5 rounded-full font-display font-black text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-coral-500 text-white shadow-xs'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Arena</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setActiveTab('secret');
              }}
              className={`px-3 py-1.5 rounded-full font-display font-black text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'secret'
                  ? 'bg-plum-600 text-white shadow-xs'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Secret Tribute</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setActiveTab('teacher');
              }}
              className={`px-3 py-1.5 rounded-full font-display font-black text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'teacher'
                  ? 'bg-doodleGold text-ink shadow-xs'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Teacher Setup</span>
            </button>
          </div>
        </div>

        {/* 1. STUDENT ARENA VIEW */}
        {activeTab === 'student' && (
          <div className="space-y-6 animate-fade-in">
            {/* Host Banner */}
            <div className="bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch-lg flex items-center gap-4">
              <Marisol expression="excited" size="small" showSpeechBubble={false} />
              <div>
                <h3 className="font-display font-bold text-lg text-ink">Classroom Host Marisol</h3>
                <p className="font-handwritten text-base text-ink-light">
                  "Share room code <span className="font-display font-black text-plum-700">{roomCode}</span> with your classmates to battle together!"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room Setup Box */}
              <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-6">
                <h2 className="font-display font-black text-2xl text-ink flex items-center gap-2">
                  <Users className="w-6 h-6 text-coral-500" />
                  <span>JOIN OR HOST ROOM</span>
                </h2>

                <div className="bg-paper-50 p-4 rounded-2xl border-2 border-ink flex items-center justify-between">
                  <div>
                    <div className="font-handwritten text-xs font-bold text-ink-light">PRIVATE ROOM CODE</div>
                    <div className="font-display font-black text-2xl text-plum-700">{roomCode}</div>
                  </div>
                  <button
                    onClick={copyCode}
                    className="sketch-btn px-3 py-2 text-xs font-bold flex items-center gap-1 bg-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="font-display font-bold text-sm text-ink-light">SELECT BATTLE MODE:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedBattleMode('1v1')}
                      className={`sketch-btn p-3 text-center transition-all ${
                        selectedBattleMode === '1v1' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                      }`}
                    >
                      1v1 Duel
                    </button>
                    <button
                      onClick={() => setSelectedBattleMode('team')}
                      className={`sketch-btn p-3 text-center transition-all ${
                        selectedBattleMode === 'team' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                      }`}
                    >
                      Team Battle
                    </button>
                    <button
                      onClick={() => setSelectedBattleMode('class')}
                      className={`sketch-btn p-3 text-center transition-all ${
                        selectedBattleMode === 'class' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                      }`}
                    >
                      Teacher Battle
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioEngine.playSfx('fanfare');
                    onStartQuiz();
                  }}
                  className="sketch-btn-primary w-full py-3.5 text-lg font-black uppercase shadow-sketch-lg hover:scale-105 transition-all"
                >
                  START CLASSROOM CHALLENGE 🎮
                </button>
              </div>

              {/* Leaderboard Box */}
              <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-4">
                <h2 className="font-display font-black text-2xl text-ink flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-doodleGold" />
                  <span>CLASSROOM LEADERBOARD</span>
                </h2>

                <div className="space-y-2">
                  {DUMMY_LEADERBOARD.map(item => (
                    <div
                      key={item.rank}
                      className="flex items-center justify-between p-3 rounded-2xl border-2 border-ink bg-paper-50 shadow-sketch"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-1.5 border-ink bg-doodleGold text-ink flex items-center justify-center font-display font-black text-sm">
                          #{item.rank}
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-ink">{item.name}</div>
                          <div className="font-handwritten text-xs font-bold text-coral-500">{item.badge}</div>
                        </div>
                      </div>
                      <div className="font-display font-bold text-sm text-plum-700">
                        {item.xp} XP
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SECRET CLASSROOM TRIBUTE VIEW */}
        {activeTab === 'secret' && (
          <div className="max-w-2xl mx-auto space-y-6 text-center animate-fade-in">
            {secretSlide === 1 && (
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
                  onClick={handleNextSecretSlide}
                  className="sketch-btn-primary w-full py-4 text-xl font-black uppercase shadow-sketch-lg hover:scale-105 transition-all mt-4"
                >
                  ENTER THE SECRET CLASSROOM ❤️
                </button>
              </div>
            )}

            {secretSlide === 2 && (
              <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6 text-left">
                <div className="text-center">
                  <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
                    CLASSROOM MEMORIES 📸
                  </h1>
                  <p className="font-handwritten text-xl text-coral-500 font-bold">
                    Dedicated to {teacher.teacherName}
                  </p>
                </div>

                <div className="space-y-3 font-handwritten text-lg text-ink">
                  {teacher.classroomMemories.map((mem, idx) => (
                    <div key={idx} className="bg-paper-50 p-4 rounded-2xl border-2 border-ink shadow-sketch flex items-start gap-3">
                      <Star className="w-5 h-5 text-doodleGold flex-shrink-0 mt-0.5" />
                      <span>"{mem}"</span>
                    </div>
                  ))}
                </div>

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
                  onClick={handleNextSecretSlide}
                  className="sketch-btn-gold w-full py-3.5 text-lg font-black uppercase shadow-sketch flex items-center justify-center gap-2"
                >
                  <span>THE FINAL MESSAGE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {secretSlide === 3 && (
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
                  <p className="font-handwritten text-2xl font-bold text-emerald-600">
                    Made with love by your class. ✨
                  </p>
                </div>

                <button
                  onClick={onNavigateHome}
                  className="sketch-btn-primary px-8 py-3.5 text-lg font-black uppercase shadow-sketch hover:scale-105 transition-all"
                >
                  RETURN TO MAIN MENU 🏠
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. TEACHER SETUP VIEW */}
        {activeTab === 'teacher' && (
          <div className="max-w-2xl mx-auto bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 bg-paper-50 p-4 rounded-2xl border-2 border-ink">
              <Marisol expression="chai" size="small" showSpeechBubble={false} />
              <div className="font-handwritten text-base text-ink font-semibold">
                "Enter your teacher's favorite things below! I'll sprinkle them directly into the trivia and secret classroom reveal!"
              </div>
            </div>

            <form onSubmit={handleTeacherSubmit} className="space-y-4 font-sans text-left">
              <div>
                <label className="block text-sm font-bold text-ink mb-1">Teacher's Name</label>
                <input
                  type="text"
                  value={teacherForm.teacherName}
                  onChange={e => setTeacherForm({ ...teacherForm, teacherName: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Subject / Department</label>
                <input
                  type="text"
                  value={teacherForm.subject}
                  onChange={e => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Favorite Movies / Cinema</label>
                <input
                  type="text"
                  value={teacherForm.favoriteMovies}
                  onChange={e => setTeacherForm({ ...teacherForm, favoriteMovies: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Favorite TV Shows</label>
                <input
                  type="text"
                  value={teacherForm.favoriteShows}
                  onChange={e => setTeacherForm({ ...teacherForm, favoriteShows: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Personal Thank You Note from the Class</label>
                <textarea
                  rows={3}
                  value={teacherForm.customMessage}
                  onChange={e => setTeacherForm({ ...teacherForm, customMessage: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-handwritten text-lg bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                />
              </div>

              <button
                type="submit"
                className="sketch-btn-primary w-full py-4 text-xl font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg hover:scale-105 transition-all mt-4"
              >
                <Save className="w-5 h-5" />
                <span>SAVE PERSONALIZED GAME</span>
              </button>

              {savedMessage && (
                <div className="text-center font-handwritten text-lg font-bold text-emerald-600 animate-bounce-gentle">
                  ✨ Saved! Marisol is ready with your personalized teacher tribute!
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
