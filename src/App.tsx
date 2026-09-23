import { useState } from 'react';
import type { ScreenState, Question } from './types/game';
import { gameState } from './services/gameState';
import { audioEngine } from './services/synthAudioEngine';
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
import { BottomNavigationDock, type MainNavTab } from './components/BottomNavigationDock';
import { 
  getQuestionsForMood, 
  getMoodMacaroni, 
  KRITIKA_STICKER_MOODS,
  type MoodProfileSetting 
} from './services/moodQuizService';
import { nonRepeatingQuizEngine } from './data/foodMovieQuestions1000';
import { ArrowLeft, RefreshCw, Trophy, Clock, Film } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [player, setPlayer] = useState(gameState.getPlayer());
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('home');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [showMoodHistory, setShowMoodHistory] = useState(false);
  const [showComfortShelf, setShowComfortShelf] = useState(false);

  // Active Mood State
  const [activeMoodId, setActiveMoodId] = useState<string>('happy');

  // Active Quiz Round State
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{ option: string; isCorrect: boolean } | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Active Mood Details
  const currentMoodSetting: MoodProfileSetting = 
    KRITIKA_STICKER_MOODS.find(m => m.id === activeMoodId) || KRITIKA_STICKER_MOODS[0];
  const currentMacaroni = getMoodMacaroni(activeMoodId);

  // Screen navigation handler
  const handleNavigate = (screen: ScreenState) => {
    setCurrentScreen(screen);
    setPlayer(gameState.getPlayer());
    if (screen === 'home') {
      setActiveNavTab('home');
      setQuizFinished(false);
    } else if (screen === 'music') {
      setActiveNavTab('music');
    } else if (screen === 'batch_wall') {
      setActiveNavTab('wall');
      setQuizFinished(false);
    } else if (screen === 'quiz') {
      setActiveNavTab('quiz');
    }
  };

  // Bottom Navigation tab click handler
  const handleBottomTabSelect = (tab: MainNavTab) => {
    setActiveNavTab(tab);
    if (tab === 'home') {
      handleNavigate('home');
    } else if (tab === 'music') {
      handleNavigate('music');
    } else if (tab === 'quiz') {
      handleStartMoodQuiz(activeMoodId);
    } else if (tab === 'wall') {
      handleNavigate('batch_wall');
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
    setCurrentScreen('quiz');
    setActiveNavTab('quiz');
    audioEngine.startMusic('quiz');
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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans antialiased selection:bg-pink-200">
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenGoogleSignIn={() => setShowGoogleSignIn(true)}
      />

      {/* Main Content Area */}
      <main className="animate-fade-in pb-20">
        
        {/* 1. HOME SCREEN: Hero Video, 1-9 Mood Selector & Macaroni Preview */}
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onStartMoodQuiz={handleStartMoodQuiz}
            onOpenGoogleSignIn={() => setShowGoogleSignIn(true)}
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
              <button
                onClick={() => handleNavigate('home')}
                className="py-1.5 px-3 bg-white border border-stone-200 rounded-xl flex items-center gap-1.5 shadow-xs text-xs font-display font-bold hover:bg-stone-50 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>HOME</span>
              </button>

              <div className="text-center">
                <span className="font-display font-black text-xs uppercase text-rose-600 tracking-wider">
                  #{currentMoodSetting.scaleNumber} {currentMoodSetting.emoji} Food & Movie Quiz
                </span>
                <h2 className="font-display font-black text-lg text-stone-900">
                  Question {currentQIndex + 1} of {quizQuestions.length}
                </h2>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-display font-black text-amber-900 shadow-2xs">
                <span>🔥 Streak:</span>
                <span>{player.streak}</span>
              </div>
            </div>

            {/* Zero-Repeat Progress Pill */}
            <div className="bg-stone-100 border border-stone-200 rounded-xl p-2 px-3 flex items-center justify-between text-xs text-stone-600">
              <span className="font-medium">
                🎯 1000+ Questions Library ({quizStats.remainingCount} Unplayed Remaining)
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
              /* Quiz Completed Celebration with Mood Macaroni Award! */
              <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 text-center space-y-4 shadow-sm animate-scale-up">
                <div className="w-16 h-16 mx-auto bg-amber-100 border border-amber-300 rounded-2xl flex items-center justify-center text-3xl shadow-xs">
                  <Trophy className="w-8 h-8 text-amber-600" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-display font-black uppercase text-rose-600 tracking-wider">
                    #{currentMoodSetting.scaleNumber} {currentMoodSetting.emoji} {currentMoodSetting.label} QUIZ CLEARED!
                  </span>
                  <h3 className="font-display font-black text-2xl text-stone-900">
                    You Earned {roundScore} Macaronis! 🧀
                  </h3>
                  <p className="font-handwritten text-sm text-stone-600 font-bold">
                    Total Comfort Sandwiches: {player.cucumberSandwiches} 🥪
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

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    onClick={() => handleStartMoodQuiz(activeMoodId)}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:opacity-95"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Play Another Round</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="flex-1 py-3 text-xs sm:text-sm font-black uppercase bg-white border border-stone-300 rounded-2xl hover:bg-stone-50 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-stone-800"
                  >
                    <span>Back to Home & Video 🏠</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. BULLETIN CHAT & GROUP ROOM (Batch Updates Wall) */}
        {currentScreen === 'batch_wall' && (
          <BatchUpdatesWall onNavigate={handleNavigate} />
        )}

      </main>

      {/* Floating Mini Music Player Bar (Active when browsing other screens) */}
      {currentScreen !== 'music' && (
        <FloatingMusicBar onOpenMusicScreen={() => handleNavigate('music')} />
      )}

      {/* Floating Bottom Navigation Dock (Home | Music | 1000+ Quiz | Chat & Wall) */}
      <BottomNavigationDock
        activeTab={activeNavTab}
        onTabSelect={handleBottomTabSelect}
      />

      {/* Clean Google Sign-In & Student Profile Modal */}
      {showGoogleSignIn && (
        <GoogleSignInModal onClose={() => setShowGoogleSignIn(false)} />
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
