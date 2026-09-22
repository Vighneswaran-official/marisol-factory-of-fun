export interface AnimeScene {
  id: string;
  mood: 'Happy' | 'Tired' | 'Stressed' | 'Cozy' | 'Excited' | 'Low' | 'Romantic';
  title: string;
  theme: string;
  sceneType: 'rainy_window' | 'sleepy_bedroom' | 'blooming_city' | 'pastel_dance' | 'cozy_cafe' | 'starlight_celebration' | 'cherry_blossom_lanterns' | 'cat_bakery' | 'cloud_nap';
  bgGradient: [string, string];
  characterAction: string;
  environmentDescription: string;
  dialogueText: string;
  personalizedEndcard: string;
  ambientSoundType: 'rain_lofi' | 'night_crickets' | 'gentle_breeze' | 'bubbly_chimes' | 'cafe_jazz' | 'sparkle_fanfare' | 'soft_strings';
  particleType: 'rain' | 'stars' | 'petals' | 'hearts' | 'sparkles' | 'steam';
  accentColor: string;
}

export interface CuratedAnimeClip {
  id: string;
  mood: 'Happy' | 'Tired' | 'Stressed' | 'Cozy' | 'Excited' | 'Low' | 'Romantic';
  title: string;
  animeSource: string;
  vibeTag: string;
  mediaUrl: string;
  caption: string;
}

