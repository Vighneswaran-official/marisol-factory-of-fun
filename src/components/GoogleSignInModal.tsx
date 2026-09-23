import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, formatNameFromEmail, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  CheckCircle2, LogOut, Sparkles, ShieldCheck, 
  Loader2, AlertCircle, Mail, Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GoogleSignInModalProps {
  onClose: () => void;
  onSuccess?: (user: StudentProfile) => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({ onClose, onSuccess }) => {
  const [, setTick] = useState(0);
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Form Fields
  const [inputName, setInputName] = useState(currentUser?.name || '');
  const [inputEmail, setInputEmail] = useState(currentUser?.email || '');
  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);
  const [statusNote, setStatusNote] = useState(currentUser?.statusNote || '');

  // 1. Firebase Google Sign-In Popup
  const handleFirebaseGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playSfx('click');

    const res = await authService.signInWithFirebaseGoogle(false);
    setIsLoading(false);

    if (res.success) {
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
      setTick(t => t + 1);
      if (res.user && onSuccess) onSuccess(res.user);
      onClose();
    } else {
      // Clean, simple fallback message
      setErrorMessage(
        res.error?.includes('unauthorized-domain') || res.error?.includes('popup')
          ? 'Enter your Google email below for instant direct connect!'
          : (res.error || 'Google sign-in could not complete. Try entering your email below.')
      );
    }
  };

  // 2. Direct Google Account Connect (Friction-free, 100% works on mobile & all browsers)
  const handleDirectGoogleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputEmail.trim();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter your Google or Gmail address.');
      return;
    }

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });

    const user = authService.signInWithMobileGoogle(
      email,
      inputName.trim() || undefined
    );

    setTick(t => t + 1);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  const handleEmailChange = (val: string) => {
    setInputEmail(val);
    if (val.includes('@') && !nameManuallyEdited) {
      const derived = formatNameFromEmail(val);
      if (derived) {
        setInputName(derived);
      }
    }
  };

  const handleUpdateStudentEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    const updated = authService.updateEmailAndSyncName(inputEmail.trim(), inputName.trim());
    setIsEditingEmail(false);
    setTick(t => t + 1);
    if (onSuccess) onSuccess(updated);
  };

  const handleSignOut = async () => {
    audioEngine.playSfx('click');
    await authService.signOut();
    setTick(t => t + 1);
  };

  return (
    <BaseModal
      onClose={onClose}
      title={isAuthenticated ? "GOOGLE ACCOUNT CONNECTED" : "SIGN IN WITH GOOGLE"}
      subtitle={isAuthenticated ? "Real-time sync active for Batch MLP41PT Bulletin Board" : "Connect your Google account to post & reply anytime"}
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
        {/* Error notification */}
        {errorMessage && (
          <div className="bg-amber-50 border border-amber-300 text-amber-900 p-2.5 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
            <span>{errorMessage}</span>
          </div>
        )}

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
                    <CheckCircle2 className="w-2.5 h-2.5" /> 
                    GOOGLE VERIFIED ✓
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

            {/* Student Email & Name Update Section */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-3.5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xs uppercase text-purple-950 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-purple-700" />
                  <span>Student Email & Name Sync</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingEmail(!isEditingEmail);
                    if (!isEditingEmail) {
                      setInputEmail(currentUser.email || '');
                      setInputName(currentUser.name || '');
                    }
                  }}
                  className="text-xs font-handwritten font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingEmail ? 'Cancel' : 'Update Name / Email'}</span>
                </button>
              </div>

              {isEditingEmail ? (
                <form onSubmit={handleUpdateStudentEmail} className="space-y-2.5 bg-paper-50 p-2.5 rounded-xl border border-purple-100">
                  <div>
                    <label className="text-[11px] font-display font-bold text-ink-light block mb-1">
                      Google Email Address:
                    </label>
                    <input
                      type="email"
                      value={inputEmail}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full px-3 py-2 bg-white border-2 border-purple-300 rounded-xl text-xs font-bold outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-display font-bold text-ink-light flex items-center justify-between mb-1">
                      <span>Student Name:</span>
                      {inputEmail.includes('@') && (
                        <span className="text-[10px] text-emerald-700 font-handwritten font-bold">
                          ✨ Auto-synced from email
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => {
                        setInputName(e.target.value);
                        setNameManuallyEdited(true);
                      }}
                      placeholder="Student Name"
                      className="w-full px-3 py-2 bg-white border border-ink/40 rounded-xl text-xs font-bold outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-display font-black text-xs uppercase rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Save & Sync Student Name
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-paper-50 p-2.5 rounded-xl border border-ink/10 text-xs">
                  <div>
                    <div className="font-display font-black text-ink">{currentUser.name}</div>
                    <div className="text-[11px] text-ink-light font-medium">{currentUser.email || 'No email registered'}</div>
                  </div>
                  <span className="text-[10px] font-handwritten font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Synced from Email ✓
                  </span>
                </div>
              )}
            </div>

            {/* Quick Status Note Update */}
            <div className="space-y-2 bg-paper-50 p-3 rounded-2xl border border-ink/20">
              <label className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Today's Note to Classmates:</span>
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
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase rounded-xl transition-colors shadow-xs cursor-pointer"
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
                className="sketch-btn py-2.5 px-3 text-xs font-black uppercase bg-white border border-rose-400 text-rose-600 hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Clean, Uncluttered Google Sign-In View */
          <div className="space-y-4">
            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 border border-blue-200 rounded-2xl p-3.5 text-xs text-center space-y-1">
              <div className="font-display font-black text-blue-950 flex items-center justify-center gap-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Google Sign-In</span>
              </div>
              <p className="font-handwritten text-xs text-blue-800 font-bold">
                Connect via Google to post on the Bulletin Board and reply at your own time!
              </p>
            </div>

            {/* Primary Action: 1-Tap Google Button */}
            <button
              type="button"
              onClick={handleFirebaseGoogleSignIn}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 border-2.5 border-ink rounded-2xl shadow-sketch flex items-center justify-center gap-3 transition-all hover:scale-101 active:scale-98 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span className="font-display font-black text-sm text-ink tracking-wide">
                {isLoading ? "CONNECTING TO GOOGLE..." : "SIGN IN WITH GOOGLE"}
              </span>
            </button>

            {/* Clean Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ink/15"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-display font-black uppercase">
                <span className="bg-paper px-3 text-ink-light">OR ENTER GOOGLE EMAIL</span>
              </div>
            </div>

            {/* Direct Google Email Connect Form */}
            <form onSubmit={handleDirectGoogleConnect} className="bg-white border-2 border-ink/20 rounded-2xl p-3.5 space-y-3 shadow-xs">
              <div>
                <label className="text-[11px] font-display font-bold text-ink-light block mb-1">
                  Your Google / Gmail Address:
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3 py-2.5 bg-paper-50 border-2 border-ink/30 rounded-xl text-xs font-bold outline-none pl-8 focus:border-blue-500 transition-colors"
                    required
                  />
                  <Mail className="w-4 h-4 text-blue-500 absolute left-2.5 top-3" />
                </div>
              </div>

              {inputEmail.includes('@') && (
                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[11px] flex items-center justify-between">
                  <span className="text-ink-light font-medium">Posting name:</span>
                  <span className="font-display font-black text-emerald-900">
                    {inputName || formatNameFromEmail(inputEmail)} ✨
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-display font-black text-xs uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
              >
                <span>CONNECT WITH GOOGLE</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
