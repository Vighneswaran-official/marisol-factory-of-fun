export interface MagazinePage {
  pageNumber: number;
  issueTitle: string;
  categoryTag: string;
  themeColor: string;
  bgGradient: [string, string];
  headline: string;
  avatarPose: string;
  panels: Array<{
    title: string;
    caption: string;
    dialogue: string;
    soundEffect: string;
    emoji: string;
  }>;
  editorialQuote: string;
  bonusSticker: string;
}

export const CARTOON_MAGAZINE_PAGES: MagazinePage[] = [
  {
    pageNumber: 1,
    issueTitle: "ISSUE #01: BOLLYWOOD ROYALTY",
    categoryTag: "GLAMOUR & CINEMA",
    themeColor: "#E11D48",
    bgGradient: ["#FFF1F2", "#FFE4E6"],
    headline: "Main Apni Favourite Hoon: The Art of Royal Main-Character Energy",
    avatarPose: "/marisol/avatars/03_wink_conquer.png",
    panels: [
      {
        title: "Panel 1: The Grand Entrance",
        caption: "When Kritika walks into the conference room...",
        dialogue: "Spreadsheets? Darling, please cue the dholak! We are here to make history!",
        soundEffect: "DHOLAK BEATS 🥁",
        emoji: "💃"
      },
      {
        title: "Panel 2: Geet's Golden Rule",
        caption: "Life philosophy straight from Bollywood's iconic queen.",
        dialogue: "Never dull your sparkle just because someone forgot to put on sunglasses!",
        soundEffect: "TADA! ✨",
        emoji: "👑"
      },
      {
        title: "Panel 3: The Victory Pose",
        caption: "After closing the hardest project milestone with a wink.",
        dialogue: "London Thumakda in our hearts, winning is just what we do!",
        soundEffect: "CONFETTI 🎊",
        emoji: "🌹"
      }
    ],
    editorialQuote: "“To be a queen isn't about wearing a crown; it's about making everyone around you feel like they can conquer mountains too.” — Kritika Magazine Editorial",
    bonusSticker: "👑 CERTIFIED BOLLYWOOD ICON"
  },
  {
    pageNumber: 2,
    issueTitle: "ISSUE #02: THE MIDNIGHT MASTERCHEF",
    categoryTag: "CULINARY COMEDY",
    themeColor: "#D97706",
    bgGradient: ["#FFFBEB", "#FEF3C7"],
    headline: "The Legend of the Triple-Decker Cucumber Sandwich & Secret Tapri Chai",
    avatarPose: "/marisol/avatars/01_brighter_ideas.png",
    panels: [
      {
        title: "Panel 1: The Crisis at 4:00 PM",
        caption: "Low blood sugar detected across the entire department!",
        dialogue: "Stand back everyone! I am deploying emergency cucumber sandwiches immediately!",
        soundEffect: "SIZZLE 🔥",
        emoji: "🥪"
      },
      {
        title: "Panel 2: Precision Buttering",
        caption: "Garlic butter spread corner-to-corner with surgical precision.",
        dialogue: "Thin crisp cucumbers, secret chaat masala, and toasted golden brown!",
        soundEffect: "CRUNCH! 🥒",
        emoji: "👨‍🍳"
      },
      {
        title: "Panel 3: The Tapri Chai Elixir",
        caption: "Boiled three times with crushed ginger and aromatic green cardamom.",
        dialogue: "One sip and every impossible deadline turns into a peaceful walk in the park!",
        soundEffect: "SLURP ☕",
        emoji: "✨"
      }
    ],
    editorialQuote: "“90% of team motivation is great leadership; the other 10% is hot ginger chai and melted cheese.” — Culinary Weekly",
    bonusSticker: "🥪 3-STAR CUCUMBER CHEF"
  },
  {
    pageNumber: 3,
    issueTitle: "ISSUE #03: MAGICAL ANIME PRINCESS",
    categoryTag: "FANTASY & SPARKLE",
    themeColor: "#9333EA",
    bgGradient: ["#FAF5FF", "#F3E8FF"],
    headline: "Vaporizing Work Stress with Iced Matcha & Star Ribbon Spells!",
    avatarPose: "/marisol/avatars/02_happier_days.png",
    panels: [
      {
        title: "Panel 1: The Dark Cloud of Pending Tasks",
        caption: "A swarm of unread emails gathers on the horizon...",
        dialogue: "Not on my watch! Moon Star Ribbon Transformation... ACTIVATE!",
        soundEffect: "SHING! 🪄",
        emoji: "🎀"
      },
      {
        title: "Panel 2: Sparkle Wand Barrage",
        caption: "Pink lasers transform boring tasks into pastel candy clouds.",
        dialogue: "Sparkle beam! Take that, calendar conflicts! Turn into strawberry mochi!",
        soundEffect: "POOF! 🍬",
        emoji: "💖"
      },
      {
        title: "Panel 3: Rainbow Horizon",
        caption: "The entire screen is cleansed with soft lavender twilight.",
        dialogue: "Peace has been restored to the galaxy. Now it is time for a well-deserved nap!",
        soundEffect: "KIRAKIRA ✨",
        emoji: "🌙"
      }
    ],
    editorialQuote: "“When the world gets heavy, remember that your kindness and enthusiasm are the strongest magical powers you possess.” — Anime Shonen Review",
    bonusSticker: "✨ CELESTIAL STRESS BANISHER"
  },
  {
    pageNumber: 4,
    issueTitle: "ISSUE #04: THE NOIR DETECTIVE",
    categoryTag: "MYSTERY & INVESTIGATION",
    themeColor: "#334155",
    bgGradient: ["#F8FAFC", "#F1F5F9"],
    headline: "The Great Mystery of the 9:00 AM Monday Meeting",
    avatarPose: "/marisol/avatars/04_overthinking.png",
    panels: [
      {
        title: "Panel 1: The Scene of the Crime",
        caption: "The rain tapped against the glass blinds of the boardroom.",
        dialogue: "Someone scheduled a meeting before caffeine was legally consumed. A rookie mistake...",
        soundEffect: "JAZZ SAX 🎷",
        emoji: "🔍"
      },
      {
        title: "Panel 2: The Crucial Clue",
        caption: "Detective Kritika points her magnifying glass at the coffee machine.",
        dialogue: "Aha! A lipstick stain on a cutting chai glass! The culprit was trying to stay awake!",
        soundEffect: "GASP! 🔎",
        emoji: "☕"
      },
      {
        title: "Panel 3: Case Dismissed",
        caption: "Detective Kritika stamps the file 'CLOSED'.",
        dialogue: "Court orders an immediate postponement and a 30-minute nap for all involved!",
        soundEffect: "GAVEL BANG 🔨",
        emoji: "📜"
      }
    ],
    editorialQuote: "“Some mysteries cannot be solved with logic alone; sometimes you just need to close the laptop and grab a snack.” — Detective Tribune",
    bonusSticker: "🕵️‍♀️ MASTER INVESTIGATOR"
  },
  {
    pageNumber: 5,
    issueTitle: "ISSUE #05: GHIBLI TRANQUILITY",
    categoryTag: "WELLNESS & SLICE-OF-LIFE",
    themeColor: "#059669",
    bgGradient: ["#ECFDF5", "#D1FAE5"],
    headline: "The Whispering Meadow: Why Even the Wind Takes Time to Rest",
    avatarPose: "/marisol/avatars/05_chai_happiness.png",
    panels: [
      {
        title: "Panel 1: The Ancient Apple Tree",
        caption: "Golden afternoon sunlight filtering through emerald green leaves.",
        dialogue: "Look at the giant fluffy cat sleeping in the shade, Kritika. Zero rush.",
        soundEffect: "PURR... 🍃",
        emoji: "🐱"
      },
      {
        title: "Panel 2: The Floating Dandelion",
        caption: "Blowing gentle dandelion seeds into the summer breeze.",
        dialogue: "You don't need to have everything figured out right now. Just breathe.",
        soundEffect: "SWOOSH 🌬️",
        emoji: "🌸"
      },
      {
        title: "Panel 3: The Steaming Clay Mug",
        caption: "Cardamom pods dancing in rich creamy milk tea.",
        dialogue: "Rest isn't wasted time; it's watering the flowers of your soul.",
        soundEffect: "SIP 🤍",
        emoji: "☕"
      }
    ],
    editorialQuote: "“In the rush of getting things done, never forget the simple luxury of a quiet afternoon, a warm cup, and a clear heart.” — Ghibli Gazette",
    bonusSticker: "🌿 PURE COZY SERENITY"
  }
];