export const AI_ANIME_SCENES: Record<string, AnimeScene[]> = {
  Stressed: [
    {
      id: 'stressed_rainy_blanket',
      mood: 'Stressed',
      title: 'Raindrops & Warm Chai Blanket',
      theme: 'Calming rainy evening sanctuary',
      sceneType: 'rainy_window',
      bgGradient: ['#3A3D52', '#636886'],
      characterAction: 'Wrapped in an oversized pastel knit blanket, sipping hot spiced tea',
      environmentDescription: 'Soft raindrops trickling down glass, warm amber fairy lights glowing',
      dialogueText: 'The spreadsheets, emails, and chaos will wait. Right now, this quiet warmth is yours.',
      personalizedEndcard: 'Take a little break, Kritika. You’re doing okay. 🤍',
      ambientSoundType: 'rain_lofi',
      particleType: 'rain',
      accentColor: '#93C5FD'
    },
    {
      id: 'stressed_greenhouse',
      mood: 'Stressed',
      title: 'Quiet Glass Greenhouse',
      theme: 'Botanical breath of fresh air',
      sceneType: 'cozy_cafe',
      bgGradient: ['#2F4F4F', '#52796F'],
      characterAction: 'Watering sweet lavender shoots while taking slow, deep breaths',
      environmentDescription: 'Sunlight filtering through misted glass panes, lush green monstera leaves',
      dialogueText: 'Drop your shoulders, unclench your jaw. You don\'t have to carry everything right now.',
      personalizedEndcard: 'Breathe in peace, exhale tension, Kritika. You\'ve got this. 🌿✨',
      ambientSoundType: 'gentle_breeze',
      particleType: 'steam',
      accentColor: '#86EFAC'
    }
  ],

  Tired: [
    {
      id: 'tired_sleepy_bedroom',
      mood: 'Tired',
      title: 'Moonlit Pillow Haven',
      theme: 'Gentle night-time tuck in',
      sceneType: 'sleepy_bedroom',
      bgGradient: ['#231F3F', '#433878'],
      characterAction: 'Curls deep into fluffy cloud pillows, hugs a plushie bunny, softly yawns',
      environmentDescription: 'Fairy lights slowly dimming, a silver crescent moon smiling through curtains',
      dialogueText: 'You put your whole heart into today. Now let the universe take care of the rest.',
      personalizedEndcard: 'You’ve done enough for today. Rest now, Kritika. 🌙💤',
      ambientSoundType: 'night_crickets',
      particleType: 'stars',
      accentColor: '#C4B5FD'
    },
    {
      id: 'tired_star_hammock',
      mood: 'Tired',
      title: 'Starlit Cloud Hammock',
      theme: 'Floating above the quiet world',
      sceneType: 'cloud_nap',
      bgGradient: ['#1E1B4B', '#3730A3'],
      characterAction: 'Drifting gently on a lavender cloud hammock with a soft wool throw',
      environmentDescription: 'Millions of soft twinkling stars, soothing gentle cosmic lullaby',
      dialogueText: 'Rest is not giving up; it\'s replenishing your royal radiance.',
      personalizedEndcard: 'Sweetest dreams, Kritika. Tomorrow will be gentle with you. 🤍⭐',
      ambientSoundType: 'night_crickets',
      particleType: 'stars',
      accentColor: '#E0E7FF'
    }
  ],

  Low: [
    {
      id: 'low_blooming_city',
      mood: 'Low',
      title: 'The Gray Street Blooms',
      theme: 'From quiet blues to pastel spring',
      sceneType: 'blooming_city',
      bgGradient: ['#4A4E69', '#9A8C98'],
      characterAction: 'Steps into a monochrome street—where every step causes glowing pink flowers to bloom',
      environmentDescription: 'The gloomy city gradually melts into a pastel pink wonderland filled with butterflies',
      dialogueText: 'Sad days are just clouds passing over the sun. Your inner sparkle is permanent.',
      personalizedEndcard: 'You bring so much light to everyone, Kritika. Let some shine on you today. 💕🌸',
      ambientSoundType: 'soft_strings',
      particleType: 'petals',
      accentColor: '#F472B6'
    },
    {
      id: 'low_pastel_hug',
      mood: 'Low',
      title: 'Giant Fluffy Teddy Hug',
      theme: 'Unconditional warmth and safety',
      sceneType: 'cozy_cafe',
      bgGradient: ['#5B4254', '#8E677E'],
      characterAction: 'A sweet oversized friendly anime bear wraps its arms around her in a giant hug',
      environmentDescription: 'Warm pastel lights, sweet vanilla bakery scent, floating glowing hearts',
      dialogueText: 'It is okay to feel tender. You are loved, cherished, and irreplaceable.',
      personalizedEndcard: 'Sending you the biggest, warmest virtual hug, Kritika. 💖🧸',
      ambientSoundType: 'soft_strings',
      particleType: 'hearts',
      accentColor: '#FDA4AF'
    }
  ],

  Happy: [
    {
      id: 'happy_pastel_dance',
      mood: 'Happy',
      title: 'Rainbow Cloud Dance',
      theme: 'Pure joyful bounce',
      sceneType: 'pastel_dance',
      bgGradient: ['#FDE047', '#F472B6'],
      characterAction: 'Twirling joyfully across pastel pink clouds, catching floating candy stars',
      environmentDescription: 'Pastel rainbow arches across a soft lavender sky with fluttering butterflies',
      dialogueText: 'This joyful glow looks magnificent on you! Keep radiating this sunshine everywhere!',
      personalizedEndcard: 'Your smile makes the whole world brighter, Kritika! 🌸✨',
      ambientSoundType: 'bubbly_chimes',
      particleType: 'hearts',
      accentColor: '#F59E0B'
    }
  ],

  Cozy: [
    {
      id: 'cozy_cat_cafe',
      mood: 'Cozy',
      title: 'Sunlit Window & Chai Cat',
      theme: 'Pure snug contentment',
      sceneType: 'cozy_cafe',
      bgGradient: ['#D97706', '#FB7185'],
      characterAction: 'Reading a vintage novel while a sleepy orange tabby purrs on her lap',
      environmentDescription: 'Steaming ginger tea cup, plate of freshly sliced cucumber sandwiches, golden afternoon rays',
      dialogueText: 'Warm chai, quiet comfort, and zero worries. This is the definition of luxury.',
      personalizedEndcard: 'Cozy vibes unlocked for our queen Kritika! 🤍☕🥪',
      ambientSoundType: 'cafe_jazz',
      particleType: 'steam',
      accentColor: '#F59E0B'
    }
  ],

  Excited: [
    {
      id: 'excited_starlight_cheer',
      mood: 'Excited',
      title: 'Starlight Confetti Parade',
      theme: 'Big celebration momentum',
      sceneType: 'starlight_celebration',
      bgGradient: ['#E11D48', '#8B5CF6'],
      characterAction: 'Popping a golden party popper as colorful sparkles burst into the sky',
      environmentDescription: 'Celebratory festival plaza, cheering friendly anime crowd waving ribbons',
      dialogueText: 'Whatever great news just happened—you earned every single drop of it!',
      personalizedEndcard: 'Own your victory, Kritika! Full Queen mode activated! 👑✨🎉',
      ambientSoundType: 'sparkle_fanfare',
      particleType: 'sparkles',
      accentColor: '#FBBF24'
    }
  ],

  Romantic: [
    {
      id: 'romantic_cherry_lake',
      mood: 'Romantic',
      title: 'Lanterns Over Cherry Lake',
      theme: 'Dreamy twilight reverie',
      sceneType: 'cherry_blossom_lanterns',
      bgGradient: ['#9D174D', '#BE185D'],
      characterAction: 'Releasing a soft glowing paper lantern into the dusk sky, petals catching in her hair',
      environmentDescription: 'Mirror-still lake reflecting thousands of golden lanterns, sakura trees in full bloom',
      dialogueText: 'The heart wants sweetness, magic, and poetry. Let yourself savor the romance.',
      personalizedEndcard: 'You deserve all the sweetness and love in this world, Kritika. 🎀💖',
      ambientSoundType: 'soft_strings',
      particleType: 'petals',
      accentColor: '#F43F5E'
    }
  ]
};

