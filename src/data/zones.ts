import type { Zone } from '../types/game';

export const GAME_ZONES: Zone[] = [
  {
    id: 'zone_1',
    name: 'CINEMA STREET',
    subtitle: 'Where iconic movies come alive!',
    category: 'Movies',
    iconName: 'Film',
    description: 'Walk down the golden street of movie magic! Test your knowledge on plot twists, directors, and cinematic classics.',
    totalLevels: 5,
    requiredXp: 0, // Unlocked by default
    marisolComment: 'Welcome to Cinema Street! Grab your popcorn and let’s see if your movie radar is working! 🍿',
    bossName: 'THE FINAL CUT'
  },
  {
    id: 'zone_2',
    name: 'SHOWTOWN',
    subtitle: 'Home of binge-worthy series',
    category: 'TV Shows',
    iconName: 'Tv',
    description: 'Explore the world of legendary television, comedy sitcoms, streaming sensations, and cliffhangers!',
    totalLevels: 5,
    requiredXp: 300,
    marisolComment: 'Showtown has all our favorite TV characters! Don’t miss a single detail. 📺',
    bossName: 'THE BINGE MASTER'
  },
  {
    id: 'zone_3',
    name: 'BOLLYWOOD BOULEVARD',
    subtitle: 'Desi drama, dance, and blockbusters!',
    category: 'Bollywood',
    iconName: 'Sparkles',
    description: 'Immerse yourself in Indian cinema legends, SRK romances, AR Rahman melodies, and iconic dialogues!',
    totalLevels: 5,
    requiredXp: 600,
    marisolComment: 'Wah! Bollywood Boulevard is full of magic, music, and epic drama! Ready? 💃',
    bossName: 'BOLLYWOOD SHAAN'
  },
  {
    id: 'zone_4',
    name: 'HOLLYWOOD HILLS',
    subtitle: 'Star-studded cinema royalty',
    category: 'Hollywood',
    iconName: 'Clapperboard',
    description: 'Challenge yourself with Oscar winners, Hollywood legends, box office records, and blockbuster sagas.',
    totalLevels: 5,
    requiredXp: 1000,
    marisolComment: 'The stars are shining bright in Hollywood Hills! Time to flex that film brain. 🌟',
    bossName: 'OSCAR GAUNTLET'
  },
  {
    id: 'zone_5',
    name: 'WEIRD FACT LAB',
    subtitle: 'Curiosities that blow your mind!',
    category: 'Weird Facts',
    iconName: 'HelpCircle',
    description: 'Uncover bizarre truths, strange nature phenomena, quirky trivia, and mind-boggling curiosities.',
    totalLevels: 5,
    requiredXp: 1400,
    marisolComment: 'Warning: The Weird Fact Lab contains facts so strange you’ll say "Wait... WHAT?!" 🤯',
    bossName: 'THE ANOMALY'
  },
  {
    id: 'zone_6',
    name: 'COSMIC CORNER',
    subtitle: 'Journey through stars & space',
    category: 'Space',
    iconName: 'Rocket',
    description: 'Travel through galaxies, planets, astronaut history, space telescopes, and cosmic wonders.',
    totalLevels: 5,
    requiredXp: 1800,
    marisolComment: '3... 2... 1... Blastoff! Curiosity looks great on you in deep space! 🚀',
    bossName: 'GALACTIC MIND'
  },
  {
    id: 'zone_7',
    name: 'WORLD ROOM',
    subtitle: 'Cultures, landmarks & geography',
    category: 'Geography',
    iconName: 'Globe',
    description: 'Travel the world discovering historical marvels, ancient monuments, natural wonders, and global culture.',
    totalLevels: 5,
    requiredXp: 2200,
    marisolComment: 'Passport ready? Let’s travel to every corner of the Earth! 🌍',
    bossName: 'GLOBE TROTTER'
  },
  {
    id: 'zone_8',
    name: 'BRAIN LAB',
    subtitle: 'Science, technology & inventions',
    category: 'Science',
    iconName: 'Cpu',
    description: 'Explore groundbreaking human inventions, biology mysteries, physics phenomena, and tech giants.',
    totalLevels: 5,
    requiredXp: 2700,
    marisolComment: 'Put on your safety goggles! The Brain Lab is where curiosity turns into power! 🔬',
    bossName: 'EINSTEIN RIVAL'
  },
  {
    id: 'zone_9',
    name: 'SOUND & SCREEN',
    subtitle: 'Melodic hits & pop culture beats',
    category: 'Music',
    iconName: 'Music',
    description: 'Guess the lyrics, iconic movie soundtracks, chart-topping pop anthems, and musical legends.',
    totalLevels: 5,
    requiredXp: 3200,
    marisolComment: 'Turn up the 80s synth! Sound & Screen is all about rhythm and pop culture! 🎵',
    bossName: 'MAESTRO CHALLENGE'
  },
  {
    id: 'zone_10',
    name: 'THE MASTER VAULT',
    subtitle: 'The ultimate trivia challenge',
    category: 'Pop Culture',
    iconName: 'Lock',
    description: 'The highest vault in the Factory of Fun! Combines expert trivia from all categories into one master quest.',
    totalLevels: 5,
    requiredXp: 4000,
    marisolComment: 'You made it to The Master Vault! Only true trivia legends enter here. Show me what you’ve got! 🏆',
    bossName: 'THE MASTERMIND'
  }
];
