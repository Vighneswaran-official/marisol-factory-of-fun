import React, { useState } from 'react';
import { authService, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Sparkles, Mail, Lock, User, AlertCircle, Loader2, Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthScreenProps {
  onSuccess?: (user: StudentProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // Handle direct Sign In with Mail ID
  const handleMailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your Mail ID (Email address).');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playSfx('click');

    try {
      const derivedName = nameInput.trim() || authService.formatEmailName(cleanEmail) || 'New User';
      const formattedEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`;
      const finalUser = await authService.loginStudentProfile(derivedName, formattedEmail);

      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      if (onSuccess) onSuccess(finalUser);
    } catch (err: any) {
      console.error('[AuthScreen] Mail sign-in error:', err);
      setErrorMessage(err?.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playSfx('click');

    try {
      const res = await authService.signInWithFirebaseGoogle(false);
      if (res.success && res.user) {
        audioEngine.playSfx('fanfare');
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        if (onSuccess) onSuccess(res.user);
      } else if (res.error) {
        setErrorMessage(res.error);
      }
    } catch (err: any) {
      console.error('[AuthScreen] Google OAuth error:', err);
      setErrorMessage(err?.message || 'Google sign-in could not complete.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-rose-50 via-pink-50/50 to-amber-50/40 flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-rose-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10 animate-scale-up">
        
        {/* Brand Header & Royal Crest */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 rounded-2xl shadow-md shadow-rose-200/80 mx-auto">
            <Crown className="w-8 h-8 text-white fill-white animate-bounce-soft" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight">
                MARISOL
              </h1>
              <span className="text-rose-500 font-black text-sm">✨</span>
            </div>
            <p className="font-display text-[10px] text-rose-600 font-extrabold tracking-widest uppercase">
              FACTORY OF FUN • KRITIKA'S COMFORT SPACE
            </p>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium px-2">
            Welcome! Please sign in to enter the lounge, chat with batchmates, view photo feeds, and enjoy music & trivia.
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs space-y-1 animate-fade-in text-left">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Sign-In Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-700 pl-6">
              {errorMessage}
            </p>
            <p className="text-[11px] font-semibold text-rose-900 pl-6 pt-0.5">
              👉 You can immediately sign in below using your Mail ID.
            </p>
          </div>
        )}

        {/* Action 1: Google OAuth Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-50 active:scale-[0.98] border-2 border-stone-200 hover:border-rose-300 text-stone-800 font-display font-black text-sm py-3 px-4 rounded-2xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
          ) : (
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
          )}
          <span>Continue with Google Mail</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-stone-600 uppercase tracking-wider shrink-0 font-display">
            or sign in with mail id
          </span>
          <div className="border-t border-stone-200 w-full" />
        </div>

        {/* Action 2: Sign In with Mail ID Form */}
        <form onSubmit={handleMailSignIn} className="space-y-3.5 text-left">
          <div className="space-y-1">
            <label className="text-[11px] font-display font-bold text-stone-700 uppercase tracking-wider block">
              Your Name (Optional)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 pointer-events-none" />
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Kritika / Batchmate"
                disabled={isLoading}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-display font-bold text-stone-700 uppercase tracking-wider block">
              Mail ID / Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 pointer-events-none" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g. kritika@gmail.com"
                disabled={isLoading}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
              />
            </div>
            <p className="text-[10px] text-stone-600 pl-1">
              Your mail ID confirms your membership and unlocks all app features instantly.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !emailInput.trim()}
            className="w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 active:scale-[0.98] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>Enter Factory of Fun 🌸</span>
              </>
            )}
          </button>
        </form>

        {/* Security & Access Badge */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] font-medium text-stone-600">
          <Lock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>Access strictly restricted to authenticated batch members.</span>
        </div>

      </div>
    </div>
  );
};
