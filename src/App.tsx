import { useState } from 'react';
import type { ScreenState, Zone, Question, Recipe } from './types/game';
import { gameState } from './services/gameState';
import { adaptiveEngine } from './services/adaptiveEngine';
import { audioEngine } from './services/synthAudioEngine';
import { Navbar } from './components/Navbar';
import { OpeningCinematic } from './components/OpeningCinematic';
import { HomeScreen } from './components/HomeScreen';
import { GameMap } from './components/GameMap';
import { QuestionCard } from './components/QuestionCard';
import { MovieDetectiveCard } from './components/MovieDetectiveCard';
import { LearningCard } from './components/LearningCard';
import { DailyChallenge } from './components/DailyChallenge';
import { PlayerProfileCard } from './components/PlayerProfileCard';
import { Classroom } from './components/Classroom';
import { MoodSelectorModal } from './components/MoodSelectorModal';
import { RecipeModal } from './components/RecipeModal';
import { VaultHub } from './components/VaultHub';
import { BatchUpdatesWall } from './components/BatchUpdatesWall';
import { MusicJukeboxModal } from './components/MusicJukeboxModal';
import { ComfortCornerModal } from './components/ComfortCornerModal';
import { SecretLocketModal } from './components/SecretLocketModal';
import { CelebrationLocketModal } from './components/CelebrationLocketModal';
import { LevelClearHeroModal } from './components/LevelClearHeroModal';
import { InstallAppModal } from './components/InstallAppModal';
import { GlowUpWeekModal } from './components/GlowUpWeekModal';
import { GoogleSignInModal } from './components/GoogleSignInModal';
import { BottomNavigationDock, type MainNavTab } from './components/BottomNavigationDock';
import { FloatingVideoPlayer } from './components/FloatingVideoPlayer';
import { RECIPES } from './data/recipes';
import confetti from 'canvas-confetti';

