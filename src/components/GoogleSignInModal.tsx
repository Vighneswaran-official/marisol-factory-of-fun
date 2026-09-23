import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  CheckCircle2, LogOut, 
  Loader2, AlertCircle, UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GoogleSignInModalProps {
  onClose: () => void;
  onSuccess?: (user: StudentProfile) => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({ onClose, onSuccess }) => {
  const [, setTick] = useState(0);
  const currentUser = authService.getCurrentUser();
  const savedAccounts = authService.getSavedAccounts();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newAccountInput, setNewAccountInput] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Switch to an existing account
  const handleSelectAccount = (account: StudentProfile) => {
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    const user = authService.switchAccount(account.id) || account;
    setTick(t => t + 1);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  // Add new Google Account / Student User
  const handleAddNewAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountInput.trim()) return;

    const isEmail = newAccountInput.includes('@');
    const derivedName = isEmail ? authService.formatEmailName(newAccountInput) : newAccountInput.trim();
    const finalUser = authService.loginStudentProfile(derivedName, isEmail ? newAccountInput.trim() : undefined);

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    setTick(t => t + 1);
    if (onSuccess) onSuccess(finalUser);
    onClose();
  };

  // Real Google OAuth Button
  const handleTriggerGoogleOAuth = async () => {
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
    } else {
      // Fallback: prompt to enter their Google Email directly
      setShowAddForm(true);
    }
  };

  const handleSignOutCurrent = async () => {
    audioEngine.playSfx('click');
    await authService.signOut();
    setTick(t => t + 1);
  };

  return (
    <BaseModal
      onClose={onClose}
      title="MULTI-USER ACCOUNTS"
      subtitle="Switch between saved users or add a new Google account"
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

        {/* 1. SAVED ACCOUNTS ON THIS DEVICE (Multi-User Switcher) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-display font-black text-xs text-stone-700 uppercase tracking-wide">
              Accounts on this Device ({savedAccounts.length})
            </span>
            <span className="text-[10px] font-bold text-stone-500">Tap to Switch</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {savedAccounts.map(account => {
              const isActive = currentUser?.id === account.id || currentUser?.name === account.name;
              return (
                <div
                  key={account.id}
                  onClick={() => handleSelectAccount(account)}
                  className={`w-full p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-rose-50/90 border-rose-300 ring-2 ring-rose-200 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-pink-300 hover:bg-stone-50/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl border-2 border-stone-200 overflow-hidden bg-white shrink-0 shadow-xs">
                      <img
                        src={account.avatarUrl}
                        alt={account.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-display font-black text-xs sm:text-sm text-stone-900 truncate">
                          {account.name}
                        </span>
                        {isActive && (
                          <span className="bg-emerald-600 text-white font-display text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 truncate font-medium">
                        {account.email}
                      </p>
                      <div className="text-[10px] font-handwritten font-bold text-rose-700">
                        {account.currentMoodEmoji} {account.currentMood}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isActive ? (
                      <span className="text-xs font-bold text-rose-600 bg-white px-2.5 py-1 rounded-xl border border-rose-200 shadow-2xs">
                        Current
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="text-xs font-display font-black text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-rose-100 px-3 py-1 rounded-xl border border-stone-200 transition-colors"
                      >
                        Switch →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. ADD / CONNECT ANOTHER GOOGLE ACCOUNT */}
        <div className="pt-2 border-t border-stone-200 space-y-2.5">
          {!showAddForm ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-display font-black text-xs uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>+ Add Google User</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerGoogleOAuth}
                disabled={isLoading}
                className="py-2.5 px-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-display font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Google OAuth Popup ↗</span>}
              </button>
            </div>
          ) : (
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 space-y-2.5 animate-scale-up">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xs text-blue-950 uppercase">
                  Add New Account Profile
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-[11px] font-bold text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddNewAccount} className="space-y-2">
                <input
                  type="text"
                  value={newAccountInput}
                  onChange={(e) => setNewAccountInput(e.target.value)}
                  placeholder="Enter Google Email (e.g. name@gmail.com) or Name..."
                  className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500"
                  required
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save & Switch to this Account
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 3. MODAL FOOTER */}
        <div className="flex gap-2 pt-2 border-t border-stone-200">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
          {currentUser && (
            <button
              onClick={handleSignOutCurrent}
              className="py-2.5 px-3 text-xs font-display font-black uppercase bg-white border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-xl flex items-center gap-1 transition-all shadow-xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

      </div>
    </BaseModal>
  );
};
