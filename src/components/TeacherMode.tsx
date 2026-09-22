import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import type { TeacherProfile } from '../types/game';
import { Marisol } from './Marisol';
import { Save } from 'lucide-react';

interface TeacherModeProps {
  onSave: () => void;
}

export const TeacherMode: React.FC<TeacherModeProps> = ({ onSave }) => {
  const current = gameState.getTeacherProfile();
  const [form, setForm] = useState<TeacherProfile>({ ...current });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSfx('fanfare');
    gameState.saveTeacherProfile(form);
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onSave();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-coral-500">
          ❤️ CLASS GIFT CUSTOMIZER
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700">
          TEACHER'S CHALLENGE SETUP
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Personalize Marisol's Factory of Fun with your teacher's favorite movies, phrases, and class memories!
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6">
        
        <div className="flex items-center gap-4 bg-paper-50 p-4 rounded-2xl border-2 border-ink">
          <Marisol expression="chai" size="small" showSpeechBubble={false} />
          <div className="font-handwritten text-base text-ink font-semibold">
            "Enter your teacher's favorite things below! I'll sprinkle them directly into the trivia and secret classroom reveal!"
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          
          <div>
            <label className="block text-sm font-bold text-ink mb-1">Teacher's Name</label>
            <input
              type="text"
              value={form.teacherName}
              onChange={e => setForm({ ...form, teacherName: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Subject / Department</label>
            <input
              type="text"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Favorite Movies / Cinema</label>
            <input
              type="text"
              value={form.favoriteMovies}
              onChange={e => setForm({ ...form, favoriteMovies: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Favorite TV Shows</label>
            <input
              type="text"
              value={form.favoriteShows}
              onChange={e => setForm({ ...form, favoriteShows: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Personal Thank You Note from the Class</label>
            <textarea
              rows={3}
              value={form.customMessage}
              onChange={e => setForm({ ...form, customMessage: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-handwritten text-lg bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
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
            <div className="text-center font-handwritten text-lg font-bold text-doodleTeal animate-bounce-gentle">
              ✨ Saved! Marisol is ready with your personalized teacher tribute!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
