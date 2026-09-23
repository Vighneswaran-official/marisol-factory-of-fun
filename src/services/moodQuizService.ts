import { QUESTIONS_DATABASE } from '../data/questions';
import { MOOD_MACARONIS, type MacaroniDish } from '../data/macaroniRecipes';
import type { Question, Category } from '../types/game';

export interface MoodProfileSetting {
  id: string;
  label: string;
  emoji: string;
  stickerQuote: string;
  dialogue: string;
  themeColor: string;
  targetCategories: Category[];
}

export const KRITIKA_STICKER_MOODS: MoodProfileSetting[] = [
  {
    id: 'happy',
    label: 'Radiant Sunshine',
    emoji: '🌸',
    stickerQuote: 'Same Girl Brighter Ideas <3',
    dialogue: 'Your smile brings the brightest sunshine to Batch 41! Keep shining, queen! ✨💖',
    themeColor: '#EC4899',
    targetCategories: ['Bollywood', 'Music', 'Pop Culture', 'Movies']
  },
  {
    id: 'cozy',
    label: 'Chai = Happiness',
    emoji: '☕',
    stickerQuote: 'Chai = Happiness <3',
    dialogue: 'Hot cup of ginger chai & zero stress on our agenda today, queen! ☕☁️',
    themeColor: '#F59E0B',
    targetCategories: ['Bollywood', 'Movies', 'Music']
  },
  {
    id: 'tired',
    label: '5 More Minutes...',
    emoji: '💤',
    stickerQuote: 'z z z 5 more minutes please...',
    dialogue: 'You worked so hard today, Kritika. Let’s wrap in a warm blanket and recharge. 🌙💤',
    themeColor: '#8B5CF6',
    targetCategories: ['Music', 'Movies', 'Weird Facts', 'Space']
  },
  {
    id: 'stressed',
    label: 'Oh God, My Mind!',
    emoji: '🥺',
    stickerQuote: 'Oh God, My Mind! / Overthinking but making progress <3',
    dialogue: 'Deep breath, darling. Drop your shoulders, sip some chai. You are doing amazing! 🌸💆‍♀️',
    themeColor: '#3B82F6',
    targetCategories: ['Bollywood', 'Pop Culture', 'Movies']
  },
  {
    id: 'foodie',
    label: 'Pizza Fixes Everything',
    emoji: '🍕',
    stickerQuote: 'Pizza Fixes (Almost) Everything',
    dialogue: 'Good food is the ultimate remedy! Let\'s cook up some cheesy goodness! 🍕🧀',
    themeColor: '#EF4444',
    targetCategories: ['Movies', 'Weird Facts', 'Pop Culture', 'Bollywood']
  },
  {
    id: 'corporate',
    label: 'Corporate Queen',
    emoji: '💼',
    stickerQuote: 'Corporate Queen / Fueling Big Dreams',
    dialogue: 'Look at you conquering the world! Time to test your sharp intellect! ⚡👑',
    themeColor: '#0EA5E9',
    targetCategories: ['Technology', 'Science', 'Pop Culture', 'Movies']
  },
  {
    id: 'silly',
    label: 'Silly Is A Vibe',
    emoji: '🤪',
    stickerQuote: 'Silly Is A Vibe / I understand nothing but I\'ll figure it out <3',
    dialogue: 'Main apni favourite hoon! Keep laughing and being your quirky iconic self! 🎀🌈',
    themeColor: '#10B981',
    targetCategories: ['Weird Facts', 'Pop Culture', 'Bollywood', 'Movies']
  }
];

export const getMoodMacaroni = (moodId: string): MacaroniDish => {
  return MOOD_MACARONIS[moodId] || MOOD_MACARONIS['happy'];
};

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

  // Shuffle pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
