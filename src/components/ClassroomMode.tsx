import React, { useState } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import { Users, Trophy, Copy, Check } from 'lucide-react';

interface ClassroomModeProps {
  onStartQuiz: () => void;
}

const DUMMY_LEADERBOARD = [
  { rank: 1, name: 'Aarav (Movie Expert)', xp: 1450, badge: '👑 Class Champion' },
  { rank: 2, name: 'Riya (Fastest Thinker)', xp: 1220, badge: '⚡ Flash Brain' },
  { rank: 3, name: 'Ananya (Fact Collector)', xp: 1150, badge: '📚 Curiosity Queen' },
  { rank: 4, name: 'You (Curious Explorer)', xp: 980, badge: '🔥 Comeback Star' },
  { rank: 5, name: 'Karan (Bollywood Soul)', xp: 850, badge: '🎬 Filmy Star' },
];

export const ClassroomMode: React.FC<ClassroomModeProps> = ({ onStartQuiz }) => {
  const [roomCode] = useState('MARISOL-482');
  const [selectedMode, setSelectedMode] = useState<'1v1' | 'team' | 'class'>('1v1');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    audioEngine.playSfx('click');
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-coral-500">
          🏫 CLASSROOM ARENA
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700">
          MULTIPLAYER CLASSROOM
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Challenge your classmates, form teams, or take on the Teacher Battle!
        </p>
      </div>

      {/* Marisol Guide */}
      <div className="max-w-xl mx-auto mb-8 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol expression="excited" size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-lg text-ink">Classroom Host Marisol</h3>
          <p className="font-handwritten text-base text-ink-light">
            "Share room code MARISOL-482 with your classmates to battle together!"
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Room Setup Box */}
        <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-6">
          <h2 className="font-display font-black text-2xl text-ink flex items-center gap-2">
            <Users className="w-6 h-6 text-coral-500" />
            <span>JOIN OR HOST ROOM</span>
          </h2>

          {/* Room Code Pill */}
          <div className="bg-paper-50 p-4 rounded-2xl border-2 border-ink flex items-center justify-between">
            <div>
              <div className="font-handwritten text-xs font-bold text-ink-light">PRIVATE ROOM CODE</div>
              <div className="font-display font-black text-2xl text-plum-700">{roomCode}</div>
            </div>
            <button
              onClick={copyCode}
              className="sketch-btn px-3 py-2 text-xs font-bold flex items-center gap-1 bg-white"
            >
              {copied ? <Check className="w-4 h-4 text-doodleTeal" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          {/* Game Modes Selection */}
          <div className="space-y-3">
            <div className="font-display font-bold text-sm text-ink-light">SELECT BATTLE MODE:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedMode('1v1')}
                className={`sketch-btn p-3 text-center transition-all ${
                  selectedMode === '1v1' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                }`}
              >
                1v1 Duel
              </button>
              <button
                onClick={() => setSelectedMode('team')}
                className={`sketch-btn p-3 text-center transition-all ${
                  selectedMode === 'team' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                }`}
              >
                Team Battle
              </button>
              <button
                onClick={() => setSelectedMode('class')}
                className={`sketch-btn p-3 text-center transition-all ${
                  selectedMode === 'class' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
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
  );
};
