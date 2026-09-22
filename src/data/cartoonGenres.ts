export interface CartoonGenreEpisode {
  id: string;
  genre: 'bollywood' | 'masterchef' | 'magical_girl' | 'detective' | 'ghibli' | 'space_queen';
  title: string;
  tagline: string;
  icon: string;
  stickerPose: string; // From /marisol/avatars/
  bgGradient: [string, string];
  ambienceTheme: 'fanfare' | 'sizzle' | 'sparkle' | 'jazz' | 'breeze' | 'cosmic';
  dialogue: string;
  punchline: string;
  actionSequence: Array<{
    timestampMs: number;
    cameraEffect: 'normal' | 'dramatic_zoom' | 'pan_left' | 'pan_right' | 'shake' | 'bounce';
    particleType: 'roses' | 'sandwiches' | 'sparkles' | 'notes' | 'leaves' | 'stars';
    mouthState: 'closed' | 'open_small' | 'open_wide' | 'smile';
    subtitleText: string;
  }>;
}

export const CARTOON_EPISODES: CartoonGenreEpisode[] = [
  {
    id: 'ep_bollywood',
    genre: 'bollywood',
    title: 'Bollywood Superstar 🎬',
    tagline: 'Full Geet & Queen energy! The box-office hit of the century.',
    icon: '💃',
    stickerPose: '/marisol/avatars/03_wink_conquer.png',
    bgGradient: ['#881337', '#BE185D'],
    ambienceTheme: 'fanfare',
    dialogue: "Main apni favourite hoon! When I walk into the meeting, even the spreadsheets start dancing to London Thumakda. Never forget who runs this show, darling!",
    punchline: "Full Queen Mode Activated! 👑✨",
    actionSequence: [
      { timestampMs: 0, cameraEffect: 'normal', particleType: 'roses', mouthState: 'smile', subtitleText: "Lights... Camera... Queen Kritika!" },
      { timestampMs: 1500, cameraEffect: 'dramatic_zoom', particleType: 'roses', mouthState: 'open_wide', subtitleText: "Main apni favourite hoon! 💃" },
      { timestampMs: 3800, cameraEffect: 'pan_left', particleType: 'roses', mouthState: 'open_small', subtitleText: "When I walk into the meeting, even the spreadsheets dance!" },
      { timestampMs: 6500, cameraEffect: 'bounce', particleType: 'sparkles', mouthState: 'open_wide', subtitleText: "Never forget who runs this show, darling! 👑" }
    ]
  },
  {
    id: 'ep_masterchef',
    genre: 'masterchef',
    title: 'MasterChef Kitchen Chaos 🍳',
    tagline: 'High-speed culinary madness with flying cucumber sandwiches!',
    icon: '🥪',
    stickerPose: '/marisol/avatars/01_brighter_ideas.png',
    bgGradient: ['#B45309', '#EA580C'],
    ambienceTheme: 'sizzle',
    dialogue: "Fire up the tawa! Today's top secret recipe has fifty layers of melted cheese, extra crispy cucumber slices, and absolutely zero Monday deadlines!",
    punchline: "Michelin 3-Star Cucumber Sandwiches! 🥪🔥",
    actionSequence: [
      { timestampMs: 0, cameraEffect: 'bounce', particleType: 'sandwiches', mouthState: 'open_small', subtitleText: "Attention kitchen! Fire up the tawa! 🍳" },
      { timestampMs: 2000, cameraEffect: 'shake', particleType: 'sandwiches', mouthState: 'open_wide', subtitleText: "Fifty layers of melted cheese & crispy cucumber! 🥪" },
      { timestampMs: 4500, cameraEffect: 'pan_right', particleType: 'sandwiches', mouthState: 'open_small', subtitleText: "Secret ingredient: Zero work stress allowed!" },
      { timestampMs: 7000, cameraEffect: 'dramatic_zoom', particleType: 'sparkles', mouthState: 'smile', subtitleText: "Order up for Chef Kritika! Bon Appétit! ✨" }
    ]
  },
  {
    id: 'ep_magical_girl',
    genre: 'magical_girl',
    title: 'Magical Anime Princess ✨',
    tagline: 'Celestial sparkle wands banishing work stress forever.',
    icon: '🎀',
    stickerPose: '/marisol/avatars/02_happier_days.png',
    bgGradient: ['#4C1D95', '#C026D3'],
    ambienceTheme: 'sparkle',
    dialogue: "By the sacred powers of iced matcha and pink hair ribbons, I cast a magical spell! All pending notifications are turned into harmless candy clouds!",
    punchline: "Stress Vanishing Sparkle Beam! 🪄💖",
    actionSequence: [
      { timestampMs: 0, cameraEffect: 'normal', particleType: 'sparkles', mouthState: 'smile', subtitleText: "Moon Prism Power... Kritika Magic! 🌙" },
      { timestampMs: 2000, cameraEffect: 'dramatic_zoom', particleType: 'sparkles', mouthState: 'open_wide', subtitleText: "By the sacred power of iced matcha and pink ribbons! 🎀" },
      { timestampMs: 4800, cameraEffect: 'pan_left', particleType: 'sparkles', mouthState: 'open_small', subtitleText: "All pending notifications turn into candy clouds!" },
      { timestampMs: 7200, cameraEffect: 'bounce', particleType: 'sparkles', mouthState: 'smile', subtitleText: "Sparkle beam complete! You are protected forever! 💖" }
    ]
  },
  {
    id: 'ep_detective',
    genre: 'detective',
    title: 'Pastel Detective Mystery 🕵️‍♀️',
    tagline: 'Solving the great case of the 9 AM meeting with style.',
    icon: '🔍',
    stickerPose: '/marisol/avatars/04_overthinking.png',
    bgGradient: ['#1F2937', '#475569'],
    ambienceTheme: 'jazz',
    dialogue: "Elementary, my dear Kritika! The suspect who scheduled a meeting before coffee left behind one crucial clue: an empty cutting chai cup on the table!",
    punchline: "Case Solved: Take a Chai Break! ☕🔎",
    actionSequence: [
      { timestampMs: 0, cameraEffect: 'normal', particleType: 'notes', mouthState: 'smile', subtitleText: "The city was quiet... too quiet. 🕵️‍♀️" },
      { timestampMs: 2200, cameraEffect: 'dramatic_zoom', particleType: 'notes', mouthState: 'open_small', subtitleText: "Elementary, my dear Kritika! Look at this clue..." },
      { timestampMs: 4800, cameraEffect: 'pan_right', particleType: 'notes', mouthState: 'open_wide', subtitleText: "An empty cutting chai cup on the conference table!" },
      { timestampMs: 7000, cameraEffect: 'shake', particleType: 'sparkles', mouthState: 'smile', subtitleText: "Case closed! The court orders immediate relaxation! ☕" }
    ]
  },
  {
    id: 'ep_ghibli',
    genre: 'ghibli',
    title: 'Cozy Ghibli Wanderer 🍃',
    tagline: 'Whispering wind, giant friendly spirit cat, and sweet peace.',
    icon: '🌿',
    stickerPose: '/marisol/avatars/05_chai_happiness.png',
    bgGradient: ['#064E3B', '#047857'],
    ambienceTheme: 'breeze',
    dialogue: "Look at those sleepy clouds drifting by, Kritika. Even the forest stops to breathe. Take a slow sip of warm ginger chai... the whole world can wait for you.",
    punchline: "Peaceful Forest Haven 🍃🤍",
    actionSequence: [
      { timestampMs: 0, cameraEffect: 'normal', particleType: 'leaves', mouthState: 'smile', subtitleText: "The summer breeze carried the scent of rain..." },
      { timestampMs: 2200, cameraEffect: 'pan_left', particleType: 'leaves', mouthState: 'open_small', subtitleText: "Look at those sleepy clouds drifting by, Kritika." },
      { timestampMs: 4800, cameraEffect: 'dramatic_zoom', particleType: 'leaves', mouthState: 'smile', subtitleText: "Even the forest stops to rest. Take a slow sip of chai... ☕" },
      { timestampMs: 7500, cameraEffect: 'normal', particleType: 'leaves', mouthState: 'smile', subtitleText: "Be gentle with your heart today, dear traveler. 🤍" }
    ]
  },
  {
    id: 'ep_space_queen',
    genre: 'space_queen',
    title: 'Cosmic Space Queen 🚀',
    tagline: 'Starship Glitter-1 cruising through pink nebula galaxies.',
    icon: '🪐',
    stickerPose: '/marisol/avatars/10_bigger_adventures.png',
    bgGradient: ['#0F172A', '#312E81'],
    ambienceTheme: 'cosmic',
    dialogue: "Captain Kritika to Earth Ground Control! I am reporting from the Glitter Galaxy. From way up here, human worries look smaller than a grain of sugar! Hyper-chill engaged!",
    punchline: "Warp Speed to Infinite Joy! 🚀⭐",
    actionSequence: [
      { timestampMs: 0, cameraEffect: 'normal', particleType: 'stars', mouthState: 'smile', subtitleText: "Captain Kritika to Earth Ground Control! 🛸" },
      { timestampMs: 2000, cameraEffect: 'dramatic_zoom', particleType: 'stars', mouthState: 'open_wide', subtitleText: "Reporting from the center of the Glitter Nebula!" },
      { timestampMs: 4500, cameraEffect: 'shake', particleType: 'stars', mouthState: 'open_small', subtitleText: "From up here, human worries are microscopic!" },
      { timestampMs: 7000, cameraEffect: 'bounce', particleType: 'sparkles', mouthState: 'open_wide', subtitleText: "Engaging hyper-chill mode in 3, 2, 1... BLAST OFF! ⭐" }
    ]
  }
];
