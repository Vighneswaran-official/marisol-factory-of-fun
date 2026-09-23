import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  CheckCircle2, LogOut, 
  Loader2, AlertCircle, Sparkles, Mail, Lock, ShieldCheck
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
  const [emailOrNameInput, setEmailOrNameInput] = useState('');

  // Handle direct Sign In / Name / Email
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrNameInput.trim()) return;

    const input = emailOrNameInput.trim();
    const isEmail = input.includes('@');
    const derivedName = isEmail ? authService.formatEmailName(input) : input;
    const finalUser = authService.loginStudentProfile(derivedName, isEmail ? input : undefined);

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    setTick(t => t + 1);
    if (onSuccess) onSuccess(finalUser);
    onClose();
  };

  // Google OAuth Sign In
  const handleGoogleOAuth = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playSfx('click');

    const res = await authService.signInWithFirebaseGoogle(false);
    setIsLoading(false);

    if (res.success && res.user) {
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      setTick(t => t + 1);
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else if (res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleSignOut = async () => {
    audioEngine.playSfx('click');
    await authService.signOut();
    setTick(t => t + 1);
  };

  return (
    <BaseModal
      onClose={onClose}
      title={isAuthenticated ? "YOUR ACCOUNT" : "SIGN IN"}
      subtitle={isAuthenticated ? "Private account details & settings" : "Sign in to save your personal mood notes & favorites"}
      icon={
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
        </div>
      }
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. SIGNED-IN VIEW (Shows only this user's private card) */}
        {isAuthenticated && currentUser ? (
          <div className="space-y-3.5">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-white border border-rose-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl border-2 border-rose-300 overflow-hidden bg-white shrink-0 shadow-sm">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display font-black text-sm text-stone-900 truncate">
                      {currentUser.name}
                    </h3>
                    <span className="bg-emerald-600 text-white font-display text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      LOGGED IN
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 truncate font-medium">
                    {currentUser.email || 'Private Account'}
                  </p>
                  <div className="text-[11px] font-handwritten font-bold text-rose-700 mt-0.5">
                    Current Vibe: {currentUser.currentMoodEmoji} {currentUser.currentMood}
                  </div>
                </div>
              </div>

              {/* Privacy badge */}
              <div className="flex items-center gap-2 bg-white/90 border border-stone-200/80 rounded-xl px-3 py-1.5 text-[11px] text-stone-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Your notes & mood history are strictly private to this account.</span>
              </div>
            </div>

            {/* Account Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleSignOut}
                className="w-full py-2.5 px-3 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-display font-black text-xs uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of this Account</span>
              </button>
            </div>
          </div>
        ) : (
          /* 2. SIGN-IN FORM VIEW (Clean, Concise, No Other User Data Exposed) */
          <div className="space-y-3.5">
            {/* Direct Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleOAuth}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-display font-black text-xs uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-[10px] font-display font-black text-stone-400 uppercase tracking-wider">or enter your details</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            {/* Email / Username Quick Sign In */}
            <form onSubmit={handleSignInSubmit} className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-display font-bold text-stone-700 block">
                  Your Name or Google Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={emailOrNameInput}
                    onChange={(e) => setEmailOrNameInput(e.target.value)}
                    placeholder="e.g. Kritika or name@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold outline-none focus:border-rose-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white" />
                <span>Sign In to Comfort Space</span>
              </button>
            </form>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2 text-[10px] text-stone-500">
              <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Personal profile privacy is enforced. Only you can view your notes and logs.</span>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-2 border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