export function App() {
  const [player, setPlayer] = useState(gameState.getPlayer());
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(() => {
    return player.onboardingCompleted ? 'home' : 'cinematic';
  });

  const [_activeZone, setActiveZone] = useState<Zone | null>(null);

  // Active Quiz Round State
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [roundSandwiches, setRoundSandwiches] = useState(0);
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{ option: string; isCorrect: boolean } | null>(null);
  const [playedIds, setPlayedIds] = useState<string[]>([]);

  // Foodie & Cinema State
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showMusicJukebox, setShowMusicJukebox] = useState(false);
  const [showComfortCorner, setShowComfortCorner] = useState(false);
  const [showSecretLocket, setShowSecretLocket] = useState(false);
  const [showLevelClearHero, setShowLevelClearHero] = useState(false);
  const [showCelebrationLocket, setShowCelebrationLocket] = useState(false);
  const [showGlowUpWeek, setShowGlowUpWeek] = useState(false);
  const [showInstallApp, setShowInstallApp] = useState(false);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);

  const [selectedHindiSongId, setSelectedHindiSongId] = useState<string | undefined>(undefined);
  const [activeTargetRecipe, setActiveTargetRecipe] = useState<Recipe>(RECIPES[0]);
  const [endlessRoundCount, setEndlessRoundCount] = useState(0);
  const [titleUpgraded, setTitleUpgraded] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('home');

  // Screen navigation (no intrusive auto background music)
  const handleNavigate = (screen: ScreenState) => {
    setCurrentScreen(screen);
    setPlayer(gameState.getPlayer());
    if (screen === 'home') setActiveNavTab('home');
    else if (screen === 'batch_wall') setActiveNavTab('wall');
    else if (screen === 'quiz') setActiveNavTab('play');
    else if (screen === 'vault' || screen === 'recipes' || screen === 'stickers' || screen === 'passport') setActiveNavTab('vault');
    else if (screen === 'profile') setActiveNavTab('profile');
  };

  // Launch Mood-first Quiz Flow
  const handleStartCulinaryTrivia = () => {
    setShowMoodModal(true);
  };

  const handleConfirmMood = (selectedMood: string) => {
    gameState.setActiveSticker(selectedMood);
    setShowMoodModal(false);

    // Generate endless course tailored to this mood
    const { questions, targetRecipe } = gameState.getEndlessCourse(selectedMood, endlessRoundCount);
    setActiveTargetRecipe(targetRecipe);
    setQuizQuestions(questions);
    setCurrentQIndex(0);
    setRoundSandwiches(0);
    setShowLearningCard(false);
    gameState.clearCollectedIngredients();
    setPlayer(gameState.getPlayer());

    setCurrentScreen('quiz');
    setActiveNavTab('play');
  };

  const startZoneQuiz = (zone: Zone) => {
    setActiveZone(zone);

    const selected = adaptiveEngine.selectQuestions(zone.category, 5, playedIds);
    setQuizQuestions(selected);
    setCurrentQIndex(0);
    setRoundSandwiches(0);
    setShowLearningCard(false);
    setCurrentScreen('quiz');
    setActiveNavTab('play');
    audioEngine.startMusic('quiz');
  };

  const startCookingRecipeDirect = (recipe: Recipe) => {
    setActiveTargetRecipe(recipe);
    const { questions } = gameState.getEndlessCourse(recipe.moodMatch, endlessRoundCount);
    setQuizQuestions(questions);
    setCurrentQIndex(0);
    setRoundSandwiches(0);
    setShowLearningCard(false);
    gameState.clearCollectedIngredients();
    setPlayer(gameState.getPlayer());
    setCurrentScreen('quiz');
    setActiveNavTab('play');
    audioEngine.startMusic('quiz');
  };

  const handleAnswerQuestion = (selectedOption: string, timeTakenMs: number) => {
    const currentQ = quizQuestions[currentQIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    const earnedSandwiches = isCorrect ? 3 : 0;

    adaptiveEngine.recordAnswer(currentQ, isCorrect, timeTakenMs);
    gameState.recordQuestionAnswered(isCorrect);

    if (isCorrect) {
      gameState.incrementStreak();
      const res = gameState.addCucumberSandwiches(earnedSandwiches);
      if (res.titleUpgraded) setTitleUpgraded(true);
      setRoundSandwiches(prev => prev + earnedSandwiches);

      if (currentQ.secretIngredient) {
        gameState.addCollectedIngredient(currentQ.secretIngredient);
      }
    } else {
      gameState.resetStreak();
    }

    setLastAnswer({ option: selectedOption, isCorrect });
    setPlayedIds(prev => [...prev, currentQ.id]);
    setShowLearningCard(true);
    setPlayer(gameState.getPlayer());
  };

  const handleNextQuizQuestion = () => {
    setShowLearningCard(false);
    setLastAnswer(null);

    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.55 } });
      
      const completionBonus = 5;
      gameState.addCucumberSandwiches(completionBonus);
      setRoundSandwiches(prev => prev + completionBonus);
      gameState.unlockRecipe(activeTargetRecipe.id);
      
      setPlayer(gameState.getPlayer());
      // Trigger Hero Banner Video level clear celebration!
      setShowLevelClearHero(true);
    }
  };

  const handleStartNextCourse = () => {
    setShowRecipeModal(false);
    setTitleUpgraded(false);
    const nextCount = endlessRoundCount + 1;
    setEndlessRoundCount(nextCount);

    const activeSticker = gameState.getActiveSticker();
    const { questions, targetRecipe } = gameState.getEndlessCourse(activeSticker, nextCount);
    setActiveTargetRecipe(targetRecipe);
    setQuizQuestions(questions);
    setCurrentQIndex(0);
    setRoundSandwiches(0);
    setShowLearningCard(false);
    gameState.clearCollectedIngredients();
    setPlayer(gameState.getPlayer());

    setCurrentScreen('quiz');
  };

  const handleBottomTabSelect = (tab: MainNavTab) => {
    setActiveNavTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'wall') {
      setCurrentScreen('batch_wall');
    } else if (tab === 'play') {
      handleStartCulinaryTrivia();
    } else if (tab === 'comfort') {
      setShowComfortCorner(true);
    } else if (tab === 'vault') {
      setCurrentScreen('vault');
    } else if (tab === 'profile') {
      setCurrentScreen('profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans text-ink selection:bg-pink-200">
      
      {/* Show Header Navbar on all screens except cinematic intro */}
      {currentScreen !== 'cinematic' && (
        <Navbar 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          onOpenInstallApp={() => setShowInstallApp(true)}
          onOpenGoogleSignIn={() => setShowGoogleSignIn(true)}
        />
      )}

      {/* Main Screen Container */}
      <main className="animate-fade-in pb-16">
        {currentScreen === 'cinematic' && (
          <OpeningCinematic onComplete={() => handleNavigate('home')} />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onQuickPlay={handleStartCulinaryTrivia}
            onOpenMusic={() => setShowMusicJukebox(true)}
            onOpenComfortCorner={() => setShowComfortCorner(true)}
            onOpenSecretLocket={() => setShowSecretLocket(true)}
            onOpenGlowUpWeek={() => setShowGlowUpWeek(true)}
            onOpenInstallApp={() => setShowInstallApp(true)}
            onOpenGoogleSignIn={() => setShowGoogleSignIn(true)}
          />
        )}

        {currentScreen === 'map' && (
          <GameMap onSelectZone={startZoneQuiz} />
        )}

        {currentScreen === 'quiz' && quizQuestions.length > 0 && (
          <div className="p-4 sm:p-6 pb-24">
            {!showLearningCard ? (
              quizQuestions[currentQIndex]?.type === 'movie_detective' ? (
                <MovieDetectiveCard
                  question={quizQuestions[currentQIndex]}
                  questionNumber={currentQIndex + 1}
                  totalQuestions={quizQuestions.length}
                  onAnswer={handleAnswerQuestion}
                />
              ) : (
                <QuestionCard
                  question={quizQuestions[currentQIndex]}
                  questionNumber={currentQIndex + 1}
                  totalQuestions={quizQuestions.length}
                  onAnswer={handleAnswerQuestion}
                />
              )
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
        )}


        {currentScreen === 'daily' && (
          <DailyChallenge onComplete={() => {
            setShowLevelClearHero(true);
            handleNavigate('home');
          }} />
        )}

        {currentScreen === 'profile' && (
          <PlayerProfileCard
            onNavigate={handleNavigate}
            onOpenSecretLocket={() => setShowSecretLocket(true)}
            onOpenGlowUpWeek={() => setShowGlowUpWeek(true)}
            onOpenMusicJukebox={() => setShowMusicJukebox(true)}
            onOpenInstallApp={() => setShowInstallApp(true)}
          />
        )}

        {currentScreen === 'classroom' && (
          <Classroom 
            mode="student" 
            onStartQuiz={handleStartCulinaryTrivia} 
            onNavigateHome={() => handleNavigate('home')} 
          />
        )}

        {currentScreen === 'teacher_custom' && (
          <Classroom 
            mode="teacher" 
            onStartQuiz={handleStartCulinaryTrivia} 
            onNavigateHome={() => handleNavigate('home')} 
          />
        )}

        {currentScreen === 'secret_classroom' && (
          <Classroom 
            mode="secret" 
            onStartQuiz={handleStartCulinaryTrivia} 
            onNavigateHome={() => handleNavigate('home')} 
          />
        )}

        {currentScreen === 'vault' && (
          <VaultHub
            onNavigate={handleNavigate}
            onCookRecipe={startCookingRecipeDirect}
            onSelectMood={(_alias) => setPlayer(gameState.getPlayer())}
          />
        )}

        {currentScreen === 'recipes' && (
          <VaultHub
            initialTab="recipes"
            onNavigate={handleNavigate}
            onCookRecipe={startCookingRecipeDirect}
            onSelectMood={(_alias) => setPlayer(gameState.getPlayer())}
          />
        )}

        {currentScreen === 'stickers' && (
          <VaultHub
            initialTab="stickers"
            onNavigate={handleNavigate}
            onCookRecipe={startCookingRecipeDirect}
            onSelectMood={(_alias) => setPlayer(gameState.getPlayer())}
          />
        )}

        {currentScreen === 'passport' && (
          <VaultHub
            initialTab="passport"
            onNavigate={handleNavigate}
            onCookRecipe={startCookingRecipeDirect}
            onSelectMood={(_alias) => setPlayer(gameState.getPlayer())}
          />
        )}

        {currentScreen === 'batch_wall' && (
          <BatchUpdatesWall
            onNavigate={handleNavigate}
          />
        )}

        {/* Pre-Quiz Mood Selector Modal */}
        {showMoodModal && (
          <MoodSelectorModal
            currentMood={gameState.getActiveSticker()}
            onSelectMood={handleConfirmMood}
            onClose={() => setShowMoodModal(false)}
            onOpenComfortCorner={() => setShowComfortCorner(true)}
          />
        )}

        {/* Music Jukebox / Lounge Modal */}
        {showMusicJukebox && (
          <MusicJukeboxModal
            initialSongId={selectedHindiSongId}
            onClose={() => {
              setShowMusicJukebox(false);
              setSelectedHindiSongId(undefined);
            }}
          />
        )}

        {/* Girl's Perspective Comfort & Mood SOS Modal */}
        {showComfortCorner && (
          <ComfortCornerModal
            onClose={() => {
              setShowComfortCorner(false);
              setPlayer(gameState.getPlayer());
            }}
            onOpenMusic={() => {
              setShowComfortCorner(false);
              setSelectedHindiSongId(undefined);
              setShowMusicJukebox(true);
            }}
            onOpenHindiSong={(songId) => {
              setShowComfortCorner(false);
              setSelectedHindiSongId(songId);
              setShowMusicJukebox(true);
            }}
          />
        )}

        {/* Secret Locket Modal */}
        {showSecretLocket && (
          <SecretLocketModal onClose={() => setShowSecretLocket(false)} />
        )}

        {/* Install / Download App Modal (Android & iOS) */}
        {showInstallApp && (
          <InstallAppModal onClose={() => setShowInstallApp(false)} />
        )}

        {/* Level Cleared Hero Banner Video Celebration Modal */}
        {showLevelClearHero && (
          <LevelClearHeroModal
            earnedSandwiches={roundSandwiches || 5}
            onClose={() => {
              setShowLevelClearHero(false);
              setShowRecipeModal(true);
            }}
          />
        )}

        {/* Milestone / Level Celebration Locket Animation */}
        {showCelebrationLocket && (
          <CelebrationLocketModal
            onClose={() => {
              setShowCelebrationLocket(false);
              setShowRecipeModal(true);
            }}
          />
        )}

        {/* Glow-Up Week Polaroid Scrapbook Modal */}
        {showGlowUpWeek && (
          <GlowUpWeekModal onClose={() => setShowGlowUpWeek(false)} />
        )}

        {/* Google Sign In & Student Presence Modal */}
        {showGoogleSignIn && (
          <GoogleSignInModal onClose={() => setShowGoogleSignIn(false)} />
        )}

        {/* Level Complete Secret Recipe Reveal Modal */}
        {showRecipeModal && (
          <RecipeModal
            recipe={activeTargetRecipe}
            earnedSandwiches={roundSandwiches}
            chefTitle={player.chefTitle || 'Apprentice Chopper 🥒'}
            titleUpgraded={titleUpgraded}
            collectedIngredients={gameState.getCollectedIngredients()}
            activeMood={gameState.getActiveSticker()}
            onNextCourse={handleStartNextCourse}
            onViewVault={() => {
              setShowRecipeModal(false);
              handleNavigate('recipes');
            }}
            onGoHome={() => {
              setShowRecipeModal(false);
              handleNavigate('home');
            }}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Dock */}
      {currentScreen !== 'cinematic' && (
        <BottomNavigationDock
          activeTab={activeNavTab}
          onTabSelect={handleBottomTabSelect}
        />
      )}

      {/* Background / Minimized Floating Video Player (Picture-in-Picture) */}
      <FloatingVideoPlayer />
    </div>
  );
}
export default App;
