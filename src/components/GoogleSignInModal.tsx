import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  CheckCircle2, LogOut, 
  Loader2, AlertCircle, Sparkles, Mail, Lock, User, MessagesSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GoogleSignInModalProps {
  onClose: () => void;
  onSuccess?: (user: StudentProfile) => void;
  onNavigateToChat?: () => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({ onClose, onSuccess, onNavigateToChat }) => {
  const [, setTick] = useState(0);
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // Handle direct Sign In with Mail ID
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    if (!cleanEmail) return;

    // Derived or entered name
    const derivedName = nameInput.trim() || authService.formatEmailName(cleanEmail) || 'New User';
    const finalUser = authService.loginStudentProfile(derivedName, cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`);

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
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
      confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
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
      title={isAuthenticated ? "YOUR ACCOUNT" : "SIGN IN WITH MAIL ID"}
      subtitle={isAuthenticated ? "Account details & chat permissions" : "Whoever signs in with their mail ID is welcomed as a New User and allowed to chat with all users!"}
      icon={
        <div className="w-6 h-6 flex items-center justify-center text-rose-500 font-bold">
          <Mail className="w-5 h-5 text-rose-500" />
        </div>
      }
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl text-xs space-y-1 animate-fade-in">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Sign-In Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-700 pl-6">
              {errorMessage}
            </p>
            <p className="text-[11px] font-semibold text-rose-900 pl-6 pt-1">
              👉 You can immediately sign in below by entering your Mail ID (Email address).
            </p>
          </div>
        )}

        {/* 1. SIGNED-IN VIEW */}
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
                    <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-display text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                      <Sparkles className="w-2.5 h-2.5 fill-white" />
                      {currentUser.userTag || (currentUser.isNewUser ? 'NEW USER' : 'USER')}
                    </span>
                    <span className="bg-emerald-600 text-white font-display text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 truncate font-semibold mt-0.5">
                    ✉️ {currentUser.email || 'Private Mail ID'}
                  </p>
                  <div className="text-[11px] font-handwritten font-bold text-rose-700 mt-0.5">
                    Current Vibe: {currentUser.currentMoodEmoji} {currentUser.currentMood}
                  </div>
                </div>
              </div>

              {/* Chat privilege confirmation banner */}
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-emerald-900 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Chat Access Granted:</strong> You are allowed to chat in the community lounge and send direct messages to each other user!
                </span>
              </div>
            </div>

            {/* Account Actions */}
            <div className="flex flex-col gap-2">
              {onNavigateToChat && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToChat();
                  }}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-black text-xs uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessagesSquare className="w-4 h-4" />
                  <span>Start Chatting with Other Users</span>
                </button>
              )}
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
          /* 2. SIGN-IN FORM VIEW */
          <div className="space-y-3.5">
            {/* Explanatory New User Welcome Callout */}
            <div className="p-3 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-display font-black text-rose-900">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>New User Registration & Chat Access</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                Enter your Mail ID to immediately register as a <strong>New User</strong>. Once signed in, you are fully authorized to chat in the group lounge and message any user directly!
              </p>
            </div>

            {/* Quick One-Tap Mail ID Suggestions */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">
                Quick 1-Tap Sign In:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Kritika Gupta 👑', email: 'kritika.gupta@mlp41.edu' },
                  { name: 'Priyanshu Sharma', email: 'priyanshu.sharma@mlp41.edu' },
                  { name: 'Batch 41 Member', email: 'student@mlp41.edu' },
                ].map(item => (
                  <button
                    key={item.email}
                    type="button"
                    onClick={() => {
                      setEmailInput(item.email);
                      setNameInput(item.name);
                    }}
                    className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 border border-stone-200 rounded-lg text-stone-700 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mail ID Quick Sign In Form */}
            <form onSubmit={handleSignInSubmit} className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-display font-bold text-stone-700 block">
                  Your Mail ID (Email Address) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-rose-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (!nameInput && e.target.value.includes('@')) {
                        setNameInput(authService.formatEmailName(e.target.value));
                      }
                    }}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold outline-none focus:border-rose-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-display font-bold text-stone-700 block">
                  Display Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Kritika or Alex"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold outline-none focus:border-rose-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white" />
                <span>Sign In as New User & Chat</span>
              </button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-[10px] font-display font-black text-stone-400 uppercase tracking-wider">or sign in with google</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            {/* Direct Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleOAuth}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-display font-black text-xs uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
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
                  <span>Continue with Google Mail</span>
                </>
              )}
            </button>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2 text-[10px] text-stone-500">
              <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Real-time chat synchronization across devices via Firestore is active.</span>
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

