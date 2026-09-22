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
import { BossRound } from './components/BossRound';
import { KnowledgePassport } from './components/KnowledgePassport';
import { DailyChallenge } from './components/DailyChallenge';
import { PlayerProfileCard } from './components/PlayerProfileCard';
import { ClassroomMode } from './components/ClassroomMode';
import { TeacherMode } from './components/TeacherMode';
import { SecretClassroom } from './components/SecretClassroom';
import { StickerCollection } from './components/StickerCollection';
import { MoodSelectorModal } from './components/MoodSelectorModal';
import { RecipeModal } from './components/RecipeModal';
import { RecipeVault } from './components/RecipeVault';
import { MusicJukeboxModal } from './components/MusicJukeboxModal';
import { ComfortCornerModal } from './components/ComfortCornerModal';
import { SecretLocketModal } from './components/SecretLocketModal';
import { CelebrationLocketModal } from './components/CelebrationLocketModal';
import { GlowUpWeekModal } from './components/GlowUpWeekModal';
import { CozyModeOverlay } from './components/CozyModeOverlay';
import { CartoonTalkiesModal } from './components/CartoonTalkiesModal';
import { BottomNavigationDock, type MainNavTab } from './components/BottomNavigationDock';
import { RECIPES } from './data/recipes';
import confetti from 'canvas-confetti';

export function App() {
  const [player, setPlayer] = useState(gameState.getPlayer());
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(() => {
    return player.onboardingCompleted ? 'home' : 'cinematic';
  });

  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [_isBossMode, setIsBossMode] = useState(false);

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
  const [showCelebrationLocket, setShowCelebrationLocket] = useState(false);
  const [showGlowUpWeek, setShowGlowUpWeek] = useState(false);
  const [showCozyMode, setShowCozyMode] = useState(false);
  const [showCartoonTalkies, setShowCartoonTalkies] = useState(false);
  const [cartoonTalkiesMode, setCartoonTalkiesMode] = useState<'video' | 'magazine'>('video');

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
    if (screen === 'quiz') setActiveNavTab('quiz');
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
    setActiveNavTab('quiz');
  };

  const startZoneQuiz = (zone: Zone, isBoss: boolean) => {
    setActiveZone(zone);
    setIsBossMode(isBoss);

    if (isBoss) {
      setCurrentScreen('boss');
      return;
    }

    const selected = adaptiveEngine.selectQuestions(zone.category, 5, playedIds);
    setQuizQuestions(selected);
    setCurrentQIndex(0);
    setRoundSandwiches(0);
    setShowLearningCard(false);
    setCurrentScreen('quiz');
    setActiveNavTab('quiz');
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
    setActiveNavTab('quiz');
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
      // Trigger Celebration Locket first!
      setShowCelebrationLocket(true);
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
    } else if (tab === 'anime') {
      setShowCartoonTalkies(true);
    } else if (tab === 'lounge') {
      setShowMusicJukebox(true);
    } else if (tab === 'quiz') {
      handleStartCulinaryTrivia();
    } else if (tab === 'locket') {
      setShowSecretLocket(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans text-ink selection:bg-pink-200">
      
      {/* Show Header Navbar on all screens except cinematic intro */}
      {currentScreen !== 'cinematic' && (
        <Navbar currentScreen={currentScreen} onNavigate={handleNavigate} />
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
            onOpenCozyMode={() => setShowCozyMode(true)}
            onOpenCartoonTalkies={(mode = 'video') => {
              setCartoonTalkiesMode(mode);
              setShowCartoonTalkies(true);
            }}
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

        {currentScreen === 'boss' && activeZone && (
          <BossRound
            zone={activeZone}
            onComplete={() => handleNavigate('map')}
          />
        )}

        {currentScreen === 'passport' && (
          <KnowledgePassport />
        )}

        {currentScreen === 'daily' && (
          <DailyChallenge onComplete={() => handleNavigate('home')} />
        )}

        {currentScreen === 'profile' && (
          <PlayerProfileCard />
        )}

        {currentScreen === 'classroom' && (
          <ClassroomMode onStartQuiz={handleStartCulinaryTrivia} />
        )}

        {currentScreen === 'teacher_custom' && (
          <TeacherMode onSave={() => handleNavigate('home')} />
        )}

        {currentScreen === 'secret_classroom' && (
          <SecretClassroom onBackToHome={() => handleNavigate('home')} />
        )}

        {currentScreen === 'stickers' && (
          <StickerCollection
            onNavigate={handleNavigate}
            onSelectMood={(_alias) => setPlayer(gameState.getPlayer())}
          />
        )}

        {currentScreen === 'recipes' && (
          <RecipeVault
            onNavigate={handleNavigate}
            onCookRecipe={startCookingRecipeDirect}
          />
        )}

        {/* Cartoon Talkies Speaking Video Studio & Magazine Modal */}
        <CartoonTalkiesModal
          isOpen={showCartoonTalkies}
          initialMode={cartoonTalkiesMode}
          onClose={() => setShowCartoonTalkies(false)}
        />

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

        {/* Cozy Mode Blanket Wrap Overlay */}
        {showCozyMode && (
          <CozyModeOverlay
            onClose={() => setShowCozyMode(false)}
            onOpenMusic={() => setShowMusicJukebox(true)}
          />
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
    </div>
  );
}
export default App;