export const SURPRISE_ME_SCENES: AnimeScene[] = [
  {
    id: 'surprise_cat_chef',
    mood: 'Happy',
    title: 'Chef Whiskers’ Starry Bakery',
    theme: 'Whimsical culinary surprise',
    sceneType: 'cat_bakery',
    bgGradient: ['#FB923C', '#F472B6'],
    characterAction: 'A cute anime cat wearing a tall chef hat presents a golden cucumber sandwich and strawberry milk',
    environmentDescription: 'Sparkling kitchen with floating flour hearts, pastel macaron towers, cheerful clock ticking',
    dialogueText: 'Special delivery from Chef Whiskers! Baked with 100% extra love and zero calories!',
    personalizedEndcard: 'Surprise treat for Kritika! You deserve endless sweetness! 🐱🥪🍓',
    ambientSoundType: 'bubbly_chimes',
    particleType: 'sparkles',
    accentColor: '#F97316'
  },
  {
    id: 'surprise_cloud_picnic',
    mood: 'Cozy',
    title: 'Floating Sky Tea Party',
    theme: 'Surreal whimsical fantasy',
    sceneType: 'cloud_nap',
    bgGradient: ['#818CF8', '#C084FC'],
    characterAction: 'Sitting at a floating glass table on a pastel pink cloud with singing teacups',
    environmentDescription: 'Gentle pastel skies, floating crystal sugar cubes, warm golden sunshine',
    dialogueText: 'When earth feels too busy, we take our tea party to the clouds!',
    personalizedEndcard: 'High above the clouds, Kritika shines the brightest! ☁️✨🎀',
    ambientSoundType: 'bubbly_chimes',
    particleType: 'hearts',
    accentColor: '#A855F7'
  }
];

export const CURATED_ANIME_CLIPS: CuratedAnimeClip[] = [
  {
    id: 'clip_tired_bed',
    mood: 'Tired',
    title: 'Sleepy Totoro Rain & Bed',
    animeSource: 'Ghibli Aesthetic',
    vibeTag: 'Deep Sleep 💤',
    mediaUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    caption: 'Tuck into the covers. You’ve done enough today, Kritika. 🌙'
  },
  {
    id: 'clip_stressed_tea',
    mood: 'Stressed',
    title: 'Steaming Matcha Tea & Garden',
    animeSource: 'Garden of Words Vibe',
    vibeTag: 'Gentle Calm 🍵',
    mediaUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    caption: 'Take a sip, close your eyes, breathe. The world can wait. 🤍'
  },
  {
    id: 'clip_happy_sunshine',
    mood: 'Happy',
    title: 'Cherry Blossom Bicycle Ride',
    animeSource: 'Your Name Aesthetic',
    vibeTag: 'Pure Joy 🌸',
    mediaUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=600&q=80',
    caption: 'Sunshine on your face, wind in your hair. Keep shining queen! ✨'
  },
  {
    id: 'clip_cozy_blanket',
    mood: 'Cozy',
    title: 'Reading by the Rainy Window',
    animeSource: 'Whisper of the Heart',
    vibeTag: 'Warm Blanket 🤍',
    mediaUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    caption: 'Soft knit blanket + favorite book + hot tea = perfection. ☕'
  },
  {
    id: 'clip_excited_sky',
    mood: 'Excited',
    title: 'Fireworks Over the Ocean',
    animeSource: 'Summer Wars Vibe',
    vibeTag: 'Sparkle Time ✨',
    mediaUrl: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=600&q=80',
    caption: 'Celebrate your brilliance! We are so proud of you! 🎉'
  },
  {
    id: 'clip_low_hug',
    mood: 'Low',
    title: 'Gentle Cat Purring in Sunbeam',
    animeSource: 'Kiki’s Delivery Service',
    vibeTag: 'Soft Comfort 💕',
    mediaUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    caption: 'A gentle reminder that you are deeply appreciated and loved. 💖'
  },
  {
    id: 'clip_romantic_sunset',
    mood: 'Romantic',
    title: 'Sunset Rooftop Silhouette',
    animeSource: 'Weathering With You',
    vibeTag: 'Sweet Romance 🎀',
    mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    caption: 'The sky painted in blush pink just for your romantic heart. 🌅'
  }
];
