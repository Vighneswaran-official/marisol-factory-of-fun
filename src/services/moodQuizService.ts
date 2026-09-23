import { QUESTIONS_DATABASE } from '../data/questions';
import { MOOD_MACARONIS, type MacaroniDish } from '../data/macaroniRecipes';
import { questionRotationTracker } from './moodRotationService';
import type { Question, Category } from '../types/game';

export interface MoodProfileSetting {
  id: string;
  scaleNumber: number; // 1 to 9
  label: string;
  emoji: string;
  stickerQuote: string;
  vibe: string;
  dialogue: string;
  themeColor: string;
  targetCategories: Category[];
}

export const KRITIKA_STICKER_MOODS: MoodProfileSetting[] = [
  {
    id: 'happy',
    scaleNumber: 1,
    label: 'Radiant Sunshine',
    emoji: '🌸',
    stickerQuote: 'Same Girl Brighter Ideas <3',
    vibe: 'Joyful, optimistic',
    dialogue: 'Your smile brings the brightest sunshine to Batch 41! Keep shining, queen! ✨💖',
    themeColor: '#EC4899',
    targetCategories: ['Bollywood', 'Music', 'Pop Culture', 'Movies']
  },
  {
    id: 'cozy',
    scaleNumber: 2,
    label: 'Chai Enthusiast',
    emoji: '☕',
    stickerQuote: 'Chai = Happiness <3',
    vibe: 'Cozy, rainy afternoon',
    dialogue: 'Hot cup of ginger chai & zero stress on our agenda today, queen! ☕☁️',
    themeColor: '#F59E0B',
    targetCategories: ['Bollywood', 'Movies', 'Music']
  },
  {
    id: 'tired',
    scaleNumber: 3,
    label: 'Sleepy Panda',
    emoji: '💤',
    stickerQuote: '5 more minutes please...',
    vibe: 'Low battery, blanket cocoon',
    dialogue: 'You worked so hard today, Kritika. Let’s wrap in a warm blanket and recharge. 🌙💤',
    themeColor: '#8B5CF6',
    targetCategories: ['Music', 'Movies', 'Weird Facts', 'Space']
  },
  {
    id: 'stressed',
    scaleNumber: 4,
    label: 'Brain Overload',
    emoji: '🥺',
    stickerQuote: 'Oh God, My Mind!',
    vibe: 'Overthinking, deadline panic',
    dialogue: 'Deep breath, darling. Drop your shoulders, sip some chai. You are doing amazing! 🌸💆‍♀️',
    themeColor: '#3B82F6',
    targetCategories: ['Bollywood', 'Pop Culture', 'Movies']
  },
  {
    id: 'foodie',
    scaleNumber: 5,
    label: 'Foodie Monster',
    emoji: '🍕',
    stickerQuote: 'Pizza Fixes (Almost) Everything',
    vibe: 'Cravings, cheat day',
    dialogue: 'Good food is the ultimate remedy! Let\'s cook up some bubbling cheesy goodness! 🍕🧀',
    themeColor: '#EF4444',
    targetCategories: ['Movies', 'Weird Facts', 'Pop Culture', 'Bollywood']
  },
  {
    id: 'corporate',
    scaleNumber: 6,
    label: 'Corporate Queen',
    emoji: '💼',
    stickerQuote: 'Fueling Big Dreams',
    vibe: 'Ambitious, productive',
    dialogue: 'Look at you conquering the corporate world! Slay those meetings, queen! ⚡👑',
    themeColor: '#0EA5E9',
    targetCategories: ['Technology', 'Science', 'Pop Culture', 'Movies']
  },
  {
    id: 'silly',
    scaleNumber: 7,
    label: 'Silly Chaos',
    emoji: '🤪',
    stickerQuote: 'Silly Is A Vibe',
    vibe: 'Quirky, playful',
    dialogue: 'Main apni favourite hoon! Keep laughing and being your iconic quirky self! 🎀🌈',
    themeColor: '#10B981',
    targetCategories: ['Weird Facts', 'Pop Culture', 'Bollywood', 'Movies']
  },
  {
    id: 'soft',
    scaleNumber: 8,
    label: 'Wholesome Soft',
    emoji: '🐶',
    stickerQuote: 'Doggo Therapy <3',
    vibe: 'Needing hugs, gentle warmth',
    dialogue: 'Sending you gentle puppy cuddles and the warmest fuzzy sisterly hug! 🐶🧸',
    themeColor: '#FBBF24',
    targetCategories: ['Movies', 'Music', 'Weird Facts', 'Pop Culture']
  },
  {
    id: 'queen',
    scaleNumber: 9,
    label: 'Main Character',
    emoji: '👑',
    stickerQuote: 'Main apni favourite hoon!',
    vibe: 'Unstoppable confidence',
    dialogue: 'Step into your royal power! The world is your catwalk and you are the queen! 👑✨',
    themeColor: '#D946EF',
    targetCategories: ['Bollywood', 'Music', 'Pop Culture', 'Movies']
  }
];

export const getMoodMacaroni = (moodId: string): MacaroniDish => {
  return MOOD_MACARONIS[moodId] || MOOD_MACARONIS['happy'];
};

/**
 * Draw unrepeated questions using non-repeating shuffle tracker
 */
export const getQuestionsForMood = (moodId: string, count: number = 5, playedIds: string[] = []): Question[] => {
  const setting = KRITIKA_STICKER_MOODS.find(m => m.id === moodId) || KRITIKA_STICKER_MOODS[0];
  
  // Filter questions matching the mood's target categories
  let pool = QUESTIONS_DATABASE.filter(q => 
    !playedIds.includes(q.id) && setting.targetCategories.includes(q.category)
  );

  // If pool is too small, include any unplayed questions
  if (pool.length < count) {
    const remaining = QUESTIONS_DATABASE.filter(q => !playedIds.includes(q.id));
    pool = [...pool, ...remaining];
  }

  // If still too small, draw from all questions
  if (pool.length < count) {
    pool = [...QUESTIONS_DATABASE];
  }

  // Use MoodRotationTracker to select questions without immediate repeats
  const selected: Question[] = [];
  const tempPool = [...pool];

  while (selected.length < count && tempPool.length > 0) {
    const q = questionRotationTracker.getNextRecommendation(tempPool);
    selected.push(q);
    const idx = tempPool.findIndex(item => item.id === q.id);
    if (idx >= 0) tempPool.splice(idx, 1);
  }

  return selected;
};
