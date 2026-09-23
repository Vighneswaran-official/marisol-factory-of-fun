import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, isMobileBrowser, formatNameFromEmail, type StudentProfile } from '../services/authService';
import { isFirebaseConfigured } from '../services/firebase';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  CheckCircle2, LogOut, Sparkles, User, ShieldCheck, 
  HeartHandshake, Loader2, AlertCircle, Smartphone, Globe, Mail, Edit3, KeyRound, Shield
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
  const isMobile = isMobileBrowser();

  const [activeTab, setActiveTab] = useState<'google' | 'authenticator' | 'mobile'>('google');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Form Fields
  const [inputName, setInputName] = useState(currentUser?.name || '');
  const [inputEmailOrPhone, setInputEmailOrPhone] = useState(currentUser?.phone || currentUser?.email || '');
  const [authenticatorCode, setAuthenticatorCode] = useState('');
  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);
  const [currentMood, setCurrentMood] = useState(currentUser?.currentMood || 'Radiant & Grateful');
  const [currentMoodEmoji, setCurrentMoodEmoji] = useState(currentUser?.currentMoodEmoji || '💡');
  const [statusNote, setStatusNote] = useState(currentUser?.statusNote || '');

  // 1. Firebase Google Sign-In (Mobile redirect or Desktop popup)
  const handleFirebaseGoogleSignIn = async (forceRedirect = false) => {
    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playSfx('click');

    const res = await authService.signInWithFirebaseGoogle(forceRedirect);
    setIsLoading(false);

    if (res.success) {
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
      setTick(t => t + 1);
      if (res.user && onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || 'Popup closed or Google Sign-In could not complete.');
    }
  };

  // Handle email/identifier change and auto-derive student name
  const handleEmailOrPhoneChange = (val: string) => {
    setInputEmailOrPhone(val);
    if (val.includes('@') && !nameManuallyEdited) {
      const derived = formatNameFromEmail(val);
      if (derived) {
        setInputName(derived);
      }
    }
  };

  // 2. Mobile Phone / Student Sign-In
  const handleMobileSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmailOrPhone.trim()) {
      setErrorMessage('Please enter your mobile number or student email.');
      return;
    }

    const derivedName = inputName.trim() || (inputEmailOrPhone.includes('@') ? formatNameFromEmail(inputEmailOrPhone) : '') || 'Batch 41 Student';

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

    const user = authService.signInWithMobile({
      name: derivedName,
      phoneOrEmail: inputEmailOrPhone.trim(),
      mood: currentMood,
      moodEmoji: currentMoodEmoji,
      statusNote: statusNote.trim() || "Loving the Batch 41 energy! ♡",
    });

    setTick(t => t + 1);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  // 3. Mobile Firebase Google Authenticator Login
  const handleGoogleAuthenticatorSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmailOrPhone.trim()) {
      setErrorMessage('Please enter your student email to verify with Google Authenticator.');
      return;
    }
    const cleanCode = authenticatorCode.replace(/\s/g, '').trim();
    if (cleanCode.length < 6) {
      setErrorMessage('Please enter the 6-digit verification code from your Google Authenticator app.');
      return;
    }

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });

    const user = authService.signInWithGoogleAuthenticator({
      email: inputEmailOrPhone.trim(),
      authCode: cleanCode,
      name: inputName.trim() || undefined,
      mood: currentMood,
      moodEmoji: currentMoodEmoji,
      statusNote: statusNote.trim() || 'Verified with Google Authenticator on Mobile 🛡️',
    });

    setTick(t => t + 1);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  const handleUpdateStudentEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmailOrPhone.trim()) return;
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    const updated = authService.updateEmailAndSyncName(inputEmailOrPhone.trim(), inputName.trim());
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
      title={isAuthenticated ? "ACCOUNT CONNECTED" : "FIREBASE & GOOGLE SIGN IN"}
      subtitle={isAuthenticated ? "Real-time sync active for Batch MLP41PT" : "Log in on mobile or desktop to post your updates"}
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
          <div className="bg-rose-50 border border-rose-300 text-rose-800 p-2.5 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
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
                    {currentUser.loginMethod === 'google_authenticator'
                      ? 'GOOGLE AUTHENTICATOR 🛡️'
                      : currentUser.phone ? 'MOBILE AUTH' : 'FIREBASE AUTH'}
                  </span>
                </div>
                <p className="font-sans text-xs text-ink-light truncate mt-0.5">
                  {currentUser.phone || currentUser.email}
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
                      setInputEmailOrPhone(currentUser.email || currentUser.phone || '');
                      setInputName(currentUser.name || '');
                    }
                  }}
                  className="text-xs font-handwritten font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingEmail ? 'Cancel' : 'Update Email / Name'}</span>
                </button>
              </div>

              {isEditingEmail ? (
                <form onSubmit={handleUpdateStudentEmail} className="space-y-2.5 bg-paper-50 p-2.5 rounded-xl border border-purple-100">
                  <div>
                    <label className="text-[11px] font-display font-bold text-ink-light block mb-1">
                      Student Email Address:
                    </label>
                    <input
                      type="email"
                      value={inputEmailOrPhone}
                      onChange={(e) => handleEmailOrPhoneChange(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-3 py-2 bg-white border-2 border-purple-300 rounded-xl text-xs font-bold outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-display font-bold text-ink-light flex items-center justify-between mb-1">
                      <span>Student Name:</span>
                      {inputEmailOrPhone.includes('@') && (
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
                    className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-display font-black text-xs uppercase rounded-xl transition-all shadow-xs"
                  >
                    Save & Sync Student Name from Email
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
            {/* Value Proposition & Mode */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="font-display font-black text-purple-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <span>Real-Time Batch 41 Sync</span>
                </div>
                <span className="text-[9px] font-display font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {isFirebaseConfigured ? 'Firebase Active 🟢' : 'Demo Mode ⚡'}
                </span>
              </div>
              <p className="font-handwritten text-xs font-bold text-purple-900">
                Log in so only your real posts appear on the wall, and your live mood updates automatically!
              </p>
            </div>

            {/* Method Tabs: Google Sign-In vs Google Authenticator vs Mobile Phone */}
            <div className="flex rounded-xl bg-paper-100 p-1 border border-ink/20 gap-1">
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  setActiveTab('google');
                }}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-display font-black flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'google'
                    ? 'bg-white text-ink shadow-xs border border-ink/20'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  setActiveTab('authenticator');
                }}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-display font-black flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'authenticator'
                    ? 'bg-white text-ink shadow-xs border border-ink/20'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                <span>Authenticator</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  setActiveTab('mobile');
                }}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-display font-black flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'mobile'
                    ? 'bg-white text-ink shadow-xs border border-ink/20'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                <span>Mobile</span>
              </button>
            </div>

            {activeTab === 'google' && (
              /* Google Sign-In Tab */
              <div className="space-y-3">
                <button
                  onClick={() => handleFirebaseGoogleSignIn(false)}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-white hover:bg-gray-50 border-2.5 border-ink rounded-2xl shadow-sketch flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-purple-700 animate-spin" />
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
                  <span className="font-display font-black text-xs sm:text-sm text-ink">
                    {isLoading ? "CONNECTING TO GOOGLE..." : "SIGN IN WITH GOOGLE"}
                  </span>
                </button>

                {/* Mobile direct redirect option for mobile devices */}
                {isMobile && (
                  <button
                    type="button"
                    onClick={() => handleFirebaseGoogleSignIn(true)}
                    className="w-full py-2 bg-paper-100 hover:bg-paper-200 border border-ink/30 rounded-xl text-xs font-handwritten font-bold text-ink-light flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>📱 Mobile browser popup blocked? Tap for Direct Redirect</span>
                  </button>
                )}
              </div>
            )}

            {activeTab === 'authenticator' && (
              /* Google Authenticator (2FA Verification) Tab */
              <form onSubmit={handleGoogleAuthenticatorSignIn} className="space-y-3">
                <div className="bg-amber-50 border border-amber-300 rounded-2xl p-2.5 text-xs space-y-1">
                  <div className="font-display font-black text-amber-950 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-700" />
                    <span>Google Authenticator (2FA Verification)</span>
                  </div>
                  <p className="font-handwritten text-[11px] font-bold text-amber-900">
                    Enter your email and the 6-digit verification code from your mobile Google Authenticator app.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-purple-700" />
                    <span>Student Email:</span>
                  </label>
                  <input
                    type="email"
                    value={inputEmailOrPhone}
                    onChange={(e) => handleEmailOrPhoneChange(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 bg-paper-50 border-2 border-ink rounded-xl text-xs font-bold outline-none"
                    required
                  />
                  {inputEmailOrPhone.includes('@') && (
                    <p className="text-[11px] font-handwritten text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3 text-emerald-600 animate-spin" />
                      <span>Student name: <strong>{inputName || formatNameFromEmail(inputEmailOrPhone)}</strong></span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-display font-black text-xs uppercase text-ink flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      <span>6-Digit Authenticator Code:</span>
                    </span>
                    <span className="font-handwritten text-[10px] text-amber-800 font-bold">
                      (from Authenticator app)
                    </span>
                  </label>
                  <input
                    type="text"
                    maxLength={7}
                    value={authenticatorCode}
                    onChange={(e) => setAuthenticatorCode(e.target.value)}
                    placeholder="123 456"
                    className="w-full px-3 py-2 bg-white border-2 border-amber-400 rounded-xl text-center text-lg font-mono font-black tracking-widest outline-none"
                    required
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="sketch-btn-primary w-full py-3 text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sketch"
                  >
                    <Shield className="w-4 h-4" />
                    <span>VERIFY WITH GOOGLE AUTHENTICATOR</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'mobile' && (
              /* Mobile Phone / Student Sign-In Tab */
              <form onSubmit={handleMobileSignIn} className="space-y-3">
                <div className="space-y-1">
                  <label className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-purple-700" />
                    <span>Student Email or Mobile:</span>
                  </label>
                  <input
                    type="text"
                    value={inputEmailOrPhone}
                    onChange={(e) => handleEmailOrPhoneChange(e.target.value)}
                    placeholder="e.g. your.name@gmail.com or mobile"
                    className="w-full px-3 py-2 bg-paper-50 border-2 border-ink rounded-xl text-xs font-bold outline-none"
                    required
                  />
                  {inputEmailOrPhone.includes('@') && (
                    <p className="text-[11px] font-handwritten text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3 text-emerald-600 animate-spin" />
                      <span>Student name automatically derived from your email address!</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-display font-black text-xs uppercase text-ink flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-purple-700" />
                      <span>Student Name:</span>
                    </span>
                    {inputEmailOrPhone.includes('@') && (
                      <span className="font-handwritten text-[11px] text-emerald-700 font-bold">
                        (Auto-synced from mail)
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
                    placeholder="e.g. Kritika"
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
                    <Smartphone className="w-4 h-4" />
                    <span>LOGIN ON MOBILE</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </BaseModal>
  );
};
