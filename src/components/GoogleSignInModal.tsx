import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { CheckCircle2, LogOut, Sparkles, User, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GoogleSignInModalProps {
  onClose: () => void;
  onSuccess?: (user: StudentProfile) => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({ onClose, onSuccess }) => {
  const [, setTick] = useState(0);
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const [inputName, setInputName] = useState(currentUser?.name || '');
  const [inputEmail, setInputEmail] = useState(currentUser?.email || '');
  const [currentMood, setCurrentMood] = useState(currentUser?.currentMood || 'Radiant & Grateful');
  const [currentMoodEmoji, setCurrentMoodEmoji] = useState(currentUser?.currentMoodEmoji || '💡');
  const [statusNote, setStatusNote] = useState(currentUser?.statusNote || '');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

    const user = authService.signInWithGoogle({
      name: inputName.trim() || 'Kritika',
      email: inputEmail.trim() || 'kritika@gmail.com',
      mood: currentMood,
      moodEmoji: currentMoodEmoji,
      statusNote: statusNote.trim() || "Loving the Batch 41 energy! ♡",
    });

    setTick(t => t + 1);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  const handleFastGoogleAuth = () => {
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });

    const user = authService.signInWithGoogle({
      name: 'Kritika (Google Verified)',
      email: 'kritika.official@gmail.com',
      avatarUrl: '/marisol/avatars/01_brighter_ideas.png',
      mood: 'Radiant & Grateful',
      moodEmoji: '💡',
      statusNote: 'Signed in with Google! Excited to connect with Batch 41 ♡',
    });

    setTick(t => t + 1);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  const handleSignOut = () => {
    audioEngine.playSfx('click');
    authService.signOut();
    setTick(t => t + 1);
  };

  return (
    <BaseModal
      onClose={onClose}
      title={isAuthenticated ? "GOOGLE ACCOUNT LINKED" : "SIGN IN WITH GOOGLE"}
      subtitle={isAuthenticated ? "Connected to Batch MLP41PT Network" : "Share your daily mood & discover classmate updates"}
      icon={
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </div>
      }
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {isAuthenticated && currentUser ? (
          /* Already Signed In View */
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-pink-50 border-2.5 border-emerald-400/80 rounded-2xl p-4 shadow-inner flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl border-2 border-ink overflow-hidden bg-white shadow-xs shrink-0">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-display font-black text-sm text-ink truncate">
                    {currentUser.name}
                  </h3>
                  <span className="bg-emerald-600 text-white font-display text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED GOOGLE
                  </span>
                </div>
                <p className="font-sans text-xs text-ink-light truncate mt-0.5">
                  {currentUser.email}
                </p>
                <div className="flex items-center gap-1 font-handwritten text-xs font-bold text-emerald-800 mt-1">
                  <span>Current Mood:</span>
                  <span>{currentUser.currentMoodEmoji} {currentUser.currentMood}</span>
                </div>
              </div>
            </div>

            {/* Quick Status Note Update */}
            <div className="space-y-2 bg-paper-50 p-3 rounded-2xl border border-ink/20">
              <label className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Today's Life Note to Classmates:</span>
              </label>
              <input
                type="text"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="What are you up to today?"
                className="w-full px-3 py-2 bg-white border border-ink/30 rounded-xl text-xs font-medium outline-none"
              />
              <button
                onClick={() => {
                  audioEngine.playSfx('pop');
                  authService.updateDailyMood(currentUser.currentMood, currentUser.currentMoodEmoji, statusNote);
                  confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
                  onClose();
                }}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase rounded-xl transition-colors shadow-xs"
              >
                Update My Daily Note
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="sketch-btn-gold flex-1 py-2.5 text-xs font-black uppercase shadow-sketch-xs"
              >
                Done
              </button>
              <button
                onClick={handleSignOut}
                className="sketch-btn py-2.5 px-3 text-xs font-black uppercase bg-white border border-rose-400 text-rose-600 hover:bg-rose-50 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Form View */
          <div className="space-y-4">
            {/* Value Proposition Pills */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 text-xs space-y-1.5">
              <div className="font-display font-black text-purple-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>Why Sign in with Google?</span>
              </div>
              <ul className="space-y-1 font-handwritten font-bold text-purple-900 text-xs">
                <li className="flex items-center gap-1.5">
                  <span>✨</span> See live classmate moods & what everyone is feeling today
                </li>
                <li className="flex items-center gap-1.5">
                  <span>💌</span> Share your daily life updates & photos to Batch 41 Wall
                </li>
                <li className="flex items-center gap-1.5">
                  <span>👑</span> Sync your chef titles & stickers with your verified Google account
                </li>
              </ul>
            </div>

            {/* Fast 1-Tap Google Button */}
            <button
              onClick={handleFastGoogleAuth}
              className="w-full py-3 px-4 bg-white hover:bg-gray-50 border-2.5 border-ink rounded-2xl shadow-sketch flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-display font-black text-xs sm:text-sm text-ink">
                1-TAP GOOGLE SIGN IN
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px bg-ink/20 flex-1" />
              <span className="font-handwritten text-[11px] font-bold text-ink-light uppercase">
                or customize account
              </span>
              <div className="h-px bg-ink/20 flex-1" />
            </div>

            {/* Manual Google Account Input Form */}
            <form onSubmit={handleSignIn} className="space-y-3">
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-purple-700" />
                  <span>Your Google Display Name:</span>
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="e.g. Kritika"
                  className="w-full px-3 py-2 bg-paper-50 border-2 border-ink rounded-xl text-xs font-bold outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-purple-700" />
                  <span>Google Email:</span>
                </label>
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full px-3 py-2 bg-paper-50 border-2 border-ink rounded-xl text-xs font-bold outline-none"
                  required
                />
              </div>

              {/* Initial Daily Life Mood */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-pink-600" />
                  <span>Your Current Daily Mood:</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Radiant & Grateful', emoji: '💡' },
                    { label: 'Caffeinated & Victorious', emoji: '☕' },
                    { label: 'Cozy & Chill', emoji: '☁️' },
                    { label: 'Deep Thinking', emoji: '💻' },
                    { label: 'Bold & Excited', emoji: '😉' },
                  ].map(m => (
                    <button
                      type="button"
                      key={m.label}
                      onClick={() => {
                        setCurrentMood(m.label);
                        setCurrentMoodEmoji(m.emoji);
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs font-handwritten font-bold border transition-all ${
                        currentMood === m.label
                          ? 'bg-ink text-white border-ink shadow-xs'
                          : 'bg-paper-100 border-ink/20 text-ink'
                      }`}
                    >
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="sketch-btn-primary w-full py-3 text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sketch"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CONNECT TO BATCH 41</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
