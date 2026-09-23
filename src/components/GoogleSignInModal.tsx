import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  CheckCircle2, LogOut, 
  Loader2, AlertCircle, Phone, ArrowRight, Lock, UserCheck, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ConfirmationResult } from '../services/firebase';

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

  // 1-Tap Quick Name State
  const [quickName, setQuickName] = useState('');

  // Phone Auth Secondary State
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  // 1-Tap Instant Connect (No domain block, works 100% on any device/APK)
  const handleQuickStudentConnect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = quickName.trim() || 'Batch 41 Student';

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });

    const user = authService.loginStudentProfile(finalName);
    setTick(t => t + 1);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  // Real Firebase Google Sign-In
  const handleGoogleSignIn = async (forceRedirect: boolean = false) => {
    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playSfx('click');

    const res = await authService.signInWithFirebaseGoogle(forceRedirect);
    setIsLoading(false);

    if (res.success) {
      if (res.user) {
        audioEngine.playSfx('fanfare');
        confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
        setTick(t => t + 1);
        if (onSuccess) onSuccess(res.user);
        onClose();
      }
    } else {
      setErrorMessage(res.error || 'Google sign-in could not complete. Please try again.');
    }
  };

  // Send Phone OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);

    const res = await authService.sendPhoneOtp(phoneNumber.trim(), 'recaptcha-container');
    setIsLoading(false);

    if (res.success && res.confirmationResult) {
      setConfirmationResult(res.confirmationResult);
      setOtpSent(true);
      audioEngine.playSfx('pop');
    } else {
      setErrorMessage(res.error || 'Failed to send OTP. Check phone number format (+91...).');
    }
  };

  // Verify Phone OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || !otpCode.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);

    const res = await authService.confirmPhoneOtp(confirmationResult, otpCode.trim());
    setIsLoading(false);

    if (res.success && res.user) {
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      setTick(t => t + 1);
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || 'Invalid 6-digit code. Please try again.');
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
      title={isAuthenticated ? "ACCOUNT CONNECTED" : "SIGN IN"}
      subtitle={isAuthenticated ? "Real-time sync active for Batch 41" : "Connect your profile for Group Chat & Bulletin Wall"}
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
        {/* Error notification banner with instant 1-tap fallback */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 p-3.5 rounded-2xl text-xs space-y-2 animate-scale-up">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
            <button
              onClick={() => handleQuickStudentConnect()}
              className="w-full py-2 bg-rose-600 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs hover:bg-rose-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Continue with 1-Tap Instant Connect</span>
            </button>
          </div>
        )}

        {isAuthenticated && currentUser ? (
          /* Already Signed In Profile View */
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200 rounded-3xl p-4 shadow-sm flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl border-2 border-pink-300 overflow-hidden bg-white shadow-xs shrink-0">
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
                  <span className="bg-emerald-600 text-white font-display text-[9px] font-black px-2 py-0.2 rounded-full flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-2.5 h-2.5" /> 
                    CONNECTED
                  </span>
                </div>
                <p className="font-sans text-xs text-stone-600 truncate mt-0.5">
                  {currentUser.email || currentUser.phone || 'Batch 41 Member'}
                </p>
                <div className="flex items-center gap-1 font-handwritten text-xs font-bold text-rose-700 mt-1">
                  <span>Current Mood:</span>
                  <span>{currentUser.currentMoodEmoji} {currentUser.currentMood}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Done
              </button>
              <button
                onClick={handleSignOut}
                className="py-3 px-4 text-xs font-black uppercase bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-2xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign-In Options View */
          <div className="space-y-4">
            
            {/* 1. UNIVERSAL 1-TAP CONNECT (Works 100% on ANY Device, Phone, Tablet, Laptop, APK) */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-purple-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-display font-black text-purple-950 text-xs uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Universal Instant Connect (Any Device)</span>
                </div>
                <span className="text-[10px] font-handwritten font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  All Devices 📱💻
                </span>
              </div>

              {/* Quick Profile Chips */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Kritika Verma', label: '👑 Kritika (Queen)', bg: 'bg-rose-100 text-rose-800 border-rose-300' },
                  { name: 'Vighneswaran', label: '🎓 Vighneswaran', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
                  { name: 'Batch 41 Student', label: '🌸 Batch Student', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
                ].map(profile => (
                  <button
                    key={profile.name}
                    type="button"
                    onClick={() => {
                      setQuickName(profile.name);
                      const finalUser = authService.loginStudentProfile(profile.name);
                      audioEngine.playSfx('fanfare');
                      confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
                      setTick(t => t + 1);
                      if (onSuccess) onSuccess(finalUser);
                      onClose();
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-display font-black border transition-all hover:scale-103 active:scale-97 cursor-pointer ${profile.bg}`}
                  >
                    {profile.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleQuickStudentConnect} className="space-y-2 pt-1">
                <input
                  type="text"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder="Or enter your custom name..."
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs font-semibold outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Connect Profile Instantly</span>
                </button>
              </form>
            </div>

            <div className="relative flex items-center justify-center">
              <span className="h-px bg-stone-200 w-full" />
              <span className="px-3 bg-white text-[11px] font-display font-bold text-stone-400 uppercase shrink-0">
                OR SIGN IN WITH GOOGLE
              </span>
              <span className="h-px bg-stone-200 w-full" />
            </div>

            {/* 2. Official Google Button */}
            <button
              type="button"
              onClick={() => handleGoogleSignIn(false)}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 border border-stone-300 hover:border-blue-500 rounded-2xl shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-60"
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
              <span className="font-display font-black text-xs sm:text-sm text-stone-800 tracking-wide">
                {isLoading ? "CONNECTING..." : "SIGN IN WITH GOOGLE"}
              </span>
            </button>

            {/* Mobile Redirect fallback option */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => handleGoogleSignIn(true)}
                className="text-[11px] font-handwritten font-bold text-stone-500 hover:text-stone-800 underline cursor-pointer"
              >
                Popup blocked on mobile? Use Fullscreen Google Redirect →
              </button>
            </div>

            {/* 3. Secondary Phone / OTP Accordion */}
            <div className="pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setShowPhoneAuth(!showPhoneAuth)}
                className="w-full py-2 text-xs font-display font-bold text-stone-600 hover:text-stone-900 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Alternative: Phone Number OTP</span>
                </span>
                <span className="text-[11px] text-stone-400 font-bold">{showPhoneAuth ? '▲ Hide' : '▼ Show'}</span>
              </button>

              {showPhoneAuth && (
                <div className="mt-2.5 bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-3 animate-scale-up">
                  <div id="recaptcha-container"></div>

                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-2.5">
                      <div>
                        <label className="text-[11px] font-display font-bold text-stone-600 block mb-1">
                          Mobile Phone Number (with country code):
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white font-display font-black text-xs uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        <span>Send 6-Digit OTP</span>
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-2.5">
                      <div>
                        <label className="text-[11px] font-display font-bold text-stone-600 block mb-1">
                          Enter 6-Digit Code sent to {phoneNumber}:
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="123456"
                          className="w-full px-3 py-2 bg-white border-2 border-blue-400 rounded-xl text-center text-sm font-black tracking-widest outline-none"
                          required
                          autoFocus
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>Verify & Sign In</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
