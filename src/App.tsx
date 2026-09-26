import { useState, useEffect, useRef, useCallback } from 'react';
import type { ScreenState, Question } from './types/game';
import { gameState } from './services/gameState';
import { audioEngine } from './services/synthAudioEngine';
import { authService } from './services/authService';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { LearningCard } from './components/LearningCard';
import { BatchUpdatesWall } from './components/BatchUpdatesWall';
import { MusicPlayerScreen } from './components/MusicPlayerScreen';
import { FloatingMusicBar } from './components/FloatingMusicBar';
import { GoogleSignInModal } from './components/GoogleSignInModal';
import { MoodHistoryModal } from './components/MoodHistoryModal';
import { ComfortShelfModal } from './components/ComfortShelfModal';
import { InstallAppModal } from './components/InstallAppModal';
import { BottomNavigationDock, type MainNavTab } from './components/BottomNavigationDock';
import { 
  getQuestionsForMood, 
  getMoodMacaroni, 
  KRITIKA_STICKER_MOODS,
  type MoodProfileSetting 
} from './services/moodQuizService';
import { nonRepeatingQuizEngine } from './data/foodMovieQuestions1000';
import { RefreshCw, Trophy, Clock, Film, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import heroBannerVideoSrc from './assets/Hero Banner video.mp4';

export function App() {
  const [, setAuthTick] = useState(0);

  const [player, setPlayer] = useState(gameState.getPlayer());
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('home');
  const [wallInitialMode, setWallInitialMode] = useState<'chat' | 'posts' | 'bulletin'>('chat');
  const [quizFinished, setQuizFinished] = useState(false);

  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [showInstallApp, setShowInstallApp] = useState(false);
  const [showMoodHistory, setShowMoodHistory] = useState(false);
  const [showComfortShelf, setShowComfortShelf] = useState(false);

  // References for native back button event handlers
  const currentScreenRef = useRef<ScreenState>(currentScreen);
  const wallInitialModeRef = useRef<'chat' | 'posts' | 'bulletin'>(wallInitialMode);
  const showGoogleSignInRef = useRef(showGoogleSignIn);
  const showInstallAppRef = useRef(showInstallApp);
  const showMoodHistoryRef = useRef(showMoodHistory);
  const showComfortShelfRef = useRef(showComfortShelf);

  useEffect(() => {
    currentScreenRef.current = currentScreen;
    wallInitialModeRef.current = wallInitialMode;
    showGoogleSignInRef.current = showGoogleSignIn;
    showInstallAppRef.current = showInstallApp;
    showMoodHistoryRef.current = showMoodHistory;
    showComfortShelfRef.current = showComfortShelf;
  });

  useEffect(() => {
    return authService.subscribe(() => {
      setAuthTick(t => t + 1);
      const user = authService.getCurrentUser();
      if (user && (user.isGoogleVerified || (user.email && user.email.includes('@')))) {
        setShowGoogleSignIn(false);
      }
    });
  }, []);

  // 1. Check authentication state on app load:
  // If user is already logged in (has valid session/profile), skip sign-in popup entirely.
  // If NOT logged in, show Google Sign-In popup prompting them to sign in.
  useEffect(() => {
    let isCancelled = false;

    authService.waitForAuthReady().then((fbUser) => {
      if (isCancelled) return;

      const currentUser = authService.getCurrentUser();
      const isAlreadyLoggedIn = Boolean(
        (fbUser && !fbUser.isAnonymous) ||
        authService.isGoogleAuthenticated() ||
        authService.isMailIdAuthenticated() ||
        (currentUser && currentUser.email && currentUser.email.includes('@'))
      );

      // Skip sign-in popup entirely if user has an active session/profile
      if (isAlreadyLoggedIn) {
        setShowGoogleSignIn(false);
        return;
      }

      // Only show if user is NOT logged in and hasn't dismissed yet this session
      const hasPrompted = sessionStorage.getItem('marisol_prompted_login');
      if (!hasPrompted) {
        sessionStorage.setItem('marisol_prompted_login', 'true');
        const timer = setTimeout(() => {
          if (!isCancelled) {
            setShowGoogleSignIn(true);
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Initialize browser history state for home screen on boot
  useEffect(() => {
    if (!window.history.state || !window.history.state.screen) {
      window.history.replaceState({ screen: 'home', wallMode: 'chat' }, '', '#home');
    }
  }, []);

  // Internal screen applicator (updates React state without pushing to history)
  const applyScreenState = useCallback((screen: ScreenState, wallMode?: 'chat' | 'posts' | 'bulletin') => {
    if (wallMode) {
      setWallInitialMode(wallMode);
    }
    setCurrentScreen(screen);
    setPlayer(gameState.getPlayer());
    if (screen === 'home') {
      setActiveNavTab('home');
      setQuizFinished(false);
    } else if (screen === 'music') {
      setActiveNavTab('music');
    } else if (screen === 'batch_wall') {
      const mode = wallMode || wallInitialModeRef.current;
      setActiveNavTab(mode === 'posts' ? 'posts' : 'chat');
      setQuizFinished(false);
    } else if (screen === 'quiz') {
      setActiveNavTab('quiz');
    }
  }, []);

  // 3. Native Screen Navigation Handler (pushes to browser history)
  const handleNavigate = useCallback((screen: ScreenState, wallMode?: 'chat' | 'posts' | 'bulletin') => {
    const targetMode = wallMode || wallInitialModeRef.current;
    if (currentScreenRef.current === screen && (!wallMode || wallMode === wallInitialModeRef.current)) {
      return;
    }

    applyScreenState(screen, targetMode);

    const stateObj = { screen, wallMode: targetMode };
    const hash = `#${screen}${wallMode ? `-${wallMode}` : ''}`;
    window.history.pushState(stateObj, '', hash);
  }, [applyScreenState]);

  // 4. Browser / Gesture PopState Event Listener
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If any modal is open, dismiss it first on back
      if (showGoogleSignInRef.current) {
        setShowGoogleSignIn(false);
        return;
      }
      if (showInstallAppRef.current) {
        setShowInstallApp(false);
        return;
      }
      if (showMoodHistoryRef.current) {
        setShowMoodHistory(false);
        return;
      }
      if (showComfortShelfRef.current) {
        setShowComfortShelf(false);
        return;
      }

      // Navigate back one screen according to history state
      const state = event.state as { screen?: ScreenState; wallMode?: 'chat' | 'posts' | 'bulletin' } | null;
      const targetScreen = state?.screen || 'home';
      const targetWallMode = state?.wallMode || 'chat';

      applyScreenState(targetScreen, targetWallMode);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [applyScreenState]);

  // 5. Capacitor Native Android Hardware/Gesture Back Button Listener
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let cleanup: (() => void) | undefined;

    CapacitorApp.addListener('backButton', () => {
      // Dismiss any open modal first
      if (showGoogleSignInRef.current) {
        setShowGoogleSignIn(false);
        return;
      }
      if (showInstallAppRef.current) {
        setShowInstallApp(false);
        return;
      }
      if (showMoodHistoryRef.current) {
        setShowMoodHistory(false);
        return;
      }
      if (showComfortShelfRef.current) {
        setShowComfortShelf(false);
        return;
      }

      // If on a sub-screen, go back one screen in history
      if (currentScreenRef.current !== 'home') {
        window.history.back();
      } else {
        // When on home screen with nowhere left to go, exit app
        CapacitorApp.exitApp();
      }
    }).then((handle) => {
      cleanup = () => handle.remove();
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Active Mood State
  const [activeMoodId, setActiveMoodId] = useState<string>('happy');

  // Active Quiz Round State
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{ option: string; isCorrect: boolean } | null>(null);

  // Quiz Celebration Video State
  const quizVideoRef = useRef<HTMLVideoElement | null>(null);
  const [quizVideoPlaying, setQuizVideoPlaying] = useState(true);
  const [quizVideoMuted, setQuizVideoMuted] = useState(false);

  // Active Mood Details
  const currentMoodSetting: MoodProfileSetting = 
    KRITIKA_STICKER_MOODS.find(m => m.id === activeMoodId) || KRITIKA_STICKER_MOODS[0];
  const currentMacaroni = getMoodMacaroni(activeMoodId);

  // Bottom Navigation tab click handler (Home, Chat, Post, Music, Quiz)
  const handleBottomTabSelect = (tab: MainNavTab) => {
    setActiveNavTab(tab);
    if (tab === 'home') {
      handleNavigate('home');
    } else if (tab === 'music') {
      handleNavigate('music');
    } else if (tab === 'quiz') {
      handleStartMoodQuiz(activeMoodId);
    } else if (tab === 'chat') {
      handleNavigate('batch_wall', 'chat');
    } else if (tab === 'posts') {
      handleNavigate('batch_wall', 'posts');
    }
  };

  // Launch Quiz Tailored to Food & Movies (1000+ Non-Repeating Library)
  const handleStartMoodQuiz = (moodId: string) => {
    setActiveMoodId(moodId);
    audioEngine.playSfx('fanfare');
    const moodQuestions = getQuestionsForMood(moodId, 5);
    setQuizQuestions(moodQuestions);
    setCurrentQIndex(0);
    setRoundScore(0);
    setShowLearningCard(false);
    setQuizFinished(false);
    audioEngine.startMusic('quiz');

    applyScreenState('quiz');
    window.history.pushState({ screen: 'quiz' }, '', '#quiz');
  };

  // Handle Question Answer
  const handleAnswerQuestion = (selectedOption: string, _timeTakenMs: number) => {
    const currentQ = quizQuestions[currentQIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    const points = isCorrect ? 3 : 0;

    gameState.recordQuestionAnswered(isCorrect);

    if (isCorrect) {
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      gameState.incrementStreak();
      gameState.addCucumberSandwiches(points);
      setRoundScore(prev => prev + points);
    } else {
      audioEngine.playSfx('wrong');
      gameState.resetStreak();
    }
    setPlayer(gameState.getPlayer());

    setLastAnswer({ option: selectedOption, isCorrect });
    setShowLearningCard(true);
  };

  // Move to Next Question or Complete Quiz
  const handleNextQuizQuestion = () => {
    setShowLearningCard(false);
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 90, spread: 85, origin: { y: 0.5 } });
    }
  };

  const quizStats = nonRepeatingQuizEngine.getStats();

  return (
    <div className={`bg-[#FAF8F5] text-stone-900 font-sans antialiased selection:bg-pink-200 ${
      currentScreen === 'batch_wall' ? 'h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden' : 'min-h-screen'
    }`}>
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenInstallApp={() => setShowInstallApp(true)}
        onOpenGoogleSignIn={() => setShowGoogleSignIn(true)}
      />

      {/* Main Content Area */}
      <main className={`animate-fade-in ${
        currentScreen === 'batch_wall' 
          ? 'flex-1 min-h-0 flex flex-col overflow-hidden pb-0' 
          : 'pb-20'
      }`}>
        
        {/* 1. HOME SCREEN: Hero Video, 1-9 Mood Selector & Macaroni Preview */}
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onStartMoodQuiz={handleStartMoodQuiz}
            onOpenMoodHistory={() => setShowMoodHistory(true)}
            onOpenComfortShelf={() => setShowComfortShelf(true)}
            activeMoodId={activeMoodId}
            onSelectMood={setActiveMoodId}
          />
        )}

        {/* 2. ONLINE MUSIC PLAYER STREAMER SCREEN */}
        {currentScreen === 'music' && (
          <MusicPlayerScreen onNavigate={handleNavigate} />
        )}

        {/* 3. 1,000+ FOOD & MOVIE QUIZ GAME SCREEN */}
        {currentScreen === 'quiz' && (
          <div className="max-w-xl mx-auto p-4 sm:p-6 pb-28 space-y-4">
            {/* Quiz Top Action Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <span className="font-display font-black text-xs uppercase text-rose-600 tracking-wider">
                  #{currentMoodSetting.scaleNumber} {currentMoodSetting.emoji} Food & Movie Quiz
                </span>
                <h2 className="font-display font-black text-lg text-stone-900">
                  Question {currentQIndex + 1} of {quizQuestions.length}
                </h2>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-display font-black text-amber-900 shadow-2xs shrink-0">
                <span>🔥 Streak:</span>
                <span>{player.streak}</span>
              </div>
            </div>

            {/* Zero-Repeat Progress Pill */}
            <div className="bg-stone-100 border border-stone-200 rounded-xl p-2 px-3 flex items-center justify-between text-xs text-stone-600">
              <span className="font-medium">
                🎯 Food & Movie Trivia ({quizStats.remainingCount} Unplayed Remaining)
              </span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Zero Repeats
              </span>
            </div>

            {/* Quiz Card or Finish View */}
            {!quizFinished ? (
              quizQuestions.length > 0 && (
                <div>
                  {!showLearningCard ? (
                    <QuestionCard
                      question={quizQuestions[currentQIndex]}
                      questionNumber={currentQIndex + 1}
                      totalQuestions={quizQuestions.length}
                      onAnswer={handleAnswerQuestion}
                    />
                  ) : (
                    <LearningCard
                      question={quizQuestions[currentQIndex]}
                      isCorrect={lastAnswer?.isCorrect || false}
                      userAnswer={lastAnswer?.option || ''}
                      earnedXp={lastAnswer?.isCorrect ? 150 : 0}
                      onNext={handleNextQuizQuestion}
                    />
                  )}
                </div>
              )
            ) : (
              /* Quiz Completed Celebration with Video and Mood Macaroni Award! */
              <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-6 text-center space-y-4 shadow-sm animate-scale-up">
                
                {/* 1. Level Completion Video Banner */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-rose-300 shadow-md bg-stone-900 group">
                  <video
                    ref={quizVideoRef}
                    src={heroBannerVideoSrc}
                    autoPlay
                    loop
                    playsInline
                    muted={quizVideoMuted}
                    className="w-full h-48 sm:h-64 object-cover object-center scale-102"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Celebratory Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-rose-600/90 text-white px-2.5 py-1 rounded-full text-[10px] font-display font-black tracking-wider uppercase backdrop-blur-xs shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300 animate-spin-slow" />
                    <span>LEVEL CLEARED • CELEBRATION</span>
                  </div>

                  {/* Video Play/Pause and Mute Controls */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      onClick={() => {
                        audioEngine.playSfx('click');
                        if (quizVideoRef.current) {
                          if (quizVideoPlaying) {
                            quizVideoRef.current.pause();
                          } else {
                            quizVideoRef.current.play();
                          }
                          setQuizVideoPlaying(!quizVideoPlaying);
                        }
                      }}
                      className="p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-xs"
                      title={quizVideoPlaying ? "Pause Video" : "Play Video"}
                    >
                      {quizVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => {
                        audioEngine.playSfx('click');
                        if (quizVideoRef.current) {
                          quizVideoRef.current.muted = !quizVideoMuted;
                          setQuizVideoMuted(!quizVideoMuted);
                        }
                      }}
                      className="p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-xs"
                      title={quizVideoMuted ? "Unmute Video Audio" : "Mute Video Audio"}
                    >
                      {quizVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-rose-300" />}
                    </button>
                  </div>

                  {/* Bottom Captions & Royal Title */}
                  <div className="absolute bottom-3 left-3 text-left max-w-[70%] z-10 pointer-events-none">
                    <div className="flex items-center gap-1">
                      <span className="font-display font-black text-xs sm:text-sm text-white drop-shadow-md">
                        👑 Queen of Factory of Fun
                      </span>
                    </div>
                    <p className="font-handwritten text-[11px] sm:text-xs text-rose-200 font-bold truncate drop-shadow-xs">
                      "Main apni favourite hoon! Savoring every sweet memory ♡"
                    </p>
                  </div>
                </div>

                {/* Score & Clear Badge */}
                <div className="space-y-1 pt-1">
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-xs font-display font-black text-amber-900 shadow-2xs">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    <span>#{currentMoodSetting.scaleNumber} {currentMoodSetting.emoji} {currentMoodSetting.label} CLEARED!</span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-stone-900">
                    +{roundScore} Macaronis Unlocked! 🧀
                  </h3>
                  <p className="font-handwritten text-xs sm:text-sm text-stone-600 font-bold">
                    Total Sandwiches Balance: {player.cucumberSandwiches} 🥪
                  </p>
                </div>

                {/* Unlocked Mood Macaroni Dish Card */}
                <div className="bg-gradient-to-r from-amber-50/90 via-pink-50 to-purple-50 border border-amber-200 rounded-2xl p-4 text-left space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentMacaroni.emoji}</span>
                      <div>
                        <span className="text-[10px] font-display font-black uppercase text-amber-700">
                          COMFORT MACARONI REWARD
                        </span>
                        <h4 className="font-display font-black text-sm text-stone-900">
                          {currentMacaroni.name}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-white/80 px-2 py-0.5 rounded-full border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-700" />
                      <span>{currentMacaroni.cookTime}</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-stone-700 leading-snug">
                    {currentMacaroni.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs pt-1 border-t border-amber-200/60">
                    <Film className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-display font-bold text-amber-950">Pairing:</span>
                    <span className="font-medium text-stone-600 truncate">{currentMacaroni.pairingMovie}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      audioEngine.playSfx('click');
                      handleStartMoodQuiz(activeMoodId);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:opacity-95"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Play Another Round</span>
                  </button>
                  <button
                    onClick={() => {
                      audioEngine.playSfx('click');
                      handleNavigate('home');
                    }}
                    className="flex-1 py-3 text-xs sm:text-sm font-black uppercase bg-white border border-stone-300 rounded-2xl hover:bg-stone-50 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-stone-800"
                  >
                    <span>Back to Home 🏠</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. BULLETIN CHAT & GROUP ROOM (Batch Updates Wall) */}
        {currentScreen === 'batch_wall' && (
          <BatchUpdatesWall onNavigate={handleNavigate} initialMode={wallInitialMode} />
        )}

      </main>

      {/* Floating Mini Music Player Bar (Active when browsing other screens) */}
      {currentScreen !== 'music' && currentScreen !== 'batch_wall' && (
        <FloatingMusicBar onOpenMusicScreen={() => handleNavigate('music')} />
      )}

      {/* Floating Bottom Navigation Dock (Home | Music | 1000+ Quiz | Chat & Wall) */}
      {currentScreen !== 'batch_wall' && (
        <BottomNavigationDock
          activeTab={activeNavTab}
          onTabSelect={handleBottomTabSelect}
        />
      )}

      {/* Clean Google Sign-In & Student Profile Modal */}
      {showGoogleSignIn && (
        <GoogleSignInModal onClose={() => setShowGoogleSignIn(false)} />
      )}

      {/* Install as App Modal (iPhone Safari & Android Chrome Guide) */}
      {showInstallApp && (
        <InstallAppModal onClose={() => setShowInstallApp(false)} />
      )}

      {/* Mood History & 14-Day Heatmap Modal */}
      {showMoodHistory && (
        <MoodHistoryModal onClose={() => setShowMoodHistory(false)} />
      )}

      {/* Comfort Shelf Bookmarks Modal */}
      {showComfortShelf && (
        <ComfortShelfModal onClose={() => setShowComfortShelf(false)} />
      )}
    </div>
  );
}

export default App;
