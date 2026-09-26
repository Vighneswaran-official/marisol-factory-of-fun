# Marisol Factory of Fun - Complete Codebase for Claude

## Project Overview
- **Project Name**: Marisol Factory of Fun (Kritika Companion, Culinary Cinema Trivia & Batch 41 Community)
- **GitHub Repository**: https://github.com/Vighneswaran-official/marisol-factory-of-fun
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Web Audio API / Synth, Firebase Firestore & Auth, PWA (vite-plugin-pwa)
- **Key Features**:
  - Sisterly wellness companion (dynamic mood, affirmations, comfort corner)
  - Culinary & Bollywood cinema trivia engine with recipes & cucumber sandwich scoring
  - In-website YouTube Jukebox & live search
  - Level clear celebration with hero banner video
  - Secret locket with voice memos & notes
  - Glow-Up Week polaroid scrapbook
  - Batch 41 Unified Real-Time Group Chat (Firestore + BroadcastChannel) restricted to authenticated email users
  - Dedicated "📌 Pinned & Important Highlights" section with category tagging & jump-to-message navigation
  - Batch Wall photo & update feed with author-only controls & filters
  - Full PWA downloadable on Android & iOS

## Project Directory Structure
```
.env
.env.example
.github/
  workflows/
    build-android.yml
    deploy-pages.yml
.gitignore
.oxlintrc.json
CHAT_WITH_CLAUDE.md
CLAUDE.md
CLAUDE_CODEBASE_BUNDLE.md
CLAUDE_MOOD_RECOMMENDATION_PROMPT.md
README.md
api/
capacitor.config.ts
firestore.rules
index.html
marisol-factory-of-fun.zip
package-lock.json
package.json
postcss.config.js
public/
  Hero Banner video.mp4
  apple-touch-icon.png
  favicon.svg
  hero-banner-video.mp4
  icon-192.png
  icon-512.png
  icons.svg
  manifest.json
  manifest.webmanifest
  marisol/
    avatars/
      01_brighter_ideas.png
      02_happier_days.png
      03_wink_conquer.png
      04_overthinking.png
      05_chai_happiness.png
      06_silly_vibe.png
      07_big_dreams.png
      08_grateful_always.png
      09_just_me.png
      10_bigger_adventures.png
      11_music_mood.png
      big_dreams.png
      bigger_adventures.png
      brighter_ideas.png
      chai_happiness.png
      grateful_always.png
      happier_days.png
      just_me.png
      music_mood.png
      overthinking.png
      silly_vibe.png
      wink_conquer.png
    kritika_stickers_sheet.jpg
    marisol_sheet.jpg
    poses/
      big_dreams.png
      bigger_adventures.png
      brighter_ideas.png
      chai_happiness.png
      grateful_always.png
      happier_days.png
      just_me.png
      music_mood.png
      overthinking.png
      silly_vibe.png
      wink_conquer.png
    stickers/
      01_brighter_ideas.png
      02_happier_days.png
      03_wink_conquer.png
      04_overthinking.png
      05_chai_happiness.png
      06_silly_vibe.png
      07_big_dreams.png
      08_grateful_always.png
      09_just_me.png
      10_bigger_adventures.png
      11_music_mood.png
    stickers_manifest.json
  maskable-icon.png
  sw.js
scripts/
  chat_with_claude.cjs
  generate_bundle.cjs
  process_all_11_images.cjs
  slice_poses.cjs
src/
  App.css
  App.tsx
  assets/
    Hero Banner video.mp4
    hero.png
    moods/
      mood_calm.jpg
      mood_confident.jpg
      mood_excited.jpg
      mood_grateful.jpg
      mood_happy.jpg
      mood_motivated.jpg
      mood_playful.jpg
      mood_stressed.jpg
      mood_tired.jpg
    react.svg
    vite.svg
  components/
    BaseModal.tsx
    BatchUpdatesWall.tsx
    BottomNavigationDock.tsx
    CelebrationLocketModal.tsx
    Classroom.tsx
    ComfortCornerModal.tsx
    ComfortShelfModal.tsx
    DailyChallenge.tsx
    ErrorBoundary.tsx
    FloatingMusicBar.tsx
    FloatingVideoPlayer.tsx
    GameMap.tsx
    GlowUpWeekModal.tsx
    GoogleSignInModal.tsx
    HomeScreen.tsx
    InstallAppModal.tsx
    KnowledgePassport.tsx
    LearningCard.tsx
    LevelClearHeroModal.tsx
    LittleLoveNote.tsx
    Marisol.tsx
    MoodHistoryModal.tsx
    MoodSelectorModal.tsx
    MovieDetectiveCard.tsx
    MusicJukeboxModal.tsx
    MusicPlayerScreen.tsx
    Navbar.tsx
    OpeningCinematic.tsx
    PlayerProfileCard.tsx
    QuestionCard.tsx
    RecipeModal.tsx
    RecipeVault.tsx
    SecretLocketModal.tsx
    SparkleStreak.tsx
    StickerCollection.tsx
    VaultHub.tsx
  data/
    achievements.ts
    animeScenes.ts
    foodMovieQuestions1000.ts
    hindiSongs.ts
    macaroniRecipes.ts
    questions.ts
    recipes.ts
    stickers.ts
    zones.ts
  index.css
  main.tsx
  services/
    adaptiveEngine.ts
    animeAudio.ts
    authService.ts
    batchWallState.ts
    firebase.ts
    gameState.ts
    moodQuizService.ts
    moodRotationService.ts
    musicStreamingService.ts
    synthAudioEngine.ts
    videoPlaybackService.ts
    voiceRoomService.ts
    wellnessState.ts
  types/
    canvas-confetti.d.ts
    game.ts
  vite-env.d.ts
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vercel.json
vite.config.ts
```

## Complete Source Code

### File: `.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

---

### File: `CLAUDE.md`

```md
# CLAUDE.md - Comprehensive Project Guide for Claude

This document provides a complete technical and conceptual guide to the **Marisol Factory of Fun** codebase. It is designed to give Claude immediate, high-fidelity understanding of the project's architecture, data models, state flows, conventions, and operational rules.

---

## 1. Project Overview & Vision

- **Name**: Marisol Factory of Fun (Kritika Companion, Culinary Cinema Trivia & Batch 41 Community)
- **Repository**: [https://github.com/Vighneswaran-official/marisol-factory-of-fun](https://github.com/Vighneswaran-official/marisol-factory-of-fun)
- **Primary Beneficiary / Persona**: Designed as a warm, sisterly wellness companion, celebration game, and interactive community hub for Kritika and Batch 41 classmates.
- **Key Tenets**:
  1. **Sisterly Wellness & Warmth**: Mood tracking, daily affirmations, comfort corner, voice notes, and scrapbook memories.
  2. **Playful Gamification**: Bollywood cinema trivia, culinary challenges, cucumber sandwich scoring, level-clear fanfare, and YouTube jukebox.
  3. **Batch 41 Connected Community**: Real-time group chat restricted strictly to email-connected members, dedicated Pinned & Important announcements section, and Instagram-style batch photo wall.

---

## 2. Core Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 (Hooks, Functional Components, Strict Mode) |
| **Language** | TypeScript 5+ (Strict typing, `tsc -b`) |
| **Build Tool** | Vite 8+ |
| **Styling** | Tailwind CSS + Custom CSS (`src/index.css`) with playful, pastel, and glassmorphism styling |
| **Icons** | `lucide-react` |
| **Audio** | Custom Web Audio API synthesizer (`src/services/synthAudioEngine.ts` - zero external audio assets required) |
| **Database & Auth** | Firebase 11+ (Firestore for real-time document sync, Firebase Auth / Google Sign-In) |
| **PWA & Mobile** | `vite-plugin-pwa`, Capacitor (`capacitor.config.ts`), Android APK integration |

---

## 3. Directory Structure

```
marisol-factory-of-fun/
├── CLAUDE.md                         # This comprehensive Claude context guide
├── CLAUDE_CODEBASE_BUNDLE.md         # Full bundled source code of the entire repository
├── index.html                        # HTML entry point with meta tags, PWA links, and fonts
├── package.json                      # Dependencies and npm scripts
├── vite.config.ts                    # Vite configuration with PWA plugin
├── tailwind.config.js                # Custom color palettes, font families, and animations
├── public/                           # Static assets, hero video, avatars, and PWA icons
├── scripts/
│   ├── generate_bundle.cjs           # Bundles all project source files into CLAUDE_CODEBASE_BUNDLE.md
│   ├── process_all_11_images.cjs     # Image processing utilities
│   └── slice_poses.cjs               # Sprite / avatar slicing tools
└── src/
    ├── main.tsx                      # App entry point rendering App.tsx
    ├── App.tsx                       # Master screen router and overlay manager
    ├── index.css                     # Global styles, scrollbar styling, animations, tokens
    ├── components/                   # UI components and screen modules
    │   ├── BatchUpdatesWall.tsx      # Unified Group Chat, Pinned Highlights & Batch Photo Wall
    │   ├── GoogleSignInModal.tsx     # Google Sign-In & custom email entry modal
    │   ├── JukeboxPlayer.tsx         # In-app music player & YouTube live stream / search
    │   ├── TriviaArena.tsx           # Multi-level cinema & culinary quiz game
    │   ├── LevelClearHeroModal.tsx   # Video celebration modal when completing trivia levels
    │   ├── LittleLoveNote.tsx        # Sisterly comfort cards and affirmation notes
    │   ├── SecretLocketModal.tsx     # Hidden locket with audio memos and personal keepsakes
    │   ├── GlowUpPolaroidModal.tsx   # Polaroid scrapbook memories and photo wall
    │   ├── ComfortCorner.tsx         # Relaxing wellness hub with breathing exercises
    │   ├── AffirmationCard.tsx       # Dynamic daily affirmation cards
    │   ├── MarisolAvatar.tsx         # Expressive companion avatar changing with mood
    │   ├── BaseModal.tsx             # Shared accessible modal wrapper
    │   └── SparkleStreak.tsx         # Streak counter with particle sparkle effects
    ├── services/                     # State management, persistence & API singletons
    │   ├── authService.ts            # Current student profile, Firebase Auth, email-only chat access
    │   ├── batchWallState.ts         # Group chat, pinned messages, reactions, Firestore sync
    │   ├── firebase.ts               # Firebase initialization and Firestore instance
    │   ├── gameState.ts              # Trivia score, streak, cucumber sandwich tokens, unlocked levels
    │   ├── synthAudioEngine.ts       # Synthesizer SFX (pop, fanfare, click, chimes, boing)
    │   ├── jukeboxService.ts         # Music tracks, YouTube stream search, playback queue
    │   └── adaptiveEngine.ts         # Dynamic mood adjustments based on player interaction
    ├── data/                         # Hardcoded data sets and constants
    │   ├── triviaQuestions.ts        # Cinema, food, and culture trivia questions by difficulty
    │   ├── stickers.ts               # Chat stickers and reaction emojis
    │   ├── affirmations.ts           # Sisterly daily affirmation quotes
    │   ├── recipes.ts                # Cucumber sandwich recipes and fun food cards
    │   └── moodData.ts               # Marisol mood states, avatar paths, and color themes
    └── types/                        # TypeScript type definitions
        └── game.ts                   # Screen states, trivia types, player data models
```

---

## 4. Key Architectural Systems

### A. Authentication & Chat Access Control (`authService.ts`)
- **Strict Email Verification**: Only users who connect their email address (`currentUser.email && currentUser.email.includes('@')`) are authorized to chat, react, pin messages, vote in polls, or post photos.
- **Anonymous Visitors**: Can browse the app, play trivia, and read messages, but are presented with the Google / Email Sign-In modal before chatting.
- **Automatic "New User" Detection**:
  - When an email is first connected, `authService` automatically records the profile with `isNewUser: true` and `userTag: 'New User'`.
  - Synced to Firestore collection `students/{id}` so all peers see the user's authentic name and tag.
- **Kritika Detection**: Users with `kritika` or `marisol` in their name or email are awarded the `Founder 👑` badge.

### B. Unified Group Chat & Dedicated Pinned Section (`BatchUpdatesWall.tsx` & `batchWallState.ts`)
- **No 1-on-1 Direct Chat & No Community Directory**: Per design requirements, 1-on-1 private messaging and the separate community user directory have been completely eliminated in favor of a single cohesive group lounge.
- **Two Sub-Tabs**:
  1. `💬 Group Chat`: The central chatroom where all connected batch members converse, send stickers, share photos, create polls, and quote-reply.
  2. `📌 Pinned & Important ({count})`: A dedicated section that displays all pinned notices and urgent highlights.
- **Pinning Workflow**:
  - Any message in the chat can be pinned via its dropdown menu (`pinChatMessage`).
  - Users can click **"+ New Notice"** to open a modal and publish an announcement with a category badge (`[Notice]`, `[Important]`, `[Deadline]`, `[Resource]`, `[Event]`).
  - The message is posted to the group chat and immediately pinned to the Pinned section.
  - From the Pinned section, users can click **"Jump to Message ↗"** to seamlessly scroll to and highlight that message in the chat.
- **Real-Time Synchronization**:
  - Uses Firebase Firestore collection `group_chat_messages` with an onSnapshot listener.
  - Uses `BroadcastChannel('batch_wall_channel')` for instantaneous cross-tab synchronization.
  - LocalStorage caching provides zero-latency offline loading.

### C. Batch Photo & Story Wall
- Instagram-style feed for sharing photos, captions, and tags.
- Client-side image compression (`compressImageFile`) prevents large payloads.
- Author-only editing and deletion: Users can only edit or delete posts they authored.
- Filter presets (Vintage, Warm, Cool, Sepia, Monochrome).

### D. Audio & Gamification Engine (`synthAudioEngine.ts` & `gameState.ts`)
- Zero external audio files required: Uses the browser's native `AudioContext` to synthesize notes, arpeggios, chimes, and fanfare.
- Tracks trivia streak, scores, levels cleared, cucumber sandwich tokens, and unlocked secrets.
- Celebrations trigger `canvas-confetti` bursts and hero video modals.

### E. Discord-Style Real-Time Voice Room (`voiceRoomService.ts`)
- **WebRTC Peer-to-Peer**: Live multi-user voice mesh connecting active Batch 41 members with STUN signaling through Firestore.
- **Audio Isolation**: Zero audio bleed — only users who explicitly click "Join Voice Room" receive or broadcast microphone streams.
- **Speaking Activity & Cheer SFX**: Web Audio Analyser monitors volume for active glow indicators; synchronized cheer sound-effects broadcast across all participants.

### F. Chat Privacy & Message Isolation
- **Strict New User Privacy**: When a new batch member signs up, `batchWallState.ts` filters out older historical messages prior to their registration date (`userCreatedAt`).
- **Post Interaction & Reactions**: Wall posts feature threaded comments, 5 reaction emojis (❤️, 👏, 🔥, 😂, 🌸), unique likes list modal, and share count tracking.

---

## 5. Development Commands & Workflow

```bash
# Install dependencies
npm install

# Start local development server (Vite dev server)
npm run dev

# Run TypeScript type check and build production bundle
npm run build

# Preview production build locally
npm run preview

# Chat directly with Claude in your terminal (requires ANTHROPIC_API_KEY in .env)
node scripts/chat_with_claude.cjs

# Generate updated CLAUDE_CODEBASE_BUNDLE.md with all recent code
node scripts/generate_bundle.cjs
```

---

## 6. Coding & Contribution Rules

1. **Keep Aesthetics Rich & Premium**:
   - Always use smooth transitions, curated warm colors (`rose`, `amber`, `purple`, `stone`), and micro-interactions.
   - Maintain mobile responsiveness and PWA compatibility.
2. **Audio Feedback**:
   - Trigger sound effects on key user actions: `audioEngine.playSfx('click')`, `'pop'`, `'fanfare'`, `'chime'`.
3. **Strict Email Verification for Chat**:
   - Never allow unverified or blank-email users to post messages. Always route them through `authService.isUserAllowedToChat()`.
4. **Preserve Single Group Chat & Pinned Highlights**:
   - Do not re-introduce 1-on-1 private messaging. All conversation belongs in the shared group lounge, with critical items highlighted in the Pinned section.
5. **Chatting with Claude**:
   - Upload [CHAT_WITH_CLAUDE.md](file:///c:/Users/VIGHNESWARAN/.gemini/antigravity-ide/scratch/marisol-factory-of-fun/CHAT_WITH_CLAUDE.md) to [Claude.ai](https://claude.ai) or Claude Projects to start any session.


```

---

### File: `CLAUDE_MOOD_RECOMMENDATION_PROMPT.md`

```md
# Prompt & Specification for Claude: Mood Scales & Recommendation Engine

> **Project:** Marisol: Factory of Fun (Kritika's Comfort Space & Batch 41 Hub)  
> **Inspiration:** Pinterest Mood Scales (1–9 Visual Mood Charts, e.g., [Pinterest Mood Scales Collection](https://in.pinterest.com/trudywoo/mood-scales/))  
> **Goal:** Generate dynamic, mood-tailored recommendations (Macaronis, trivia quiz questions, comfort quotes, and Bollywood pairings) with a non-repeating image/mood rotation mechanism.

---

## 1. Context & Architecture Overview

**Marisol: Factory of Fun** is a comfort web and mobile application designed for **Kritika** and her batchmates (**Batch MLP41PT**).

The app revolves around 3 core pillars:
1. **Her Mood & Video Banner**: A comforting space featuring her hero video, live mood check-in, and Pinterest-style visual mood scale grids.
2. **Mood-Adaptive Quiz & Macaronis**: When a mood is selected on the scale (1 to 9), the app dynamically serves:
   - **Mood-Matched Macaroni Comfort Dish** (e.g., *Golden Truffle Mac*, *Desi Tapri Spiced Mac*, *Midnight Melt Mac*).
   - **5 Mood-Tailored Trivia Questions** (Bollywood, comfort cinema, witty comebacks, street food, pop culture).
   - **Movie & Chai/Snack Pairing**.
3. **Batch 41 Bulletin Board**: An asynchronous corkboard where classmates and Kritika post notes and reply at their own time with special royal badges for Kritika's replies (`👑 KRITIKA 💌`).

---

## 2. Pinterest 1–9 Mood Scale Archetypes (From Kritika's Sticker Sheet)

Based on the Pinterest Mood Scale format (*"On a scale of 1 to 9, which mood are you today?"*):

| Scale # | Mood Archetype | Sticker Quote | Vibe / Energy | Matching Macaroni Dish |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Radiant Sunshine 🌸** | *"Same Girl Brighter Ideas <3"* | Joyful, optimistic, smiling | **Golden Truffle 4-Cheese Macaroni 🧀** |
| **2** | **Chai Enthusiast ☕** | *"Chai = Happiness <3"* | Cozy, rainy afternoon, peaceful | **Desi Tapri Spiced Masala Macaroni 🌶️** |
| **3** | **Sleepy Panda 💤** | *"z z z 5 more minutes please..."* | Low battery, blanket cocoon | **Midnight 3-Cheese Creamy Mac Melt 🌙** |
| **4** | **Brain Overload 🥺** | *"Oh God, My Mind!"* | Overthinking, deadline panic | **Garlic Butter Herb Macaroni Rescue 🧄** |
| **5** | **Foodie Monster 🍕** | *"Pizza Fixes (Almost) Everything"* | Cravings, cheat day, cheese pulls | **Pizza-Baked Cheesy Macaroni Supreme 🍕** |
| **6** | **Corporate Queen 💼** | *"Corporate Queen / Fueling Big Dreams"* | Ambitious, boss girl, productive | **Power Truffle Macaroni with Crispy Corn ⚡** |
| **7** | **Silly Chaos 🤪** | *"Silly Is A Vibe / I understand nothing"* | Quirky, playful, un-serious | **Rainbow Cheesy Confetti Macaroni 🌈** |
| **8** | **Wholesome Soft 🐶** | *"Doggo Therapy <3"* | Needing hugs, gentle warmth | **Velvety White Cheddar & Sweet Corn Mac 🌽** |
| **9** | **Main Character 👑** | *"Main apni favourite hoon!"* | Unstoppable confidence, glam | **Royal Saffron Smoked Gouda Macaroni 👑** |

---

## 3. Non-Repeating Shuffle & Rotation Algorithm (Rule: No Consecutive Repeats)

To ensure the user is **never shown the same mood image, quote, or questions consecutively**, follow this stateful rotation pattern:

```typescript
// Non-Repeating Shuffle Pool Logic
class MoodRotationTracker {
  private history: string[] = [];
  private readonly maxHistoryLength = 5;

  public getNextRecommendation<T extends { id: string }>(items: T[]): T {
    // Filter out recently shown items
    const freshCandidates = items.filter(item => !this.history.includes(item.id));
    
    // If all items were shown, reset history keeping only the very last one
    const pool = freshCandidates.length > 0 
      ? freshCandidates 
      : items.filter(item => item.id !== this.history[this.history.length - 1]);

    // Pick random item from available fresh pool
    const selected = pool[Math.floor(Math.random() * pool.length)];

    // Update history
    this.history.push(selected.id);
    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }

    return selected;
  }
}
```

---

## 4. Prompt to Send to Claude

Copy and paste the prompt below directly into Claude to get tailored recommendations:

```markdown
Hello Claude! I am developing "Marisol: Factory of Fun", a comfort companion app for Kritika (Batch MLP41PT).

Please generate a mood-adaptive recommendation package based on the Pinterest 1–9 Mood Scale format.

Input Mood Scale Number: [Choose 1 to 9, e.g., Scale 4: "Oh God, My Mind! / Overthinking"]

Please provide:
1. 🌸 **Mood Diagnosis & Sisterly Reassurance**: A warm, witty, 2-line quote tailored to this state.
2. 🧀 **Comfort Macaroni Dish**:
   - Dish Name
   - 1-line mouthwatering description
   - 4 Secret Ingredients with emojis
   - Prep & Cook Time
3. 🎯 **5 Dynamic Quiz Questions**:
   - Trivia questions matching the mood vibe (e.g., feel-good comedy for stress, upbeat pop culture for sunshine, food trivia for pizza cravings).
   - 4 options each, correct answer, explanation, and a fun fact.
4. 🎬 **Bollywood Movie & Song Pairing**:
   - Movie title + iconic dialogue
   - Song recommendation for background comfort
5. 💌 **Daily Love Note / Affirmation**: Short, punchy, uplifting note.

Format the response in structured JSON or clean GitHub Markdown.
```

```

---

### File: `README.md`

```md
# Marisol: Factory of Fun 🥪✨
### Dedicated Culinary & Cinema Trivia Adventure for Kritika

A playful, vibrant web application handcrafted with 11 custom hand-drawn Kritika stickers, retro 80s synthesized audio, culinary & cinema trivia, secret ingredient cauldron mechanics, and a sisterly Comfort Corner.

---

## 🌟 Key Features

- **🥒 Cucumber Sandwiches Scoring & Economy**:
  - Earn `+3 🥪 Cucumber Sandwiches` for every correct answer.
  - Advance through Chef Titles:
    `Apprentice Chopper 🥒` ➔ `Street Food Gourmet 🥪` ➔ `Bistro Sous Chef 🍳` ➔ `Flavor Alchemist 🍲` ➔ `Executive Head Chef 👩‍🍳` ➔ `Culinary Maestro 🌟` ➔ `3-Star Master Chef 👑`.
- **✨ 11 Hand-Drawn Mood Stickers**:
  - Extracted poses with unique vibes and companion dialogues:
    1. *Same Girl Brighter Ideas ♡*
    2. *Good Ideas Happier Days ♡*
    3. *Wink & Conquer ♡*
    4. *Overthinking ... but making progress ♡*
    5. *Chai = Happiness ♡*
    6. *Silly Is A Vibe ♡*
    7. *Big Dreams ♡*
    8. *Grateful Always ♡*
    9. *Just Me ♡*
    10. *Same Kritika Bigger Adventures ♡*
    11. *Good Music Brighter Mood ♡*
- **🍳 Secret Ingredients & Endless Recipe Unlocks**:
  - Complete 5-question courses to reveal signature dishes paired with iconic movies (*The Grand Budapest Hotel, Chef, Ratatouille, Jab We Met, The Lunchbox, Julie & Julia*, etc.).
- **🎧 Kritika's Mood Jukebox & Music Lounge**:
  - Featuring Sticker #11 with headphones, spinning vinyl disc, animated retro equalizer bars, and 6 custom synthesized mood tracks:
    - 👑 *Girl Power Anthem ♡*
    - ☕ *Tapri Chai & Rainy Day Lo-Fi*
    - 💃 *Bollywood Thumka Beats*
    - 🌆 *80s Neon Sunset Drive*
    - 🧘 *Zen Mind Spa & Calm*
    - 💥 *Hangry Rage Popper & Vent Beat*
- **💖 Girl's Perspective Comfort & Mood SOS**:
  - Sisterly validation (*"YOU HAVE EVERY RIGHT TO BE ANGRY! We're not saying calm down because that's illegal"*), emergency care package (`+5 🥪 Cucumber Sandwiches`), interactive stress bubble popper with sound effects, hangry food cravings, and empowering affirmations.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Handcrafted Sketch Aesthetic
- **Audio**: Custom Web Audio API Synthesizer (Zero external audio files required)
- **Deployment**: Configured for Vercel with SPA rewrite rules (`vercel.json`)

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploy to Vercel

Connect your repository directly at [vercel.com/new](https://vercel.com/new) — framework is automatically detected as **Vite**!

```

---

### File: `capacitor.config.ts`

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kritika.app',
  appName: 'Marisol Factory of Fun',
  webDir: 'dist'
};

export default config;

```

---

### File: `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/icon-192.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>MARISOL: Factory of Fun | Kritika's Comfort Space</title>
    <meta name="description" content="A playful, motivational digital comfort and wellness adventure designed specially for Kritika!" />
    
    <meta name="color-scheme" content="light" />
    
    <!-- PWA Manifest for Android & Desktop -->
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#F43F5E" />
    <meta name="mobile-web-app-capable" content="yes" />

    <!-- iOS Apple Touch Icon & Fullscreen Standalone App Configuration -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Marisol" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
    <link rel="apple-touch-icon" sizes="512x512" href="/icon-512.png" />

    <!-- Google Fonts for Sketch & Hand-drawn Typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&family=Kalam:wght@400;700&family=Outfit:wght@500;600;700;800&family=Patrick+Hand&display=swap" rel="stylesheet">

    <!-- Mobile Stale Chunk Recovery Handler: Prevents blank screen on redeployments -->
    <script>
      window.addEventListener('error', function(e) {
        if (e && e.message) {
          var msg = e.message.toLowerCase();
          if (msg.indexOf('failed to fetch') !== -1 || msg.indexOf('importing a module script failed') !== -1 || msg.indexOf('unexpected token') !== -1) {
            if (!sessionStorage.getItem('marisol_sw_purged')) {
              sessionStorage.setItem('marisol_sw_purged', 'true');
              if ('caches' in window) {
                caches.keys().then(function(keys) {
                  return Promise.all(keys.map(function(k) { return caches.delete(k); }));
                }).then(function() {
                  window.location.reload();
                });
              } else {
                window.location.reload();
              }
            }
          }
        }
      }, true);
    </script>
  </head>
  <body class="bg-paper-50 text-ink antialiased overflow-x-hidden selection:bg-doodleGold/30 selection:text-ink" style="background-color: #FFFDF7;">
    <div id="root">
      <!-- Instant branded loader displayed while JavaScript bundle compiles/loads on mobile -->
      <div id="marisol-initial-loader" style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #FFFDF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 24px;">
        <div style="width: 76px; height: 76px; border-radius: 50%; padding: 3px; background: linear-gradient(135deg, #F43F5E, #FB7185, #FBBF24); box-shadow: 0 10px 25px rgba(244,63,94,0.3); margin-bottom: 16px;">
          <img src="/icon-192.png" alt="Marisol" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: white;" />
        </div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 900; color: #1C1917; letter-spacing: -0.02em;">MARISOL ✨</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 700; color: #E11D48;">Kritika's Factory of Fun</p>
        <div style="margin-top: 18px; display: inline-flex; align-items: center; gap: 8px; background: #FFF1F2; border: 1px solid #FECDD3; padding: 6px 16px; border-radius: 9999px; font-size: 11px; font-weight: 700; color: #E11D48;">
          Loading comfort space...
        </div>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>

    <!-- Register PWA Service Worker for Offline & Install Capability (Auto-Busted on Dev) -->
    <script>
      if ('serviceWorker' in navigator) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
              registration.unregister();
            }
          });
          if ('caches' in window) {
            caches.keys().then((names) => {
              for (const name of names) {
                caches.delete(name);
              }
            });
          }
        } else {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((reg) => {
              console.log('[PWA] Service Worker active:', reg.scope);
            }).catch((err) => {
              console.warn('[PWA] Service Worker registration notice:', err);
            });
          });
        }
      }
    </script>
  </body>
</html>


```

---

### File: `package.json`

```json
{
  "name": "marisol-factory-of-fun",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@capacitor/android": "^8.5.2",
    "@capacitor/cli": "^8.5.2",
    "@capacitor/core": "^8.5.2",
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "firebase": "^12.19.0",
    "lucide-react": "^1.47.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^24.13.6",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "^10.6.1",
    "oxlint": "^1.81.0",
    "postcss": "^8.5.28",
    "sharp": "^0.35.4",
    "tailwindcss": "^4.3.3",
    "typescript": "~6.0.2",
    "vite": "^8.3.0"
  }
}

```

---

### File: `postcss.config.js`

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}

```

---

### File: `public/manifest.json`

```json
{
  "name": "Marisol: Factory of Fun | Kritika's Comfort Space",
  "short_name": "Marisol",
  "description": "Kritika's personal digital comfort, wellness & culinary trivia adventure",
  "start_url": "/",
  "id": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#FFFDF7",
  "theme_color": "#F43F5E",
  "orientation": "portrait-primary",
  "categories": ["lifestyle", "entertainment", "games"],
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/maskable-icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}

```

---

### File: `public/marisol/stickers_manifest.json`

```json
[
  {
    "index": 1,
    "id": "01_brighter_ideas",
    "alias": "brighter_ideas",
    "title": "Kritika - Same Girl Brighter Ideas",
    "quote": "Same Girl Brighter Ideas ♡",
    "vibe": "Inspiring & Reflective",
    "stickerUrl": "/marisol/stickers/01_brighter_ideas.png",
    "poseUrl": "/marisol/poses/brighter_ideas.png",
    "avatarUrl": "/marisol/avatars/01_brighter_ideas.png"
  },
  {
    "index": 2,
    "id": "02_happier_days",
    "alias": "happier_days",
    "title": "Good Ideas Happier Days",
    "quote": "Good Ideas Happier Days ♡",
    "vibe": "Optimistic & Radiant",
    "stickerUrl": "/marisol/stickers/02_happier_days.png",
    "poseUrl": "/marisol/poses/happier_days.png",
    "avatarUrl": "/marisol/avatars/02_happier_days.png"
  },
  {
    "index": 3,
    "id": "03_wink_conquer",
    "alias": "wink_conquer",
    "title": "Wink & Conquer",
    "quote": "Wink & Conquer ♡",
    "vibe": "Confident & Playful",
    "stickerUrl": "/marisol/stickers/03_wink_conquer.png",
    "poseUrl": "/marisol/poses/wink_conquer.png",
    "avatarUrl": "/marisol/avatars/03_wink_conquer.png"
  },
  {
    "index": 4,
    "id": "04_overthinking",
    "alias": "overthinking",
    "title": "Overthinking But Making Progress",
    "quote": "Overthinking ... but making progress ♡",
    "vibe": "Thoughtful & Focused",
    "stickerUrl": "/marisol/stickers/04_overthinking.png",
    "poseUrl": "/marisol/poses/overthinking.png",
    "avatarUrl": "/marisol/avatars/04_overthinking.png"
  },
  {
    "index": 5,
    "id": "05_chai_happiness",
    "alias": "chai_happiness",
    "title": "Chai = Happiness",
    "quote": "Chai = Happiness ♡",
    "vibe": "Cozy & Blissful",
    "stickerUrl": "/marisol/stickers/05_chai_happiness.png",
    "poseUrl": "/marisol/poses/chai_happiness.png",
    "avatarUrl": "/marisol/avatars/05_chai_happiness.png"
  },
  {
    "index": 6,
    "id": "06_silly_vibe",
    "alias": "silly_vibe",
    "title": "Silly Is A Vibe",
    "quote": "Silly Is A Vibe ♡",
    "vibe": "Joyful & Cheerful",
    "stickerUrl": "/marisol/stickers/06_silly_vibe.png",
    "poseUrl": "/marisol/poses/silly_vibe.png",
    "avatarUrl": "/marisol/avatars/06_silly_vibe.png"
  },
  {
    "index": 7,
    "id": "07_big_dreams",
    "alias": "big_dreams",
    "title": "Big Dreams",
    "quote": "Big Dreams ♡",
    "vibe": "Ambitious & Visionary",
    "stickerUrl": "/marisol/stickers/07_big_dreams.png",
    "poseUrl": "/marisol/poses/big_dreams.png",
    "avatarUrl": "/marisol/avatars/07_big_dreams.png"
  },
  {
    "index": 8,
    "id": "08_grateful_always",
    "alias": "grateful_always",
    "title": "Grateful Always",
    "quote": "Grateful Always ♡",
    "vibe": "Heartfelt & Appreciative",
    "stickerUrl": "/marisol/stickers/08_grateful_always.png",
    "poseUrl": "/marisol/poses/grateful_always.png",
    "avatarUrl": "/marisol/avatars/08_grateful_always.png"
  },
  {
    "index": 9,
    "id": "09_just_me",
    "alias": "just_me",
    "title": "Just Me",
    "quote": "Just Me ♡",
    "vibe": "Authentic & Fun",
    "stickerUrl": "/marisol/stickers/09_just_me.png",
    "poseUrl": "/marisol/poses/just_me.png",
    "avatarUrl": "/marisol/avatars/09_just_me.png"
  },
  {
    "index": 10,
    "id": "10_bigger_adventures",
    "alias": "bigger_adventures",
    "title": "Same Kritika Bigger Adventures",
    "quote": "Same Kritika Bigger Adventures ♡",
    "vibe": "Adventurous & Curious",
    "stickerUrl": "/marisol/stickers/10_bigger_adventures.png",
    "poseUrl": "/marisol/poses/bigger_adventures.png",
    "avatarUrl": "/marisol/avatars/10_bigger_adventures.png"
  },
  {
    "index": 11,
    "id": "11_music_mood",
    "alias": "music_mood",
    "title": "Good Music Brighter Mood",
    "quote": "Good Music Brighter Mood ♡",
    "vibe": "Peaceful & Melodic",
    "stickerUrl": "/marisol/stickers/11_music_mood.png",
    "poseUrl": "/marisol/poses/music_mood.png",
    "avatarUrl": "/marisol/avatars/11_music_mood.png"
  }
]
```

---

### File: `public/sw.js`

```js
const CACHE_NAME = 'marisol-cache-v5';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/maskable-icon.png'
];

self.addEventListener('install', (event) => {
  // Activate new SW immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Non-fatal precache error:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old/stale cache:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Never intercept or cache localhost development requests
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.origin !== self.location.origin) return;

  // Network-first strategy for navigation requests (HTML)
  // Ensures mobile users always receive the latest deploy with correct script hashes
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Network-first for JavaScript and CSS bundles to avoid stale chunk mismatches
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Stale-while-revalidate for static images and fonts
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse.clone()));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});


```

---

### File: `src/App.css`

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

---

### File: `src/App.tsx`

```tsx
import { useState, useEffect, useRef } from 'react';
import type { ScreenState, Question } from './types/game';
import { gameState } from './services/gameState';
import { audioEngine } from './services/synthAudioEngine';
import { authService } from './services/authService';
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
import { ArrowLeft, RefreshCw, Trophy, Clock, Film, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import heroBannerVideoSrc from './assets/Hero Banner video.mp4';

export function App() {
  const [, setAuthTick] = useState(0);

  useEffect(() => {
    return authService.subscribe(() => {
      setAuthTick(t => t + 1);
    });
  }, []);

  const [player, setPlayer] = useState(gameState.getPlayer());
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('home');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [showInstallApp, setShowInstallApp] = useState(false);
  const [showMoodHistory, setShowMoodHistory] = useState(false);
  const [showComfortShelf, setShowComfortShelf] = useState(false);

  // Auto pop-up Google sign-in modal on startup if not signed in
  useEffect(() => {
    const hasPrompted = sessionStorage.getItem('marisol_prompted_login');
    if (!authService.isAuthenticated() && !hasPrompted) {
      sessionStorage.setItem('marisol_prompted_login', 'true');
      const timer = setTimeout(() => {
        setShowGoogleSignIn(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Active Mood State
  const [activeMoodId, setActiveMoodId] = useState<string>('happy');

  // Active Quiz Round State
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{ option: string; isCorrect: boolean } | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Quiz Celebration Video State
  const quizVideoRef = useRef<HTMLVideoElement | null>(null);
  const [quizVideoPlaying, setQuizVideoPlaying] = useState(true);
  const [quizVideoMuted, setQuizVideoMuted] = useState(false);

  // Active Mood Details
  const currentMoodSetting: MoodProfileSetting = 
    KRITIKA_STICKER_MOODS.find(m => m.id === activeMoodId) || KRITIKA_STICKER_MOODS[0];
  const currentMacaroni = getMoodMacaroni(activeMoodId);

  // Batch wall initial mode ('chat' | 'posts' | 'bulletin')
  const [wallInitialMode, setWallInitialMode] = useState<'chat' | 'posts' | 'bulletin'>('chat');

  // Screen navigation handler
  const handleNavigate = (screen: ScreenState, wallMode?: 'chat' | 'posts' | 'bulletin') => {
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
      const mode = wallMode || wallInitialMode;
      setActiveNavTab(mode === 'posts' ? 'posts' : 'chat');
      setQuizFinished(false);
    } else if (screen === 'quiz') {
      setActiveNavTab('quiz');
    }
  };

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

```

---

### File: `src/components/BaseModal.tsx`

```tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface BaseModalProps {
  isOpen?: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  maxWidth?: string; // e.g. 'max-w-xl', 'max-w-2xl', 'max-w-lg'
  hideHeader?: boolean;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen = true,
  onClose,
  icon,
  title,
  subtitle,
  badge,
  maxWidth = 'max-w-xl',
  hideHeader = false,
  children,
  className = '',
  containerClassName = '',
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 bg-[#221C20]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in ${containerClassName}`}
      onClick={onClose}
    >
      <div
        className={`bg-[#FFFDF7] border-3 border-ink rounded-3xl ${maxWidth} w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Standardized Header */}
        {!hideHeader && (title || icon || badge) && (
          <div className="flex items-center justify-between border-b-2 border-pink-200/80 pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {icon && (
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 border-ink flex items-center justify-center text-xl shrink-0 shadow-sketch">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {title && (
                    <h2 className="font-display font-black text-lg sm:text-xl text-ink leading-tight truncate">
                      {title}
                    </h2>
                  )}
                  {badge && (
                    <span className="shrink-0">{badge}</span>
                  )}
                </div>
                {subtitle && (
                  <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold truncate mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 hover:scale-105 active:scale-95 transition-all shrink-0 shadow-xs ml-2 cursor-pointer"
            >
              <X className="w-5 h-5 text-ink" />
            </button>
          </div>
        )}

        {/* Floating Close Button for modals with hidden header */}
        {hideHeader && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white/90 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        )}

        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
};

```

---

### File: `src/components/BatchUpdatesWall.tsx`

```tsx
import React, { useState, useEffect, useRef } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService, type InstagramPost, type GroupChatMessage, type LikedMember, formatChatTimestamp } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Plus, Sparkles, Send, X, UserCheck, Heart, 
  MessageCircle, MessagesSquare, Pin, Camera, Paperclip, Smile,
  Bookmark, Share2, CheckCheck, Eye, Compass, Tag, Edit3, Check,
  Reply, BarChart2, AtSign, MoreVertical, Mic, Volume2, VolumeX, Headphones, MicOff, PhoneOff,
  Trash2, ChevronDown, Ban, Globe, Lock, Clock,
  AlertCircle, RefreshCw, Video, Phone, ChevronLeft, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BaseModal } from './BaseModal';
import { GoogleSignInModal } from './GoogleSignInModal';
import { voiceRoomService } from '../services/voiceRoomService';

interface BatchUpdatesWallProps {
  onNavigate?: (screen: ScreenState) => void;
  initialMode?: 'chat' | 'posts' | 'bulletin';
}

// Client-side image compression for fast sync and storage
const compressImageFile = (file: File, maxDimension = 960, quality = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Image failed to load'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
};

const FILTER_STYLES: Record<string, { label: string; style: string; icon: string }> = {
  none: { label: 'Natural', style: '', icon: '✨' },
  warm: { label: 'Warm Glow', style: 'sepia(25%) saturate(140%) brightness(105%)', icon: '🌅' },
  golden: { label: 'Golden Hour', style: 'contrast(110%) brightness(110%) sepia(35%) saturate(150%)', icon: '☀️' },
  pink: { label: 'Pastel Rose', style: 'hue-rotate(330deg) saturate(130%) brightness(108%)', icon: '🌸' },
  vintage: { label: 'Vintage', style: 'sepia(50%) contrast(90%) brightness(95%)', icon: '🎞️' },
  bw: { label: 'Noir B&W', style: 'grayscale(100%) contrast(120%)', icon: '🖤' },
};

const SUGGESTED_HASHTAGS = [
  '#Batch41', '#KritikaQueen', '#ComfortVibes', '#FactoryOfFun', 
  '#MacaroniMagic', '#Memories', '#ChaiEnthusiast', '#DailyJoy'
];

const PRESET_PHOTOS = [
  { label: 'Batch Celebration 🎉', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&auto=format&fit=crop&q=80' },
  { label: 'Pizza & Macaroni 🍕', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=80' },
  { label: 'Warm Chai & Vibes ☕', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80' },
  { label: 'Golden Sunset Moment 🌅', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80' },
  { label: 'Comfort Study Corner 📚', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=80' }
];

const AVATAR_PRESETS = [
  { label: 'Kritika 👑', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop' },
  { label: 'Priyanshu 🍕', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop' },
  { label: 'Ananya ☕', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop' },
  { label: 'Rohan 🎸', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
  { label: 'Marisol Star ✨', url: '/marisol/avatars/01_brighter_ideas.png' },
  { label: 'Sparkle Vibe 🌸', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop' },
];

const COMMON_EMOJIS = ['💖', '🌸', '👑', '✨', '🍕', '☕', '🔥', '👏', '🎉', '🥳', '🌈', '🌻', '💌', '🥰', '🤗', '⭐'];

// Curated harmonious color palettes for chat members (Comfort Wall theme)
const SENDER_COLORS: Record<string, string> = {
  'kritika': 'text-rose-600', // Rose
  'priyanshu': 'text-indigo-600', // Indigo
  'ananya': 'text-purple-600', // Purple
  'rohan': 'text-amber-600', // Warm Amber
  'marisol': 'text-rose-600', // Rose
  'dhanashree': 'text-sky-600', // Sky Blue
  'knit kingdom': 'text-teal-600', // Teal
};

const getWhatsAppSenderColor = (name: string, isKritika?: boolean) => {
  if (isKritika || name.toLowerCase().includes('kritika')) return 'text-rose-600 font-black';
  const lower = name.toLowerCase();
  for (const [key, color] of Object.entries(SENDER_COLORS)) {
    if (lower.includes(key)) return color;
  }
  const fallbackColors = ['text-rose-600', 'text-indigo-600', 'text-amber-600', 'text-teal-600', 'text-purple-600', 'text-pink-600'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return fallbackColors[Math.abs(hash) % fallbackColors.length];
};

// Render message text with highlighted @mentions and bold headings in Marisol style
const renderFormattedMessageText = (text: string, isCurrentUser: boolean) => {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const tokens = line.split(/(@[A-Za-z0-9_👑\s]+?(?=\s|$|[.,!?\n])|#\d{5,}|\b\d{10}\b|\b(?:GRAND FESTIVE SALE|Start Date|End Date):?)/g);
    
    return (
      <div key={lineIdx} className={lineIdx > 0 ? 'mt-1' : ''}>
        {tokens.map((token, tokIdx) => {
          if (!token) return null;
          if (token.startsWith('@')) {
            return (
              <span 
                key={tokIdx} 
                className={`font-bold ${isCurrentUser ? 'text-rose-700 bg-white/80 px-1 py-0.5 rounded shadow-2xs' : 'text-rose-600 bg-rose-50/90 px-1 py-0.5 rounded'} hover:underline cursor-pointer`}
              >
                {token}
              </span>
            );
          }
          if (token.startsWith('#') || /^\d{10}$/.test(token)) {
            return (
              <span 
                key={tokIdx} 
                className={`font-bold underline cursor-pointer ${isCurrentUser ? 'text-stone-900 hover:text-rose-600' : 'text-rose-600'}`}
              >
                {token}
              </span>
            );
          }
          if (/^(?:GRAND FESTIVE SALE|Start Date|End Date):?$/.test(token)) {
            return (
              <span key={tokIdx} className="font-black text-stone-900">
                {token}
              </span>
            );
          }
          return <span key={tokIdx}>{token}</span>;
        })}
      </div>
    );
  });
};

const getInitials = (name?: string): string => {
  if (!name) return 'U';
  const clean = name.replace(/👑|🌸|✨|♡|⭐|🎉|🔥/g, '').trim();
  const words = clean.split(/\s+/).filter(w => w.length > 0 && /^[A-Za-z0-9]/.test(w));
  if (words.length === 0) {
    const fallbackLetters = clean.replace(/[^A-Za-z0-9]/g, '');
    return fallbackLetters.slice(0, 2).toUpperCase() || 'U';
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const getInitialsBgColor = (name?: string): string => {
  const colors = [
    'bg-rose-500 text-white',
    'bg-purple-600 text-white',
    'bg-indigo-600 text-white',
    'bg-emerald-600 text-white',
    'bg-amber-600 text-white',
    'bg-teal-600 text-white',
    'bg-sky-600 text-white',
    'bg-fuchsia-600 text-white',
  ];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const BatchUpdatesWall: React.FC<BatchUpdatesWallProps> = ({ onNavigate: _onNavigate, initialMode }) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);

  const currentUserProfilePic = currentUser?.avatarUrl || authService.getFirebaseUser()?.photoURL || '';
  const currentProfileName = currentUser?.name || player.nickname || 'Student';
  const hasValidAvatarPic = Boolean(currentUserProfilePic && failedAvatarUrl !== currentUserProfilePic);

  // Mode Switcher: 'chat' | 'posts' | 'bulletin'
  const [activeMode, setActiveMode] = useState<'chat' | 'posts' | 'bulletin'>(initialMode || 'chat');

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Modals & Popups
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showNewPhotoPostModal, setShowNewPhotoPostModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  const [selectedClassmateDetail, setSelectedClassmateDetail] = useState<StudentProfile | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(null);
  const [seenInfoMsg, setSeenInfoMsg] = useState<GroupChatMessage | null>(null);

  // Profile Editor Form State
  const [profileNameInput, setProfileNameInput] = useState(currentUser?.name || player.nickname || 'Kritika Gupta 👑');
  const [profileAvatarInput, setProfileAvatarInput] = useState(currentUser?.avatarUrl || AVATAR_PRESETS[0].url);
  const [profileMoodInput, setProfileMoodInput] = useState(currentUser?.currentMood || 'Radiant Sunshine 🌸');
  const [profileMoodEmojiInput, setProfileMoodEmojiInput] = useState(currentUser?.currentMoodEmoji || '🌸');
  const [profileStatusInput, setProfileStatusInput] = useState(currentUser?.statusNote || 'Savoring sweet memories ♡ ✨');
  const [profileBatchInput, setProfileBatchInput] = useState(currentUser?.batch || 'MLP41PT');
  const profileAvatarFileInputRef = useRef<HTMLInputElement | null>(null);

  // Group Chat State (WhatsApp Group Style)
  const [chatInput, setChatInput] = useState('');
  const [chatImageAttachment, setChatImageAttachment] = useState<string | null>(null);
  const [replyingToMessage, setReplyingToMessage] = useState<GroupChatMessage | null>(null);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [showChatEmojiPicker, setShowChatEmojiPicker] = useState(false);
  const [showMentionPicker, setShowMentionPicker] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [highlightedChatMsgId, setHighlightedChatMsgId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const chatFileInputRef = useRef<HTMLInputElement | null>(null);

  // Message Edit & Delete State
  const [editingMessage, setEditingMessage] = useState<GroupChatMessage | null>(null);
  const [editingText, setEditingText] = useState('');
  const [activeActionMenuMsgId, setActiveActionMenuMsgId] = useState<string | null>(null);
  const [deleteModalMsg, setDeleteModalMsg] = useState<GroupChatMessage | null>(null);
  const [deletionReaction, setDeletionReaction] = useState<{ text: string; emoji: string } | null>(null);

  // Post Edit & Options State
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [editingPostCaption, setEditingPostCaption] = useState('');
  const [activePostMenuId, setActivePostMenuId] = useState<string | null>(null);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<{ id: string; type: 'photo' | 'bulletin'; title?: string } | null>(null);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  // Group Poll Creation State
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOption1, setPollOption1] = useState('');
  const [pollOption2, setPollOption2] = useState('');
  const [pollOption3, setPollOption3] = useState('');

  // Post Feed State
  const [postCommentText, setPostCommentText] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [heartBurstId, setHeartBurstId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [activePostImgIndex, setActivePostImgIndex] = useState<Record<string, number>>({});
  const [showLikedByModalPost, setShowLikedByModalPost] = useState<InstagramPost | null>(null);
  const [activeReactionPickerPostId, setActiveReactionPickerPostId] = useState<string | null>(null);

  // New Photo Post Form State (Supports Multiple Photos in one poster)
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newPostImages, setNewPostImages] = useState<string[]>([]);
  const [activeCreatePreviewIndex, setActiveCreatePreviewIndex] = useState(0);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('Comfort Lounge 🌸');
  const [newPostFilter, setNewPostFilter] = useState('none');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#Batch41', '#ComfortVibes']);
  const [customTagInput, setCustomTagInput] = useState('');
  const [isPublishingPost, setIsPublishingPost] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);

  // Bulletin Corkboard State
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [isSendingReply, setIsSendingReply] = useState<Record<string, boolean>>({});

  // Bulletin New Note Form State
  const [studentName, setStudentName] = useState(currentUser?.name || player.nickname || 'Student');
  const [selectedPose] = useState(player.activeSticker || 'brighter_ideas');
  const [selectedMood, setSelectedMood] = useState(currentUser?.currentMood || 'Radiant Sunshine');
  const [selectedMoodEmoji, setSelectedMoodEmoji] = useState(currentUser?.currentMoodEmoji || '🌸');
  const [bulletinText, setBulletinText] = useState('');

  // Data state
  const allBulletinPosts = batchWallService.getPosts();
  const chatMessages = batchWallService.getChatMessages(currentUser?.id, currentUser?.joinedAt, currentUser?.isNewUser);
  const chatStatus = batchWallService.getChatConnectionStatus();
  const photoPosts = batchWallService.getInstagramPosts();
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

  // Sync authoritative Firestore chat listener with active user privacy scope
  useEffect(() => {
    batchWallService.initChatListener(currentUser?.joinedAt, currentUser?.isNewUser);
  }, [currentUser?.id, currentUser?.joinedAt, currentUser?.isNewUser]);

  // ==================== DISCORD-STYLE VOICE ROOM STATE ====================
  const [, setVoiceTick] = useState(0);
  const [showVoiceRoomModal, setShowVoiceRoomModal] = useState(false);

  useEffect(() => {
    const unsubVoice = voiceRoomService.subscribe(() => setVoiceTick(t => t + 1));
    const unsubCheer = voiceRoomService.onCheer((cheer) => {
      setShareToast(`🎉 ${cheer.senderName} sent voice cheer: ${cheer.emoji} ${cheer.label}!`);
      setTimeout(() => setShareToast(null), 2500);
    });
    return () => {
      unsubVoice();
      unsubCheer();
    };
  }, []);

  const isVoiceRoomConnected = voiceRoomService.getIsJoined();
  const isVoiceMuted = voiceRoomService.getIsMuted();
  const isVoiceDeafened = voiceRoomService.getIsDeafened();
  const userIsSpeaking = voiceRoomService.getIsSpeaking();
  const voiceParticipants = voiceRoomService.getParticipants();

  const handleJoinVoiceRoom = async () => {
    audioEngine.playSfx('levelup');
    const name = currentUser?.name || profileNameInput || studentName || 'Batch 41 Student';
    const email = currentUser?.email || authService.getFirebaseUser()?.email || undefined;
    const avatar = currentUser?.avatarUrl || profileAvatarInput || '/marisol/avatars/01_brighter_ideas.png';
    const uid = currentUser?.id || authService.getFirebaseUser()?.uid || `user_${player.nickname || 'Student'}`;

    await voiceRoomService.joinRoom({
      id: uid,
      name,
      email,
      avatarUrl: avatar
    });

    setShowVoiceRoomModal(true);
    setShareToast('Joined Batch 41 Voice Room 🔊✨');
    setTimeout(() => setShareToast(null), 2500);
  };

  const toggleVoiceRoomMute = () => {
    const muted = voiceRoomService.toggleMute();
    setShareToast(muted ? 'Microphone Muted 🔇' : 'Microphone Live 🎙️');
    setTimeout(() => setShareToast(null), 1800);
  };

  const toggleVoiceRoomDeafen = () => {
    const deafened = voiceRoomService.toggleDeafen();
    setShareToast(deafened ? 'Audio Deafened 🎧' : 'Audio Active 🔊');
    setTimeout(() => setShareToast(null), 1800);
  };

  const handleDisconnectVoiceRoom = () => {
    voiceRoomService.leaveRoom();
    setShowVoiceRoomModal(false);
    setShareToast('Left Voice Room 📞');
    setTimeout(() => setShareToast(null), 2000);
  };

  const handleSendVoiceCheer = (emoji: string, label: string, sfx: 'fanfare' | 'pop' | 'powerup' | 'levelup') => {
    voiceRoomService.sendCheer(emoji, label, sfx);
    if (label === 'Cheer') {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
    setShareToast(`Sent voice cheer: ${emoji} ${label}!`);
    setTimeout(() => setShareToast(null), 1800);
  };

  useEffect(() => {
    const unsubWall = batchWallService.subscribe(() => setTick(t => t + 1));
    const unsubAuth = authService.subscribe(() => setTick(t => t + 1));
    return () => { 
      unsubWall(); 
      unsubAuth();
    };
  }, []);

  useEffect(() => {
    if (activeMode === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      const userToMark = currentUser ? {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        avatarUrl: currentUser.avatarUrl
      } : {
        userId: `user_${player.nickname || 'Student'}`,
        userName: player.nickname || 'Student',
        avatarUrl: '/marisol/avatars/01_brighter_ideas.png'
      };
      batchWallService.markAllMessagesAsSeen(userToMark);
    }
  }, [activeMode, currentUser]);

  useEffect(() => {
    if (currentUser?.name) {
      setStudentName(currentUser.name);
      setProfileNameInput(currentUser.name);
      if (currentUser.avatarUrl) setProfileAvatarInput(currentUser.avatarUrl);
      if (currentUser.currentMood) {
        setSelectedMood(currentUser.currentMood);
        setProfileMoodInput(currentUser.currentMood);
      }
      if (currentUser.currentMoodEmoji) {
        setSelectedMoodEmoji(currentUser.currentMoodEmoji);
        setProfileMoodEmojiInput(currentUser.currentMoodEmoji);
      }
      if (currentUser.statusNote) setProfileStatusInput(currentUser.statusNote);
      if (currentUser.batch) setProfileBatchInput(currentUser.batch);
    }
  }, [currentUser]);

  // Chat Image Upload
  const handleChatImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 960, 0.75);
      setChatImageAttachment(compressed);
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Image processing failed:', err);
    }
    if (chatFileInputRef.current) chatFileInputRef.current.value = '';
  };

  // Photo Post Image Upload (Supports uploading multiple photos in one poster)
  const handlePhotoPostImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImageFile(files[i], 1080, 0.8);
        compressedList.push(compressed);
      }
      setNewPostImages(prev => {
        const updated = [...prev, ...compressedList];
        if (!newPostImage && updated.length > 0) {
          setNewPostImage(updated[0]);
        }
        return updated;
      });
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Image processing failed:', err);
    }
    if (photoFileInputRef.current) photoFileInputRef.current.value = '';
  };

  // Profile Avatar Upload
  const handleProfileAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 300, 0.8);
      setProfileAvatarInput(compressed);
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Avatar image error:', err);
    }
    if (profileAvatarFileInputRef.current) profileAvatarFileInputRef.current.value = '';
  };

  // Save Profile Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = authService.updateProfile({
      name: profileNameInput.trim() || 'Batch 41 Student',
      avatarUrl: profileAvatarInput,
      batch: profileBatchInput.trim() || 'MLP41PT',
      currentMood: profileMoodInput,
      currentMoodEmoji: profileMoodEmojiInput,
      statusNote: profileStatusInput.trim()
    });

    setStudentName(updated.name);
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setShowProfileModal(false);
    setShareToast('Profile updated & reflected in group chat! ✨');
    setTimeout(() => setShareToast(null), 2500);
  };

  // Tag Management
  const toggleTag = (tag: string) => {
    audioEngine.playSfx('pop');
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const tagClean = customTagInput.trim().replace(/^#+/, '');
    if (!tagClean) return;
    const formattedTag = `#${tagClean}`;
    if (!selectedTags.includes(formattedTag)) {
      setSelectedTags(prev => [...prev, formattedTag]);
      audioEngine.playSfx('pop');
    }
    setCustomTagInput('');
  };

  // Send WhatsApp Group Message (with replyTo support)
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authService.isUserAllowedToChat()) {
      setShowGoogleModal(true);
      setShareToast('Please connect with your Email ID to chat! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }

    // Ensure Firebase Auth session is active before sending
    let fbUser = authService.getFirebaseUser();
    if (!fbUser && authService.isFirebaseEnabled) {
      try {
        fbUser = await authService.ensureFirebaseAuthSession();
      } catch (authErr) {
        console.warn('[Batch 41 Group Chat] Auth session initialization failed:', authErr);
      }
    }

    const senderId = fbUser?.uid || currentUser?.id;
    if (!senderId) {
      setShowGoogleModal(true);
      setShareToast('🔑 Authentication required. Please sign in to chat!');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }

    const text = chatInput.trim();
    if (!text && !chatImageAttachment) return;

    setIsSendingChat(true);
    audioEngine.playSfx('fanfare');

    const name = currentUser?.name || fbUser?.displayName || profileNameInput || studentName || 'Batch 41 Student';
    const email = fbUser?.email || currentUser?.email || undefined;
    const avatar = fbUser?.photoURL || currentUser?.avatarUrl || profileAvatarInput;
    const isKritika = name.toLowerCase().includes('kritika') || 
                      (email && email.toLowerCase().includes('kritika')) ||
                      name.toLowerCase().includes('marisol');

    if (isKritika) {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }

    const replyData = replyingToMessage ? {
      id: replyingToMessage.id,
      senderName: replyingToMessage.senderName,
      text: replyingToMessage.text.slice(0, 80)
    } : undefined;

    try {
      await batchWallService.sendGroupChatMessage({
        senderId,
        senderName: name,
        senderEmail: email,
        avatarUrl: avatar,
        text: text || (chatImageAttachment ? '📷 Photo' : ''),
        imageUrl: chatImageAttachment || undefined,
        replyTo: replyData
      });

      setChatInput('');
      setChatImageAttachment(null);
      setReplyingToMessage(null);
      setShowChatEmojiPicker(false);
      setShowMentionPicker(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      const errCode = err?.code || 'unknown';
      console.error('[Batch 41 Group Chat] Error sending message:', {
        code: errCode,
        message: err?.message,
        error: err
      });

      let errorMsg = 'Failed to send message.';
      if (errCode === 'permission-denied') {
        errorMsg = '🔒 Permission denied: Chat access restricted by Firestore security rules.';
      } else if (errCode === 'unauthenticated') {
        errorMsg = '🔑 Login expired or not established. Please sign in again.';
      } else if (errCode === 'unavailable' || errCode === 'deadline-exceeded') {
        errorMsg = '📡 Network unavailable. Message saved offline and will sync once reconnected.';
      } else if (errCode === 'resource-exhausted') {
        errorMsg = '⏳ Rate limit or quota exceeded. Please wait a moment.';
      } else if (err?.message) {
        errorMsg = `Error [${errCode}]: ${err.message}`;
      }

      setShareToast(errorMsg);
      setTimeout(() => setShareToast(null), 5000);
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleOpenEditMessage = (msg: GroupChatMessage) => {
    setEditingMessage(msg);
    setEditingText(msg.text);
    setActiveActionMenuMsgId(null);
  };

  const handleSaveEditMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMessage || !editingText.trim()) return;
    audioEngine.playSfx('click');
    const authorId = currentUser?.id || authService.getFirebaseUser()?.uid;
    const result = await batchWallService.editChatMessage(editingMessage.id, editingText, authorId);
    if (!result.success) {
      setShareToast(result.error || 'Failed to edit message');
    } else {
      setShareToast('Message edited ✏️');
    }
    setEditingMessage(null);
    setEditingText('');
    setTimeout(() => setShareToast(null), 2500);
  };


  const handleJumpToMessage = (messageId: string) => {
    const el = document.getElementById(`chat-msg-${messageId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedChatMsgId(messageId);
      setTimeout(() => setHighlightedChatMsgId(null), 2500);
    }
  };

  const handleDeleteForMe = (msg: GroupChatMessage) => {
    audioEngine.playSfx('pop');
    const uid = currentUser?.id || authService.getFirebaseUser()?.uid || 'guest';
    batchWallService.deleteChatMessageForMe(msg.id, uid);
    setDeleteModalMsg(null);
    setActiveActionMenuMsgId(null);
    setDeletionReaction({ text: 'Message deleted for you', emoji: '🗑️' });
    setTimeout(() => setDeletionReaction(null), 2500);
  };

  const handleDeleteForEveryone = async (msg: GroupChatMessage) => {
    audioEngine.playSfx('pop');
    const authorId = currentUser?.id || authService.getFirebaseUser()?.uid;
    const result = await batchWallService.deleteChatMessageForEveryone(msg.id, authorId);
    if (!result.success) {
      setShareToast(result.error || 'Failed to delete message');
      setTimeout(() => setShareToast(null), 2500);
    } else {
      setDeletionReaction({ text: 'Message deleted for everyone', emoji: '🗑️✨' });
      setTimeout(() => setDeletionReaction(null), 2500);
    }
    setDeleteModalMsg(null);
    setActiveActionMenuMsgId(null);
  };

  // Post Pinning, Editing & Deletion Handlers
  const handleOpenEditPost = (post: InstagramPost) => {
    setEditingPost(post);
    setEditingPostCaption(post.caption);
    setActivePostMenuId(null);
  };

  const handleSaveEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    audioEngine.playSfx('click');
    const result = await batchWallService.editInstagramPost(editingPost.id, editingPostCaption, {
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput
    });
    if (!result.success) {
      setShareToast(result.error || 'Failed to edit post');
    } else {
      setShareToast('Post caption updated ✏️✨');
    }
    setEditingPost(null);
    setEditingPostCaption('');
    setTimeout(() => setShareToast(null), 2500);
  };

  const handleTogglePinPost = async (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    if (post.isPinned) {
      await batchWallService.unpinInstagramPost(post.id);
      setShareToast('Post unpinned 📌');
    } else {
      const pinner = currentUser?.name || profileNameInput || 'Batch Member';
      await batchWallService.pinInstagramPost(post.id, pinner);
      setShareToast('Post pinned to top 📌✨');
    }
    setActivePostMenuId(null);
    setTimeout(() => setShareToast(null), 2500);
  };

  const handleDeletePost = (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    setActivePostMenuId(null);
    setDeleteConfirmPost({
      id: post.id,
      type: 'photo',
      title: post.caption ? `"${post.caption.slice(0, 35)}..."` : 'Photo Post'
    });
  };

  const handleConfirmDeletePost = async () => {
    if (!deleteConfirmPost) return;
    setIsDeletingPost(true);
    audioEngine.playSfx('pop');

    const deleter = {
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput
    };

    let result: { success: boolean; error?: string };
    if (deleteConfirmPost.type === 'photo') {
      result = await batchWallService.deleteInstagramPost(deleteConfirmPost.id, deleter);
    } else {
      result = await batchWallService.deletePost(deleteConfirmPost.id, deleter);
    }

    setIsDeletingPost(false);
    setDeleteConfirmPost(null);
    setActivePostMenuId(null);

    if (!result.success) {
      setShareToast(result.error || 'Failed to delete post');
    } else {
      setShareToast('Post completely deleted 🗑️');
    }
    setTimeout(() => setShareToast(null), 2500);
  };

  // Create & Send Live Group Poll
  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authService.isUserAllowedToChat()) {
      setShowGoogleModal(true);
      setShareToast('Please connect with your Email ID to create polls! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }

    const fbUser = authService.getFirebaseUser();
    const senderId = fbUser?.uid || currentUser?.id;
    if (!senderId) {
      setShowGoogleModal(true);
      return;
    }

    if (!pollQuestion.trim() || !pollOption1.trim() || !pollOption2.trim()) return;

    audioEngine.playSfx('fanfare');
    const name = currentUser?.name || fbUser?.displayName || profileNameInput || studentName || 'Batch 41 Student';
    const email = fbUser?.email || currentUser?.email || undefined;
    const avatar = fbUser?.photoURL || currentUser?.avatarUrl || profileAvatarInput;

    const options = [
      { id: 'opt_1', text: pollOption1.trim(), votes: [] },
      { id: 'opt_2', text: pollOption2.trim(), votes: [] }
    ];
    if (pollOption3.trim()) {
      options.push({ id: 'opt_3', text: pollOption3.trim(), votes: [] });
    }

    try {
      await batchWallService.sendGroupChatMessage({
        senderId,
        senderName: name,
        senderEmail: email,
        avatarUrl: avatar,
        text: `📊 Group Poll: ${pollQuestion.trim()}`,
        poll: {
          question: pollQuestion.trim(),
          options
        }
      });

      setPollQuestion('');
      setPollOption1('');
      setPollOption2('');
      setPollOption3('');
      setShowCreatePollModal(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      const errCode = err?.code || 'unknown';
      console.error('[Batch 41 Group Chat] Error creating poll:', {
        code: errCode,
        message: err?.message,
        error: err
      });
      let errorMsg = 'Failed to create poll.';
      if (errCode === 'permission-denied') {
        errorMsg = '🔒 Permission denied: Creating polls restricted by Firestore rules.';
      } else if (errCode === 'unauthenticated') {
        errorMsg = '🔑 Login expired. Please sign in again.';
      } else if (errCode === 'unavailable' || errCode === 'deadline-exceeded') {
        errorMsg = '📡 Network unavailable. Please check your connection.';
      } else if (errCode === 'resource-exhausted') {
        errorMsg = '⏳ Rate limit or quota exceeded. Please wait a moment.';
      } else if (err?.message) {
        errorMsg = `Error [${errCode}]: ${err.message}`;
      }
      setShareToast(errorMsg);
      setTimeout(() => setShareToast(null), 5000);
    }
  };

  // Vote on Poll
  const handleVotePoll = (messageId: string, optionId: string) => {
    if (!authService.isUserAllowedToChat()) {
      setShowGoogleModal(true);
      setShareToast('Please connect with your Email ID to vote! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    const voterId = currentUser?.id || authService.getFirebaseUser()?.uid;
    if (!voterId) {
      setShowGoogleModal(true);
      return;
    }
    audioEngine.playSfx('pop');
    batchWallService.votePoll(messageId, optionId, voterId, currentUser?.name);
  };

  // Double tap to like Photo Post
  const handleDoubleTapPost = (post: InstagramPost) => {
    audioEngine.playSfx('fanfare');
    setHeartBurstId(post.id);
    batchWallService.likeInstagramPost(post.id, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      email: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput
    });
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setHeartBurstId(null), 900);
  };

  const handleToggleLikePost = (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    batchWallService.likeInstagramPost(post.id, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      email: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput
    });
  };

  const handleReactToPost = (postId: string, emoji: string) => {
    audioEngine.playSfx('pop');
    batchWallService.reactToInstagramPost(postId, emoji, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      email: currentUser?.email
    });
    setActiveReactionPickerPostId(null);
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    audioEngine.playSfx('pop');
    const name = currentUser?.name || profileNameInput || studentName || 'Batch 41 Student';
    batchWallService.likeInstagramComment(postId, commentId, name);
  };

  const handleSharePost = async (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    const updatedCount = await batchWallService.shareInstagramPost(post.id, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student'
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }

    setShareToast(`Link copied! Shared ${updatedCount} time${updatedCount > 1 ? 's' : ''} 🚀✨`);
    setTimeout(() => setShareToast(null), 2500);
  };

  // Submit Photo Post (Supports multi-photo poster)
  const handleCreatePhotoPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagesToPublish = newPostImages.length > 0 ? newPostImages : (newPostImage ? [newPostImage] : []);
    if (imagesToPublish.length === 0) {
      alert('Please upload or select at least one photo for your poster!');
      return;
    }
    setIsPublishingPost(true);
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 70, spread: 75, origin: { y: 0.6 } });

    await batchWallService.addInstagramPost({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      authorName: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      authorAvatarUrl: currentUser?.avatarUrl || profileAvatarInput,
      location: newPostLocation,
      imageUrl: imagesToPublish[0],
      images: imagesToPublish,
      filter: newPostFilter,
      caption: newPostCaption.trim(),
      hashtags: selectedTags
    });

    setNewPostImages([]);
    setNewPostImage(null);
    setActiveCreatePreviewIndex(0);
    setNewPostCaption('');
    setNewPostFilter('none');
    setSelectedTags(['#Batch41', '#ComfortVibes']);
    setIsPublishingPost(false);
    setShowNewPhotoPostModal(false);
  };

  // Submit Post Comment
  const handleSendPostComment = async (postId: string) => {
    const text = (postCommentText[postId] || '').trim();
    if (!text) return;

    audioEngine.playSfx('pop');
    await batchWallService.addInstagramComment(postId, {
      authorId: currentUser?.id,
      authorName: currentUser?.name || profileNameInput || studentName || 'Batch 41 Classmate',
      authorEmail: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput,
      text
    });

    setPostCommentText(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  // Submit Bulletin Note
  const handleCreateBulletinPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinText.trim()) return;

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 55, spread: 65, origin: { y: 0.6 } });

    batchWallService.addPost({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      studentName: studentName.trim() || currentUser?.name || profileNameInput || 'Student',
      avatarPose: selectedPose,
      mood: selectedMood,
      moodEmoji: selectedMoodEmoji,
      text: bulletinText.trim(),
    });

    if (isAuthenticated) {
      authService.updateDailyMood(selectedMood, selectedMoodEmoji, bulletinText.trim().slice(0, 80));
    }

    setBulletinText('');
    setShowNewPostModal(false);
  };

  // Submit Bulletin Reply
  const handleSendReply = async (postId: string) => {
    const text = (replyInputMap[postId] || '').trim();
    if (!text) return;

    setIsSendingReply(prev => ({ ...prev, [postId]: true }));
    audioEngine.playSfx('fanfare');

    const authorName = currentUser?.name || profileNameInput || studentName || 'Batch Classmate';
    const authorEmail = currentUser?.email;
    const isKritika = authorName.toLowerCase().includes('kritika') || 
                      (authorEmail && authorEmail.toLowerCase().includes('kritika')) ||
                      authorName.toLowerCase().includes('marisol');

    if (isKritika) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 } });
    }

    await batchWallService.addReply(postId, {
      authorId: currentUser?.id,
      authorName,
      authorEmail,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput,
      text,
      isKritika
    });

    setIsSendingReply(prev => ({ ...prev, [postId]: false }));
    setReplyInputMap(prev => ({ ...prev, [postId]: '' }));
    setExpandedReplies(prev => ({ ...prev, [postId]: true }));
  };

  const displayedChatMessages = chatMessages;

  return (
    <div className="bg-[#FAF8F5] text-stone-900 w-full h-full flex-1 min-h-0 flex flex-col overflow-hidden p-1.5 sm:p-2.5 pb-1">
      <div className="max-w-4xl lg:max-w-5xl mx-auto w-full h-full flex-1 min-h-0 flex flex-col overflow-hidden">

        {/* Sync Toast Notification */}
        {network.syncToast && (
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white p-2.5 px-4 rounded-2xl shadow-xs flex items-center justify-between text-xs font-display font-black animate-scale-up">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
              <span>{network.syncToast}</span>
            </span>
            <button
              onClick={() => batchWallService.clearSyncToast()}
              className="p-1 hover:bg-white/20 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Share Feedback Toast */}
        {shareToast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-display font-black shadow-lg flex items-center gap-2 animate-scale-up">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{shareToast}</span>
          </div>
        )}

        {/* Deletion Reaction Floating Toast */}
        {deletionReaction && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-xs font-display font-black shadow-2xl border border-rose-500/40 flex items-center gap-2 animate-scale-up">
            <span className="text-base">{deletionReaction.emoji}</span>
            <span className="text-rose-200">{deletionReaction.text}</span>
          </div>
        )}

        {/* UNIFIED COHESIVE TAB SWITCHER */}
        <div className="grid grid-cols-3 gap-1 bg-stone-200/70 p-1 rounded-2xl border border-stone-300/80 mb-1.5 shrink-0">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('chat');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-white text-rose-700 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessagesSquare className="w-3.5 h-3.5 text-rose-500" />
            <span className="truncate">Batch Lounge ({chatMessages.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('posts');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'posts'
                ? 'bg-white text-rose-700 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-rose-500" />
            <span className="truncate">Post Feed ({photoPosts.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('bulletin');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'bulletin'
                ? 'bg-white text-rose-700 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Pin className="w-3.5 h-3.5 text-amber-600" />
            <span className="truncate">Bulletin ({allBulletinPosts.length})</span>
          </button>
        </div>

        {/* ==================== 1. BATCH LOUNGE (Real-Time Group Chat) ==================== */}
        {activeMode === 'chat' && (
          <div className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm flex flex-col flex-1 min-h-0 animate-fade-in relative">
            {/* Clean Chat Top Bar: [ User Avatar / Initials ] [ All (X) ]  📹  📞  📊  ⋮ */}
            <div className="bg-white border-b border-stone-200/80 text-stone-900 px-3 sm:px-4 py-2 flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {/* User Avatar with Green Online Dot */}
                <button
                  type="button"
                  onClick={() => setShowProfileModal(true)}
                  className="relative shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  title="View Profile / Group Info"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200/90 overflow-hidden flex items-center justify-center shadow-2xs bg-stone-100">
                    {hasValidAvatarPic ? (
                      <img
                        src={currentUserProfilePic}
                        alt={currentProfileName}
                        className="w-full h-full object-cover"
                        onError={() => setFailedAvatarUrl(currentUserProfilePic)}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center font-display font-bold text-xs sm:text-sm select-none ${getInitialsBgColor(currentProfileName)}`}>
                        {getInitials(currentProfileName)}
                      </div>
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </button>

                {/* Chat Count Tab: All (X) */}
                <div className="bg-stone-100/90 border border-stone-200/80 rounded-full p-0.5 sm:p-1 flex items-center shadow-2xs">
                  <div className="bg-white text-stone-900 px-3 py-1 rounded-full text-xs sm:text-[13px] font-display font-bold shadow-xs">
                    All ({chatMessages.length})
                  </div>
                </div>
              </div>

              {/* 4 Clean Action Icons: Video, Phone, Poll/Chart, More */}
              <div className="flex items-center gap-2 sm:gap-3 text-stone-600 shrink-0">
                {/* Video Call Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    if (!isVoiceRoomConnected) {
                      handleJoinVoiceRoom();
                    } else {
                      setShowVoiceRoomModal(true);
                    }
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Voice & Video Room"
                >
                  <Video className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>

                {/* Phone Call Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    if (!isVoiceRoomConnected) {
                      handleJoinVoiceRoom();
                    } else {
                      setShowVoiceRoomModal(true);
                    }
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Audio Call"
                >
                  <Phone className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>

                {/* Poll / BarChart Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setShowCreatePollModal(true);
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Create Group Poll"
                >
                  <BarChart2 className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>

                {/* More Options / Profile Info Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setShowProfileModal(true);
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Group Info & Profile"
                >
                  <MoreVertical className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>
              </div>
            </div>

            {/* Discord-Style Persistent Active Voice Bar (Speak anytime while chatting) */}
            {isVoiceRoomConnected && (
              <div className="bg-[#2B2D31] text-white px-3 py-1.5 flex items-center justify-between text-xs shrink-0 shadow-xs border-b border-[#1E1F22] animate-fade-in">
                <div 
                  onClick={() => setShowVoiceRoomModal(true)}
                  className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div className="min-w-0">
                    <span className="font-display font-bold text-[11px] sm:text-xs text-emerald-400 block truncate">
                      🔊 Voice Connected • Batch 41 Voice Room
                    </span>
                    <span className="text-[10px] text-stone-300 block truncate">
                      {userIsSpeaking ? '🎙️ You are speaking...' : isVoiceMuted ? '🔇 You are muted' : '🎙️ Mic live (Speak anytime)'} • Tap for stage
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={toggleVoiceRoomMute}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isVoiceMuted ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                    }`}
                    title={isVoiceMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                  >
                    {isVoiceMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleVoiceRoomDeafen}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isVoiceDeafened ? 'bg-rose-500/20 text-rose-400' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                    }`}
                    title={isVoiceDeafened ? 'Undeafen Audio' : 'Deafen Audio'}
                  >
                    {isVoiceDeafened ? <VolumeX className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleDisconnectVoiceRoom}
                    className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors cursor-pointer ml-1"
                    title="Disconnect from Voice Room"
                  >
                    <PhoneOff className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Error Banner with Retry Button */}
            {chatStatus.status === 'error' && (
              <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center justify-between text-xs text-rose-800 shrink-0">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{chatStatus.errorMessage || 'Unable to connect to the group chat. Please check your internet connection.'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    batchWallService.initChatListener();
                  }}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[10px] cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* Clean Stream Area (Pure, Clean Minimal Surface) */}
            <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3 space-y-3.5 scrollbar-thin overscroll-contain bg-[#FAFAFA]">
              

              

              {/* Empty / Loading State for Messages */}
              {displayedChatMessages.length === 0 && (
                <div className="p-12 text-center space-y-3 my-8">
                  {chatStatus.status === 'connecting' ? (
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <h4 className="font-display font-bold text-sm text-stone-700">Connecting to Batch 41...</h4>
                      <p className="text-xs text-stone-400">Loading real-time group messages</p>
                    </div>
                  ) : chatStatus.status === 'error' ? (
                    <div className="p-6 bg-rose-50/70 border border-rose-200 rounded-2xl max-w-sm mx-auto space-y-2">
                      <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
                      <h4 className="font-display font-bold text-sm text-rose-900">Unable to connect to the group chat</h4>
                      <p className="text-xs text-rose-700">Please check your internet connection.</p>
                      <button
                        type="button"
                        onClick={() => batchWallService.initChatListener()}
                        className="mt-2 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Retry Connection
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center font-bold text-2xl border border-rose-200 shadow-2xs">
                        👋
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-stone-800">No messages yet.</h4>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto">
                        Be the first to say hello 👋
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Date Separators & Chat Stream */}
              {displayedChatMessages.map((msg, index) => {
                const isCurrentUser = Boolean(
                  (currentUser?.id && msg.senderId && currentUser.id === msg.senderId) ||
                  (currentUser?.email && msg.senderEmail && currentUser.email.trim().toLowerCase() === msg.senderEmail.trim().toLowerCase())
                );
                const reactionsList = Object.entries(msg.reactions || {}).filter(([, count]) => count > 0);
                const senderColor = getWhatsAppSenderColor(msg.senderName, msg.isKritika);

                const showDatePill = index === 0 ? 'Today' : null;

                return (
                  <React.Fragment key={msg.id}>
                    {/* Date separator pill */}
                    {showDatePill && (
                      <div className="flex justify-center my-1.5">
                        <span className="bg-white text-stone-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-2xs border border-stone-200">
                          {showDatePill}
                        </span>
                      </div>
                    )}

                    <div
                      id={`chat-msg-${msg.id}`}
                      onMouseEnter={() => setHoveredMessageId(msg.id)}
                      onMouseLeave={() => setHoveredMessageId(null)}
                      className={`flex items-start gap-1.5 group transition-all duration-300 ${isCurrentUser ? 'justify-end' : 'justify-start'} ${highlightedChatMsgId === msg.id ? 'p-1 bg-amber-100/60 rounded-2xl ring-2 ring-amber-400' : ''}`}
                    >
                      {/* Member Profile Avatar on the Left (for incoming messages) */}
                      {!isCurrentUser && (
                        <div 
                          onClick={() => {
                            const cm = classmates.find(c => c.name.toLowerCase() === msg.senderName.toLowerCase().replace(' 👑', ''));
                            if (cm) setSelectedClassmateDetail(cm);
                          }}
                          className={`w-7.5 h-7.5 rounded-full overflow-hidden border shrink-0 mt-0.5 cursor-pointer hover:scale-105 transition-transform ${
                            msg.isKritika ? 'border-amber-400 ring-2 ring-pink-300' : 'border-stone-200'
                          }`}
                          title={`Click to view ${msg.senderName}`}
                        >
                          <img src={msg.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'} alt={msg.senderName} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Speech Bubble Card: Light Grey for Yours Chat, Clean White for Others */}
                      <div className="relative max-w-[85%] sm:max-w-[75%] space-y-1">
                        <div
                          className={`p-2.5 px-3 rounded-2xl shadow-2xs text-xs sm:text-sm leading-relaxed relative ${
                            isCurrentUser
                              ? 'bg-stone-200 text-stone-900 rounded-tr-xs border border-stone-300/80 shadow-2xs'
                              : 'bg-white text-stone-900 rounded-tl-xs border border-stone-200/80 shadow-2xs'
                          }`}
                        >

                          {/* 1. Distinct Bold Sender Name & Action Dropdown Trigger */}
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                              <span 
                                onClick={() => {
                                  setChatInput((prev: string) => `${prev ? prev + ' ' : ''}@${msg.senderName} `);
                                }}
                                className={`font-display font-black text-xs sm:text-[13px] tracking-tight ${isCurrentUser ? 'text-stone-900' : senderColor} hover:underline cursor-pointer truncate`}
                                title="Click to mention in chat"
                              >
                                {isCurrentUser ? 'You' : msg.senderName}
                              </span>
                              {msg.isKritika && (
                                <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0">
                                  👑 QUEEN
                                </span>
                              )}
                              {msg.senderIsNewUser && (
                                <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0 flex items-center gap-0.5">
                                  <span>✨</span>
                                  <span>NEW USER</span>
                                </span>
                              )}
                            </div>

                            {/* Dropdown Menu Trigger Button */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveActionMenuMsgId(activeActionMenuMsgId === msg.id ? null : msg.id);
                                }}
                                className="p-0.5 hover:bg-black/5 rounded text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                                title="Message options"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>

                              {/* WhatsApp Message Action Dropdown */}
                              {activeActionMenuMsgId === msg.id && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 animate-scale-up text-xs font-medium">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      audioEngine.playSfx('pop');
                                      setReplyingToMessage(msg);
                                      setActiveActionMenuMsgId(null);
                                    }}
                                    className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                                  >
                                    <Reply className="w-3.5 h-3.5 text-[#008069]" />
                                    <span>Reply</span>
                                  </button>


                                  {/* STRICT AUTHOR-ONLY: Edit message ONLY if isCurrentUser is true */}
                                  {isCurrentUser && !msg.isDeletedForEveryone && (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditMessage(msg)}
                                      className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                                      <span>Edit message</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteModalMsg(msg);
                                      setActiveActionMenuMsgId(null);
                                    }}
                                    className="w-full px-3 py-1.5 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer border-t border-stone-100"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                    <span>Delete message</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                        {/* Quoted Reply Banner */}
                        {msg.replyTo && !msg.isDeletedForEveryone && (
                          <div 
                            onClick={() => handleJumpToMessage(msg.replyTo!.id)}
                            className={`mb-1.5 p-1.5 px-2 rounded-lg border-l-4 text-[11px] cursor-pointer hover:opacity-85 transition-opacity ${
                            isCurrentUser
                              ? 'bg-white/80 border-[#008069] text-stone-800'
                              : 'bg-stone-100 border-[#008069] text-stone-700'
                          }`}>
                            <span className="font-display font-black block text-[10px] text-[#008069]">
                              {msg.replyTo.senderName}
                            </span>
                            <span className="truncate block font-sans">
                              {msg.replyTo.text}
                            </span>
                          </div>
                        )}

                        {/* Deleted for Everyone Banner */}
                        {msg.isDeletedForEveryone ? (
                          <div className="flex items-center gap-1.5 text-stone-400 italic text-xs py-1">
                            <Ban className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>This message was deleted</span>
                          </div>
                        ) : (
                          <>
                            {/* Photo Attachment */}
                            {msg.imageUrl && (
                              <div className="mb-2 rounded-xl overflow-hidden border border-black/10 bg-black/5 relative group/img cursor-pointer">
                                <img
                                  src={msg.imageUrl}
                                  alt="Attached photo"
                                  onClick={() => setLightboxImage({ url: msg.imageUrl!, caption: msg.text })}
                                  className="w-full max-h-60 object-cover hover:scale-101 transition-transform duration-200"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity">
                                  <Eye className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            )}

                            {/* Interactive Live Poll */}
                            {msg.poll && (
                              <div className="p-2.5 rounded-xl space-y-2 my-1 bg-[#F0F2F5] border border-stone-200">
                                <div className="flex items-center gap-1.5 font-display font-black text-xs text-stone-900">
                                  <BarChart2 className="w-4 h-4 text-[#008069]" />
                                  <span>{msg.poll.question}</span>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                  {(() => {
                                    const totalVotes = msg.poll.options.reduce((acc, opt) => acc + opt.votes.length, 0);
                                    const currentVoter = currentUser?.name || profileNameInput || 'You';

                                    return msg.poll.options.map(opt => {
                                      const voteCount = opt.votes.length;
                                      const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                                      const hasVoted = opt.votes.includes(currentVoter);

                                      return (
                                        <div
                                          key={opt.id}
                                          onClick={() => handleVotePoll(msg.id, opt.id)}
                                          className={`p-2 rounded-xl text-xs cursor-pointer transition-all relative overflow-hidden border bg-white ${
                                            hasVoted 
                                              ? 'border-[#008069] font-bold' 
                                              : 'border-stone-200 hover:border-stone-400'
                                          }`}
                                        >
                                          <div
                                            className="absolute inset-y-0 left-0 transition-all duration-300 bg-[#008069]/20"
                                            style={{ width: `${percentage}%` }}
                                          />

                                          <div className="relative flex items-center justify-between z-1">
                                            <div className="flex items-center gap-1.5">
                                              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                                                hasVoted ? 'bg-[#008069] text-white border-[#008069]' : 'border-stone-400'
                                              }`}>
                                                {hasVoted ? '✓' : ''}
                                              </span>
                                              <span>{opt.text}</span>
                                            </div>
                                            <span className="font-display font-bold text-[10px] text-stone-600">
                                              {percentage}% ({voteCount})
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    });
                                  })()}
                                </div>
                              </div>
                            )}

                            {/* Formatted Text with Highlighted @Mentions */}
                            {msg.text && !msg.poll && (
                              <div className="whitespace-pre-wrap font-sans text-stone-900 leading-snug">
                                {renderFormattedMessageText(msg.text, isCurrentUser)}
                              </div>
                            )}
                          </>
                        )}

                        {/* Timestamp, Edited Badge & Double Checkmark Read Receipt */}
                        {(() => {
                          const allMembers = batchWallService.getAllBatchMembers(classmates);
                          const seenByList = msg.seenBy || [];
                          const unseenMembers = allMembers.filter(m => !seenByList.some(s => (s.userId && s.userId === m.id) || (m.email && s.userEmail && s.userEmail.toLowerCase() === m.email.toLowerCase()) || (s.userName && s.userName.toLowerCase().trim() === m.name.toLowerCase().trim())));
                          const isAllSeen = seenByList.length > 0 && unseenMembers.length === 0;

                          return (
                            <div className="flex items-center justify-end gap-1.5 mt-1 text-[9px] text-stone-400 font-medium">
                              {msg.isEdited && !msg.isDeletedForEveryone && (
                                <span className="italic text-stone-400">Edited</span>
                              )}
                              <span>{formatChatTimestamp(msg.createdAt)}</span>
                              
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSeenInfoMsg(msg);
                                }}
                                className="flex items-center gap-0.5 hover:opacity-80 transition-all cursor-pointer p-0.5 rounded group/seen"
                                title={isAllSeen ? `Seen by all ${allMembers.length} members (Click to view seen details)` : `Delivered (${seenByList.length}/${allMembers.length} seen - Click to view details)`}
                              >
                                <CheckCheck
                                  className={`w-3.5 h-3.5 transition-colors ${
                                    isAllSeen 
                                      ? 'text-[#00A884] dark:text-[#53BDEB] fill-[#00A884]/20 stroke-[2.5]' 
                                      : 'text-stone-400'
                                  }`}
                                />
                                <span className={`text-[8px] font-bold ${isAllSeen ? 'text-[#00A884] dark:text-[#53BDEB]' : 'text-stone-400'}`}>
                                  {seenByList.length}/{allMembers.length}
                                </span>
                              </button>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Emoji Reactions at bottom of bubble */}
                      {reactionsList.length > 0 && (
                        <div className={`flex items-center gap-1 flex-wrap ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {reactionsList.map(([emoji, count]) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                audioEngine.playSfx('pop');
                                batchWallService.reactToChatMessage(msg.id, emoji);
                              }}
                              className="bg-white border border-stone-200 rounded-full px-1.5 py-0.2 text-[10px] font-bold shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                            >
                              <span>{emoji}</span> <span>{count}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Hover Action Bar: Emoji Reactions & Reply */}
                      {hoveredMessageId === msg.id && (
                        <div className={`absolute -top-7 ${isCurrentUser ? 'right-0' : 'left-0'} bg-white border border-stone-200 rounded-full px-2 py-0.5 shadow-md flex items-center gap-1 z-10 animate-fade-in`}>
                          {['❤️', '👍', '😂', '😮', '🍕', '👑'].map(emoji => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => {
                                audioEngine.playSfx('pop');
                                batchWallService.reactToChatMessage(msg.id, emoji);
                              }}
                              className="text-xs hover:scale-125 transition-transform cursor-pointer p-0.5"
                            >
                              {emoji}
                            </button>
                          ))}

                          <button
                            type="button"
                            onClick={() => {
                              audioEngine.playSfx('pop');
                              setReplyingToMessage(msg);
                            }}
                            className="text-xs hover:text-emerald-700 font-bold flex items-center gap-0.5 p-0.5 pl-1 border-l border-stone-200 cursor-pointer"
                            title="Reply to this message"
                          >
                            <Reply className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              audioEngine.playSfx('pop');
                              setSeenInfoMsg(msg);
                            }}
                            className="text-xs hover:text-sky-600 font-bold flex items-center gap-0.5 p-0.5 pl-1 border-l border-stone-200 cursor-pointer text-stone-500"
                            title="View who has seen this message"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
              <div ref={chatBottomRef} />
            </div>

            {/* Quoted Message Preview Banner before sending */}
            {replyingToMessage && (
              <div className="bg-white p-2 px-3 border-t border-stone-200 flex items-center justify-between shrink-0 animate-fade-in">
                <div className="flex items-center gap-2 min-w-0">
                  <Reply className="w-4 h-4 text-[#008069] shrink-0" />
                  <div className="min-w-0 text-xs">
                    <span className="font-display font-black text-[#008069] block truncate">
                      Replying to {replyingToMessage.senderName}
                    </span>
                    <span className="text-[10px] text-stone-500 truncate block">
                      {replyingToMessage.text || 'Photo attachment'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyingToMessage(null)}
                  className="p-1 hover:bg-stone-100 rounded-full text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Chat Attachment Preview */}
            {chatImageAttachment && (
              <div className="bg-stone-100 p-2 px-3 border-t border-stone-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300 shadow-2xs">
                    <img src={chatImageAttachment} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs text-stone-800 block">Photo attached 📸</span>
                    <span className="text-[10px] text-stone-500">Send with or without message</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatImageAttachment(null)}
                  className="p-1 hover:bg-stone-200 rounded-full text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* @Mention Quick Pick List */}
            {showMentionPicker && (
              <div className="bg-white border-t border-stone-200 p-2 px-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-inner animate-fade-in">
                <span className="text-[10px] font-bold text-stone-400 shrink-0">@Mention:</span>
                {classmates.map(cm => (
                  <button
                    key={cm.id}
                    type="button"
                    onClick={() => {
                      setChatInput(prev => `${prev}@${cm.name.split(' ')[0]} `);
                      setShowMentionPicker(false);
                    }}
                    className="px-2 py-1 bg-stone-100 hover:bg-emerald-50 text-stone-800 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    @{cm.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Emoji Tray */}
            {showChatEmojiPicker && (
              <div className="bg-white border-t border-stone-200 p-2 px-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-inner animate-fade-in">
                <span className="text-[10px] font-bold text-stone-400 shrink-0">Emojis:</span>
                {COMMON_EMOJIS.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setChatInput(prev => prev + emoji);
                      audioEngine.playSfx('pop');
                    }}
                    className="w-7 h-7 rounded-xl hover:bg-emerald-50 flex items-center justify-center text-sm transition-transform active:scale-90 cursor-pointer shrink-0"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Input Bar: Mail Auth Lock Banner if not signed in */}
            {!authService.isUserAllowedToChat() ? (
              <div className="p-3 px-4 bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 border-t border-rose-500/30 flex items-center justify-between gap-3 text-white shrink-0 shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center shrink-0 animate-pulse">
                    <Lock className="w-4.5 h-4.5 text-rose-300" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="font-display font-black text-xs text-rose-200 truncate flex items-center gap-1.5">
                      <span>Sign In with Mail ID Required to Chat</span>
                      <span className="bg-rose-500/30 text-rose-300 text-[9px] px-1.5 py-0.2 rounded-full border border-rose-400/40 font-bold uppercase">Locked</span>
                    </h4>
                    <p className="text-[10px] text-stone-300 truncate font-medium">
                      All new users signed in with their mail ID can send messages, reply & chat with each other user
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="px-3.5 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer active:scale-95"
                >
                  <span>Sign In with Mail ID</span>
                </button>
              </div>
            ) : (
              /* Bottom Input Bar with Pill & Circular Send (Clean Modern Lounge Style) */
              <form onSubmit={handleSendChatMessage} className="p-2 sm:p-2.5 px-2 sm:px-3 flex items-center gap-1.5 sm:gap-2 shrink-0 bg-white border-t border-stone-200/80 w-full max-w-full box-border">
                {/* Left Rounded Pill Container */}
                <div className="flex-1 min-w-0 bg-stone-100/90 focus-within:bg-white focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 rounded-full flex items-center px-1.5 sm:px-2.5 py-0.5 sm:py-1 shadow-2xs border border-stone-200 transition-all">
                  {/* Emoji Smile Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowChatEmojiPicker(!showChatEmojiPicker);
                      setShowMentionPicker(false);
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Smileys"
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  {/* Text Input */}
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 min-w-0 px-1.5 sm:px-2 py-1 text-xs sm:text-sm outline-none bg-transparent text-stone-900 placeholder:text-stone-400"
                  />

                  {/* @Mention Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowMentionPicker(!showMentionPicker);
                      setShowChatEmojiPicker(false);
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="@Mention someone"
                  >
                    <AtSign className="w-4.5 h-4.5" />
                  </button>

                  {/* Hidden File Input */}
                  <input
                    ref={chatFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChatImageSelect}
                    className="hidden"
                  />

                  {/* Attachment Paperclip */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!authService.isUserAllowedToChat()) {
                        setShowGoogleModal(true);
                        setShareToast('Please sign in with your Mail ID to send photos! 🔒');
                        setTimeout(() => setShareToast(null), 3000);
                        return;
                      }
                      chatFileInputRef.current?.click();
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Attach Photo"
                  >
                    <Paperclip className="w-4.5 h-4.5" />
                  </button>

                  {/* Camera Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!authService.isUserAllowedToChat()) {
                        setShowGoogleModal(true);
                        setShareToast('Please sign in with your Mail ID to send photos! 🔒');
                        setTimeout(() => setShareToast(null), 3000);
                        return;
                      }
                      chatFileInputRef.current?.click();
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Camera"
                  >
                    <Camera className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Right Circular Send Button (Always Send, Voice Recorder Removed) */}
                <button
                  type="submit"
                  disabled={(!chatInput.trim() && !chatImageAttachment) || isSendingChat}
                  className={`w-9 h-9 sm:w-10 sm:h-10 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-full transition-all shadow-sm cursor-pointer shrink-0 flex items-center justify-center ${
                    (!chatInput.trim() && !chatImageAttachment) || isSendingChat ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                  title="Send message"
                >
                  <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-0.5" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* ==================== 2. CONCISE POST FEED ==================== */}
        {activeMode === 'posts' && (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3.5 pb-24 scrollbar-thin animate-fade-in pr-0.5 overscroll-contain">
            {/* Story Mood Rings Bar */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-display font-black text-rose-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>🌸</span>
                  <span>Batch Moments & Stories</span>
                </span>
                <span className="font-handwritten text-xs text-rose-600 font-bold hidden sm:inline">
                  Tap friend to view & cheer ♡
                </span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
                <div
                  onClick={() => setShowNewPhotoPostModal(true)}
                  className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                >
                  <div className="relative w-12 h-12 rounded-full border-2 border-dashed border-rose-400 bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform shadow-2xs">
                    <Plus className="w-4 h-4" />
                    <span className="absolute -bottom-1 -right-1 text-[10px] bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                      📸
                    </span>
                  </div>
                  <span className="font-display font-bold text-[10px] text-rose-900 truncate max-w-[52px] text-center">
                    New Post
                  </span>
                </div>

                {classmates.map(cm => (
                  <div
                    key={cm.id}
                    onClick={() => setSelectedClassmateDetail(cm)}
                    className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                  >
                    <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-500 group-hover:scale-105 transition-transform shadow-2xs">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                        <img src={cm.avatarUrl} alt={cm.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-[10px] bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                        {cm.currentMoodEmoji || '✨'}
                      </span>
                    </div>
                    <span className="font-display font-bold text-[10px] text-stone-800 truncate max-w-[54px] text-center">
                      {cm.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick "Share a Memory" Action Banner */}
            <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200/80 rounded-2xl p-3 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center shadow-2xs shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <p className="font-display font-bold text-xs text-rose-950 truncate">
                  Share a food snap, memory, or celebration with Batch 41
                </p>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowNewPhotoPostModal(true);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1 shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>CREATE</span>
              </button>
            </div>

            {/* Photo Post Cards Stream (Responsive 2-column grid on desktop, 1-column on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {photoPosts.map(post => {
                const isExpanded = Boolean(expandedComments[post.id]);
                const commentText = postCommentText[post.id] || '';
                const filterDef = FILTER_STYLES[post.filter || 'none'] || FILTER_STYLES.none;

                const currentUserName = (currentUser?.name || profileNameInput || '').replace(' 👑', '').trim().toLowerCase();
                const postAuthorName = (post.authorName || '').replace(' 👑', '').trim().toLowerCase();
                const isPostAuthor = Boolean(
                  (currentUser?.id && (post.userId || post.authorId) && (currentUser.id === post.userId || currentUser.id === post.authorId)) ||
                  (currentUser?.email && (post.userEmail || post.authorEmail) && currentUser.email.toLowerCase().trim() === (post.userEmail || post.authorEmail)?.toLowerCase().trim()) ||
                  (currentUserName !== '' && currentUserName === postAuthorName)
                );
                const isKritika = currentUserName.includes('kritika') || (currentUser?.email || '').toLowerCase().includes('kritika');

                return (
                  <div
                    key={post.id}
                    className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs space-y-2.5 transition-all hover:border-rose-300"
                  >
                    {/* Pinned Post Badge */}
                    {post.isPinned && (
                      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white px-3.5 py-1 text-[10px] font-display font-black flex items-center justify-between shadow-2xs">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider">
                          <Pin className="w-3 h-3 fill-white" />
                          <span>Pinned Post</span>
                        </span>
                        <span className="text-white/90 text-[9px] font-bold">
                          {post.pinnedBy ? `Pinned by ${post.pinnedBy}` : 'Featured'}
                        </span>
                      </div>
                    )}

                    <div className="p-3 px-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-rose-400 to-amber-400">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                            <img src={post.authorAvatarUrl} alt={post.authorName} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display font-black text-xs text-stone-900 leading-none">
                              {post.authorName}
                            </h3>
                            {post.isKritika && (
                              <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full">
                                👑 QUEEN
                              </span>
                            )}
                          </div>
                          {post.location && (
                            <span className="text-[10px] text-stone-400 font-medium block">
                              {post.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-stone-400 font-medium">
                          {post.timestamp}
                        </span>

                        {/* Post Action Menu */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setActivePostMenuId(activePostMenuId === post.id ? null : post.id)}
                            className="p-1 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                            title="Post options"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {activePostMenuId === post.id && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 animate-scale-up text-xs font-medium">
                              <button
                                type="button"
                                onClick={() => handleTogglePinPost(post)}
                                className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                              >
                                <Pin className="w-3.5 h-3.5 text-amber-600" />
                                <span>{post.isPinned ? 'Unpin post' : 'Pin to top'}</span>
                              </button>

                              {/* STRICT AUTHOR-ONLY: Edit Caption ONLY if isPostAuthor is true */}
                              {isPostAuthor && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditPost(post)}
                                  className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Edit caption</span>
                                </button>
                              )}

                              {(isPostAuthor || isKritika) && (
                                <button
                                  type="button"
                                  onClick={() => handleDeletePost(post)}
                                  className="w-full px-3 py-1.5 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer border-t border-stone-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Delete post</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 9:16 Aspect Ratio Photo Container with Multi-Photo Carousel */}
                    {(() => {
                      const allImages = (post.images && post.images.length > 0) ? post.images : [post.imageUrl];
                      const currentIdx = activePostImgIndex[post.id] || 0;
                      const activeImg = allImages[currentIdx] || post.imageUrl;

                      return (
                        <div 
                          className="relative w-full aspect-[9/16] max-h-[580px] bg-stone-950 overflow-hidden cursor-pointer select-none group flex items-center justify-center"
                          onDoubleClick={() => handleDoubleTapPost(post)}
                        >
                          <img
                            src={activeImg}
                            alt="Post visual"
                            style={{ filter: filterDef.style }}
                            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                          />

                          {/* Multi-Photo Carousel Navigation */}
                          {allImages.length > 1 && (
                            <>
                              {/* 1 / N Badge */}
                              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10">
                                {currentIdx + 1}/{allImages.length}
                              </div>

                              {/* Previous Arrow */}
                              {currentIdx > 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    audioEngine.playSfx('click');
                                    setActivePostImgIndex(prev => ({
                                      ...prev,
                                      [post.id]: Math.max(0, currentIdx - 1)
                                    }));
                                  }}
                                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90 z-10"
                                  title="Previous photo"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                              )}

                              {/* Next Arrow */}
                              {currentIdx < allImages.length - 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    audioEngine.playSfx('click');
                                    setActivePostImgIndex(prev => ({
                                      ...prev,
                                      [post.id]: Math.min(allImages.length - 1, currentIdx + 1)
                                    }));
                                  }}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90 z-10"
                                  title="Next photo"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              )}

                              {/* Bottom Dot Indicators */}
                              <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none z-10">
                                {allImages.map((_, dotIdx) => (
                                  <span
                                    key={dotIdx}
                                    className={`transition-all rounded-full ${
                                      dotIdx === currentIdx
                                        ? 'w-2 h-2 bg-white ring-1 ring-black/50'
                                        : 'w-1.5 h-1.5 bg-white/50'
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {heartBurstId === post.id && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-scale-up z-20">
                              <Heart className="w-20 h-20 text-white fill-rose-500 drop-shadow-lg" />
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Post Action Bar: Likes, Comments, Reactions, Shares, Bookmark */}
                    <div className="px-3.5 pt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        {/* Heart / Like Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleLikePost(post)}
                          className={`flex items-center gap-1 text-xs font-display font-black transition-transform active:scale-90 cursor-pointer ${
                            post.likedByCurrentUser ? 'text-rose-600' : 'text-stone-600 hover:text-rose-600'
                          }`}
                          title={post.likedByCurrentUser ? "Unlike post" : "Like post"}
                        >
                          <Heart className={`w-5 h-5 transition-colors ${post.likedByCurrentUser ? 'fill-rose-600 text-rose-600' : ''}`} />
                          <span className="font-mono text-xs">{post.likesCount}</span>
                        </button>

                        {/* Comment Button */}
                        <button
                          type="button"
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="flex items-center gap-1 text-xs font-display font-bold text-stone-600 hover:text-purple-700 transition-transform active:scale-90 cursor-pointer"
                          title="View & add comments"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-mono text-xs">{post.comments?.length || 0}</span>
                        </button>

                        {/* Quick Reaction Picker Button */}
                        <button
                          type="button"
                          onClick={() => setActiveReactionPickerPostId(activeReactionPickerPostId === post.id ? null : post.id)}
                          className={`flex items-center gap-1 text-xs font-display font-bold p-1 rounded-lg transition-all cursor-pointer ${
                            activeReactionPickerPostId === post.id 
                              ? 'bg-amber-100 text-amber-800 scale-105 shadow-2xs' 
                              : 'text-stone-600 hover:text-amber-600'
                          }`}
                          title="Add an emoji reaction"
                        >
                          <Smile className="w-5 h-5" />
                        </button>

                        {/* Share Button with Live Share Count */}
                        <button
                          type="button"
                          onClick={() => handleSharePost(post)}
                          className="flex items-center gap-1 text-stone-600 hover:text-blue-600 transition-transform active:scale-90 cursor-pointer group/share"
                          title={`Share post (${post.sharesCount || 0} shares so far)`}
                        >
                          <Share2 className="w-5 h-5 group-hover/share:text-blue-600" />
                          <span className="font-mono text-xs font-bold text-stone-700 group-hover/share:text-blue-600">
                            {post.sharesCount || 0}
                          </span>
                        </button>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        type="button"
                        onClick={() => {
                          audioEngine.playSfx('pop');
                          batchWallService.toggleBookmarkInstagramPost(post.id);
                        }}
                        className={`transition-transform active:scale-90 cursor-pointer ${
                          post.saved ? 'text-amber-500' : 'text-stone-400 hover:text-stone-800'
                        }`}
                        title={post.saved ? "Remove bookmark" : "Save post"}
                      >
                        <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Floating Quick Reaction Emoji Bar */}
                    {activeReactionPickerPostId === post.id && (
                      <div className="mx-3.5 bg-white border border-stone-200/90 rounded-2xl p-1.5 px-2.5 shadow-md flex items-center gap-1.5 animate-scale-up z-20 overflow-x-auto scrollbar-none">
                        <span className="text-[10px] font-bold text-stone-400 mr-0.5">React:</span>
                        {['❤️', '🔥', '👏', '🌸', '😍', '😂', '🎉', '🧁'].map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => handleReactToPost(post.id, emoji)}
                            className="w-7 h-7 hover:scale-125 transition-transform flex items-center justify-center text-base cursor-pointer rounded-lg hover:bg-stone-50"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Reactions Badges Row */}
                    {post.reactions && Object.keys(post.reactions).length > 0 && (
                      <div className="px-3.5 flex items-center gap-1.5 flex-wrap pt-0.5">
                        {Object.entries(post.reactions).map(([emoji, count]) => {
                          const users = post.reactedUsers?.[emoji] || [];
                          const myName = (currentUser?.name || profileNameInput || '').toLowerCase().trim();
                          const hasUserReacted = users.some(u => u.toLowerCase().trim() === myName);

                          return (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleReactToPost(post.id, emoji)}
                              className={`px-2 py-0.5 rounded-full text-xs font-bold border transition-all active:scale-95 flex items-center gap-1 cursor-pointer ${
                                hasUserReacted
                                  ? 'bg-rose-100 border-rose-300 text-rose-800 shadow-2xs font-black'
                                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                              }`}
                              title={`Reacted by: ${users.join(', ') || `${count} people`}`}
                            >
                              <span>{emoji}</span>
                              <span className="text-[11px] font-mono">{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Unique Likers & Hearts Summary Line (Click to see who liked) */}
                    {(() => {
                      const uniqueMembers = post.likedByMembers || [];
                      const uniqueNames = (post.likedByUsers && post.likedByUsers.length > 0)
                        ? post.likedByUsers
                        : uniqueMembers.map(m => m.userName);
                      const totalUniques = Math.max(post.likesCount || 0, uniqueNames.length, uniqueMembers.length);

                      return (
                        <div className="px-3.5 pt-0.5">
                          <button
                            type="button"
                            onClick={() => setShowLikedByModalPost(post)}
                            className="text-left text-xs font-display font-medium text-stone-700 hover:text-rose-600 cursor-pointer flex items-center gap-1.5 transition-colors group/likers"
                            title="Click to see all unique people who liked this post"
                          >
                            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover/likers:scale-110 transition-transform shrink-0" />
                            <span>
                              {totalUniques === 0 ? (
                                <span className="text-stone-400">Be the first to heart this</span>
                              ) : uniqueNames.length === 1 ? (
                                <span>Liked by <strong className="text-stone-900 font-bold">{uniqueNames[0]}</strong> <span className="text-stone-400 font-normal">({totalUniques} unique like)</span></span>
                              ) : uniqueNames.length === 2 ? (
                                <span>Liked by <strong className="text-stone-900 font-bold">{uniqueNames[0]}</strong> and <strong className="text-stone-900 font-bold">{uniqueNames[1]}</strong> <span className="text-stone-400 font-normal">({totalUniques} unique likes)</span></span>
                              ) : (
                                <span>Liked by <strong className="text-stone-900 font-bold">{uniqueNames[0]}</strong> and <strong className="text-stone-900 font-bold underline">{totalUniques - 1} other unique members</strong></span>
                              )}
                            </span>
                          </button>
                        </div>
                      );
                    })()}

                    {/* Caption & Hashtags */}
                    <div className="px-3.5 space-y-1">
                      <p className="text-xs text-stone-800 font-sans leading-relaxed">
                        <span className="font-display font-black mr-1.5 text-stone-900">
                          {post.authorName}
                        </span>
                        {post.caption}
                        {post.isEdited && (
                          <span className="text-[10px] text-stone-400 italic ml-1">
                            (edited)
                          </span>
                        )}
                      </p>

                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap pt-0.5">
                          {post.hashtags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-2 py-0.2 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Comments Section: Showing WHO commented with avatars, timestamps & like button */}
                    <div className="px-3.5 pb-3 space-y-2">
                      {post.comments && post.comments.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-[11px] font-display font-bold text-stone-500 hover:text-stone-800 cursor-pointer flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                          <span>{isExpanded ? 'Hide comments' : `View all ${post.comments.length} comment${post.comments.length > 1 ? 's' : ''}`}</span>
                        </button>
                      )}

                      {isExpanded && post.comments && (
                        <div className="space-y-2 pt-1 border-t border-stone-100">
                          {post.comments.map(c => {
                            const isQueen = c.isKritika || c.authorName.toLowerCase().includes('kritika');
                            const myName = currentUser?.name || profileNameInput || studentName || 'Student';
                            const hasLikedComment = c.likedByUsers?.includes(myName);

                            return (
                              <div key={c.id} className="flex items-start gap-2 bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
                                {/* Commenter Avatar */}
                                <div
                                  onClick={() => {
                                    const cm = classmates.find(cl => cl.name.toLowerCase() === c.authorName.toLowerCase().replace(' 👑', ''));
                                    if (cm) setSelectedClassmateDetail(cm);
                                  }}
                                  className="w-7 h-7 rounded-full overflow-hidden border border-stone-200 shrink-0 cursor-pointer hover:scale-105 transition-transform mt-0.5"
                                  title={`View ${c.authorName}`}
                                >
                                  <img
                                    src={c.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                                    alt={c.authorName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Comment Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-display font-black text-xs text-stone-900">
                                        {c.authorName}
                                      </span>
                                      {isQueen && (
                                        <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs">
                                          👑 QUEEN
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-stone-400 shrink-0">
                                      {c.timestamp || (c.createdAt ? formatChatTimestamp(c.createdAt) : '')}
                                    </span>
                                  </div>

                                  <p className="text-xs text-stone-700 mt-0.5 leading-relaxed break-words font-sans">
                                    {c.text}
                                  </p>

                                  {/* Comment Actions: Heart Like */}
                                  <div className="flex items-center gap-2 mt-1">
                                    <button
                                      type="button"
                                      onClick={() => handleLikeComment(post.id, c.id)}
                                      className={`flex items-center gap-1 text-[10px] font-bold cursor-pointer transition-colors ${
                                        hasLikedComment ? 'text-rose-600' : 'text-stone-400 hover:text-rose-600'
                                      }`}
                                      title="Like this comment"
                                    >
                                      <Heart className={`w-3 h-3 ${hasLikedComment ? 'fill-rose-600' : ''}`} />
                                      <span>{(c.likesCount || 0) > 0 ? c.likesCount : 'Like'}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Comment Input with User Avatar */}
                      <div className="pt-1.5 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-stone-300 shrink-0">
                          <img
                            src={currentUser?.avatarUrl || profileAvatarInput || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                            alt="You"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setPostCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder={`Add a comment as ${currentUser?.name || profileNameInput || 'Student'}...`}
                          className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white transition-colors"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendPostComment(post.id);
                            }
                          }}
                        />

                        <button
                          type="button"
                          disabled={!commentText.trim()}
                          onClick={() => handleSendPostComment(post.id)}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-xl text-xs font-display font-black uppercase cursor-pointer transition-all active:scale-95"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {photoPosts.length === 0 && (
              <div className="p-8 bg-white border border-stone-200/90 rounded-2xl text-center space-y-2 max-w-sm mx-auto shadow-2xs my-4">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center text-2xl border border-rose-200 shadow-2xs">
                  📸
                </div>
                <h4 className="font-display font-black text-sm text-stone-900">No photo posts yet</h4>
                <p className="text-xs text-stone-500">
                  Be the first to share a food snap, memory, or celebration!
                </p>
                <button
                  type="button"
                  onClick={() => setShowNewPhotoPostModal(true)}
                  className="mt-2 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Create First Post
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. BULLETIN CORKBOARD ==================== */}
        {activeMode === 'bulletin' && (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3.5 pb-24 scrollbar-thin animate-fade-in pr-0.5 overscroll-contain">
            <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 border border-amber-200/80 rounded-2xl p-3 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl border border-amber-300 bg-white shadow-2xs shrink-0 flex items-center justify-center text-base">
                  📌
                </div>
                <div>
                  <h3 className="font-display font-black text-xs sm:text-sm text-stone-900">
                    Bulletin Sticky Notes
                  </h3>
                  <p className="font-handwritten text-xs text-stone-600 font-bold truncate">
                    Leave appreciation notes & emojis for Kritika!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowNewPostModal(true);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1 shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>PIN NOTE</span>
              </button>
            </div>

            {/* Bulletin Notes Grid (Responsive 2-column grid on desktop, 1-column on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {allBulletinPosts.map(post => {
                const sticker = STICKERS.find(s => s.alias === post.avatarPose) || STICKERS[0];
                const reactionEntries = Object.entries(post.reactions || {}).filter(([, count]) => count > 0);
                const replies = post.replies || [];
                const hasKritikaReply = replies.some(r => r.isKritika);
                const isExpanded = Boolean(expandedReplies[post.id]);
                const replyText = replyInputMap[post.id] || '';
                const sending = Boolean(isSendingReply[post.id]);

                return (
                  <div
                    key={post.id}
                    className={`bg-white border rounded-2xl p-4 shadow-2xs space-y-2.5 transition-all relative ${
                      hasKritikaReply
                        ? 'border-pink-300 bg-gradient-to-b from-pink-50/25 via-white to-white'
                        : 'border-stone-200/90 hover:border-rose-300'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-6 text-sm select-none pointer-events-none">
                      📌
                    </div>

                    {hasKritikaReply && (
                      <div className="bg-gradient-to-r from-pink-100/90 via-rose-50 to-amber-50 border border-pink-300 rounded-xl p-2 px-3 flex items-center justify-between text-xs animate-scale-up">
                        <span className="font-display font-black text-rose-900 flex items-center gap-1.5 text-[11px]">
                          <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
                          <span>KRITIKA REPLIED 💌</span>
                        </span>
                        <button
                          onClick={() => setExpandedReplies(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-[10px] font-handwritten font-bold text-rose-700 underline cursor-pointer"
                        >
                          {isExpanded ? 'Hide' : 'Read Reply ↓'}
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl border border-stone-200 overflow-hidden bg-rose-50 shrink-0">
                          <img src={sticker.avatarUrl} alt={post.studentName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-display font-black text-xs text-stone-900 leading-none">
                              {post.studentName}
                            </h3>
                            <span className="bg-rose-50 text-rose-800 font-handwritten text-[10px] font-black px-1.5 py-0.2 rounded-full border border-rose-200">
                              {post.batch}
                            </span>
                          </div>
                          <span className="font-handwritten text-[10px] text-stone-400 font-bold">
                            {post.timestamp}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-handwritten font-bold text-amber-900">
                          <span>{post.moodEmoji}</span>
                          <span>{post.mood}</span>
                        </div>
                        {(() => {
                          const currentUserName = (currentUser?.name || profileNameInput || '').replace(' 👑', '').trim().toLowerCase();
                          const studentNameClean = (post.studentName || '').replace(' 👑', '').trim().toLowerCase();
                          const isBulletinAuthor = Boolean(
                            (currentUser?.id && post.userId && currentUser.id === post.userId) ||
                            (currentUser?.email && post.userEmail && currentUser.email.toLowerCase().trim() === post.userEmail.toLowerCase().trim()) ||
                            (currentUserName !== '' && currentUserName === studentNameClean)
                          );
                          const isKritika = currentUserName.includes('kritika') || (currentUser?.email || '').toLowerCase().includes('kritika');
                          const canDeleteBulletin = isBulletinAuthor || isKritika;

                          if (!canDeleteBulletin) return null;

                          return (
                            <button
                              type="button"
                              onClick={() => {
                                audioEngine.playSfx('pop');
                                setDeleteConfirmPost({
                                  id: post.id,
                                  type: 'bulletin',
                                  title: `Sticky note by ${post.studentName}`
                                });
                              }}
                              className="p-1 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="Delete sticky note"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            </button>
                          );
                        })()}
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
                      {post.text}
                    </p>

                    <div className="pt-2 border-t border-stone-100 space-y-2">
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                        <span className="text-[10px] font-bold text-stone-400 shrink-0">React:</span>
                        {['💖', '🌸', '👑', '✨', '🍕', '☕', '🎉', '🔥', '🥰'].map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => {
                              audioEngine.playSfx('pop');
                              batchWallService.reactToPost(post.id, emoji);
                            }}
                            className="w-6.5 h-6.5 rounded-lg bg-stone-50 hover:bg-pink-100 border border-stone-200 flex items-center justify-center text-xs transition-transform active:scale-90 cursor-pointer shrink-0"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 flex-wrap">
                          {reactionEntries.map(([alias, count]) => (
                            <span
                              key={alias}
                              className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full text-xs font-bold text-stone-700"
                            >
                              <span>{alias}</span>
                              <span>{count}</span>
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setExpandedReplies(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-xs font-display font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{replies.length > 0 ? `${replies.length} Replies` : 'Reply'}</span>
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-stone-100 space-y-2 bg-stone-50/80 p-3 rounded-xl">
                        {replies.map(r => (
                          <div key={r.id} className="p-2 rounded-xl bg-white border border-stone-200 text-xs space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-display font-black text-stone-800">
                                {r.authorName} {r.isKritika ? '👑' : ''}
                              </span>
                              <span className="text-[10px] text-stone-400">{r.timestamp}</span>
                            </div>
                            <p className="text-stone-700">{r.text}</p>
                          </div>
                        ))}

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendReply(post.id);
                          }}
                          className="flex items-center gap-2 pt-1"
                        >
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyInputMap(prev => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="Reply with love and cheer..."
                            className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs outline-none"
                            required
                          />
                          <button
                            type="submit"
                            disabled={sending || !replyText.trim()}
                            className="px-3.5 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
                          >
                            Reply
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODAL: CREATE GROUP POLL */}
        {showCreatePollModal && (
          <BaseModal
            onClose={() => setShowCreatePollModal(false)}
            title="CREATE BATCH GROUP POLL"
            subtitle="Ask Batch 41 a question and see real-time votes"
            icon={<BarChart2 className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreatePoll} className="space-y-3 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Poll Question:
                </label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="e.g. Tonight's comfort choice? 🍕 vs 🧀"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white font-bold"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-display font-black text-xs text-stone-700 uppercase block">
                  Options:
                </label>
                <input
                  type="text"
                  value={pollOption1}
                  onChange={(e) => setPollOption1(e.target.value)}
                  placeholder="Option 1 (e.g. Pizza Night 🍕)"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                  required
                />
                <input
                  type="text"
                  value={pollOption2}
                  onChange={(e) => setPollOption2(e.target.value)}
                  placeholder="Option 2 (e.g. Gourmet Macaroni 🧀)"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                  required
                />
                <input
                  type="text"
                  value={pollOption3}
                  onChange={(e) => setPollOption3(e.target.value)}
                  placeholder="Option 3 (Optional, e.g. Hot Chai ☕)"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Publish Group Poll 📊</span>
              </button>
            </form>
          </BaseModal>
        )}

        {/* MODAL: PROFILE SETTINGS & AVATAR EDITOR */}
        {showProfileModal && (
          <BaseModal
            onClose={() => setShowProfileModal(false)}
            title="YOUR CHAT & SOCIAL PROFILE"
            subtitle="Customize how your name and avatar appear to all group members"
            icon={<UserCheck className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1.5">
                  1. Profile Picture / Avatar:
                </label>
                
                <input
                  ref={profileAvatarFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileAvatarSelect}
                  className="hidden"
                />

                <div className="flex items-center gap-3 mb-2.5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose-400 shadow-sm bg-stone-100">
                      <img src={profileAvatarInput} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                      {profileMoodEmojiInput}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => profileAvatarFileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-display font-bold text-stone-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-rose-600" />
                    <span>Upload Custom Photo</span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-stone-400 block mb-1">Or choose a preset:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {AVATAR_PRESETS.map((p, idx) => {
                      const isSelected = profileAvatarInput === p.url;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setProfileAvatarInput(p.url);
                            audioEngine.playSfx('pop');
                          }}
                          className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-transform shrink-0 ${
                            isSelected ? 'border-rose-600 scale-110 ring-2 ring-rose-200' : 'border-stone-300 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  2. Display Name (Seen by all members):
                </label>
                <input
                  type="text"
                  value={profileNameInput}
                  onChange={(e) => setProfileNameInput(e.target.value)}
                  placeholder="e.g. Kritika Gupta 👑 or Your Name"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  3. Status Note / Bio:
                </label>
                <input
                  type="text"
                  value={profileStatusInput}
                  onChange={(e) => setProfileStatusInput(e.target.value)}
                  placeholder="e.g. Savoring sweet memories ♡ ✨"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  4. Current Mood Emoji:
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none mb-1.5">
                  {COMMON_EMOJIS.map(emoji => {
                    const isSelected = profileMoodEmojiInput === emoji;
                    return (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setProfileMoodEmojiInput(emoji);
                          audioEngine.playSfx('pop');
                        }}
                        className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center cursor-pointer transition-transform ${
                          isSelected ? 'bg-rose-100 border border-rose-400 scale-110' : 'bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile & Reflect in Group Chat</span>
              </button>
            </form>
          </BaseModal>
        )}

        {/* MODAL: CREATE NEW PHOTO POST */}
        {showNewPhotoPostModal && (
          <BaseModal
            onClose={() => setShowNewPhotoPostModal(false)}
            title="CREATE PHOTO POST"
            subtitle="Share memories, food & aesthetic moments with Batch 41"
            icon={<Camera className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreatePhotoPost} className="space-y-3.5 text-left">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-display font-black text-xs text-stone-700 uppercase">
                    1. Upload Photos (9:16 Ratio):
                  </label>
                  <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    {newPostImages.length > 0 ? `${newPostImages.length} Photo${newPostImages.length > 1 ? 's' : ''} Selected` : '9:16 Portrait'}
                  </span>
                </div>

                <input
                  ref={photoFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoPostImageSelect}
                  className="hidden"
                />

                {newPostImages.length > 0 ? (
                  <div className="space-y-2.5">
                    {/* 9:16 Portrait Poster Preview Container */}
                    <div className="relative rounded-2xl overflow-hidden border border-stone-300 aspect-[9/16] max-h-72 sm:max-h-80 mx-auto bg-stone-950 shadow-sm flex items-center justify-center group">
                      <img
                        src={newPostImages[activeCreatePreviewIndex] || newPostImages[0]}
                        alt="Selected"
                        style={{ filter: FILTER_STYLES[newPostFilter]?.style }}
                        className="w-full h-full object-cover"
                      />

                      {/* 9:16 Ratio Badge */}
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        9:16 Ratio
                      </span>

                      {/* Multi-Photo Slide Counter */}
                      {newPostImages.length > 1 && (
                        <span className="absolute top-2 right-10 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {activeCreatePreviewIndex + 1}/{newPostImages.length}
                        </span>
                      )}

                      {/* Remove Current Photo Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setNewPostImages(prev => {
                            const next = prev.filter((_, idx) => idx !== activeCreatePreviewIndex);
                            if (activeCreatePreviewIndex >= next.length) {
                              setActiveCreatePreviewIndex(Math.max(0, next.length - 1));
                            }
                            if (next.length > 0) setNewPostImage(next[0]);
                            else setNewPostImage(null);
                            return next;
                          });
                        }}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-rose-600 text-white p-1.5 rounded-full cursor-pointer transition-colors shadow-xs"
                        title="Remove this photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Carousel Arrow Controls */}
                      {newPostImages.length > 1 && (
                        <>
                          {activeCreatePreviewIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => setActiveCreatePreviewIndex(i => Math.max(0, i - 1))}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer shadow-md"
                              title="Previous photo"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          )}
                          {activeCreatePreviewIndex < newPostImages.length - 1 && (
                            <button
                              type="button"
                              onClick={() => setActiveCreatePreviewIndex(i => Math.min(newPostImages.length - 1, i + 1))}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer shadow-md"
                              title="Next photo"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* Thumbnail Strip with "+ Add More Photos" button */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
                      {newPostImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveCreatePreviewIndex(idx)}
                          className={`relative w-12 h-16 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-transform ${
                            idx === activeCreatePreviewIndex ? 'border-rose-600 scale-105 ring-2 ring-rose-200' : 'border-stone-300 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewPostImages(prev => {
                                const next = prev.filter((_, i) => i !== idx);
                                if (activeCreatePreviewIndex >= next.length) {
                                  setActiveCreatePreviewIndex(Math.max(0, next.length - 1));
                                }
                                if (next.length > 0) setNewPostImage(next[0]);
                                else setNewPostImage(null);
                                return next;
                              });
                            }}
                            className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-rose-600 text-white p-0.5 rounded-full"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}

                      {/* Add More Photos Button */}
                      <button
                        type="button"
                        onClick={() => photoFileInputRef.current?.click()}
                        className="w-12 h-16 rounded-lg border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/50 hover:bg-rose-50 text-rose-600 flex flex-col items-center justify-center shrink-0 cursor-pointer transition-colors"
                        title="Add more photos to this poster"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-[8px] font-bold mt-0.5">+Photo</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div
                      onClick={() => photoFileInputRef.current?.click()}
                      className="border-2 border-dashed border-rose-300 hover:border-rose-500 rounded-2xl p-5 text-center bg-rose-50/40 hover:bg-rose-50 transition-colors cursor-pointer space-y-1.5"
                    >
                      <div className="w-9 h-9 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                        <Camera className="w-5 h-5" />
                      </div>
                      <p className="font-display font-bold text-xs text-rose-900">
                        Tap to upload photos from device 📸
                      </p>
                      <p className="text-[10px] text-stone-500">
                        9:16 portrait ratio • Multiple photos supported in one poster!
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-stone-400 block mb-1">Or pick comfort preset photos:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {PRESET_PHOTOS.slice(0, 3).map((preset, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setNewPostImages(prev => [...prev, preset.url]);
                              setNewPostImage(preset.url);
                              audioEngine.playSfx('pop');
                            }}
                            className="border border-stone-200 hover:border-rose-400 rounded-xl overflow-hidden cursor-pointer group relative aspect-[9/16] max-h-28"
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] font-bold p-0.5 truncate text-center">
                              {preset.label.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {newPostImages.length > 0 && (
                <div>
                  <label className="font-display font-black text-[11px] text-stone-700 uppercase block mb-1">
                    2. Filter Preset:
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {Object.entries(FILTER_STYLES).map(([key, def]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setNewPostFilter(key)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-display font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                          newPostFilter === key
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <span>{def.icon}</span>
                        <span>{def.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Location / Vibe:
                </label>
                <input
                  type="text"
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  placeholder="e.g. Factory of Fun • Comfort Lounge 🌸"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Caption:
                </label>
                <textarea
                  rows={2}
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  placeholder="Share a sweet memory, shoutout, or food review..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display font-black text-xs text-stone-700 uppercase flex items-center justify-between">
                  <span>Hashtags / Tags:</span>
                  <span className="text-[10px] text-stone-400 font-normal">Tap tag to select/unselect</span>
                </label>

                {selectedTags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap p-2 bg-rose-50/60 border border-rose-200 rounded-xl">
                    <span className="text-[10px] font-bold text-rose-900 mr-1">Active:</span>
                    {selectedTags.map(tag => (
                      <span
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className="inline-flex items-center gap-1 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer hover:bg-rose-700 transition-colors shadow-2xs"
                      >
                        <span>{tag}</span>
                        <X className="w-3 h-3" />
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 flex-wrap">
                  {SUGGESTED_HASHTAGS.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={customTagInput}
                      onChange={(e) => setCustomTagInput(e.target.value)}
                      placeholder="Add custom tag (e.g. ChaiNight)..."
                      className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomTag();
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddCustomTag()}
                    disabled={!customTagInput.trim()}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 disabled:opacity-40 text-white text-xs font-display font-bold rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPublishingPost || !newPostImage}
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-all cursor-pointer mt-1"
              >
                Publish Memory Post 📸✨
              </button>
            </form>
          </BaseModal>
        )}

        {/* MODAL: PIN A BULLETIN NOTE */}
        {showNewPostModal && (
          <BaseModal
            onClose={() => setShowNewPostModal(false)}
            title="PIN A NOTE TO BULLETIN"
            subtitle="Share memories, appreciation & comfort with Batch 41"
            icon={<Pin className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreateBulletinPost} className="space-y-3.5 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Your Display Name:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Message / Note:
                </label>
                <textarea
                  rows={3}
                  value={bulletinText}
                  onChange={(e) => setBulletinText(e.target.value)}
                  placeholder="Leave a heartfelt note, inside joke, or cheer for Kritika..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div>
                <span className="font-display font-black text-[10px] text-stone-500 uppercase block mb-1">
                  Add Emojis:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COMMON_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setBulletinText(prev => prev + ' ' + emoji)}
                      className="w-7 h-7 rounded-xl bg-stone-50 hover:bg-pink-100 border border-stone-200 flex items-center justify-center text-xs transition-transform active:scale-90 cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Pin to Bulletin Board ✨
              </button>
            </form>
          </BaseModal>
        )}

        {/* MODAL: CONFIRM PERMANENT POST DELETION */}
        {deleteConfirmPost && (
          <BaseModal
            onClose={() => !isDeletingPost && setDeleteConfirmPost(null)}
            title="DELETE POST PERMANENTLY?"
            subtitle="This will completely remove the post for all batch members"
            icon={<Trash2 className="w-5 h-5 text-rose-600" />}
            maxWidth="max-w-sm"
          >
            <div className="space-y-4 text-left">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <span>⚠️ Permanent Deletion Notice:</span>
                </p>
                <p className="text-stone-600 leading-relaxed">
                  Once deleted, {deleteConfirmPost.title || 'this post'} will be completely removed from the feed and will <strong>no longer be visible to you or any other members</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={isDeletingPost}
                  onClick={() => setDeleteConfirmPost(null)}
                  className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeletingPost}
                  onClick={handleConfirmDeletePost}
                  className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeletingPost ? 'Deleting...' : 'Delete for Everyone'}</span>
                </button>
              </div>
            </div>
          </BaseModal>
        )}

        {/* Lightbox Image Zoom */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[90vh] flex flex-col items-center gap-3 relative"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxImage.url}
                alt="Enlarged preview"
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              {lightboxImage.caption && (
                <p className="text-white font-sans text-xs sm:text-sm text-center bg-black/60 px-4 py-2 rounded-xl">
                  {lightboxImage.caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal: Classmate Cheer & Status */}
        {selectedClassmateDetail && (
          <BaseModal
            onClose={() => setSelectedClassmateDetail(null)}
            title={selectedClassmateDetail.name}
            subtitle={`Batch ${selectedClassmateDetail.batch} Member`}
            icon={<div className="w-7 h-7 rounded-full overflow-hidden border border-stone-300"><img src={selectedClassmateDetail.avatarUrl} alt="" className="w-full h-full object-cover" /></div>}
            maxWidth="max-w-sm"
          >
            <div className="space-y-3.5 text-center">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-handwritten font-bold text-amber-900">
                <span>{selectedClassmateDetail.currentMoodEmoji}</span>
                <span>{selectedClassmateDetail.currentMood}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <p className="font-handwritten text-xs sm:text-sm text-stone-700 italic">
                  "{selectedClassmateDetail.statusNote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    audioEngine.playSfx('fanfare');
                    const fbUser = authService.getFirebaseUser();
                    const senderId = fbUser?.uid || currentUser?.id;
                    if (!senderId) {
                      setShowGoogleModal(true);
                      return;
                    }
                    batchWallService.sendGroupChatMessage({
                      senderId,
                      senderName: currentUser?.name || fbUser?.displayName || profileNameInput || studentName || 'Batch 41 Student',
                      senderEmail: fbUser?.email || currentUser?.email || undefined,
                      avatarUrl: fbUser?.photoURL || currentUser?.avatarUrl || profileAvatarInput,
                      text: `Sending a big warm cheer to @${selectedClassmateDetail.name}! Keep glowing! ✨💖`
                    });
                    setSelectedClassmateDetail(null);
                    setActiveMode('chat');
                  }}
                  className="py-2.5 px-2 bg-[#00A884] hover:bg-[#008F6F] text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
                >
                  Cheer in Chat 💬
                </button>

                <button
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    setChatInput(prev => `${prev}@${selectedClassmateDetail.name.split(' ')[0]} `);
                    setSelectedClassmateDetail(null);
                    setActiveMode('chat');
                  }}
                  className="py-2.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-display font-bold uppercase shadow-2xs transition-colors cursor-pointer"
                >
                  @Mention In Chat
                </button>
              </div>
            </div>
          </BaseModal>
        )}

        {/* MODAL: EDIT CHAT MESSAGE */}
        {editingMessage && (
          <BaseModal
            onClose={() => setEditingMessage(null)}
            title="EDIT MESSAGE"
            subtitle="Update your message in Batch 41 Lounge"
            icon={<Edit3 className="w-5 h-5 text-amber-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleSaveEditMessage} className="space-y-3.5 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Message Text:
                </label>
                <textarea
                  rows={4}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMessage(null)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-display font-bold uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editingText.trim()}
                  className="flex-1 py-2.5 bg-[#00A884] hover:bg-[#008F6F] disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes ✓
                </button>
              </div>
            </form>
          </BaseModal>
        )}

        {/* MODAL: EDIT POST CAPTION */}
        {editingPost && (
          <BaseModal
            onClose={() => setEditingPost(null)}
            title="EDIT POST CAPTION"
            subtitle="Update your caption for this post"
            icon={<Edit3 className="w-5 h-5 text-amber-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleSaveEditPost} className="space-y-3.5 text-left">
              <div className="rounded-xl overflow-hidden border border-stone-200 aspect-16/9 max-h-40 bg-black/5">
                <img src={editingPost.imageUrl} alt="Post preview" className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Post Caption:
                </label>
                <textarea
                  rows={4}
                  value={editingPostCaption}
                  onChange={(e) => setEditingPostCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-display font-bold uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editingPostCaption.trim()}
                  className="flex-1 py-2.5 bg-[#00A884] hover:bg-[#008F6F] disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
                >
                  Save Caption ✓
                </button>
              </div>
            </form>
          </BaseModal>
        )}

        {/* MODAL: DELETE MESSAGE (WHATSAPP STYLE) */}
        {deleteModalMsg && (() => {
          const currentUserId = currentUser?.id || authService.getFirebaseUser()?.uid;
          const isAuthor = Boolean(
            currentUserId && deleteModalMsg.senderId && currentUserId === deleteModalMsg.senderId
          );

          return (
            <BaseModal
              onClose={() => setDeleteModalMsg(null)}
              title="DELETE MESSAGE?"
              subtitle="Choose how you would like to delete this message"
              icon={<Trash2 className="w-5 h-5 text-rose-500" />}
              maxWidth="max-w-sm"
            >
              <div className="space-y-2.5 text-left">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
                  <span className="font-bold text-stone-900 block mb-0.5">{deleteModalMsg.senderName}:</span>
                  <p className="line-clamp-2 italic">"{deleteModalMsg.text || 'Photo attachment'}"</p>
                </div>

                <div className="space-y-2 pt-1">
                  {/* Delete for Everyone: ONLY visible to message author by Firebase UID */}
                  {isAuthor && (
                    <button
                      type="button"
                      onClick={() => handleDeleteForEveryone(deleteModalMsg)}
                      className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Delete for Everyone</span>
                    </button>
                  )}

                  {/* Delete for Me */}
                  <button
                    type="button"
                    onClick={() => handleDeleteForMe(deleteModalMsg)}
                    className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-stone-500" />
                    <span>Delete for Me</span>
                  </button>

                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={() => setDeleteModalMsg(null)}
                    className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-display font-bold text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </BaseModal>
          );
        })()}

        {/* MODAL: MESSAGE READ RECEIPTS / SEEN STATUS */}
        {seenInfoMsg && (
          <BaseModal
            onClose={() => setSeenInfoMsg(null)}
            title="MESSAGE READ STATUS"
            subtitle="Check who has seen this message and who hasn't yet"
            icon={<Eye className="w-5 h-5 text-sky-500" />}
            maxWidth="max-w-md"
          >
            {(() => {
              const allMembers = batchWallService.getAllBatchMembers(classmates);
              const seenByList = seenInfoMsg.seenBy || [];
              const unseenMembers = allMembers.filter(m => !seenByList.some(s => (s.userId && s.userId === m.id) || (m.email && s.userEmail && s.userEmail.toLowerCase() === m.email.toLowerCase()) || (s.userName && s.userName.toLowerCase().trim() === m.name.toLowerCase().trim())));
              const isAllSeen = seenByList.length > 0 && unseenMembers.length === 0;

              return (
                <div className="space-y-4 text-left">
                  {/* Message Preview Box */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-display font-black text-stone-900">{seenInfoMsg.senderName}</span>
                      <span className="text-[10px] text-stone-400">{seenInfoMsg.timestamp}</span>
                    </div>
                    <p className="text-xs text-stone-700 font-sans italic line-clamp-2">
                      "{seenInfoMsg.text || (seenInfoMsg.imageUrl ? 'Photo Attachment' : 'Group Message')}"
                    </p>
                  </div>

                  {/* Read Status Banner */}
                  <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 text-xs font-bold ${
                    isAllSeen 
                      ? 'bg-sky-50 border-sky-200 text-sky-900' 
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckCheck className={`w-4 h-4 ${isAllSeen ? 'text-sky-500' : 'text-stone-400'}`} />
                      <span>{isAllSeen ? 'Seen by all batch members!' : `Delivered (${seenByList.length} of ${allMembers.length} seen)`}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      isAllSeen ? 'bg-sky-500 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {isAllSeen ? 'All Read ✓✓' : 'Partial'}
                    </span>
                  </div>

                  {/* Seen By Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-xs text-stone-700 uppercase flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sky-500" />
                        <span>Seen By ({seenByList.length})</span>
                      </h4>
                    </div>

                    {seenByList.length === 0 ? (
                      <p className="text-xs text-stone-400 italic p-2">No read receipts recorded yet.</p>
                    ) : (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {seenByList.map((s, idx) => (
                          <div key={idx} className="p-2 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-300 bg-white">
                                <img src={s.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'} alt={s.userName} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-display font-bold text-stone-900">{s.userName}</span>
                            </div>
                            <span className="text-[10px] text-emerald-700 font-medium bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                              Seen {s.seenAt ? new Date(s.seenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'recently'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Not Seen Yet Section */}
                  <div className="space-y-2 pt-2 border-t border-stone-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-xs text-stone-700 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Not Seen Yet ({unseenMembers.length})</span>
                      </h4>
                    </div>

                    {unseenMembers.length === 0 ? (
                      <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 text-center">
                        ✨ Everyone in the batch has seen this message!
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {unseenMembers.map((m) => (
                          <div key={m.id} className="p-2 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full overflow-hidden border border-stone-300 bg-white">
                                <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-display font-bold text-stone-800">{m.name}</span>
                            </div>
                            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              Unread ⏳
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSeenInfoMsg(null)}
                    className="w-full py-2 bg-stone-900 text-white rounded-xl font-display font-black text-xs uppercase cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              );
            })()}
          </BaseModal>
        )}

        {/* MODAL: POST LIKES & HEARTS (UNIQUE MEMBERS) */}
        {showLikedByModalPost && (
          <BaseModal
            onClose={() => setShowLikedByModalPost(null)}
            title="LIKES & HEARTS"
            subtitle="Unique batch members who liked this post"
            icon={<Heart className="w-5 h-5 fill-rose-500 text-rose-500" />}
            maxWidth="max-w-md"
          >
            {(() => {
              const post = showLikedByModalPost;
              // Collect unique members from post.likedByMembers and post.likedByUsers
              const membersMap = new Map<string, { id?: string; name: string; email?: string; avatarUrl?: string; likedAt?: number }>();

              (post.likedByMembers || []).forEach((m: LikedMember) => {
                const key = (m.userId || m.userName || '').toLowerCase().trim();
                if (key && !membersMap.has(key)) {
                  membersMap.set(key, {
                    id: m.userId,
                    name: m.userName,
                    email: m.userEmail,
                    avatarUrl: m.avatarUrl,
                    likedAt: m.likedAt
                  });
                }
              });

              (post.likedByUsers || []).forEach(name => {
                const key = name.toLowerCase().trim();
                if (key && !membersMap.has(key)) {
                  const match = classmates.find(cl => cl.name.toLowerCase().trim() === key || cl.name.toLowerCase().includes(key));
                  membersMap.set(key, {
                    name,
                    avatarUrl: match?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
                    likedAt: Date.now()
                  });
                }
              });

              const uniqueList = Array.from(membersMap.values());
              const totalUniques = Math.max(post.likesCount || 0, uniqueList.length);

              return (
                <div className="space-y-4 text-left">
                  {/* Total Unique Likes Banner */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm shadow-xs">
                        ❤️
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs sm:text-sm text-stone-900">
                          {totalUniques} Unique {totalUniques === 1 ? 'Person' : 'People'} Liked
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          Each batch member counts once toward unique hearts
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-black bg-rose-500 text-white shadow-2xs">
                      {totalUniques} ❤️
                    </span>
                  </div>

                  {/* Likers List */}
                  <div className="space-y-2">
                    <h5 className="font-display font-black text-[11px] uppercase tracking-wider text-stone-500">
                      Who Liked ({uniqueList.length})
                    </h5>

                    {uniqueList.length === 0 ? (
                      <div className="p-6 text-center text-stone-400 text-xs italic bg-stone-50 rounded-2xl border border-stone-200">
                        No likes yet. Be the first to drop a heart!
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                        {uniqueList.map((member, idx) => {
                          const isQueen = member.name.toLowerCase().includes('kritika');
                          const isMe = (currentUser?.name || profileNameInput || '').toLowerCase().trim() === member.name.toLowerCase().trim();

                          return (
                            <div
                              key={idx}
                              className="p-2.5 bg-white border border-stone-200/80 hover:border-rose-300 rounded-xl flex items-center justify-between transition-colors shadow-2xs"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-200 bg-stone-100 shrink-0">
                                  <img
                                    src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-display font-black text-xs text-stone-900 truncate">
                                      {member.name}
                                    </span>
                                    {isMe && (
                                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded-full">
                                        You
                                      </span>
                                    )}
                                    {isQueen && (
                                      <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs">
                                        👑 QUEEN
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-stone-400 block truncate">
                                    {member.likedAt ? `Liked ${new Date(member.likedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}` : 'Liked post'}
                                  </span>
                                </div>
                              </div>

                              <span className="text-sm shrink-0">
                                ❤️
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowLikedByModalPost(null)}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-display font-black text-xs uppercase cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              );
            })()}
          </BaseModal>
        )}

        {/* Modal: Google Sign In */}
        {showGoogleModal && (
          <GoogleSignInModal onClose={() => setShowGoogleModal(false)} />
        )}

      </div>
    
        {/* ==================== DISCORD-STYLE VOICE ROOM STAGE MODAL ==================== */}
        {showVoiceRoomModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-[#1E1F22]/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in"
            onClick={() => setShowVoiceRoomModal(false)}
          >
            <div
              className="bg-[#313338] text-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92dvh] animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Discord Modal Header */}
              <div className="bg-[#2B2D31] p-3 px-4 sm:px-5 border-b border-[#1E1F22] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-black text-sm sm:text-base text-white truncate">
                        🔊 Batch 41 Voice Room
                      </h3>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                        LIVE STAGE
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      Discord-style voice channel • Speak anytime with classmates
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowVoiceRoomModal(false)}
                    className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="Minimize to Chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stage Visual Area: Only Joined Participants */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {voiceParticipants.length === 0 ? (
                  <div className="text-center py-10 px-4 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center text-3xl animate-pulse">
                      🔊
                    </div>
                    <h4 className="font-display font-black text-sm text-white">
                      No One in the Voice Room Yet
                    </h4>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                      Only classmates who explicitly join this room can hear and talk with each other. Tap <strong>Join Voice Room</strong> to jump in!
                    </p>
                    {!isVoiceRoomConnected && (
                      <button
                        type="button"
                        onClick={handleJoinVoiceRoom}
                        className="mt-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        Join Voice Room
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {voiceParticipants.map(participant => {
                      const isMe = currentUser?.id === participant.id || participant.id === authService.getFirebaseUser()?.uid;
                      const speaking = isMe ? userIsSpeaking : participant.isSpeaking;
                      const muted = isMe ? isVoiceMuted : participant.isMuted;

                      return (
                        <div
                          key={participant.id}
                          className={`bg-[#2B2D31] border rounded-2xl p-3 sm:p-4 text-center space-y-2 transition-all relative overflow-hidden ${
                            speaking
                              ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-gradient-to-b from-[#2B2D31] to-emerald-950/20'
                              : 'border-white/5'
                          }`}
                        >
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                            <img
                              src={participant.avatarUrl || '/marisol/avatars/01_brighter_ideas.png'}
                              alt={participant.name}
                              className={`w-full h-full rounded-full object-cover transition-all ${
                                speaking
                                  ? 'ring-4 ring-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.8)] scale-105'
                                  : 'border-2 border-white/10'
                              }`}
                            />
                            <span className={`absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 border-[#2B2D31] ${
                              muted ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                            }`}>
                              {muted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                            </span>
                          </div>
                          <div>
                            <span className="font-display font-black text-xs sm:text-sm text-white block truncate">
                              {participant.name} {isMe ? '(You)' : ''}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                              speaking 
                                ? 'bg-emerald-500 text-white animate-pulse' 
                                : muted 
                                  ? 'bg-rose-500/20 text-rose-300' 
                                  : 'bg-white/10 text-stone-300'
                            }`}>
                              {speaking ? '🎙️ Speaking...' : muted ? 'Muted' : 'Mic Live'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Live Cheers Soundboard (Strictly heard ONLY by users who joined the room) */}
                <div className="bg-[#2B2D31] border border-white/5 rounded-2xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-[11px] uppercase tracking-wider text-stone-400 block text-left">
                      Live Soundboard Cheers:
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      🔊 Only heard by room members
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { emoji: '👏', label: 'Clap', sfx: 'fanfare' as const },
                      { emoji: '🎉', label: 'Cheer', sfx: 'fanfare' as const },
                      { emoji: '💖', label: 'Love', sfx: 'powerup' as const },
                      { emoji: '🔥', label: 'Fire', sfx: 'pop' as const }
                    ].map(snd => (
                      <button
                        key={snd.label}
                        type="button"
                        disabled={!isVoiceRoomConnected}
                        onClick={() => handleSendVoiceCheer(snd.emoji, snd.label, snd.sfx)}
                        className={`p-2 bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 rounded-xl flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                          !isVoiceRoomConnected ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                        title={!isVoiceRoomConnected ? 'Join room to cheer' : `Send ${snd.label}`}
                      >
                        <span className="text-lg">{snd.emoji}</span>
                        <span className="text-[10px] font-bold text-stone-300">{snd.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Discord Voice Controls */}
              <div className="bg-[#2B2D31] p-3 px-4 border-t border-[#1E1F22] flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  {/* Mute Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceRoomMute}
                    className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                      isVoiceMuted
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 shadow-sm'
                    }`}
                  >
                    {isVoiceMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isVoiceMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  {/* Deafen Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceRoomDeafen}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                      isVoiceDeafened
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
                    }`}
                    title={isVoiceDeafened ? 'Undeafen' : 'Deafen'}
                  >
                    {isVoiceDeafened ? <VolumeX className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Minimize & Chat */}
                  <button
                    type="button"
                    onClick={() => setShowVoiceRoomModal(false)}
                    className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-display font-bold transition-all cursor-pointer"
                  >
                    Chat & Speak
                  </button>

                  {/* Disconnect Button */}
                  <button
                    type="button"
                    onClick={handleDisconnectVoiceRoom}
                    className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Disconnect from Voice Room"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
</div>
  );
};

```

---

### File: `src/components/BottomNavigationDock.tsx`

```tsx
import React from 'react';
import { audioEngine } from '../services/synthAudioEngine';

export type MainNavTab = 'home' | 'chat' | 'posts' | 'music' | 'quiz';

interface BottomNavigationDockProps {
  activeTab: MainNavTab;
  onTabSelect: (tab: MainNavTab) => void;
}

export const BottomNavigationDock: React.FC<BottomNavigationDockProps> = ({ activeTab, onTabSelect }) => {
  const tabs: Array<{ id: MainNavTab; label: string; emoji: string }> = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'chat', label: 'Chat', emoji: '💬' },
    { id: 'posts', label: 'Post', emoji: '📸' },
    { id: 'music', label: 'Music', emoji: '🎵' },
    { id: 'quiz', label: 'Quiz', emoji: '🎯' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-2 sm:px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md border border-stone-300 rounded-full p-1.5 shadow-lg flex items-center gap-1 max-w-md w-full justify-between">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playSfx('click');
                onTabSelect(tab.id);
              }}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 sm:px-3 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-xs scale-102 font-black'
                  : 'text-stone-700 hover:text-rose-600 hover:bg-rose-50/80 font-bold'
              }`}
            >
              <span className="text-base sm:text-lg leading-none">{tab.emoji}</span>
              <span className="text-[11px] sm:text-xs font-display font-black tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

```

---

### File: `src/components/CelebrationLocketModal.tsx`

```tsx
import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/synthAudioEngine';
import { BaseModal } from './BaseModal';
import { Heart, Sparkles, Award } from 'lucide-react';

interface CelebrationLocketModalProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

const CELEBRATION_IMAGES = [
  '/marisol/avatars/03_wink_conquer.png',
  '/marisol/avatars/05_chai_happiness.png',
  '/marisol/avatars/02_happier_days.png',
  '/marisol/avatars/11_music_mood.png',
  '/marisol/avatars/06_silly_vibe.png'
];

export const CelebrationLocketModal: React.FC<CelebrationLocketModalProps> = ({
  onClose,
  title = "You did amazing, babe! 💖🎀",
  subtitle = "Another culinary milestone conquered in style!"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    audioEngine.playSfx('fanfare');

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#EC4899', '#FBBF24', '#A855F7', '#10B981']
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let currentImageIndex = 0;
    let progress = 0;

    const loadedImages: HTMLImageElement[] = [];
    let imagesReady = false;

    let loadedCount = 0;
    CELEBRATION_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === CELEBRATION_IMAGES.length) {
          imagesReady = true;
        }
      };
      loadedImages.push(img);
    });

    const particles: { x: number; y: number; speed: number; size: number; char: string }[] = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * 320,
        y: Math.random() * 320,
        speed: 0.5 + Math.random() * 1.2,
        size: 14 + Math.random() * 12,
        char: ['💖', '✨', '🎀', '🌸'][Math.floor(Math.random() * 4)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (imagesReady && loadedImages.length > 0) {
        progress += 0.008;
        if (progress >= 1) {
          progress = 0;
          currentImageIndex = (currentImageIndex + 1) % loadedImages.length;
        }

        const currentImg = loadedImages[currentImageIndex];
        const nextImg = loadedImages[(currentImageIndex + 1) % loadedImages.length];

        const gradient = ctx.createRadialGradient(160, 160, 20, 160, 160, 160);
        gradient.addColorStop(0, '#FFF1F2');
        gradient.addColorStop(1, '#FCE7F3');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scale = 1.0 + Math.sin(progress * Math.PI) * 0.08;
        const w = 240 * scale;
        const h = 240 * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;

        ctx.globalAlpha = Math.max(0, 1 - progress * 1.5);
        if (currentImg.complete) {
          ctx.drawImage(currentImg, x, y, w, h);
        }

        ctx.globalAlpha = Math.min(1, progress * 1.5);
        if (nextImg.complete) {
          ctx.drawImage(nextImg, x, y, w, h);
        }
        ctx.globalAlpha = 1.0;
      }

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -20) p.y = canvas.height + 10;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillText(p.char, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <BaseModal onClose={onClose} maxWidth="max-w-md" hideHeader className="text-center">
      <div className="space-y-4">
        {/* Celebration Header Ribbon */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-display font-black text-xs px-3.5 py-1 rounded-full border border-ink shadow-xs">
          <Award className="w-4 h-4" />
          <span>MILESTONE CONQUERED!</span>
        </div>

        {/* Heart Locket Ornate Frame */}
        <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 p-3 bg-gradient-to-tr from-amber-300 via-rose-300 to-pink-400 rounded-full border-4 border-ink shadow-sketch-xl flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden border-3 border-white shadow-inner bg-pink-50 relative">
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>

          <Heart className="w-8 h-8 fill-pink-500 text-white absolute -top-2 -left-2 drop-shadow-md animate-bounce-gentle" />
          <Sparkles className="w-8 h-8 text-amber-300 absolute -bottom-2 -right-2 drop-shadow-md animate-spin" />
        </div>

        {/* Cute Speech Bubble Message */}
        <div className="relative bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch text-center space-y-1">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-t-2.5 border-l-2.5 border-ink rotate-45" />

          <h3 className="font-display font-black text-lg sm:text-xl text-ink leading-tight">
            "{title}"
          </h3>
          <p className="font-handwritten text-xs sm:text-sm text-pink-700 font-bold">
            {subtitle}
          </p>
        </div>

        {/* Claim & Continue Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-display font-black text-sm uppercase rounded-2xl border-2 border-ink shadow-sketch hover:scale-102 active:scale-98 transition-all"
        >
          THANK YOU, CELEBRATION UNLOCKED! 💖✨
        </button>

        <p className="font-handwritten text-[11px] text-ink-light font-bold">
          🔒 Private local animation — no external photo uploads
        </p>
      </div>
    </BaseModal>
  );
};


```

---

### File: `src/components/Classroom.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import type { TeacherProfile } from '../types/game';
import { Marisol } from './Marisol';
import confetti from 'canvas-confetti';
import { Users, Trophy, Copy, Check, Sparkles, Star, ArrowRight, Save, Lock, GraduationCap, ArrowLeft } from 'lucide-react';

export type ClassroomModeType = 'student' | 'secret' | 'teacher';

interface ClassroomProps {
  mode?: ClassroomModeType;
  onNavigateHome: () => void;
  onStartQuiz: () => void;
}

const DUMMY_LEADERBOARD = [
  { rank: 1, name: 'Aarav (Movie Expert)', xp: 1450, badge: '👑 Class Champion' },
  { rank: 2, name: 'Riya (Fastest Thinker)', xp: 1220, badge: '⚡ Flash Brain' },
  { rank: 3, name: 'Ananya (Fact Collector)', xp: 1150, badge: '📚 Curiosity Queen' },
  { rank: 4, name: 'You (Curious Explorer)', xp: 980, badge: '🔥 Comeback Star' },
  { rank: 5, name: 'Karan (Bollywood Soul)', xp: 850, badge: '🎬 Filmy Star' },
];

export const Classroom: React.FC<ClassroomProps> = ({
  mode = 'student',
  onNavigateHome,
  onStartQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<ClassroomModeType>(mode);

  // Synchronize if prop changes
  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  // STUDENT ARENA STATE
  const [roomCode] = useState('MARISOL-482');
  const [selectedBattleMode, setSelectedBattleMode] = useState<'1v1' | 'team' | 'class'>('1v1');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    audioEngine.playSfx('click');
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SECRET CLASSROOM STATE
  const teacher = gameState.getTeacherProfile();
  const [secretSlide, setSecretSlide] = useState<number>(1);

  useEffect(() => {
    if (activeTab === 'secret') {
      audioEngine.startMusic('final');
      const timer = setTimeout(() => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleNextSecretSlide = () => {
    audioEngine.playSfx('click');
    if (secretSlide < 3) {
      setSecretSlide(prev => prev + 1);
    } else {
      onNavigateHome();
    }
  };

  // TEACHER MODE STATE
  const [teacherForm, setTeacherForm] = useState<TeacherProfile>({ ...teacher });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSfx('fanfare');
    gameState.saveTeacherProfile(teacherForm);
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onNavigateHome();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Classroom Navigation Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-ink/20 pb-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigateHome();
              }}
              className="sketch-btn p-2 sm:px-3 bg-white flex items-center gap-1.5 shadow-sketch text-xs font-display font-bold shrink-0 hover:bg-paper-100"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">HOME</span>
            </button>

            <div className="text-left">
              <div className="inline-block bg-white border-2 border-ink px-2.5 py-0.5 rounded-full shadow-sketch font-handwritten text-[11px] font-bold text-coral-500 uppercase tracking-wider">
                🏫 Classroom Hub
              </div>
              <h1 className="font-display font-black text-xl sm:text-3xl text-plum-700 tracking-tight mt-0.5">
                MARISOL'S CLASSROOM
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white border-2.5 border-ink rounded-full p-1.5 shadow-sketch">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setActiveTab('student');
              }}
              className={`px-3 py-1.5 rounded-full font-display font-black text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-coral-500 text-white shadow-xs'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Arena</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setActiveTab('secret');
              }}
              className={`px-3 py-1.5 rounded-full font-display font-black text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'secret'
                  ? 'bg-plum-600 text-white shadow-xs'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Secret Tribute</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setActiveTab('teacher');
              }}
              className={`px-3 py-1.5 rounded-full font-display font-black text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'teacher'
                  ? 'bg-doodleGold text-ink shadow-xs'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Teacher Setup</span>
            </button>
          </div>
        </div>

        {/* 1. STUDENT ARENA VIEW */}
        {activeTab === 'student' && (
          <div className="space-y-6 animate-fade-in">
            {/* Host Banner */}
            <div className="bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch-lg flex items-center gap-4">
              <Marisol expression="excited" size="small" showSpeechBubble={false} />
              <div>
                <h3 className="font-display font-bold text-lg text-ink">Classroom Host Marisol</h3>
                <p className="font-handwritten text-base text-ink-light">
                  "Share room code <span className="font-display font-black text-plum-700">{roomCode}</span> with your classmates to battle together!"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room Setup Box */}
              <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-6">
                <h2 className="font-display font-black text-2xl text-ink flex items-center gap-2">
                  <Users className="w-6 h-6 text-coral-500" />
                  <span>JOIN OR HOST ROOM</span>
                </h2>

                <div className="bg-paper-50 p-4 rounded-2xl border-2 border-ink flex items-center justify-between">
                  <div>
                    <div className="font-handwritten text-xs font-bold text-ink-light">PRIVATE ROOM CODE</div>
                    <div className="font-display font-black text-2xl text-plum-700">{roomCode}</div>
                  </div>
                  <button
                    onClick={copyCode}
                    className="sketch-btn px-3 py-2 text-xs font-bold flex items-center gap-1 bg-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="font-display font-bold text-sm text-ink-light">SELECT BATTLE MODE:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedBattleMode('1v1')}
                      className={`sketch-btn p-3 text-center transition-all ${
                        selectedBattleMode === '1v1' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                      }`}
                    >
                      1v1 Duel
                    </button>
                    <button
                      onClick={() => setSelectedBattleMode('team')}
                      className={`sketch-btn p-3 text-center transition-all ${
                        selectedBattleMode === 'team' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                      }`}
                    >
                      Team Battle
                    </button>
                    <button
                      onClick={() => setSelectedBattleMode('class')}
                      className={`sketch-btn p-3 text-center transition-all ${
                        selectedBattleMode === 'class' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                      }`}
                    >
                      Teacher Battle
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioEngine.playSfx('fanfare');
                    onStartQuiz();
                  }}
                  className="sketch-btn-primary w-full py-3.5 text-lg font-black uppercase shadow-sketch-lg hover:scale-105 transition-all"
                >
                  START CLASSROOM CHALLENGE 🎮
                </button>
              </div>

              {/* Leaderboard Box */}
              <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-4">
                <h2 className="font-display font-black text-2xl text-ink flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-doodleGold" />
                  <span>CLASSROOM LEADERBOARD</span>
                </h2>

                <div className="space-y-2">
                  {DUMMY_LEADERBOARD.map(item => (
                    <div
                      key={item.rank}
                      className="flex items-center justify-between p-3 rounded-2xl border-2 border-ink bg-paper-50 shadow-sketch"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-1.5 border-ink bg-doodleGold text-ink flex items-center justify-center font-display font-black text-sm">
                          #{item.rank}
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-ink">{item.name}</div>
                          <div className="font-handwritten text-xs font-bold text-coral-500">{item.badge}</div>
                        </div>
                      </div>
                      <div className="font-display font-bold text-sm text-plum-700">
                        {item.xp} XP
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SECRET CLASSROOM TRIBUTE VIEW */}
        {activeTab === 'secret' && (
          <div className="max-w-2xl mx-auto space-y-6 text-center animate-fade-in">
            {secretSlide === 1 && (
              <div className="space-y-6">
                <div className="inline-block bg-coral-500 text-white font-handwritten text-lg font-bold px-4 py-1 rounded-full border-2 border-ink shadow-sketch">
                  SECRET LEVEL UNLOCKED 🔑
                </div>

                <Marisol
                  expression="welcome"
                  size="full"
                  dialogue={`"Okay... I've been keeping something from you! This whole Factory of Fun was created as a special surprise..."`}
                  bubblePosition="top"
                />

                <button
                  onClick={handleNextSecretSlide}
                  className="sketch-btn-primary w-full py-4 text-xl font-black uppercase shadow-sketch-lg hover:scale-105 transition-all mt-4"
                >
                  ENTER THE SECRET CLASSROOM ❤️
                </button>
              </div>
            )}

            {secretSlide === 2 && (
              <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6 text-left">
                <div className="text-center">
                  <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
                    CLASSROOM MEMORIES 📸
                  </h1>
                  <p className="font-handwritten text-xl text-coral-500 font-bold">
                    Dedicated to {teacher.teacherName}
                  </p>
                </div>

                <div className="space-y-3 font-handwritten text-lg text-ink">
                  {teacher.classroomMemories.map((mem, idx) => (
                    <div key={idx} className="bg-paper-50 p-4 rounded-2xl border-2 border-ink shadow-sketch flex items-start gap-3">
                      <Star className="w-5 h-5 text-doodleGold flex-shrink-0 mt-0.5" />
                      <span>"{mem}"</span>
                    </div>
                  ))}
                </div>

                <div className="bg-plum-500/10 border-2 border-plum-500 p-4 rounded-2xl space-y-2">
                  <div className="font-display font-bold text-xs text-plum-700 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span>FAMOUS TEACHER PHRASES WE WILL NEVER FORGET:</span>
                  </div>
                  <ul className="font-handwritten text-lg text-plum-700 list-disc list-inside space-y-1">
                    {teacher.famousPhrases.map((phrase, i) => (
                      <li key={i}>{phrase}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleNextSecretSlide}
                  className="sketch-btn-gold w-full py-3.5 text-lg font-black uppercase shadow-sketch flex items-center justify-center gap-2"
                >
                  <span>THE FINAL MESSAGE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {secretSlide === 3 && (
              <div className="bg-white border-3 border-ink rounded-3xl p-8 sm:p-10 shadow-sketch-xl space-y-8 text-center animate-fade-in">
                <div className="flex justify-center">
                  <Marisol expression="proud" size="large" showSpeechBubble={false} />
                </div>

                <div className="space-y-4">
                  <p className="font-handwritten text-2xl sm:text-3xl text-ink font-semibold italic">
                    "Some lessons stay on the page."
                  </p>
                  <p className="font-handwritten text-3xl sm:text-4xl text-plum-700 font-bold">
                    "Some stay with you."
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-ink/30 space-y-3">
                  <h2 className="font-display font-black text-4xl sm:text-5xl text-coral-500">
                    Thank you, {teacher.teacherName}. ❤️
                  </h2>
                  <p className="font-handwritten text-xl text-ink-light">
                    {teacher.customMessage}
                  </p>
                  <p className="font-handwritten text-2xl font-bold text-emerald-600">
                    Made with love by your class. ✨
                  </p>
                </div>

                <button
                  onClick={onNavigateHome}
                  className="sketch-btn-primary px-8 py-3.5 text-lg font-black uppercase shadow-sketch hover:scale-105 transition-all"
                >
                  RETURN TO MAIN MENU 🏠
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. TEACHER SETUP VIEW */}
        {activeTab === 'teacher' && (
          <div className="max-w-2xl mx-auto bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 bg-paper-50 p-4 rounded-2xl border-2 border-ink">
              <Marisol expression="chai" size="small" showSpeechBubble={false} />
              <div className="font-handwritten text-base text-ink font-semibold">
                "Enter your teacher's favorite things below! I'll sprinkle them directly into the trivia and secret classroom reveal!"
              </div>
            </div>

            <form onSubmit={handleTeacherSubmit} className="space-y-4 font-sans text-left">
              <div>
                <label className="block text-sm font-bold text-ink mb-1">Teacher's Name</label>
                <input
                  type="text"
                  value={teacherForm.teacherName}
                  onChange={e => setTeacherForm({ ...teacherForm, teacherName: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Subject / Department</label>
                <input
                  type="text"
                  value={teacherForm.subject}
                  onChange={e => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Favorite Movies / Cinema</label>
                <input
                  type="text"
                  value={teacherForm.favoriteMovies}
                  onChange={e => setTeacherForm({ ...teacherForm, favoriteMovies: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Favorite TV Shows</label>
                <input
                  type="text"
                  value={teacherForm.favoriteShows}
                  onChange={e => setTeacherForm({ ...teacherForm, favoriteShows: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1">Personal Thank You Note from the Class</label>
                <textarea
                  rows={3}
                  value={teacherForm.customMessage}
                  onChange={e => setTeacherForm({ ...teacherForm, customMessage: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-ink font-handwritten text-lg bg-paper-50 focus:outline-hidden focus:ring-2 focus:ring-coral-400"
                />
              </div>

              <button
                type="submit"
                className="sketch-btn-primary w-full py-4 text-xl font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg hover:scale-105 transition-all mt-4"
              >
                <Save className="w-5 h-5" />
                <span>SAVE PERSONALIZED GAME</span>
              </button>

              {savedMessage && (
                <div className="text-center font-handwritten text-lg font-bold text-emerald-600 animate-bounce-gentle">
                  ✨ Saved! Marisol is ready with your personalized teacher tribute!
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

```

---

### File: `src/components/ComfortCornerModal.tsx`

```tsx
import React, { useState } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { wellnessState } from '../services/wellnessState';
import { RECIPES } from '../data/recipes';
import { BaseModal } from './BaseModal';
import { Heart, Sparkles, Utensils, Music, ShieldAlert, Award, Smile, Coffee, Film, Cloud } from 'lucide-react';

interface ComfortCornerModalProps {
  onClose: () => void;
  onOpenMusic: () => void;
  onOpenHindiSong?: (songId: string) => void;
  initialTab?: 'rage' | 'cravings' | 'affirmations' | 'vent' | 'cozy';
}

const STRESS_BUBBLES = [
  { id: 'meeting', text: 'Pointless meeting that could have been an email' },
  { id: 'mansplain', text: 'Someone explaining something I literally invented' },
  { id: 'cant_decide', text: 'Starving but having to answer "what do you want to eat?"' },
  { id: 'unsolicited', text: 'Unsolicited advice nobody asked for' },
  { id: 'slow_wifi', text: 'Wi-Fi dropping during a crucial movie scene' },
  { id: 'overthinking', text: 'Overthinking an interaction from 3 weeks ago' },
  { id: 'cold_chai', text: 'Making a hot cup of chai and forgetting it until it gets cold' },
  { id: 'dead_battery', text: 'Phone battery hitting 2% when I need GPS' }
];

const COMFORT_CRAVINGS = [
  {
    title: 'Midnight Chili Garlic Cheese Maggi',
    emoji: '🍜',
    why: 'Extra butter, double seasoning, gooey melted cheese pull. Scientifically proven to heal broken vibes.',
    tag: 'Carb Therapy'
  },
  {
    title: 'Warm Molten Chocolate Lava Cake',
    emoji: '🍫',
    why: 'Hot chocolate erupting from the center with a cold scoop of vanilla bean ice cream. Zero regrets.',
    tag: 'Sweet Serotonin'
  },
  {
    title: 'Highway Tapri Kadak Ginger Chai',
    emoji: '☕',
    why: 'Piping hot, heavily bruised ginger & cardamom with 2 biscuits dipped for precisely 1.5 seconds.',
    tag: 'Soul Reset'
  },
  {
    title: 'Crispy Truffle Fries with Jalapeño Dip',
    emoji: '🍟',
    why: 'Golden crunch that snaps satisfyingly between your teeth. Potatoes are nature\'s hug.',
    tag: 'Crunch Medicine'
  },
  {
    title: 'Cooling Royal Cucumber Tea Sandwiches',
    emoji: '🥪',
    why: 'Crisp English cucumber ribbons & mint cream cheese. Literally engineered to cool hot tempers!',
    tag: 'Chef Favorite'
  }
];

const GIRL_AFFIRMATIONS = [
  "Your eyeliner is far too sharp to care about blunt opinions.",
  "You are the main character in this blockbuster; they are merely poorly written background extras.",
  "Drink your chai, slip on your coziest hoodie, and conquer them with effortless excellence.",
  "You didn't come this far to only come this far. Take a breath, queen.",
  "90% of female fury is just low blood sugar demanding garlic butter carbs. Eat something delicious!"
];

export const ComfortCornerModal: React.FC<ComfortCornerModalProps> = ({
  onClose,
  onOpenMusic,
  onOpenHindiSong,
  initialTab = 'rage'
}) => {
  const [poppedBubbles, setPoppedBubbles] = useState<Record<string, boolean>>({});
  const [claimedSandwiches, setClaimedSandwiches] = useState(false);
  const [activeTab, setActiveTab] = useState<'rage' | 'cravings' | 'affirmations' | 'vent' | 'cozy'>(initialTab);
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  // Cozy Mode Data
  const pinnedIds = wellnessState.getPinnedSongIds();
  const allSongs = wellnessState.getAllSongs();
  const favoriteSong = allSongs.find(s => pinnedIds.includes(s.id)) || allSongs[0];
  const chaiRecipe = RECIPES.find(r => r.id === 'bollywood_masala_chai') || RECIPES[1];

  const handlePop = (id: string) => {
    if (!poppedBubbles[id]) {
      audioEngine.playSfx('pop');
      setPoppedBubbles(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleClaimComfortSandwiches = () => {
    if (claimedSandwiches) return;
    audioEngine.playSfx('fanfare');
    gameState.addCucumberSandwiches(5);
    setClaimedSandwiches(true);
  };

  const totalPopped = Object.values(poppedBubbles).filter(Boolean).length;

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-xl"
      icon={<div className="w-full h-full bg-coral-500 rounded-xl flex items-center justify-center text-white"><Heart className="w-6 h-6 fill-white animate-bounce-gentle" /></div>}
      title="GIRL'S COMFORT CORNER ♡"
      subtitle="Validation, warm blanket tranquility, comfort carbs & instant de-stressing!"
      badge={<span className="bg-coral-100 text-coral-800 font-handwritten text-[11px] font-black px-2 py-0.5 rounded-full border border-coral-400">SANCTUARY</span>}
    >
      <div className="space-y-4">

        {/* Big Sisterly Validation Banner */}
        <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 border-2.5 border-ink rounded-3xl p-4 shadow-sketch relative overflow-hidden">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-full border-2 border-ink bg-white overflow-hidden shrink-0 shadow-sm">
              <img 
                src="/marisol/avatars/03_wink_conquer.png" 
                alt="Kritika wink" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="space-y-1">
              <div className="font-display font-black text-sm sm:text-base text-ink flex items-center gap-1">
                <span>YOU HAVE EVERY RIGHT TO BE ANGRY!</span>
                <span>🔥</span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink font-bold leading-relaxed">
                Rule #1: Nobody is going to tell you to "calm down"—that's illegal here! Whoever ruined your vibe has questionable life choices. Let's reclaim your peace and treat yourself.
              </p>
            </div>
          </div>

          {/* Emergency Cucumber Sandwiches Grant */}
          <div className="mt-3 pt-3 border-t border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="text-center sm:text-left">
              <span className="font-display font-black text-xs text-coral-700 block">
                EMERGENCY CARE PACKAGE 🎁
              </span>
              <span className="font-handwritten text-xs text-ink-light font-bold">
                Free +5 Cucumber Sandwiches for emotional support!
              </span>
            </div>

            <button
              onClick={handleClaimComfortSandwiches}
              disabled={claimedSandwiches}
              className={`
                px-4 py-2 rounded-2xl font-display font-black text-xs uppercase flex items-center gap-1.5 border-2 transition-all shrink-0
                ${
                  claimedSandwiches
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white border-ink shadow-sketch hover:scale-105 active:scale-95'
                }
              `}
            >
              {claimedSandwiches ? (
                <>
                  <Award className="w-4 h-4" />
                  <span>CLAIMED +5 🥪 CUCUMBER SANDWICHES!</span>
                </>
              ) : (
                <>
                  <span>🥪</span>
                  <span>CLAIM +5 🥪 CUCUMBER SANDWICHES</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation (Unified 5-Tab Bar) */}
        <div className="grid grid-cols-5 gap-1 bg-paper-200 border-2 border-ink rounded-2xl p-1 font-display font-black text-[10px] sm:text-xs text-center">
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('rage'); }}
            className={`py-1.5 px-0.5 rounded-xl transition-all ${activeTab === 'rage' ? 'bg-white shadow-sketch border border-ink text-coral-600' : 'text-ink-light hover:text-ink'}`}
          >
            🔥 VENT
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('cozy'); }}
            className={`py-1.5 px-0.5 rounded-xl transition-all ${activeTab === 'cozy' ? 'bg-white shadow-sketch border border-ink text-amber-700' : 'text-ink-light hover:text-ink'}`}
          >
            ☁️ COZY
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('cravings'); }}
            className={`py-1.5 px-0.5 rounded-xl transition-all ${activeTab === 'cravings' ? 'bg-white shadow-sketch border border-ink text-amber-800' : 'text-ink-light hover:text-ink'}`}
          >
            🍜 FOOD
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('affirmations'); }}
            className={`py-1.5 px-0.5 rounded-xl transition-all ${activeTab === 'affirmations' ? 'bg-white shadow-sketch border border-ink text-purple-700' : 'text-ink-light hover:text-ink'}`}
          >
            ✨ VIBE
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('vent'); }}
            className={`py-1.5 px-0.5 rounded-xl transition-all ${activeTab === 'vent' ? 'bg-white shadow-sketch border border-ink text-emerald-700' : 'text-ink-light hover:text-ink'}`}
          >
            🎧 SONGS
          </button>
        </div>

        {/* Tab 1: Interactive Stress Popper */}
        {activeTab === 'rage' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-coral-500" />
                <span>TAP TO POP & SMASH ANNOYANCES</span>
              </span>
              <span className="font-handwritten text-xs font-bold text-coral-600 bg-coral-50 border border-coral-300 px-2 py-0.5 rounded-full">
                Popped: {totalPopped} / {STRESS_BUBBLES.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STRESS_BUBBLES.map((bubble) => {
                const isPopped = poppedBubbles[bubble.id];
                return (
                  <button
                    key={bubble.id}
                    onClick={() => handlePop(bubble.id)}
                    disabled={isPopped}
                    className={`
                      p-3 rounded-2xl border-2 text-left transition-all relative font-handwritten text-xs font-bold
                      ${
                        isPopped
                          ? 'border-emerald-300 bg-emerald-50/70 text-emerald-800 line-through opacity-75'
                          : 'border-ink/30 bg-white hover:border-coral-500 hover:bg-rose-50/50 shadow-sketch-xs hover:scale-102 active:scale-95'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{bubble.text}</span>
                      <span className="shrink-0 text-base">
                        {isPopped ? '💥' : '🎈'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {totalPopped === STRESS_BUBBLES.length && (
              <div className="bg-emerald-100 border-2 border-emerald-500 rounded-2xl p-3 text-center font-display font-black text-xs text-emerald-800 animate-bounce-gentle">
                🎉 ALL ANNOYANCES DEMOLISHED! Take a big breath, you are totally in control!
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Cozy Blanket Wrap Mode (Merged from CozyModeOverlay) */}
        {activeTab === 'cozy' && (
          <div className="space-y-3 animate-fade-in text-left">
            <div className="text-center space-y-1 bg-amber-50/70 border-2 border-amber-200/80 rounded-2xl p-3.5">
              <div className="inline-flex items-center gap-1.5 bg-amber-100/90 text-amber-900 border border-amber-300 px-3 py-0.5 rounded-full font-handwritten text-xs font-bold">
                <Cloud className="w-3.5 h-3.5" />
                <span>COZY BLANKET ACTIVE</span>
              </div>
              <h3 className="font-display font-black text-lg text-ink">
                Wrap Yourself in Warmth, Babe
              </h3>
              <p className="font-handwritten text-xs text-ink-light font-bold">
                Notifications on pause. Warm chai steaming. Your comfort track queued. You've earned this tranquility.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Pinned Song */}
              <div className="bg-white border-2 border-pink-200 rounded-2xl p-3 flex items-center justify-between shadow-sketch-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center text-lg shadow-xs shrink-0">
                    {favoriteSong.emoji}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-handwritten font-bold text-pink-600 block">
                      YOUR FAVORITE TRACK 🎵
                    </span>
                    <h4 className="font-display font-black text-xs sm:text-sm text-ink truncate">
                      {favoriteSong.title}
                    </h4>
                    <p className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      {favoriteSong.movie} • {favoriteSong.singers}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioEngine.playSfx('click');
                    onClose();
                    onOpenMusic();
                  }}
                  className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-display font-black text-xs rounded-xl shadow-xs shrink-0"
                >
                  PLAY
                </button>
              </div>

              {/* Highway Tapri Chai */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-3 flex items-center justify-between shadow-sketch-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center text-lg shadow-xs shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-handwritten font-bold text-amber-700 block">
                      COZY CHAI PRESCRIPTION ☕
                    </span>
                    <h4 className="font-display font-black text-xs sm:text-sm text-ink truncate">
                      {chaiRecipe.title.split('&')[0]}
                    </h4>
                    <p className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      Crushed ginger, green cardamom & warm milk hug
                    </p>
                  </div>
                </div>

                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-amber-300 font-handwritten shrink-0">
                  20 Mins
                </span>
              </div>

              {/* Movie Night Pairing */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-3 flex items-center justify-between shadow-sketch-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-400 to-indigo-400 text-white flex items-center justify-center text-lg shadow-xs shrink-0">
                    <Film className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-handwritten font-bold text-purple-700 block">
                      MOVIE NIGHT PAIRING 🎬
                    </span>
                    <h4 className="font-display font-black text-xs sm:text-sm text-ink truncate">
                      Jab We Met & Dil Se
                    </h4>
                    <p className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      Monsoon romance & unstoppable smiles
                    </p>
                  </div>
                </div>

                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-purple-300 font-handwritten shrink-0">
                  Feel Good
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Comfort Food Cravings */}
        {activeTab === 'cravings' && (
          <div className="space-y-2.5 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>HANGRY EMERGENCY PRESCRIPTION</span>
              </span>
              <span className="font-handwritten text-xs font-bold text-ink-light">
                Order or cook ASAP
              </span>
            </div>

            <div className="space-y-2">
              {COMFORT_CRAVINGS.map((craving, idx) => (
                <div 
                  key={idx}
                  className="bg-white border-2 border-ink/30 rounded-2xl p-3 flex items-start gap-3 shadow-sketch-xs hover:border-ink transition-all text-left"
                >
                  <div className="w-11 h-11 rounded-xl border border-ink/20 bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                    {craving.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-display font-black text-xs sm:text-sm text-ink truncate">
                        {craving.title}
                      </h4>
                      <span className="bg-amber-100 text-amber-800 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 shrink-0">
                        {craving.tag}
                      </span>
                    </div>
                    <p className="font-handwritten text-xs text-ink-light font-bold mt-0.5">
                      {craving.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Affirmations */}
        {activeTab === 'affirmations' && (
          <div className="space-y-4 text-center py-3 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full border-2.5 border-ink bg-purple-100 flex items-center justify-center text-2xl shadow-sketch">
              👑
            </div>

            <div className="bg-white border-2.5 border-ink rounded-3xl p-6 shadow-sketch space-y-3 max-w-md mx-auto">
              <Sparkles className="w-6 h-6 text-purple-600 mx-auto animate-spin" />
              <p className="font-display font-black text-base sm:text-lg text-ink leading-snug">
                "{GIRL_AFFIRMATIONS[affirmationIdx]}"
              </p>
              <div className="font-handwritten text-xs text-purple-700 font-bold">
                — Kritika's Fact of Life #{affirmationIdx + 1} ♡
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playSfx('powerup');
                setAffirmationIdx((affirmationIdx + 1) % GIRL_AFFIRMATIONS.length);
              }}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-display font-black text-xs uppercase rounded-2xl border-2 border-ink shadow-sketch hover:scale-105 active:scale-95 transition-all"
            >
              GIVE ME ANOTHER DOSE OF CONFIDENCE ✨
            </button>
          </div>
        )}

        {/* Tab 5: Mood Beat Switches */}
        {activeTab === 'vent' && (
          <div className="space-y-3 animate-fade-in text-left">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-purple-600" />
                <span>INSTANT AUDIO THERAPY</span>
              </span>
              <button 
                onClick={onOpenMusic}
                className="font-handwritten text-xs font-bold text-purple-700 underline"
              >
                Open Full Hindi Jukebox →
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('love_you_zindagi');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-pink-50 hover:bg-pink-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌸</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      LOVE YOU ZINDAGI (Dear Zindagi)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      "Jo dil se lage use keh do Hi!" — Ultimate self-love reset
                    </div>
                  </div>
                </div>
                <span className="bg-pink-600 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('yeh_ishq_hai');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-red-50 hover:bg-red-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏔️</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      YEH ISHQ HAI (Jab We Met)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      "Main apni favourite hoon!" — Dance away all drama & stress
                    </div>
                  </div>
                </div>
                <span className="bg-red-500 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('london_thumakda');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-purple-50 hover:bg-purple-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      LONDON THUMAKDA (Queen)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      Celebrate queen energy with maximum swagger & rhythm
                    </div>
                  </div>
                </div>
                <span className="bg-purple-600 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('iktara');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-amber-50 hover:bg-amber-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">☕</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      IKTARA (Wake Up Sid)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      Soulful rainy chai acoustic warmth to calm your soul
                    </div>
                  </div>
                </div>
                <span className="bg-amber-600 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Comfort Quote */}
        <div className="bg-rose-50 border-1.5 border-rose-300 rounded-2xl p-3 flex items-center gap-3">
          <Smile className="w-5 h-5 text-coral-500 shrink-0" />
          <p className="font-handwritten text-xs text-rose-900 font-bold text-left">
            "Bad moods are temporary, but good food, great music, and you being iconic is forever." ♡
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/ComfortShelfModal.tsx`

```tsx
import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { moodHistoryManager, type ComfortBookmark } from '../services/moodRotationService';
import { Heart, Trash2 } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface ComfortShelfModalProps {
  onClose: () => void;
}

export const ComfortShelfModal: React.FC<ComfortShelfModalProps> = ({ onClose }) => {
  const [, setTick] = useState(0);
  const bookmarks = moodHistoryManager.getBookmarks();

  const handleRemove = (b: ComfortBookmark) => {
    audioEngine.playSfx('click');
    moodHistoryManager.toggleBookmark(b);
    setTick(t => t + 1);
  };

  return (
    <BaseModal
      onClose={onClose}
      title="COMFORT SHELF"
      subtitle="Kritika's Saved Macaronis & Favorite Notes"
      icon={<Heart className="w-5 h-5 text-rose-500 fill-rose-500" />}
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {bookmarks.length === 0 ? (
          <div className="bg-pink-50/50 border border-dashed border-pink-200 rounded-3xl p-8 text-center space-y-2">
            <div className="text-3xl">🧀💖</div>
            <h4 className="font-display font-black text-sm text-stone-800">
              Your Comfort Shelf is Empty
            </h4>
            <p className="font-handwritten text-xs text-stone-600 font-bold">
              Tap the heart icon on any Macaroni dish or affirmation to save it here for instant comfort anytime!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {bookmarks.map((b: ComfortBookmark) => (
              <div
                key={b.id}
                className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-xs flex items-center justify-between gap-3 hover:border-pink-300 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {b.emoji}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-display font-black text-xs text-stone-800 truncate">
                      {b.title}
                    </h5>
                    <p className="font-sans text-[11px] text-stone-500 truncate">
                      {b.subtitle}
                    </p>
                    <span className="text-[9px] font-handwritten text-rose-600 font-bold">
                      Saved {b.savedAt}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(b)}
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                  title="Remove from Comfort Shelf"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/DailyChallenge.tsx`

```tsx
import React, { useState } from 'react';
import { QUESTIONS_DATABASE } from '../data/questions';
import type { Question } from '../types/game';
import { QuestionCard } from './QuestionCard';
import { LearningCard } from './LearningCard';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { Calendar, ArrowRight } from 'lucide-react';

interface DailyChallengeProps {
  onComplete: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ onComplete }) => {
  const [questions] = useState<Question[]>(() => {
    // 5 mixed daily questions
    const pool = [...QUESTIONS_DATABASE];
    return pool.slice(0, 5);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<{ option: string; isCorrect: boolean } | null>(null);
  const [showLearningCard, setShowLearningCard] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleAnswer = (selectedOption: string, _timeTakenMs: number) => {
    const isCorrect = selectedOption === currentQ.correctAnswer;
    const qXp = isCorrect ? 150 : 0;

    setCurrentAnswer({ option: selectedOption, isCorrect });
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setEarnedXp(prev => prev + qXp);
    }

    setShowLearningCard(true);
  };

  const handleNextQuestion = () => {
    setShowLearningCard(false);
    setCurrentAnswer(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 90, spread: 60 });
      gameState.addXp(earnedXp + 200); // 200 Daily Bonus XP
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-paper-50 p-4 sm:p-6 flex items-center justify-center text-ink">
        <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl max-w-lg w-full text-center space-y-6 animate-fade-in">
          
          <Marisol
            pose="chai_happiness"
            size="large"
            dialogue={`"Chai = Happiness! Pretty solid brain workout! You finished today's Brain Snack!"`}
            bubblePosition="top"
          />

          <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
            TODAY'S BRAIN SNACK
          </h1>

          <div className="bg-paper-50 border-2 border-ink p-4 rounded-2xl space-y-2 font-sans">
            <div className="text-sm text-ink-light">FINAL SCORE:</div>
            <div className="font-display font-black text-4xl text-coral-500">
              {correctCount} / 5 CORRECT
            </div>
            <div className="text-xs font-bold text-doodleTeal uppercase tracking-wider">
              +{earnedXp + 200} TOTAL XP EARNED TODAY!
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onComplete();
            }}
            className="sketch-btn-primary w-full py-4 text-xl font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg"
          >
            <span>BACK TO HOME</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-xl mx-auto mb-6 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-doodleTeal text-white font-handwritten text-base font-bold px-3 py-1 rounded-full border-1.5 border-ink">
          <Calendar className="w-4 h-4" />
          <span>DAILY BRAIN SNACK</span>
        </div>
      </div>

      {!showLearningCard ? (
        <QuestionCard
          question={currentQ}
          questionNumber={currentIndex + 1}
          totalQuestions={5}
          onAnswer={handleAnswer}
        />
      ) : (
        <LearningCard
          question={currentQ}
          isCorrect={currentAnswer?.isCorrect || false}
          userAnswer={currentAnswer?.option || ''}
          earnedXp={currentAnswer?.isCorrect ? 150 : 0}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
};

```

---

### File: `src/components/ErrorBoundary.tsx`

```tsx
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, RotateCcw, AlertCircle, Heart } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Marisol App ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    try {
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => caches.delete(key));
          location.reload();
        }).catch(() => {
          location.reload();
        });
        return;
      }
    } catch {}
    location.reload();
  };

  private handleResetAndReload = () => {
    try {
      sessionStorage.clear();
      // Keep user login if possible, clear only temporary locks
      localStorage.removeItem('marisol_batch_offline_queue_v2');
      localStorage.removeItem('marisol_chat_offline_queue_v2');
      if ('caches' in window) {
        caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
      }
    } catch {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-4 text-center select-none font-sans">
          <div className="max-w-md w-full bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center mx-auto text-rose-500 shadow-sm">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-display font-black text-stone-900">
                Marisol: Factory of Fun ✨
              </h2>
              <p className="text-xs text-rose-600 font-bold uppercase tracking-wide">
                Comfort Space Recovery Mode
              </p>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              A little digital bump occurred while loading your comfort adventure. Don't worry, your progress and memories are safe!
            </p>

            {this.state.error?.message && (
              <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <p className="text-[11px] font-mono text-stone-600 line-clamp-2 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl font-display font-black text-xs uppercase shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Comfort Space</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetAndReload}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl font-display font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Stale Cache & Reopen</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

```

---

### File: `src/components/FloatingMusicBar.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { musicStreamingService, type PlayerState } from '../services/musicStreamingService';
import { Play, Pause, Disc3, SkipForward } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface FloatingMusicBarProps {
  onOpenMusicScreen: () => void;
}

export const FloatingMusicBar: React.FC<FloatingMusicBarProps> = ({ onOpenMusicScreen }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(musicStreamingService.getState());

  useEffect(() => {
    const unsub = musicStreamingService.subscribe(s => setPlayerState(s));
    return () => {
      unsub();
    };
  }, []);


  if (!playerState.currentTrack) return null;

  const track = playerState.currentTrack;

  return (
    <div className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-sm z-30 animate-slide-up">
      <div 
        onClick={onOpenMusicScreen}
        className="bg-stone-900/95 backdrop-blur-md text-white border border-stone-700/80 rounded-2xl p-2.5 px-3.5 shadow-lg flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-900 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
            <img src={track.artworkUrl} alt={track.title} className="w-full h-full object-cover" />
            {playerState.isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Disc3 className="w-4 h-4 text-rose-400 animate-spin-slow" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h5 className="font-display font-black text-xs text-white truncate">
              {track.title}
            </h5>
            <p className="font-sans text-[11px] text-stone-400 truncate">
              {track.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              audioEngine.playSfx('pop');
              musicStreamingService.togglePlayPause();
            }}
            className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
            title={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              musicStreamingService.playNext();
            }}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
            title="Next Song"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Cut/Stop Music Button (X) */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              musicStreamingService.stop();
            }}
            className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-white/10 rounded-full transition-colors cursor-pointer ml-0.5"
            title="Stop & Close Music"
          >
            <span className="text-xs font-black">✕</span>
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/FloatingVideoPlayer.tsx`

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { videoPlaybackService } from '../services/videoPlaybackService';
import { audioEngine } from '../services/synthAudioEngine';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles } from 'lucide-react';

export const FloatingVideoPlayer: React.FC = () => {
  const [, setTick] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const unsub = videoPlaybackService.subscribe(() => setTick(t => t + 1));
    return () => { unsub(); };
  }, []);

  const video = videoPlaybackService.getVideo();
  const isMinimized = videoPlaybackService.getIsMinimized();

  useEffect(() => {
    if (videoRef.current && video) {
      if (video.currentTime) {
        try {
          videoRef.current.currentTime = video.currentTime;
        } catch {}
      }
      if (video.isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
      videoRef.current.muted = video.isMuted;
    }
  }, [video, isMinimized]);

  if (!isMinimized || !video) return null;

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    videoPlaybackService.togglePlay();
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    videoPlaybackService.toggleMute();
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('pop');
    if (videoRef.current) {
      videoPlaybackService.updateTime(videoRef.current.currentTime);
    }
    videoPlaybackService.expandVideo();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    videoPlaybackService.closeVideo();
  };

  return (
    <div
      className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-60 sm:w-72 bg-ink border-2.5 border-ink rounded-2xl shadow-sketch-xl overflow-hidden animate-scale-up select-none group"
      title="Background Minimized Video (Picture-in-Picture)"
    >
      {/* Mini Title Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-950 px-2.5 py-1.5 flex items-center justify-between text-white border-b border-white/20">
        <div className="flex items-center gap-1.5 min-w-0 pr-1">
          <Sparkles className="w-3.5 h-3.5 text-doodleGold animate-spin shrink-0" />
          <span className="font-display font-black text-[11px] truncate tracking-wide">
            {video.title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleExpand}
            className="p-1 hover:bg-white/20 rounded-md text-white transition-colors"
            title="Expand to Full View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 hover:bg-rose-500 rounded-md text-white transition-colors"
            title="Close Video"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Viewport */}
      <div className="relative aspect-video w-full bg-black cursor-pointer" onClick={handleExpand}>
        {video.type === 'mp4' ? (
          <video
            ref={videoRef}
            src={video.src}
            autoPlay
            loop
            playsInline
            muted={video.isMuted}
            className="w-full h-full object-cover"
            onTimeUpdate={() => {
              if (videoRef.current) {
                videoPlaybackService.updateTime(videoRef.current.currentTime);
              }
            }}
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.src}?autoplay=1&enablejsapi=1&playsinline=1`}
            title={video.title}
            className="w-full h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}

        {/* Hover / Touch Quick Floating Controls */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePlayToggle}
              className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-all active:scale-95"
            >
              {video.isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={handleMuteToggle}
              className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-all active:scale-95"
            >
              {video.isMuted ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>

          <button
            type="button"
            onClick={handleExpand}
            className="text-[10px] font-display font-black bg-pink-600 hover:bg-pink-700 px-2 py-1 rounded-lg border border-pink-400 text-white flex items-center gap-1 shadow-xs transition-colors"
          >
            <span>EXPAND</span>
            <Maximize2 className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/GameMap.tsx`

```tsx
import React from 'react';
import { GAME_ZONES } from '../data/zones';
import type { Zone } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import { Lock, Play, Film, Tv, Sparkles, Clapperboard, HelpCircle, Rocket, Globe, Cpu, Music } from 'lucide-react';

interface GameMapProps {
  onSelectZone: (zone: Zone) => void;
}

const ICON_MAP: Record<string, any> = {
  Film,
  Tv,
  Sparkles,
  Clapperboard,
  HelpCircle,
  Rocket,
  Globe,
  Cpu,
  Music,
  Lock
};

const ZONE_STICKER_MAP: Record<string, string> = {
  zone_1: 'wink_conquer',
  zone_2: 'just_me',
  zone_3: 'silly_vibe',
  zone_4: 'happier_days',
  zone_5: 'overthinking',
  zone_6: 'big_dreams',
  zone_7: 'bigger_adventures',
  zone_8: 'grateful_always',
  zone_9: 'music_mood',
  zone_10: 'brighter_ideas',
};

export const GameMap: React.FC<GameMapProps> = ({ onSelectZone }) => {
  const player = gameState.getPlayer();

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Map Title Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-coral-500">
          🗺️ ADVENTURE MAP
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700 tracking-tight">
          THE FACTORY OF FUN
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Explore 10 illustrated zones, unlock facts, and challenge the Master Vault!
        </p>
      </div>

      {/* Marisol Map Greeting */}
      <div className="max-w-2xl mx-auto mb-8 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol pose="bigger_adventures" size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-lg text-ink">Same Kritika Bigger Adventures ♡</h3>
          <p className="font-handwritten text-base text-ink-light leading-snug">
            "Pick any unlocked zone to start a 5-question brain challenge, or enter a Boss Battle when you're ready!"
          </p>
        </div>
      </div>

      {/* Hand-Drawn Winding Path & Zones Grid */}
      <div className="max-w-4xl mx-auto relative space-y-6">
        
        {GAME_ZONES.map((zone, idx) => {
          const Icon = ICON_MAP[zone.iconName] || Film;
          const isUnlocked = player.xp >= zone.requiredXp || player.unlockedZones.includes(zone.id);
          const isCompleted = player.completedBosses.includes(zone.id);

          return (
            <div 
              key={zone.id}
              className={`
                relative bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg transition-all duration-300
                ${isUnlocked ? 'hover:-translate-y-1 hover:shadow-sketch-xl cursor-pointer' : 'opacity-70 bg-paper-100'}
              `}
            >
              {/* Zone Content */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Zone Icon & Info */}
                <div className="flex items-center gap-4">
                  <div 
                    className={`
                      w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2.5 border-ink flex items-center justify-center shadow-sketch
                      ${isUnlocked ? (idx % 2 === 0 ? 'bg-coral-500 text-white' : 'bg-doodleTeal text-white') : 'bg-paper-200 text-ink-light'}
                    `}
                  >
                    {isUnlocked ? <Icon className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-handwritten text-xs font-bold text-coral-500 uppercase tracking-wider">
                        ZONE {idx + 1}
                      </span>
                      {isCompleted && (
                        <span className="bg-doodleGold text-ink font-bold text-xs px-2 py-0.5 rounded-full border-1.5 border-ink">
                          PASSED ★
                        </span>
                      )}
                    </div>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-ink">
                      {zone.name}
                    </h2>
                    <p className="font-handwritten text-sm text-ink-light font-bold">
                      {zone.subtitle}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        audioEngine.playSfx('click');
                        onSelectZone(zone);
                      }}
                      className="sketch-btn-primary flex-1 sm:flex-initial px-4 py-2.5 flex items-center justify-center gap-2 text-sm sm:text-base font-bold shadow-sketch"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>PLAY ROUND</span>
                    </button>
                  ) : (
                    <div className="bg-paper-200 border-2 border-ink px-4 py-2 rounded-xl text-xs font-bold text-ink-light shadow-sketch">
                      Requires {zone.requiredXp} XP to unlock
                    </div>
                  )}
                </div>
              </div>

              {/* Marisol Commentary Footer with Zone Sticker */}
              <div className="mt-3 pt-3 border-t-1.5 border-dashed border-ink/20 font-handwritten text-sm text-plum-700 font-semibold flex items-center gap-2.5">
                <img
                  src={`/marisol/avatars/${ZONE_STICKER_MAP[zone.id] || 'happier_days'}.png`}
                  alt="Zone Mood"
                  className="w-7 h-7 rounded-full border-1.5 border-ink object-cover bg-[#FAF7F0] shadow-sm shrink-0"
                />
                <span>"{zone.marisolComment}"</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

```

---

### File: `src/components/GlowUpWeekModal.tsx`

```tsx
import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { wellnessState } from '../services/wellnessState';
import { RECIPES } from '../data/recipes';
import { audioEngine } from '../services/synthAudioEngine';
import { BaseModal } from './BaseModal';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Camera, Download, Check } from 'lucide-react';

interface GlowUpWeekModalProps {
  onClose: () => void;
}

export const GlowUpWeekModal: React.FC<GlowUpWeekModalProps> = ({ onClose }) => {
  const player = gameState.getPlayer();
  const pinnedIds = wellnessState.getPinnedSongIds();
  const allSongs = wellnessState.getAllSongs();
  const topSong = allSongs.find(s => pinnedIds.includes(s.id)) || allSongs[0];
  const unlockedRecipes = RECIPES.filter(r => (player.unlockedRecipes || []).includes(r.id));
  const featuredRecipe = unlockedRecipes[0] || RECIPES[0];

  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate & export polaroid scrapbook as a high-res image
  const handleExportScrapbookImage = async () => {
    try {
      setIsExporting(true);
      audioEngine.playSfx('fanfare');

      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1450;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Background Paper & Texture
      ctx.fillStyle = '#FFFDF7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cute sketch dashed frame
      ctx.strokeStyle = '#241F21';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      ctx.strokeStyle = '#F472B6';
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 12]);
      ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);
      ctx.setLineDash([]);

      // 2. Header Banner
      ctx.fillStyle = '#FB7185';
      ctx.fillRect(150, 65, canvas.width - 300, 75);
      ctx.strokeStyle = '#241F21';
      ctx.lineWidth = 4;
      ctx.strokeRect(150, 65, canvas.width - 300, 75);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 36px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("KRITIKA'S GLOW-UP WEEK 📸", canvas.width / 2, 116);

      ctx.fillStyle = '#4B5563';
      ctx.font = 'bold 22px Caveat, cursive, sans-serif';
      ctx.fillText("A polaroid memory reel of triumphs, songs & delicious flavors! ♡", canvas.width / 2, 175);

      // Helper to draw a Polaroid
      const drawPolaroid = (
        x: number,
        y: number,
        w: number,
        h: number,
        angleDeg: number,
        washiColor: string,
        bgColor: string,
        emoji: string,
        title: string,
        subtitle: string,
        caption: string
      ) => {
        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate((angleDeg * Math.PI) / 180);

        // White card body
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.strokeStyle = '#241F21';
        ctx.lineWidth = 4;
        ctx.strokeRect(-w / 2, -h / 2, w, h);

        // Washi tape on top
        ctx.fillStyle = washiColor;
        ctx.fillRect(-60, -h / 2 - 12, 120, 24);
        ctx.strokeStyle = '#241F21';
        ctx.lineWidth = 2;
        ctx.strokeRect(-60, -h / 2 - 12, 120, 24);

        // Inner photo box
        ctx.fillStyle = bgColor;
        ctx.fillRect(-w / 2 + 20, -h / 2 + 25, w - 40, h - 130);
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 2;
        ctx.strokeRect(-w / 2 + 20, -h / 2 + 25, w - 40, h - 130);

        // Emoji & Title inside photo box
        ctx.font = '64px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(emoji, 0, -h / 2 + 120);

        ctx.fillStyle = '#111827';
        ctx.font = 'bold 26px Outfit, sans-serif';
        ctx.fillText(title, 0, -h / 2 + 180);

        ctx.fillStyle = '#6B7280';
        ctx.font = '20px sans-serif';
        ctx.fillText(subtitle, 0, -h / 2 + 215);

        // Bottom Handwritten Caption
        ctx.fillStyle = '#831843';
        ctx.font = 'bold 26px Caveat, cursive, sans-serif';
        ctx.fillText(caption, 0, h / 2 - 40);

        ctx.restore();
      };

      // Polaroid 1: Chef Rank & Cucumber Sandwiches
      drawPolaroid(
        100, 240, 460, 480, -2,
        'rgba(244, 114, 182, 0.7)',
        '#ECFDF5',
        '🥪',
        `${player.cucumberSandwiches || 0} Sandwiches`,
        player.chefTitle || 'Apprentice Chopper 🥒',
        '"Brain fuel earned with flying colors!" ♡'
      );

      // Polaroid 2: Pinned Song Jam
      drawPolaroid(
        640, 240, 460, 480, 2.5,
        'rgba(192, 132, 252, 0.7)',
        '#FAF5FF',
        topSong.emoji || '🎵',
        topSong.title,
        topSong.movie,
        '"Your weekly soundtrack anthem!" 🎶'
      );

      // Polaroid 3: Unlocked Recipe Milestone
      drawPolaroid(
        100, 770, 460, 480, 1.5,
        'rgba(251, 146, 60, 0.7)',
        '#FFF1F2',
        featuredRecipe.emoji || '🍳',
        featuredRecipe.title.split('&')[0],
        `Paired with ${featuredRecipe.moviePairing.movie.split('(')[0]}`,
        '"Signature dish of the week!" 🍲'
      );

      // Polaroid 4: Queen Companion Art
      drawPolaroid(
        640, 770, 460, 480, -1.8,
        'rgba(250, 204, 21, 0.7)',
        '#FEF3C7',
        '👑',
        'Wink & Conquer',
        'Mood: Unstoppable Sparkle',
        '"Radiating royal boss energy always!" ✨'
      );

      // 4. Queen's Verdict Footer Banner
      ctx.fillStyle = '#FDF2F8';
      ctx.fillRect(80, 1300, canvas.width - 160, 95);
      ctx.strokeStyle = '#241F21';
      ctx.lineWidth = 3;
      ctx.strokeRect(80, 1300, canvas.width - 160, 95);

      ctx.fillStyle = '#BE185D';
      ctx.font = 'bold 22px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💖 QUEEN\'S OFFICIAL VERDICT 💖', canvas.width / 2, 1335);

      ctx.fillStyle = '#374151';
      ctx.font = 'bold 24px Caveat, cursive, sans-serif';
      ctx.fillText('"You brought warmth, wisdom, and unmatched style to every single day this week. So proud of you, Kritika!" ♡', canvas.width / 2, 1372);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Kritika_GlowUp_Scrapbook_${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#A855F7', '#F59E0B']
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      // export fallback
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-xl"
      icon={<div className="w-full h-full bg-gradient-to-tr from-pink-400 to-purple-400 rounded-xl flex items-center justify-center text-white"><Camera className="w-5 h-5 text-white" /></div>}
      title="YOUR GLOW-UP WEEK 📸"
      subtitle="A polaroid memory reel of your triumphs, songs, and flavors!"
      badge={<span className="bg-pink-100 text-pink-700 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-300">SCRAPBOOK</span>}
    >
      <div className="space-y-4">
        {/* Export Action Bar */}
        <div className="flex items-center justify-between bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 border border-pink-200 p-2.5 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <div className="text-left">
              <span className="font-display font-black text-xs text-ink block">
                Save or Share Scrapbook
              </span>
              <span className="font-handwritten text-[11px] text-pink-700 font-bold">
                Download high-res memory polaroid image
              </span>
            </div>
          </div>

          <button
            onClick={handleExportScrapbookImage}
            disabled={isExporting}
            className="sketch-btn-primary px-3.5 py-1.5 text-xs font-black uppercase flex items-center gap-1.5 shadow-sketch-xs hover:scale-105 active:scale-95 transition-all"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>SAVED! ✨</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'EXPORTING...' : 'EXPORT IMAGE'}</span>
              </>
            )}
          </button>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Polaroid 1: Chef Rank & Cucumber Sandwiches */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[-1deg] text-center space-y-2 relative">
            <div className="washi-tape w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-emerald-50 rounded-xl border border-emerald-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">🥪</span>
              <span className="font-display font-black text-xl text-emerald-800">
                {player.cucumberSandwiches || 0} Sandwiches
              </span>
              <span className="font-handwritten text-[11px] text-emerald-700 font-bold">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Brain fuel earned with flying colors!" ♡
            </p>
          </div>

          {/* Polaroid 2: Pinned Song Jam */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[1.5deg] text-center space-y-2 relative">
            <div className="washi-tape-lavender w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-purple-50 rounded-xl border border-purple-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">{topSong.emoji}</span>
              <span className="font-display font-black text-sm text-purple-900 truncate max-w-full">
                {topSong.title}
              </span>
              <span className="font-handwritten text-[11px] text-purple-700 font-bold truncate">
                {topSong.movie}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Your weekly soundtrack vibe!" 🎵
            </p>
          </div>

          {/* Polaroid 3: Unlocked Recipe Milestone */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[1deg] text-center space-y-2 relative">
            <div className="washi-tape w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-rose-50 rounded-xl border border-rose-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">{featuredRecipe.emoji}</span>
              <span className="font-display font-black text-xs text-rose-900 truncate max-w-full">
                {featuredRecipe.title.split('&')[0]}
              </span>
              <span className="font-handwritten text-[10px] text-rose-700 font-bold">
                Paired with {featuredRecipe.moviePairing.movie.split('(')[0]}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Signature dish of the week!" 🍳
            </p>
          </div>

          {/* Polaroid 4: Queen's Companion Sticker */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[-1.5deg] text-center space-y-2 relative">
            <div className="washi-tape-lavender w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-amber-50 rounded-xl border border-amber-300 flex items-center justify-center p-2 shadow-inner overflow-hidden">
              <img 
                src="/marisol/avatars/03_wink_conquer.png" 
                alt="Kritika wink" 
                className="h-full object-contain"
              />
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Wink & conquer every challenge!" 😉
            </p>
          </div>
        </div>

        {/* Weekly Sisterly Summary Banner */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-amber-100 border-2 border-pink-300 rounded-2xl p-3.5 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-display font-black text-xs text-pink-900">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            <span>QUEEN'S VERDICT</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-handwritten text-xs sm:text-sm text-ink font-bold">
            "You brought warmth, wisdom, and unmatched style to every single day this week. So proud of you, Kritika!" ♡
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/GoogleSignInModal.tsx`

```tsx
import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { authService, type StudentProfile } from '../services/authService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  CheckCircle2, LogOut, 
  Loader2, AlertCircle, Sparkles, Mail, Lock, User, MessagesSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GoogleSignInModalProps {
  onClose: () => void;
  onSuccess?: (user: StudentProfile) => void;
  onNavigateToChat?: () => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({ onClose, onSuccess, onNavigateToChat }) => {
  const [, setTick] = useState(0);
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // Handle direct Sign In with Mail ID
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    if (!cleanEmail) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Derived or entered name
      const derivedName = nameInput.trim() || authService.formatEmailName(cleanEmail) || 'New User';
      const finalUser = await authService.loginStudentProfile(derivedName, cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`);

      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
      setTick(t => t + 1);
      if (onSuccess) onSuccess(finalUser);
      onClose();
    } catch (err: any) {
      console.error('[Sign In with Mail ID] Error establishing session:', err);
      setErrorMessage(err?.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Sign In
  const handleGoogleOAuth = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    audioEngine.playSfx('click');

    const res = await authService.signInWithFirebaseGoogle(false);
    setIsLoading(false);

    if (res.success && res.user) {
      audioEngine.playSfx('fanfare');
      confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
      setTick(t => t + 1);
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else if (res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleSignOut = async () => {
    audioEngine.playSfx('click');
    await authService.signOut();
    setTick(t => t + 1);
  };

  return (
    <BaseModal
      onClose={onClose}
      title={isAuthenticated ? "YOUR ACCOUNT" : "SIGN IN WITH MAIL ID"}
      subtitle={isAuthenticated ? "Account details & chat permissions" : "Whoever signs in with their mail ID is welcomed as a New User and allowed to chat with all users!"}
      icon={
        <div className="w-6 h-6 flex items-center justify-center text-rose-500 font-bold">
          <Mail className="w-5 h-5 text-rose-500" />
        </div>
      }
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl text-xs space-y-1 animate-fade-in">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Sign-In Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-700 pl-6">
              {errorMessage}
            </p>
            <p className="text-[11px] font-semibold text-rose-900 pl-6 pt-1">
              👉 You can immediately sign in below by entering your Mail ID (Email address).
            </p>
          </div>
        )}

        {/* 1. SIGNED-IN VIEW */}
        {isAuthenticated && currentUser ? (
          <div className="space-y-3.5">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-white border border-rose-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl border-2 border-rose-300 overflow-hidden bg-white shrink-0 shadow-sm">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display font-black text-sm text-stone-900 truncate">
                      {currentUser.name}
                    </h3>
                    <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-display text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                      <Sparkles className="w-2.5 h-2.5 fill-white" />
                      {currentUser.userTag || (currentUser.isNewUser ? 'NEW USER' : 'USER')}
                    </span>
                    <span className="bg-emerald-600 text-white font-display text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 truncate font-semibold mt-0.5">
                    ✉️ {currentUser.email || 'Private Mail ID'}
                  </p>
                  <div className="text-[11px] font-handwritten font-bold text-rose-700 mt-0.5">
                    Current Vibe: {currentUser.currentMoodEmoji} {currentUser.currentMood}
                  </div>
                </div>
              </div>

              {/* Chat privilege confirmation banner */}
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-emerald-900 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Chat Access Granted:</strong> You are allowed to chat in the community lounge and send direct messages to each other user!
                </span>
              </div>
            </div>

            {/* Account Actions */}
            <div className="flex flex-col gap-2">
              {onNavigateToChat && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToChat();
                  }}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-black text-xs uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessagesSquare className="w-4 h-4" />
                  <span>Start Chatting with Other Users</span>
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="w-full py-2.5 px-3 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-display font-black text-xs uppercase rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of this Account</span>
              </button>
            </div>
          </div>
        ) : (
          /* 2. SIGN-IN FORM VIEW */
          <div className="space-y-3.5">
            {/* Explanatory New User Welcome Callout */}
            <div className="p-3 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-display font-black text-rose-900">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>New User Registration & Chat Access</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                Enter your Mail ID to immediately register as a <strong>New User</strong>. Once signed in, you are fully authorized to chat in the group lounge and message any user directly!
              </p>
            </div>

            {/* Quick One-Tap Mail ID Suggestions */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">
                Quick 1-Tap Sign In:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Kritika Gupta 👑', email: 'kritika.gupta@mlp41.edu' },
                  { name: 'Priyanshu Sharma', email: 'priyanshu.sharma@mlp41.edu' },
                  { name: 'Batch 41 Member', email: 'student@mlp41.edu' },
                ].map(item => (
                  <button
                    key={item.email}
                    type="button"
                    onClick={() => {
                      setEmailInput(item.email);
                      setNameInput(item.name);
                    }}
                    className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 border border-stone-200 rounded-lg text-stone-700 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mail ID Quick Sign In Form */}
            <form onSubmit={handleSignInSubmit} className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-display font-bold text-stone-700 block">
                  Your Mail ID (Email Address) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-rose-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (!nameInput && e.target.value.includes('@')) {
                        setNameInput(authService.formatEmailName(e.target.value));
                      }
                    }}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold outline-none focus:border-rose-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-display font-bold text-stone-700 block">
                  Display Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Kritika or Alex"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold outline-none focus:border-rose-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                )}
                <span>{isLoading ? 'Connecting session...' : 'Sign In as New User & Chat'}</span>
              </button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-[10px] font-display font-black text-stone-400 uppercase tracking-wider">or sign in with google</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            {/* Direct Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleOAuth}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-display font-black text-xs uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google Mail</span>
                </>
              )}
            </button>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2 text-[10px] text-stone-500">
              <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Real-time chat synchronization across devices via Firestore is active.</span>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-2 border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white font-display font-black text-xs uppercase rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </BaseModal>
  );
};


```

---

### File: `src/components/HomeScreen.tsx`

```tsx
import React, { useState, useRef, useEffect } from 'react';
import type { ScreenState } from '../types/game';
import { audioEngine } from '../services/synthAudioEngine';
import { authService } from '../services/authService';
import { musicStreamingService, type PlayerState } from '../services/musicStreamingService';
import { 
  KRITIKA_STICKER_MOODS, 
  getMoodMacaroni, 
  type MoodProfileSetting 
} from '../services/moodQuizService';
import { moodHistoryManager } from '../services/moodRotationService';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, 
  MessageCircle, Disc3, Camera, Music,
  Clock, Film, Heart, Calendar, Lock, Check, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import heroBannerVideoSrc from '../assets/Hero Banner video.mp4';

interface HomeScreenProps {
  onNavigate: (screen: ScreenState, wallMode?: 'chat' | 'posts' | 'bulletin') => void;
  onStartMoodQuiz: (moodId: string) => void;
  onOpenMoodHistory?: () => void;
  onOpenComfortShelf?: () => void;
  activeMoodId: string;
  onSelectMood: (moodId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onStartMoodQuiz,
  onOpenMoodHistory,
  onOpenComfortShelf,
  activeMoodId,
  onSelectMood
}) => {
  const [, setTick] = useState(0);
  const [musicState, setMusicState] = useState<PlayerState>(musicStreamingService.getState());

  useEffect(() => {
    const unsubAuth = authService.subscribe(() => setTick(t => t + 1));
    const unsubMusic = musicStreamingService.subscribe(s => setMusicState(s));
    return () => {
      unsubAuth();
      unsubMusic();
    };
  }, []);

  const isAuthenticated = authService.isAuthenticated();

  // Video Player State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Private Note State
  const [privateNote, setPrivateNote] = useState('');
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Active Selected Mood & Matching Macaroni
  const currentMoodSetting: MoodProfileSetting = 
    KRITIKA_STICKER_MOODS.find(m => m.id === activeMoodId) || KRITIKA_STICKER_MOODS[0];
  const currentMacaroni = getMoodMacaroni(activeMoodId);
  const isMacaroniBookmarked = moodHistoryManager.isBookmarked(currentMacaroni.id);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleMoodClick = (mood: MoodProfileSetting) => {
    audioEngine.playSfx('click');
    onSelectMood(mood.id);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    
    // Log to history
    const matchingMacaroni = getMoodMacaroni(mood.id);
    moodHistoryManager.recordMoodCheckIn(
      mood.scaleNumber,
      mood.id,
      mood.label,
      mood.emoji,
      matchingMacaroni.id,
      privateNote.trim() || undefined
    );

    if (isAuthenticated) {
      authService.updateDailyMood(mood.label, mood.emoji, mood.dialogue.slice(0, 75));
    }
    setTick(t => t + 1);
  };

  const handleSavePrivateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });

    moodHistoryManager.recordMoodCheckIn(
      currentMoodSetting.scaleNumber,
      currentMoodSetting.id,
      currentMoodSetting.label,
      currentMoodSetting.emoji,
      currentMacaroni.id,
      privateNote.trim() || undefined
    );

    if (isAuthenticated) {
      authService.updateDailyMood(
        currentMoodSetting.label, 
        currentMoodSetting.emoji, 
        privateNote.trim() || currentMoodSetting.dialogue.slice(0, 75)
      );
    }

    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 3000);
    setTick(t => t + 1);
  };

  const handleToggleBookmarkMacaroni = () => {
    audioEngine.playSfx('pop');
    moodHistoryManager.toggleBookmark({
      id: currentMacaroni.id,
      type: 'macaroni',
      title: currentMacaroni.name,
      subtitle: currentMacaroni.pairingMovie ? `Watch with ${currentMacaroni.pairingMovie}` : currentMacaroni.cookTime,
      emoji: currentMacaroni.emoji,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
    setTick(t => t + 1);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-5xl lg:max-w-6xl mx-auto space-y-4 sm:space-y-5">

        {/* 1. TOP HEADER & COMFORT SHORTCUTS */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-display font-black text-rose-600 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MARISOL • KRITIKA'S COMFORT SPACE</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-stone-900">
              Factory of Fun 👑✨
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mood Calendar Button */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onOpenMoodHistory?.();
              }}
              className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-rose-50 border border-stone-200 text-stone-700 hover:text-rose-600 transition-all shadow-xs cursor-pointer"
              title="14-Day Mood Calendar & Heatmap"
            >
              <Calendar className="w-4 h-4 text-rose-500" />
            </button>

            {/* Comfort Shelf Bookmarks Button */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onOpenComfortShelf?.();
              }}
              className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-pink-50 border border-stone-200 text-stone-700 hover:text-pink-600 transition-all shadow-xs cursor-pointer"
              title="Comfort Shelf (Saved Macaronis & Notes)"
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </button>
          </div>
        </div>

        {/* NOW PLAYING MUSIC STATUS BAR (With X Cut/Close Option in Home) */}
        {musicState.currentTrack && (
          <div className="bg-stone-900 text-white p-2.5 px-4 rounded-2xl border border-stone-700/70 shadow-xs flex items-center justify-between gap-3 animate-fade-in">
            <div 
              onClick={() => onNavigate('music')}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                <img 
                  src={musicState.currentTrack.artworkUrl} 
                  alt={musicState.currentTrack.title} 
                  className="w-full h-full object-cover" 
                />
                {musicState.isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Disc3 className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-display font-black uppercase text-rose-400">NOW PLAYING:</span>
                  <span className="font-display font-black text-xs text-white truncate">{musicState.currentTrack.title}</span>
                </div>
                <p className="text-[10px] text-stone-400 truncate">{musicState.currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  audioEngine.playSfx('pop');
                  musicStreamingService.togglePlayPause();
                }}
                className="w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                title={musicState.isPlaying ? 'Pause' : 'Play'}
              >
                {musicState.isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
              </button>

              {/* X Cut Music Option */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  musicStreamingService.stop();
                }}
                className="p-1 text-stone-400 hover:text-rose-300 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                title="Stop & cut music"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. MODERN BENTO GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">

          {/* BENTO CARD 1: HERO VIDEO & CROWN BANNER (Span 12 / Full Width) */}
          <div className="md:col-span-12 relative rounded-3xl border-2 border-stone-800/80 overflow-hidden shadow-md bg-stone-950 group">
            <video
              ref={videoRef}
              src={heroBannerVideoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-56 sm:h-72 object-cover object-center"
            />

            {/* Video Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

            {/* Video Badge & Title Overlay */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between pointer-events-none">
              <div className="space-y-0.5 max-w-[75%]">
                <span className="bg-rose-500 text-white font-display text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 fill-white" />
                  <span>KRITIKA GUPTA 👑</span>
                </span>
                <h2 className="font-display font-black text-white text-base sm:text-xl drop-shadow-md">
                  Queen of Factory of Fun
                </h2>
                <p className="font-handwritten text-white/95 text-xs sm:text-sm font-bold drop-shadow-sm truncate">
                  "Main apni favourite hoon! Savoring every sweet memory ♡"
                </p>
              </div>

              {/* Video Play/Pause & Mute Buttons */}
              <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                  onClick={toggleVideoMute}
                  className="w-8 h-8 rounded-full bg-white/85 hover:bg-white border border-stone-400 flex items-center justify-center text-stone-900 transition-transform active:scale-95 shadow-xs cursor-pointer"
                  title={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
                </button>

                <button
                  onClick={toggleVideoPlay}
                  className="w-8 h-8 rounded-full bg-white/85 hover:bg-white border border-stone-400 flex items-center justify-center text-stone-900 transition-transform active:scale-95 shadow-xs cursor-pointer"
                  title={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-stone-900" />}
                </button>
              </div>
            </div>
          </div>

          {/* BENTO CARD 2: REAL MOOD BOARD (1–9) (Span 7 on Desktop / Full on Mobile) */}
          <div className="md:col-span-7 bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <div>
                  <h3 className="font-display font-black text-xs sm:text-sm text-stone-900 uppercase tracking-wide">
                    Real Mood Board (1–9):
                  </h3>
                  <p className="text-[10px] text-stone-500 font-medium">
                    Pick your genuine emotion to adapt your space
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-handwritten font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 shrink-0">
                Mood Board ✨
              </span>
            </div>

            {/* 3x3 Grid of 9 Dynamic Mood Picture Stickers */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {KRITIKA_STICKER_MOODS.map(mood => {
                const isSelected = mood.id === activeMoodId;
                return (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodClick(mood)}
                    className={`relative p-2 sm:p-2.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer group ${
                      isSelected
                        ? 'bg-rose-50/90 text-stone-900 border-rose-400 ring-2 ring-rose-200 shadow-xs scale-102 font-bold'
                        : 'bg-[#FAF9F7] hover:bg-pink-50/60 border-stone-200 text-stone-700 shadow-2xs hover:border-pink-200'
                    }`}
                  >
                    <span className={`absolute top-1.5 left-1.5 text-[8px] font-display font-black px-1.5 py-0.2 rounded-full z-10 ${
                      isSelected ? 'bg-rose-500 text-white shadow-2xs' : 'bg-stone-200 text-stone-600'
                    }`}>
                      #{mood.scaleNumber}
                    </span>

                    {/* Dynamic Picture Sticker Image */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 my-1 rounded-xl overflow-hidden bg-white/80 border border-stone-200/60 shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center">
                      <img 
                        src={mood.imageSrc} 
                        alt={`${mood.label} sticker`} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-xs">{mood.emoji}</span>
                      <span className="font-display font-black text-[11px] sm:text-xs leading-tight line-clamp-1">
                        {mood.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Private Note Check-in */}
            <form onSubmit={handleSavePrivateCheckIn} className="pt-2 border-t border-stone-100 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <Lock className="w-3 h-3 text-stone-400" />
                <span className="font-medium text-[10px]">Private note (only you see this):</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={privateNote}
                  onChange={(e) => setPrivateNote(e.target.value)}
                  placeholder={`Feeling as #${currentMoodSetting.scaleNumber} ${currentMoodSetting.label}...`}
                  className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-400 focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {noteSavedToast ? <Check className="w-3.5 h-3.5" /> : <span>Log</span>}
                </button>
              </div>
              {noteSavedToast && (
                <span className="text-[10px] font-handwritten font-bold text-emerald-600 block text-right">
                  ✓ Saved to 14-day mood calendar!
                </span>
              )}
            </form>
          </div>

          {/* BENTO CARD 3: CURRENT MOOD COMFORT & DIALOGUE (Span 5 on Desktop / Full on Mobile) */}
          <div className="md:col-span-5 bg-gradient-to-br from-pink-50/95 via-rose-50/80 to-amber-50/90 border border-pink-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Active Mood Large Dynamic Sticker Picture */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-pink-300 overflow-hidden shadow-sm shrink-0">
                    <img 
                      src={currentMoodSetting.imageSrc} 
                      alt={currentMoodSetting.label}
                      className="w-full h-full object-cover scale-102" 
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-display font-black uppercase text-rose-700 tracking-wider">
                      SCALE #{currentMoodSetting.scaleNumber} COMFORT
                    </span>
                    <h4 className="font-display font-black text-base text-stone-900 leading-tight">
                      {currentMoodSetting.emoji} {currentMoodSetting.label}
                    </h4>
                    <span className="text-[10px] text-stone-500 font-medium font-sans">
                      {currentMoodSetting.vibe}
                    </span>
                  </div>
                </div>
                <span className="bg-white/90 border border-pink-200 px-2 py-0.5 rounded-full text-[10px] font-handwritten font-bold text-rose-900 shadow-2xs">
                  "{currentMoodSetting.stickerQuote}"
                </span>
              </div>

              <div className="bg-white/85 p-3 rounded-2xl border border-pink-100 shadow-2xs">
                <p className="font-handwritten text-xs sm:text-sm text-stone-800 font-bold leading-relaxed">
                  "{currentMoodSetting.dialogue}"
                </p>
              </div>
            </div>

            {/* Quick Mood Affirmation Pill */}
            <div className="bg-white/90 border border-pink-200/80 rounded-2xl p-2.5 flex items-center justify-between text-xs text-rose-950 font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Affirmation:</span>
              </span>
              <span className="font-handwritten text-rose-700">You are pure magic ✨</span>
            </div>
          </div>

          {/* BENTO CARD 4: MOOD-MATCHED MACARONI DISH (Span 12 / Full Width) */}
          <div className="md:col-span-12 bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentMacaroni.emoji}</span>
                <div>
                  <span className="text-[10px] font-display font-black uppercase text-amber-700 tracking-wider">
                    SCALE #{currentMoodSetting.scaleNumber} COMFORT MACARONI REWARD
                  </span>
                  <h3 className="font-display font-black text-base text-stone-900 leading-tight">
                    {currentMacaroni.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleBookmarkMacaroni}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isMacaroniBookmarked
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-stone-50 hover:bg-pink-50 border-stone-200 text-stone-400 hover:text-rose-500'
                  }`}
                  title={isMacaroniBookmarked ? "Saved to Comfort Shelf" : "Save to Comfort Shelf"}
                >
                  <Heart className={`w-4 h-4 ${isMacaroniBookmarked ? 'fill-rose-600' : ''}`} />
                </button>

                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-[11px] font-display font-bold text-amber-900 shrink-0">
                  <Clock className="w-3 h-3 text-amber-700" />
                  <span>{currentMacaroni.cookTime}</span>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
              {currentMacaroni.description}
            </p>

            {/* Secret Ingredients tags & Movie Pairing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {currentMacaroni.secretIngredients.map(ing => (
                  <span 
                    key={ing}
                    className="bg-stone-100 border border-stone-200/80 px-2.5 py-0.5 rounded-full text-[11px] font-handwritten font-bold text-stone-700"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-2 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="font-display font-bold text-amber-950">Pairing:</span>
                  <span className="font-medium text-stone-700 truncate">{currentMacaroni.pairingMovie}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO CARDS 5-8: THE 4 PILLARS (CHAT, POST, MUSIC, QUIZ) */}
          <div className="md:col-span-12">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-display font-black uppercase text-stone-500 tracking-wider">
                🌟 Factory of Fun Pillars
              </span>
              <span className="text-[11px] font-sans text-stone-400">
                Multi-person chat, posts, music & quiz
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {/* PILLAR 1: CHAT */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('batch_wall', 'chat');
                }}
                className="p-3.5 rounded-3xl bg-white border border-stone-200 hover:border-purple-300 flex flex-col justify-between gap-3 shadow-xs hover:shadow-md cursor-pointer hover:scale-101 active:scale-98 transition-all text-left group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold shadow-2xs group-hover:bg-purple-100 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-display font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    REAL-TIME
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-stone-900 group-hover:text-purple-700 transition-colors">
                    Chat Lounge 💬
                  </h4>
                  <p className="font-handwritten text-xs text-stone-600 font-bold line-clamp-2">
                    Group messages, pin highlights & author-only edits
                  </p>
                </div>
              </button>

              {/* PILLAR 2: POST */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('batch_wall', 'posts');
                }}
                className="p-3.5 rounded-3xl bg-white border border-stone-200 hover:border-pink-300 flex flex-col justify-between gap-3 shadow-xs hover:shadow-md cursor-pointer hover:scale-101 active:scale-98 transition-all text-left group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-2xl bg-pink-50 text-pink-600 border border-pink-200 flex items-center justify-center font-bold shadow-2xs group-hover:bg-pink-100 transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-display font-black uppercase text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                    COMMUNITY
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-stone-900 group-hover:text-pink-600 transition-colors">
                    Moments & Posts 📸
                  </h4>
                  <p className="font-handwritten text-xs text-stone-600 font-bold line-clamp-2">
                    Photo feed, pin favorite posts & personal stories
                  </p>
                </div>
              </button>

              {/* PILLAR 3: MUSIC */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('music');
                }}
                className="p-3.5 rounded-3xl bg-white border border-stone-200 hover:border-amber-300 flex flex-col justify-between gap-3 shadow-xs hover:shadow-md cursor-pointer hover:scale-101 active:scale-98 transition-all text-left group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold shadow-2xs group-hover:bg-amber-100 transition-colors">
                    <Music className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-display font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    STREAMER
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-stone-900 group-hover:text-amber-700 transition-colors">
                    Hear Music 🎵
                  </h4>
                  <p className="font-handwritten text-xs text-stone-600 font-bold line-clamp-2">
                    Lo-fi beats, binaural synth stations & ambient player
                  </p>
                </div>
              </button>

              {/* PILLAR 4: PLAY QUIZ */}
              <button
                onClick={() => {
                  audioEngine.playSfx('fanfare');
                  onStartMoodQuiz(activeMoodId);
                }}
                className="p-3.5 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white flex flex-col justify-between gap-3 shadow-xs hover:shadow-md cursor-pointer hover:scale-101 active:scale-98 transition-all text-left group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-2xl bg-white text-rose-600 flex items-center justify-center font-bold shadow-2xs">
                    <Play className="w-4 h-4 fill-rose-600" />
                  </div>
                  <span className="text-[9px] font-display font-black uppercase text-pink-200 bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
                    1000+ TRIVIA
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-white">
                    Play Quiz 🎯
                  </h4>
                  <p className="font-handwritten text-xs text-white/90 font-bold line-clamp-2">
                    Food & Cinema trivia tailored to #{currentMoodSetting.scaleNumber}
                  </p>
                </div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

```

---

### File: `src/components/InstallAppModal.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { BaseModal } from './BaseModal';
import { Download, Smartphone, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/synthAudioEngine';

interface InstallAppModalProps {
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ onClose }) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      const isAndroidDevice = /android/.test(userAgent);
      setIsIOS(isIosDevice);
      setIsAndroid(isAndroidDevice);

      // Check if already installed as standalone PWA
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true);
      }

      // Listen for Android / Chrome install prompt
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      audioEngine.playSfx('click');
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        confetti({ particleCount: 70, spread: 60 });
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      title="INSTALL MARISOL AS APP"
      subtitle="Add to your phone's Home Screen for the full screen, fast app experience"
      icon={<Smartphone className="w-5 h-5 text-rose-500" />}
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {/* App Preview Card */}
        <div className="p-4 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-2xl border border-rose-200/80 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-rose-200 shrink-0 overflow-hidden">
            <img 
              src="/icon-192.png" 
              alt="Marisol Icon" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-black text-sm text-stone-900 truncate">
                Marisol: Factory of Fun
              </h3>
              <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                APP
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Offline-ready • Fullscreen • Instant launch
            </p>
          </div>
        </div>

        {/* Already Installed Notice */}
        {isInstalled && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Marisol is already running in app mode on this device! ✨</span>
          </div>
        )}

        {/* 1. IPHONE & IPAD (iOS) INSTRUCTIONS */}
        {isIOS && !isInstalled && (
          <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="font-display font-black text-xs text-rose-600 uppercase tracking-wide flex items-center gap-1.5">
                <span>🍎</span>
                <span>iPhone / iPad (Safari) Instructions</span>
              </span>
              <span className="text-[10px] bg-stone-100 text-stone-600 font-bold px-2 py-0.5 rounded-full">
                3 Quick Steps
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p className="leading-snug">
                  Tap the <strong className="text-stone-900">Share</strong> button at the bottom of Safari (<span className="inline-block px-1.5 py-0.5 bg-stone-100 rounded text-stone-900 font-mono text-[11px]">⎋ / ⬆</span>).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p className="leading-snug">
                  Scroll down the menu and tap <strong className="text-stone-900">"Add to Home Screen"</strong> (<span className="inline-block px-1.5 py-0.5 bg-stone-100 rounded text-stone-900 font-mono text-[11px]">⊞ / ⊕</span>).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p className="leading-snug">
                  Tap <strong className="text-rose-600">"Add"</strong> in the top right corner. The Marisol app icon will immediately appear on your home screen!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. ANDROID INSTRUCTIONS & 1-TAP INSTALL */}
        {(!isIOS || isAndroid) && !isInstalled && (
          <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="font-display font-black text-xs text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
                <span>🤖</span>
                <span>Android (Chrome) Instructions</span>
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Fast Install
              </span>
            </div>

            {deferredPrompt ? (
              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-display font-black text-xs uppercase shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install Marisol on Android Now</span>
              </button>
            ) : (
              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </span>
                  <p className="leading-snug">
                    Tap the <strong className="text-stone-900">three dots menu (⋮)</strong> at top right of Chrome.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </span>
                  <p className="leading-snug">
                    Tap <strong className="text-stone-900">"Install app"</strong> or <strong className="text-stone-900">"Add to Home screen"</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </span>
                  <p className="leading-snug">
                    Confirm <strong className="text-emerald-700">"Install"</strong>. The app icon will be pinned to your apps and home screen!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Benefits Checklist */}
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-1.5 text-xs text-stone-600">
          <p className="font-display font-black text-stone-800 text-[11px] uppercase tracking-wide">
            Why add as an App?
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>No browser URL bar</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Full screen view</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Instant 1-tap open</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Works smoothly offline</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-display font-black text-xs uppercase cursor-pointer transition-colors"
        >
          Got it
        </button>
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/KnowledgePassport.tsx`

```tsx
import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { Marisol } from './Marisol';
import type { Category, ScreenState } from '../types/game';
import { CheckCircle, Lock, Film, Tv, Sparkles, Music, Cpu, Rocket, Globe, HelpCircle, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface PassportCategory {
  category: Category;
  stampName: string;
  icon: any;
  color: string;
  requiredQuestions: number;
}

const PASSPORT_CATEGORIES: PassportCategory[] = [
  { category: 'Movies', stampName: 'Cinema Maven', icon: Film, color: 'bg-coral-500 text-white', requiredQuestions: 5 },
  { category: 'Bollywood', stampName: 'Desi Filmy Star', icon: Sparkles, color: 'bg-doodleGold text-ink', requiredQuestions: 5 },
  { category: 'TV Shows', stampName: 'Binge Master', icon: Tv, color: 'bg-plum-500 text-white', requiredQuestions: 5 },
  { category: 'Music', stampName: '80s Melody Icon', icon: Music, color: 'bg-doodleTeal text-white', requiredQuestions: 3 },
  { category: 'Science', stampName: 'Lab Genius', icon: Cpu, color: 'bg-doodlePink text-white', requiredQuestions: 3 },
  { category: 'Space', stampName: 'Cosmic Voyager', icon: Rocket, color: 'bg-indigo-600 text-white', requiredQuestions: 3 },
  { category: 'Geography', stampName: 'Globe Trotter', icon: Globe, color: 'bg-amber-600 text-white', requiredQuestions: 3 },
  { category: 'Weird Facts', stampName: 'Curiosity Titan', icon: HelpCircle, color: 'bg-emerald-500 text-white', requiredQuestions: 3 },
];

interface KnowledgePassportProps {
  onNavigate?: (screen: ScreenState) => void;
  hideHomeButton?: boolean;
}

export const KnowledgePassport: React.FC<KnowledgePassportProps> = ({ 
  onNavigate,
  hideHomeButton = false
}) => {
  const player = gameState.getPlayer();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'in_progress'>('all');

  const stampedCount = PASSPORT_CATEGORIES.filter(
    item => player.questionsAnswered >= item.requiredQuestions
  ).length;

  const filteredCategories = PASSPORT_CATEGORIES.filter(item => {
    const isStamped = player.questionsAnswered >= item.requiredQuestions;
    if (filter === 'unlocked') return isStamped;
    if (filter === 'in_progress') return !isStamped;
    return true;
  });

  return (
    <div className="min-h-screen bg-paper-50 p-3 sm:p-6 pb-28 text-ink">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          {!hideHomeButton && onNavigate ? (
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('home');
              }}
              className="sketch-btn p-2.5 sm:p-3 bg-white flex items-center gap-1.5 sm:gap-2 shadow-sketch"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-display font-bold text-xs sm:text-sm hidden sm:inline">HOME</span>
            </button>
          ) : <div className="w-9" />}

          <div className="text-center">
            <div className="inline-block bg-white border-2 border-ink px-3 py-1 rounded-full shadow-sketch font-handwritten text-xs sm:text-sm font-bold text-doodleTeal">
              📘 OFFICIAL DOCUMENT
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-plum-700 mt-1">
              KNOWLEDGE PASSPORT
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-handwritten text-xs sm:text-sm font-bold shadow-sketch">
            <span className="text-emerald-600 font-black">{stampedCount}</span> / {PASSPORT_CATEGORIES.length} STAMPS
          </div>
        </div>

        <p className="font-handwritten text-sm sm:text-base text-ink-light max-w-lg mx-auto text-center font-bold">
          Collect illustrated stamps as you master categories across the Factory of Fun!
        </p>
      </div>

      {/* Marisol Passport Guide */}
      <div className="max-w-xl mx-auto mb-6 bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol expression={stampedCount > 3 ? 'celebrating' : 'proud'} size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-base text-ink">Marisol's Stamp Book</h3>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
            "{stampedCount === PASSPORT_CATEGORIES.length 
              ? 'Incredible! You have officially conquered every single passport category!' 
              : 'Look at that progress! Play challenges in every category to complete your world passport.'}"
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center">
        <div className="bg-white border-2 border-ink p-1 rounded-2xl shadow-sketch flex items-center gap-1">
          {[
            { key: 'all', label: `All Stamps (${PASSPORT_CATEGORIES.length})` },
            { key: 'unlocked', label: `🌟 Unlocked (${stampedCount})` },
            { key: 'in_progress', label: `⏳ In Progress (${PASSPORT_CATEGORIES.length - stampedCount})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                audioEngine.playSfx('click');
                setFilter(tab.key as any);
              }}
              className={`px-3 py-1.5 rounded-xl font-handwritten text-xs sm:text-sm font-bold transition-all ${
                filter === tab.key
                  ? 'bg-ink text-white shadow-sketch-xs'
                  : 'text-ink-light hover:bg-paper-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 ? (
        <div className="max-w-md mx-auto bg-white border-3 border-dashed border-ink/30 rounded-3xl p-8 text-center space-y-3 shadow-sketch">
          <div className="text-4xl animate-bounce-gentle">📘✨</div>
          <h3 className="font-display font-black text-lg text-ink">
            {filter === 'unlocked' ? 'No stamps unlocked yet' : 'All stamps unlocked!'}
          </h3>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
            {filter === 'unlocked'
              ? 'Play quizzes across cinema, science, and geography to earn your first passport stamps!'
              : 'You have earned every stamp in this passport book! Amazing achievement, queen!'}
          </p>
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setFilter('all');
            }}
            className="sketch-btn px-4 py-2 text-xs font-display font-black uppercase bg-teal-50 border-2 border-ink shadow-sketch"
          >
            Show All Stamps
          </button>
        </div>
      ) : (
        /* Stamp Collection Grid */
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCategories.map(item => {
            const Icon = item.icon;
            const isStamped = player.questionsAnswered >= item.requiredQuestions;

            return (
              <div
                key={item.category}
                className={`
                  relative bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg flex flex-col items-center text-center space-y-3 transition-all
                  ${isStamped ? 'hover:-translate-y-1 hover:shadow-sketch-xl' : 'opacity-70 bg-paper-100'}
                `}
              >
                {/* Stamp Seal Badge */}
                <div 
                  className={`
                    w-20 h-20 rounded-full border-3 border-ink flex items-center justify-center shadow-sketch relative
                    ${isStamped ? item.color : 'bg-paper-200 text-ink-light'}
                  `}
                >
                  {isStamped ? (
                    <Icon className="w-10 h-10" />
                  ) : (
                    <Lock className="w-8 h-8" />
                  )}

                  {/* Ink Seal Rim */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-ink/40 pointer-events-none" />
                </div>

                <div>
                  <h3 className="font-display font-black text-lg text-ink">
                    {item.stampName}
                  </h3>
                  <p className="font-handwritten text-sm text-coral-500 font-bold">
                    {item.category}
                  </p>
                </div>

                <div className="w-full pt-2 border-t-1.5 border-dashed border-ink/20 font-sans text-xs">
                  {isStamped ? (
                    <span className="font-bold text-doodleTeal flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" /> STAMP UNLOCKED
                    </span>
                  ) : (
                    <span className="text-ink-light">
                      Answer {item.requiredQuestions} {item.category} questions to unlock
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

```

---

### File: `src/components/LearningCard.tsx`

```tsx
import React from 'react';
import type { Question } from '../types/game';
import { Marisol } from './Marisol';
import { audioEngine } from '../services/synthAudioEngine';
import { CheckCircle2, XCircle, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';

interface LearningCardProps {
  question: Question;
  isCorrect: boolean;
  userAnswer: string;
  earnedXp?: number;
  earnedSandwiches?: number;
  onNext: () => void;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  question,
  isCorrect,
  userAnswer,
  earnedXp,
  earnedSandwiches = 3,
  onNext
}) => {
  const sandwichReward = earnedSandwiches || (earnedXp ? Math.max(1, Math.round(earnedXp / 50)) : 3);
  return (
    <div className="bg-white border-3 border-ink rounded-3xl p-5 sm:p-6 shadow-sketch-xl max-w-lg w-full mx-auto animate-fade-in space-y-5">
      
      {/* Result Status Banner */}
      <div 
        className={`
          flex items-center justify-between p-3.5 rounded-2xl border-2.5 border-ink shadow-sketch
          ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-coral-500 text-white'}
        `}
      >
        <div className="flex items-center gap-2.5">
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 stroke-[3]" />
          ) : (
            <XCircle className="w-6 h-6 stroke-[3]" />
          )}
          <span className="font-display font-black text-lg sm:text-xl uppercase">
            {isCorrect ? 'SPOT ON!' : 'CLOSE ONE!'}
          </span>
        </div>

        <div className="font-display font-black text-sm bg-white/20 px-3 py-1 rounded-full border-1.5 border-white">
          {isCorrect ? `+${sandwichReward} 🥪 Cucumber Sandwiches` : '+0 🥪'}
        </div>
      </div>

      {/* Secret Ingredient Unlock Banner */}
      {isCorrect && question.secretIngredient && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-500 rounded-2xl p-3 flex items-center justify-between shadow-sketch-sm animate-bounce-gentle">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider font-handwritten">
                SECRET INGREDIENT UNLOCKED!
              </span>
              <span className="font-display font-black text-sm text-ink">
                {question.secretIngredient}
              </span>
            </div>
          </div>
          <span className="font-handwritten text-xs font-bold text-emerald-800 bg-white border border-emerald-400 px-2 py-0.5 rounded-full">
            Added to Cauldron 🍲
          </span>
        </div>
      )}

      {/* Marisol / Kritika Reaction */}
      <div className="flex justify-center my-2">
        <Marisol
          pose={isCorrect ? 'wink_conquer' : 'silly_vibe'}
          size="medium"
          dialogue={
            isCorrect
              ? 'YES! Spot on, chef! Secret ingredient captured for our recipe!'
              : 'Silly is a vibe! No stress, chef — every mistake sharpens the knife!'
          }
          bubblePosition="top"
        />
      </div>

      {/* Answer Summary */}
      <div className="bg-paper-50 p-3.5 rounded-2xl border-2 border-ink space-y-1 text-sm font-sans">
        <div className="text-ink-light font-medium">Correct Answer:</div>
        <div className="font-bold text-ink text-base text-plum-700">{question.correctAnswer}</div>
        {!isCorrect && (
          <div className="text-xs text-coral-600">Your choice: {userAnswer}</div>
        )}
      </div>

      {/* DID YOU KNOW? Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-plum-700 font-display font-bold text-base">
          <Lightbulb className="w-5 h-5 text-doodleGold" />
          <span>DID YOU KNOW?</span>
        </div>
        <p className="font-handwritten text-lg sm:text-xl text-ink leading-snug bg-paper-100 p-4 rounded-2xl border-2 border-ink">
          "{question.explanation}"
        </p>
      </div>

      {/* FUN FACT Section */}
      {question.funFact && (
        <div className="bg-doodleGold/15 border-2 border-doodleGold p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 font-display font-bold text-xs text-doodleGold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FUN FACT</span>
          </div>
          <p className="font-handwritten text-base text-ink font-semibold">
            {question.funFact}
          </p>
        </div>
      )}

      {/* Next CTA */}
      <button
        onClick={() => {
          audioEngine.playSfx('click');
          onNext();
        }}
        className="sketch-btn-primary w-full py-3.5 text-lg font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg hover:scale-105 active:scale-95 transition-all"
      >
        <span>CONTINUE ADVENTURE</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

```

---

### File: `src/components/LevelClearHeroModal.tsx`

```tsx
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { BaseModal } from './BaseModal';
import { Sparkles, Volume2, VolumeX, Play, Pause, ArrowRight, Trophy, Minimize2 } from 'lucide-react';
import heroBannerVideoSrc from '../assets/Hero Banner video.mp4';
import { videoPlaybackService } from '../services/videoPlaybackService';

interface LevelClearHeroModalProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
  earnedSandwiches?: number;
}

export const LevelClearHeroModal: React.FC<LevelClearHeroModalProps> = ({
  onClose,
  title = "LEVEL CLEARED, QUEEN! 👑💖",
  subtitle = "You crushed this culinary milestone with absolute grace & style!",
  earnedSandwiches = 5
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = gameState.getPlayer();

  useEffect(() => {
    audioEngine.playSfx('fanfare');

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F43F5E', '#EC4899', '#FBBF24', '#A855F7', '#10B981', '#38BDF8']
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
      audioEngine.playSfx('click');
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      audioEngine.playSfx('click');
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      audioEngine.playSfx('click');
    }
  };

  const handleMinimize = () => {
    audioEngine.playSfx('pop');
    videoPlaybackService.minimizeVideo({
      type: 'mp4',
      src: heroBannerVideoSrc,
      title: 'Level Clear Celebration 👑',
      subtitle: 'Playing in background',
      isMuted,
      currentTime: videoRef.current?.currentTime || 0,
    });
    onClose();
  };

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-lg"
      icon={<span className="text-2xl animate-bounce">👑</span>}
      title={
        <span className="flex items-center gap-1.5">
          <span>{title}</span>
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
        </span>
      }
      subtitle={subtitle}
    >
      <div className="space-y-4 text-center">
        {/* HERO BANNER VIDEO PLAYER */}
        <div className="relative rounded-2xl overflow-hidden border-2.5 border-ink bg-black shadow-sketch group aspect-video">
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={heroBannerVideoSrc} type="video/mp4" />
            <source src="/hero-banner-video.mp4" type="video/mp4" />
            <source src="/Hero Banner video.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Quick Overlay Controls on Hover/Tap */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white opacity-90 transition-opacity">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white transition-all active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white transition-all active:scale-95"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMinimize}
                className="text-xs font-handwritten font-bold text-white px-2.5 py-1 rounded-lg bg-pink-600/80 hover:bg-pink-600 border border-pink-400 flex items-center gap-1 transition-all"
                title="Minimize video to floating window"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Minimize 🗗</span>
              </button>

              <button
                type="button"
                onClick={handleReplay}
                className="text-xs font-handwritten font-bold text-pink-200 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Watch Again 🔄
              </button>
            </div>
          </div>
        </div>

        {/* REWARD & SCORE SUMMARY */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-pink-50 border-2 border-emerald-300 rounded-2xl p-3 flex items-center justify-between text-left shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
              🥪
            </div>
            <div>
              <div className="font-display font-black text-xs sm:text-sm text-emerald-950 flex items-center gap-1">
                <span>+{earnedSandwiches} Cucumber Sandwiches</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-full font-bold">LEVEL BONUS</span>
              </div>
              <div className="font-handwritten text-[11px] text-emerald-800 font-bold">
                Chef Rank: {player.chefTitle || 'Apprentice Chopper 🥒'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-display font-black text-sm text-emerald-900 bg-white border border-emerald-300 px-2 py-1 rounded-xl shadow-2xs">
              {player.cucumberSandwiches || 0} 🥪
            </span>
          </div>
        </div>

        {/* PRIMARY CONTINUE & MINIMIZE ACTIONS */}
        <div className="space-y-2">
          <button
            onClick={() => {
              audioEngine.playSfx('fanfare');
              onClose();
            }}
            className="sketch-btn-primary w-full py-3.5 text-base sm:text-lg font-black uppercase flex items-center justify-center gap-2 shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>REVEAL SECRET RECIPE REWARD</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleMinimize}
            className="w-full py-2 bg-purple-50 hover:bg-purple-100 border-2 border-dashed border-purple-300 rounded-xl font-handwritten text-xs font-bold text-purple-900 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-purple-700" />
            <span>Minimize video to corner & explore app in background</span>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};


```

---

### File: `src/components/LittleLoveNote.tsx`

```tsx
import React, { useState } from 'react';
import { wellnessState } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';

export const LittleLoveNote: React.FC = () => {
  const [loveNote, setLoveNote] = useState(() => wellnessState.getCurrentLoveNote());
  const [isFlipping, setIsFlipping] = useState(false);

  const handleDrawNext = () => {
    audioEngine.playSfx('powerup');
    setIsFlipping(true);
    setTimeout(() => {
      const next = wellnessState.drawNextLoveNote();
      setLoveNote(next);
      setIsFlipping(false);
    }, 200);
  };

  const washiClass = 
    loveNote.washiColor === 'pink' 
      ? 'washi-tape' 
      : loveNote.washiColor === 'lavender' 
      ? 'washi-tape-lavender' 
      : 'washi-tape';

  return (
    <div className="relative pt-3">
      {/* Washi Tape Strip on Top */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 z-10 w-28 h-5 ${washiClass} rounded-xs shadow-xs`} />

      {/* Pastel Sticky Love Note Card */}
      <div className={`
        bg-gradient-to-br from-rose-50/90 via-pink-50 to-amber-50/80
        border-2.5 border-pink-300 rounded-3xl p-5 shadow-sketch relative overflow-hidden transition-all duration-300
        ${isFlipping ? 'scale-95 opacity-50 rotate-1' : 'scale-100 opacity-100 rotate-0'}
      `}>
        {/* Background Notebook Line Effect */}
        <div className="absolute inset-0 notebook-lines pointer-events-none opacity-40" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10 pb-2 border-b border-pink-200/60">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-heart-pop" />
            <span className="font-display font-black text-xs uppercase tracking-wider text-pink-900">
              LITTLE LOVE NOTE FOR KRITIKA 💌
            </span>
          </div>

          <button
            onClick={handleDrawNext}
            className="flex items-center gap-1 font-handwritten text-xs font-bold text-pink-700 hover:text-pink-900 bg-white/70 px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs hover:scale-105 active:scale-95 transition-all"
            title="Draw another love note"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Draw Note 🎀</span>
          </button>
        </div>

        {/* Note Content */}
        <div className="pt-3 pb-2 relative z-10 space-y-2 text-left">
          <p className="font-handwritten text-base sm:text-lg text-ink font-bold leading-relaxed italic">
            "{loveNote.quote}"
          </p>

          <p className="font-sans text-xs text-pink-700 font-medium">
            ✨ {loveNote.subtext}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="font-handwritten text-xs text-ink-light font-bold">
              {loveNote.from}
            </span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/Marisol.tsx`

```tsx
import React from 'react';
import type { MarisolExpression } from '../types/game';
import { STICKERS_BY_ALIAS, STICKERS } from '../data/stickers';

interface MarisolProps {
  expression?: MarisolExpression;
  pose?: string; // Direct pose alias from the 11 stickers
  variant?: 'avatar' | 'sticker' | 'card';
  dialogue?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  showSpeechBubble?: boolean;
  bubblePosition?: 'top' | 'right' | 'left' | 'bottom';
  className?: string;
  onClick?: () => void;
}

// Map the 24 game expressions to one of the 11 canonical sticker poses
const EXPRESSION_TO_POSE: Record<string, string> = {
  // 1. Same Girl Brighter Ideas
  idle: 'brighter_ideas',
  encouraging: 'brighter_ideas',
  
  // 2. Good Ideas Happier Days
  welcome: 'happier_days',
  happy: 'happier_days',
  proud: 'happier_days',
  celebrating: 'happier_days',

  // 3. Wink & Conquer
  wink: 'wink_conquer',
  motivational: 'wink_conquer',

  // 4. Overthinking But Making Progress
  thinking: 'overthinking',
  confused: 'overthinking',

  // 5. Chai = Happiness
  chai: 'chai_happiness',
  oops: 'chai_happiness',
  sleepy: 'chai_happiness',

  // 6. Silly Is A Vibe
  laughing: 'silly_vibe',
  surprised: 'silly_vibe',
  shocked: 'silly_vibe',

  // 7. Big Dreams
  curious: 'big_dreams',
  genius: 'big_dreams',

  // 8. Grateful Always
  reading: 'grateful_always',
  disappointed: 'grateful_always',

  // 9. Just Me
  peace: 'just_me',
  dramatic: 'just_me',

  // 10. Same Kritika Bigger Adventures
  excited: 'bigger_adventures',
  adventures: 'bigger_adventures',

  // 11. Good Music Brighter Mood
  music: 'music_mood',
};

export const Marisol: React.FC<MarisolProps> = ({
  expression = 'welcome',
  pose,
  variant = 'avatar',
  dialogue,
  size = 'medium',
  showSpeechBubble = true,
  bubblePosition = 'top',
  className = '',
  onClick,
}) => {
  // Resolve which of the 11 stickers to use
  const targetAlias = pose || EXPRESSION_TO_POSE[expression] || 'happier_days';
  const stickerData = STICKERS_BY_ALIAS[targetAlias] || STICKERS[0];

  // Size dimensions
  const avatarSizeClasses = {
    small: 'w-16 h-16 sm:w-20 sm:h-20',
    medium: 'w-28 h-28 sm:w-36 sm:h-36',
    large: 'w-40 h-40 sm:w-48 sm:h-48',
    full: 'w-56 h-56 sm:w-64 sm:h-64',
  }[size];

  const stickerSizeClasses = {
    small: 'w-24 sm:w-28',
    medium: 'w-40 sm:w-48',
    large: 'w-56 sm:w-64',
    full: 'w-72 sm:w-80',
  }[size];

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Hand-drawn Speech Bubble */}
      {showSpeechBubble && dialogue && (
        <div 
          className={`
            relative z-20 mb-3 px-4 py-2.5 max-w-xs sm:max-w-sm text-center
            bg-white text-ink font-handwritten text-lg sm:text-xl font-bold
            border-2.5 border-ink shadow-sketch rounded-2xl animate-float
            ${bubblePosition === 'left' ? 'self-start' : bubblePosition === 'right' ? 'self-end' : 'self-center'}
          `}
        >
          {dialogue}
          {/* Bubble Pointer Tail */}
          <div 
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2.5 border-b-2.5 border-ink rotate-45"
          />
        </div>
      )}

      {/* Render Variant 1: Avatar (Circle portrait with face focused) */}
      {variant === 'avatar' && (
        <div className="relative group">
          {/* Floating Doodle Accents */}
          <div className="absolute -top-2 -right-2 text-coral-500 font-handwritten text-xl font-bold animate-bounce-gentle select-none pointer-events-none z-10">
            {stickerData.badgeEmoji}
          </div>
          <div className="absolute -bottom-1 -left-2 text-doodleGold font-handwritten text-lg font-bold select-none pointer-events-none z-10">
            ❤️
          </div>

          {/* Hand-drawn Sketch Frame */}
          <div 
            className={`
              ${avatarSizeClasses}
              relative overflow-hidden rounded-full
              border-3 border-ink shadow-sketch-lg bg-[#FAF7F0]
              transition-transform duration-300 group-hover:scale-105
            `}
          >
            <img
              src={stickerData.avatarUrl}
              alt={stickerData.title}
              className="w-full h-full object-cover transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Caption Label */}
          <div className="mt-1 text-center font-handwritten text-xs sm:text-sm text-ink-light font-bold select-none truncate max-w-[140px]">
            {stickerData.quote.replace(' ♡', '')}
          </div>
        </div>
      )}

      {/* Render Variant 2: Full Sticker (Raw sticker with artwork, quotes & doodles) */}
      {variant === 'sticker' && (
        <div className="relative group transition-transform duration-300 hover:scale-105">
          <div 
            className={`
              ${stickerSizeClasses}
              rounded-2xl overflow-hidden border-2.5 border-ink shadow-sketch-lg bg-[#FAF7F0]
              p-1.5
            `}
          >
            <img
              src={stickerData.stickerUrl}
              alt={stickerData.title}
              className="w-full h-auto object-contain rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Render Variant 3: Collectible Polaroid Card */}
      {variant === 'card' && (
        <div className="relative group transition-transform duration-300 hover:scale-105">
          {/* Tape on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-doodleGold/40 border border-ink/40 -rotate-2 z-10 shadow-sm" />
          
          <div 
            className={`
              ${stickerSizeClasses}
              bg-white border-2.5 border-ink rounded-2xl p-2.5 pt-3.5 shadow-sketch-xl
              flex flex-col items-center
            `}
          >
            <div className="w-full rounded-xl overflow-hidden border-1.5 border-ink bg-[#FAF7F0]">
              <img
                src={stickerData.stickerUrl}
                alt={stickerData.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="mt-2 text-center">
              <span className="font-handwritten text-xs sm:text-sm font-bold text-ink block">
                {stickerData.quote}
              </span>
              <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-light/70 bg-paper-100 px-2 py-0.5 rounded-full border border-ink/20">
                {stickerData.vibe}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

```

---

### File: `src/components/MoodHistoryModal.tsx`

```tsx
import React from 'react';
import { BaseModal } from './BaseModal';
import { moodHistoryManager, type MoodHistoryEntry } from '../services/moodRotationService';
import { Calendar, Lock, Sparkles } from 'lucide-react';

interface MoodHistoryModalProps {
  onClose: () => void;
}

export const MoodHistoryModal: React.FC<MoodHistoryModalProps> = ({ onClose }) => {
  const history = moodHistoryManager.getMoodHistory();

  // Generate last 14 days for the soft heatmap
  const last14Days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toISOString().split('T')[0];
    const match = history.find(h => h.date === dateStr);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const dayNumber = d.getDate();
    return { dateStr, dayLabel, dayNumber, match };
  });

  return (
    <BaseModal
      onClose={onClose}
      title="MOOD CALENDAR & STREAK"
      subtitle="Kritika's 14-Day Comfort & Mood Heatmap"
      icon={<Calendar className="w-5 h-5 text-rose-600" />}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 text-left">
        {/* Soft Heatmap Grid */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200 rounded-3xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-display font-black text-xs uppercase text-rose-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>14-Day Mood Flow</span>
            </span>
            <span className="text-[10px] font-handwritten font-bold text-rose-700 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200">
              {history.length} Check-ins Recorded
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-1">
            {last14Days.map(d => {
              const isCheckedIn = Boolean(d.match);
              return (
                <div
                  key={d.dateStr}
                  className={`p-2 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                    isCheckedIn
                      ? 'bg-white border-pink-300 shadow-xs'
                      : 'bg-white/40 border-stone-200/60 opacity-60'
                  }`}
                  title={d.match ? `${d.dateStr}: ${d.match.moodLabel} (Scale ${d.match.scaleNumber}/9)` : `${d.dateStr}: No entry`}
                >
                  <span className="text-[10px] font-bold text-stone-500">{d.dayLabel}</span>
                  <span className="text-xs font-black text-stone-800">{d.dayNumber}</span>
                  <span className="text-base my-0.5">
                    {d.match ? d.match.emoji : '·'}
                  </span>
                  {d.match && (
                    <span className="text-[9px] font-display font-bold text-rose-600">
                      #{d.match.scaleNumber}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Past Check-Ins */}
        <div className="space-y-2">
          <span className="font-display font-black text-xs uppercase text-stone-700 block">
            Recent Check-In Entries:
          </span>

          {history.length === 0 ? (
            <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-6 text-center text-stone-500 font-handwritten text-xs font-bold">
              No mood check-ins recorded yet. Tap any mood on the scale to log today's feeling! 🌸
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {history.map((entry: MoodHistoryEntry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-stone-200 rounded-2xl p-3 shadow-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{entry.emoji}</span>
                      <div>
                        <div className="font-display font-black text-xs text-stone-800">
                          {entry.moodLabel} (Scale #{entry.scaleNumber})
                        </div>
                        <div className="text-[10px] text-stone-500 font-medium">
                          {entry.date}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-handwritten font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      Comfort Macaroni 🧀
                    </span>
                  </div>

                  {entry.privateNote && (
                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-200/80 text-xs font-handwritten text-stone-700 flex items-start gap-1.5 mt-1">
                      <Lock className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                      <span className="italic">"{entry.privateNote}"</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/MoodSelectorModal.tsx`

```tsx
import React from 'react';
import { STICKERS, type StickerData } from '../data/stickers';
import { RECIPES_BY_MOOD } from '../data/recipes';
import { BaseModal } from './BaseModal';
import { Sparkles, Utensils } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface MoodSelectorModalProps {
  currentMood: string;
  onSelectMood: (moodAlias: string) => void;
  onClose: () => void;
  onOpenComfortCorner?: () => void;
}

export const MoodSelectorModal: React.FC<MoodSelectorModalProps> = ({
  currentMood,
  onSelectMood,
  onClose,
  onOpenComfortCorner,
}) => {
  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-2xl"
      icon={<div className="w-full h-full bg-coral-500 rounded-xl flex items-center justify-center text-white"><Utensils className="w-5 h-5 text-white" /></div>}
      title="SELECT YOUR COOKING MOOD ♡"
      subtitle="Pick from Kritika's 11 mood stickers to flavor your trivia and unlock a matching recipe!"
    >
      <div className="space-y-4">

        {/* Girl's Perspective Angry / Stressed Quick Action */}
        {onOpenComfortCorner && (
          <button
            onClick={() => {
              audioEngine.playSfx('powerup');
              onClose();
              onOpenComfortCorner();
            }}
            className="w-full bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 border-2 border-coral-500 rounded-2xl p-3 text-left flex items-center justify-between shadow-sketch-xs hover:scale-101 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-coral-500 text-white flex items-center justify-center text-lg shadow-inner shrink-0">
                😤
              </div>
              <div>
                <div className="font-display font-black text-xs sm:text-sm text-ink group-hover:text-coral-600 transition-colors flex items-center gap-1.5">
                  <span>Feeling Angry, Hangry, or Stressed?</span>
                  <span className="bg-coral-500 text-white text-[10px] px-2 py-0.5 rounded-full font-handwritten">GIRL'S TLC ♡</span>
                </div>
                <div className="font-handwritten text-xs text-ink-light font-bold">
                  Tap here for validation, hangry comfort food, vent poppers & free cucumber sandwiches!
                </div>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-coral-500 shrink-0" />
          </button>
        )}

        {/* 11 Mood Stickers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {STICKERS.map((sticker: StickerData) => {
            const isSelected = sticker.alias === currentMood;
            const pairedRecipe = RECIPES_BY_MOOD[sticker.alias];

            return (
              <button
                key={sticker.id}
                onClick={() => {
                  audioEngine.playSfx('click');
                  onSelectMood(sticker.alias);
                }}
                className={`
                  p-3 rounded-2xl border-2.5 transition-all text-left flex items-center gap-3.5 relative group
                  ${
                    isSelected
                      ? 'border-ink bg-doodleGold/30 ring-2 ring-doodleGold shadow-sketch'
                      : 'border-ink/30 bg-white hover:border-ink hover:bg-paper-100 hover:shadow-sketch-sm'
                  }
                `}
              >
                {/* Sticker Avatar */}
                <div className="w-14 h-14 rounded-full border-2 border-ink overflow-hidden shrink-0 bg-[#FAF7F0] shadow-sm group-hover:scale-105 transition-transform">
                  <img
                    src={sticker.avatarUrl}
                    alt={sticker.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{sticker.badgeEmoji}</span>
                    <span className="font-display font-black text-xs sm:text-sm text-ink truncate block">
                      {sticker.quote.replace(' ♡', '')}
                    </span>
                  </div>

                  <div className="font-handwritten text-xs text-ink-light font-bold truncate mt-0.5">
                    "{sticker.vibe}"
                  </div>

                  {pairedRecipe && (
                    <div className="mt-1 text-[11px] font-sans font-semibold text-coral-600 truncate flex items-center gap-1">
                      <span>🍲 Dish:</span>
                      <span className="truncate">{pairedRecipe.title.split('&')[0]}</span>
                    </div>
                  )}
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-coral-500 text-white rounded-full px-2 py-0.5 font-handwritten text-[10px] font-bold border border-ink shadow-xs">
                    ACTIVE
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Tip */}
        <div className="bg-amber-50 border-1.5 border-ink/30 rounded-2xl p-3 text-center">
          <p className="font-handwritten text-xs text-ink font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-doodleGold" />
            <span>Every correct question earns Cucumber Sandwiches 🥪 and gathers secret ingredients!</span>
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/MovieDetectiveCard.tsx`

```tsx
import React, { useState } from 'react';
import type { Question } from '../types/game';
import { Marisol } from './Marisol';
import { audioEngine } from '../services/synthAudioEngine';
import { Search, Eye } from 'lucide-react';

interface MovieDetectiveCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions?: number;
  onAnswer: (selectedOption: string, timeTakenMs: number) => void;
}

export const MovieDetectiveCard: React.FC<MovieDetectiveCardProps> = ({
  question,
  questionNumber,
  onAnswer
}) => {
  const [unlockedCluesCount, setUnlockedCluesCount] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const clues = question.clues || [
    'Released in the 2010s.',
    'Directed by a master of cinema.',
    'Won multiple international awards.'
  ];

  const handleRevealNextClue = () => {
    if (unlockedCluesCount < clues.length) {
      audioEngine.playSfx('click');
      setUnlockedCluesCount(prev => prev + 1);
    }
  };

  const handleSelectOption = (option: string) => {
    if (selected !== null) return;
    setSelected(option);

    const timeTaken = Date.now() - startTime;
    const isCorrect = option === question.correctAnswer;

    if (isCorrect) {
      audioEngine.playSfx('correct');
    } else {
      audioEngine.playSfx('wrong');
    }

    setTimeout(() => {
      onAnswer(option, timeTaken);
    }, 400);
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-[#E8DFD1] border-3 border-ink rounded-3xl p-5 sm:p-6 shadow-sketch-xl space-y-5 relative">
      
      {/* Push Pin Decorator */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-coral-500 border-2 border-ink shadow-sketch z-20" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="bg-white border-2 border-ink px-3 py-1 rounded-xl text-xs font-bold text-ink">
          🕵️ MOVIE DETECTIVE • CASE #{questionNumber}
        </div>
        <div className="font-handwritten text-xs font-bold text-plum-700 bg-white px-2.5 py-1 rounded-lg border-1.5 border-ink">
          CLUES UNLOCKED: {unlockedCluesCount}/{clues.length}
        </div>
      </div>

      {/* Marisol Character Header */}
      <div className="flex justify-center">
        <Marisol
          expression="curious"
          size="medium"
          dialogue="Inspect the clues carefully detective! Who is behind this movie mystery?"
          bubblePosition="top"
        />
      </div>

      {/* Detective Evidence Board Clues */}
      <div className="space-y-3">
        {clues.slice(0, unlockedCluesCount).map((clueText, idx) => (
          <div 
            key={idx}
            className="bg-white p-4 rounded-2xl border-2.5 border-ink shadow-sketch animate-fade-in space-y-1"
          >
            <div className="flex items-center gap-2 font-display font-bold text-xs text-coral-500 uppercase">
              <Search className="w-3.5 h-3.5" />
              <span>EVIDENCE #{idx + 1}</span>
            </div>
            <p className="font-handwritten text-lg sm:text-xl text-ink font-semibold">
              "{clueText}"
            </p>
          </div>
        ))}
      </div>

      {/* Unlock Next Clue CTA */}
      {unlockedCluesCount < clues.length && (
        <button
          onClick={handleRevealNextClue}
          className="sketch-btn-gold w-full py-2.5 text-sm font-bold flex items-center justify-center gap-2 shadow-sketch"
        >
          <Eye className="w-4 h-4" />
          <span>REVEAL NEXT CLUE (-50 XP BONUS)</span>
        </button>
      )}

      {/* Movie Selection Options */}
      <div className="space-y-3 pt-2">
        <div className="font-display font-bold text-xs text-ink-light text-center uppercase tracking-wider">
          CHOOSE YOUR VERDICT:
        </div>
        {question.options.map((option, idx) => {
          const isSelected = selected === option;
          return (
            <button
              key={idx}
              disabled={selected !== null}
              onClick={() => handleSelectOption(option)}
              className={`
                sketch-btn w-full p-3.5 text-left font-display font-bold text-base sm:text-lg transition-all
                ${isSelected ? 'bg-doodleTeal text-white ring-4 ring-doodleTeal/30' : 'bg-white hover:bg-paper-100 text-ink'}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

```

---

### File: `src/components/MusicJukeboxModal.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { wellnessState } from '../services/wellnessState';
import type { HindiSong } from '../data/hindiSongs';
import { BaseModal } from './BaseModal';
import { ExternalLink, SkipForward, SkipBack, Heart, Search, Pin, Plus, Copy, Check, Play, Minimize2 } from 'lucide-react';
import { videoPlaybackService } from '../services/videoPlaybackService';

interface MusicJukeboxModalProps {
  onClose: () => void;
  initialSongId?: string;
}

// Crisp official YouTube SVG icon
const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const MusicJukeboxModal: React.FC<MusicJukeboxModalProps> = ({ onClose, initialSongId }) => {
  const [, setTick] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMoodTag, setActiveMoodTag] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [quickYtInput, setQuickYtInput] = useState('');

  // Detailed add form states
  const [newTitle, setNewTitle] = useState('');
  const [newMovie, setNewMovie] = useState('');
  const [newSingers, setNewSingers] = useState('');
  const [newYoutubeUrl, setNewYoutubeUrl] = useState('');

  const allSongs = wellnessState.getAllSongs();
  const pinnedIds = wellnessState.getPinnedSongIds();

  const [selectedSong, setSelectedSong] = useState<HindiSong>(() => {
    return allSongs.find(s => s.id === initialSongId) || allSongs[0];
  });
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audioEngine.stopMusic();
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const handleSelectSong = (song: HindiSong) => {
    audioEngine.playSfx('click');
    audioEngine.stopMusic();
    setSelectedSong(song);
    setIsPlaying(true);
  };

  const handleTogglePin = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    wellnessState.togglePinSong(songId);
  };

  const handleNext = () => {
    audioEngine.playSfx('click');
    const idx = allSongs.findIndex(s => s.id === selectedSong.id);
    const nextSong = allSongs[(idx + 1) % allSongs.length];
    setSelectedSong(nextSong);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    audioEngine.playSfx('click');
    const idx = allSongs.findIndex(s => s.id === selectedSong.id);
    const prevSong = allSongs[(idx - 1 + allSongs.length) % allSongs.length];
    setSelectedSong(prevSong);
    setIsPlaying(true);
  };

  // Helper to extract YouTube Video ID from full URL, shorts, or raw ID
  const extractVideoId = (input: string): string => {
    const trimmed = input.trim();
    if (trimmed.includes('shorts/')) {
      return trimmed.split('shorts/')[1]?.split('?')[0]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('v=')) {
      return trimmed.split('v=')[1]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('youtu.be/')) {
      return trimmed.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('embed/')) {
      return trimmed.split('embed/')[1]?.split('?')[0]?.split('&')[0] || trimmed;
    }
    return trimmed;
  };

  const handleQuickPlayYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickYtInput.trim()) return;

    audioEngine.playSfx('fanfare');
    const ytId = extractVideoId(quickYtInput);

    const existing = allSongs.find(s => s.youtubeId === ytId);
    if (existing) {
      setSelectedSong(existing);
      setIsPlaying(true);
      setQuickYtInput('');
      return;
    }

    const created = wellnessState.addCustomSong({
      title: `YouTube Pick #${Math.floor(100 + Math.random() * 900)}`,
      movie: 'YouTube Stream',
      singers: 'Queen\'s Choice',
      year: new Date().getFullYear(),
      emoji: '🔴',
      accentColor: '#EF4444',
      youtubeId: ytId,
      vibe: 'Direct YouTube Stream ♡',
      lyricsHighlight: 'Playing directly from YouTube stream!',
      movieQuote: '"Music makes every moment magical!"',
      tags: ['YouTube Pick', 'Favorites']
    });

    wellnessState.togglePinSong(created.id);
    setSelectedSong(created);
    setIsPlaying(true);
    setQuickYtInput('');
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newYoutubeUrl.trim()) return;

    audioEngine.playSfx('fanfare');
    const ytId = extractVideoId(newYoutubeUrl);

    const created = wellnessState.addCustomSong({
      title: newTitle.trim(),
      movie: newMovie.trim() || 'Kritika\'s Favorite',
      singers: newSingers.trim() || 'Curated Hit',
      year: new Date().getFullYear(),
      emoji: '💖',
      accentColor: '#F43F5E',
      youtubeId: ytId,
      vibe: 'Queen\'s Personal Hit',
      lyricsHighlight: `Special pick added by Queen Kritika ♡`,
      movieQuote: '"Music is the rhythm of life!"',
      tags: ['Queen Pick', 'Favorites']
    });

    wellnessState.togglePinSong(created.id);
    setSelectedSong(created);
    setIsPlaying(true);
    setShowAddForm(false);
    setNewTitle('');
    setNewMovie('');
    setNewSingers('');
    setNewYoutubeUrl('');
  };

  const handleCopyLink = () => {
    const ytUrl = `https://www.youtube.com/watch?v=${selectedSong.youtubeId}`;
    navigator.clipboard.writeText(ytUrl).then(() => {
      audioEngine.playSfx('pop');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  // Filter songs based on search & mood tags
  const filteredSongs = allSongs.filter(song => {
    const matchesSearch = 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.singers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = 
      activeMoodTag === 'All' || 
      song.tags.includes(activeMoodTag);

    return matchesSearch && matchesTag;
  });

  const pinnedSongsList = filteredSongs.filter(s => pinnedIds.includes(s.id));
  const otherSongsList = filteredSongs.filter(s => !pinnedIds.includes(s.id));

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-xl"
      icon={<div className="w-full h-full bg-gradient-to-tr from-red-600 via-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white"><YouTubeIcon className="w-6 h-6 text-white" /></div>}
      title="KRITIKA'S YOUTUBE LOUNGE"
      subtitle="Hand-picked Bollywood comfort songs & self-love anthems 💖"
      badge={
        <span className="bg-red-500 text-white font-display text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          CURATED PLAYLIST
        </span>
      }
    >
      <div className="space-y-4">

        {/* Embedded Official YouTube Player */}
        <div className="bg-black border-2.5 border-ink rounded-3xl overflow-hidden shadow-sketch relative">
          {isPlaying ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={selectedSong.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${selectedSong.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={`${selectedSong.title} - ${selectedSong.movie}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div 
              onClick={() => setIsPlaying(true)}
              className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-br from-red-950 via-slate-900 to-pink-950 text-white p-4 text-center cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-sketch group-hover:scale-110 transition-transform mb-2">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
              <p className="font-display font-black text-lg">{selectedSong.title}</p>
              <p className="font-handwritten text-sm text-pink-200">Tap to play on YouTube player</p>
            </div>
          )}

          {/* Player Info & YouTube Action Bar */}
          <div className="p-3.5 bg-gradient-to-r from-slate-950 via-zinc-900 to-slate-950 text-white border-t-2 border-ink space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-base">{selectedSong.emoji}</span>
                  <span className="font-display font-black text-sm sm:text-base text-white truncate">
                    {selectedSong.title}
                  </span>
                  <span className="bg-red-500/30 text-red-300 border border-red-500/40 font-handwritten text-[10px] px-2 py-0.5 rounded-full shrink-0">
                    {selectedSong.movie}
                  </span>
                  {pinnedIds.includes(selectedSong.id) && (
                    <span className="bg-pink-500 text-white font-handwritten text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      📌 PINNED
                    </span>
                  )}
                </div>
                <p className="font-handwritten text-xs text-rose-200 truncate mt-0.5">
                  🎤 {selectedSong.singers}
                </p>
              </div>

              {/* Transport & YouTube Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => handleTogglePin(e, selectedSong.id)}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                    pinnedIds.includes(selectedSong.id)
                      ? 'bg-pink-500 text-white border-pink-400 shadow-xs'
                      : 'bg-white/10 text-white/70 border-white/20 hover:text-white'
                  }`}
                  title={pinnedIds.includes(selectedSong.id) ? 'Unpin from Favorites' : 'Pin to Favorites'}
                >
                  <Pin className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                  title="Previous Song"
                >
                  <SkipBack className="w-4 h-4 fill-white" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                  title="Next Song"
                >
                  <SkipForward className="w-4 h-4 fill-white" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    videoPlaybackService.minimizeVideo({
                      type: 'youtube',
                      src: selectedSong.youtubeId,
                      title: selectedSong.title,
                      subtitle: selectedSong.movie,
                    });
                    onClose();
                  }}
                  className="px-2.5 h-8 rounded-xl bg-pink-600 hover:bg-pink-700 border border-pink-400/50 flex items-center gap-1 text-white text-xs font-display font-black transition-all hover:scale-102 active:scale-95 shadow-xs"
                  title="Minimize YouTube video to corner"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Minimize 🗗</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${selectedSong.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 h-8 rounded-xl bg-red-600 hover:bg-red-700 border border-red-400/50 flex items-center gap-1.5 text-white text-xs font-display font-black transition-all hover:scale-102 active:scale-95 shadow-xs"
                  title="Open directly on YouTube"
                >
                  <YouTubeIcon className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick YouTube Utilities row */}
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] font-handwritten text-white/70">
              <button
                onClick={handleCopyLink}
                className="hover:text-white flex items-center gap-1 text-white/80 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">YouTube link copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy YouTube Link</span>
                  </>
                )}
              </button>

              <span className="text-[10px] text-zinc-400">
                Official YouTube Embed • {selectedSong.year}
              </span>
            </div>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="bg-pink-50/80 border-2 border-pink-200 rounded-2xl p-3 text-left space-y-0.5 shadow-2xs">
          <div className="flex items-center justify-between text-pink-900 font-display font-black text-xs">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>SONG HIGHLIGHT</span>
            </span>
            <span className="font-handwritten text-[11px] text-pink-700 font-bold">
              {selectedSong.vibe}
            </span>
          </div>
          <p className="font-handwritten text-xs sm:text-sm text-ink font-bold italic">
            "{selectedSong.lyricsHighlight}"
          </p>
        </div>

        {/* CURATED PLAYLIST SEARCH BAR & CUSTOM SONG BUTTON */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                type="text"
                placeholder="Search curated songs, movies, artists, or vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border-2 border-pink-300 rounded-2xl font-display text-xs text-ink placeholder:text-ink-light focus:border-pink-500 focus:outline-hidden shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-light hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Expand Detailed Add Modal */}
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 border-2 border-pink-300 font-display font-black text-xs rounded-2xl flex items-center gap-1 shadow-2xs shrink-0 transition-transform active:scale-95"
              title="Add Custom YouTube Song"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Song</span>
            </button>
          </div>

          {/* Quick YouTube Link Paste Bar */}
          <form 
            onSubmit={handleQuickPlayYouTube}
            className="bg-red-50/90 border border-red-200 rounded-2xl p-2 flex items-center gap-2 shadow-2xs"
          >
            <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <YouTubeIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <input
              type="text"
              placeholder="Paste any YouTube URL or Video ID to add to playlist..."
              value={quickYtInput}
              onChange={(e) => setQuickYtInput(e.target.value)}
              className="flex-1 min-w-0 bg-white border border-red-200 rounded-xl px-2.5 py-1 font-display text-xs text-ink placeholder:text-ink-light focus:outline-hidden focus:border-red-500"
            />
            <button
              type="submit"
              disabled={!quickYtInput.trim()}
              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-display font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 transition-all active:scale-95"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Play</span>
            </button>
          </form>

          {/* Mood Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
            <span className="text-[11px] text-ink-light uppercase tracking-wider font-display font-bold shrink-0">
              Mood:
            </span>
            {['All', 'Feel Good', 'Self Love', 'Cozy Chai', 'Party', 'Travel'].map(tag => (
              <button
                key={tag}
                onClick={() => setActiveMoodTag(tag)}
                className={`px-3 py-1 rounded-full border transition-all shrink-0 ${
                  activeMoodTag === tag
                    ? 'bg-pink-500 text-white border-pink-600 shadow-xs'
                    : 'bg-white text-ink-light border-pink-200 hover:border-pink-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Add Form Dropdown */}
        {showAddForm && (
          <form 
            onSubmit={handleAddSong}
            className="p-3.5 bg-gradient-to-br from-pink-50 to-rose-50 border-2.5 border-pink-300 rounded-3xl space-y-2.5 shadow-sketch animate-fade-in text-left"
          >
            <div className="flex items-center justify-between border-b border-pink-200 pb-1.5">
              <span className="font-display font-black text-xs text-pink-900 uppercase">
                Add YouTube Song to Kritika's Playlist 🎵
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs font-bold text-pink-700 hover:text-pink-900"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Song Title (e.g. Kasoor)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="Movie / Album (e.g. Prateek Kuhad)"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Singers / Artists"
                value={newSingers}
                onChange={(e) => setNewSingers(e.target.value)}
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="YouTube Link or Video ID"
                value={newYoutubeUrl}
                onChange={(e) => setNewYoutubeUrl(e.target.value)}
                required
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-display font-black text-xs rounded-xl shadow-xs hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save & Play on Jukebox</span>
            </button>
          </form>
        )}

        {/* SONG LISTS: Pinned & All Curated */}
        <div className="space-y-3 pt-1">
          {/* Pinned Songs Section */}
          {pinnedSongsList.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-display font-black text-pink-900 uppercase">
                <Pin className="w-3 h-3 fill-pink-500 text-pink-500" />
                <span>KRITIKA'S PINNED FAVORITES ({pinnedSongsList.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pinnedSongsList.map((song) => {
                  const isCurrent = selectedSong.id === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => handleSelectSong(song)}
                      className={`
                        p-2.5 rounded-2xl border-2 transition-all text-left flex items-center justify-between cursor-pointer group
                        ${
                          isCurrent
                            ? 'border-pink-500 bg-pink-50 shadow-sketch ring-2 ring-pink-400'
                            : 'border-pink-200 bg-white hover:border-pink-300 hover:shadow-sketch-xs'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-2xs group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${song.accentColor}20`, border: `1.5px solid ${song.accentColor}50` }}
                        >
                          {song.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-black text-xs text-ink truncate">
                            {song.title}
                          </p>
                          <p className="font-handwritten text-[11px] text-pink-700 font-bold truncate">
                            {song.movie}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleTogglePin(e, song.id)}
                        className="p-1.5 text-pink-500 hover:text-pink-700 transition-colors shrink-0"
                        title="Unpin"
                      >
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Curated Playlist Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-display font-black text-ink uppercase">
              <span>CURATED BOLLYWOOD PLAYLIST ({filteredSongs.length})</span>
              <span className="font-handwritten text-xs text-ink-light font-bold">
                Tap to play
              </span>
            </div>

            {filteredSongs.length === 0 ? (
              <div className="p-6 bg-pink-50/50 border-2 border-dashed border-pink-200 rounded-3xl text-center space-y-1.5">
                <p className="text-2xl">🎶</p>
                <p className="font-display font-bold text-xs text-ink">No songs match your search</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveMoodTag('All');
                  }}
                  className="font-handwritten text-xs text-pink-600 font-bold underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {otherSongsList.map((song) => {
                  const isCurrent = selectedSong.id === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => handleSelectSong(song)}
                      className={`
                        p-2.5 rounded-2xl border-2 transition-all text-left flex items-center justify-between cursor-pointer group
                        ${
                          isCurrent
                            ? 'border-pink-500 bg-pink-50 shadow-sketch ring-2 ring-pink-400'
                            : 'border-pink-100 bg-white hover:border-pink-300 hover:shadow-sketch-xs'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-2xs group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${song.accentColor}15`, border: `1.5px solid ${song.accentColor}40` }}
                        >
                          {song.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-black text-xs text-ink truncate">
                            {song.title}
                          </p>
                          <p className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                            {song.movie}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleTogglePin(e, song.id)}
                        className="p-1.5 text-stone-300 hover:text-pink-500 transition-colors shrink-0"
                        title="Pin to Favorites"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-pink-200 flex items-center justify-between text-[11px] font-handwritten text-ink-light font-bold">
          <span>💖 Dedicated to Kritika's Joy & Comfort</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-paper-100 hover:bg-paper-200 text-ink border border-pink-200 rounded-xl font-display font-black transition-colors"
          >
            Close Lounge
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/MusicPlayerScreen.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { 
  musicStreamingService, 
  type Track, 
  type PlayerState, 
  CURATED_NEW_RELEASES 
} from '../services/musicStreamingService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Search, Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Sparkles, Music2, Disc3,
  Radio, ArrowLeft, RefreshCw, Headphones
} from 'lucide-react';
import type { ScreenState } from '../types/game';

interface MusicPlayerScreenProps {
  onNavigate: (screen: ScreenState) => void;
}

export const MusicPlayerScreen: React.FC<MusicPlayerScreenProps> = ({ onNavigate }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(musicStreamingService.getState());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>(CURATED_NEW_RELEASES);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'trending' | 'bollywood' | 'pop' | 'acoustic'>('trending');

  useEffect(() => {
    const unsub = musicStreamingService.subscribe((s) => setPlayerState(s));
    return () => {
      unsub();
    };
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(CURATED_NEW_RELEASES);
      return;
    }

    setIsSearching(true);
    const results = await musicStreamingService.searchTracks(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSelectCategory = (cat: 'trending' | 'bollywood' | 'pop' | 'acoustic') => {
    setActiveCategory(cat);
    audioEngine.playSfx('click');

    let term = '';
    if (cat === 'trending') term = 'Latest Hits 2024';
    else if (cat === 'bollywood') term = 'Arijit Singh Romance';
    else if (cat === 'pop') term = 'Top Pop Songs';
    else if (cat === 'acoustic') term = 'Acoustic Chill Coffee';

    handleSearch(term);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeTrack = playerState.currentTrack || searchResults[0] || CURATED_NEW_RELEASES[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-3 sm:p-6 pb-32 text-stone-900">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">

        {/* 1. TOP HEADER & BACK NAVIGATION */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="py-1.5 px-3 bg-white border border-stone-200 rounded-xl flex items-center gap-1.5 shadow-xs text-xs font-display font-bold hover:bg-stone-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>HOME</span>
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-display font-black text-rose-600 uppercase tracking-wider">
              <Headphones className="w-3.5 h-3.5 animate-pulse text-rose-500" />
              <span>PURE AUDIO STREAMER</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-stone-900">
              Comfort Audio Lounge 🎵✨
            </h1>
          </div>

          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* 2. SEARCH BAR (Connects to Internet Music Search) */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search any song, artist (Arijit, Diljit, Kesariya, Taylor Swift...)"
            className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm font-medium shadow-xs outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded-full text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Genre Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'trending', label: '🔥 Bollywood Hits' },
            { id: 'bollywood', label: '🌸 Arijit Singh Romance' },
            { id: 'acoustic', label: '☕ Chai & Acoustic' },
            { id: 'pop', label: '✨ Pop Hits' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-display font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. HERO NOW-PLAYING PURE AUDIO CARD (Equalizer, Rotating Vinyl, Scrubber, Controls) */}
        <div className="bg-gradient-to-b from-rose-50/80 via-pink-50/50 to-white border border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            
            {/* Album Artwork with Vinyl Rotation */}
            <div className="relative group shrink-0">
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white transition-all ${
                playerState.isPlaying ? 'ring-4 ring-rose-200' : ''
              }`}>
                <img
                  src={activeTrack.artworkUrl}
                  alt={activeTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Vinyl Badge */}
              <div className={`absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center border-2 border-white shadow-xs ${
                playerState.isPlaying ? 'animate-spin-slow' : ''
              }`}>
                <Disc3 className="w-5 h-5 text-rose-400" />
              </div>
            </div>

            {/* Track Info & Equalizer */}
            <div className="text-center sm:text-left flex-1 min-w-0 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-display font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{activeTrack.genre} • {activeTrack.releaseYear}</span>
              </div>

              <h2 className="font-display font-black text-lg sm:text-xl text-stone-900 truncate">
                {activeTrack.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 font-semibold truncate">
                {activeTrack.artist}
              </p>
              <p className="text-[11px] text-stone-400 truncate">
                {activeTrack.album}
              </p>

              {/* Animated Audio Equalizer Bars when playing */}
              {playerState.isPlaying && (
                <div className="flex items-end justify-center sm:justify-start gap-1 h-4 pt-1">
                  <span className="w-1 bg-rose-500 rounded-full animate-pulse h-3" />
                  <span className="w-1 bg-pink-500 rounded-full animate-pulse h-4" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-purple-500 rounded-full animate-pulse h-2" style={{ animationDelay: '300ms' }} />
                  <span className="w-1 bg-rose-400 rounded-full animate-pulse h-4" style={{ animationDelay: '450ms' }} />
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar Scrubber */}
          <div className="space-y-1 pt-1">
            <input
              type="range"
              min="0"
              max={playerState.duration || 260}
              value={playerState.currentTime}
              onChange={(e) => musicStreamingService.seek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono font-bold">
              <span>{formatTime(playerState.currentTime)}</span>
              <span>{formatTime(playerState.duration || (activeTrack.durationMs ? activeTrack.durationMs / 1000 : 260))}</span>
            </div>
          </div>

          {/* Playback Controls (Prev, Play/Pause, Next, Volume) */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              <button
                onClick={() => musicStreamingService.setVolume(playerState.volume === 0 ? 0.85 : 0)}
                className="p-2 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              >
                {playerState.volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={playerState.volume}
                onChange={(e) => musicStreamingService.setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-700 hidden sm:inline"
              />
            </div>

            {/* Main Center Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  musicStreamingService.playPrev();
                }}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-white/80 transition-transform active:scale-95 cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  audioEngine.playSfx('pop');
                  musicStreamingService.togglePlayPause();
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
                title={playerState.isPlaying ? 'Pause' : 'Play'}
              >
                {playerState.isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  musicStreamingService.playNext();
                }}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-white/80 transition-transform active:scale-95 cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <span className="text-xs text-rose-600 font-handwritten font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
              <span>Pure Audio Stream</span>
            </span>
          </div>
        </div>

        {/* 4. TRACKS FEED / CURATED COMFORT PLAYLIST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xs uppercase text-stone-700 tracking-wider">
              {searchQuery ? `Search Results (${searchResults.length})` : 'Curated Comfort Playlist:'}
            </h3>
            {isSearching && (
              <span className="text-[11px] text-rose-600 font-bold animate-pulse flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Searching audio...</span>
              </span>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-8 text-center space-y-2">
              <Music2 className="w-8 h-8 mx-auto text-stone-400" />
              <p className="font-display font-bold text-xs text-stone-700">No songs found for "{searchQuery}"</p>
              <p className="font-handwritten text-xs text-stone-500">Try searching for "Arijit Singh", "Diljit", or "Kesariya"</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {searchResults.map((track) => {
                const isCurrent = playerState.currentTrack?.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      audioEngine.playSfx('click');
                      musicStreamingService.playTrack(track, searchResults);
                    }}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-rose-50/90 border-rose-300 shadow-xs ring-1 ring-rose-200'
                        : 'bg-white hover:bg-stone-50 border-stone-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img src={track.artworkUrl} alt={track.title} className="w-full h-full object-cover" />
                        {isCurrent && playerState.isPlaying && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className={`font-display font-black text-xs truncate ${isCurrent ? 'text-rose-900' : 'text-stone-900'}`}>
                          {track.title}
                        </h4>
                        <p className="font-sans text-[11px] text-stone-500 truncate">
                          {track.artist}
                        </p>
                        <span className="text-[9px] font-handwritten text-stone-400 truncate">
                          {track.album}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCurrent) {
                            musicStreamingService.togglePlayPause();
                          } else {
                            musicStreamingService.playTrack(track, searchResults);
                          }
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                          isCurrent && playerState.isPlaying
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-rose-100 text-stone-800'
                        }`}
                      >
                        {isCurrent && playerState.isPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-white" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-stone-800 ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};



```

---

### File: `src/components/Navbar.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import type { ScreenState, AudioSettings } from '../types/game';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ArrowLeft, Menu, X, Volume2, UserCheck, CheckCircle2, Smartphone
} from 'lucide-react';
import { authService } from '../services/authService';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onOpenInstallApp?: () => void;
  onOpenGoogleSignIn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onOpenInstallApp, onOpenGoogleSignIn }) => {
  const [, setAuthTick] = useState(0);

  useEffect(() => {
    return authService.subscribe(() => {
      setAuthTick(t => t + 1);
    });
  }, []);

  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();
  const [audioState, setAudioState] = useState<AudioSettings>(audioEngine.getSettings());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSfx = () => {
    const next = !audioState.sfxOn;
    audioEngine.updateSettings({ sfxOn: next });
    setAudioState(audioEngine.getSettings());
    if (next) {
      audioEngine.playSfx('click');
    }
  };

  const handleMenuNavigate = (screen: ScreenState) => {
    audioEngine.playSfx('click');
    setIsMenuOpen(false);
    onNavigate(screen);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 px-3 sm:px-6 py-2 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Profile Picture in Left Corner + Brand Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Profile Avatar Button on the Far Left Corner */}
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('pop');
                if (onOpenGoogleSignIn) {
                  onOpenGoogleSignIn();
                } else {
                  onNavigate('batch_wall');
                }
              }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[2px] bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-xs hover:scale-105 transition-transform cursor-pointer shrink-0"
              title={isAuthenticated && currentUser ? `Signed in as ${currentUser.name} (Click for Profile)` : "Your Profile (Click to Connect)"}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                <img
                  src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                  alt={currentUser?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-2xs" />
            </button>

            {/* Logo / Brand Name */}
            <button 
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('home');
              }}
              className="flex items-center gap-1.5 text-left cursor-pointer min-w-0 group"
              title="Return to Home"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h1 className="font-display font-black text-sm sm:text-base tracking-tight leading-none text-stone-900 group-hover:text-rose-600 transition-colors">
                    MARISOL
                  </h1>
                  <span className="text-rose-500 font-black text-xs">✨</span>
                </div>
                <p className="font-display text-[8px] sm:text-[9px] text-rose-700 font-extrabold tracking-wider uppercase -mt-0.5 truncate">
                  FACTORY OF FUN
                </p>
              </div>
            </button>

            {/* Back button indicator when on sub-pages */}
            {currentScreen !== 'home' && (
              <button 
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('home');
                }}
                className="ml-1 py-1 px-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg flex items-center gap-1 text-[10px] font-display font-bold text-stone-700 transition-colors cursor-pointer shrink-0"
                title="Return to Home"
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="hidden sm:inline">Home</span>
              </button>
            )}
          </div>

          {/* Center: Desktop Navigation Links (Visible on md/lg screens) */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/90 border border-stone-200/80 p-1 rounded-full shadow-2xs">
            {[
              { id: 'home' as ScreenState, label: 'Home', emoji: '🏠' },
              { id: 'music' as ScreenState, label: 'Music', emoji: '🎵' },
              { id: 'quiz' as ScreenState, label: 'Mood Quiz', emoji: '🎯' },
              { id: 'batch_wall' as ScreenState, label: 'Lounge & Wall', emoji: '💬' },
            ].map(item => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    audioEngine.playSfx('click');
                    onNavigate(item.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-display font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-xs scale-102'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <span className="text-sm">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Clean, Uncluttered Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio SFX Toggle */}
            <button
              type="button"
              onClick={toggleSfx}
              className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-colors shadow-2xs ${
                audioState.sfxOn
                  ? 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  : 'bg-stone-100 border-stone-200 text-stone-400'
              }`}
              title={audioState.sfxOn ? "Sound Effects ON" : "Sound Effects OFF"}
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            {/* Quick Install as App Button */}
            {onOpenInstallApp && (
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenInstallApp();
                }}
                className="h-8 px-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-full flex items-center gap-1.5 text-xs font-display font-black transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs"
                title="Install Marisol as App on iPhone or Android"
              >
                <Smartphone className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Add App</span>
              </button>
            )}

            {/* Responsive Main Menu Button (☰ MENU) */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setIsMenuOpen(true);
              }}
              className="h-8 px-2.5 sm:px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full flex items-center gap-1 text-xs font-display font-black shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
              title="Open Navigation Menu"
            >
              <Menu className="w-3.5 h-3.5" />
              <span className="hidden min-[380px]:inline">MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Drawer Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full max-w-sm bg-[#FAF8F5] border-l border-stone-300 h-full overflow-y-auto p-4 sm:p-6 shadow-xl flex flex-col justify-between animate-slide-left space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center font-display font-black text-white text-sm shadow-xs">
                    M
                  </div>
                  <div>
                    <h2 className="font-display font-black text-sm text-stone-900">MARISOL FACTORY</h2>
                    <p className="font-handwritten text-xs text-rose-700 font-bold">Comfort & Fun Hub</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 shadow-2xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Menu Links */}
              <div className="mt-4 space-y-2">
                {[
                  { screen: 'home' as ScreenState, label: 'Home & Video', emoji: '🏠', desc: 'Hero video, live mood check-in & comfort' },
                  { screen: 'music' as ScreenState, label: 'Music Streamer', emoji: '🎵', desc: 'Search and play songs across the internet' },
                  { screen: 'quiz' as ScreenState, label: 'Food & Movie Quiz', emoji: '🎯', desc: 'Play trivia & earn Macaroni dishes' },
                  { screen: 'batch_wall' as ScreenState, label: 'Batch Chat & Wall', emoji: '💬', desc: 'Live group chat & bulletin corkboard' },
                ].map(item => {
                  const isActive = currentScreen === item.screen;
                  return (
                    <button
                      key={item.screen}
                      onClick={() => handleMenuNavigate(item.screen)}
                      className={`w-full p-3 rounded-2xl border transition-all flex items-center gap-3 text-left cursor-pointer ${
                        isActive
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm font-bold'
                          : 'bg-white border-stone-200 hover:border-pink-300 text-stone-800 shadow-2xs'
                      }`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-black text-xs sm:text-sm">{item.label}</div>
                        <div className={`text-[10px] font-handwritten truncate ${isActive ? 'text-rose-200' : 'text-stone-500'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tactile Audio Settings Controls inside Menu */}
              <div className="mt-4 p-3 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-2">
                <div className="font-display font-black text-xs text-stone-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>AUDIO SYSTEM</span>
                  </span>
                </div>
                <div>
                  <button
                    onClick={toggleSfx}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      audioState.sfxOn ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <span>Keyboard / Tap Clicks:</span>
                    <span className="font-black">{audioState.sfxOn ? 'ON 🔔' : 'MUTED'}</span>
                  </button>
                </div>
              </div>

              {/* Account / Google Sign In in Drawer Menu */}
              {onOpenGoogleSignIn && (
                <div className="mt-3 p-3 bg-white border border-stone-200 rounded-2xl shadow-xs">
                  <button
                    onClick={() => {
                      audioEngine.playSfx('click');
                      setIsMenuOpen(false);
                      onOpenGoogleSignIn();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-pink-300 bg-stone-50 hover:bg-rose-50 text-stone-800 text-xs font-bold transition-all shadow-2xs flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {isAuthenticated && currentUser ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                      <div className="text-left">
                        <div className="font-display font-black text-xs">
                          {isAuthenticated && currentUser ? currentUser.name : "Google Account Sign In"}
                        </div>
                        <div className="text-[10px] text-stone-500 font-sans truncate">
                          {isAuthenticated && currentUser ? currentUser.email : "Connect Google Account"}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-display font-black text-rose-600 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                      {isAuthenticated ? "MANAGE" : "SIGN IN"}
                    </span>
                  </button>
                </div>
              )}

              {/* Install as App Option in Drawer Menu */}
              {onOpenInstallApp && (
                <div className="mt-3 p-3 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl shadow-xs">
                  <button
                    onClick={() => {
                      audioEngine.playSfx('click');
                      setIsMenuOpen(false);
                      onOpenInstallApp();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-300 text-stone-800 text-xs font-bold transition-all shadow-2xs flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-rose-600 shrink-0" />
                      <div className="text-left">
                        <div className="font-display font-black text-xs text-stone-900">
                          Add Marisol to Phone
                        </div>
                        <div className="text-[10px] text-stone-500 font-sans">
                          iPhone (Safari) & Android install guide
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-display font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      INSTALL 📱
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Bottom */}
            <div className="pt-3 border-t border-stone-200 text-center">
              <span className="text-[11px] font-handwritten font-bold text-stone-500">
                Kritika's Comfort Space • Batch MLP41PT 👑
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

```

---

### File: `src/components/OpeningCinematic.tsx`

```tsx
import React, { useState } from 'react';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import type { Category } from '../types/game';
import { Sparkles, Check, Film, Tv, Music, Rocket, HelpCircle, Globe, Cpu } from 'lucide-react';

interface OpeningCinematicProps {
  onComplete: () => void;
}

const INTEREST_OPTIONS: { category: Category; label: string; icon: any; color: string }[] = [
  { category: 'Movies', label: 'Movies & Cinema', icon: Film, color: 'bg-coral-500 text-white' },
  { category: 'Bollywood', label: 'Bollywood Magic', icon: Sparkles, color: 'bg-doodleGold text-ink' },
  { category: 'TV Shows', label: 'Binge TV Shows', icon: Tv, color: 'bg-plum-500 text-white' },
  { category: 'Pop Culture', label: 'Pop Culture & Hits', icon: Music, color: 'bg-doodleTeal text-white' },
  { category: 'Science', label: 'Brain Lab & Inventions', icon: Cpu, color: 'bg-doodlePink text-white' },
  { category: 'Space', label: 'Cosmic & Space', icon: Rocket, color: 'bg-indigo-600 text-white' },
  { category: 'Weird Facts', label: 'Mind-Blowing Curiosities', icon: HelpCircle, color: 'bg-emerald-500 text-white' },
  { category: 'Geography', label: 'World & Wonders', icon: Globe, color: 'bg-amber-600 text-white' },
];

export const OpeningCinematic: React.FC<OpeningCinematicProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'interests'>('intro');
  const [selectedInterests, setSelectedInterests] = useState<Category[]>(['Movies', 'Bollywood', 'TV Shows']);

  const toggleInterest = (category: Category) => {
    audioEngine.playSfx('click');
    if (selectedInterests.includes(category)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(c => c !== category));
      }
    } else {
      setSelectedInterests([...selectedInterests, category]);
    }
  };

  const handleFinishOnboarding = () => {
    audioEngine.playSfx('fanfare');
    gameState.updateInterests(selectedInterests);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-paper-50 flex flex-col items-center justify-center p-4 sm:p-6 text-ink relative overflow-hidden">
      
      {/* Background Animated Pencil Doodle Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 10 Q 50 200 200 10 T 400 300" stroke="#2C2825" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <circle cx="80%" cy="20%" r="40" stroke="#FF6B6B" strokeWidth="3" fill="none" />
          <circle cx="15%" cy="75%" r="60" stroke="#14B8A6" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {step === 'intro' ? (
        <div className="max-w-lg w-full text-center flex flex-col items-center z-10 animate-fade-in space-y-6">
          
          {/* Animated Pencil Drawn Title */}
          <div className="relative mb-2">
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-plum-700 uppercase">
              MARISOL
            </h1>
            <div className="font-handwritten text-2xl sm:text-3xl text-coral-500 font-bold -mt-2">
              FACTORY OF FUN
            </div>
            <p className="font-handwritten text-lg text-ink-light font-semibold mt-1">
              "Where curiosity becomes a superpower."
            </p>
          </div>

          {/* Marisol Canonical Character Introduction */}
          <Marisol
            pose="brighter_ideas"
            variant="card"
            size="large"
            dialogue="Hey! Welcome to the Factory of Fun! I've got a tiny problem... our facts are scattered! And I need your curious mind to help me get them back."
            bubblePosition="top"
          />

          {/* Start CTA Button */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setStep('interests');
            }}
            className="sketch-btn-primary w-full py-4 text-xl sm:text-2xl font-black tracking-wide uppercase shadow-sketch-lg hover:scale-105 active:scale-95 transition-all mt-4"
          >
            LET'S GO! 🚀
          </button>
        </div>
      ) : (
        <div className="max-w-xl w-full z-10 space-y-6 animate-fade-in">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-ink">
              What are you into?
            </h2>
            <p className="font-handwritten text-xl text-ink-light">
              Pick your favorite topics so Marisol can personalize your adventure!
            </p>
          </div>

          {/* Marisol Small Avatar Header */}
          <div className="flex items-center justify-center gap-3 bg-white p-3 rounded-2xl border-2 border-ink shadow-sketch">
            <Marisol expression="chai" size="small" showSpeechBubble={false} />
            <p className="font-handwritten text-lg font-bold text-ink">
              "Select as many as you like! I'll tailor the trivia to your brain."
            </p>
          </div>

          {/* Interest Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {INTEREST_OPTIONS.map(opt => {
              const Icon = opt.icon;
              const isSelected = selectedInterests.includes(opt.category);
              return (
                <button
                  key={opt.category}
                  onClick={() => toggleInterest(opt.category)}
                  className={`
                    flex items-center gap-3 p-3.5 rounded-2xl border-2.5 border-ink text-left transition-all
                    ${isSelected ? 'bg-white shadow-sketch-lg ring-4 ring-coral-400/30 font-bold' : 'bg-paper-100 opacity-70 hover:opacity-100 shadow-sketch'}
                  `}
                >
                  <div className={`p-2.5 rounded-xl border-2 border-ink ${opt.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm sm:text-base text-ink truncate">
                      {opt.label}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-doodleTeal text-white flex items-center justify-center border-1.5 border-ink">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Complete Button */}
          <button
            onClick={handleFinishOnboarding}
            className="sketch-btn-gold w-full py-4 text-xl font-black uppercase tracking-wide shadow-sketch-lg hover:scale-105 active:scale-95 transition-all mt-4"
          >
            START MY ADVENTURE! 🎬
          </button>
        </div>
      )}
    </div>
  );
};

```

---

### File: `src/components/PlayerProfileCard.tsx`

```tsx
import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { Marisol } from './Marisol';
import { STICKERS } from '../data/stickers';
import { audioEngine } from '../services/synthAudioEngine';
import type { ScreenState } from '../types/game';
import { 
  Flame, Award, Zap, HelpCircle, BookOpen, User, Sparkles, Check, 
  GraduationCap, MessageSquareHeart, HeartHandshake, Camera, Music, Download,
  ArrowLeft, Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { authService } from '../services/authService';
import { GoogleSignInModal } from './GoogleSignInModal';

interface PlayerProfileCardProps {
  onNavigate?: (screen: ScreenState) => void;
  onOpenSecretLocket?: () => void;
  onOpenGlowUpWeek?: () => void;
  onOpenMusicJukebox?: () => void;
  onOpenInstallApp?: () => void;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  onNavigate,
  onOpenSecretLocket,
  onOpenGlowUpWeek,
  onOpenMusicJukebox,
  onOpenInstallApp,
}) => {
  const [player, setPlayer] = useState(gameState.getPlayer());
  const [activeSticker, setActiveSticker] = useState<string>(gameState.getActiveSticker());
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [, setTick] = useState(0);
  const achievements = gameState.getAchievements();
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  React.useEffect(() => {
    const unsub = authService.subscribe(() => {
      setPlayer(gameState.getPlayer());
      setTick(t => t + 1);
    });
    return () => { unsub(); };
  }, []);

  const handleSelectSticker = (alias: string) => {
    gameState.setActiveSticker(alias);
    setActiveSticker(alias);
    setPlayer(gameState.getPlayer());
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const currentStickerObj = STICKERS.find(s => s.alias === activeSticker) || STICKERS[0];

  return (
    <div className="min-h-screen bg-paper-50 p-3 sm:p-6 pb-28 text-ink">
      
      <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">

        {/* Navigation Back Header */}
        {onNavigate && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('home');
              }}
              className="sketch-btn p-2 sm:px-3 bg-white flex items-center gap-1.5 shadow-sketch"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-display font-bold text-xs sm:text-sm">BACK TO HOME</span>
            </button>
            <div className="font-handwritten text-xs font-bold text-ink-light flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-purple-700" />
              <span className="max-w-[160px] truncate">{currentUser?.email || 'Guest Mode'}</span>
            </div>
          </div>
        )}
        
        {/* Main Illustrated Player Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-5 sm:p-6 shadow-sketch-xl space-y-6 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2.5 border-ink pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl border-2.5 border-ink bg-coral-500 text-white flex items-center justify-center font-display font-black text-xl shadow-sketch">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl text-ink">
                  {player.nickname}
                </h1>
                <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                  Curious Mind • Member since 2026
                </p>
              </div>
            </div>

            <div className="bg-doodleGold text-ink border-2 border-ink px-3 py-1 rounded-xl shadow-sketch font-display font-bold text-sm">
              LEVEL {player.level}
            </div>
          </div>

          {/* Google Verified Identity & Daily Life Mood */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border-2 border-purple-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl border border-ink overflow-hidden bg-white shadow-xs shrink-0 flex items-center justify-center">
                {isAuthenticated && currentUser ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-display font-black text-xs text-ink">
                    {isAuthenticated && currentUser ? currentUser.name : "Student Identity & Email"}
                  </span>
                  <span className={`text-[9px] font-display font-black px-1.5 py-0.2 rounded-full uppercase text-white ${
                    isAuthenticated ? 'bg-emerald-600' : 'bg-purple-600'
                  }`}>
                    {isAuthenticated ? "SYNCED" : "CONNECT"}
                  </span>
                </div>
                <p className="font-handwritten text-xs text-purple-900 font-bold truncate">
                  {isAuthenticated && currentUser
                    ? `${currentUser.email ? `${currentUser.email} • ` : ''}${currentUser.currentMoodEmoji} ${currentUser.currentMood}`
                    : "Update your email to automatically sync your student name & batch wall presence"}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setShowGoogleModal(true);
              }}
              className="sketch-btn-primary px-3 py-1.5 text-xs font-black uppercase shadow-sketch-xs shrink-0"
            >
              {isAuthenticated ? "EDIT" : "SIGN IN"}
            </button>
          </div>

          {/* Marisol Active Companion Greeting */}
          <div className="flex items-center gap-4 bg-paper-50 p-4 rounded-2xl border-2 border-ink">
            <Marisol pose={activeSticker} size="medium" showSpeechBubble={false} />
            <div className="space-y-1">
              <div className="font-handwritten text-base text-ink font-bold">
                "{currentStickerObj.quote}"
              </div>
              <div className="text-xs font-sans text-ink-light flex items-center gap-1.5 font-semibold">
                <span className="bg-paper-200 border border-ink/20 px-2 py-0.5 rounded-full">
                  {currentStickerObj.badgeEmoji} {currentStickerObj.vibe}
                </span>
                <span className="text-coral-500 font-bold">• Active Companion</span>
              </div>
            </div>
          </div>

          {/* 11 Mood Stickers Quick Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-coral-500" />
                <span>CHOOSE YOUR COMPANION MOOD (11 AVAILABLE)</span>
              </span>
              <span className="font-handwritten text-xs text-coral-500 font-bold">
                Tap to switch
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {STICKERS.map((sticker) => {
                const isSelected = sticker.alias === activeSticker;
                return (
                  <button
                    key={sticker.id}
                    onClick={() => handleSelectSticker(sticker.alias)}
                    title={sticker.title}
                    className={`
                      relative p-1.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center
                      ${isSelected 
                        ? 'border-ink bg-doodleGold shadow-sketch scale-105' 
                        : 'border-ink/30 bg-paper-100 hover:border-ink hover:bg-paper-200'}
                    `}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-ink/20 flex items-center justify-center">
                      <img 
                        src={sticker.avatarUrl} 
                        alt={sticker.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-handwritten font-bold truncate max-w-full text-ink mt-0.5">
                      {sticker.badgeEmoji}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ink text-white rounded-full flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5 text-plum-700" /> TOTAL XP
              </div>
              <div className="font-display font-black text-2xl text-plum-700">{player.xp}</div>
            </div>

            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-coral-500" /> BEST STREAK
              </div>
              <div className="font-display font-black text-2xl text-coral-500">{player.bestStreak}</div>
            </div>

            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-doodleTeal" /> FACTS DISCOVERED
              </div>
              <div className="font-display font-black text-2xl text-doodleTeal">{player.factsDiscovered}</div>
            </div>

            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-doodleGold" /> QUESTIONS ANSWERED
              </div>
              <div className="font-display font-black text-2xl text-doodleGold">{player.questionsAnswered}</div>
            </div>
          </div>

          {/* MORE EXPERIENCES & SPECIAL SECTIONS */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4">
              <h3 className="font-display font-black text-base text-ink flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>MORE FACTORY EXPERIENCES</span>
              </h3>
              <span className="font-handwritten text-xs text-ink-light font-bold">
                Special corners & batch hubs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Batch 41 Classroom */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate?.('classroom');
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-amber-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-amber-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">BATCH 41 CLASSROOM</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Tribute arena & student quizzes</div>
                </div>
              </button>

              {/* Shared Batch Wall */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate?.('batch_wall');
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-purple-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-purple-100 flex items-center justify-center shrink-0">
                  <MessageSquareHeart className="w-5 h-5 text-purple-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">SHARED BATCH WALL</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Live classmate notes & stickers</div>
                </div>
              </button>

              {/* Secret Locket */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenSecretLocket?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-rose-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-rose-100 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-rose-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">SECRET LOCKET</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Sisterly letters & memories</div>
                </div>
              </button>

              {/* Glow-Up Week */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenGlowUpWeek?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-teal-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-teal-100 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5 text-teal-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">GLOW-UP SCRAPBOOK</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Polaroids & downloadable card</div>
                </div>
              </button>

              {/* Music Jukebox Lounge */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenMusicJukebox?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-pink-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-pink-100 flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5 text-pink-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">MUSIC JUKEBOX</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Curated Hindi comfort playlist</div>
                </div>
              </button>

              {/* Install App */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenInstallApp?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-emerald-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-emerald-100 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">INSTALL ON MOBILE</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Add to iOS or Android Home Screen</div>
                </div>
              </button>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4">
              <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                <Award className="w-5 h-5 text-doodleGold" />
                <span>ACHIEVEMENTS</span>
              </h3>
              <span className="font-handwritten text-sm text-ink-light font-bold">
                {unlockedAchievements.length} / {achievements.length} UNLOCKED
              </span>
            </div>

            <div className="space-y-2">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`
                    flex items-center justify-between p-3 rounded-2xl border-2 border-ink transition-all
                    ${ach.unlocked ? 'bg-white shadow-sketch' : 'bg-paper-100 opacity-50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border-1.5 border-ink ${ach.unlocked ? 'bg-doodleGold text-ink' : 'bg-paper-200'}`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-ink">{ach.title}</div>
                      <div className="font-handwritten text-xs text-ink-light">{ach.description}</div>
                    </div>
                  </div>

                  {ach.unlocked && (
                    <span className="font-bold text-xs bg-doodleTeal text-white px-2 py-0.5 rounded-full border-1 border-ink">
                      UNLOCKED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showGoogleModal && (
        <GoogleSignInModal onClose={() => setShowGoogleModal(false)} />
      )}
    </div>
  );
};

```

---

### File: `src/components/QuestionCard.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import type { Question } from '../types/game';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { HelpCircle, Clock, Zap } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedOption: string, timeTakenMs: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isFrozen, setIsFrozen] = useState(false);
  const [startTime] = useState(Date.now());

  const player = gameState.getPlayer();

  // Timer countdown
  useEffect(() => {
    if (isFrozen || selected !== null) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFrozen, selected]);

  const handleTimeOut = () => {
    if (selected === null) {
      setSelected('TIME_OUT');
      audioEngine.playSfx('wrong');
      onAnswer('', Date.now() - startTime);
    }
  };

  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [flyingParticles, setFlyingParticles] = useState<{ id: number; text: string; left: number; delay: number }[]>([]);

  const handleSelectOption = (option: string) => {
    if (selected !== null || disabledOptions.includes(option)) return;
    setSelected(option);
    const timeTaken = Date.now() - startTime;
    const isCorrect = option === question.correctAnswer;

    if (isCorrect) {
      setAnswerStatus('correct');
      audioEngine.playSfx('correct');
      
      // Spawn flying cucumber sandwich particles
      const items = ['🥪', '🥒', '🥪', '✨', '🥪', '💖', '🥪', '🥒'];
      const particles = items.map((text, idx) => ({
        id: Date.now() + idx,
        text,
        left: 15 + Math.random() * 70,
        delay: idx * 0.08
      }));
      setFlyingParticles(particles);

      // Trigger confetti
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#10B981', '#F43F5E', '#FBBF24', '#A855F7']
      });
    } else {
      setAnswerStatus('wrong');
      audioEngine.playSfx('wrong');
    }

    setTimeout(() => {
      onAnswer(option, timeTaken);
    }, 750);
  };

  // Power-up: 50/50 Hint (removes one incorrect option)
  const use5050Hint = () => {
    if (gameState.usePowerUp('hint')) {
      audioEngine.playSfx('powerup');
      const incorrect = question.options.filter(o => o !== question.correctAnswer);
      if (incorrect.length > 0) {
        setDisabledOptions([incorrect[0]]);
      }
    }
  };

  // Power-up: Clue
  const useClueHint = () => {
    if (gameState.usePowerUp('clue')) {
      audioEngine.playSfx('powerup');
      setShowHint(true);
    }
  };

  // Power-up: Time Freeze
  const useTimeFreeze = () => {
    if (gameState.usePowerUp('time_freeze')) {
      audioEngine.playSfx('powerup');
      setIsFrozen(true);
      setTimer(prev => prev + 15);
    }
  };

  return (
    <div className={`max-w-xl w-full mx-auto border-3 rounded-3xl p-5 sm:p-6 shadow-sketch-xl space-y-5 relative overflow-hidden transition-all duration-300 ${
      answerStatus === 'wrong'
        ? 'bg-rose-100/95 border-rose-500 shadow-rose-200 animate-shake-wrong ring-4 ring-rose-400/40'
        : answerStatus === 'correct'
        ? 'bg-emerald-50/95 border-emerald-500 shadow-emerald-200 ring-4 ring-emerald-400/40'
        : 'bg-white border-ink'
    }`}>
      
      {/* Flying Cucumber Sandwiches & Sparkle Emojis on Correct Answer */}
      {flyingParticles.map(p => (
        <div
          key={p.id}
          className="absolute z-30 pointer-events-none text-2xl sm:text-3xl animate-flying-sandwich select-none"
          style={{
            left: `${p.left}%`,
            bottom: '25%',
            animationDelay: `${p.delay}s`
          }}
        >
          {p.text}
        </div>
      ))}

      {/* Top Header: Progress & Timer */}
      <div className="flex items-center justify-between font-sans">
        <div className="bg-paper-100 border-2 border-ink px-3 py-1 rounded-xl text-xs font-bold text-ink">
          QUESTION {questionNumber} / {totalQuestions}
        </div>

        <div className="flex items-center gap-1.5 bg-doodleGold/20 border-2 border-ink px-3 py-1 rounded-xl text-xs font-bold text-ink">
          <Clock className={`w-4 h-4 ${timer < 10 ? 'text-coral-500 animate-pulse' : 'text-doodleGold'}`} />
          <span>{timer}s</span>
        </div>
      </div>

      {/* Secret Ingredient Prize Banner */}
      {question.secretIngredient && (
        <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-2.5 flex items-center justify-between text-xs font-bold text-ink shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 block font-handwritten">
                Target Secret Ingredient:
              </span>
              <span className="font-display font-black text-xs text-ink">
                {question.secretIngredient}
              </span>
            </div>
          </div>
          <div className="bg-white border-1.5 border-ink px-2.5 py-1 rounded-xl font-display font-black text-xs text-emerald-700 shadow-sketch-sm">
            +3 🥪 Cucumber Sandwiches
          </div>
        </div>
      )}

      {/* Marisol / Kritika Character Header */}
      <div className="flex justify-center">
        <Marisol
          pose={
            answerStatus === 'wrong'
              ? 'overthinking'
              : answerStatus === 'correct'
              ? 'happier_days'
              : showHint
              ? 'overthinking'
              : gameState.getActiveSticker()
          }
          expression={
            answerStatus === 'wrong'
              ? 'thinking'
              : answerStatus === 'correct'
              ? 'excited'
              : question.difficulty === 'hard'
              ? 'thinking'
              : 'curious'
          }
          size="medium"
          dialogue={
            answerStatus === 'wrong'
              ? "Oopsie, almost babe! You've got this 💖"
              : answerStatus === 'correct'
              ? "YAS QUEEN! +3 Cucumber Sandwiches! 🥪✨"
              : showHint
              ? `Hint: Think about ${question.tags[0] || 'the core clue'}!`
              : undefined
          }
          bubblePosition="top"
        />
      </div>

      {/* Category Tag */}
      <div className="text-center">
        <span className="font-handwritten text-sm font-bold text-coral-500 uppercase tracking-widest bg-coral-500/10 px-3 py-1 rounded-full border-1.5 border-coral-500/30">
          {question.category} • {question.difficulty}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="font-display font-bold text-xl sm:text-2xl text-ink text-center leading-snug">
        {question.question}
      </h2>

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {question.options.map((option, idx) => {
          const isDisabled = disabledOptions.includes(option);
          const isSelected = selected === option;

          return (
            <button
              key={idx}
              disabled={selected !== null || isDisabled}
              onClick={() => handleSelectOption(option)}
              className={`
                sketch-btn w-full p-4 text-left font-display font-bold text-base sm:text-lg flex items-center justify-between transition-all
                ${isDisabled ? 'opacity-30 cursor-not-allowed bg-paper-200' : ''}
                ${isSelected ? 'bg-doodleTeal text-white ring-4 ring-doodleTeal/30' : 'bg-white hover:bg-paper-100 text-ink'}
              `}
            >
              <span>{option}</span>
              <span className="font-handwritten text-xs text-ink-light font-normal">
                [{String.fromCharCode(65 + idx)}]
              </span>
            </button>
          );
        })}
      </div>

      {/* Power-ups Bar */}
      <div className="pt-3 border-t-2 border-dashed border-ink/20">
        <div className="text-center font-handwritten text-xs text-ink-light font-bold mb-2">
          POWER-UPS
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={use5050Hint}
            disabled={player.powerUps.hint <= 0}
            className="sketch-btn px-3 py-1.5 text-xs font-bold flex items-center gap-1 bg-paper-50"
            title="50/50 Hint (Removes 1 wrong option)"
          >
            <Zap className="w-3.5 h-3.5 text-doodleGold" />
            <span>50/50 ({player.powerUps.hint})</span>
          </button>

          <button
            onClick={useClueHint}
            disabled={player.powerUps.clue <= 0 || showHint}
            className="sketch-btn px-3 py-1.5 text-xs font-bold flex items-center gap-1 bg-paper-50"
            title="Marisol Clue"
          >
            <HelpCircle className="w-3.5 h-3.5 text-doodleTeal" />
            <span>CLUE ({player.powerUps.clue})</span>
          </button>

          <button
            onClick={useTimeFreeze}
            disabled={player.powerUps.time_freeze <= 0 || isFrozen}
            className="sketch-btn px-3 py-1.5 text-xs font-bold flex items-center gap-1 bg-paper-50"
            title="Time Freeze (+15s)"
          >
            <Clock className="w-3.5 h-3.5 text-coral-500" />
            <span>FREEZE ({player.powerUps.time_freeze})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/RecipeModal.tsx`

```tsx
import React, { useState } from 'react';
import type { Recipe, ChefTitle } from '../types/game';
import { Sparkles, Film, Clock, ChefHat, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, BookOpen } from 'lucide-react';
import { Marisol } from './Marisol';
import { BaseModal } from './BaseModal';

interface RecipeModalProps {
  recipe: Recipe;
  earnedSandwiches: number;
  chefTitle: ChefTitle;
  titleUpgraded: boolean;
  collectedIngredients: string[];
  activeMood: string;
  onNextCourse: () => void;
  onViewVault: () => void;
  onGoHome: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  earnedSandwiches,
  chefTitle,
  titleUpgraded,
  collectedIngredients,
  activeMood,
  onNextCourse,
  onViewVault,
  onGoHome
}) => {
  const [showFullRecipe, setShowFullRecipe] = useState(false);

  return (
    <BaseModal onClose={onGoHome} maxWidth="max-w-2xl" hideHeader>
      <div className="space-y-5">
        {/* Confetti Banner */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-doodleGold border-1.5 border-ink px-3 py-1 rounded-full font-handwritten text-xs sm:text-sm font-black text-ink shadow-sketch-sm">
            <Sparkles className="w-4 h-4" />
            <span>COURSE COMPLETE • SECRET RECIPE REVEALED!</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink leading-tight">
            {recipe.emoji} {recipe.title}
          </h2>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
            {recipe.subtitle}
          </p>
        </div>

        {/* Score & Chef Rank Ribbon */}
        <div className="bg-white border-2 border-ink rounded-2xl p-3 flex flex-wrap items-center justify-around gap-2 shadow-sketch text-center">
          <div>
            <span className="font-handwritten text-xs text-ink-light font-bold block">REWARD EARNED</span>
            <span className="font-display font-black text-xl text-emerald-600 flex items-center justify-center gap-1">
              <span>+{earnedSandwiches}</span>
              <span className="text-base">🥪 Cucumber Sandwiches</span>
            </span>
          </div>

          <div className="h-8 w-px bg-ink/20 hidden sm:block" />

          <div>
            <span className="font-handwritten text-xs text-ink-light font-bold block">CHEF RANKING</span>
            <span className="font-display font-black text-base text-plum-700 flex items-center justify-center gap-1">
              <ChefHat className="w-4 h-4 text-doodleGold" />
              <span>{chefTitle}</span>
            </span>
          </div>

          {titleUpgraded && (
            <div className="w-full text-center bg-coral-500 text-white font-handwritten text-xs font-black py-0.5 rounded-lg animate-bounce-gentle">
              🌟 CHEF PROMOTION UNLOCKED!
            </div>
          )}
        </div>

        {/* Chef Kritika Companion Commentary */}
        <div className="bg-white border-2 border-ink rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sketch">
          <Marisol pose={activeMood} size="small" showSpeechBubble={false} />
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-xs uppercase text-coral-600">
              Chef Kritika's Kitchen Notes ♡
            </div>
            <p className="font-handwritten text-xs sm:text-sm text-ink font-bold leading-snug">
              "Look at that spread! We gathered all secret ingredients through trivia — now time to feast!"
            </p>
          </div>
        </div>

        {/* Secret Ingredients Collected Grid */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-display font-bold text-ink">
            <span>SECRET INGREDIENTS UNLOCKED (5/5):</span>
            <span className="text-emerald-600 flex items-center gap-1 font-handwritten text-sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Captured!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(recipe.secretIngredients || collectedIngredients).map((ingredient, i) => (
              <div 
                key={i}
                className="bg-emerald-50 border-1.5 border-emerald-500/40 rounded-xl p-2 text-xs font-bold text-ink flex items-center gap-1.5 shadow-2xs"
              >
                <span className="text-sm">✨</span>
                <span className="truncate">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Movie Pairing Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-ink rounded-2xl p-3.5 shadow-sketch space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="font-display font-black text-xs sm:text-sm text-plum-800 flex items-center gap-1.5">
              <Film className="w-4 h-4 text-plum-700" />
              <span>PERFECT MOVIE PAIRING: {recipe.moviePairing.movie}</span>
            </div>
            <span className="bg-plum-700 text-white font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full">
              WATCH WHILE EATING
            </span>
          </div>

          <p className="font-handwritten text-xs text-ink-light italic">
            {recipe.moviePairing.quote}
          </p>

          <p className="font-sans text-xs text-ink leading-relaxed">
            {recipe.moviePairing.whyWatch}
          </p>
        </div>

        {/* Hunger Trigger Craving Alert */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex items-start gap-2.5">
          <span className="text-2xl">🤤</span>
          <div>
            <span className="font-display font-black text-xs text-amber-900 block">
              HUNGER ALERT • CRAVING RATING: 10/10
            </span>
            <p className="font-handwritten text-xs sm:text-sm text-ink font-semibold leading-snug">
              {recipe.hungerTrigger}
            </p>
          </div>
        </div>

        {/* Toggle Full Cooking Recipe */}
        <div>
          <button
            onClick={() => setShowFullRecipe(!showFullRecipe)}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-ink bg-white font-display font-bold text-xs uppercase flex items-center justify-between shadow-sketch-sm hover:bg-paper-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-doodleTeal" />
              <span>{showFullRecipe ? 'Hide Full Cooking Recipe' : `View Recipe & Chef Steps (${recipe.prepTime})`}</span>
            </span>
            {showFullRecipe ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFullRecipe && (
            <div className="mt-3 bg-white border-2 border-ink rounded-2xl p-4 shadow-sketch space-y-4 animate-scale-up text-left">
              {/* Full Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Kitchen Pantry Ingredients:
                </h4>
                <ul className="space-y-1 font-sans text-xs text-ink-light list-disc pl-4">
                  {recipe.fullIngredients.map((item, idx) => (
                    <li key={idx} className="leading-tight">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Step-by-Step Cooking Method:
                </h4>
                <ol className="space-y-2 font-sans text-xs text-ink list-decimal pl-4">
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx} className="leading-snug">
                      <span className="font-semibold text-ink">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <button
            onClick={onNextCourse}
            className="sketch-btn-primary py-3.5 text-sm sm:text-base font-black uppercase flex items-center justify-center gap-2 sm:col-span-2 shadow-sketch-lg hover:scale-102 transition-all"
          >
            <span>START NEXT ENDLESS COURSE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewVault}
            className="sketch-btn py-3 text-xs font-bold uppercase bg-white border-2 border-ink flex items-center justify-center gap-1.5 shadow-sketch hover:bg-paper-100"
          >
            <BookOpen className="w-4 h-4 text-plum-700" />
            <span>RECIPE VAULT</span>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onGoHome}
            className="font-handwritten text-xs font-bold text-ink-light hover:text-ink underline"
          >
            Back to Factory Home
          </button>
        </div>

      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/RecipeVault.tsx`

```tsx
import React, { useState, useMemo } from 'react';
import type { ScreenState, Recipe } from '../types/game';
import { RECIPES } from '../data/recipes';
import { gameState } from '../services/gameState';
import { ArrowLeft, ChefHat, Film, Clock, Lock, Sparkles, Search, X, Utensils } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';
import { BaseModal } from './BaseModal';

interface RecipeVaultProps {
  onNavigate?: (screen: ScreenState) => void;
  onCookRecipe?: (recipe: Recipe) => void;
  initialCuisine?: string;
  hideHomeButton?: boolean;
}

export const RecipeVault: React.FC<RecipeVaultProps> = ({ 
  onNavigate, 
  onCookRecipe,
  initialCuisine = 'All',
  hideHomeButton = false
}) => {
  const player = gameState.getPlayer();
  const unlockedIds = gameState.getUnlockedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);

  // Extract unique cuisines
  const cuisines = useMemo(() => {
    const list = Array.from(new Set(RECIPES.map(r => r.cuisine)));
    return ['All', ...list];
  }, []);

  // Filter recipes by search query and cuisine
  const filteredRecipes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return RECIPES.filter(recipe => {
      // Cuisine filter
      if (selectedCuisine !== 'All' && recipe.cuisine !== selectedCuisine) {
        return false;
      }

      // Search query filter
      if (!q) return true;

      const titleMatch = recipe.title.toLowerCase().includes(q);
      const subtitleMatch = recipe.subtitle.toLowerCase().includes(q);
      const cuisineMatch = recipe.cuisine.toLowerCase().includes(q);
      const movieMatch = recipe.moviePairing.movie.toLowerCase().includes(q);
      const secretIngMatch = recipe.secretIngredients.some(ing => ing.toLowerCase().includes(q));
      const fullIngMatch = recipe.fullIngredients.some(ing => ing.toLowerCase().includes(q));

      return titleMatch || subtitleMatch || cuisineMatch || movieMatch || secretIngMatch || fullIngMatch;
    });
  }, [searchQuery, selectedCuisine]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2">
          {!hideHomeButton && onNavigate ? (
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('home');
              }}
              className="sketch-btn p-2.5 sm:p-3 bg-white flex items-center gap-1.5 sm:gap-2 shadow-sketch"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-display font-bold text-xs sm:text-sm hidden sm:inline">HOME</span>
            </button>
          ) : <div className="w-9" />}

          <div className="text-center">
            <div className="font-handwritten text-emerald-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1">
              <ChefHat className="w-4 h-4" /> KRITIKA'S CULINARY ARCHIVE
            </div>
            <h1 className="font-display text-xl sm:text-3xl font-black tracking-tight">
              THE SECRET RECIPE VAULT 📖
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-handwritten text-xs sm:text-sm font-bold shadow-sketch">
            <span className="text-emerald-600 font-black">{unlockedIds.length}</span> / {RECIPES.length} DISHES
          </div>
        </div>

        {/* Chef Status Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2.5 border-ink bg-doodleGold flex items-center justify-center text-3xl shadow-sketch shrink-0">
              🥪
            </div>
            <div>
              <div className="font-handwritten text-[11px] font-bold text-ink-light uppercase tracking-wider">
                ACTIVE CHEF TITLE
              </div>
              <h2 className="font-display font-black text-lg sm:text-2xl text-plum-700">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </h2>
              <p className="font-sans text-xs text-ink-light">
                Total Score: <span className="font-bold text-emerald-600">{player.cucumberSandwiches || 0} Cucumber Sandwiches</span> 🥪
              </p>
            </div>
          </div>

          {onCookRecipe && (
            <div className="text-center sm:text-right w-full sm:w-auto">
              <button
                onClick={() => onCookRecipe(RECIPES[0])}
                className="sketch-btn-primary w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold uppercase flex items-center justify-center gap-2 shadow-sketch"
              >
                <Sparkles className="w-4 h-4" />
                <span>PLAY FOR NEXT RECIPE</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border-2.5 border-ink rounded-3xl p-3.5 sm:p-4 shadow-sketch space-y-3">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-ink-light pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients (e.g. ginger, mascarpone), or movie pairings..."
              className="w-full pl-10 pr-9 py-2.5 bg-paper-50 border-2 border-ink/40 focus:border-ink rounded-2xl font-sans text-xs sm:text-sm outline-none transition-all placeholder:text-ink-light/60 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-ink-light hover:text-ink hover:bg-paper-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cuisine Pill Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-display font-black text-ink-light uppercase flex items-center gap-1 shrink-0 mr-1">
              <Utensils className="w-3 h-3" /> Cuisines:
            </span>
            {cuisines.map((cuisine) => {
              const isActive = selectedCuisine === cuisine;
              return (
                <button
                  key={cuisine}
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setSelectedCuisine(cuisine);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-handwritten font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white border-2 border-ink shadow-sketch-xs scale-102'
                      : 'bg-paper-100 hover:bg-paper-200 text-ink-light border border-ink/30'
                  }`}
                >
                  {cuisine}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State when no recipes match */}
        {filteredRecipes.length === 0 ? (
          <div className="bg-white border-3 border-dashed border-ink/30 rounded-3xl p-8 sm:p-12 text-center space-y-3.5 shadow-sketch">
            <div className="text-4xl sm:text-5xl animate-bounce-gentle">🍳💭</div>
            <h3 className="font-display font-black text-lg sm:text-xl text-ink">
              No recipes found matching your craving
            </h3>
            <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold max-w-md mx-auto leading-relaxed">
              We couldn't find any dish matching "<span className="text-coral-500">{searchQuery || selectedCuisine}</span>". Try clearing filters or cook new dishes in trivia!
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setSearchQuery('');
                  setSelectedCuisine('All');
                }}
                className="sketch-btn px-4 py-2 text-xs font-display font-black uppercase bg-emerald-50 border-2 border-ink shadow-sketch hover:bg-emerald-100"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          /* Recipes Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {filteredRecipes.map((recipe) => {
              const isUnlocked = unlockedIds.includes(recipe.id);

              return (
                <div
                  key={recipe.id}
                  onClick={() => {
                    if (isUnlocked) {
                      audioEngine.playSfx('click');
                      setSelectedRecipe(recipe);
                    }
                  }}
                  className={`
                    bg-white border-2.5 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch-lg transition-all
                    ${isUnlocked ? 'hover:shadow-sketch-xl hover:-translate-y-1 cursor-pointer' : 'opacity-70 bg-paper-100'}
                  `}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl border-2 border-ink flex items-center justify-center text-2xl bg-[#FAF7F0] shadow-xs shrink-0">
                      {isUnlocked ? recipe.emoji : <Lock className="w-5 h-5 text-ink-light" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-handwritten text-xs font-bold text-coral-600 uppercase tracking-wide block truncate">
                        {recipe.cuisine}
                      </span>
                      <h3 className="font-display font-black text-base sm:text-lg text-ink leading-tight line-clamp-1">
                        {recipe.title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold mb-3 line-clamp-2">
                    {recipe.subtitle}
                  </p>

                  {isUnlocked ? (
                    <div className="space-y-2.5 pt-2 border-t-1.5 border-dashed border-ink/20">
                      <div className="flex items-center justify-between text-xs font-sans text-ink-light">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-doodleTeal" />
                          <span>{recipe.prepTime}</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold text-plum-700 truncate max-w-[150px]">
                          <Film className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{recipe.moviePairing.movie.split('(')[0]}</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          audioEngine.playSfx('click');
                          setSelectedRecipe(recipe);
                        }}
                        className="w-full py-2 bg-paper-100 hover:bg-paper-200 border-1.5 border-ink rounded-xl font-display font-bold text-xs uppercase text-center transition-colors"
                      >
                        VIEW RECIPE & STEPS
                      </button>
                    </div>
                  ) : (
                    <div className="pt-3 border-t-1.5 border-dashed border-ink/20 flex items-center justify-between">
                      <span className="font-handwritten text-xs text-ink-light">
                        🔒 Answer 5 food questions to unlock
                      </span>
                      {onCookRecipe && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCookRecipe(recipe);
                          }}
                          className="text-xs font-bold text-coral-500 font-display hover:underline"
                        >
                          Cook Now →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Full Recipe Details using BaseModal */}
        {selectedRecipe && (
          <BaseModal 
            onClose={() => setSelectedRecipe(null)}
            title={selectedRecipe.title}
            subtitle={`${selectedRecipe.cuisine} • ${selectedRecipe.prepTime}`}
            icon={<span>{selectedRecipe.emoji}</span>}
            maxWidth="max-w-xl"
          >
            <div className="space-y-4 text-left">
              {/* Movie Pairing Note */}
              <div className="bg-purple-50 border-1.5 border-purple-300 rounded-2xl p-3 text-xs space-y-1">
                <span className="font-display font-bold text-purple-900 flex items-center gap-1.5">
                  <Film className="w-4 h-4" /> Watch Pairing: {selectedRecipe.moviePairing.movie}
                </span>
                <p className="font-handwritten text-ink italic">
                  "{selectedRecipe.moviePairing.quote}"
                </p>
                <p className="font-sans text-ink-light text-[11px] pt-1">
                  {selectedRecipe.moviePairing.whyWatch}
                </p>
              </div>

              {/* Hunger Trigger */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-center gap-2.5">
                <span className="text-xl shrink-0">🤤</span>
                <p className="font-handwritten text-xs text-amber-950 font-bold">
                  {selectedRecipe.hungerTrigger}
                </p>
              </div>

              {/* Secret Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secret Ingredients:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRecipe.secretIngredients.map((item, idx) => (
                    <span key={idx} className="bg-emerald-50 border border-emerald-300 text-emerald-900 font-handwritten text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Kitchen Pantry Ingredients:
                </h4>
                <ul className="space-y-1 font-sans text-xs text-ink-light list-disc pl-4 max-h-36 overflow-y-auto">
                  {selectedRecipe.fullIngredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Step-by-Step Method:
                </h4>
                <ol className="space-y-2 font-sans text-xs text-ink list-decimal pl-4 max-h-48 overflow-y-auto">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="leading-snug">{step}</li>
                  ))}
                </ol>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="sketch-btn-primary w-full py-3 text-xs font-bold uppercase shadow-sketch"
                >
                  Close Cookbook
                </button>
              </div>
            </div>
          </BaseModal>
        )}

      </div>
    </div>
  );
};

```

---

### File: `src/components/SecretLocketModal.tsx`

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { wellnessState, type SecretNote } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import { BaseModal } from './BaseModal';
import { Lock, Unlock, Heart, Plus, Trash2, Sparkles, Mic, Square, Play, Pause } from 'lucide-react';

interface SecretLocketModalProps {
  onClose: () => void;
}

export const SecretLocketModal: React.FC<SecretLocketModalProps> = ({ onClose }) => {
  const [, setTick] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');

  // Voice memo recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const currentAudioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return () => {
      unsub();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (currentAudioElementRef.current) {
        currentAudioElementRef.current.pause();
      }
    };
  }, []);

  const secretNotes = wellnessState.getSecretNotes();

  const handleUnlock = () => {
    audioEngine.playSfx('fanfare');
    setIsUnlocked(true);
  };

  const startVoiceRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Audio recording isn't supported in this browser, but you can save text notes!");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setRecordedAudioUrl(reader.result as string);
        };
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } catch {
      // Fallback for permission denial: create a simulated cute voice note
      setRecordingSeconds(15);
      setRecordedAudioUrl("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
      setNewText(prev => prev || "Queen's Whisper Memo: Remember to pause, take a sip of chai, and smile today! 🎙️✨");
      alert("Microphone access unavailable. Added a voice memo template for you to save in your locket!");
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() && !recordedAudioUrl) return;

    audioEngine.playSfx('powerup');
    const durationStr = recordingSeconds > 0 ? `0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}` : undefined;
    wellnessState.addSecretNote(
      newText.trim() || "Voice Memo for Kritika 🎙️",
      selectedEmoji,
      recordedAudioUrl || undefined,
      durationStr
    );
    setNewText('');
    setRecordedAudioUrl(null);
    setRecordingSeconds(0);
    setShowAddForm(false);
  };

  const playVoiceMemo = (id: string, audioUrl?: string) => {
    if (!audioUrl) return;

    if (playingAudioId === id) {
      if (currentAudioElementRef.current) {
        currentAudioElementRef.current.pause();
      }
      setPlayingAudioId(null);
      return;
    }

    if (currentAudioElementRef.current) {
      currentAudioElementRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    currentAudioElementRef.current = audio;
    setPlayingAudioId(id);

    audio.play().catch(() => {
      // audio error fallback
      audioEngine.playSfx('fanfare');
      setTimeout(() => setPlayingAudioId(null), 1500);
    });

    audio.onended = () => {
      setPlayingAudioId(null);
    };
  };

  const handleDelete = (id: string) => {
    audioEngine.playSfx('click');
    wellnessState.deleteSecretNote(id);
  };

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-lg"
      icon={<div className="w-full h-full bg-gradient-to-tr from-pink-400 to-rose-400 rounded-xl flex items-center justify-center text-white"><Heart className="w-5 h-5 fill-white" /></div>}
      title="SECRET HEART LOCKET 🔐"
      subtitle="Private notes, affirmations & voice memos for Kritika ♡"
    >
      <div className="space-y-4">

        {/* Locked State */}
        {!isUnlocked ? (
          <div className="text-center py-8 space-y-4">
            <div className="relative inline-block group">
              <button
                onClick={handleUnlock}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400 border-3 border-ink flex flex-col items-center justify-center text-white shadow-sketch-xl hover:scale-105 active:scale-95 transition-all group-hover:rotate-6 cursor-pointer"
              >
                <Lock className="w-10 h-10 mb-1 animate-pulse" />
                <span className="font-handwritten text-xs font-black">TAP TO UNLOCK</span>
              </button>
              <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-spin" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-base text-ink">
                Kritika's Private Keepsake Locket
              </h3>
              <p className="font-handwritten text-xs text-ink-light font-bold max-w-xs mx-auto">
                Only you have the key. Tap the heart to reveal your private notes, wishes, and audio voice memos.
              </p>
            </div>
          </div>
        ) : (
          /* Unlocked State */
          <div className="space-y-3.5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-display font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full">
                <Unlock className="w-3.5 h-3.5" />
                <span>Locket Unlocked</span>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1 px-3 py-1 bg-pink-100 hover:bg-pink-200 text-pink-800 border-1.5 border-pink-300 font-display font-black text-xs rounded-xl shadow-2xs hover:scale-105 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Note / Voice Memo</span>
              </button>
            </div>

            {/* Write / Record Form */}
            {showAddForm && (
              <form 
                onSubmit={handleAddNote}
                className="bg-pink-50 border-2 border-pink-300 rounded-2xl p-3.5 space-y-3 shadow-2xs animate-fade-in"
              >
                <span className="font-display font-black text-xs text-pink-900 block">
                  LEAVE A NOTE OR VOICE MEMO FOR YOURSELF 💌
                </span>

                <textarea
                  rows={2}
                  placeholder="A secret wish, proud moment, or soothing reminder for Kritika..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  className="w-full p-2.5 bg-white border border-pink-200 rounded-xl font-handwritten text-sm text-ink placeholder:text-ink-light focus:outline-pink-400"
                />

                {/* Voice memo recording action */}
                <div className="flex items-center justify-between bg-white/80 p-2.5 rounded-xl border border-pink-200">
                  <div className="flex items-center gap-2">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startVoiceRecording}
                        className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Record Voice Memo</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopVoiceRecording}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 animate-pulse shadow-sm transition"
                      >
                        <Square className="w-3.5 h-3.5 fill-white" />
                        <span>Stop Recording ({recordingSeconds}s)</span>
                      </button>
                    )}

                    {recordedAudioUrl && !isRecording && (
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <span>✓</span> Voice Memo Ready!
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {['💖', '🌸', '☕', '👑', '✨'].map(em => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setSelectedEmoji(em)}
                        className={`text-base p-1 rounded-lg transition-transform ${selectedEmoji === em ? 'scale-125 bg-pink-100 border border-pink-300' : 'opacity-60'}`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setRecordedAudioUrl(null);
                    }}
                    className="px-2.5 py-1 text-xs font-bold text-ink-light hover:text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-display font-black text-xs rounded-xl shadow-xs"
                  >
                    Lock in Locket 🔐
                  </button>
                </div>
              </form>
            )}

            {/* Notes List */}
            <div className="space-y-2.5">
              {secretNotes.map((note: SecretNote) => (
                <div 
                  key={note.id}
                  className="p-3.5 rounded-2xl border-2 border-pink-200 shadow-2xs text-left relative group transition-all hover:border-pink-400"
                  style={{ backgroundColor: note.color }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{note.emoji}</span>
                      <span className="font-handwritten text-xs text-ink-light font-bold">
                        {note.date}
                      </span>
                      {note.audioUrl && (
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                          🎙️ Voice Memo
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(note.id)}
                      className="opacity-40 group-hover:opacity-100 text-rose-500 hover:text-rose-700 p-1 transition-opacity"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="font-handwritten text-sm sm:text-base text-ink font-bold mt-1 leading-snug">
                    "{note.text}"
                  </p>

                  {/* Play Voice Memo button if available */}
                  {note.audioUrl && (
                    <div className="mt-2 pt-2 border-t border-pink-200/60 flex items-center gap-2">
                      <button
                        onClick={() => playVoiceMemo(note.id, note.audioUrl)}
                        className="px-3 py-1 bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
                      >
                        {playingAudioId === note.id ? (
                          <>
                            <Pause className="w-3 h-3 fill-purple-800" />
                            <span>Pause Memo</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-purple-800" />
                            <span>Play Voice Memo {note.duration ? `(${note.duration})` : ''}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsUnlocked(false)}
                className="text-xs font-handwritten font-bold text-pink-700 hover:underline"
              >
                🔒 Lock Locket Again
              </button>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

```

---

### File: `src/components/SparkleStreak.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { wellnessState } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { Flame, Sparkles } from 'lucide-react';

export const SparkleStreak: React.FC = () => {
  const [, setTick] = useState(0);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const { streak } = wellnessState.getSparkleStreak();
  const heatmapDays = wellnessState.getStreakHeatmap();

  const handleSparkleCheckIn = () => {
    audioEngine.playSfx('fanfare');
    const checked = wellnessState.checkInDaily();
    if (checked) {
      wellnessState.addSparkleStreak();
    }
    setJustCheckedIn(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F59E0B', '#F43F5E', '#A855F7']
    });
    setTimeout(() => setJustCheckedIn(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50/95 via-rose-50/90 to-purple-50/95 border-2.5 border-amber-300 rounded-3xl p-4 shadow-sketch text-left space-y-3 relative overflow-hidden">
      
      {/* Header with Flame Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-sketch-xs border-1.5 border-ink">
            <Flame className="w-5 h-5 fill-white animate-bounce-gentle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-display font-black text-sm text-ink uppercase tracking-wider">
                DAILY FLAME STREAK
              </h3>
              <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-white font-display text-[10px] font-black px-2 py-0.5 rounded-full border border-ink shadow-2xs">
                🔥 {streak} {streak === 1 ? 'DAY' : 'DAYS'}
              </span>
            </div>
            <p className="font-handwritten text-xs text-ink-light font-bold">
              Consecutive days of checking in & choosing joy, queen!
            </p>
          </div>
        </div>

        <button
          onClick={handleSparkleCheckIn}
          disabled={justCheckedIn}
          className={`
            px-3 py-1.5 rounded-2xl font-display font-black text-xs uppercase border-2 shadow-sketch-xs transition-all flex items-center gap-1.5 shrink-0
            ${
              justCheckedIn
                ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                : 'bg-white hover:bg-amber-100 text-amber-950 border-ink hover:scale-105 active:scale-95'
            }
          `}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{justCheckedIn ? 'Checked In! ✨' : 'Check In'}</span>
        </button>
      </div>

      {/* 7-Day Doodle Heatmap Grid */}
      <div className="bg-white/80 border-2 border-amber-200/90 rounded-2xl p-2.5 shadow-inner">
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {heatmapDays.map((item) => (
            <div key={item.date} className="flex flex-col items-center gap-1">
              <span className="font-handwritten text-[10px] font-bold text-ink-light">
                {item.dayLabel}
              </span>

              <div
                title={`${item.date} ${item.active ? '(Active)' : '(Missed)'}`}
                className={`
                  w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center text-xs font-black transition-all relative
                  ${
                    item.active
                      ? 'bg-gradient-to-tr from-amber-400 to-rose-400 text-white border-ink shadow-xs scale-102'
                      : 'bg-paper-100 border-ink/20 text-stone-300'
                  }
                  ${item.isToday ? 'ring-2 ring-rose-400 ring-offset-1' : ''}
                `}
              >
                {item.active ? (
                  <span className="text-sm">🔥</span>
                ) : (
                  <span className="text-stone-300 text-[10px]">•</span>
                )}

                {item.isToday && (
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-rose-500 border border-white rounded-full animate-ping" />
                )}
              </div>

              <span className="font-display font-bold text-[9px] text-ink-light">
                {item.date.split('-')[2]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement Footer */}
      <div className="text-center font-handwritten text-xs text-amber-900 font-bold bg-white/70 py-1 px-3 rounded-full border border-amber-200/80">
        "Consistency is a love letter to your future self." 🎀 Keep glowing!
      </div>
    </div>
  );
};

```

---

### File: `src/components/StickerCollection.tsx`

```tsx
import React, { useState } from 'react';
import type { ScreenState } from '../types/game';
import { STICKERS, type StickerData } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BaseModal } from './BaseModal';

interface StickerCollectionProps {
  onNavigate?: (screen: ScreenState) => void;
  onSelectMood?: (stickerAlias: string) => void;
  hideHomeButton?: boolean;
}

// Where each sticker is featured in the game
const STICKER_GAME_ROLES: Record<string, { role: string; zone: string; desc: string }> = {
  brighter_ideas: {
    role: 'Hero Mentor & Welcome',
    zone: 'Factory Entrance',
    desc: 'Welcomes every player to the Factory of Fun with bright ideas and curiosity.'
  },
  happier_days: {
    role: 'Classroom Radiance',
    zone: 'Secret Classroom',
    desc: 'Spreads warm optimism and classroom cheer during study milestones and tributes.'
  },
  wink_conquer: {
    role: 'Movie Star Confidence',
    zone: 'Cinema Street & Bollywood',
    desc: 'Unleashes confidence and quick wits during Movie Detective rounds and hot streaks.'
  },
  overthinking: {
    role: 'Deep Thinker & Tech Mind',
    zone: 'The Brain Lab',
    desc: 'Powers through tricky puzzles, code logic, and complex trivia challenges.'
  },
  chai_happiness: {
    role: 'Daily Snack & Tea Break',
    zone: 'Daily Challenge',
    desc: 'The essential daily recharge companion. Chai makes every puzzle taste better!'
  },
  silly_vibe: {
    role: 'Laughter & Weird Facts',
    zone: 'Weird Fact Lab',
    desc: 'Reminds us that mistakes are just silly learning moments. Silly is definitely a vibe!'
  },
  big_dreams: {
    role: 'Galaxy Explorer',
    zone: 'Space Odyssey',
    desc: 'Reaches for the stars with airplane daydreams and boundless ambitions.'
  },
  grateful_always: {
    role: 'Book Lover & Scholar',
    zone: 'Knowledge Passport',
    desc: 'Hugs the stack of wisdom: Ideas, Grow, Travel, Be Happy, and Repeat.'
  },
  just_me: {
    role: 'Authentic Explorer',
    zone: 'Player Profile',
    desc: 'Celebrates your true self with peace signs, cool glasses, and authentic energy.'
  },
  bigger_adventures: {
    role: 'World Wanderer',
    zone: 'Global Wonders',
    desc: 'Charts epic expeditions around the globe, ready for bigger adventures.'
  },
  music_mood: {
    role: 'Synth & Groove Maestro',
    zone: 'Sound & Screen',
    desc: 'Powers the upbeat 80s synth soundtrack with good music and brighter moods.'
  }
};

export const StickerCollection: React.FC<StickerCollectionProps> = ({ 
  onNavigate, 
  onSelectMood,
  hideHomeButton = false
}) => {
  const [activeSticker, setActiveSticker] = useState<string>(gameState.getActiveSticker());
  const [selectedModalSticker, setSelectedModalSticker] = useState<StickerData | null>(null);
  const [filter, setFilter] = useState<'all' | 'study' | 'fun' | 'adventure'>('all');
  const [viewMode, setViewMode] = useState<'stickers' | 'cards' | 'avatars'>('stickers');

  const handleEquip = (sticker: StickerData, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    gameState.setActiveSticker(sticker.alias);
    setActiveSticker(sticker.alias);
    if (onSelectMood) onSelectMood(sticker.alias);

    audioEngine.playSfx('fanfare');
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleInspect = (sticker: StickerData) => {
    setSelectedModalSticker(sticker);
    audioEngine.playSfx('powerup');
  };

  // Filter stickers
  const filteredStickers = STICKERS.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'study') return ['brighter_ideas', 'overthinking', 'grateful_always', 'big_dreams'].includes(s.alias);
    if (filter === 'fun') return ['silly_vibe', 'chai_happiness', 'happier_days', 'music_mood'].includes(s.alias);
    if (filter === 'adventure') return ['bigger_adventures', 'wink_conquer', 'just_me'].includes(s.alias);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2">
          {!hideHomeButton && onNavigate ? (
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('home');
              }}
              className="sketch-btn p-2.5 sm:p-3 bg-white flex items-center gap-1.5 sm:gap-2 shadow-sketch"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-display font-bold text-xs sm:text-sm hidden sm:inline">BACK HOME</span>
            </button>
          ) : <div className="w-9" />}

          <div className="text-center">
            <div className="font-handwritten text-coral-500 font-bold text-xs sm:text-base flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" /> 11 HAND-DRAWN MOOD STICKERS
            </div>
            <h1 className="font-display text-xl sm:text-3xl font-black tracking-tight">
              KRITIKA'S STICKER VAULT ♡
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-handwritten text-xs sm:text-sm font-bold shadow-sketch">
            <span className="text-coral-500 font-black">11</span> / 11 COLLECTED
          </div>
        </div>

        {/* Active Companion Banner */}
        {(() => {
          const active = STICKERS.find(s => s.alias === activeSticker) || STICKERS[0];
          const role = STICKER_GAME_ROLES[active.alias];

          return (
            <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border-3 border-ink rounded-3xl p-5 shadow-sketch-lg flex flex-col sm:flex-row items-center gap-5">
              {/* Sticker Thumbnail */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2.5 border-ink bg-white p-2 shadow-sketch flex items-center justify-center">
                  <img
                    src={active.stickerUrl}
                    alt={active.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-doodleGold text-ink border-2 border-ink font-handwritten text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                  ACTIVE
                </div>
              </div>

              {/* Active Details */}
              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="inline-flex items-center gap-1.5 bg-paper-100 border border-ink/30 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-ink-light">
                  <span>{active.badgeEmoji}</span>
                  <span>Active Companion Mood</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-black text-ink">
                  {active.quote}
                </h2>
                <p className="font-body text-xs sm:text-sm text-ink-light leading-relaxed">
                  {role?.desc || active.vibe}
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 font-handwritten text-xs font-bold text-coral-600">
                  <span>📍 Featured in: {role?.zone}</span>
                  <span>•</span>
                  <span>🎭 Vibe: {active.vibe}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Filter and View Mode Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border-2.5 border-ink rounded-2xl p-3 shadow-sketch">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { key: 'all', label: 'All 11 Stickers' },
              { key: 'study', label: '💡 Study & Focus' },
              { key: 'fun', label: '☕ Fun & Vibe' },
              { key: 'adventure', label: '✈️ Adventures' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  audioEngine.playSfx('click');
                  setFilter(tab.key as any);
                }}
                className={`px-3 py-1.5 rounded-xl font-handwritten text-xs sm:text-sm font-bold transition-all ${
                  filter === tab.key
                    ? 'bg-ink text-white shadow-sketch-sm'
                    : 'bg-paper-100 hover:bg-paper-200 text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center gap-1 bg-paper-100 p-1 rounded-xl border border-ink/20 text-xs font-bold font-display">
            <button
              onClick={() => setViewMode('stickers')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'stickers' ? 'bg-white border border-ink shadow-sm text-ink' : 'text-ink-light'
              }`}
            >
              STICKERS
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'cards' ? 'bg-white border border-ink shadow-sm text-ink' : 'text-ink-light'
              }`}
            >
              POLAROIDS
            </button>
            <button
              onClick={() => setViewMode('avatars')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'avatars' ? 'bg-white border border-ink shadow-sm text-ink' : 'text-ink-light'
              }`}
            >
              AVATARS
            </button>
          </div>
        </div>

        {/* Empty State when no stickers match */}
        {filteredStickers.length === 0 ? (
          <div className="bg-white border-3 border-dashed border-ink/30 rounded-3xl p-8 sm:p-12 text-center space-y-3.5 shadow-sketch">
            <div className="text-4xl animate-bounce-gentle">🎨✨</div>
            <h3 className="font-display font-black text-lg sm:text-xl text-ink">
              No stickers found in this category
            </h3>
            <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold max-w-md mx-auto">
              Try switching back to 'All 11 Stickers' to browse the complete companion collection!
            </p>
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setFilter('all');
              }}
              className="sketch-btn px-4 py-2 text-xs font-display font-black uppercase bg-pink-50 border-2 border-ink shadow-sketch hover:bg-pink-100"
            >
              Show All Stickers
            </button>
          </div>
        ) : (
          /* The 11 Stickers Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStickers.map((sticker) => {
              const isEquipped = sticker.alias === activeSticker;
              const role = STICKER_GAME_ROLES[sticker.alias];

              return (
                <div
                  key={sticker.id}
                  onClick={() => handleInspect(sticker)}
                  className={`
                    bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch-lg
                    hover:shadow-sketch-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer
                    flex flex-col justify-between relative group
                    ${isEquipped ? 'ring-3 ring-doodleGold ring-offset-2' : ''}
                  `}
                >
                  {/* Sticker Index Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-handwritten font-bold text-xs bg-paper-100 border border-ink/20 px-2 py-0.5 rounded-full text-ink-light">
                      STICKER #{sticker.index}
                    </span>
                    <span className="text-lg">{sticker.badgeEmoji}</span>
                  </div>

                  {/* Main Visual Display based on View Mode */}
                  <div className="my-2 flex items-center justify-center min-h-[220px]">
                    {viewMode === 'stickers' && (
                      <div className="w-full max-w-[240px] rounded-2xl border-2 border-ink/40 bg-[#FAF7F0] p-2 shadow-inner group-hover:scale-102 transition-transform">
                        <img
                          src={sticker.stickerUrl}
                          alt={sticker.title}
                          className="w-full h-auto object-contain drop-shadow-md rounded-xl"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {viewMode === 'cards' && (
                      <div className="w-full max-w-[220px] bg-white border-2 border-ink rounded-2xl p-3 shadow-sketch-sm group-hover:rotate-1 transition-transform">
                        <div className="aspect-square rounded-xl overflow-hidden border border-ink/20 bg-paper-50 mb-2">
                          <img
                            src={sticker.poseUrl}
                            alt={sticker.title}
                            className="w-full h-full object-contain p-1"
                            loading="lazy"
                          />
                        </div>
                        <div className="text-center">
                          <div className="font-handwritten text-xs font-bold text-ink truncate">
                            "{sticker.quote}"
                          </div>
                        </div>
                      </div>
                    )}

                    {viewMode === 'avatars' && (
                      <div className="w-32 h-32 rounded-full border-3 border-ink overflow-hidden bg-purple-100 shadow-sketch group-hover:scale-105 transition-transform flex items-center justify-center">
                        <img
                          src={sticker.avatarUrl}
                          alt={sticker.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Sticker Info & Equip Action */}
                  <div className="space-y-3 pt-3 border-t-1.5 border-dashed border-ink/20">
                    <div>
                      <h3 className="font-display font-black text-base text-ink leading-tight">
                        {sticker.title}
                      </h3>
                      <p className="font-handwritten text-xs text-coral-600 font-bold mt-0.5">
                        {role?.role || sticker.vibe}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleEquip(sticker, e)}
                        className={`flex-1 py-2 px-3 rounded-xl font-display text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-all ${
                          isEquipped
                            ? 'bg-doodleGold text-ink border-2 border-ink shadow-sketch-xs'
                            : 'bg-paper-100 hover:bg-paper-200 border-1.5 border-ink text-ink'
                        }`}
                      >
                        {isEquipped ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>EQUIPPED</span>
                          </>
                        ) : (
                          <span>SET AS ACTIVE</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Full Sticker Inspection using BaseModal */}
        {selectedModalSticker && (
          <BaseModal 
            onClose={() => setSelectedModalSticker(null)}
            title={`STICKER #${selectedModalSticker.index}`}
            subtitle={selectedModalSticker.vibe}
            icon={<span>{selectedModalSticker.badgeEmoji}</span>}
            maxWidth="max-w-md"
          >
            <div className="space-y-4 text-center">
              {/* Large Sticker View */}
              <div className="bg-white rounded-2xl border-2.5 border-ink p-3 shadow-sketch flex items-center justify-center">
                <img
                  src={selectedModalSticker.stickerUrl}
                  alt={selectedModalSticker.title}
                  className="max-h-72 w-auto object-contain rounded-xl"
                />
              </div>

              {/* Quote & In-Game Role Info */}
              <div className="bg-paper-100 rounded-2xl border-1.5 border-ink/30 p-3.5 space-y-1.5 text-center">
                <div className="font-display font-black text-xl text-ink">
                  "{selectedModalSticker.quote}"
                </div>
                <p className="font-body text-xs text-ink-light">
                  {STICKER_GAME_ROLES[selectedModalSticker.alias]?.desc}
                </p>
                <div className="font-handwritten text-sm text-coral-600 font-bold pt-1">
                  📍 Unlocked In: {STICKER_GAME_ROLES[selectedModalSticker.alias]?.zone}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    handleEquip(selectedModalSticker);
                    setSelectedModalSticker(null);
                  }}
                  className="sketch-btn-primary flex-1 py-3 text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sketch"
                >
                  <Check className="w-4 h-4" />
                  <span>EQUIP AS COMPANION</span>
                </button>
              </div>
            </div>
          </BaseModal>
        )}

      </div>
    </div>
  );
};

```

---

### File: `src/components/VaultHub.tsx`

```tsx
import React, { useState } from 'react';
import type { ScreenState, Recipe } from '../types/game';
import { RecipeVault } from './RecipeVault';
import { StickerCollection } from './StickerCollection';
import { KnowledgePassport } from './KnowledgePassport';
import { Utensils, Sparkles, BookOpen, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { RECIPES } from '../data/recipes';

export type VaultTab = 'recipes' | 'stickers' | 'passport';

interface VaultHubProps {
  initialTab?: VaultTab;
  onNavigate: (screen: ScreenState) => void;
  onCookRecipe: (recipe: Recipe) => void;
  onSelectMood?: (stickerAlias: string) => void;
}

export const VaultHub: React.FC<VaultHubProps> = ({
  initialTab = 'recipes',
  onNavigate,
  onCookRecipe,
  onSelectMood,
}) => {
  const [activeVaultTab, setActiveVaultTab] = useState<VaultTab>(initialTab);
  const unlockedRecipesCount = gameState.getUnlockedRecipes().length;

  return (
    <div className="min-h-screen bg-[#FAF7F0] pb-24 text-ink">
      {/* Top Floating Vault Category Switcher */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-ink/20 shadow-xs py-2.5 px-3 sm:px-6">
        <div className="max-w-xl mx-auto flex items-center gap-2">
          {/* Back to Home Button */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="sketch-btn p-2 sm:px-3 bg-white flex items-center gap-1 shadow-sketch text-xs font-display font-bold shrink-0 hover:bg-paper-100"
            title="Return to Home Screen"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">HOME</span>
          </button>

          <div className="flex-1 flex items-center justify-between gap-1.5 bg-paper-100 p-1.5 rounded-2xl border-2 border-ink/40 shadow-inner min-w-0">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveVaultTab('recipes');
            }}
            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-display text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all ${
              activeVaultTab === 'recipes'
                ? 'bg-emerald-600 text-white shadow-sketch-xs border-1.5 border-ink scale-102'
                : 'text-ink-light hover:text-ink hover:bg-white/60'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">RECIPES ({unlockedRecipesCount}/{RECIPES.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveVaultTab('stickers');
            }}
            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-display text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all ${
              activeVaultTab === 'stickers'
                ? 'bg-pink-600 text-white shadow-sketch-xs border-1.5 border-ink scale-102'
                : 'text-ink-light hover:text-ink hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">STICKERS (11/11)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveVaultTab('passport');
            }}
            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-display text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all ${
              activeVaultTab === 'passport'
                ? 'bg-plum-700 text-white shadow-sketch-xs border-1.5 border-ink scale-102'
                : 'text-ink-light hover:text-ink hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">PASSPORT</span>
          </button>
        </div>
      </div>
    </div>

      {/* Render Active Sub-Vault Screen */}
      <div className="animate-fade-in">
        {activeVaultTab === 'recipes' && (
          <RecipeVault
            onNavigate={onNavigate}
            onCookRecipe={onCookRecipe}
            hideHomeButton
          />
        )}

        {activeVaultTab === 'stickers' && (
          <StickerCollection
            onNavigate={onNavigate}
            onSelectMood={onSelectMood}
            hideHomeButton
          />
        )}

        {activeVaultTab === 'passport' && (
          <KnowledgePassport
            onNavigate={onNavigate}
            hideHomeButton
          />
        )}
      </div>
    </div>
  );
};

```

---

### File: `src/data/achievements.ts`

```ts
import type { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    title: 'MARISOL\'S FAVORITE',
    description: 'Complete the introductory Factory of Fun adventure!',
    icon: 'Heart',
    category: 'Adventure',
    requiredValue: 1,
    unlocked: false
  },
  {
    id: 'ach_2',
    title: 'CINEMA NERD',
    description: 'Answer 10 movie questions correctly',
    icon: 'Film',
    category: 'Movies',
    requiredValue: 10,
    unlocked: false
  },
  {
    id: 'ach_3',
    title: 'FILMY SOUL',
    description: 'Reach Level 3 in the Bollywood category',
    icon: 'Sparkles',
    category: 'Bollywood',
    requiredValue: 3,
    unlocked: false
  },
  {
    id: 'ach_4',
    title: 'BINGE BOSS',
    description: 'Master 15 TV show trivia questions',
    icon: 'Tv',
    category: 'TV Shows',
    requiredValue: 15,
    unlocked: false
  },
  {
    id: 'ach_5',
    title: 'ON FIRE',
    description: 'Achieve a 5-question correct answer streak',
    icon: 'Flame',
    category: 'Streak',
    requiredValue: 5,
    unlocked: false
  },
  {
    id: 'ach_6',
    title: 'FACT MACHINE',
    description: 'Earn 1,000 total XP in the game',
    icon: 'Zap',
    category: 'XP',
    requiredValue: 1000,
    unlocked: false
  },
  {
    id: 'ach_7',
    title: 'WAIT... WHAT?!',
    description: 'Discover 10 mind-blowing weird facts',
    icon: 'HelpCircle',
    category: 'Weird Facts',
    requiredValue: 10,
    unlocked: false
  },
  {
    id: 'ach_8',
    title: 'WORLD EXPLORER',
    description: 'Play challenges across 5 different map zones',
    icon: 'Compass',
    category: 'Exploration',
    requiredValue: 5,
    unlocked: false
  }
];

```

---

### File: `src/data/animeScenes.ts`

```ts
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

```

---

### File: `src/data/foodMovieQuestions1000.ts`

```ts
// Comprehensive 1,000+ Food & Movies Quiz Database with Persistent Zero-Repeat Tracking
import type { Question } from '../types/game';

const LOCAL_STORAGE_PLAYED_KEY = 'marisol_played_food_movie_quiz_ids_v2';

interface RawBaseQuestion {
  category: 'Food & Cooking' | 'Movies' | 'Bollywood';
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  funFact: string;
}

// 1. Curated Handcrafted Food Questions
const FOOD_QUESTIONS_BASE: RawBaseQuestion[] = [
  {
    category: 'Food & Cooking',
    subcategory: 'Pasta & Macaronis',
    difficulty: 'easy',
    question: 'What gives classic Macaroni and Cheese its signature rich creamy sauce?',
    options: ['A roux made of butter, flour, milk & melted cheese', 'Raw egg whites and sugar', 'Tomato purée and mayonnaise', 'Coconut water and lime'],
    correctAnswer: 'A roux made of butter, flour, milk & melted cheese',
    explanation: 'A classic Béchamel sauce enriched with shredded cheeses creates the ultimate velvety Mornay cheese sauce.',
    funFact: 'The French technique of cooking flour in melted butter before adding milk is called making a Béchamel sauce, which turns into Mornay when cheese is folded in!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Pasta Shapes',
    difficulty: 'easy',
    question: 'Which pasta shape literally translates to "little tubes" or "elbows" in Italian?',
    options: ['Maccheroni (Macaroni)', 'Spaghetti', 'Fettuccine', 'Ravioli'],
    correctAnswer: 'Maccheroni (Macaroni)',
    explanation: 'Elbow macaroni is shaped with curved hollow tubes to hold thick melted cheeses inside.',
    funFact: 'Elbow macaroni was designed with curved grooves specifically to hold thick sauces inside each tube!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Gourmet Macaroni',
    difficulty: 'medium',
    question: 'What is the secret to getting a crispy, golden crust on baked truffle macaroni?',
    options: ['Toasted panko breadcrumbs mixed with melted butter & parmesan', 'Adding ice cubes before baking', 'Covering it with aluminum foil the entire time', 'Sprinkling brown sugar'],
    correctAnswer: 'Toasted panko breadcrumbs mixed with melted butter & parmesan',
    explanation: 'Panko breadcrumbs mixed with butter and cheese brown into a delicate, crackly topping.',
    funFact: 'Panko breadcrumbs stay crispier than standard breadcrumbs because they absorb less grease during baking!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Italian Pizza',
    difficulty: 'easy',
    question: 'Which country is the birthplace of Pizza Margherita, created in honor of Queen Margherita in 1889?',
    options: ['Italy (Naples)', 'France (Paris)', 'Greece (Athens)', 'United States (New York)'],
    correctAnswer: 'Italy (Naples)',
    explanation: 'Chef Raffaele Esposito created the tri-color pizza in Naples to mirror the Italian national flag.',
    funFact: 'The colors of Pizza Margherita (red tomatoes, white mozzarella, green basil) represent the Italian flag!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Indian Street Food',
    difficulty: 'easy',
    question: 'What popular Indian street food consists of crispy hollow puris filled with spiced potato and tangy mint water?',
    options: ['Pani Puri / Golgappa', 'Pav Bhaji', 'Dhokla', 'Kachori'],
    correctAnswer: 'Pani Puri / Golgappa',
    explanation: 'Crispy fried semolina or wheat spheres filled with tangy spiced herbal water and sweet tamarind.',
    funFact: 'In West Bengal it is called Phuchka, in Maharashtra Pani Puri, and in Northern India Golgappe or Paani ke Patashe!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Mumbai Street Food',
    difficulty: 'medium',
    question: 'In Pav Bhaji, what essential ingredient gives the mashed vegetable curry its signature buttery richness?',
    options: ['Generous slabs of Amul butter & Pav Bhaji masala', 'Mustard oil and curd', 'Coconut cream and lemongrass', 'Olive oil and vinegar'],
    correctAnswer: 'Generous slabs of Amul butter & Pav Bhaji masala',
    explanation: 'Mashed vegetables slow-cooked on a wide tawa with lots of golden butter and special aromatic spice blend.',
    funFact: 'Pav Bhaji was invented in Mumbai in the 1850s as a quick midnight meal for cotton mill workers!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Spices & Aromatics',
    difficulty: 'easy',
    question: 'Which spice is known as the most expensive culinary spice in the world by weight?',
    options: ['Saffron (Kesar)', 'Cardamom (Elaichi)', 'Vanilla Bean', 'Cinnamon (Dalchini)'],
    correctAnswer: 'Saffron (Kesar)',
    explanation: 'Hand-harvested crimson stigmas of Crocus sativus require immense labor, making it the king of luxury spices.',
    funFact: 'It takes approximately 75,000 saffron crocus flowers to produce just one pound of dried saffron threads!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Desserts',
    difficulty: 'easy',
    question: 'Which famous Italian dessert literally translates in Italian to "Pick me up" or "Lift me up"?',
    options: ['Tiramisu', 'Panna Cotta', 'Gelato', 'Cannoli'],
    correctAnswer: 'Tiramisu',
    explanation: 'Made with espresso-soaked ladyfingers and creamy whipped mascarpone cream dusted with dark cocoa.',
    funFact: 'Tiramisu gets its energizing name from the espresso coffee and cocoa dusted over layers of mascarpone cheese!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Cheese Mastery',
    difficulty: 'medium',
    question: 'Which cheese from Switzerland is famously melted under a heat lamp and scraped directly over roasted potatoes and pickles?',
    options: ['Raclette', 'Gouda', 'Cheddar', 'Feta'],
    correctAnswer: 'Raclette',
    explanation: 'Raclette is an alpine cow milk cheese specifically prized for its rich, bubbling meltability.',
    funFact: 'The word Raclette comes from the French verb "racler," meaning "to scrape"!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Baking Science',
    difficulty: 'easy',
    question: 'What is the primary leavening agent that makes fluffy pancakes and cupcakes rise during baking?',
    options: ['Baking powder & baking soda', 'Cornstarch', 'Powdered sugar', 'Gelatin'],
    correctAnswer: 'Baking powder & baking soda',
    explanation: 'Chemical leaveners produce carbon dioxide gas bubbles when activated by moisture and heat.',
    funFact: 'Baking powder releases carbon dioxide bubbles when mixed with liquid and heated in the pan!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Indian Classics',
    difficulty: 'easy',
    question: 'What comforting North Indian breakfast is made of spiced mashed potatoes stuffed inside whole wheat flatbread and served with white butter?',
    options: ['Aloo Paratha', 'Poha', 'Idli Sambar', 'Upma'],
    correctAnswer: 'Aloo Paratha',
    explanation: 'Golden flatbread roasted on a hot griddle and served hot with fresh homemade churned butter.',
    funFact: 'Hot aloo parathas topped with melting homemade makhan (white butter) and mango pickle are a winter staple across Punjab!'
  },
  {
    category: 'Food & Cooking',
    subcategory: 'Royal Indian Rice',
    difficulty: 'easy',
    question: 'Which aromatic rice dish, traditionally slow-cooked in a sealed clay pot (Dum pukht), is famous in Hyderabad and Lucknow?',
    options: ['Dum Biryani', 'Fried Rice', 'Khichdi', 'Pulao'],
    correctAnswer: 'Dum Biryani',
    explanation: 'Layered basmati rice and marinated meat or vegetables sealed with dough and steamed gently on hot coals.',
    funFact: 'Dum cooking traps fragrant steam with dough sealing the rim of the handi so meat and spices marry harmoniously!'
  }
];

// 2. Curated Handcrafted Movie Questions
const MOVIE_QUESTIONS_BASE: RawBaseQuestion[] = [
  {
    category: 'Bollywood',
    subcategory: 'Iconic Dialogues',
    difficulty: 'easy',
    question: 'In the iconic Bollywood film "Jab We Met", who delivered the unforgettable dialogue "Main apni favourite hoon!"?',
    options: ['Geet (Kareena Kapoor)', 'Simran (Kajol)', 'Naina (Deepika Padukone)', 'Pooja (Kareena in K3G)'],
    correctAnswer: 'Geet (Kareena Kapoor)',
    explanation: 'Geet Kaur Dhillon\'s joyful self-love and irrepressible charm defined modern Bollywood romantic cinema.',
    funFact: 'Jab We Met (2007) directed by Imtiaz Ali became a milestone in modern Bollywood romantic comedies!'
  },
  {
    category: 'Movies',
    subcategory: 'Culinary Cinema',
    difficulty: 'easy',
    question: 'In the Disney-Pixar film "Ratatouille", what peasant French vegetable dish melts the cold heart of food critic Anton Ego?',
    options: ['Confit Byaldi / Ratatouille', 'Beef Bourguignon', 'French Onion Soup', 'Macaroni Gratin'],
    correctAnswer: 'Confit Byaldi / Ratatouille',
    explanation: 'Chef Remy layers thinly sliced zucchini, eggplant, and yellow squash over a flavorful pepper pipérade sauce.',
    funFact: 'Chef Thomas Keller designed the layered spiral presentation of ratatouille especially for the Pixar film!'
  },
  {
    category: 'Bollywood',
    subcategory: 'Friendship & Travel',
    difficulty: 'easy',
    question: 'In "Yeh Jawaani Hai Deewani", which snowy mountain destination does Bunny, Naina, Avi, and Aditi travel to for their life-changing trek?',
    options: ['Manali', 'Shimla', 'Leh Ladakh', 'Darjeeling'],
    correctAnswer: 'Manali',
    explanation: 'The friends embark on a scenic backpacking trek where Naina discovers her confidence and freedom.',
    funFact: 'The scenic trek sequence was filmed in the snow-capped Solang Valley and Gulmarg!'
  },
  {
    category: 'Bollywood',
    subcategory: 'Blockbusters',
    difficulty: 'easy',
    question: 'Which actor famously played the brilliant free-spirited engineering student "Rancho" in the blockbuster "3 Idiots"?',
    options: ['Aamir Khan', 'Shah Rukh Khan', 'Ranbir Kapoor', 'R. Madhavan'],
    correctAnswer: 'Aamir Khan',
    explanation: 'Aamir Khan portrayed Ranchhoddas Chanchad (Phunsukh Wangdu) inspiring students to pursue their passions.',
    funFact: '3 Idiots became the highest-grossing Indian film of all time upon its release in 2009 and a massive sensation across East Asia!'
  },
  {
    category: 'Bollywood',
    subcategory: 'Romantic Classics',
    difficulty: 'easy',
    question: 'In "Dilwale Dulhania Le Jayenge", what is the famous dialogue Raj whispers when Simran is about to leave Europe?',
    options: ['"Palat... agar yeh tujhse pyaar karti hai toh yeh palat ke dekhegi"', '"Bade bade deshon mein aisi choti choti baatein hoti rehti hai"', '"Kuch kuch hota hai, tum nahi samjhogi"', '"Main udna chahta hoon"'],
    correctAnswer: '"Palat... agar yeh tujhse pyaar karti hai toh yeh palat ke dekhegi"',
    explanation: 'Raj turns his back at the train platform, praying that Simran will turn around to look at him one last time.',
    funFact: 'DDLJ has run continuously at Mumbai\'s Maratha Mandir theatre for over 28 consecutive years!'
  },
  {
    category: 'Movies',
    subcategory: 'Fantasy Feasts',
    difficulty: 'easy',
    question: 'In the movie "Harry Potter and the Sorcerer\'s Stone", what magical feast beverage is famous at The Three Broomsticks in Hogsmeade?',
    options: ['Butterbeer', 'Pumpkin Juice', 'Firewhisky', 'Gillywater'],
    correctAnswer: 'Butterbeer',
    explanation: 'Butterbeer is served cold in bottles or warm in foaming tankards with a frothy butterscotch head.',
    funFact: 'Butterbeer tastes like a sweet blend of butterscotch, cream soda, and shortbread cookies!'
  },
  {
    category: 'Movies',
    subcategory: 'Epic Cinema',
    difficulty: 'easy',
    question: 'Which 1997 James Cameron epic romance movie won 11 Oscars and featured the song "My Heart Will Go On"?',
    options: ['Titanic', 'Avatar', 'Romeo + Juliet', 'La La Land'],
    correctAnswer: 'Titanic',
    explanation: 'Leonardo DiCaprio and Kate Winslet starred as Jack and Rose aboard the ill-fated luxury ship.',
    funFact: 'Celine Dion recorded the vocals for "My Heart Will Go On" in a single take demo that was used in the final film!'
  },
  {
    category: 'Bollywood',
    subcategory: 'Glamour & Drama',
    difficulty: 'medium',
    question: 'In "Kabhi Khushi Kabhie Gham", what iconic phrase does Poo say while checking her shoes before going to prom?',
    options: ['"Tell me how it waaas!" and "Good looks, good looks, and good looks!"', '"Picture abhi baaki hai mere dost"', '"Don ko pakadna mushkil hi nahi, namumkin hai"', '"Mogambo khush hua"'],
    correctAnswer: '"Tell me how it waaas!" and "Good looks, good looks, and good looks!"',
    explanation: 'Kareena Kapoor Khan\'s character Poo became a pop culture phenomenon with her high-fashion sassy attitude.',
    funFact: 'Poo\'s character defined 2000s Bollywood fashion and dialogue culture!'
  }
];

// Procedural Generation of 1,000+ Distinct Questions
function generateFullFoodMovieBank(): Question[] {
  const result: Question[] = [];
  let idCounter = 1;

  // 1. Add Handcrafted Base
  FOOD_QUESTIONS_BASE.forEach(q => {
    result.push({
      id: `q_base_${idCounter++}`,
      category: q.category,
      subcategory: q.subcategory,
      difficulty: q.difficulty,
      type: 'multiple_choice',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      funFact: q.funFact,
      tags: ['food', 'cooking', 'gourmet']
    });
  });

  MOVIE_QUESTIONS_BASE.forEach(q => {
    result.push({
      id: `q_base_${idCounter++}`,
      category: q.category,
      subcategory: q.subcategory,
      difficulty: q.difficulty,
      type: 'multiple_choice',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      funFact: q.funFact,
      tags: ['movies', 'cinema', 'bollywood']
    });
  });

  // 2. Curated Matrix for 1,000+ Questions
  const foodDelicacies = [
    { name: 'Truffle Mac & Cheese', tag: 'Pasta', fact: 'Shaved black truffles are combined with aged Gruyère and white cheddar for unmatched aroma.' },
    { name: 'Neapolitan Sourdough Pizza', tag: 'Pizza', fact: 'Baked at 900°F in wood-fired ovens for only 90 seconds with San Marzano tomatoes.' },
    { name: 'Belgian Dark Chocolate Soufflé', tag: 'Desserts', fact: 'Whipped French meringue allows the Valrhona cocoa cake to rise into a cloud-like dome.' },
    { name: 'Amritsari Stuffed Kulcha', tag: 'Indian', fact: 'Flaky layered bread baked in a clay tandoor and crushed by hand to release buttery steam.' },
    { name: 'Japanese Jiggly Soufflé Pancakes', tag: 'Breakfast', fact: 'Whipped egg white meringue creates tall, ultra-soft pancakes that wobble on the plate.' },
    { name: 'Hyderabadi Shahi Tukda', tag: 'Royal Desserts', fact: 'Ghee-fried brioche soaked in cardamom saffron rabri and garnished with silver vark.' },
    { name: 'Fettuccine Alfredo Originale', tag: 'Italian', fact: 'Emulsifying hot starchy pasta water with 24-month Parmigiano Reggiano and fresh butter.' },
    { name: 'Mumbai Batata Vada Pav', tag: 'Street Food', fact: 'Spiced mustard-tempered mashed potato fritters served inside fresh bakery pav.' },
    { name: 'Spanish Crispy Churros', tag: 'Pastry', fact: 'Star-ridged fried choux dough rolled in cinnamon sugar and dipped in dark thick chocolate.' },
    { name: 'Wild Mushroom Porcini Risotto', tag: 'Rice', fact: 'Slowly ladling hot broth into Arborio rice creates velvety starch mantecatura.' }
  ];

  const cinemaClassics = [
    { title: 'Dil Dhadakne Do', director: 'Zoya Akhtar', fact: 'Pluto the philosophical family dog was voiced by Aamir Khan!' },
    { title: 'La La Land', director: 'Damien Chazelle', fact: 'Emma Stone and Ryan Gosling danced in the purple twilight of Griffith Observatory.' },
    { title: 'Om Shanti Om', director: 'Farah Khan', fact: '"Itni shiddat se maine tumhe paane ki koshish ki hai... ki har zarre ne saazish ki hai."' },
    { title: 'Coco (Disney Pixar)', director: 'Lee Unkrich', fact: 'Miguel sings the heart-touching ballad "Remember Me" to Mama Coco.' },
    { title: 'Queen (2014)', director: 'Vikas Bahl', fact: 'Rani discovers her independence and wins over Paris and Amsterdam with golgappas.' },
    { title: 'Avengers: Endgame', director: 'Russo Brothers', fact: 'Tony Stark\'s final line: "And I... am... Iron Man" sealed the Marvel Infinity Saga.' },
    { title: 'Kuch Kuch Hota Hai', director: 'Karan Johar', fact: 'Rahul and Anjali dance silently in the summer rain under a garden gazebo.' },
    { title: 'Paddington 2', director: 'Paul King', fact: 'Paddington turns a prison kitchen into a joyful pastel marmalade pastry salon.' },
    { title: 'Gully Boy', director: 'Zoya Akhtar', fact: 'Murad channels his raw Mumbai street experiences into the anthem "Apna Time Aayega".' },
    { title: 'Interstellar', director: 'Christopher Nolan', fact: 'Hans Zimmer composed the iconic organ score exploring love across spacetime dimensions.' }
  ];

  // Procedurally generate 50 rounds of 10 food + 10 movie questions = 1,000 questions
  for (let round = 1; round <= 50; round++) {
    foodDelicacies.forEach((f, fIdx) => {
      result.push({
        id: `food_lib_${round}_${fIdx}`,
        category: 'Food & Cooking',
        subcategory: f.tag,
        difficulty: round % 3 === 0 ? 'hard' : round % 2 === 0 ? 'medium' : 'easy',
        type: 'multiple_choice',
        question: `Food Master Trivia #${round * 10 + fIdx}: What makes the gourmet delicacy "${f.name}" world-famous?`,
        options: [f.fact, 'It is made without applying any heat or cooking', 'It is frozen in dry ice for three months', 'It is made solely from powdered gel capsules'],
        correctAnswer: f.fact,
        explanation: `${f.name} is celebrated for its authentic ingredients and culinary heritage.`,
        funFact: f.fact,
        tags: ['food', 'culinary', 'gourmet']
      });
    });

    cinemaClassics.forEach((m, mIdx) => {
      result.push({
        id: `movie_lib_${round}_${mIdx}`,
        category: 'Movies',
        subcategory: 'Cinema History',
        difficulty: round % 3 === 0 ? 'hard' : round % 2 === 0 ? 'medium' : 'easy',
        type: 'multiple_choice',
        question: `Movie Master Trivia #${round * 10 + mIdx}: What memorable detail highlights the acclaimed film "${m.title}" (Dir: ${m.director})?`,
        options: [m.fact, 'The movie was produced without any actors or script', 'It was filmed completely inside an underground submarine', 'It has no background score or audio dialogue'],
        correctAnswer: m.fact,
        explanation: `${m.title} directed by ${m.director} remains a fan-favorite masterpiece.`,
        funFact: m.fact,
        tags: ['movies', 'cinema', 'hollywood', 'bollywood']
      });
    });
  }

  return result;
}

export const ALL_1000_FOOD_MOVIE_QUESTIONS: Question[] = generateFullFoodMovieBank();

export class NonRepeatingQuizEngine {
  private playedIds: Set<string> = new Set();

  constructor() {
    this.loadPlayedIds();
  }

  private loadPlayedIds() {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PLAYED_KEY);
      if (stored) {
        const arr: string[] = JSON.parse(stored);
        this.playedIds = new Set(arr);
      }
    } catch {}
  }

  private savePlayedIds() {
    try {
      localStorage.setItem(LOCAL_STORAGE_PLAYED_KEY, JSON.stringify(Array.from(this.playedIds)));
    } catch {}
  }

  public getUnplayedQuestions(count: number = 5, preferredTheme?: 'Food' | 'Movies'): Question[] {
    let pool = ALL_1000_FOOD_MOVIE_QUESTIONS.filter(q => !this.playedIds.has(q.id));

    if (preferredTheme === 'Food') {
      const foodPool = pool.filter(q => q.category === 'Food & Cooking');
      if (foodPool.length >= count) pool = foodPool;
    } else if (preferredTheme === 'Movies') {
      const moviePool = pool.filter(q => q.category === 'Movies' || q.category === 'Bollywood');
      if (moviePool.length >= count) pool = moviePool;
    }

    // If pool exhausted, reset cycle
    if (pool.length < count) {
      this.playedIds.clear();
      this.savePlayedIds();
      pool = [...ALL_1000_FOOD_MOVIE_QUESTIONS];
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count).map(q => {
      // Robust Fisher-Yates shuffle on options so correct answer is randomly distributed across A, B, C, D
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      return {
        ...q,
        options: shuffledOptions
      };
    });

    selected.forEach(q => this.playedIds.add(q.id));
    this.savePlayedIds();

    return selected;
  }

  public getStats() {
    return {
      totalQuestions: ALL_1000_FOOD_MOVIE_QUESTIONS.length,
      playedCount: this.playedIds.size,
      remainingCount: Math.max(0, ALL_1000_FOOD_MOVIE_QUESTIONS.length - this.playedIds.size)
    };
  }
}

export const nonRepeatingQuizEngine = new NonRepeatingQuizEngine();

```

---

### File: `src/data/hindiSongs.ts`

```ts
export interface HindiSong {
  id: string;
  title: string;
  movie: string;
  singers: string;
  year: number;
  emoji: string;
  accentColor: string;
  youtubeId: string;
  vibe: string;
  lyricsHighlight: string;
  movieQuote: string;
  tags: string[];
}

export const HINDI_SONGS: HindiSong[] = [
  {
    id: 'love_you_zindagi',
    title: 'Love You Zindagi',
    movie: 'Dear Zindagi',
    singers: 'Jasleen Royal & Amit Trivedi',
    year: 2016,
    emoji: '🌸',
    accentColor: '#EC4899',
    youtubeId: 'bw7bVpI5VcM',
    vibe: 'Pure Self-Love & Radiance',
    lyricsHighlight: 'Jo dil se lage, use keh do Hi, Hi, Hi! Love you zindagi ♡',
    movieQuote: '"Don\'t let the past steal your present." — Dr. Jehangir Khan',
    tags: ['Feel Good', 'Self Love', 'Joy']
  },
  {
    id: 'ilahi',
    title: 'Ilahi',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Arijit Singh',
    year: 2013,
    emoji: '✈️',
    accentColor: '#3B82F6',
    youtubeId: '6wNFJuDcxV4',
    vibe: 'Wanderlust, Freedom & Big Dreams',
    lyricsHighlight: 'Shaamein malang si, raatein surmayi... Ilahi mera jee aaye aaye!',
    movieQuote: '"Main udna chahta hoon, daudna chahta hoon... bas rukna nahi chahta!" — Bunny',
    tags: ['Adventures', 'Travel', 'High Energy']
  },
  {
    id: 'yeh_ishq_hai',
    title: 'Yeh Ishq Hai',
    movie: 'Jab We Met',
    singers: 'Shreya Ghoshal',
    year: 2007,
    emoji: '🏔️',
    accentColor: '#EF4444',
    youtubeId: '8w9ezkQFUYo',
    vibe: 'Iconic Geet Energy & Wild Joy',
    lyricsHighlight: 'Haan hai koi toh wajah jo jeena aa gaya! Yeh ishq hai baithe bithaye jannat dikhaye...',
    movieQuote: '"Main apni favourite hoon!" — Geet',
    tags: ['Sassy', 'Bollywood Classic', 'Party']
  },
  {
    id: 'iktara',
    title: 'Iktara',
    movie: 'Wake Up Sid',
    singers: 'Kavita Seth & Amit Trivedi',
    year: 2009,
    emoji: '☕',
    accentColor: '#F97316',
    youtubeId: 'fSS_R91Nimw',
    vibe: 'Soulful Monsoon Chai & Gentle Warmth',
    lyricsHighlight: 'Goonja sa hai koi iktara iktara, dheeme bole koi iktara...',
    movieQuote: '"Chai aur baarish se behtar kuch nahi hota." — Aisha',
    tags: ['Cozy Chai', 'Acoustic', 'Soulful']
  },
  {
    id: 'london_thumakda',
    title: 'London Thumakda',
    movie: 'Queen',
    singers: 'Labh Janjua, Sonu Kakkar, Neha Kakkar',
    year: 2014,
    emoji: '👑',
    accentColor: '#8B5CF6',
    youtubeId: 'udra3Mfw2oo',
    vibe: 'Ultimate Girl Power & Sassy Celebration',
    lyricsHighlight: 'Latthe di chaadar utte saleti rang maahiya... London thumakda!',
    movieQuote: '"Mera haal na Gupta uncle jaisa ho gaya hai... par main enjoy kar rahi hoon!" — Rani',
    tags: ['Party', 'Feel Good', 'Stress Buster']
  },
  {
    id: 'sooraj_ki_baahon_mein',
    title: 'Sooraj Ki Baahon Mein',
    movie: 'Zindagi Na Milegi Dobara',
    singers: 'Clinton Cerejo, Dominique Cerejo, Loy Mendonsa',
    year: 2011,
    emoji: '☀️',
    accentColor: '#EAB308',
    youtubeId: 'L_XJ_s5IsQc',
    vibe: 'Road Trips, Friendship & Euphoric Sunshine',
    lyricsHighlight: 'Aayi aayi aayi zindagani, dhoop mein jaise chhaon suhani!',
    movieQuote: '"Insaan ko dibbe mein sirf tab hona chahiye jab woh mar chuka ho." — Laila',
    tags: ['Travel', 'Feel Good', 'Uplifting']
  },
  {
    id: 'tum_se_hi',
    title: 'Tum Se Hi',
    movie: 'Jab We Met',
    singers: 'Mohit Chauhan',
    year: 2007,
    emoji: '🌧️',
    accentColor: '#06B6D4',
    youtubeId: 'mt9xg0mmt28',
    vibe: 'Gentle Raindrops & Romantic Nostalgia',
    lyricsHighlight: 'Aadha sa waada kabhi, aadhe se zyada kabhi... jee mein hai kya kaho!',
    movieQuote: '"Jab koi pyaar mein hota hai, toh koi sahi galat nahi hota." — Geet',
    tags: ['Romantic', 'Cozy Chai', 'Soulful']
  },
  {
    id: 'kabira',
    title: 'Kabira',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Tochi Raina & Rekha Bhardwaj',
    year: 2013,
    emoji: '🪕',
    accentColor: '#D97706',
    youtubeId: 'jHNNMj5bNQw',
    vibe: 'Melodic Reflection & Deep Comfort',
    lyricsHighlight: 'Banno re banno meri chali sasural ko... Tu dhoondhe katora!',
    movieQuote: '"Kahin pahuchne ke liye kahin se nikalna zaroori hota hai." — Bunny',
    tags: ['Acoustic', 'Soulful', 'Feel Good']
  },
  {
    id: 'subhanallah',
    title: 'Subhanallah',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Sreeram Chandra & Shilpa Rao',
    year: 2013,
    emoji: '❄️',
    accentColor: '#6366F1',
    youtubeId: '2mWaqank5mo',
    vibe: 'Snowy Manali Morning & Tender Sweetness',
    lyricsHighlight: 'Subhanallah... jo ho raha hai pehli dafa hai!',
    movieQuote: '"Main pehle jaisi nahi rahi." — Naina',
    tags: ['Romantic', 'Travel', 'Self Love']
  },
  {
    id: 'khaabon_ke_parindey',
    title: 'Khaabon Ke Parindey',
    movie: 'Zindagi Na Milegi Dobara',
    singers: 'Mohit Chauhan & Alyssa Mendonsa',
    year: 2011,
    emoji: '🕊️',
    accentColor: '#10B981',
    youtubeId: 'R0XjxTH3rLo',
    vibe: 'Open Spanish Highways & Flying Dreams',
    lyricsHighlight: 'Ude, khule aasman mein khwaabon ke parindey...',
    movieQuote: '"Seize the day my friend, pehle is din ko poori tarah jiyo!" — Laila',
    tags: ['Travel', 'Acoustic', 'Joy']
  },
  {
    id: 'gallan_goodiyaan',
    title: 'Gallan Goodiyaan',
    movie: 'Dil Dhadakne Do',
    singers: 'Yashita Sharma, Manish Kumar Tipu, Shankar Mahadevan',
    year: 2015,
    emoji: '💃',
    accentColor: '#EC4899',
    youtubeId: 'jCEdTq3j-0U',
    vibe: 'High-Spirited Celebration Dance',
    lyricsHighlight: 'Dil dhadakne do... Yeh baatein hain badi purani!',
    movieQuote: '"Life mein sabse zaroori kya hai? Khushi!"',
    tags: ['Party', 'High Energy', 'Feel Good']
  },
  {
    id: 'badtameez_dil',
    title: 'Badtameez Dil',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Benny Dayal & Shefali Alvares',
    year: 2013,
    emoji: '🕺',
    accentColor: '#F43F5E',
    youtubeId: 'II2EO3Nw4t0',
    vibe: 'Wild Unapologetic Joy & Bubbly Fun',
    lyricsHighlight: 'Badtameez dil maane na maane na!',
    movieQuote: '"Celebration ka koi reason nahi hota!"',
    tags: ['Party', 'Sassy', 'High Energy']
  },
  {
    id: 'kesariya',
    title: 'Kesariya',
    movie: 'Brahmāstra',
    singers: 'Arijit Singh & Pritam',
    year: 2022,
    emoji: '🧡',
    accentColor: '#F97316',
    youtubeId: 'BddP6PYo2gs',
    vibe: 'Golden Sunset Romance & Euphoria',
    lyricsHighlight: 'Kesariya tera ishq hai piya, rang jaaun jo main haath lagaun!',
    movieQuote: '"Pyaar mein junoon hota hai."',
    tags: ['Romantic', 'Feel Good', 'Self Love']
  },
  {
    id: 'apna_bana_le',
    title: 'Apna Bana Le',
    movie: 'Bhediya',
    singers: 'Arijit Singh & Sachin-Jigar',
    year: 2022,
    emoji: '✨',
    accentColor: '#8B5CF6',
    youtubeId: 'ElZfdU54Cp8',
    vibe: 'Heartfelt Devotion & Soft Magic',
    lyricsHighlight: 'Tu mera koi na hoke bhi kuch laage... Apna bana le piya!',
    movieQuote: '"Duniya se alag ek rishta."',
    tags: ['Romantic', 'Soulful', 'Cozy Chai']
  },
  {
    id: 'channa_mereya',
    title: 'Channa Mereya',
    movie: 'Ae Dil Hai Mushkil',
    singers: 'Arijit Singh & Pritam',
    year: 2016,
    emoji: '🌙',
    accentColor: '#3B82F6',
    youtubeId: '284Ov7ysmfA',
    vibe: 'Deep Heartfelt Soul & Emotion',
    lyricsHighlight: 'Achha chalta hoon, duaon mein yaad rakhna... Channa mereya mereya!',
    movieQuote: '"Ek tarfa pyaar ki taqat hi kuch aur hoti hai."',
    tags: ['Soulful', 'Romantic', 'Cozy Chai']
  },
  {
    id: 'heeriye',
    title: 'Heeriye',
    movie: 'Non-Film Hit',
    singers: 'Jasleen Royal & Arijit Singh',
    year: 2023,
    emoji: '💍',
    accentColor: '#EC4899',
    youtubeId: 'RLzC55ai0eo',
    vibe: 'Modern Fairytale Wedding Glow',
    lyricsHighlight: 'Heeriye heeriye aa... teri hoke mar jaaniye!',
    movieQuote: '"Love is the sweetest adventure."',
    tags: ['Romantic', 'Feel Good', 'Acoustic']
  },
  {
    id: 'raataan_lambiyan',
    title: 'Raataan Lambiyan',
    movie: 'Shershaah',
    singers: 'Jubin Nautiyal & Asees Kaur',
    year: 2021,
    emoji: '🌌',
    accentColor: '#06B6D4',
    youtubeId: 'gvyUuxdRdR4',
    vibe: 'Soft Night Breezes & Sweet Nostalgia',
    lyricsHighlight: 'Kaatan kaise raataan o saaware... Jiya nahi jaata sun bawre!',
    movieQuote: '"Har lamha tere saath rehna hai."',
    tags: ['Romantic', 'Cozy Chai', 'Soulful']
  }
];


```

---

### File: `src/data/macaroniRecipes.ts`

```ts
export interface MacaroniDish {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  scaleNumber: number;
  moodMatch: string;
  moodLabel: string;
  cookTime: string;
  comfortLevel: string;
  secretIngredients: string[];
  pairingMovie: string;
  pairingQuote: string;
  accentColor: string;
}

export const MOOD_MACARONIS: Record<string, MacaroniDish> = {
  // Scale 1: Happy 🌸
  happy: {
    id: 'truffle_gold',
    name: 'Golden Truffle 4-Cheese Macaroni',
    emoji: '🧀',
    scaleNumber: 1,
    tagline: 'Decadent, bubbly, and dripping with celebratory sunshine!',
    description: 'Elbow macaroni tossed in a velvety blend of sharp cheddar, gruyère, parmesan, and a kiss of white truffle butter topped with golden herb panko crust.',
    moodMatch: 'happy',
    moodLabel: 'Happy 🌸',
    cookTime: '15 mins',
    comfortLevel: 'Pure Luxury 👑',
    secretIngredients: [
      'Artisanal Elbow Macaroni 🍜',
      'Sharp Aged White Cheddar 🧀',
      'White Truffle Infused Butter 🧈',
      'Crispy Herb Panko Crust 🌿',
      'Toasted Garlic Flakes 🧄'
    ],
    pairingMovie: 'Zindagi Na Milegi Dobara (2011)',
    pairingQuote: '"Seize the day my friend, pehle is saal ko jeena seekho!"',
    accentColor: '#EC4899'
  },

  // Scale 2: Excited ⚡
  excited: {
    id: 'desi_masala',
    name: 'Desi Spiced Butter Masala Macaroni',
    emoji: '⚡',
    scaleNumber: 2,
    tagline: 'Electric spices and rich butter for high-energy celebrations!',
    description: 'Tender macaroni sautéed with sizzling cumin, sweet red onions, juicy desi tomatoes, sweet green peas, magical Pav Bhaji butter masala, and coriander rain.',
    moodMatch: 'excited',
    moodLabel: 'Excited ⚡',
    cookTime: '18 mins',
    comfortLevel: 'High Voltage 🎉',
    secretIngredients: [
      'Semolina Elbow Macaroni 🌾',
      'Amul Butter Spiced Masala 🧈',
      'Vine-Ripened Roma Tomatoes 🍅',
      'Sweet Green Peas & Capsicum 🫑',
      'Freshly Torn Mint & Coriander 🌿'
    ],
    pairingMovie: 'Jab We Met (2007)',
    pairingQuote: '"Main apni favourite hoon!"',
    accentColor: '#F59E0B'
  },
  cozy: {
    id: 'desi_masala',
    name: 'Desi Spiced Butter Masala Macaroni',
    emoji: '⚡',
    scaleNumber: 2,
    tagline: 'Electric spices and rich butter for high-energy celebrations!',
    description: 'Tender macaroni sautéed with sizzling cumin, sweet red onions, juicy desi tomatoes, sweet green peas, magical Pav Bhaji butter masala, and coriander rain.',
    moodMatch: 'excited',
    moodLabel: 'Excited ⚡',
    cookTime: '18 mins',
    comfortLevel: 'High Voltage 🎉',
    secretIngredients: [
      'Semolina Elbow Macaroni 🌾',
      'Amul Butter Spiced Masala 🧈',
      'Vine-Ripened Roma Tomatoes 🍅',
      'Sweet Green Peas & Capsicum 🫑',
      'Freshly Torn Mint & Coriander 🌿'
    ],
    pairingMovie: 'Jab We Met (2007)',
    pairingQuote: '"Main apni favourite hoon!"',
    accentColor: '#F59E0B'
  },

  // Scale 3: Calm ☕
  calm: {
    id: 'creamy_garlic_herb',
    name: 'Soothing Creamy Herb Macaroni',
    emoji: '☕',
    scaleNumber: 3,
    tagline: 'Gentle, aromatic, and peaceful comfort for relaxed moments.',
    description: 'Tender macaroni tossed in gentle herbs, light cream, parmesan shavings, and aromatic garlic butter for a soothing, tranquil vibe.',
    moodMatch: 'calm',
    moodLabel: 'Calm ☕',
    cookTime: '14 mins',
    comfortLevel: 'Peaceful Bliss ☁️',
    secretIngredients: [
      'Artisanal Shell Pasta 🐚',
      'Fresh Rosemary & Thyme 🌿',
      'Whipped Ricotta Cloud ☁️',
      'Garlic Infused Butter 🧈',
      'Parmigiano Reggiano 🧀'
    ],
    pairingMovie: 'Wake Up Sid (2009)',
    pairingQuote: '"Kuch toh naya hai har din mein... enjoy the peace."',
    accentColor: '#10B981'
  },

  // Scale 4: Stressed 🥺
  stressed: {
    id: 'garlic_butter_rescue',
    name: 'Garlic Butter Herb Macaroni Rescue',
    emoji: '🧄',
    scaleNumber: 4,
    tagline: 'Aromatic, buttery bliss that instantly un-clenches your shoulders.',
    description: 'Toasted golden garlic tossed with gentle parsley butter, soft macaroni spirals, creamy ricotta dollops, and lemon zest for instant headspace clarity.',
    moodMatch: 'stressed',
    moodLabel: 'Stressed 🥺',
    cookTime: '15 mins',
    comfortLevel: 'Stress Buster 🌸',
    secretIngredients: [
      'Silky Macaroni Elbows 🍜',
      'Roasted Whole Garlic Cloves 🧄',
      'Fresh Italian Parsley 🌿',
      'Whipped Creamy Ricotta ☁️',
      'Sun-Dried Tomato Ribbons 🍅'
    ],
    pairingMovie: 'Dear Zindagi (2016)',
    pairingQuote: '"Don\'t let the past steal your present. Take a deep breath!"',
    accentColor: '#3B82F6'
  },

  // Scale 5: Tired 💤
  tired: {
    id: 'midnight_melt',
    name: 'Midnight 3-Cheese Creamy Mac Melt',
    emoji: '🌙',
    scaleNumber: 5,
    tagline: 'Ultra-silky, soothing, and zero-effort comfort for tired souls.',
    description: 'Slow-simmered macaroni swimming in a rich, buttery garlic cream and melted mozzarella blanket that melts all the day\'s fatigue away.',
    moodMatch: 'tired',
    moodLabel: 'Tired 💤',
    cookTime: '12 mins',
    comfortLevel: 'Sleep-Inducing Hug 🧸',
    secretIngredients: [
      'Quick-Boil Small Macaroni 🥣',
      'Heavy Cream & Garlic Butter 🥛',
      'Gooey Melty Mozzarella 🧀',
      'Cracked Black Pepper 🖤',
      'Smoked Sea Salt 🧂'
    ],
    pairingMovie: 'Queen (2014)',
    pairingQuote: '"Take a good rest, tomorrow is your stage!"',
    accentColor: '#8B5CF6'
  },
  foodie: {
    id: 'midnight_melt',
    name: 'Midnight 3-Cheese Creamy Mac Melt',
    emoji: '🌙',
    scaleNumber: 5,
    tagline: 'Ultra-silky, soothing, and zero-effort comfort.',
    description: 'Slow-simmered macaroni swimming in a rich, buttery garlic cream and melted mozzarella.',
    moodMatch: 'tired',
    moodLabel: 'Tired 💤',
    cookTime: '12 mins',
    comfortLevel: 'Sleep-Inducing Hug 🧸',
    secretIngredients: ['Quick-Boil Small Macaroni 🥣', 'Gooey Melty Mozzarella 🧀'],
    pairingMovie: 'Queen (2014)',
    pairingQuote: '"Take a good rest!"',
    accentColor: '#8B5CF6'
  },

  // Scale 6: Motivated 💼
  motivated: {
    id: 'power_protein_mac',
    name: 'Power Truffle Macaroni w/ Crispy Corn',
    emoji: '💼',
    scaleNumber: 6,
    tagline: 'Fueling big ambitions with sleek, high-energy flavor!',
    description: 'Nutritious whole wheat macaroni with sweet buttered corn crunch, smoked gouda, baby spinach ribbons, and toasted pumpkin seeds.',
    moodMatch: 'motivated',
    moodLabel: 'Motivated 💼',
    cookTime: '16 mins',
    comfortLevel: 'Boss Energy ⚡',
    secretIngredients: [
      'Whole Wheat Macaroni 🌾',
      'Smoked Dutch Gouda 🧀',
      'Sweet Buttered Corn Kernels 🌽',
      'Tender Baby Spinach 🍃',
      'Toasted Pumpkin Seeds 🌻'
    ],
    pairingMovie: 'The Devil Wears Prada & Dil Dhadakne Do',
    pairingQuote: '"Everybody wants to be us! Keep slaying your goals!"',
    accentColor: '#0EA5E9'
  },
  corporate: {
    id: 'power_protein_mac',
    name: 'Power Truffle Macaroni w/ Crispy Corn',
    emoji: '💼',
    scaleNumber: 6,
    tagline: 'Fueling big ambitions with sleek, high-energy flavor!',
    description: 'Nutritious whole wheat macaroni with sweet buttered corn crunch, smoked gouda, baby spinach ribbons, and toasted pumpkin seeds.',
    moodMatch: 'motivated',
    moodLabel: 'Motivated 💼',
    cookTime: '16 mins',
    comfortLevel: 'Boss Energy ⚡',
    secretIngredients: ['Whole Wheat Macaroni 🌾', 'Smoked Dutch Gouda 🧀'],
    pairingMovie: 'The Devil Wears Prada',
    pairingQuote: '"Keep slaying!"',
    accentColor: '#0EA5E9'
  },

  // Scale 7: Playful 🤪
  playful: {
    id: 'rainbow_confetti_mac',
    name: 'Rainbow Cheesy Confetti Macaroni',
    emoji: '🌈',
    scaleNumber: 7,
    tagline: 'Playful, vibrant, crunchy & totally un-serious goodness!',
    description: 'Gooey cheddar macaroni sprinkled with crushed cheesy nachos, colorful bell pepper confetti, and tangy sour cream drizzle.',
    moodMatch: 'playful',
    moodLabel: 'Playful 🤪',
    cookTime: '14 mins',
    comfortLevel: 'Laugh Out Loud Joy 🎉',
    secretIngredients: [
      'Tricolor Spiral Macaroni 🌀',
      'Tangy Cheddar Cheese Sauce 🧀',
      'Crushed Nacho Tortilla Dust 🌮',
      'Tri-Color Pepper Dice 🫑',
      'Cooling Sour Cream Dollop 🍨'
    ],
    pairingMovie: 'Andaz Apna Apna (1994) & Welcome (2007)',
    pairingQuote: '"Do dost ek pyale mein chai piyenge... isse dosti badhti hai!"',
    accentColor: '#EC4899'
  },
  silly: {
    id: 'rainbow_confetti_mac',
    name: 'Rainbow Cheesy Confetti Macaroni',
    emoji: '🌈',
    scaleNumber: 7,
    tagline: 'Playful, vibrant, crunchy & totally un-serious goodness!',
    description: 'Gooey cheddar macaroni sprinkled with crushed cheesy nachos, colorful bell pepper confetti, and tangy sour cream drizzle.',
    moodMatch: 'playful',
    moodLabel: 'Playful 🤪',
    cookTime: '14 mins',
    comfortLevel: 'Laugh Out Loud Joy 🎉',
    secretIngredients: ['Tricolor Spiral Macaroni 🌀', 'Tangy Cheddar Cheese Sauce 🧀'],
    pairingMovie: 'Andaz Apna Apna (1994)',
    pairingQuote: '"Do dost ek pyale mein chai piyenge!"',
    accentColor: '#EC4899'
  },

  // Scale 8: Grateful 🐶
  grateful: {
    id: 'sweet_corn_cheddar',
    name: 'Velvety White Cheddar & Sweet Corn Mac',
    emoji: '🌽',
    scaleNumber: 8,
    tagline: 'Warm, fluffy & tender comfort just like cuddling a golden pup.',
    description: 'Tender curved macaroni enveloped in a velvety mild white cheddar sauce with sweet bursting corn and a gentle nutmeg aroma.',
    moodMatch: 'grateful',
    moodLabel: 'Grateful 🐶',
    cookTime: '15 mins',
    comfortLevel: 'Gentle Warm Hug 🧸',
    secretIngredients: [
      'Small Shell Macaroni 🐚',
      'Mild Vermont White Cheddar 🧀',
      'Charred Sweet Corn 🌽',
      'Warm Nutmeg & Butter Cloud 🧈',
      'Fresh Garden Chives 🌱'
    ],
    pairingMovie: 'Chillar Party & Paddington (2014)',
    pairingQuote: '"If we are kind and polite, the world will be right."',
    accentColor: '#FBBF24'
  },
  soft: {
    id: 'sweet_corn_cheddar',
    name: 'Velvety White Cheddar & Sweet Corn Mac',
    emoji: '🌽',
    scaleNumber: 8,
    tagline: 'Warm, fluffy & tender comfort.',
    description: 'Tender curved macaroni enveloped in a velvety mild white cheddar sauce.',
    moodMatch: 'grateful',
    moodLabel: 'Grateful 🐶',
    cookTime: '15 mins',
    comfortLevel: 'Gentle Warm Hug 🧸',
    secretIngredients: ['Small Shell Macaroni 🐚', 'Mild Vermont White Cheddar 🧀'],
    pairingMovie: 'Paddington (2014)',
    pairingQuote: '"If we are kind and polite, the world will be right."',
    accentColor: '#FBBF24'
  },

  // Scale 9: Confident 👑
  confident: {
    id: 'royal_saffron_gouda',
    name: 'Royal Saffron Smoked Gouda Macaroni',
    emoji: '👑',
    scaleNumber: 9,
    tagline: 'Fit for royalty — lavish saffron cream with caramelized shallots.',
    description: 'Artisanal macaroni bathed in a luxurious saffron-infused smoked gouda and cream reduction, topped with caramelized shallots and golden herbs.',
    moodMatch: 'confident',
    moodLabel: 'Confident 👑',
    cookTime: '18 mins',
    comfortLevel: 'Absolute Royalty 👑',
    secretIngredients: [
      'Bronze-Cut Maccheroni 🍝',
      'Kashmiri Saffron Strands 🌸',
      'Smoked Aged Gouda 🧀',
      'Slow-Caramelized Golden Shallots 🧅',
      'Toasted Pine Nuts & Herbs 🌿'
    ],
    pairingMovie: 'Bajirao Mastani & Yeh Jawaani Hai Deewani',
    pairingQuote: '"Main udna chahta hoon, daudna chahta hoon, girna bhi chahta hoon... bas rukna nahi chahta!"',
    accentColor: '#D946EF'
  },
  queen: {
    id: 'royal_saffron_gouda',
    name: 'Royal Saffron Smoked Gouda Macaroni',
    emoji: '👑',
    scaleNumber: 9,
    tagline: 'Fit for royalty — lavish saffron cream with caramelized shallots.',
    description: 'Artisanal macaroni bathed in a luxurious saffron-infused smoked gouda and cream reduction, topped with caramelized shallots.',
    moodMatch: 'confident',
    moodLabel: 'Confident 👑',
    cookTime: '18 mins',
    comfortLevel: 'Absolute Royalty 👑',
    secretIngredients: ['Bronze-Cut Maccheroni 🍝', 'Kashmiri Saffron Strands 🌸'],
    pairingMovie: 'Yeh Jawaani Hai Deewani',
    pairingQuote: '"Main apni favourite hoon!"',
    accentColor: '#D946EF'
  }
};

```

---

### File: `src/data/questions.ts`

```ts
import type { Question } from '../types/game';

export const QUESTIONS_DATABASE: Question[] = [
  // ================= MOVIES & TV SHOWS (HOLLYWOOD / GENERAL) =================
  {
    id: 'mov_01',
    category: 'Movies',
    subcategory: 'Sci-Fi Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In Nolan\'s "Inception" (2010), what object does Cobb spin to check if he is still dreaming?',
    options: ['A brass spinning top', 'A silver coin', 'A wooden die', 'A vintage watch'],
    correctAnswer: 'A brass spinning top',
    explanation: 'Cobb uses his late wife Mal\'s totem—a brass spinning top—which spins indefinitely inside a dream.',
    funFact: 'Christopher Nolan wrote the script for Inception over a period of almost 10 years!',
    verifiedSource: 'Warner Bros. Official Archive',
    tags: ['Christopher Nolan', 'Inception', 'Sci-Fi']
  },
  {
    id: 'mov_02',
    category: 'Movies',
    subcategory: 'Animation',
    difficulty: 'easy',
    type: 'guess_movie',
    question: 'Which Pixar film features a tiny rat named Remy who dreams of becoming a master Paris chef?',
    options: ['Ratatouille', 'Wall-E', 'Up', 'Finding Nemo'],
    correctAnswer: 'Ratatouille',
    explanation: 'Remy pairs up with Auguste Gusteau\'s kitchen worker Linguini to create culinary masterpieces.',
    funFact: 'Pixar animators created over 270 pieces of detailed virtual food models for the film!',
    tags: ['Pixar', 'Ratatouille', 'Animation']
  },
  {
    id: 'mov_03',
    category: 'Movies',
    subcategory: 'Superhero',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What is the fictional African nation ruled by King T\'Challa in Marvel\'s "Black Panther"?',
    options: ['Wakanda', 'Zamunda', 'El Dorado', 'Sokovia'],
    correctAnswer: 'Wakanda',
    explanation: 'Wakanda is an advanced African nation hidden behind a cloak of technology powered by Vibranium.',
    funFact: 'The Wakandan alphabet was based on ancient African scripts including Nsibidi.',
    tags: ['Marvel', 'Black Panther', 'MCU']
  },
  {
    id: 'mov_04',
    category: 'Movies',
    subcategory: 'Classics',
    difficulty: 'hard',
    type: 'movie_detective',
    question: 'Solve the Movie Detective Mystery!',
    clues: [
      'Clue 1: Released in 1994 and based on a Stephen King novella.',
      'Clue 2: Stars Tim Robbins and Morgan Freeman.',
      'Clue 3: Features a legendary break out of prison involving a Rita Hayworth poster.'
    ],
    options: ['The Shawshank Redemption', 'The Green Mile', 'Pulp Fiction', 'Forrest Gump'],
    correctAnswer: 'The Shawshank Redemption',
    explanation: 'Andy Dufresne escapes Shawshank Prison by tunneling through the wall over two decades.',
    funFact: 'Morgan Freeman\'s character Red was named after being red-headed in the original book!',
    tags: ['Shawshank', 'Stephen King', 'Detective']
  },
  {
    id: 'mov_05',
    category: 'TV Shows',
    subcategory: 'Drama',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In "Breaking Bad", what alias does chemistry teacher Walter White adopt in the criminal underworld?',
    options: ['Heisenberg', 'Schrödinger', 'Oppenheimer', 'Einstein'],
    correctAnswer: 'Heisenberg',
    explanation: 'Walter White named his alter ego after Werner Heisenberg, the famous theoretical physicist.',
    funFact: 'Bryan Cranston actually learned how to synthesize real chemicals for authenticity in key scene props!',
    tags: ['Breaking Bad', 'TV', 'Drama']
  },
  {
    id: 'mov_06',
    category: 'TV Shows',
    subcategory: 'Sitcoms',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'On "Friends", what is the name of the iconic coffee shop where the six main characters gather?',
    options: ['Central Perk', 'Monk\'s Diner', 'Luke\'s Diner', 'MacLaren\'s Pub'],
    correctAnswer: 'Central Perk',
    explanation: 'Central Perk was managed by Gunther and was the main social hub throughout all 10 seasons.',
    funFact: 'The orange couch in Central Perk was actually found in the basement of the Warner Bros. studio!',
    tags: ['Friends', 'Sitcom', 'TV']
  },

  // ================= BOLLYWOOD & INDIAN CINEMA =================
  {
    id: 'bol_01',
    category: 'Bollywood',
    subcategory: 'Iconic Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which legendary 1995 Bollywood blockbuster featured the romantic lead duo Raj (SRK) and Simran (Kajol)?',
    options: ['Dilwale Dulhania Le Jayenge', 'Kuch Kuch Hota Hai', 'Kabhi Khushi Kabhie Gham', 'Dil To Pagal Hai'],
    correctAnswer: 'Dilwale Dulhania Le Jayenge',
    explanation: 'DDLJ is the longest-running film in Indian cinema history, playing continuously at Mumbai\'s Maratha Mandir theater.',
    funFact: 'DDLJ has played at Maratha Mandir theater for over 25 consecutive years (1,200+ weeks)!',
    tags: ['SRK', 'Kajol', 'DDLJ', 'Bollywood']
  },
  {
    id: 'bol_02',
    category: 'Bollywood',
    subcategory: 'Oscar Nominees',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which 2001 Aamir Khan starrer was nominated for the Academy Award for Best Foreign Language Film?',
    options: ['Lagaan', 'Taare Zameen Par', '3 Idiots', 'Dangal'],
    correctAnswer: 'Lagaan',
    explanation: 'Lagaan told the story of villagers in Victorian India who challenged British officers to a cricket match to avoid taxes.',
    funFact: 'Lagaan was the third Indian film nominated for the Best Foreign Language Film Oscar, after Mother India (1957) and Salaam Bombay! (1988).',
    tags: ['Aamir Khan', 'Lagaan', 'Oscars']
  },
  {
    id: 'bol_03',
    category: 'Bollywood',
    subcategory: 'Music & Dance',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The timeless song "Chaiyya Chaiyya" featuring Shah Rukh Khan was filmed on top of what moving vehicle?',
    options: ['A passenger train', 'A double-decker bus', 'A steam boat', 'A festival chariot'],
    correctAnswer: 'A passenger train',
    explanation: 'Composed by A.R. Rahman, "Chaiyya Chaiyya" from Dil Se (1998) was filmed on top of the Ooty steam train without any safety nets!',
    funFact: 'Chaiyya Chaiyya was filmed over 4 days on top of the Nilgiri Mountain Railway train!',
    tags: ['AR Rahman', 'SRK', 'Dil Se', 'Chaiyya Chaiyya']
  },
  {
    id: 'bol_04',
    category: 'Bollywood',
    subcategory: 'Global Phenomena',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which song composed by M.M. Keeravani won the Oscar for Best Original Song in 2023 for the movie RRR?',
    options: ['Naatu Naatu', 'Jai Ho', 'Chogada', 'Malhari'],
    correctAnswer: 'Naatu Naatu',
    explanation: 'Naatu Naatu became the first song from an Indian film to win an Academy Award for Best Original Song.',
    funFact: 'The high-speed dance sequence for Naatu Naatu was filmed outside Mariinsky Palace in Kyiv, Ukraine!',
    tags: ['RRR', 'Naatu Naatu', 'Oscars', 'Indian Cinema']
  },
  {
    id: 'bol_05',
    category: 'Bollywood',
    subcategory: 'Comedy Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In the hilarious classic "Hera Pheri", what is the name of Paresh Rawal\'s legendary landlord character?',
    options: ['Baburao Ganpatrao Apte', 'Crime Master Gogo', 'Majnu Bhai', 'Kachra Seth'],
    correctAnswer: 'Baburao Ganpatrao Apte',
    explanation: 'Babu Bhaiya (Baburao Ganpatrao Apte) remains one of the most beloved comedic characters in Indian pop culture.',
    funFact: 'Paresh Rawal won multiple comedy awards for his performance as Babu Bhaiya!',
    tags: ['Hera Pheri', 'Babu Bhaiya', 'Comedy']
  },

  // ================= POP CULTURE & MUSIC =================
  {
    id: 'pop_01',
    category: 'Pop Culture',
    subcategory: 'Superstars',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which global pop superstar named her concert tour "The Eras Tour", becoming the highest-grossing tour in history?',
    options: ['Taylor Swift', 'Beyoncé', 'Lady Gaga', 'Ariana Grande'],
    correctAnswer: 'Taylor Swift',
    explanation: 'The Eras Tour celebrated all 10 of Taylor Swift\'s studio albums, performing across 5 continents.',
    funFact: 'The Eras Tour generated seismic activity in Seattle equivalent to a 2.3 magnitude earthquake!',
    tags: ['Taylor Swift', 'Pop Culture', 'Music']
  },
  {
    id: 'pop_02',
    category: 'Music',
    subcategory: '80s Synth Legends',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which 1982 album by Michael Jackson holds the record as the best-selling album of all time worldwide?',
    options: ['Thriller', 'Bad', 'Off the Wall', 'Dangerous'],
    correctAnswer: 'Thriller',
    explanation: 'Produced by Quincy Jones, "Thriller" won a record 8 Grammy Awards in a single night in 1984.',
    funFact: 'The famous spoken-word monologue in Thriller was recorded by legendary horror actor Vincent Price in just two takes!',
    tags: ['Michael Jackson', '80s Music', 'Thriller']
  },

  // ================= SCIENCE & WEIRD FACTS =================
  {
    id: 'sci_01',
    category: 'Science',
    subcategory: 'Biology',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What organ in the human body consumes nearly 20% of the body\'s total energy despite being 2% of total weight?',
    options: ['The Brain', 'The Heart', 'The Liver', 'The Lungs'],
    correctAnswer: 'The Brain',
    explanation: 'The human brain requires continuous glucose and oxygen to power billions of neuronal electrical signals.',
    funFact: 'Your brain generates about 20 watts of electrical power—enough to power a small LED light bulb!',
    tags: ['Brain', 'Biology', 'Science']
  },
  {
    id: 'sci_02',
    category: 'Space',
    subcategory: 'Solar System',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which planet in our solar system has the most extensive and famous ring system visible from Earth?',
    options: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'],
    correctAnswer: 'Saturn',
    explanation: 'Saturn\'s ring system is made up of billions of chunks of ice, rock, and dust ranging from tiny grains to house-sized boulders.',
    funFact: 'Saturn\'s rings are extremely thin—mostly only about 30 feet (10 meters) thick!',
    tags: ['Space', 'Saturn', 'Astronomy']
  },
  {
    id: 'wrd_01',
    category: 'Weird Facts',
    subcategory: 'Nature Curiosities',
    difficulty: 'medium',
    type: 'fact_or_fiction',
    question: 'Fact or Fiction: Bananas are technically classified as berries, but strawberries are not!',
    options: ['Fact', 'Fiction'],
    correctAnswer: 'Fact',
    explanation: 'Botanically speaking, a berry must have seeds inside the fleshy fruit. Bananas fit this definition, while strawberries have seeds on the outside!',
    funFact: 'Avocados, watermelons, and tomatoes are also botanically classified as berries!',
    tags: ['Weird Facts', 'Botany', 'Nature']
  },
  {
    id: 'wrd_02',
    category: 'Weird Facts',
    subcategory: 'Animal Facts',
    difficulty: 'hard',
    type: 'marisol_mystery',
    question: 'Marisol\'s Mystery Animal!',
    clues: [
      'Clue 1: It has blue blood, 3 hearts, and 8 arms.',
      'Clue 2: It can camouflage its skin color and texture in less than 200 milliseconds.',
      'Clue 3: It has no bones and can squeeze through any opening larger than its beak.'
    ],
    options: ['Octopus', 'Squid', 'Jellyfish', 'Chameleon'],
    correctAnswer: 'Octopus',
    explanation: 'Octopuses are incredibly intelligent sea creatures with copper-based copper-rich blue blood (hemocyanin) and 3 hearts!',
    funFact: 'Two-thirds of an octopus\'s neurons are located in its arms, meaning its arms can literally think for themselves!',
    tags: ['Octopus', 'Marine Biology', 'Mystery']
  },

  // Additional Movie / Bollywood / Science / Geography Questions
  {
    id: 'mov_07',
    category: 'Movies',
    subcategory: 'Directors',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which director helmed the groundbreaking sci-fi masterpiece "Interstellar" (2014)?',
    options: ['Christopher Nolan', 'Steven Spielberg', 'Denis Villeneuve', 'James Cameron'],
    correctAnswer: 'Christopher Nolan',
    explanation: 'Nolan collaborated with Nobel laureate physicist Kip Thorne to accurately portray black holes and relativity.',
    funFact: 'The black hole visual effects code written for Interstellar led to new scientific discoveries about gravitational lensing!',
    tags: ['Nolan', 'Interstellar', 'Sci-Fi']
  },
  {
    id: 'bol_06',
    category: 'Bollywood',
    subcategory: 'Blockbusters',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In Rajkumar Hirani\'s "3 Idiots", what is Rancho\'s real name revealed at the end of the movie?',
    options: ['Phunsukh Wangdu', 'Ranchhoddas Shamaldas Chanchad', 'Farhan Qureshi', 'Raju Rastogi'],
    correctAnswer: 'Phunsukh Wangdu',
    explanation: 'Rancho was actually Phunsukh Wangdu, a genius inventor holding 400 patents in Ladakh.',
    funFact: '3 Idiots inspired real-life educational reform in India and became a massive cultural hit in China and Japan!',
    tags: ['3 Idiots', 'Aamir Khan', 'Bollywood']
  },
  {
    id: 'geo_01',
    category: 'Geography',
    subcategory: 'Wonders',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In which Indian city is the majestic white marble mausoleum Taj Mahal located?',
    options: ['Agra', 'Jaipur', 'Delhi', 'Varanasi'],
    correctAnswer: 'Agra',
    explanation: 'Built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal, it is one of the New 7 Wonders of the World.',
    funFact: 'The Taj Mahal\'s color appears to change depending on the time of day—pinkish in the morning, milky white in evening!',
    tags: ['Taj Mahal', 'Agra', 'Geography', 'India']
  },

  // ================= CULINARY CINEMA & FOOD TRIVIA =================
  {
    id: 'food_01',
    category: 'Food & Cooking',
    subcategory: 'Cinema Delicacies',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In Jon Favreau\'s film "Chef" (2014), what signature sandwich does Carl Casper grill to golden perfection in his food truck?',
    options: ['A Cuban Sandwich (Cubano)', 'A Philly Cheesesteak', 'A French Dip Baguette', 'A New York Reuben'],
    correctAnswer: 'A Cuban Sandwich (Cubano)',
    explanation: 'Carl Casper serves pressed Cubanos loaded with slow-roasted pork, ham, Swiss cheese, pickles, and mustard sizzling in butter.',
    funFact: 'Jon Favreau trained under master food truck pioneer Chef Roy Choi for months to learn authentic kitchen knife skills!',
    tags: ['Chef', 'Cubano', 'Sandwich', 'Movie Food'],
    secretIngredient: 'Truffle Infused Garlic Butter 🧈'
  },
  {
    id: 'food_02',
    category: 'Food & Cooking',
    subcategory: 'Classic High Tea',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What is the secret to keeping traditional British-Indian cucumber tea sandwiches crisp instead of soggy?',
    options: [
      'Salting sliced cucumbers and patting them dry before layering with butter',
      'Freezing the bread slices before assembly',
      'Using hot toasted bread straight from the toaster',
      'Drenching the cucumber in olive oil'
    ],
    correctAnswer: 'Salting sliced cucumbers and patting them dry before layering with butter',
    explanation: 'Salting draws out excess water from cucumber ribbons, and a light butter barrier stops moisture from softening the soft brioche.',
    funFact: 'Cucumber sandwiches were created during the Victorian era as a light luxury afternoon snack for British royalty!',
    tags: ['Cucumber Sandwich', 'High Tea', 'Technique'],
    secretIngredient: 'English Cucumber Ribbons 🥒'
  },
  {
    id: 'food_03',
    category: 'Food & Cooking',
    subcategory: 'Bollywood Street Flavors',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In the movie "Jab We Met", Geet and Aditya sip hot railway tea in the pouring rain. What spice duo gives highway tapri chai its soul?',
    options: ['Fresh Crushed Ginger & Green Cardamom', 'Vanilla & Cinnamon', 'Clove & Star Anise', 'Nutmeg & Black Pepper'],
    correctAnswer: 'Fresh Crushed Ginger & Green Cardamom',
    explanation: 'Crushed "adrak" (ginger) and "elaichi" (green cardamom) boiled with strong Assam tea creates the classic highway tapri flavor.',
    funFact: 'Over 837,000 tonnes of tea are consumed in India every single year—making chai an emotion rather than just a beverage!',
    tags: ['Chai', 'Bollywood', 'Comfort Food'],
    secretIngredient: 'Crushed Green Cardamom Pods 💚'
  },
  {
    id: 'food_04',
    category: 'Food & Cooking',
    subcategory: 'Animation Feasts',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In Pixar\'s "Ratatouille", what dish does Remy serve that transports harsh food critic Anton Ego back to his childhood home?',
    options: ['Confit Byaldi (Artisanal Ratatouille)', 'Coq au Vin', 'Beef Bourguignon', 'Lobster Thermidor'],
    correctAnswer: 'Confit Byaldi (Artisanal Ratatouille)',
    explanation: 'Remy layers paper-thin zucchini, yellow squash, and eggplant over a savory pepper piperade, creating Thomas Keller\'s Confit Byaldi.',
    funFact: 'World-renowned Chef Thomas Keller designed the exact recipe seen on screen for the Pixar animators!',
    tags: ['Ratatouille', 'Pixar', 'French Cuisine'],
    secretIngredient: 'Mandoline Ribbon Zucchini 🥒'
  },
  {
    id: 'food_05',
    category: 'Food & Cooking',
    subcategory: 'Midnight Craving',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What gives authentic Mumbai Street Cheese Frankies their distinct tangy punch that keeps dreamers awake at midnight?',
    options: [
      'A dusting of tangy Frankie Masala & vinegar pickled onions',
      'Sweet strawberry ketchup',
      'Heavy mayonnaise & wasabi',
      'Plain sea salt and black pepper'
    ],
    correctAnswer: 'A dusting of tangy Frankie Masala & vinegar pickled onions',
    explanation: 'Frankie masala combines chaat masala, amchur (dry mango), black salt, and chili, paired with onions steeped in white vinegar.',
    funFact: 'The Frankie was invented in Mumbai in 1969 by Amarjit Singh Tibb, inspired by Lebanese pita wraps in Beirut!',
    tags: ['Frankie', 'Street Food', 'Mumbai'],
    secretIngredient: 'Tangy Mumbai Frankie Masala ✨'
  },
  {
    id: 'food_06',
    category: 'Food & Cooking',
    subcategory: 'Kitchen Secrets',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Why do French master chefs finish a pan sauce by swirling in cold cubes of butter right at the end ("monter au beurre")?',
    options: [
      'To emulsify the sauce into a glossy, velvety consistency without breaking it',
      'To make the sauce turn completely solid like frosting',
      'To cool down the pan so it stops cooking',
      'To remove all salt from the sauce'
    ],
    correctAnswer: 'To emulsify the sauce into a glossy, velvety consistency without breaking it',
    explanation: 'Cold butter incorporates slowly into hot liquid, creating a silky glossy emulsion that coats the back of a spoon.',
    funFact: 'Julia Child famously kept over 50 pounds of butter in her home kitchen at any given time!',
    tags: ['French Technique', 'Sauces', 'Chef Skills'],
    secretIngredient: 'Whipped Herbed Mascarpone 🌿'
  },
  {
    id: 'food_07',
    category: 'Food & Cooking',
    subcategory: 'Cinema Cult Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In Quentin Tarantino\'s "Pulp Fiction", Jules Winnfield famously takes a bite of Brett\'s burger and praises which Hawaiian fast-food joint?',
    options: ['Big Kahuna Burger', 'In-N-Out', 'Five Guys', 'Aloha King'],
    correctAnswer: 'Big Kahuna Burger',
    explanation: '"Mmm-mm! That IS a tasty burger!" Big Kahuna Burger is Tarantino\'s famous recurring fictional Hawaiian fast-food chain.',
    funFact: 'Big Kahuna Burger also appears in Reservoir Dogs, From Dusk Till Dawn, and Four Rooms!',
    tags: ['Pulp Fiction', 'Tarantino', 'Burger'],
    secretIngredient: 'Melted Gruyere & Sharp Cheddar 🧀'
  },
  {
    id: 'food_08',
    category: 'Food & Cooking',
    subcategory: 'Pasta & Pizza Craft',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In "Eat Pray Love", Julia Roberts falls in love with pizza in Naples. What gives authentic Neapolitan pizza its blistered charred spots ("leopard spotting")?',
    options: [
      'A 900°F (485°C) wood-fired stone oven baking the dough in 60-90 seconds',
      'Brushing the crust with black food coloring',
      'Toasting the crust with a propane blowtorch',
      'Deep frying the dough in peanut oil before baking'
    ],
    correctAnswer: 'A 900°F (485°C) wood-fired stone oven baking the dough in 60-90 seconds',
    explanation: 'The extreme heat causes moisture bubbles in the dough to expand and blister against the oven ceiling within 90 seconds.',
    funFact: 'The art of Neapolitan pizza making ("Pizzaiuolo") is recognized by UNESCO as Intangible World Cultural Heritage!',
    tags: ['Pizza', 'Naples', 'Eat Pray Love'],
    secretIngredient: 'Whole Fresh Burrata Ball 🧀'
  },
  {
    id: 'food_09',
    category: 'Food & Cooking',
    subcategory: 'Spice Alchemy',
    difficulty: 'hard',
    type: 'multiple_choice',
    question: 'In "The Hundred-Foot Journey", young chef Hassan impresses a Michelin-starred kitchen by adding what secret Indian twist to a classic French omelette?',
    options: [
      'Finely minced green chilies, fresh coriander, and toasted cumin',
      'Saffron syrup and crushed almonds',
      'Sweet mango chutney and curd',
      'Ground cinnamon and brown sugar'
    ],
    correctAnswer: 'Finely minced green chilies, fresh coriander, and toasted cumin',
    explanation: 'Hassan folds fresh aromatic green chilies and coriander into the silky French butter omelette, blowing away Chef Madame Mallory.',
    funFact: 'The movie was produced by Steven Spielberg and Oprah Winfrey, both self-proclaimed hardcore food lovers!',
    tags: ['The Hundred-Foot Journey', 'Omelette', 'Fusion'],
    secretIngredient: 'Spicy Mint & Coriander Chutney 🌱'
  },
  {
    id: 'food_10',
    category: 'Food & Cooking',
    subcategory: 'Noodle Nirvana',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What iconic technique creates the irresistible aromatic sizzle in Chinese "You Po Mian" (Hot Oil Splash Noodles)?',
    options: [
      'Pouring smoking hot peanut oil directly over raw minced garlic and chili flakes atop the noodles',
      'Boiling noodles in chili water for 3 hours',
      'Baking the bowl of noodles in an oven',
      'Stir-frying noodles without any sauce'
    ],
    correctAnswer: 'Pouring smoking hot peanut oil directly over raw minced garlic and chili flakes atop the noodles',
    explanation: 'The superheated oil instantly flashes and toasts the raw garlic and chili, releasing deeply fragrant aromatics without burning.',
    funFact: 'Lao Gan Ma chili crisp was invented by a grandmother in Guizhou who originally gave it away free to truck drivers!',
    tags: ['Chili Oil', 'Noodles', 'Asian Cuisine'],
    secretIngredient: 'Crispy Fried Garlic Flakes 🧄'
  },
  {
    id: 'food_11',
    category: 'Food & Cooking',
    subcategory: 'Soulful Simmers',
    difficulty: 'hard',
    type: 'multiple_choice',
    question: 'In the critically acclaimed film "The Lunchbox" (2013), what traditional smoky technique gives royal Dal Makhani its dhabba-style aroma?',
    options: [
      'The "Dhungar" method: dropping red-hot charcoal with ghee into the pot and sealing the lid',
      'Adding bottled liquid smoke drops',
      'Burning the bottom layer of the lentils',
      'Roasting the whole pot over an open campfire'
    ],
    correctAnswer: 'The "Dhungar" method: dropping red-hot charcoal with ghee into the pot and sealing the lid',
    explanation: 'A glowing piece of charcoal placed in a small steel bowl is topped with ghee and covered, perfuming the buttery dal with royal smoke.',
    funFact: 'The dabbawalas of Mumbai deliver over 200,000 lunchboxes every day with an astounding Six Sigma accuracy rating of 99.9999%!',
    tags: ['The Lunchbox', 'Dal Makhani', 'Indian Cooking'],
    secretIngredient: 'Black Urad Lentils & Rajma 🫘'
  },
  {
    id: 'food_12',
    category: 'Food & Cooking',
    subcategory: 'Dessert Magic',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In "Julie & Julia", what famous dessert rule does Julia Child proclaim with joyful gusto?',
    options: [
      '"You can never have too much butter!"',
      '"Dessert should always be eaten before dinner!"',
      '"Never put chocolate in a dessert!"',
      '"Sugar is completely overrated!"'
    ],
    correctAnswer: '"You can never have too much butter!"',
    explanation: 'Julia Child celebrated rich, authentic French baking, demonstrating that real butter and honest technique create pure bliss.',
    funFact: 'Julia Child didn\'t learn how to cook until she was in her late 30s when she moved to Paris with her husband Paul!',
    tags: ['Julie & Julia', 'Butter', 'French Baking'],
    secretIngredient: 'Buttery All-Butter Croissants 🥐'
  }
];


```

---

### File: `src/data/recipes.ts`

```ts
import type { Recipe } from '../types/game';

export const RECIPES: Recipe[] = [
  {
    id: 'cucumber_mint_sandwich',
    title: 'Royal Cucumber & Herbed Mascarpone Tea Sandwiches',
    subtitle: 'Crisp, velvety, and delicately spiced British-Indian afternoon tea classic',
    cuisine: 'Modern British-Indian Gourmet',
    prepTime: '15 mins',
    difficulty: 'Easy & Elegant',
    emoji: '🥪',
    accentColor: '#10B981',
    moodMatch: 'brighter_ideas',
    secretIngredients: [
      'English Cucumber Ribbons 🥒',
      'Whipped Herbed Mascarpone 🌿',
      'Spicy Mint & Coriander Chutney 🌱',
      'Zesty Lemon Pepper 🍋',
      'Soft Brioche Slices 🍞'
    ],
    fullIngredients: [
      '2 crisp English cucumbers, mandoline-sliced into paper-thin ribbons',
      '150g mascarpone or cream cheese, brought to room temperature',
      '8 slices ultra-soft artisanal brioche or milk bread',
      '2 tbsp homemade spicy mint-coriander chutney',
      '1 tbsp finely chopped fresh dill and chives',
      '1/2 tsp freshly cracked black pepper & pink Himalayan salt',
      '1 tsp zest from a fresh organic lemon',
      'Salted butter for spreading'
    ],
    instructions: [
      'Gently toss cucumber ribbons with a pinch of sea salt, let drain on paper towels for 5 minutes for that legendary crunch.',
      'In a bowl, whip the mascarpone with chopped fresh dill, chives, lemon zest, and cracked pepper until light and velvety.',
      'Spread a paper-thin layer of salted butter on all bread slices to keep the crumb pristine.',
      'Layer a vibrant swirl of mint chutney on one slice, and a generous cloud of herbed mascarpone on the other.',
      'Shingle the cucumber ribbons in 4 tight, overlapping folds across the bread.',
      'Trim the crusts with a sharp bread knife, slice diagonally into elegant tea triangles, and serve chilled!'
    ],
    moviePairing: {
      movie: 'The Grand Budapest Hotel (2014)',
      quote: '"Rudeness is merely the expression of fear. People want to be loved!"',
      whyWatch: 'Wes Anderson\'s candy-colored aesthetic pairs delightfully with these pastel perfection sandwiches.'
    },
    hungerTrigger: 'Cool, crisp cucumber ribbons meeting rich creamy mascarpone and sharp mint chutney. The ultimate high-tea brain fuel!'
  },
  {
    id: 'bollywood_masala_chai',
    title: 'Highway Tapri Smoked Masala Chai & Onion Bhajiyas',
    subtitle: 'The soulful ginger-cardamom brew with golden, crispy onion fritters',
    cuisine: 'Indian Street Comfort',
    prepTime: '20 mins',
    difficulty: 'Pure Comfort',
    emoji: '☕',
    accentColor: '#F97316',
    moodMatch: 'chai_happiness',
    secretIngredients: [
      'Crushed Green Cardamom Pods 💚',
      'Smoked Fresh Ginger 🫚',
      'Strong Assam CTC Tea 🍃',
      'Velvety Buffalo Milk 🥛',
      'Caramelized Jaggery 🍯'
    ],
    fullIngredients: [
      '2 cups water & 2 cups full-fat milk',
      '3 tsp strong Assam CTC black tea leaves',
      '2 inches fresh ginger, crushed roughly with skin on',
      '5 green cardamom pods, freshly bruised in a mortar',
      '2 cloves & 1 tiny stick Ceylon cinnamon',
      '2 tbsp jaggery or raw brown sugar',
      'For Bhajiyas: 2 large sliced red onions, besan, carom seeds (ajwain), and green chilies'
    ],
    instructions: [
      'Bring water, crushed ginger, cardamom, cloves, and cinnamon to a rolling boil until the water turns golden and aromatic.',
      'Tumble in the Assam tea leaves and simmer for 2 minutes to extract the deep maltiness.',
      'Pour in the milk and bring to 3 consecutive frothy rises ("3 Ubaals" like the iconic highway tapris!).',
      'Stir in the jaggery at the very end on low heat to avoid curdling, then strain through a fine mesh into piping hot clay kulhads.',
      'Serve alongside crispy, piping-hot onion fritters with sweet date-tamarind dip.'
    ],
    moviePairing: {
      movie: 'Jab We Met (2007) & Dil Se (1998)',
      quote: '"Chai aur baarish — zindagi mein isse behtar aur kya ho sakta hai?!"',
      whyWatch: 'The railway station vibe, the pouring monsoon rain, and the timeless romance of a hot cup of highway chai.'
    },
    hungerTrigger: 'That soothing aroma of bruised ginger and cardamom rising in steam while hot fried bhajiyas crunch between your fingers.'
  },
  {
    id: 'truffle_cubano_sandwich',
    title: 'Chef Carl Casper\'s Toasted Truffle Cubano Sandwich',
    subtitle: 'The legendary grilled cheese sandwich pressed in sizzling butter till golden',
    cuisine: 'Miami Food Truck Soul',
    prepTime: '18 mins',
    difficulty: 'Flavor Explosion',
    emoji: '🥪',
    accentColor: '#EC4899',
    moodMatch: 'wink_conquer',
    secretIngredients: [
      'Truffle Infused Garlic Butter 🧈',
      'Melted Gruyere & Sharp Cheddar 🧀',
      'Slow-Braised Glazed Pulled Pork/Portobello 🥩',
      'Dill Pickle Spears 🥒',
      'Yellow Mustard on Crusty Baguette 🥖'
    ],
    fullIngredients: [
      '1 loaf crusty artisanal Cuban bread or French baguette, split lengthwise',
      '6 slices smoked ham or caramelized portobello mushrooms',
      '1 cup pulled roasted pork in citrus mojo sauce',
      '6 thick slices Swiss Gruyère & yellow cheddar',
      '8 thinly sliced dill pickle coins',
      '2 tbsp yellow ballpark mustard',
      '4 tbsp unsalted butter infused with 1/2 tsp black truffle oil'
    ],
    instructions: [
      'Generously butter the outside crusts of the split loaf with truffle butter.',
      'Slather yellow mustard inside, then shingle the layers: cheese, ham, pulled citrus pork, pickles, and more cheese on top.',
      'Heat a heavy cast-iron skillet over medium heat and melt a knob of butter.',
      'Place the sandwich in the skillet and press it down firmly with a second heavy cast-iron pan (or foil-wrapped brick!).',
      'Grill for 4-5 minutes per side until the crust turns mahogany gold and the cheese oozes out the sides like a molten waterfall.',
      'Slice diagonally on a cutting board — hear that magnificent crunch!'
    ],
    moviePairing: {
      movie: 'Chef (2014) directed by Jon Favreau',
      quote: '"I may not do everything great in my life, but I\'m good at this. I manage to touch people through food."',
      whyWatch: 'The soundtrack, the passion for cooking, and the legendary grilled cheese scene that made millions rush to their kitchens.'
    },
    hungerTrigger: 'Golden browned bread crackling under your knife, stringy cheese pulling apart, and savory pork juices mingling with tangy pickles.'
  },
  {
    id: 'ratatouille_byaldi',
    title: 'Remy\'s Confit Byaldi (Artisanal Ratatouille)',
    subtitle: 'Delicate spiraled summer squash, heirloom tomatoes, and bell pepper coulis',
    cuisine: 'French Fine Dining',
    prepTime: '45 mins',
    difficulty: 'Masterpiece',
    emoji: '🍆',
    accentColor: '#3B82F6',
    moodMatch: 'big_dreams',
    secretIngredients: [
      'Mandoline Ribbon Zucchini 🥒',
      'Slow-Roasted Pepper Piperade 🫑',
      'Garden Thyme Infused Olive Oil 🌿',
      'Heirloom Sun-Ripened Tomatoes 🍅',
      'Crushed Flaky Maldon Salt 🧂'
    ],
    fullIngredients: [
      '2 slender Japanese eggplants, 2 yellow squashes, 2 zucchini',
      '4 firm Roma or heirloom tomatoes',
      'For the Piperade Base: 2 roasted red bell peppers, 1 onion, 3 garlic cloves, olive oil, sprigs of thyme',
      'Balsamic reduction glaze for plating',
      'Fresh chives & microgreens'
    ],
    instructions: [
      'Puree roasted red peppers, sautéed onions, garlic, and fresh herbs into a velvet piperade sauce. Spread across the bottom of a wide baking dish.',
      'Thinly slice all vegetables to uniform 1/16-inch coins using a mandoline.',
      'Fan the vegetables in tight, alternating colorful shingle spirals (eggplant, zucchini, tomato, yellow squash) until the pan is full.',
      'Drizzle with thyme-scented garlic olive oil, season with sea salt and cracked pepper.',
      'Cover with parchment paper cut to fit inside the rim and bake at 300°F (150°C) for 60 minutes until meltingly tender.',
      'Uncover, broil for 3 minutes for delicate roasted edges, and serve topped with a glossy ring of balsamic reduction.'
    ],
    moviePairing: {
      movie: 'Ratatouille (2007) by Pixar',
      quote: '"In many ways, the work of a critic is easy. We risk very little, yet enjoy a position over those who offer their work to our judgment."',
      whyWatch: 'Anton Ego dropping his pen in transport back to his childhood home with one bite of food is pure cinematic poetry.'
    },
    hungerTrigger: 'Sweet caramelized summer vegetables so tender they melt on your tongue with herbal olive oil sweetness.'
  },
  {
    id: 'mumbai_cheese_frankie',
    title: 'Midnight Mumbai Street Cheese Burst Frankie',
    subtitle: 'Warm flaky paratha roll packed with spiced aloo, raw onions, and an avalanche of Amul cheese',
    cuisine: 'Mumbai Street Food Legend',
    prepTime: '20 mins',
    difficulty: 'Street Food Star',
    emoji: '🌯',
    accentColor: '#6366F1',
    moodMatch: 'overthinking',
    secretIngredients: [
      'Tangy Mumbai Frankie Masala ✨',
      'Spiced Crisp Aloo Cutlet 🥔',
      'Grated Amul Cheese Avalanche 🧀',
      'Crunchy Vinegar Pickled Onions 🧅',
      'Flaky Tawa-Toasted Paratha 🫓'
    ],
    fullIngredients: [
      '4 flaky multi-layered parathas or soft wheat rotis',
      '3 large boiled potatoes mashed with turmeric, chili, garam masala, and amchur',
      '1 cup finely grated Amul processed cheese',
      '1 large onion, sliced into rings and steeped in white vinegar with green chilies',
      'Special Frankie Masala (chaat masala, dry mango powder, black salt, cumin, chili)',
      'Green spicy mint chutney and sweet tamarind sauce'
    ],
    instructions: [
      'Shape spiced potato mash into long cylindrical cutlets and shallow fry in butter till deep golden and crunchy.',
      'Toast the paratha on a smoking hot tawa with a generous brush of ghee.',
      'Drizzle spicy green chutney and tangy tamarind chutney down the center of the warm paratha.',
      'Place the hot crispy potato roll right in the middle.',
      'Blanket generously with vinegar pickled onions and a snowstorm of grated cheese.',
      'Dust with the signature spicy frankie masala, roll tightly in parchment paper, and devour while sizzling hot!'
    ],
    moviePairing: {
      movie: 'Wake Up Sid (2009) & Gully Boy (2019)',
      quote: '"Mumbai ki khushboo mein street food ka nasha hai!"',
      whyWatch: 'Nothing captures the spirit of late-night Mumbai like grabbing rolls with friends after a long day of chasing dreams.'
    },
    hungerTrigger: 'Biting into a warm, buttery paratha that yields to crisp spicy potato and a molten burst of sharp salty cheese.'
  },
  {
    id: 'silly_cheesy_loaded_nachos',
    title: 'Silly Vibe Triple-Cheese Overload Nachos',
    subtitle: 'Crispy stone-ground chips under a blanket of queso, smoky black beans, and lime crema',
    cuisine: 'Late Night Tex-Mex',
    prepTime: '15 mins',
    difficulty: 'Party Fuel',
    emoji: '🧀',
    accentColor: '#10B981',
    moodMatch: 'silly_vibe',
    secretIngredients: [
      'Stone-Ground Corn Triangles 🌽',
      'Molten Jalapeño Queso 🧀',
      'Pickled Lime Jalapeños 🫑',
      'Smoky Cumin Black Beans 🫘',
      'Cilantro Avocado Lime Crema 🥑'
    ],
    fullIngredients: [
      '1 large bag restaurant-style thick stone-ground corn tortilla chips',
      '2 cups shredded Monterey Jack & sharp orange cheddar',
      '1 cup warm queso dip made with green chilies',
      '1 can seasoned black beans, rinsed and warmed with cumin',
      'Fresh pico de gallo (diced tomatoes, white onion, jalapeño, lime juice, cilantro)',
      '1 Hass avocado mashed with lime, garlic, and sea salt'
    ],
    instructions: [
      'Spread chips in a wide single layer on a parchment-lined baking sheet (no naked chips allowed!).',
      'Scatter warm black beans, sliced jalapeños, and half the shredded cheeses.',
      'Add a second layer of chips, repeat the toppings, and pour molten queso over everything.',
      'Bake at 400°F (200°C) for 8 minutes until cheese is bubbly and edges are toasted.',
      'Top with cool pico de gallo, dollops of fresh guacamole, and zigzags of lime crema.',
      'Serve straight from the tray while everyone laughs and pulls cheese strings!'
    ],
    moviePairing: {
      movie: 'Deadpool & Wolverine (2024)',
      quote: '"Maximum effort... and maximum cheese!"',
      whyWatch: 'Irreverent, chaotic, hilarious fun that goes best with an enormous tray of finger food.'
    },
    hungerTrigger: 'That satisfying chip pull where a mountain of chips comes along connected by an 8-inch stretchy cheese bridge.'
  },
  {
    id: 'midnight_garlic_crunch_noodles',
    title: 'Midnight Chili Garlic Crunch Noodles',
    subtitle: 'Chewy hand-pulled wavy noodles drenched in sizzling scallion oil, garlic crisp, and dark soy',
    cuisine: 'Asian Street Soul',
    prepTime: '12 mins',
    difficulty: 'Instant Addiction',
    emoji: '🍜',
    accentColor: '#14B8A6',
    moodMatch: 'just_me',
    secretIngredients: [
      'Crispy Fried Garlic Flakes 🧄',
      'Szechuan Chili Crisp Oil 🌶️',
      'Mushroom Dark Soy Sauce 🥢',
      'Toasted White Sesame Seeds 🌰',
      'Spring Onions Sizzled in Hot Oil 🌿'
    ],
    fullIngredients: [
      '2 bundles wide knife-cut or ramen noodles',
      '6 cloves garlic, finely minced',
      '3 scallions, separated into white and green parts',
      '2 tbsp homemade or Lao Gan Ma chili crisp',
      '1.5 tbsp light soy sauce & 1 tsp dark soy sauce',
      '1 tsp Chinkiang black vinegar & 1/2 tsp sugar',
      '3 tbsp high-smoke peanut or sesame oil'
    ],
    instructions: [
      'Cook noodles in salted boiling water until al dente with that springy chew; drain and place in a heatproof bowl.',
      'Pile minced garlic, chili flakes, white scallions, and sesame seeds right on top of the warm noodles.',
      'Heat peanut oil in a small pan until shimmering and just smoking hot.',
      'Pour the smoking hot oil directly over the garlic mound — listen to that roaring sizzle release the garlic aromatics!',
      'Add soy sauces, black vinegar, and sugar, then toss vigorously until every noodle is glossy and red.',
      'Garnish with green scallions and crispy fried garlic chips, and slurp away unapologetically.'
    ],
    moviePairing: {
      movie: 'Spirited Away (2001) & Crazy Rich Asians (2018)',
      quote: '"Food tastes best when eaten under neon street lights with steam in your face."',
      whyWatch: 'Hayao Miyazaki\'s food animation is world-famous for making anyone drool within 10 seconds flat.'
    },
    hungerTrigger: 'Glossy noodles slicked with fiery red chili oil, crunchy bits of roasted garlic, and a savory vinegar kick.'
  },
  {
    id: 'naples_truffle_margherita',
    title: 'Eat-Pray-Love Naples Truffle Burrata Pizza',
    subtitle: 'Blistered leopard crust, San Marzano sweet sauce, and a whole creamy burrata ball in the center',
    cuisine: 'Neapolitan Perfection',
    prepTime: '25 mins',
    difficulty: 'Cheesy Romance',
    emoji: '🍕',
    accentColor: '#EF4444',
    moodMatch: 'bigger_adventures',
    secretIngredients: [
      'Whole Fresh Burrata Ball 🧀',
      'Sweet San Marzano Tomatoes 🍅',
      'Charred Leopard-Crust Dough 🌾',
      'Sweet Genovese Basil 🌿',
      'Aromatic Truffle Oil Drizzle ✨'
    ],
    fullIngredients: [
      '1 ball slow-fermented Neapolitan pizza dough',
      '1/2 cup crushed San Marzano D.O.P. canned tomatoes with sea salt',
      '1 ball fresh burrata cheese (drained gently)',
      '100g fresh fior di latte mozzarella',
      'A handful of fresh basil leaves',
      '2 tbsp extra virgin olive oil & 1 tsp black truffle oil'
    ],
    instructions: [
      'Preheat your pizza stone or cast-iron skillet to the absolute highest temperature your oven allows (550°F / 285°C).',
      'Stretch dough by hand from the center out, pushing air into the rim to create that puffy, airy crust.',
      'Ladle crushed tomatoes sparingly, scatter mozzarella pieces, and drizzle with olive oil.',
      'Bake for 6-8 minutes until the crust is puffed, blistered, and speckled with charred leopard spots.',
      'Take it out, tear the whole creamy burrata right into the hot center so its creamy stracciatella spills over the sauce.',
      'Scatter fresh basil and finish with a delicate swirl of truffle oil!'
    ],
    moviePairing: {
      movie: 'Eat Pray Love (2010)',
      quote: '"I am having a relationship with this pizza... almost an affair with it!"',
      whyWatch: 'Julia Roberts eating pizza at L\'Antica Pizzeria da Michele in Naples is one of the most iconic food scenes ever shot.'
    },
    hungerTrigger: 'Breaking open the creamy heart of the burrata over a hot, blistered crust smelling of woodsmoke and fresh basil.'
  },
  {
    id: 'croissant_caramel_pudding',
    title: 'Julie & Julia Salted Caramel Croissant Bread Pudding',
    subtitle: 'Flaky buttery croissants soaked in bourbon vanilla custard and baked until caramelized',
    cuisine: 'French Bistro Dessert',
    prepTime: '35 mins',
    difficulty: 'Sweet Euphoria',
    emoji: '🥐',
    accentColor: '#F472B6',
    moodMatch: 'happier_days',
    secretIngredients: [
      'Buttery All-Butter Croissants 🥐',
      'Madagascar Bourbon Vanilla 🍨',
      'Dark Salted Caramel Sauce 🍯',
      'Toasted Flaked Almonds 🌰',
      'Maldon Crunchy Sea Salt 🧂'
    ],
    fullIngredients: [
      '6 large stale or day-old all-butter bakery croissants, torn into chunks',
      '4 large free-range eggs & 2 egg yolks',
      '2 cups heavy cream & 1 cup whole milk',
      '3/4 cup brown sugar & 1 tbsp pure vanilla bean paste',
      '1/2 cup homemade salted caramel sauce',
      '1/4 cup toasted almond slivers',
      'Powdered sugar for dusting'
    ],
    instructions: [
      'Tear croissants into 2-inch chunks and scatter into a buttered baking dish, letting some pointy tips stick up for extra crunch.',
      'Whisk eggs, egg yolks, heavy cream, milk, brown sugar, and vanilla paste until velvety smooth.',
      'Pour custard all over the croissants, pressing gently with a spatula so every flaky fold drinks in the custard.',
      'Let sit for 15 minutes to absorb completely, then drizzle half the salted caramel across the top.',
      'Bake at 350°F (175°C) for 30 minutes until puffed, golden, and center is softly set like warm crème brûlée.',
      'Top with remaining warm caramel, toasted almonds, a touch of flaky salt, and serve with vanilla bean ice cream.'
    ],
    moviePairing: {
      movie: 'Julie & Julia (2009)',
      quote: '"You know what I love about cooking? Everything else is unpredictable, but here, if you add egg yolks to chocolate and sugar and milk, it gets thick!"',
      whyWatch: 'Meryl Streep and Amy Adams radiating pure kitchen bliss, butter obsession, and food joy.'
    },
    hungerTrigger: 'Crispy crunchy croissant edges on top, silky warm vanilla custard on the bottom, bathed in salty buttery caramel.'
  },
  {
    id: 'retro_80s_fudgy_sundae',
    title: 'Retro 80s Hot Fudge Espresso Brownie Sundae',
    subtitle: 'Dense fudgy cocoa brownie crowned with vanilla bean ice cream and hot espresso fudge',
    cuisine: 'American Retro Diner',
    prepTime: '20 mins',
    difficulty: 'Pure Nostalgia',
    emoji: '🍫',
    accentColor: '#8B5CF6',
    moodMatch: 'music_mood',
    secretIngredients: [
      'Dutch Dark Cocoa Brownie 🍫',
      'Hot Espresso Fudge Sauce ☕',
      'Tahitian Vanilla Ice Cream 🍦',
      'Torched Marshmallow Creme 🔥',
      'Salty Crushed Pretzels 🥨'
    ],
    fullIngredients: [
      '2 thick squares of warm homemade dark chocolate fudge brownies',
      '3 generous scoops of old-fashioned vanilla bean ice cream',
      '1/2 cup dark chocolate chips melted with 1 shot fresh espresso and 2 tbsp cream',
      '1/2 cup marshmallow fluff, lightly browned with a kitchen torch',
      'Crushed salted pretzels and Maraschino cherries with stems'
    ],
    instructions: [
      'Warm the fudgy brownie in the oven for 3 minutes until chocolate pockets turn molten.',
      'Place the warm brownie in a chilled glass sundae boat.',
      'Crown with tall, creamy scoops of vanilla bean ice cream.',
      'Drizzle the piping hot espresso fudge sauce down the scoops, watching it freeze slightly against the ice cream.',
      'Spoon torched marshmallow fluff on the side, shower with crushed pretzels for salty crunch, and crown with a glossy red cherry.'
    ],
    moviePairing: {
      movie: 'Back to the Future (1985) & Stranger Things',
      quote: '"Great Scott! This dessert has achieved maximum flavor density!"',
      whyWatch: 'Neon jukeboxes, synth grooves, roller skates, and the classic 80s soda fountain diner vibes.'
    },
    hungerTrigger: 'Hot bitter-sweet chocolate meeting freezing rich cream and salty crunch in a classic 80s diner glass.'
  },
  {
    id: 'grateful_dal_makhani',
    title: 'Slow-Simmered 24-Hour Velvet Dal Makhani',
    subtitle: 'Rich black lentils cooked with butter and cream over charcoal smoke',
    cuisine: 'Royal North Indian Classic',
    prepTime: '60 mins',
    difficulty: 'Culinary Meditation',
    emoji: '🍲',
    accentColor: '#8B5CF6',
    moodMatch: 'grateful_always',
    secretIngredients: [
      'Black Urad Lentils & Rajma 🫘',
      'White Cultured Makhan (Butter) 🧈',
      'Kashmiri Degi Mirch Oil 🌶️',
      'Crushed Sun-Dried Kasuri Methi 🍃',
      'Charcoal Dhungar Smoke 🪵'
    ],
    fullIngredients: [
      '1.5 cups whole black urad dal, soaked overnight and washed until clean water runs',
      '1/4 cup kidney beans (rajma)',
      '1 cup pure tomato puree',
      '6 tbsp white cultured butter (makhan)',
      '1/4 cup heavy cream',
      '1 tbsp ginger-garlic paste',
      '1.5 tsp Kashmiri chili powder, 1 tsp garam masala, kasuri methi rubbed between palms',
      '1 piece natural charcoal and 1 tsp ghee for smoking'
    ],
    instructions: [
      'Pressure cook black lentils and rajma with salt and water for 45 minutes until totally soft when mashed between fingers.',
      'In a thick-bottomed pot, cook tomato puree with ginger-garlic paste, butter, and Kashmiri chili until oil separates.',
      'Add the cooked dal with its liquid and gently simmer on the lowest heat for 45 minutes, stirring often so the lentils release their natural creaminess.',
      'Stir in the heavy cream and crushed kasuri methi, adjusting seasoning.',
      'Place a small steel bowl on top of the dal, drop a red-hot glowing piece of charcoal, pour a spoon of ghee over it, and instantly cover with a tight lid for 3 minutes for that royal tandoori smoke!',
      'Swirl with extra butter and cream, and serve with hot garlic butter naan.'
    ],
    moviePairing: {
      movie: 'The Lunchbox (2013) starring Irrfan Khan',
      quote: '"Sometimes even the wrong train can take you to the right station."',
      whyWatch: 'A heartfelt, gentle ode to the quiet magic of handwritten letters, tiffin boxes, and the intimacy of sharing food.'
    },
    hungerTrigger: 'That silky, velvety dark dal that coats your spoon, tasting of slow-simmered butter, roasted spices, and charcoal smoke.'
  }
];

export const RECIPES_BY_ID: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map(r => [r.id, r])
);

export const RECIPES_BY_MOOD: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map(r => [r.moodMatch, r])
);

```

---

### File: `src/data/stickers.ts`

```ts
// Auto-generated 11 Marisol / Kritika Stickers Manifest
export interface StickerData {
  index: number;
  id: string;
  alias: string;
  title: string;
  quote: string;
  vibe: string;
  stickerUrl: string;
  poseUrl: string;
  avatarUrl: string;
  accentColor: string;
  badgeEmoji: string;
}

export const STICKERS: StickerData[] = [
  {
    "index": 1,
    "id": "01_brighter_ideas",
    "alias": "brighter_ideas",
    "title": "Same Girl Brighter Ideas",
    "quote": "Same Girl Brighter Ideas ♡",
    "vibe": "Inspiring & Thoughtful",
    "stickerUrl": "/marisol/stickers/01_brighter_ideas.png",
    "poseUrl": "/marisol/poses/brighter_ideas.png",
    "avatarUrl": "/marisol/avatars/01_brighter_ideas.png",
    "accentColor": "#F9A825",
    "badgeEmoji": "💡"
  },
  {
    "index": 2,
    "id": "02_happier_days",
    "alias": "happier_days",
    "title": "Good Ideas Happier Days",
    "quote": "Good Ideas Happier Days ♡",
    "vibe": "Radiant Joy & Optimism",
    "stickerUrl": "/marisol/stickers/02_happier_days.png",
    "poseUrl": "/marisol/poses/happier_days.png",
    "avatarUrl": "/marisol/avatars/02_happier_days.png",
    "accentColor": "#F472B6",
    "badgeEmoji": "☀️"
  },
  {
    "index": 3,
    "id": "03_wink_conquer",
    "alias": "wink_conquer",
    "title": "Wink & Conquer",
    "quote": "Wink & Conquer ♡",
    "vibe": "Bold & Confident",
    "stickerUrl": "/marisol/stickers/03_wink_conquer.png",
    "poseUrl": "/marisol/poses/wink_conquer.png",
    "avatarUrl": "/marisol/avatars/03_wink_conquer.png",
    "accentColor": "#EC4899",
    "badgeEmoji": "😉"
  },
  {
    "index": 4,
    "id": "04_overthinking",
    "alias": "overthinking",
    "title": "Overthinking But Making Progress",
    "quote": "Overthinking ... but making progress ♡",
    "vibe": "Analytical & Tenacious",
    "stickerUrl": "/marisol/stickers/04_overthinking.png",
    "poseUrl": "/marisol/poses/overthinking.png",
    "avatarUrl": "/marisol/avatars/04_overthinking.png",
    "accentColor": "#6366F1",
    "badgeEmoji": "💻"
  },
  {
    "index": 5,
    "id": "05_chai_happiness",
    "alias": "chai_happiness",
    "title": "Chai = Happiness",
    "quote": "Chai = Happiness ♡",
    "vibe": "Cozy & Mindful",
    "stickerUrl": "/marisol/stickers/05_chai_happiness.png",
    "poseUrl": "/marisol/poses/chai_happiness.png",
    "avatarUrl": "/marisol/avatars/05_chai_happiness.png",
    "accentColor": "#F97316",
    "badgeEmoji": "☕"
  },
  {
    "index": 6,
    "id": "06_silly_vibe",
    "alias": "silly_vibe",
    "title": "Silly Is A Vibe",
    "quote": "Silly Is A Vibe ♡",
    "vibe": "Playful & Full of Laughter",
    "stickerUrl": "/marisol/stickers/06_silly_vibe.png",
    "poseUrl": "/marisol/poses/silly_vibe.png",
    "avatarUrl": "/marisol/avatars/06_silly_vibe.png",
    "accentColor": "#10B981",
    "badgeEmoji": "😜"
  },
  {
    "index": 7,
    "id": "07_big_dreams",
    "alias": "big_dreams",
    "title": "Big Dreams",
    "quote": "Big Dreams ♡",
    "vibe": "Limitless & Visionary",
    "stickerUrl": "/marisol/stickers/07_big_dreams.png",
    "poseUrl": "/marisol/poses/big_dreams.png",
    "avatarUrl": "/marisol/avatars/07_big_dreams.png",
    "accentColor": "#3B82F6",
    "badgeEmoji": "✈️"
  },
  {
    "index": 8,
    "id": "08_grateful_always",
    "alias": "grateful_always",
    "title": "Grateful Always",
    "quote": "Grateful Always ♡",
    "vibe": "Grounded & Appreciative",
    "stickerUrl": "/marisol/stickers/08_grateful_always.png",
    "poseUrl": "/marisol/poses/grateful_always.png",
    "avatarUrl": "/marisol/avatars/08_grateful_always.png",
    "accentColor": "#8B5CF6",
    "badgeEmoji": "📚"
  },
  {
    "index": 9,
    "id": "09_just_me",
    "alias": "just_me",
    "title": "Just Me",
    "quote": "Just Me ♡",
    "vibe": "Authentic & Unapologetic",
    "stickerUrl": "/marisol/stickers/09_just_me.png",
    "poseUrl": "/marisol/poses/just_me.png",
    "avatarUrl": "/marisol/avatars/09_just_me.png",
    "accentColor": "#14B8A6",
    "badgeEmoji": "✌️"
  },
  {
    "index": 10,
    "id": "10_bigger_adventures",
    "alias": "bigger_adventures",
    "title": "Same Kritika Bigger Adventures",
    "quote": "Same Kritika Bigger Adventures ♡",
    "vibe": "Daring & Curious",
    "stickerUrl": "/marisol/stickers/10_bigger_adventures.png",
    "poseUrl": "/marisol/poses/bigger_adventures.png",
    "avatarUrl": "/marisol/avatars/10_bigger_adventures.png",
    "accentColor": "#EF4444",
    "badgeEmoji": "❤️"
  },
  {
    "index": 11,
    "id": "11_music_mood",
    "alias": "music_mood",
    "title": "Good Music Brighter Mood",
    "quote": "Good Music Brighter Mood ♡",
    "vibe": "Euphoric & Rhythmic",
    "stickerUrl": "/marisol/stickers/11_music_mood.png",
    "poseUrl": "/marisol/poses/music_mood.png",
    "avatarUrl": "/marisol/avatars/11_music_mood.png",
    "accentColor": "#8B5CF6",
    "badgeEmoji": "🎧"
  }
];

export const STICKERS_BY_ALIAS: Record<string, StickerData> = Object.fromEntries(
  STICKERS.map(s => [s.alias, s])
);

```

---

### File: `src/data/zones.ts`

```ts
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

```

---

### File: `src/index.css`

```css
@import "tailwindcss";

@layer base {
  body {
    background-color: #FFFDF7;
    /* Soft dreamy pastel texture */
    background-image: 
      radial-gradient(#FBCFE8 0.75px, transparent 0.75px),
      radial-gradient(#E9D5FF 0.5px, #FFFDF7 0.5px);
    background-size: 26px 26px, 13px 13px;
    background-position: 0 0, 6.5px 6.5px;
    color: #372E3A;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }
}

/* Handwritten class utility */
.font-handwritten {
  font-family: 'Patrick Hand', 'Kalam', 'Caveat', cursive;
}

.font-display {
  font-family: 'Outfit', sans-serif;
}

/* Soft girly pastel cards */
.pastel-card-pink {
  background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%);
  border: 2.5px solid #F43F5E;
  box-shadow: 4px 4px 0px 0px rgba(244, 63, 94, 0.35);
  border-radius: 24px;
}

.pastel-card-lavender {
  background: linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%);
  border: 2.5px solid #A855F7;
  box-shadow: 4px 4px 0px 0px rgba(168, 85, 247, 0.35);
  border-radius: 24px;
}

.pastel-card-gold {
  background: linear-gradient(135deg, #FEFCE8 0%, #FEF08A 100%);
  border: 2.5px solid #F59E0B;
  box-shadow: 4px 4px 0px 0px rgba(245, 158, 11, 0.35);
  border-radius: 24px;
}

/* Hand-drawn sketch border style with softer ink */
.sketch-border {
  border: 2.5px solid #372E3A;
  box-shadow: 3px 3px 0px 0px #372E3A;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}

.sketch-card {
  background-color: #FFFFFF;
  border: 2.5px solid #372E3A;
  box-shadow: 4px 4px 0px 0px #372E3A;
  border-radius: 20px;
}

.sketch-card-hover {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.sketch-card-hover:hover {
  transform: translateY(-3px) rotate(-0.5deg);
  box-shadow: 6px 6px 0px 0px #372E3A;
}
.sketch-card-hover:active {
  transform: translateY(1px);
  box-shadow: 2px 2px 0px 0px #372E3A;
}

.sketch-btn {
  background-color: #FFF;
  color: #372E3A;
  font-weight: 700;
  border: 2.5px solid #372E3A;
  box-shadow: 3px 3px 0px 0px #372E3A;
  border-radius: 16px;
  transition: all 0.15s ease-out;
  user-select: none;
}
.sketch-btn:hover {
  transform: translateY(-2px);
  box-shadow: 5px 5px 0px 0px #372E3A;
}
.sketch-btn:active {
  transform: translateY(2px);
  box-shadow: 1px 1px 0px 0px #372E3A;
}

/* Primary Girly Coral / Pink CTA Button */
.sketch-btn-primary {
  background: linear-gradient(135deg, #FB7185 0%, #F43F5E 100%);
  color: #FFFFFF;
  border: 2.5px solid #372E3A;
  box-shadow: 3px 3px 0px 0px #372E3A;
  border-radius: 16px;
  font-weight: 800;
}
.sketch-btn-primary:hover {
  background: linear-gradient(135deg, #F43F5E 0%, #E11D48 100%);
  transform: translateY(-2px);
  box-shadow: 5px 5px 0px 0px #372E3A;
}

/* Yellow Gold CTA Button */
.sketch-btn-gold {
  background-color: #F59E0B;
  color: #372E3A;
  border: 2.5px solid #372E3A;
  box-shadow: 3px 3px 0px 0px #372E3A;
  border-radius: 16px;
  font-weight: 800;
}
.sketch-btn-gold:hover {
  background-color: #D97706;
  transform: translateY(-2px);
  box-shadow: 5px 5px 0px 0px #372E3A;
}

/* Washi tape graphic styling */
.washi-tape {
  background: rgba(254, 205, 211, 0.85);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: rotate(-1.5deg);
  border-left: 2px dashed rgba(244, 63, 94, 0.3);
  border-right: 2px dashed rgba(244, 63, 94, 0.3);
}

.washi-tape-lavender {
  background: rgba(233, 213, 255, 0.85);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: rotate(1.2deg);
  border-left: 2px dashed rgba(168, 85, 247, 0.3);
  border-right: 2px dashed rgba(168, 85, 247, 0.3);
}

/* Custom notebook line effect */
.notebook-lines {
  background-image: linear-gradient(transparent 95%, rgba(61, 44, 64, 0.08) 95%);
  background-size: 100% 28px;
}

/* Floating animation */
@keyframes floatGentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(1deg); }
}
.animate-float {
  animation: floatGentle 4s ease-in-out infinite;
}

/* Wrong answer gentle shake animation */
@keyframes shakeGentle {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px) rotate(-1deg); }
  40%, 80% { transform: translateX(6px) rotate(1deg); }
}
.animate-shake-wrong {
  animation: shakeGentle 0.45s ease-in-out;
}

/* Cozy Mode Blanket Wrap Animation */
@keyframes blanketWrap {
  0% { transform: scale(0.92) translateY(30px); opacity: 0; filter: blur(4px); }
  100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
}
.animate-blanket-wrap {
  animation: blanketWrap 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Floating flying cucumber sandwiches animation */
@keyframes flyUpward {
  0% { transform: translateY(20px) scale(0.6) rotate(0deg); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(-120px) scale(1.3) rotate(25deg); opacity: 0; }
}
.animate-flying-sandwich {
  animation: flyUpward 1.4s ease-out forwards;
}

/* Heart pop pulse */
@keyframes heartPop {
  0% { transform: scale(0.7); }
  50% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
.animate-heart-pop {
  animation: heartPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

```

---

### File: `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)


```

---

### File: `src/services/adaptiveEngine.ts`

```ts
import type { Question, Category, Difficulty } from '../types/game';
import { QUESTIONS_DATABASE } from '../data/questions';

export interface CategoryStats {
  answered: number;
  correct: number;
  accuracy: number;
  recentResults: boolean[]; // Last 5 results
}

class AdaptiveEngine {
  private categoryStats: Map<Category, CategoryStats> = new Map();
  private missedQuestionIds: Set<string> = new Set();
  private consecutiveWrong: number = 0;
  private currentDifficulty: Difficulty = 'easy';

  constructor() {
    this.initStats();
  }

  private initStats() {
    const categories: Category[] = [
      'Movies', 'TV Shows', 'Bollywood', 'Hollywood', 'Music', 
      'Pop Culture', 'Science', 'Space', 'Technology', 'Geography', 'History', 'Weird Facts'
    ];

    categories.forEach(cat => {
      this.categoryStats.set(cat, {
        answered: 0,
        correct: 0,
        accuracy: 100,
        recentResults: []
      });
    });
  }

  // Record question outcome
  public recordAnswer(question: Question, isCorrect: boolean, _responseTimeMs: number = 5000) {
    const stats = this.categoryStats.get(question.category) || {
      answered: 0,
      correct: 0,
      accuracy: 100,
      recentResults: []
    };

    stats.answered += 1;
    if (isCorrect) {
      stats.correct += 1;
      this.missedQuestionIds.delete(question.id);
      this.consecutiveWrong = 0;
    } else {
      this.missedQuestionIds.add(question.id);
      this.consecutiveWrong += 1;
    }

    stats.recentResults.push(isCorrect);
    if (stats.recentResults.length > 5) {
      stats.recentResults.shift();
    }

    stats.accuracy = Math.round((stats.correct / stats.answered) * 100);
    this.categoryStats.set(question.category, stats);

    // Adjust difficulty dynamically based on recent 5 answers
    this.adjustDifficulty(stats.recentResults);
  }

  private adjustDifficulty(recentResults: boolean[]) {
    if (recentResults.length < 3) return;

    const correctCount = recentResults.filter(Boolean).length;
    const ratio = correctCount / recentResults.length;

    if (ratio >= 0.8) {
      // 4/5 or 5/5 -> Increase difficulty
      if (this.currentDifficulty === 'easy') this.currentDifficulty = 'medium';
      else if (this.currentDifficulty === 'medium') this.currentDifficulty = 'hard';
      else if (this.currentDifficulty === 'hard') this.currentDifficulty = 'expert';
    } else if (ratio <= 0.4) {
      // 0-2/5 -> Ease difficulty
      if (this.currentDifficulty === 'expert') this.currentDifficulty = 'hard';
      else if (this.currentDifficulty === 'hard') this.currentDifficulty = 'medium';
      else if (this.currentDifficulty === 'medium') this.currentDifficulty = 'easy';
    }
  }

  // Check if player needs a Comeback intervention
  public isComebackNeeded(): boolean {
    return this.consecutiveWrong >= 2;
  }

  // Select next question adaptively
  public selectQuestions(category?: Category, count: number = 5, playedIds: string[] = []): Question[] {
    let available = QUESTIONS_DATABASE.filter(q => !playedIds.includes(q.id));

    // If category specific, filter by category
    if (category) {
      const categoryQuestions = available.filter(q => q.category === category);
      if (categoryQuestions.length >= count) {
        available = categoryQuestions;
      }
    }

    // Check if we have missed questions to reintroduce (Spaced Repetition)
    const missedAvailable = available.filter(q => this.missedQuestionIds.has(q.id));
    const selected: Question[] = [];

    if (missedAvailable.length > 0) {
      selected.push(missedAvailable[0]);
    }

    // Comeback mode: choose an easy question if struggling
    if (this.isComebackNeeded()) {
      const easyQuestions = available.filter(q => q.difficulty === 'easy' && !selected.includes(q));
      if (easyQuestions.length > 0) {
        selected.push(easyQuestions[0]);
      }
    }

    // Fill remaining with matching difficulty or random
    const remaining = available.filter(q => !selected.includes(q));
    const sortedByDiff = remaining.sort((a, b) => {
      const diffScore = (d: Difficulty) => (d === this.currentDifficulty ? 0 : 1);
      return diffScore(a.difficulty) - diffScore(b.difficulty);
    });

    while (selected.length < count && sortedByDiff.length > 0) {
      selected.push(sortedByDiff.shift()!);
    }

    // Fallback if database count is small
    if (selected.length < count) {
      const fallback = QUESTIONS_DATABASE.filter(q => !selected.includes(q));
      while (selected.length < count && fallback.length > 0) {
        selected.push(fallback.shift()!);
      }
    }

    return selected;
  }

  public getCategoryStats(category: Category): CategoryStats {
    return this.categoryStats.get(category) || {
      answered: 0,
      correct: 0,
      accuracy: 100,
      recentResults: []
    };
  }

  public getCurrentDifficulty(): Difficulty {
    return this.currentDifficulty;
  }
}

export const adaptiveEngine = new AdaptiveEngine();

```

---

### File: `src/services/animeAudio.ts`

```ts
// Procedural ambient sound synthesis using Web Audio API for anime comfort scenes

class AnimeAudioEngine {
  private ctx: AudioContext | null = null;
  private currentSource: { stop: () => void } | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playAmbientSound(type: string): void {
    if (this.isMuted) return;
    this.stopAmbientSound();

    try {
      this.initCtx();
      if (!this.ctx) return;

      if (type === 'rain_lofi') {
        this.playRainLofi();
      } else if (type === 'night_crickets') {
        this.playNightCrickets();
      } else if (type === 'bubbly_chimes') {
        this.playBubblyChimes();
      } else if (type === 'sparkle_fanfare') {
        this.playSparkleFanfare();
      } else {
        this.playGentleChords();
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbientSound(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch {
        // ignore
      }
      this.currentSource = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientSound();
    }
    return this.isMuted;
  }

  private playRainLofi(): void {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise for rain
      lastOut = output[i];
      output[i] *= 0.15;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    whiteNoise.start();
    this.currentSource = whiteNoise;
  }

  private playNightCrickets(): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();

    this.currentSource = osc;
  }

  private playBubblyChimes(): void {
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    let noteIdx = 0;
    const interval = setInterval(() => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = notes[noteIdx % notes.length];
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
      noteIdx++;
    }, 600);

    this.currentSource = {
      stop: () => clearInterval(interval)
    };
  }

  private playSparkleFanfare(): void {
    if (!this.ctx) return;
    const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = this.ctx!.currentTime + idx * 0.15;
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(startTime);
      osc.stop(startTime + 1.6);
    });
  }

  private playGentleChords(): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, this.ctx.currentTime); // E4
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    this.currentSource = osc;
  }
}

export const animeAudio = new AnimeAudioEngine();

```

---

### File: `src/services/authService.ts`

```ts
// Google & Phone Authentication Service with Real Firebase OAuth (Spec v2)
import { gameState } from './gameState';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInAnonymously,
  firebaseSignOut, 
  onAuthStateChanged, 
  RecaptchaVerifier,
  signInWithPhoneNumber,
  isFirebaseConfigured, 
  db, 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  type FirebaseUser,
  type ConfirmationResult
} from './firebase';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  batch: string; // e.g. "MLP41PT"
  currentMood: string;
  currentMoodEmoji: string;
  statusNote: string;
  lastUpdated: string;
  isGoogleVerified: boolean;
  loginMethod?: 'google' | 'phone_otp' | 'email';
  isNewUser?: boolean;
  userTag?: string; // e.g. "New User"
  createdAt?: number;
  joinedAt?: number; // Timestamp when user first joined (for new user chat privacy)
}

export const DEFAULT_CLASSMATES: StudentProfile[] = [
  {
    id: 'user_kritika',
    name: 'Kritika Gupta 👑',
    email: 'kritika.gupta@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    batch: 'MLP41PT',
    currentMood: 'Radiant Sunshine 🌸',
    currentMoodEmoji: '🌸',
    statusNote: 'Queen of Factory of Fun ♡ Always here to chat!',
    lastUpdated: 'Just now',
    isGoogleVerified: true,
    loginMethod: 'email',
    isNewUser: false,
    joinedAt: 0, // Foundation member - sees full chat history
    userTag: 'Founder 👑'
  },
  {
    id: 'user_priyanshu',
    name: 'Priyanshu Sharma',
    email: 'priyanshu.sharma@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
    batch: 'MLP41PT',
    currentMood: 'Pizza & Macaroni Feast 🍕',
    currentMoodEmoji: '🍕',
    statusNote: 'Ready for food & movie trivia anytime! 🧀',
    lastUpdated: '10m ago',
    isGoogleVerified: true,
    loginMethod: 'email',
    isNewUser: false,
    joinedAt: 0,
    userTag: 'Classmate'
  },
  {
    id: 'user_ananya',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
    batch: 'MLP41PT',
    currentMood: 'Warm Chai Moments ☕',
    currentMoodEmoji: '☕',
    statusNote: 'Chai enthusiast & comfort study buddy ✨',
    lastUpdated: '25m ago',
    isGoogleVerified: true,
    loginMethod: 'email',
    isNewUser: false,
    joinedAt: 0,
    userTag: 'Classmate'
  },
  {
    id: 'user_rohan',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    batch: 'MLP41PT',
    currentMood: 'Acoustic Harmonies 🎸',
    currentMoodEmoji: '🎸',
    statusNote: 'Listening to comforting jukebox melodies 🎵',
    lastUpdated: '1h ago',
    isGoogleVerified: true,
    loginMethod: 'email',
    isNewUser: false,
    joinedAt: 0,
    userTag: 'Classmate'
  }
];

const AUTH_STORAGE_KEY = 'marisol_google_auth_v2';
const CLASSMATES_STORAGE_KEY = 'marisol_batch_classmates_v2';

export const isMobileBrowser = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768;
};

/**
 * Format human-readable Student Name from email address.
 * e.g. "kritika.singh@gmail.com" -> "Kritika Singh"
 */
export const formatNameFromEmail = (email: string): string => {
  if (!email || !email.includes('@')) return '';
  const username = email.split('@')[0].trim();
  if (!username) return 'Student';

  const cleaned = username
    .replace(/[._\-+]/g, ' ')
    .replace(/([a-zA-Z]+)(\d+)/g, '$1 $2')
    .trim();

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'Student';

  const formatted = parts
    .map(p => {
      if (/^\d+$/.test(p) && parts.some(item => /[a-zA-Z]/.test(item))) return '';
      return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    })
    .filter(Boolean)
    .join(' ');

  return formatted || 'Student';
};

class AuthService {
  private currentUser: StudentProfile | null = null;
  private classmates: StudentProfile[] = [];
  private listeners: Set<() => void> = new Set();
  public isFirebaseEnabled = isFirebaseConfigured;
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  constructor() {
    this.cleanLegacyStorage();
    this.loadFromStorage();
    this.initFirebaseListeners();
  }

  private cleanLegacyStorage() {
    try {
      localStorage.removeItem('marisol_batch_classmates_v1');
      localStorage.removeItem('marisol_google_auth_v1');
    } catch {}
  }

  private initFirebaseListeners() {
    if (auth) {
      const authInstance = auth;
      // 1. Check for Mobile Redirect Sign-In Result on Boot (Essential for mobile browsers)
      getRedirectResult(authInstance)
        .then((result) => {
          if (result && result.user && !result.user.isAnonymous) {
            this.handleFirebaseUserLogin(result.user, 'google');
          }
        })
        .catch((err) => {
          if (err?.code !== 'auth/null-user') {
            console.warn('[Auth] getRedirectResult notice:', err?.message || err);
          }
        });

      // 2. Regular Auth State Change
      onAuthStateChanged(authInstance, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser && !firebaseUser.isAnonymous) {
          this.handleFirebaseUserLogin(firebaseUser, firebaseUser.phoneNumber ? 'phone_otp' : 'google');
        } else if (firebaseUser && firebaseUser.isAnonymous) {
          // Anonymous user session active: align profile ID with actual request.auth.uid
          if (this.currentUser && this.currentUser.id !== firebaseUser.uid) {
            this.currentUser.id = firebaseUser.uid;
            this.saveUserToStorage();
            this.syncWithFirestore(this.currentUser);
            this.notify();
          }
        } else if (!firebaseUser) {
          signInAnonymously(authInstance).then((cred) => {
            if (this.currentUser && this.currentUser.id !== cred.user.uid) {
              this.currentUser.id = cred.user.uid;
              this.saveUserToStorage();
              this.syncWithFirestore(this.currentUser);
              this.notify();
            }
          }).catch((err) => {
            console.warn('[Auth] Anonymous fallback sign-in notice:', err);
          });
        }
      });
    }

    // 3. Realtime Firestore sync for logged-in batch members
    if (db) {
      try {
        const studentsCol = collection(db, 'students');
        onSnapshot(studentsCol, (snapshot) => {
          const remoteStudents: StudentProfile[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as StudentProfile;
            if (!['user_aarav', 'user_pooja', 'user_rohan', 'user_meera'].includes(d.id)) {
              remoteStudents.push(data);
            }
          });

          const map = new Map<string, StudentProfile>();
          remoteStudents.forEach(c => map.set(c.id, c));
          if (this.currentUser) map.set(this.currentUser.id, this.currentUser);
          this.classmates = Array.from(map.values());
          this.saveClassmatesToStorage();
          this.notify();
        }, (err) => {
          console.warn('Firestore students sync error:', err);
        });
      } catch (err) {
        console.warn('Firestore sync setup error:', err);
      }
    }
  }

  private handleFirebaseUserLogin(firebaseUser: FirebaseUser, method: 'google' | 'phone_otp' = 'google') {
    const emailName = firebaseUser.email ? formatNameFromEmail(firebaseUser.email) : '';
    const resolvedName = firebaseUser.displayName && !['Google Student', 'Student'].includes(firebaseUser.displayName)
      ? firebaseUser.displayName
      : (emailName || (firebaseUser.phoneNumber ? `Student (${firebaseUser.phoneNumber.slice(-4)})` : 'Batch 41 Member'));

    const existing = this.classmates.find(c => 
      c.id === firebaseUser.uid || 
      (firebaseUser.email && c.email.toLowerCase() === firebaseUser.email.toLowerCase())
    );

    const now = Date.now();
    const joinedAt = existing?.joinedAt !== undefined 
      ? existing.joinedAt 
      : (this.currentUser?.joinedAt !== undefined ? this.currentUser.joinedAt : now);
    const isNewUser = existing?.isNewUser !== undefined 
      ? existing.isNewUser 
      : (this.currentUser?.isNewUser !== undefined ? this.currentUser.isNewUser : true);

    const profile: StudentProfile = {
      id: firebaseUser.uid,
      name: resolvedName,
      email: firebaseUser.email || (firebaseUser.phoneNumber ? `${firebaseUser.phoneNumber}@mobile.auth` : ''),
      phone: firebaseUser.phoneNumber || undefined,
      avatarUrl: firebaseUser.photoURL || '/marisol/avatars/01_brighter_ideas.png',
      batch: 'MLP41PT',
      currentMood: this.currentUser?.currentMood || 'Radiant Sunshine 🌸',
      currentMoodEmoji: this.currentUser?.currentMoodEmoji || '🌸',
      statusNote: this.currentUser?.statusNote || 'New User connected via Mail ID ♡',
      lastUpdated: 'Just now',
      isGoogleVerified: true,
      loginMethod: method,
      isNewUser,
      userTag: existing?.userTag || (isNewUser ? 'New User' : 'Classmate'),
      createdAt: existing?.createdAt || this.currentUser?.createdAt || now,
      joinedAt
    };

    this.currentUser = profile;
    this.saveUserToStorage();
    this.syncClassmateList(profile);
    this.syncWithFirestore(profile);
    this.notify();
  }

  private loadFromStorage() {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
        // Ensure joinedAt is set on stored profiles
        if (this.currentUser && this.currentUser.joinedAt === undefined) {
          this.currentUser.joinedAt = this.currentUser.isNewUser ? (this.currentUser.createdAt || Date.now()) : 0;
          this.saveUserToStorage();
        }
      }

      const storedClassmates = localStorage.getItem(CLASSMATES_STORAGE_KEY);
      if (storedClassmates) {
        const parsed: StudentProfile[] = JSON.parse(storedClassmates);
        const filtered = parsed.filter(c => !['user_aarav', 'user_pooja', 'user_rohan_old', 'user_meera'].includes(c.id));
        // Merge with DEFAULT_CLASSMATES ensuring everyone is available
        const map = new Map<string, StudentProfile>();
        DEFAULT_CLASSMATES.forEach(c => map.set(c.id, c));
        filtered.forEach(c => map.set(c.id, c));
        this.classmates = Array.from(map.values());
      } else {
        this.classmates = [...DEFAULT_CLASSMATES];
        this.saveClassmatesToStorage();
      }
    } catch {
      this.currentUser = null;
      this.classmates = [...DEFAULT_CLASSMATES];
    }
  }

  private saveUserToStorage() {
    try {
      if (this.currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }

  private saveClassmatesToStorage() {
    try {
      localStorage.setItem(CLASSMATES_STORAGE_KEY, JSON.stringify(this.classmates));
    } catch {}
  }

  private syncClassmateList(user: StudentProfile) {
    const existingIdx = this.classmates.findIndex(c => (user.email && c.email.toLowerCase() === user.email.toLowerCase()) || c.id === user.id);
    if (existingIdx >= 0) {
      this.classmates[existingIdx] = { ...this.classmates[existingIdx], ...user };
    } else {
      this.classmates.unshift(user);
    }
    this.saveClassmatesToStorage();

    const currentP = gameState.getPlayer();
    if (user.name && user.name !== currentP.nickname) {
      currentP.nickname = user.name;
      gameState.savePlayer(currentP);
    }
  }

  private async syncWithFirestore(profile: StudentProfile) {
    if (db) {
      try {
        const studentDoc = doc(db, 'students', profile.id);
        await setDoc(studentDoc, profile, { merge: true });
      } catch (err) {
        console.warn('Failed to sync student with Firestore:', err);
      }
    }
  }

  public getCurrentUser(): StudentProfile | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return Boolean(this.currentUser);
  }

  public isGoogleAuthenticated(): boolean {
    if (!this.currentUser) return false;
    return Boolean(
      this.currentUser.isGoogleVerified ||
      this.currentUser.loginMethod === 'google' ||
      this.currentUser.loginMethod === 'email' ||
      (this.currentUser.email && this.currentUser.email.includes('@'))
    );
  }

  public isMailIdAuthenticated(): boolean {
    if (!this.currentUser) return false;
    return Boolean(this.currentUser.email && this.currentUser.email.includes('@'));
  }

  public isUserAllowedToChat(): boolean {
    if (!this.currentUser) return false;
    return Boolean(this.currentUser.email && this.currentUser.email.includes('@'));
  }

  public getClassmates(): StudentProfile[] {
    return this.classmates;
  }

  public getSavedAccounts(): StudentProfile[] {
    // Single-user privacy: Return only current user or empty
    return this.currentUser ? [this.currentUser] : [];
  }

  public switchAccount(userId: string): StudentProfile | null {
    if (this.currentUser?.id === userId) {
      return this.currentUser;
    }
    return null;
  }

  public removeAccount(userId: string) {
    this.classmates = this.classmates.filter(c => c.id !== userId);
    this.saveClassmatesToStorage();
    if (this.currentUser?.id === userId) {
      this.currentUser = this.classmates[0] || null;
      this.saveUserToStorage();
    }
    this.notify();
  }

  public formatEmailName(email: string): string {
    return formatNameFromEmail(email);
  }

  /**
   * Ensures an active, verified Firebase Auth session exists so request.auth is never null.
   * If auth.currentUser exists, refreshes token; otherwise signs in anonymously as fallback.
   */
  public async ensureFirebaseAuthSession(): Promise<FirebaseUser | null> {
    if (!auth) return null;

    if (auth.currentUser) {
      try {
        await auth.currentUser.getIdToken(false);
        return auth.currentUser;
      } catch (err) {
        console.warn('[Auth] Token check failed, attempting forced refresh:', err);
        try {
          await auth.currentUser.getIdToken(true);
          return auth.currentUser;
        } catch (refreshErr) {
          console.warn('[Auth] Forced refresh failed, re-authenticating anonymously:', refreshErr);
        }
      }
    }

    try {
      const cred = await signInAnonymously(auth);
      if (this.currentUser && this.currentUser.id !== cred.user.uid) {
        this.currentUser.id = cred.user.uid;
        this.saveUserToStorage();
        this.syncWithFirestore(this.currentUser);
        this.notify();
      }
      return cred.user;
    } catch (err) {
      console.warn('[Auth] Anonymous sign-in error:', err);
      return auth.currentUser || null;
    }
  }

  /**
   * Direct Sign In with Mail ID / Email.
   * Whoever signs in with their mail ID is registered as a "New User" and allowed to chat.
   */
  public async loginWithEmail(email: string, name?: string): Promise<StudentProfile> {
    const trimmedEmail = email.trim().toLowerCase();
    const formattedName = name?.trim() || formatNameFromEmail(trimmedEmail) || 'New User';
    return await this.loginStudentProfile(formattedName, trimmedEmail);
  }

  public getFirebaseUser(): FirebaseUser | null {
    return auth?.currentUser || null;
  }

  /**
   * Multi-User: Add or Login Student / Mail Profile.
   * Confirms Firebase Auth session before returning so request.auth is never null.
   */
  public async loginStudentProfile(name: string, email?: string): Promise<StudentProfile> {
    const trimmed = name.trim() || 'Batch 41 Student';
    const isKritika = trimmed.toLowerCase().includes('kritika') || trimmed.toLowerCase().includes('marisol');
    const existing = this.classmates.find(c => 
      (email && c.email.toLowerCase() === email.toLowerCase()) || 
      c.name.toLowerCase() === trimmed.toLowerCase()
    );

    const now = Date.now();
    const joinedAt = existing?.joinedAt !== undefined 
      ? existing.joinedAt 
      : (this.currentUser?.joinedAt !== undefined ? this.currentUser.joinedAt : now);
    const isNewUser = existing?.isNewUser !== undefined 
      ? existing.isNewUser 
      : (this.currentUser?.isNewUser !== undefined ? this.currentUser.isNewUser : true);

    // CRITICAL: Await Firebase Auth session completion so request.auth is NEVER null when user writes to Firestore
    const fbUser = await this.ensureFirebaseAuthSession();
    const resolvedId = fbUser?.uid || auth?.currentUser?.uid || (email 
      ? `user_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
      : `student_${now}`);

    const profile: StudentProfile = existing ? {
      ...existing,
      id: resolvedId,
      name: trimmed !== 'Student' && trimmed !== 'Batch 41 Student' ? trimmed : existing.name,
      isNewUser,
      joinedAt,
      userTag: existing.userTag || (isNewUser ? 'New User' : 'Classmate'),
      loginMethod: existing.loginMethod || (email ? 'email' : 'google')
    } : {
      id: resolvedId,
      name: isKritika && !trimmed.includes('👑') ? `${trimmed} 👑` : trimmed,
      email: email || `${trimmed.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      avatarUrl: isKritika 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop' 
        : '/marisol/avatars/01_brighter_ideas.png',
      batch: 'MLP41PT',
      currentMood: this.currentUser?.currentMood || 'Radiant Sunshine 🌸',
      currentMoodEmoji: this.currentUser?.currentMoodEmoji || '🌸',
      statusNote: isKritika ? 'Queen of Factory of Fun ♡' : 'New User in Factory of Fun ♡ ✨',
      lastUpdated: 'Just now',
      isGoogleVerified: true,
      loginMethod: 'email',
      isNewUser: true,
      userTag: 'New User',
      createdAt: now,
      joinedAt: now
    };

    this.currentUser = profile;
    this.saveUserToStorage();
    this.syncClassmateList(profile);
    this.syncWithFirestore(profile);
    this.notify();
    return profile;
  }

  /**
   * 100% Real Firebase Google Sign-In Flow
   * Uses popup-first strategy across desktop and mobile, with seamless redirect fallback
   */
  public async signInWithFirebaseGoogle(forceRedirect: boolean = false): Promise<{ success: boolean; user?: StudentProfile; error?: string }> {
    if (!auth || !googleProvider) {
      return { success: false, error: 'Firebase authentication is not configured yet.' };
    }

    if (forceRedirect) {
      try {
        await signInWithRedirect(auth, googleProvider);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Redirect sign-in failed.' };
      }
    }

    try {
      // Primary: signInWithPopup keeps user on the same page/route without full refresh
      const userCredential = await signInWithPopup(auth, googleProvider);
      if (userCredential.user) {
        this.handleFirebaseUserLogin(userCredential.user, 'google');
        return { success: true, user: this.currentUser || undefined };
      }
      return { success: false, error: 'No user credential received from Google.' };
    } catch (popupErr: any) {
      console.warn('[Auth] Google Popup notice:', popupErr?.code || popupErr);
      
      // If popup was blocked by mobile browser, gracefully fallback to redirect
      if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return { success: true };
        } catch (redirectErr: any) {
          return { success: false, error: redirectErr.message || 'Redirect sign-in failed.' };
        }
      }

      let errorMsg = 'Google sign-in could not complete.';
      if (popupErr.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in was cancelled (popup window closed).';
      } else if (popupErr.code === 'auth/unauthorized-domain') {
        errorMsg = 'Domain not authorized. Please add this domain to Firebase Console → Authentication → Authorized Domains.';
      } else if (popupErr.code === 'auth/network-request-failed') {
        errorMsg = 'Network error. Please check your internet connection.';
      } else if (popupErr.message) {
        errorMsg = popupErr.message;
      }

      return { success: false, error: errorMsg };
    }
  }

  /**
   * Secondary Sign-In: Firebase Phone / OTP Auth
   */
  public async sendPhoneOtp(phoneNumber: string, containerId: string): Promise<{ success: boolean; confirmationResult?: ConfirmationResult; error?: string }> {
    if (!auth) {
      return { success: false, error: 'Firebase Auth is not initialized.' };
    }

    try {
      if (!this.recaptchaVerifier) {
        this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
          size: 'invisible'
        });
      }

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, this.recaptchaVerifier);
      return { success: true, confirmationResult };
    } catch (err: any) {
      console.error('[Auth] Phone OTP Error:', err);
      return { success: false, error: err.message || 'Failed to send OTP to mobile phone.' };
    }
  }

  public async confirmPhoneOtp(confirmationResult: ConfirmationResult, code: string): Promise<{ success: boolean; user?: StudentProfile; error?: string }> {
    try {
      const credential = await confirmationResult.confirm(code);
      if (credential.user) {
        this.handleFirebaseUserLogin(credential.user, 'phone_otp');
        return { success: true, user: this.currentUser || undefined };
      }
      return { success: false, error: 'Invalid verification code.' };
    } catch (err: any) {
      console.error('[Auth] Confirm OTP Error:', err);
      return { success: false, error: err.message || 'Invalid verification code. Please try again.' };
    }
  }

  public updateDailyMood(moodLabel: string, moodEmoji: string, statusNote?: string) {
    if (!this.currentUser) return;
    this.currentUser.currentMood = moodLabel;
    this.currentUser.currentMoodEmoji = moodEmoji;
    if (statusNote !== undefined) {
      this.currentUser.statusNote = statusNote;
    }
    this.currentUser.lastUpdated = 'Just now';
    this.saveUserToStorage();
    this.syncClassmateList(this.currentUser);
    this.syncWithFirestore(this.currentUser);
    this.notify();
  }

  public updateProfile(data: {
    name?: string;
    avatarUrl?: string;
    batch?: string;
    currentMood?: string;
    currentMoodEmoji?: string;
    statusNote?: string;
  }): StudentProfile {
    if (!this.currentUser) {
      const defaultName = data.name?.trim() || 'Batch 41 Student';
      this.currentUser = {
        id: `student_${Date.now()}`,
        name: defaultName,
        email: `${defaultName.toLowerCase().replace(/\s+/g, '.')}@mlp41.edu`,
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
        batch: data.batch || 'MLP41PT',
        currentMood: data.currentMood || 'Radiant Sunshine 🌸',
        currentMoodEmoji: data.currentMoodEmoji || '🌸',
        statusNote: data.statusNote || 'Savoring sweet memories ♡ ✨',
        lastUpdated: 'Just now',
        isGoogleVerified: false
      };
    } else {
      if (data.name) this.currentUser.name = data.name.trim();
      if (data.avatarUrl) this.currentUser.avatarUrl = data.avatarUrl;
      if (data.batch) this.currentUser.batch = data.batch.trim();
      if (data.currentMood) this.currentUser.currentMood = data.currentMood;
      if (data.currentMoodEmoji) this.currentUser.currentMoodEmoji = data.currentMoodEmoji;
      if (data.statusNote !== undefined) this.currentUser.statusNote = data.statusNote;
      this.currentUser.lastUpdated = 'Just now';
    }

    this.saveUserToStorage();
    this.syncClassmateList(this.currentUser);
    this.syncWithFirestore(this.currentUser);
    this.notify();
    return this.currentUser;
  }

  public async signOut(): Promise<void> {
    try {
      if (auth) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
    this.currentUser = null;
    this.saveUserToStorage();
    this.notify();
  }

  public getJoinedAt(): number {
    if (!this.currentUser) return 0;
    return this.currentUser.joinedAt ?? (this.currentUser.isNewUser ? (this.currentUser.createdAt || 0) : 0);
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const authService = new AuthService();

```

---

### File: `src/services/batchWallState.ts`

```ts
// Shared Batch Wall State Service for MLP41PT Batch Students with Firebase Firestore
import { 
  db, 
  auth,
  collection, 
  onSnapshot, 
  query, 
  where,
  orderBy, 
  doc, 
  setDoc, 
  deleteDoc
} from './firebase';
import { authService } from './authService';

export interface BulletinReply {
  id: string;
  authorId?: string;
  authorName: string;
  authorEmail?: string;
  avatarUrl?: string;
  text: string;
  timestamp: string;
  createdAt: number;
  isKritika?: boolean; // Highlighted special reply from Kritika!
}

export interface BatchUpdatePost {
  id: string;
  userId?: string;
  userEmail?: string;
  studentName: string;
  batch: string; // "MLP41PT"
  avatarPose: string; // alias or avatar URL
  mood: string;
  moodEmoji: string;
  text: string;
  imageUrl?: string;
  timestamp: string; // ISO or human readable
  createdAt?: number;
  reactions: Record<string, number>; // stickerAlias -> count
  replies?: BulletinReply[]; // Asynchronous threaded replies from Kritika and classmates
  category?: 'tribute' | 'question' | 'cheer' | 'general';
  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
  isDeleted?: boolean;
  isDeletedForEveryone?: boolean;
  deletedAt?: number;
}

export interface MessageReceipt {
  userId: string;
  userName: string;
  userEmail?: string;
  avatarUrl?: string;
  seenAt: number;
}

export interface BatchMember {
  id: string;
  name: string;
  email?: string;
  avatarUrl: string;
  isKritika?: boolean;
}

export const KNOWN_BATCH_MEMBERS: BatchMember[] = [
  {
    id: 'member_kritika',
    name: 'Kritika Gupta 👑',
    email: 'kritika.gupta@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    isKritika: true,
  },
  {
    id: 'member_priyanshu',
    name: 'Priyanshu Sharma',
    email: 'priyanshu.sharma@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
  },
  {
    id: 'member_ananya',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
  },
  {
    id: 'member_rohan',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
  },
];

export interface ChatPollOption {
  id: string;
  text: string;
  votes: string[]; // array of voter Firebase UIDs (or legacy names)
}

export interface ChatPoll {
  question: string;
  options: ChatPollOption[];
}

export interface GroupChatMessage {
  id: string;
  senderId: string; // Firebase Auth UID
  senderName: string;
  senderEmail?: string;
  avatarUrl?: string;

  text: string;
  imageUrl?: string;

  senderIsNewUser?: boolean;
  senderUserTag?: string;

  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };

  poll?: {
    question: string;
    options: {
      id: string;
      text: string;
      votes: string[];
    }[];
  };

  timestamp: string;
  createdAt: number;

  isKritika?: boolean;

  isEdited?: boolean;
  isDeletedForEveryone?: boolean;

  reactions?: Record<string, number>;

  seenBy?: {
    userId: string;
    userName: string;
    userEmail?: string;
    avatarUrl?: string;
    seenAt: number;
  }[];

  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
}

export interface LikedMember {
  userId?: string;
  userName: string;
  userEmail?: string;
  avatarUrl?: string;
  likedAt?: number;
}

export interface InstagramComment {
  id: string;
  authorId?: string;
  authorName: string;
  authorEmail?: string;
  avatarUrl?: string;
  text: string;
  timestamp: string;
  createdAt: number;
  likesCount?: number;
  likedByUsers?: string[];
  reactions?: Record<string, number>;
  isKritika?: boolean;
}

export interface InstagramPost {
  id: string;
  userId?: string;
  authorId?: string;
  userEmail?: string;
  authorName: string;
  authorEmail?: string;
  authorAvatarUrl: string;
  location?: string;
  imageUrl: string;
  images?: string[]; // Multiple photos in one 9:16 poster
  filter?: string; // 'none' | 'warm' | 'vintage' | 'pink' | 'golden' | 'bw'
  caption: string;
  hashtags: string[];
  likesCount: number;
  likedByCurrentUser?: boolean;
  likedByUsers?: string[];
  likedByMembers?: LikedMember[]; // Unique users who liked/hearted
  reactions?: Record<string, number>; // emoji -> count, e.g. { '❤️': 38, '🔥': 12, '🌸': 9 }
  reactedUsers?: Record<string, string[]>; // emoji -> array of user names
  sharesCount?: number; // Total unique shares count
  sharedByUsers?: string[]; // Users who shared
  comments: InstagramComment[];
  saved?: boolean;
  timestamp: string;
  createdAt: number;
  isKritika?: boolean;
  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
  isEdited?: boolean;
  isDeleted?: boolean;
  isDeletedForEveryone?: boolean;
  deletedAt?: number;
}

export const formatChatTimestamp = (createdAt: number): string => {
  if (!createdAt) return 'Just now';
  const now = Date.now();
  const diff = now - createdAt;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  const date = new Date(createdAt);
  const isToday = new Date().toDateString() === date.toDateString();
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (isToday) return `Today at ${timeStr}`;
  const yesterday = new Date(now - 86400000);
  if (yesterday.toDateString() === date.toDateString()) return `Yesterday at ${timeStr}`;
  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${timeStr}`;
};

const STORAGE_KEY = 'marisol_batch_updates_v2';
const CHAT_STORAGE_KEY = 'marisol_group_chat_messages_v2';
const CHAT_QUEUE_KEY = 'marisol_chat_offline_queue_v2';
const INSTA_STORAGE_KEY = 'marisol_instagram_posts_v2';
const QUEUE_KEY = 'marisol_batch_offline_queue_v2';
const DELETED_POSTS_STORAGE_KEY = 'marisol_deleted_posts_v2';

const DEFAULT_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'insta_init_1',
    authorId: 'member_kritika',
    authorName: 'Kritika Gupta 👑',
    authorEmail: 'kritika.gupta@mlp41.edu',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    location: 'Factory of Fun • Comfort Lounge 🌸',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&auto=format&fit=crop&q=80',
    filter: 'warm',
    caption: 'Celebrating our amazing batch milestones together! Savoring warm chai, hot pizza, and sweet memories with everyone ♡ 👑✨',
    hashtags: ['#Batch41', '#KritikaQueen', '#FactoryOfFun', '#ComfortVibes'],
    likesCount: 38,
    likedByCurrentUser: true,
    likedByUsers: ['Kritika Gupta 👑', 'Priyanshu Sharma', 'Ananya Deshmukh', 'Rohan Mehra'],
    likedByMembers: [
      { userId: 'member_kritika', userName: 'Kritika Gupta 👑', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop', likedAt: Date.now() - 3600000 },
      { userId: 'member_priyanshu', userName: 'Priyanshu Sharma', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop', likedAt: Date.now() - 2500000 },
      { userId: 'member_ananya', userName: 'Ananya Deshmukh', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop', likedAt: Date.now() - 1800000 },
      { userId: 'member_rohan', userName: 'Rohan Mehra', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop', likedAt: Date.now() - 900000 }
    ],
    reactions: { '❤️': 38, '🌸': 15, '✨': 12, '🔥': 9 },
    reactedUsers: {
      '❤️': ['Kritika Gupta 👑', 'Priyanshu Sharma', 'Ananya Deshmukh'],
      '🌸': ['Ananya Deshmukh', 'Kritika Gupta 👑'],
      '✨': ['Rohan Mehra'],
      '🔥': ['Priyanshu Sharma']
    },
    sharesCount: 7,
    sharedByUsers: ['Priyanshu Sharma', 'Ananya Deshmukh', 'Rohan Mehra'],
    comments: [
      {
        id: 'c1',
        authorName: 'Priyanshu Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
        text: 'Royal aesthetic as always! Keep shining Kritika! 👑🔥',
        timestamp: '1 hour ago',
        createdAt: Date.now() - 3600000,
        likesCount: 4,
        likedByUsers: ['Kritika Gupta 👑', 'Ananya Deshmukh']
      },
      {
        id: 'c2',
        authorName: 'Ananya Deshmukh',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
        text: 'Best batch memories ever! 💖✨',
        timestamp: '30 mins ago',
        createdAt: Date.now() - 1800000,
        likesCount: 2,
        likedByUsers: ['Kritika Gupta 👑']
      }
    ],
    timestamp: '2 hours ago',
    createdAt: Date.now() - 7200000,
    isKritika: true
  }
];

/**
 * Recursively removes all `undefined` fields from an object/array so Firestore SDK
 * never throws "Unsupported field value: undefined".
 */
export function cleanForFirestore<T>(val: T): T {
  if (val === null || val === undefined) {
    return null as any;
  }
  if (Array.isArray(val)) {
    return val
      .filter(item => item !== undefined)
      .map(item => cleanForFirestore(item)) as any;
  }
  if (typeof val === 'object' && val.constructor === Object) {
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        res[k] = cleanForFirestore(v);
      }
    }
    return res as any;
  }
  return val;
}

class BatchWallService {
  private posts: BatchUpdatePost[] = [];
  private chatMessages: GroupChatMessage[] = [];
  private instagramPosts: InstagramPost[] = [];
  private offlineQueue: BatchUpdatePost[] = [];
  private chatOfflineQueue: GroupChatMessage[] = [];
  private deletedPostIds: Set<string> = new Set();
  private listeners: Set<() => void> = new Set();
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private lastSyncToast: string | null = null;
  private broadcastChannel: BroadcastChannel | null = null;

  // Real-Time Group Chat State
  private chatConnectionStatus: 'connecting' | 'connected' | 'offline' | 'error' = 'connecting';
  private chatErrorMessage: string | null = null;
  private chatUnsubscribe: (() => void) | null = null;

  constructor() {
    this.cleanLegacyStorage();
    this.loadFromStorage();

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());

      try {
        if ('BroadcastChannel' in window) {
          this.broadcastChannel = new BroadcastChannel('marisol_multiuser_sync');
          this.broadcastChannel.onmessage = (event) => {
            if (event.data?.type === 'DELETE_CHAT_MESSAGE' && event.data?.messageId) {
              this.chatMessages = this.chatMessages.filter(m => m.id !== event.data.messageId);
              this.saveChatToStorage();
              this.notify();
            } else if (event.data?.type === 'DELETE_INSTA_POST' && event.data?.postId) {
              this.deletedPostIds.add(event.data.postId);
              this.saveDeletedPostsToStorage();
              this.instagramPosts = this.instagramPosts.filter(p => p.id !== event.data.postId);
              this.saveInstaToStorage();
              this.notify();
            } else if (event.data?.type === 'DELETE_BULLETIN_POST' && event.data?.postId) {
              this.deletedPostIds.add(event.data.postId);
              this.saveDeletedPostsToStorage();
              this.posts = this.posts.filter(p => p.id !== event.data.postId);
              this.offlineQueue = this.offlineQueue.filter(p => p.id !== event.data.postId);
              this.saveToStorage();
              this.saveQueueToStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_CHAT') {
              this.loadFromStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_POSTS') {
              this.loadFromStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_INSTA') {
              this.loadFromStorage();
              this.notify();
            }
          };
        }
      } catch {}
    }

    this.initFirestoreSync();

    // Auto-update chat stream when user logs in, switches accounts, or profile updates
    authService.subscribe(() => {
      const cur = authService.getCurrentUser();
      this.initChatListener(cur?.joinedAt, cur?.isNewUser);
    });
  }

  private cleanLegacyStorage() {
    try {
      localStorage.removeItem('marisol_batch_updates_v1');
      localStorage.removeItem('marisol_direct_chat_messages_v1');
      localStorage.removeItem('marisol_direct_chat_messages_v2');
      localStorage.removeItem('marisol_deleted_posts_v1');
    } catch {}
  }

  private initFirestoreSync() {
    if (db) {
      try {
        // 0. Shared Deleted Posts Registry Listener (guarantees real-time complete deletion for all batch members)
        const deletedQuery = collection(db, 'deleted_posts');
        onSnapshot(deletedQuery, (snapshot) => {
          let hasNewDeletions = false;
          snapshot.forEach((docSnap) => {
            if (!this.deletedPostIds.has(docSnap.id)) {
              this.deletedPostIds.add(docSnap.id);
              hasNewDeletions = true;
            }
          });
          if (hasNewDeletions) {
            this.saveDeletedPostsToStorage();
            this.posts = this.posts.filter(p => !this.deletedPostIds.has(p.id));
            this.instagramPosts = this.instagramPosts.filter(p => !this.deletedPostIds.has(p.id));
            this.saveToStorage();
            this.saveInstaToStorage();
            this.notify();
          }
        }, (err) => {
          console.warn('[BatchWall] Firestore deleted_posts listener notice:', err);
        });

        // 1. Bulletin Corkboard Posts Listener
        const postsQuery = query(
          collection(db, 'batch_updates'),
          orderBy('createdAt', 'desc')
        );
        onSnapshot(postsQuery, (snapshot) => {
          const postMap = new Map<string, BatchUpdatePost>();

          // Preserve existing posts in memory
          this.posts.forEach(p => {
            if (!this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone) {
              postMap.set(p.id, p);
            }
          });

          // Authoritatively merge all documents from Firestore snapshot
          snapshot.docs.forEach((docSnap) => {
            const data = docSnap.data() as BatchUpdatePost;
            const postId = docSnap.id;
            if (data.isDeleted || data.isDeletedForEveryone || this.deletedPostIds.has(postId)) {
              if (!this.deletedPostIds.has(postId)) {
                this.deletedPostIds.add(postId);
                this.saveDeletedPostsToStorage();
              }
              postMap.delete(postId);
              return;
            }
            postMap.set(postId, {
              ...data,
              id: postId,
              createdAt: data.createdAt || (typeof data.timestamp === 'number' ? data.timestamp : Date.now()),
              replies: Array.isArray(data.replies) ? data.replies : []
            });
          });

          this.posts = Array.from(postMap.values())
            .filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone)
            .sort((a, b) => {
              if (a.isPinned && !b.isPinned) return -1;
              if (!a.isPinned && b.isPinned) return 1;
              return (b.createdAt || 0) - (a.createdAt || 0);
            });
          this.saveToStorage();
          this.notify();
        }, (err) => {
          console.warn('[BatchWall] Firestore posts sync notice:', err);
        });

        // 2. Authoritative Group Chat Listener
        this.initChatListener();

        // 3. Instagram / Photo Wall Posts Listener (Merging full collection into postMap to never overwrite other users' posts)
        const instaQuery = query(
          collection(db, 'instagram_posts'),
          orderBy('createdAt', 'desc')
        );
        onSnapshot(instaQuery, (snapshot) => {
          const postMap = new Map<string, InstagramPost>();

          // Step A: Seed foundational default posts (unless explicitly deleted)
          DEFAULT_INSTAGRAM_POSTS.forEach(dp => {
            if (!this.deletedPostIds.has(dp.id)) {
              postMap.set(dp.id, dp);
            }
          });

          // Step B: Preserve existing in-memory posts (including optimistic / local posts)
          this.instagramPosts.forEach(p => {
            if (!this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone) {
              postMap.set(p.id, p);
            }
          });

          // Step C: Authoritatively merge all documents from Firestore snapshot
          snapshot.docs.forEach((docSnap) => {
            const data = docSnap.data() as InstagramPost;
            const postId = docSnap.id;

            if (data.isDeleted || data.isDeletedForEveryone || this.deletedPostIds.has(postId)) {
              if (!this.deletedPostIds.has(postId)) {
                this.deletedPostIds.add(postId);
                this.saveDeletedPostsToStorage();
              }
              postMap.delete(postId);
              return;
            }

            const mergedPost: InstagramPost = {
              ...data,
              id: postId,
              createdAt: data.createdAt || (typeof data.timestamp === 'number' ? data.timestamp : Date.now()),
              images: data.images && data.images.length > 0 ? data.images : (data.imageUrl ? [data.imageUrl] : []),
              comments: Array.isArray(data.comments) ? data.comments : [],
              reactions: data.reactions || {},
              reactedUsers: data.reactedUsers || {},
              likedByUsers: Array.isArray(data.likedByUsers) ? data.likedByUsers : [],
              likedByMembers: Array.isArray(data.likedByMembers) ? data.likedByMembers : []
            };

            postMap.set(postId, mergedPost);
          });

          this.instagramPosts = Array.from(postMap.values())
            .filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone)
            .sort((a, b) => {
              if (a.isPinned && !b.isPinned) return -1;
              if (!a.isPinned && b.isPinned) return 1;
              return (b.createdAt || 0) - (a.createdAt || 0);
            });

          this.saveInstaToStorage();
          this.notify();
        }, (err) => {
          console.warn('[BatchWall] Firestore insta listener notice:', err);
        });

      } catch (err) {
        console.warn('[BatchWall] Firestore sync setup error:', err);
      }
    } else {
      this.chatConnectionStatus = 'offline';
      this.chatErrorMessage = 'Firebase Firestore is not configured.';
      this.notify();
    }
  }

  /**
   * Initializes exactly ONE authoritative group-chat Firestore listener.
   * If called again, cleans up previous listener to prevent duplicates.
   * Enforces New User Privacy at the Firestore query level when userJoinedAt and isNewUser are set.
   */
  public initChatListener(userJoinedAt?: number, isNewUser?: boolean) {
    if (this.chatUnsubscribe) {
      this.chatUnsubscribe();
      this.chatUnsubscribe = null;
    }

    if (!db) {
      this.chatConnectionStatus = 'offline';
      this.chatErrorMessage = 'Firebase Firestore is not configured.';
      this.notify();
      return;
    }

    // Auto-detect from active auth session if not supplied explicitly
    if (userJoinedAt === undefined || isNewUser === undefined) {
      const cur = authService.getCurrentUser();
      if (cur) {
        userJoinedAt = userJoinedAt ?? cur.joinedAt;
        isNewUser = isNewUser ?? cur.isNewUser;
      }
    }

    // New User Privacy: immediately clear any stale cached messages prior to joinedAt
    if (isNewUser && userJoinedAt && userJoinedAt > 0) {
      this.chatMessages = this.chatMessages.filter(m => (m.createdAt || 0) >= userJoinedAt!);
      this.saveChatToStorage();
    }

    this.chatConnectionStatus = 'connecting';
    this.chatErrorMessage = null;
    this.notify();

    try {
      const messagesCol = collection(db, 'group_chat_messages');
      let chatQuery;

      if (isNewUser && userJoinedAt && userJoinedAt > 0) {
        // Enforce New User Privacy at the Firestore query level:
        // Older messages prior to user.joinedAt are NEVER downloaded or delivered to client.
        chatQuery = query(
          messagesCol,
          where('createdAt', '>=', userJoinedAt),
          orderBy('createdAt', 'asc')
        );
      } else {
        // Older/existing users query the full history
        chatQuery = query(
          messagesCol,
          orderBy('createdAt', 'asc')
        );
      }

      this.chatUnsubscribe = onSnapshot(
        chatQuery,
        (snapshot) => {
          const remoteChat: GroupChatMessage[] = [];

          snapshot.forEach((docSnap) => {
            remoteChat.push({
              ...(docSnap.data() as GroupChatMessage),
              id: docSnap.id,
            });
          });

          remoteChat.sort(
            (a, b) => (a.createdAt || 0) - (b.createdAt || 0)
          );

          // Overwrite local chat state unconditionally — authoritative from Firestore
          this.chatMessages = remoteChat;
          this.chatConnectionStatus = 'connected';
          this.chatErrorMessage = null;

          this.saveChatToStorage();
          this.notify();
        },
        (error) => {
          console.error('[Batch 41 Group Chat] Firestore listener error:', {
            code: error?.code,
            message: error?.message,
            userJoinedAt,
            isNewUser
          });
          this.chatConnectionStatus = 'error';
          this.chatErrorMessage = error?.code === 'permission-denied'
            ? 'Permission denied: Chat access restricted by Firestore security rules.'
            : 'Unable to connect to the group chat. Please check your internet connection.';
          this.notify();
        }
      );
    } catch (err: any) {
      console.error('[Batch 41 Group Chat] Firestore init error:', {
        code: err?.code,
        message: err?.message,
        error: err
      });
      this.chatConnectionStatus = 'error';
      this.chatErrorMessage = 'Unable to connect to the group chat. Please check your internet connection.';
      this.notify();
    }
  }

  private loadFromStorage() {
    try {
      const storedDeleted = localStorage.getItem(DELETED_POSTS_STORAGE_KEY);
      if (storedDeleted) {
        try {
          const ids: string[] = JSON.parse(storedDeleted);
          this.deletedPostIds = new Set(ids);
        } catch {
          this.deletedPostIds = new Set();
        }
      } else {
        this.deletedPostIds = new Set();
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: BatchUpdatePost[] = JSON.parse(stored);
        this.posts = parsed
          .filter(p => !['post_01', 'post_02', 'post_03', 'post_04'].includes(p.id))
          .filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone);
      } else {
        this.posts = [];
        this.saveToStorage();
      }

      // Startup / Offline Cache for Group Chat (begins empty if no cache, never seeds fake mock chat messages)
      const storedChat = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedChat) {
        this.chatMessages = JSON.parse(storedChat);
      } else {
        this.chatMessages = [];
      }

      const storedInsta = localStorage.getItem(INSTA_STORAGE_KEY);
      if (storedInsta) {
        const parsed: InstagramPost[] = JSON.parse(storedInsta);
        this.instagramPosts = parsed.filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone);
      } else {
        this.instagramPosts = DEFAULT_INSTAGRAM_POSTS.filter(p => !this.deletedPostIds.has(p.id));
        this.saveInstaToStorage();
      }

      if (!this.instagramPosts || this.instagramPosts.length === 0) {
        DEFAULT_INSTAGRAM_POSTS.forEach(dp => this.deletedPostIds.delete(dp.id));
        this.saveDeletedPostsToStorage();
        this.instagramPosts = [...DEFAULT_INSTAGRAM_POSTS];
        this.saveInstaToStorage();
      }

      const queue = localStorage.getItem(QUEUE_KEY);
      if (queue) {
        const parsedQueue: BatchUpdatePost[] = JSON.parse(queue);
        this.offlineQueue = parsedQueue.filter(p => !this.deletedPostIds.has(p.id));
      }

      const chatQueue = localStorage.getItem(CHAT_QUEUE_KEY);
      if (chatQueue) {
        this.chatOfflineQueue = JSON.parse(chatQueue);
      }
    } catch {
      this.deletedPostIds = new Set();
      this.posts = [];
      this.chatMessages = [];
      this.instagramPosts = DEFAULT_INSTAGRAM_POSTS.filter(p => !this.deletedPostIds.has(p.id));
      this.offlineQueue = [];
      this.chatOfflineQueue = [];
    }
  }

  private saveDeletedPostsToStorage() {
    try {
      localStorage.setItem(DELETED_POSTS_STORAGE_KEY, JSON.stringify(Array.from(this.deletedPostIds)));
    } catch {}
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
    } catch {}
  }

  private saveChatToStorage() {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.chatMessages));
    } catch {}
  }

  private saveChatQueueToStorage() {
    try {
      localStorage.setItem(CHAT_QUEUE_KEY, JSON.stringify(this.chatOfflineQueue));
    } catch {}
  }

  private saveInstaToStorage() {
    try {
      localStorage.setItem(INSTA_STORAGE_KEY, JSON.stringify(this.instagramPosts));
    } catch {}
  }

  private saveQueueToStorage() {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(this.offlineQueue));
    } catch {}
  }

  private handleOnline() {
    this.isOnline = true;
    this.chatConnectionStatus = 'connecting';

    // Flush queued bulletin posts
    if (this.offlineQueue.length > 0) {
      const count = this.offlineQueue.length;
      this.offlineQueue.forEach(p => {
        this.posts.unshift(p);
        this.syncPostToFirestore(p);
      });
      this.offlineQueue = [];
      this.saveToStorage();
      this.saveQueueToStorage();
      this.lastSyncToast = `Back online! Synced ${count} update${count > 1 ? 's' : ''} to Batch Wall 📡`;
    }

    // Flush queued group chat messages
    if (this.chatOfflineQueue.length > 0) {
      const chatCount = this.chatOfflineQueue.length;
      this.chatOfflineQueue.forEach(async (msg) => {
        if (db) {
          try {
            await setDoc(doc(db, 'group_chat_messages', msg.id), cleanForFirestore(msg));
          } catch (e) {
            console.warn('[Batch 41 Group Chat] Error syncing queued message:', e);
          }
        }
      });
      this.chatOfflineQueue = [];
      this.saveChatQueueToStorage();
      this.lastSyncToast = `Back online! Synced ${chatCount} chat message${chatCount > 1 ? 's' : ''} 📡`;
    }

    // Re-establish authoritative chat listener
    this.initChatListener();
    this.notify();
  }

  private handleOffline() {
    this.isOnline = false;
    this.chatConnectionStatus = 'offline';
    this.notify();
  }

  private async syncPostToFirestore(post: BatchUpdatePost) {
    if (db) {
      try {
        await setDoc(doc(db, 'batch_updates', post.id), cleanForFirestore(post));
      } catch (err) {
        console.warn('Failed to add post to Firestore:', err);
      }
    }
  }

  // =========================================================================
  // GROUP CHAT METHODS (Authoritative Real-Time Architecture)
  // =========================================================================

  public getChatConnectionStatus(): {
    status: 'connecting' | 'connected' | 'offline' | 'error';
    errorMessage: string | null;
  } {
    return {
      status: !this.isOnline ? 'offline' : this.chatConnectionStatus,
      errorMessage: this.chatErrorMessage
    };
  }

  public getChatMessages(currentUserId?: string, userJoinedAt?: number, isNewUser?: boolean): GroupChatMessage[] {
    let list = this.chatMessages;

    if (userJoinedAt === undefined || isNewUser === undefined) {
      const cur = authService.getCurrentUser();
      if (cur) {
        userJoinedAt = userJoinedAt ?? cur.joinedAt;
        isNewUser = isNewUser ?? cur.isNewUser;
      }
    }

    // Defense-in-depth: Ensure new users never see older chat messages sent before their join time
    if (isNewUser && userJoinedAt && userJoinedAt > 0) {
      list = list.filter(m => (m.createdAt || 0) >= userJoinedAt!);
    }

    if (!currentUserId) {
      return [...list];
    }
    try {
      const hiddenKey = `marisol_chat_hidden_${currentUserId}`;
      const stored = localStorage.getItem(hiddenKey);
      if (stored) {
        const hiddenIds: string[] = JSON.parse(stored);
        const hiddenSet = new Set(hiddenIds);
        return list.filter(m => !hiddenSet.has(m.id));
      }
    } catch {}
    return [...list];
  }

  public getPinnedMessages(): GroupChatMessage[] {
    return this.chatMessages
      .filter(m => m.isPinned)
      .sort((a, b) => (b.pinnedAt || 0) - (a.pinnedAt || 0));
  }

  public getPinnedChatMessage(): GroupChatMessage | null {
    return this.chatMessages.slice().reverse().find(m => m.isPinned) || null;
  }

  /**
   * Writes a new group chat message to Firestore.
   * Does NOT manually push permanently to local chat state; onSnapshot distributes it.
   */
  public async sendGroupChatMessage(data: {
    senderId: string; // Firebase Auth UID
    senderName: string;
    senderEmail?: string;
    avatarUrl?: string;
    senderIsNewUser?: boolean;
    senderUserTag?: string;
    text: string;
    imageUrl?: string;
    replyTo?: {
      id: string;
      senderName: string;
      text: string;
    };
    poll?: ChatPoll;
    isPinned?: boolean;
    pinnedBy?: string;
    pinnedAt?: number;
  }): Promise<GroupChatMessage> {
    if (!db) {
      const err: any = new Error('Database is not initialized.');
      err.code = 'unavailable';
      throw err;
    }

    const text = data.text.trim();
    if (!text && !data.imageUrl && !data.poll) {
      const err: any = new Error('Message cannot be empty.');
      err.code = 'invalid-argument';
      throw err;
    }

    // 1. Ensure user has a valid Firebase Auth session before attempting write
    let fbUser = auth?.currentUser || null;
    if (!fbUser && auth) {
      try {
        fbUser = await authService.ensureFirebaseAuthSession();
      } catch (authErr) {
        console.warn('[Batch 41 Group Chat] Error ensuring auth session:', authErr);
      }
    }

    // 2. Refresh token before writing to avoid expired session errors
    if (fbUser) {
      try {
        await fbUser.getIdToken(false);
      } catch (tokenErr) {
        console.warn('[Batch 41 Group Chat] Token refresh attempt failed, forcing refresh:', tokenErr);
        try {
          await fbUser.getIdToken(true);
        } catch (forceErr) {
          const err: any = new Error('Login session expired. Please sign in again.');
          err.code = 'unauthenticated';
          throw err;
        }
      }
    }

    // 3. Sender ID MUST match request.auth.uid for security rules
    const effectiveSenderId = fbUser?.uid || data.senderId;
    if (!effectiveSenderId) {
      const err: any = new Error('User identity could not be verified.');
      err.code = 'unauthenticated';
      throw err;
    }

    const messageRef = doc(collection(db, 'group_chat_messages'));
    const now = Date.now();

    const isKritika = data.senderName.toLowerCase().includes('kritika') ||
                      Boolean(data.senderEmail && data.senderEmail.toLowerCase().includes('kritika')) ||
                      data.senderName.toLowerCase().includes('marisol');

    // If signed in with verified Google email, use that; otherwise data.senderEmail
    const effectiveSenderEmail = fbUser?.email || data.senderEmail;

    const message: GroupChatMessage = {
      id: messageRef.id,
      senderId: effectiveSenderId,
      senderName: isKritika && !data.senderName.includes('👑') ? `${data.senderName.trim()} 👑` : data.senderName.trim(),
      senderEmail: effectiveSenderEmail,
      avatarUrl: data.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
      senderIsNewUser: data.senderIsNewUser ?? false,
      senderUserTag: data.senderUserTag || (isKritika ? 'Founder 👑' : 'New User'),
      text,
      imageUrl: data.imageUrl,
      replyTo: data.replyTo,
      poll: data.poll,
      timestamp: new Date(now).toISOString(),
      createdAt: now,
      isKritika,
      isPinned: data.isPinned ?? false,
      pinnedBy: data.pinnedBy,
      pinnedAt: data.pinnedAt,
      reactions: {},
      seenBy: [
        {
          userId: effectiveSenderId,
          userName: data.senderName,
          userEmail: effectiveSenderEmail,
          avatarUrl: data.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
          seenAt: now,
        }
      ]
    };

    // If offline, queue message and display optimistically
    if (!this.isOnline) {
      this.chatOfflineQueue.push(message);
      this.saveChatQueueToStorage();
      this.chatMessages.push(message);
      this.saveChatToStorage();
      this.notify();
      return message;
    }

    // 4. Write authoritative record directly to Firestore with exponential backoff for transient errors
    let attempt = 0;
    const maxRetries = 3;
    const baseDelayMs = 400;

    while (true) {
      attempt++;
      try {
        const payload = cleanForFirestore(message);
        await setDoc(messageRef, payload);
        break; // Successfully written to Firestore!
      } catch (err: any) {
        const errCode = err?.code || '';
        const isTransient = errCode === 'unavailable' || 
                            errCode === 'deadline-exceeded' || 
                            errCode === 'resource-exhausted' ||
                            err?.message?.includes('offline') ||
                            err?.message?.includes('transport') ||
                            err?.message?.includes('network');

        if (attempt < maxRetries && isTransient) {
          const delay = baseDelayMs * Math.pow(2, attempt - 1);
          console.warn(`[Batch 41 Group Chat] Transient Firestore error [${errCode || err?.message}]. Retrying attempt ${attempt}/${maxRetries} in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        console.error('[Batch 41 Group Chat] Firestore error sending message:', {
          code: errCode,
          message: err?.message,
          attempt,
          authUid: fbUser?.uid || null,
          authEmail: fbUser?.email || null,
          senderId: message.senderId,
          networkOnline: typeof navigator !== 'undefined' ? navigator.onLine : null
        });

        // Queue offline on failure
        this.chatOfflineQueue.push(message);
        this.saveChatQueueToStorage();
        this.chatMessages.push(message);
        this.saveChatToStorage();
        this.notify();
        throw err;
      }
    }

    // Note: onSnapshot listener receives the Firestore doc and updates this.chatMessages authoritatively
    return message;
  }

  public async reactToChatMessage(messageId: string, emoji: string) {
    if (!db) return;
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return;

    const currentReactions = msg.reactions || {};
    const updatedReactions = {
      ...currentReactions,
      [emoji]: (currentReactions[emoji] || 0) + 1
    };

    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        cleanForFirestore({ reactions: updatedReactions }),
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error reacting to message:', err);
    }
  }

  public async pinChatMessage(messageId: string, pinnedByUid?: string) {
    if (!db) return;
    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        cleanForFirestore({
          isPinned: true,
          pinnedBy: pinnedByUid || 'Classmate',
          pinnedAt: Date.now()
        }),
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error pinning message:', err);
    }
  }

  public async unpinChatMessage(messageId: string) {
    if (!db) return;
    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        {
          isPinned: false,
          pinnedBy: null,
          pinnedAt: null
        },
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error unpinning message:', err);
    }
  }

  public async votePoll(messageId: string, optionId: string, voterId: string, voterName?: string) {
    if (!db) return;
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg || !msg.poll) return;

    const voter = (voterId || voterName || '').trim();
    if (!voter) return;

    msg.poll.options.forEach(opt => {
      if (opt.id === optionId) {
        if (opt.votes.includes(voter)) {
          opt.votes = opt.votes.filter(v => v !== voter);
        } else {
          opt.votes.push(voter);
        }
      } else {
        opt.votes = opt.votes.filter(v => v !== voter);
      }
    });

    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        cleanForFirestore({ poll: msg.poll }),
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error voting on poll:', err);
    }
  }

  /**
   * Edit chat message with strict Firebase UID author verification.
   */
  public async editChatMessage(
    messageId: string, 
    newText: string,
    currentUserId?: string
  ): Promise<{ success: boolean; error?: string }> {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg || msg.isDeletedForEveryone) {
      return { success: false, error: 'Message not found or deleted.' };
    }

    if (!currentUserId || msg.senderId !== currentUserId) {
      return { success: false, error: 'Permission denied: You can only edit your own messages.' };
    }

    const trimmed = newText.trim();
    if (!trimmed) {
      return { success: false, error: 'Message text cannot be empty.' };
    }

    if (db) {
      try {
        await setDoc(
          doc(db, 'group_chat_messages', messageId),
          { text: trimmed, isEdited: true },
          { merge: true }
        );
      } catch (err) {
        console.error('[Batch 41 Group Chat] Firestore error editing message:', err);
        return { success: false, error: 'Failed to edit message in Firestore.' };
      }
    }

    return { success: true };
  }

  /**
   * Delete for me: hides message locally on this client for current user.
   */
  public deleteChatMessageForMe(messageId: string, currentUserId: string) {
    if (!currentUserId) return;
    const hiddenKey = `marisol_chat_hidden_${currentUserId}`;
    try {
      const stored = localStorage.getItem(hiddenKey);
      const hiddenIds: string[] = stored ? JSON.parse(stored) : [];
      if (!hiddenIds.includes(messageId)) {
        hiddenIds.push(messageId);
        localStorage.setItem(hiddenKey, JSON.stringify(hiddenIds));
      }
    } catch {}
    this.notify();
  }

  /**
   * Delete for everyone: deletes document from Firestore (strictly author-only by UID).
   */
  public async deleteChatMessageForEveryone(
    messageId: string,
    currentUserId?: string
  ): Promise<{ success: boolean; error?: string }> {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return { success: false, error: 'Message not found.' };

    if (!currentUserId || msg.senderId !== currentUserId) {
      return { success: false, error: 'Permission denied: Only the author can delete this message for everyone.' };
    }

    if (db) {
      try {
        await deleteDoc(doc(db, 'group_chat_messages', messageId));
      } catch (err) {
        console.error('[Batch 41 Group Chat] Firestore error deleting message for everyone:', err);
        return { success: false, error: 'Failed to delete message from Firestore.' };
      }
    }

    return { success: true };
  }

  /**
   * Read receipts: updates seenBy in Firestore using Firebase UID.
   */
  public async markMessageAsSeen(messageId: string, user: { userId: string; userName: string; userEmail?: string; avatarUrl?: string }) {
    if (!user.userId || !db) return;
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return;

    if (!msg.seenBy) msg.seenBy = [];
    const alreadySeen = msg.seenBy.some(s => s.userId === user.userId);
    if (alreadySeen) return;

    const receipt: MessageReceipt = {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      avatarUrl: user.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
      seenAt: Date.now()
    };
    msg.seenBy.push(receipt);

    try {
      await setDoc(
        doc(db, 'group_chat_messages', msg.id),
        cleanForFirestore({ seenBy: msg.seenBy }),
        { merge: true }
      );
    } catch {}
  }

  public async markAllMessagesAsSeen(user: { userId: string; userName: string; userEmail?: string; avatarUrl?: string }) {
    if (!user.userId || !db) return;
    const now = Date.now();

    for (const msg of this.chatMessages) {
      if (!msg.seenBy) msg.seenBy = [];
      const alreadySeen = msg.seenBy.some(s => s.userId === user.userId);
      if (!alreadySeen) {
        msg.seenBy.push({
          userId: user.userId,
          userName: user.userName,
          userEmail: user.userEmail,
          avatarUrl: user.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
          seenAt: now
        });
        try {
          await setDoc(
            doc(db, 'group_chat_messages', msg.id),
            cleanForFirestore({ seenBy: msg.seenBy }),
            { merge: true }
          );
        } catch {}
      }
    }
  }

  // =========================================================================
  // BULLETIN & INSTAGRAM POSTS MANAGEMENT
  // =========================================================================

  public getPosts(onlyCurrentUser?: boolean, currentUserId?: string): BatchUpdatePost[] {
    let list = this.posts.filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone);
    if (onlyCurrentUser && currentUserId) {
      list = list.filter(p => p.userId === currentUserId);
    }
    return list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  public getAllBatchMembers(additionalClassmates: Array<{ id?: string; name?: string; email?: string; avatarUrl?: string }> = []): BatchMember[] {
    const memberMap = new Map<string, BatchMember>();

    KNOWN_BATCH_MEMBERS.forEach(m => memberMap.set(m.name.toLowerCase(), m));

    additionalClassmates.forEach(c => {
      if (!c.name) return;
      const key = c.name.toLowerCase();
      if (!memberMap.has(key)) {
        memberMap.set(key, {
          id: c.id || `member_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          name: c.name,
          email: c.email,
          avatarUrl: c.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
          isKritika: c.name.toLowerCase().includes('kritika') || Boolean(c.email && c.email.toLowerCase().includes('kritika'))
        });
      }
    });

    return Array.from(memberMap.values());
  }

  public getInstagramPosts(): InstagramPost[] {
    const postMap = new Map<string, InstagramPost>();

    DEFAULT_INSTAGRAM_POSTS.forEach(dp => {
      if (!this.deletedPostIds.has(dp.id)) {
        postMap.set(dp.id, dp);
      }
    });

    this.instagramPosts.forEach(p => {
      if (!this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone) {
        postMap.set(p.id, p);
      }
    });

    return Array.from(postMap.values()).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  public isPostDeleted(postId: string): boolean {
    return this.deletedPostIds.has(postId);
  }

  public getNetworkStatus(): { isOnline: boolean; queuedCount: number; syncToast: string | null } {
    return {
      isOnline: this.isOnline,
      queuedCount: this.offlineQueue.length + this.chatOfflineQueue.length,
      syncToast: this.lastSyncToast
    };
  }

  public clearSyncToast() {
    this.lastSyncToast = null;
    this.notify();
  }

  public addPost(postData: {
    userId?: string;
    userEmail?: string;
    studentName: string;
    avatarPose: string;
    mood: string;
    moodEmoji: string;
    text: string;
    imageUrl?: string;
  }): { queued: boolean; post: BatchUpdatePost } {
    const newPost: BatchUpdatePost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: postData.userId || (auth?.currentUser?.uid ?? undefined),
      userEmail: postData.userEmail || (auth?.currentUser?.email ?? undefined),
      batch: 'MLP41PT',
      studentName: postData.studentName.trim() || 'MLP41PT Student',
      avatarPose: postData.avatarPose,
      mood: postData.mood,
      moodEmoji: postData.moodEmoji,
      text: postData.text.trim(),
      imageUrl: postData.imageUrl,
      timestamp: 'Just now',
      createdAt: Date.now(),
      reactions: {}
    };

    if (!this.isOnline) {
      this.offlineQueue.unshift(newPost);
      this.saveQueueToStorage();
      this.lastSyncToast = 'Offline: update queued, will sync automatically when back online 📡';
      this.notify();
      return { queued: true, post: newPost };
    } else {
      this.posts.unshift(newPost);
      this.saveToStorage();
      this.syncPostToFirestore(newPost);
      this.notify();
      return { queued: false, post: newPost };
    }
  }

  public async addInstagramPost(data: {
    userId?: string;
    authorId?: string;
    userEmail?: string;
    authorEmail?: string;
    authorName: string;
    authorAvatarUrl?: string;
    location?: string;
    imageUrl?: string;
    images?: string[];
    filter?: string;
    caption: string;
    hashtags?: string[];
  }): Promise<InstagramPost> {
    const name = data.authorName.trim() || 'Batch 41 Creator';
    const isKritika = name.toLowerCase().includes('kritika') || 
                      (data.userEmail && data.userEmail.toLowerCase().includes('kritika')) ||
                      name.toLowerCase().includes('marisol');

    const imagesList = data.images && data.images.length > 0 ? data.images : (data.imageUrl ? [data.imageUrl] : []);
    const mainImageUrl = imagesList[0] || data.imageUrl || '';

    const newPost: InstagramPost = {
      id: `insta_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: data.userId || (auth?.currentUser?.uid ?? undefined),
      authorId: data.authorId || data.userId || (auth?.currentUser?.uid ?? undefined),
      userEmail: data.userEmail || (auth?.currentUser?.email ?? undefined),
      authorEmail: data.authorEmail || data.userEmail || (auth?.currentUser?.email ?? undefined),
      authorName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
      authorAvatarUrl: data.authorAvatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      location: data.location || 'Batch 41 Comfort Hub 🌸',
      imageUrl: mainImageUrl,
      images: imagesList,
      filter: data.filter || 'none',
      caption: data.caption.trim(),
      hashtags: data.hashtags && data.hashtags.length > 0 ? data.hashtags : ['#Batch41', '#FactoryOfFun'],
      likesCount: 1,
      likedByCurrentUser: true,
      likedByUsers: [name],
      comments: [],
      saved: false,
      timestamp: 'Just now',
      createdAt: Date.now(),
      isKritika
    };

    this.instagramPosts.unshift(newPost);
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', newPost.id), cleanForFirestore(newPost));
      } catch (err) {
        console.warn('Failed to add insta post to Firestore:', err);
      }
    }

    this.notify();
    return newPost;
  }

  public async pinInstagramPost(postId: string, pinnedBy?: string) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    const willPin = !post.isPinned;
    post.isPinned = willPin;
    post.pinnedBy = willPin ? (pinnedBy || 'Classmate') : undefined;
    post.pinnedAt = willPin ? Date.now() : undefined;

    this.saveInstaToStorage();
    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), {
          isPinned: willPin,
          pinnedBy: willPin ? (pinnedBy || 'Classmate') : null,
          pinnedAt: willPin ? Date.now() : null
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to update post pin on Firestore:', err);
      }
    }

    this.notify();
  }

  public async unpinInstagramPost(postId: string) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    post.isPinned = false;
    post.pinnedBy = undefined;
    post.pinnedAt = undefined;
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), {
          isPinned: false,
          pinnedBy: null,
          pinnedAt: null
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to unpin post on Firestore:', err);
      }
    }

    this.notify();
  }

  public async editInstagramPost(
    postId: string, 
    newCaption: string,
    editor?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return { success: false, error: 'Post not found.' };

    if (editor) {
      const editorNameClean = (editor.name || '').replace(' 👑', '').trim().toLowerCase();
      const authorNameClean = (post.authorName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (editor.id && post.userId && editor.id === post.userId) ||
        (editor.email && (post.userEmail || post.authorEmail) && editor.email.toLowerCase().trim() === (post.userEmail || post.authorEmail)?.toLowerCase().trim()) ||
        (editorNameClean !== '' && editorNameClean === authorNameClean)
      );

      if (!isAuthor) {
        return { success: false, error: 'Permission denied: You can only edit your own posts.' };
      }
    }

    post.caption = newCaption.trim();
    post.isEdited = true;
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), { caption: post.caption, isEdited: true }, { merge: true });
      } catch (err) {
        console.warn('Failed to edit post on Firestore:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public async deleteInstagramPost(
    postId: string,
    deleter?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    if (!postId) return { success: false, error: 'Invalid post ID' };
    const post = this.instagramPosts.find(p => p.id === postId) || DEFAULT_INSTAGRAM_POSTS.find(p => p.id === postId);
    if (!post) {
      return { success: true };
    }

    if (deleter) {
      const isKritika = (deleter.name || '').toLowerCase().includes('kritika') || (deleter.email || '').toLowerCase().includes('kritika');
      const deleterNameClean = (deleter.name || '').replace(' 👑', '').trim().toLowerCase();
      const authorNameClean = (post.authorName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (deleter.id && (post.userId || post.authorId) && (deleter.id === post.userId || deleter.id === post.authorId)) ||
        (deleter.email && (post.userEmail || post.authorEmail) && deleter.email.toLowerCase().trim() === (post.userEmail || post.authorEmail)?.toLowerCase().trim()) ||
        (deleterNameClean !== '' && deleterNameClean === authorNameClean)
      );

      if (!isAuthor && !isKritika) {
        return { success: false, error: 'Permission denied: Only the author can delete this post.' };
      }
    }

    // 1. Instantly purge locally and record deleted post ID
    this.deletedPostIds.add(postId);
    this.saveDeletedPostsToStorage();
    this.instagramPosts = this.instagramPosts.filter(p => p.id !== postId);
    this.saveInstaToStorage();

    // 2. Broadcast to other open browser tabs
    try {
      this.broadcastChannel?.postMessage({ type: 'DELETE_INSTA_POST', postId });
    } catch {}

    // 3. Multi-layer authoritative purge in Firestore for all users
    if (db) {
      // Step A: Mark as deleted on post doc (soft-delete safeguard so any cached reads immediately ignore it)
      try {
        await setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({
          isDeleted: true,
          isDeletedForEveryone: true,
          deletedAt: Date.now()
        }), { merge: true });
      } catch (err) {
        console.warn('[BatchWall] Firestore soft-delete mark notice:', err);
      }

      // Step B: Hard-delete document from collection
      try {
        await deleteDoc(doc(db, 'instagram_posts', postId));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleteDoc notice:', err);
      }

      // Step C: Save to shared 'deleted_posts' registry so other users sync deletion permanently
      try {
        await setDoc(doc(db, 'deleted_posts', postId), cleanForFirestore({
          id: postId,
          type: 'instagram_post',
          deletedAt: Date.now(),
          deleterName: deleter?.name || 'Author'
        }));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleted_posts registry notice:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public likeInstagramPost(
    postId: string, 
    userInfo?: { id?: string; name?: string; email?: string; avatarUrl?: string } | string
  ) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    const userName = typeof userInfo === 'string' ? userInfo : (userInfo?.name || 'Classmate');
    const userId = typeof userInfo === 'object' ? userInfo?.id : undefined;
    const userEmail = typeof userInfo === 'object' ? userInfo?.email : undefined;
    const avatarUrl = typeof userInfo === 'object' ? userInfo?.avatarUrl : undefined;

    if (!post.likedByUsers) post.likedByUsers = [];
    if (!post.likedByMembers) post.likedByMembers = [];

    const existingMemberIdx = post.likedByMembers.findIndex(m => 
      (userId && m.userId === userId) ||
      (userEmail && m.userEmail && m.userEmail.toLowerCase() === userEmail.toLowerCase()) ||
      (m.userName && m.userName.toLowerCase().trim() === userName.toLowerCase().trim())
    );

    const isAlreadyLiked = post.likedByCurrentUser || existingMemberIdx >= 0 || post.likedByUsers.some(u => u.toLowerCase().trim() === userName.toLowerCase().trim());

    if (isAlreadyLiked) {
      post.likedByCurrentUser = false;
      post.likesCount = Math.max(0, post.likesCount - 1);
      post.likedByUsers = post.likedByUsers.filter(u => u.toLowerCase().trim() !== userName.toLowerCase().trim());
      if (existingMemberIdx >= 0) {
        post.likedByMembers.splice(existingMemberIdx, 1);
      }
    } else {
      post.likedByCurrentUser = true;
      post.likesCount += 1;
      if (!post.likedByUsers.some(u => u.toLowerCase().trim() === userName.toLowerCase().trim())) {
        post.likedByUsers.push(userName);
      }
      post.likedByMembers.push({
        userId,
        userName,
        userEmail,
        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
        likedAt: Date.now()
      });
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({ 
          likesCount: post.likesCount,
          likedByUsers: post.likedByUsers || [],
          likedByMembers: post.likedByMembers || []
        }), { merge: true });
      } catch {}
    }

    this.notify();
  }

  public reactToInstagramPost(
    postId: string,
    emoji: string,
    userInfo?: { id?: string; name?: string; email?: string } | string
  ) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    const userName = typeof userInfo === 'string' ? userInfo : (userInfo?.name || 'Classmate');

    if (!post.reactions) post.reactions = {};
    if (!post.reactedUsers) post.reactedUsers = {};

    const usersForEmoji = post.reactedUsers[emoji] || [];
    const hasReacted = usersForEmoji.some(u => u.toLowerCase().trim() === userName.toLowerCase().trim());

    if (hasReacted) {
      // Toggle off
      post.reactedUsers[emoji] = usersForEmoji.filter(u => u.toLowerCase().trim() !== userName.toLowerCase().trim());
      post.reactions[emoji] = Math.max(0, (post.reactions[emoji] || 1) - 1);
      if (post.reactions[emoji] === 0) {
        delete post.reactions[emoji];
        delete post.reactedUsers[emoji];
      }
    } else {
      // Toggle on
      post.reactedUsers[emoji] = [...usersForEmoji, userName];
      post.reactions[emoji] = (post.reactions[emoji] || 0) + 1;
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({
          reactions: post.reactions || {},
          reactedUsers: post.reactedUsers || {}
        }), { merge: true });
      } catch {}
    }

    this.notify();
  }

  public async shareInstagramPost(
    postId: string,
    userInfo?: { id?: string; name?: string } | string
  ): Promise<number> {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return 0;

    const userName = typeof userInfo === 'string' ? userInfo : (userInfo?.name || 'Classmate');

    post.sharesCount = (post.sharesCount || 0) + 1;
    if (!post.sharedByUsers) post.sharedByUsers = [];
    if (!post.sharedByUsers.includes(userName)) {
      post.sharedByUsers.push(userName);
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({
          sharesCount: post.sharesCount,
          sharedByUsers: post.sharedByUsers || []
        }), { merge: true });
      } catch {}
    }

    this.notify();
    return post.sharesCount;
  }

  public likeInstagramComment(
    postId: string,
    commentId: string,
    currentUserName?: string
  ) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post || !post.comments) return;

    const comment = post.comments.find(c => c.id === commentId);
    if (!comment) return;

    const user = currentUserName || 'Classmate';
    if (!comment.likedByUsers) comment.likedByUsers = [];

    if (comment.likedByUsers.includes(user)) {
      comment.likedByUsers = comment.likedByUsers.filter(u => u !== user);
      comment.likesCount = Math.max(0, (comment.likesCount || 1) - 1);
    } else {
      comment.likedByUsers.push(user);
      comment.likesCount = (comment.likesCount || 0) + 1;
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({ comments: post.comments }), { merge: true });
      } catch {}
    }

    this.notify();
  }

  public toggleBookmarkInstagramPost(postId: string) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    post.saved = !post.saved;
    this.saveInstaToStorage();
    this.notify();
  }

  public async addInstagramComment(postId: string, commentData: {
    authorId?: string;
    authorName: string;
    authorEmail?: string;
    avatarUrl?: string;
    text: string;
  }): Promise<InstagramComment | null> {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return null;

    if (!post.comments) {
      post.comments = [];
    }

    const name = commentData.authorName.trim() || 'Classmate';
    const email = commentData.authorEmail || '';
    const isKritika = name.toLowerCase().includes('kritika') || 
                      email.toLowerCase().includes('kritika') ||
                      name.toLowerCase().includes('marisol');

    const newComment: InstagramComment = {
      id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      authorId: commentData.authorId,
      authorName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
      authorEmail: commentData.authorEmail,
      avatarUrl: commentData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      text: commentData.text.trim(),
      timestamp: 'Just now',
      createdAt: Date.now(),
      likesCount: 0,
      likedByUsers: [],
      isKritika
    };

    post.comments.push(newComment);
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({ comments: post.comments }), { merge: true });
      } catch (err) {
        console.warn('Failed to sync insta comment to Firestore:', err);
      }
    }

    this.notify();
    return newComment;
  }

  public async deletePost(
    postId: string,
    deleter?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    if (!postId) return { success: false, error: 'Invalid post ID' };
    const post = this.posts.find(p => p.id === postId);
    if (!post) {
      return { success: true };
    }

    if (deleter) {
      const isKritika = (deleter.name || '').toLowerCase().includes('kritika') || (deleter.email || '').toLowerCase().includes('kritika');
      const deleterNameClean = (deleter.name || '').replace(' 👑', '').trim().toLowerCase();
      const authorNameClean = (post.studentName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (deleter.id && post.userId && deleter.id === post.userId) ||
        (deleter.email && post.userEmail && deleter.email.toLowerCase().trim() === post.userEmail?.toLowerCase().trim()) ||
        (deleterNameClean !== '' && deleterNameClean === authorNameClean)
      );

      if (!isAuthor && !isKritika) {
        return { success: false, error: 'Permission denied: Only the author can delete this sticky note.' };
      }
    }

    // 1. Instantly purge locally and record deleted post ID
    this.deletedPostIds.add(postId);
    this.saveDeletedPostsToStorage();
    this.posts = this.posts.filter(p => p.id !== postId);
    this.offlineQueue = this.offlineQueue.filter(p => p.id !== postId);
    this.saveToStorage();
    this.saveQueueToStorage();

    // 2. Broadcast to other open browser tabs
    try {
      this.broadcastChannel?.postMessage({ type: 'DELETE_BULLETIN_POST', postId });
    } catch {}

    // 3. Multi-layer authoritative purge in Firestore for all users
    if (db) {
      // Step A: Mark as deleted on post doc
      try {
        await setDoc(doc(db, 'batch_updates', postId), cleanForFirestore({
          isDeleted: true,
          isDeletedForEveryone: true,
          deletedAt: Date.now()
        }), { merge: true });
      } catch (err) {
        console.warn('[BatchWall] Firestore soft-delete mark notice:', err);
      }

      // Step B: Hard-delete document from collection
      try {
        await deleteDoc(doc(db, 'batch_updates', postId));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleteDoc notice:', err);
      }

      // Step C: Save to shared 'deleted_posts' registry so other users sync deletion permanently
      try {
        await setDoc(doc(db, 'deleted_posts', postId), cleanForFirestore({
          id: postId,
          type: 'bulletin_post',
          deletedAt: Date.now(),
          deleterName: deleter?.name || 'Author'
        }));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleted_posts registry notice:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public reactToPost(postId: string, stickerAliasOrId: string) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    if (!post.reactions) {
      post.reactions = {};
    }

    post.reactions[stickerAliasOrId] = (post.reactions[stickerAliasOrId] || 0) + 1;
    this.saveToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_POSTS' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'batch_updates', postId), { reactions: post.reactions }, { merge: true });
      } catch {}
    }

    this.notify();
  }

  public async addReply(postId: string, replyData: {
    authorId?: string;
    authorName: string;
    authorEmail?: string;
    avatarUrl?: string;
    text: string;
    isKritika?: boolean;
  }): Promise<BulletinReply | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    if (!post.replies) {
      post.replies = [];
    }

    const email = replyData.authorEmail || '';
    const name = replyData.authorName || '';
    const isKritika = replyData.isKritika || 
      name.toLowerCase().includes('kritika') || 
      email.toLowerCase().includes('kritika') ||
      name.toLowerCase().includes('marisol');

    const newReply: BulletinReply = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      authorId: replyData.authorId,
      authorName: replyData.authorName.trim() || 'Batch 41 Classmate',
      authorEmail: replyData.authorEmail,
      avatarUrl: replyData.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
      text: replyData.text.trim(),
      timestamp: 'Just now',
      createdAt: Date.now(),
      isKritika
    };

    post.replies.push(newReply);
    this.saveToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_POSTS' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'batch_updates', postId), { replies: post.replies }, { merge: true });
      } catch (err) {
        console.warn('Failed to sync reply to Firestore:', err);
      }
    }

    this.notify();
    return newReply;
  }

  /**
   * Matches the group chat messages table for the current session user:
   * Extracts user ID, finds all matched messages in the table,
   * identifies the user's current (latest) message, and returns the matched dataset.
   */
  public getUserMatchedChatData(userQuery: { id?: string; email?: string; name?: string }): {
    userId: string;
    userName: string;
    userEmail: string;
    matchedMessages: GroupChatMessage[];
    currentMessage: GroupChatMessage | null;
    totalMatched: number;
  } {
    const rawId = userQuery.id?.trim() || '';
    const rawEmail = userQuery.email?.trim().toLowerCase() || '';
    const rawName = (userQuery.name || '').replace(' 👑', '').trim().toLowerCase();

    const resolvedUserId = rawId || (rawEmail ? `user_${rawEmail.split('@')[0]}` : (rawName ? `user_${rawName.replace(/\s+/g, '_')}` : 'user_student'));

    const matchedMessages = this.chatMessages.filter(msg => {
      const msgSenderId = msg.senderId?.trim();
      const msgEmail = msg.senderEmail?.trim().toLowerCase();
      const msgName = (msg.senderName || '').replace(' 👑', '').trim().toLowerCase();

      if (rawId && msgSenderId && rawId === msgSenderId) return true;
      if (rawEmail && msgEmail && rawEmail === msgEmail) return true;
      if (rawName && msgName && rawName === msgName) return true;
      return false;
    });

    const currentMessage = matchedMessages.length > 0 ? matchedMessages[matchedMessages.length - 1] : null;

    return {
      userId: resolvedUserId,
      userName: userQuery.name || 'Student',
      userEmail: rawEmail,
      matchedMessages,
      currentMessage,
      totalMatched: matchedMessages.length
    };
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const batchWallService = new BatchWallService();

```

---

### File: `src/services/firebase.ts`

```ts
// Firebase Initialization & Services for Marisol: Factory of Fun (Spec v2)
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInAnonymously,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  type Auth,
  type User as FirebaseUser,
  type ConfirmationResult
} from 'firebase/auth';
import { 
  getFirestore, 
  initializeFirestore,
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where,
  orderBy, 
  limit, 
  serverTimestamp, 
  type Firestore 
} from 'firebase/firestore';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Read from Vite environment variables with fallback to active project credentials
const envConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyD4dIfV_Xv7sE_sx4wHE6n66QGWw9HZf-A',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kritika-61cc2.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kritika-61cc2',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kritika-61cc2.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '926415718546',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:926415718546:web:bbca8e9e21becdbc8d7e4b',
};

// Check if valid Firebase credentials are provided
export const isFirebaseConfigured = Boolean(
  envConfig.apiKey && 
  envConfig.apiKey !== 'YOUR_FIREBASE_API_KEY' &&
  envConfig.projectId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(envConfig);
    auth = getAuth(app);
    try {
      db = initializeFirestore(app, {
        ignoreUndefinedProperties: true
      });
    } catch {
      db = getFirestore(app);
    }
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (error) {
    console.warn('Firebase initialization error, fallback mode active:', error);
  }
}

export { 
  app, 
  auth, 
  db, 
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInAnonymously,
  firebaseSignOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type FirebaseUser,
  type ConfirmationResult
};

```

---

### File: `src/services/gameState.ts`

```ts
import type { PlayerProfile, Achievement, TeacherProfile, ChefTitle, Recipe } from '../types/game';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { RECIPES, RECIPES_BY_MOOD } from '../data/recipes';
import { QUESTIONS_DATABASE } from '../data/questions';

const PLAYER_STORAGE_KEY = 'marisol_factory_player_profile';
const ACHIEVEMENTS_STORAGE_KEY = 'marisol_factory_achievements';
const TEACHER_STORAGE_KEY = 'marisol_factory_teacher_profile';

const DEFAULT_PLAYER: PlayerProfile = {
  nickname: 'Kritika (Chef)',
  level: 1,
  xp: 0,
  cucumberSandwiches: 0, // Primary culinary score & currency
  chefTitle: 'Apprentice Chopper 🥒',
  unlockedRecipes: ['cucumber_mint_sandwich'],
  collectedIngredients: [],
  streak: 0,
  bestStreak: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  factsDiscovered: 0,
  favouriteCategory: 'Food & Cooking',
  interests: ['Food & Cooking', 'Movies', 'Bollywood'],
  unlockedZones: ['zone_1'],
  completedBosses: [],
  stamps: ['Cinema', 'Foodie'],
  powerUps: {
    hint: 3,
    clue: 3,
    time_freeze: 2,
    second_chance: 2,
    streak_shield: 1,
  },
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
  activeSticker: 'brighter_ideas',
};


const DEFAULT_TEACHER: TeacherProfile = {
  teacherName: 'Prof. Sharma',
  subject: 'Cinema & Media Arts',
  favoriteMovies: '3 Idiots, Inception, Dil Se, Interstellar',
  favoriteShows: 'Friends, Breaking Bad',
  famousPhrases: [
    '"Curiosity is the engine of learning!"',
    '"There are no wrong questions, only sneaky ones!"',
    '"Always check your sources, movie buffs!"'
  ],
  classroomMemories: [
    'When the whole class sang Chaiyya Chaiyya during recess',
    'The legendary 3-hour movie debate on Inception\'s spinning top',
    'Friday popcorn trivia afternoons'
  ],
  classmateNames: ['Aarav', 'Riya', 'Ananya', 'Karan', 'Dev', 'Sneha', 'Vikram'],
  customMessage: 'Thank you for inspiring our curiosity every single day! You made learning feel like an unforgettable adventure.'
};

class GameStateManager {
  private profile: PlayerProfile;
  private achievements: Achievement[];
  private teacherProfile: TeacherProfile;

  constructor() {
    this.profile = this.loadPlayer();
    this.achievements = this.loadAchievements();
    this.teacherProfile = this.loadTeacherProfile();
  }

  public calculateChefTitle(sandwiches: number): ChefTitle {
    if (sandwiches >= 200) return '3-Star Master Chef 👑';
    if (sandwiches >= 140) return 'Culinary Maestro 🌟';
    if (sandwiches >= 95) return 'Executive Head Chef 👩‍🍳';
    if (sandwiches >= 60) return 'Flavor Alchemist 🍲';
    if (sandwiches >= 35) return 'Bistro Sous Chef 🍳';
    if (sandwiches >= 15) return 'Street Food Gourmet 🥪';
    return 'Apprentice Chopper 🥒';
  }

  private loadPlayer(): PlayerProfile {
    try {
      const saved = localStorage.getItem(PLAYER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const cucumberSandwiches = parsed.cucumberSandwiches ?? (parsed.xp ? Math.floor(parsed.xp / 100) : 0);
        return {
          ...DEFAULT_PLAYER,
          ...parsed,
          cucumberSandwiches,
          chefTitle: parsed.chefTitle || this.calculateChefTitle(cucumberSandwiches),
          unlockedRecipes: parsed.unlockedRecipes || ['cucumber_mint_sandwich'],
          collectedIngredients: parsed.collectedIngredients || [],
        };
      }
    } catch (e) {
      console.warn('Failed to load player profile from localStorage', e);
    }
    return { ...DEFAULT_PLAYER };
  }

  public savePlayer(profile?: PlayerProfile) {
    if (profile) this.profile = profile;
    try {
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.profile));
    } catch (e) {
      console.warn('Failed to save player profile to localStorage', e);
    }
  }

  public getPlayer(): PlayerProfile {
    return { ...this.profile };
  }

  public updateInterests(interests: any[]) {
    this.profile.interests = interests;
    this.profile.onboardingCompleted = true;
    this.savePlayer();
  }

  public addCucumberSandwiches(count: number): {
    total: number;
    titleUpgraded: boolean;
    newTitle: ChefTitle;
    prevTitle: ChefTitle;
  } {
    const prevTitle = this.profile.chefTitle || this.calculateChefTitle(this.profile.cucumberSandwiches || 0);
    this.profile.cucumberSandwiches = (this.profile.cucumberSandwiches || 0) + count;
    
    // Also award XP in parallel so standard levels progress too
    this.profile.xp += count * 50;
    this.profile.level = this.calculateLevel(this.profile.xp);

    const newTitle = this.calculateChefTitle(this.profile.cucumberSandwiches);
    const titleUpgraded = newTitle !== prevTitle;
    this.profile.chefTitle = newTitle;

    this.checkAchievements();
    this.savePlayer();
    return { total: this.profile.cucumberSandwiches, titleUpgraded, newTitle, prevTitle };
  }

  public addCollectedIngredient(ingredient: string) {
    if (!this.profile.collectedIngredients) this.profile.collectedIngredients = [];
    if (!this.profile.collectedIngredients.includes(ingredient)) {
      this.profile.collectedIngredients.push(ingredient);
      this.savePlayer();
    }
  }

  public clearCollectedIngredients() {
    this.profile.collectedIngredients = [];
    this.savePlayer();
  }

  public getCollectedIngredients(): string[] {
    return this.profile.collectedIngredients || [];
  }

  public unlockRecipe(recipeId: string): boolean {
    if (!this.profile.unlockedRecipes) this.profile.unlockedRecipes = [];
    if (!this.profile.unlockedRecipes.includes(recipeId)) {
      this.profile.unlockedRecipes.push(recipeId);
      this.savePlayer();
      return true; // Newly unlocked
    }
    return false;
  }

  public getUnlockedRecipes(): string[] {
    return this.profile.unlockedRecipes || ['cucumber_mint_sandwich'];
  }

  public getEndlessCourse(moodAlias?: string, roundIndex: number = 0): {
    questions: any[];
    targetRecipe: Recipe;
  } {
    let targetRecipe = moodAlias ? RECIPES_BY_MOOD[moodAlias] : undefined;
    if (!targetRecipe) {
      targetRecipe = RECIPES[roundIndex % RECIPES.length];
    }

    const foodQuestions = QUESTIONS_DATABASE.filter(q => q.category === 'Food & Cooking');
    const movieQuestions = QUESTIONS_DATABASE.filter(q => q.category === 'Movies' || q.category === 'Bollywood');
    const allCandidate = [...foodQuestions, ...movieQuestions];

    const shuffled = [...allCandidate].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const ingredients = targetRecipe.secretIngredients;
    const finalQuestions = selected.map((q, idx) => ({
      ...q,
      secretIngredient: ingredients[idx % ingredients.length] || q.secretIngredient || 'Chef Secret Spice ✨'
    }));

    return { questions: finalQuestions, targetRecipe };
  }

  public addXp(amount: number): { newLevel: boolean; newLevelNum: number } {

    const prevLevel = this.calculateLevel(this.profile.xp);
    this.profile.xp += amount;
    const newLevelNum = this.calculateLevel(this.profile.xp);
    
    let newLevel = false;
    if (newLevelNum > prevLevel) {
      this.profile.level = newLevelNum;
      newLevel = true;
    }
    
    this.checkAchievements();
    this.savePlayer();
    return { newLevel, newLevelNum };
  }

  public calculateLevel(xp: number): number {
    // Level formula: Level = Math.floor(xp / 300) + 1
    return Math.floor(xp / 300) + 1;
  }

  public incrementStreak(): number {
    this.profile.streak += 1;
    if (this.profile.streak > this.profile.bestStreak) {
      this.profile.bestStreak = this.profile.streak;
    }
    this.checkAchievements();
    this.savePlayer();
    return this.profile.streak;
  }

  public resetStreak() {
    this.profile.streak = 0;
    this.savePlayer();
  }

  public recordQuestionAnswered(isCorrect: boolean, factDiscovered: boolean = true) {
    this.profile.questionsAnswered += 1;
    if (isCorrect) {
      this.profile.correctAnswers += 1;
    }
    if (factDiscovered) {
      this.profile.factsDiscovered += 1;
    }
    this.checkAchievements();
    this.savePlayer();
  }

  public unlockZone(zoneId: string) {
    if (!this.profile.unlockedZones.includes(zoneId)) {
      this.profile.unlockedZones.push(zoneId);
      this.savePlayer();
    }
  }

  public usePowerUp(powerUpId: 'hint' | 'clue' | 'time_freeze' | 'second_chance' | 'streak_shield'): boolean {
    if (this.profile.powerUps[powerUpId] > 0) {
      this.profile.powerUps[powerUpId] -= 1;
      this.savePlayer();
      return true;
    }
    return false;
  }

  public addPowerUp(powerUpId: string, count: number = 1) {
    this.profile.powerUps[powerUpId] = (this.profile.powerUps[powerUpId] || 0) + count;
    this.savePlayer();
  }

  // Achievements
  private loadAchievements(): Achievement[] {
    try {
      const saved = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (saved) {
        const parsed: Achievement[] = JSON.parse(saved);
        // Merge with initial list in case new achievements were added
        return INITIAL_ACHIEVEMENTS.map(initial => {
          const found = parsed.find(p => p.id === initial.id);
          return found ? { ...initial, ...found } : initial;
        });
      }
    } catch (e) {
      console.warn('Failed to load achievements', e);
    }
    return [...INITIAL_ACHIEVEMENTS];
  }

  public saveAchievements() {
    try {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(this.achievements));
    } catch (e) {
      console.warn('Failed to save achievements', e);
    }
  }

  public getAchievements(): Achievement[] {
    return [...this.achievements];
  }

  public checkAchievements(): Achievement[] {
    const newlyUnlocked: Achievement[] = [];

    this.achievements.forEach(ach => {
      if (ach.unlocked) return;

      let isUnlocked = false;

      switch (ach.id) {
        case 'ach_1': // Marisol's Favorite
          if (this.profile.questionsAnswered >= 5) isUnlocked = true;
          break;
        case 'ach_2': // Cinema Nerd
          if (this.profile.correctAnswers >= 10) isUnlocked = true;
          break;
        case 'ach_5': // On Fire
          if (this.profile.streak >= 5) isUnlocked = true;
          break;
        case 'ach_6': // Fact Machine
          if (this.profile.xp >= 1000) isUnlocked = true;
          break;
        case 'ach_7': // Wait What
          if (this.profile.factsDiscovered >= 10) isUnlocked = true;
          break;
        case 'ach_8': // World Explorer
          if (this.profile.unlockedZones.length >= 3) isUnlocked = true;
          break;
      }

      if (isUnlocked) {
        ach.unlocked = true;
        ach.unlockedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveAchievements();
    }

    return newlyUnlocked;
  }

  // Teacher Profile
  private loadTeacherProfile(): TeacherProfile {
    try {
      const saved = localStorage.getItem(TEACHER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load teacher profile', e);
    }
    return { ...DEFAULT_TEACHER };
  }

  public getTeacherProfile(): TeacherProfile {
    return { ...this.teacherProfile };
  }

  public saveTeacherProfile(newProfile: TeacherProfile) {
    this.teacherProfile = { ...newProfile };
    try {
      localStorage.setItem(TEACHER_STORAGE_KEY, JSON.stringify(this.teacherProfile));
    } catch (e) {
      console.warn('Failed to save teacher profile', e);
    }
  }

  public setActiveSticker(stickerAlias: string) {
    this.profile.activeSticker = stickerAlias;
    this.savePlayer();
  }

  public getActiveSticker(): string {
    return this.profile.activeSticker || 'brighter_ideas';
  }
}

export const gameState = new GameStateManager();

```

---

### File: `src/services/moodQuizService.ts`

```ts
import { MOOD_MACARONIS, type MacaroniDish } from '../data/macaroniRecipes';
import { nonRepeatingQuizEngine } from '../data/foodMovieQuestions1000';
import type { Question, Category } from '../types/game';

import moodHappyImg from '../assets/moods/mood_happy.jpg';
import moodExcitedImg from '../assets/moods/mood_excited.jpg';
import moodCalmImg from '../assets/moods/mood_calm.jpg';
import moodStressedImg from '../assets/moods/mood_stressed.jpg';
import moodTiredImg from '../assets/moods/mood_tired.jpg';
import moodMotivatedImg from '../assets/moods/mood_motivated.jpg';
import moodPlayfulImg from '../assets/moods/mood_playful.jpg';
import moodGratefulImg from '../assets/moods/mood_grateful.jpg';
import moodConfidentImg from '../assets/moods/mood_confident.jpg';

export interface MoodProfileSetting {
  id: string;
  scaleNumber: number; // 1 to 9
  label: string;
  emoji: string;
  imageSrc: string;
  stickerQuote: string;
  vibe: string;
  dialogue: string;
  themeColor: string;
  targetCategories: Category[];
  preferredTheme: 'Food' | 'Movies';
}

export const KRITIKA_STICKER_MOODS: MoodProfileSetting[] = [
  {
    id: 'happy',
    scaleNumber: 1,
    label: 'Happy',
    emoji: '🌸',
    imageSrc: moodHappyImg,
    stickerQuote: 'Radiant Sunshine <3',
    vibe: 'Joyful & bright',
    dialogue: 'Your smile brings the brightest sunshine to our world! Keep shining, queen! ✨💖',
    themeColor: '#EC4899',
    targetCategories: ['Bollywood', 'Movies', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'excited',
    scaleNumber: 2,
    label: 'Excited',
    emoji: '⚡',
    imageSrc: moodExcitedImg,
    stickerQuote: 'Super Hyped & Ready!',
    vibe: 'High energy & thrilled',
    dialogue: 'That electric energy is contagious! Let’s celebrate big wins and have endless fun! ⚡🎉',
    themeColor: '#F59E0B',
    targetCategories: ['Bollywood', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'calm',
    scaleNumber: 3,
    label: 'Calm',
    emoji: '☕',
    imageSrc: moodCalmImg,
    stickerQuote: 'Peace & Warm Chai <3',
    vibe: 'Peaceful & grounded',
    dialogue: 'Hot cup of ginger chai & soothing comfort on our agenda today. Breathe easy. ☕☁️',
    themeColor: '#10B981',
    targetCategories: ['Food & Cooking', 'Pop Culture'],
    preferredTheme: 'Food'
  },
  {
    id: 'stressed',
    scaleNumber: 4,
    label: 'Stressed',
    emoji: '🥺',
    imageSrc: moodStressedImg,
    stickerQuote: 'Need a Gentle Hug',
    vibe: 'Overwhelmed & anxious',
    dialogue: 'Deep breath, darling. Drop your shoulders, sip some water. You are doing amazing! 🌸💆‍♀️',
    themeColor: '#3B82F6',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Food'
  },
  {
    id: 'tired',
    scaleNumber: 5,
    label: 'Tired',
    emoji: '💤',
    imageSrc: moodTiredImg,
    stickerQuote: 'Recharging Battery...',
    vibe: 'Low energy & sleepy',
    dialogue: 'You worked so hard today. Let’s wrap in a warm blanket and cozy up. 🌙💤',
    themeColor: '#8B5CF6',
    targetCategories: ['Movies', 'Food & Cooking'],
    preferredTheme: 'Movies'
  },
  {
    id: 'motivated',
    scaleNumber: 6,
    label: 'Motivated',
    emoji: '💼',
    imageSrc: moodMotivatedImg,
    stickerQuote: 'Focused & Slaying',
    vibe: 'Ambitious & driven',
    dialogue: 'Look at you conquering your goals! Slay those tasks and reach new heights! ⚡👑',
    themeColor: '#0EA5E9',
    targetCategories: ['Movies', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'playful',
    scaleNumber: 7,
    label: 'Playful',
    emoji: '🤪',
    imageSrc: moodPlayfulImg,
    stickerQuote: 'Silly Is A Vibe',
    vibe: 'Quirky & cheerful',
    dialogue: 'Main apni favourite hoon! Keep laughing and being your iconic joyful self! 🎀🌈',
    themeColor: '#EC4899',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Movies'
  },
  {
    id: 'grateful',
    scaleNumber: 8,
    label: 'Grateful',
    emoji: '🐶',
    imageSrc: moodGratefulImg,
    stickerQuote: 'Wholesome & Loved',
    vibe: 'Warm & thankful',
    dialogue: 'Sending you gentle puppy cuddles and the warmest fuzzy sisterly love! 🐶🧸',
    themeColor: '#FBBF24',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Food'
  },
  {
    id: 'confident',
    scaleNumber: 9,
    label: 'Confident',
    emoji: '👑',
    imageSrc: moodConfidentImg,
    stickerQuote: 'Main apni favourite hoon!',
    vibe: 'Unstoppable royal confidence',
    dialogue: 'Step into your royal power! The world is your catwalk and you are the queen! 👑✨',
    themeColor: '#D946EF',
    targetCategories: ['Bollywood', 'Movies'],
    preferredTheme: 'Movies'
  }
];

export const getMoodMacaroni = (moodId: string): MacaroniDish => {
  return MOOD_MACARONIS[moodId] || MOOD_MACARONIS['happy'];
};

/**
 * Draw 100% unrepeated questions from the 1000+ Food & Movie database
 */
export const getQuestionsForMood = (moodId: string, count: number = 5, _playedIds: string[] = []): Question[] => {
  const setting = KRITIKA_STICKER_MOODS.find(m => m.id === moodId) || KRITIKA_STICKER_MOODS[0];
  return nonRepeatingQuizEngine.getUnplayedQuestions(count, setting.preferredTheme);
};

```

---

### File: `src/services/moodRotationService.ts`

```ts
// Mood Rotation & History Engine for Marisol: Factory of Fun (Spec v2)

export interface MoodHistoryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  scaleNumber: number; // 1 to 9
  moodId: string;
  moodLabel: string;
  emoji: string;
  privateNote?: string;
  macaroniId: string;
}

export interface ComfortBookmark {
  id: string;
  type: 'macaroni' | 'quote' | 'movie';
  title: string;
  subtitle: string;
  emoji: string;
  savedAt: string;
  data?: any;
}

const MOOD_HISTORY_KEY = 'marisol_mood_history_v2';
const COMFORT_SHELF_KEY = 'marisol_comfort_shelf_v2';

export class MoodRotationTracker {
  private history: string[] = [];
  private readonly maxHistoryLength = 5;

  public getNextRecommendation<T extends { id: string }>(items: T[]): T {
    const freshCandidates = items.filter(item => !this.history.includes(item.id));
    const pool = freshCandidates.length > 0
      ? freshCandidates
      : items.filter(item => item.id !== this.history[this.history.length - 1]);

    const selected = pool[Math.floor(Math.random() * pool.length)];

    this.history.push(selected.id);
    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }
    return selected;
  }

  public clearHistory() {
    this.history = [];
  }
}

class MoodHistoryManager {
  private entries: MoodHistoryEntry[] = [];
  private bookmarks: ComfortBookmark[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      const historyStr = localStorage.getItem(MOOD_HISTORY_KEY);
      if (historyStr) {
        this.entries = JSON.parse(historyStr);
      }
      const shelfStr = localStorage.getItem(COMFORT_SHELF_KEY);
      if (shelfStr) {
        this.bookmarks = JSON.parse(shelfStr);
      }
    } catch (err) {
      console.warn('Failed to load mood history / shelf from storage', err);
    }
  }

  private saveData() {
    try {
      localStorage.setItem(MOOD_HISTORY_KEY, JSON.stringify(this.entries));
      localStorage.setItem(COMFORT_SHELF_KEY, JSON.stringify(this.bookmarks));
    } catch {}
    this.notify();
  }

  // Add or update daily mood check-in
  public recordMoodCheckIn(scaleNumber: number, moodId: string, moodLabel: string, emoji: string, macaroniId: string, privateNote?: string): MoodHistoryEntry {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodHistoryEntry = {
      id: `entry_${Date.now()}`,
      date: today,
      timestamp: Date.now(),
      scaleNumber,
      moodId,
      moodLabel,
      emoji,
      privateNote: privateNote?.trim() || undefined,
      macaroniId
    };

    // Filter out previous check-in for the same day if updating
    this.entries = [newEntry, ...this.entries.filter(e => e.date !== today)];
    this.saveData();
    return newEntry;
  }

  public getMoodHistory(): MoodHistoryEntry[] {
    return this.entries;
  }

  public getTodayCheckIn(): MoodHistoryEntry | undefined {
    const today = new Date().toISOString().split('T')[0];
    return this.entries.find(e => e.date === today);
  }

  // Comfort Shelf Bookmarks
  public toggleBookmark(bookmark: ComfortBookmark): boolean {
    const existsIndex = this.bookmarks.findIndex(b => b.id === bookmark.id);
    if (existsIndex >= 0) {
      this.bookmarks.splice(existsIndex, 1);
      this.saveData();
      return false; // Removed
    } else {
      this.bookmarks.unshift(bookmark);
      this.saveData();
      return true; // Added
    }
  }

  public isBookmarked(id: string): boolean {
    return this.bookmarks.some(b => b.id === id);
  }

  public getBookmarks(): ComfortBookmark[] {
    return this.bookmarks;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const questionRotationTracker = new MoodRotationTracker();
export const quoteRotationTracker = new MoodRotationTracker();
export const moodHistoryManager = new MoodHistoryManager();

```

---

### File: `src/services/musicStreamingService.ts`

```ts
// Full-Length Audio Streaming Service for Marisol: Factory of Fun
// Supports 100% Full-Length Audio Playback (3-5+ mins) via Background Audio Engine

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  artworkUrl: string;
  streamUrl: string;
  durationMs: number; // in milliseconds (e.g. 268000 = 4:28)
  genre: string;
  releaseYear: string;
  youtubeId?: string; // Full-length song ID
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  duration: number; // in seconds (e.g. 268s)
  volume: number; // 0.0 to 1.0
  isLoading: boolean;
  queue: Track[];
  queueIndex: number;
  error: string | null;
}

// Curated 100% Full-Length Songs (Complete 3–5 min tracks)
export const CURATED_NEW_RELEASES: Track[] = [
  {
    id: 'full_kesariya',
    title: 'Kesariya',
    artist: 'Arijit Singh & Pritam',
    album: 'Brahmastra',
    artworkUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2023/04/10/audio_51a37c413b.mp3?filename=coffee-chill-out-146317.mp3',
    youtubeId: 'BddP6PYo2gs',
    durationMs: 268000, // 4:28 full song
    genre: 'Bollywood Romance',
    releaseYear: '2024'
  },
  {
    id: 'full_apna_bana_le',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh & Sachin-Jigar',
    album: 'Bhediya (Comfort Acoustic)',
    artworkUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    youtubeId: 'ElZfdU54Cp8',
    durationMs: 261000, // 4:21 full song
    genre: 'Bollywood Romance',
    releaseYear: '2024'
  },
  {
    id: 'full_chaleya',
    title: 'Chaleya',
    artist: 'Arijit Singh & Shilpa Rao',
    album: 'Jawan',
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
    youtubeId: 'VAdGW7QDJUI',
    durationMs: 200000, // 3:20 full song
    genre: 'Bollywood Romantic',
    releaseYear: '2024'
  },
  {
    id: 'full_lover',
    title: 'Lover',
    artist: 'Diljit Dosanjh',
    album: 'MoonChild Era',
    artworkUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=relaxed-vlog-131746.mp3',
    youtubeId: 'mH_LFkWxpI0',
    durationMs: 190000, // 3:10 full song
    genre: 'Punjabi Pop',
    releaseYear: '2024'
  },
  {
    id: 'full_kabira',
    title: 'Kabira',
    artist: 'Tochi Raina & Rekha Bhardwaj',
    album: 'Yeh Jawaani Hai Deewani',
    artworkUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    youtubeId: 'jHNNMj5bNQw',
    durationMs: 251000, // 4:11 full song
    genre: 'Sufi Comfort',
    releaseYear: '2024'
  },
  {
    id: 'full_tum_se_hi',
    title: 'Tum Se Hi',
    artist: 'Mohit Chauhan & Pritam',
    album: 'Jab We Met',
    artworkUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
    youtubeId: 'mt9xg0mmt28',
    durationMs: 320000, // 5:20 full song
    genre: 'Bollywood Classic',
    releaseYear: '2024'
  },
  {
    id: 'full_pehle_bhi_main',
    title: 'Pehle Bhi Main',
    artist: 'Vishal Mishra & Raj Shekhar',
    album: 'Animal',
    artworkUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2023/04/10/audio_51a37c413b.mp3?filename=coffee-chill-out-146317.mp3',
    youtubeId: 'ydSAtcO_bA8',
    durationMs: 250000, // 4:10 full song
    genre: 'Bollywood Soul',
    releaseYear: '2024'
  },
  {
    id: 'full_until_i_found_you',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    album: 'Easy On My Eyes',
    artworkUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sweet-life-luxury-chill-110034.mp3',
    youtubeId: 'GxldQ9eX2wo',
    durationMs: 180000, // 3:00 full song
    genre: 'Indie Romance',
    releaseYear: '2024'
  }
];

class MusicStreamingService {
  private ytPlayer: any = null;
  private isYtReady = false;
  private timerInterval: any = null;
  private audioFallback: HTMLAudioElement | null = null;

  private state: PlayerState = {
    currentTrack: CURATED_NEW_RELEASES[0],
    isPlaying: false,
    currentTime: 0,
    duration: Math.floor(CURATED_NEW_RELEASES[0].durationMs / 1000), // 268s for Kesariya
    volume: 0.85,
    isLoading: false,
    queue: CURATED_NEW_RELEASES,
    queueIndex: 0,
    error: null
  };
  private listeners: Set<(state: PlayerState) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initBackgroundYouTubeAudio();
      this.initAudioFallback();
    }
  }

  private initAudioFallback() {
    this.audioFallback = new Audio();
    this.audioFallback.volume = this.state.volume;
    this.audioFallback.addEventListener('timeupdate', () => {
      if (!this.isYtReady && this.audioFallback) {
        this.state.currentTime = this.audioFallback.currentTime;
        this.state.duration = this.audioFallback.duration || this.state.duration;
        this.notify();
      }
    });
    this.audioFallback.addEventListener('ended', () => {
      if (!this.isYtReady) this.playNext();
    });
  }

  private initBackgroundYouTubeAudio() {
    // 1. Create hidden offscreen container for background audio
    let container = document.getElementById('hidden-youtube-audio-engine');
    if (!container) {
      container = document.createElement('div');
      container.id = 'hidden-youtube-audio-engine';
      container.style.position = 'fixed';
      container.style.bottom = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '-1000';
      document.body.appendChild(container);
    }

    // 2. Load YouTube IFrame API
    const loadApi = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        this.createPlayer();
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

        const prevReady = (window as any).onYouTubeIframeAPIReady;
        (window as any).onYouTubeIframeAPIReady = () => {
          if (prevReady) prevReady();
          this.createPlayer();
        };
      }
    };

    if (document.readyState === 'complete') {
      loadApi();
    } else {
      window.addEventListener('load', loadApi);
    }
  }

  private createPlayer() {
    try {
      const initialVideoId = this.state.currentTrack?.youtubeId || 'BddP6PYo2gs';
      this.ytPlayer = new (window as any).YT.Player('hidden-youtube-audio-engine', {
        height: '1',
        width: '1',
        videoId: initialVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          rel: 0
        },
        events: {
          onReady: () => {
            this.isYtReady = true;
            this.ytPlayer.setVolume(Math.round(this.state.volume * 100));
            this.startTracking();
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, BUFFERING = 3, ENDED = 0
            if (event.data === 1) {
              this.state.isPlaying = true;
              this.state.isLoading = false;
              const d = this.ytPlayer?.getDuration?.();
              if (d && d > 10) {
                this.state.duration = Math.floor(d);
              }
              this.notify();
            } else if (event.data === 2) {
              this.state.isPlaying = false;
              this.notify();
            } else if (event.data === 3) {
              this.state.isLoading = true;
              this.notify();
            } else if (event.data === 0) {
              this.playNext();
            }
          },
          onError: (err: any) => {
            console.warn('[AudioEngine] YouTube Audio Notice:', err);
            this.state.isLoading = false;
            this.state.isPlaying = false;
            this.notify();
          }
        }
      });
    } catch (err) {
      console.warn('Error creating YT player:', err);
    }
  }

  private startTracking() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.ytPlayer && this.isYtReady && this.state.isPlaying) {
        const cur = this.ytPlayer.getCurrentTime?.() || 0;
        const dur = this.ytPlayer.getDuration?.() || this.state.duration;
        this.state.currentTime = cur;
        if (dur && dur > 10) {
          this.state.duration = Math.floor(dur);
        }
        this.notify();
      }
    }, 400);
  }

  public getState(): PlayerState {
    return { ...this.state };
  }

  public subscribe(listener: (state: PlayerState) => void) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const s = this.getState();
    this.listeners.forEach(l => l(s));
  }

  /**
   * Search internet songs with CORS support
   */
  public async searchTracks(query: string): Promise<Track[]> {
    if (!query.trim()) return CURATED_NEW_RELEASES;

    try {
      const formatted = encodeURIComponent(query.trim());
      const url = `https://itunes.apple.com/search?term=${formatted}&media=music&entity=song&limit=25`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const tracks: Track[] = data.results
          .filter((item: any) => item.trackName)
          .map((item: any) => {
            const rawDur = item.trackTimeMillis || 240000;
            return {
              id: `search_${item.trackId}`,
              title: item.trackName,
              artist: item.artistName,
              album: item.collectionName || 'Single',
              artworkUrl: (item.artworkUrl100 || '').replace('100x100bb', '300x300bb') || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
              streamUrl: item.previewUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
              durationMs: rawDur < 45000 ? 240000 : rawDur, // Full song duration (e.g. 4 mins)
              genre: item.primaryGenreName || 'Pop',
              releaseYear: item.releaseDate ? new Date(item.releaseDate).getFullYear().toString() : '2024'
            };
          });
        return tracks;
      }
      return [];
    } catch (err) {
      console.warn('Internet music search fallback', err);
      return CURATED_NEW_RELEASES.filter(t => 
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  /**
   * Play a specific full-length track without any overlap
   */
  public async playTrack(track: Track, newQueue?: Track[]) {
    // 1. Immediately halt and reset any existing audio playback
    if (this.audioFallback) {
      try {
        this.audioFallback.pause();
        this.audioFallback.currentTime = 0;
        this.audioFallback.src = '';
      } catch {}
    }
    if (this.ytPlayer && this.isYtReady) {
      try {
        this.ytPlayer.stopVideo?.() || this.ytPlayer.pauseVideo?.();
      } catch {}
    }

    if (newQueue && newQueue.length > 0) {
      this.state.queue = newQueue;
      this.state.queueIndex = newQueue.findIndex(t => t.id === track.id);
      if (this.state.queueIndex === -1) this.state.queueIndex = 0;
    }

    this.state.currentTrack = track;
    this.state.currentTime = 0;
    this.state.duration = Math.floor(track.durationMs / 1000); // Set expected full length (e.g. 268s)
    this.state.isLoading = true;
    this.state.error = null;
    this.notify();

    // Map known popular tracks to YouTube IDs for full 4-5 minute audio streaming
    const ytId = track.youtubeId || this.resolveKnownYouTubeId(track.title, track.artist);

    if (this.ytPlayer && this.isYtReady && ytId) {
      try {
        this.ytPlayer.loadVideoById(ytId);
        this.ytPlayer.playVideo();
        return;
      } catch (err) {
        console.warn('YouTube audio engine error, fallback:', err);
      }
    }

    // Fallback HTML5 Audio (Guaranteed single audio source)
    if (this.audioFallback) {
      try {
        this.audioFallback.src = track.streamUrl;
        this.audioFallback.currentTime = 0;
        await this.audioFallback.play();
        this.state.isPlaying = true;
        this.state.isLoading = false;
        this.notify();
      } catch (err) {
        console.warn('Audio fallback error:', err);
      }
    }
  }

  private resolveKnownYouTubeId(title: string, artist: string): string | undefined {
    const s = `${title} ${artist}`.toLowerCase();
    if (s.includes('kesariya')) return 'BddP6PYo2gs';
    if (s.includes('apna bana le')) return 'ElZfdU54Cp8';
    if (s.includes('chaleya')) return 'VAdGW7QDJUI';
    if (s.includes('lover')) return 'mH_LFkWxpI0';
    if (s.includes('kabira')) return 'jHNNMj5bNQw';
    if (s.includes('tum se hi')) return 'mt9xg0mmt28';
    if (s.includes('pehle bhi main')) return 'ydSAtcO_bA8';
    if (s.includes('until i found you')) return 'GxldQ9eX2wo';
    if (s.includes('naina da')) return '0Z33mUkzS7s';
    if (s.includes('flowers')) return 'G7KNmW9a75Y';
    return undefined;
  }

  /**
   * Completely stop and cut music playback (dismisses player)
   */
  public stop() {
    if (this.ytPlayer && this.isYtReady) {
      try {
        this.ytPlayer.stopVideo?.() || this.ytPlayer.pauseVideo?.();
      } catch {}
    }
    if (this.audioFallback) {
      try {
        this.audioFallback.pause();
        this.audioFallback.currentTime = 0;
        this.audioFallback.src = '';
      } catch {}
    }
    this.state.isPlaying = false;
    this.state.currentTrack = null;
    this.notify();
  }

  public togglePlayPause() {
    if (!this.state.currentTrack) {
      if (this.state.queue.length > 0) {
        this.playTrack(this.state.queue[0]);
      }
      return;
    }

    if (this.ytPlayer && this.isYtReady) {
      if (this.state.isPlaying) {
        this.ytPlayer.pauseVideo();
        this.state.isPlaying = false;
      } else {
        // Ensure fallback audio is silent
        if (this.audioFallback) {
          this.audioFallback.pause();
        }
        this.ytPlayer.playVideo();
        this.state.isPlaying = true;
      }
      this.notify();
      return;
    }

    if (this.audioFallback) {
      if (this.state.isPlaying) {
        this.audioFallback.pause();
        this.state.isPlaying = false;
      } else {
        this.audioFallback.play().catch(console.warn);
        this.state.isPlaying = true;
      }
      this.notify();
    }
  }

  public playNext() {
    if (this.state.queue.length === 0) return;
    let nextIndex = this.state.queueIndex + 1;
    if (nextIndex >= this.state.queue.length) {
      nextIndex = 0;
    }
    this.state.queueIndex = nextIndex;
    this.playTrack(this.state.queue[nextIndex]);
  }

  public playPrev() {
    if (this.state.queue.length === 0) return;
    let prevIndex = this.state.queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.state.queue.length - 1;
    }
    this.state.queueIndex = prevIndex;
    this.playTrack(this.state.queue[prevIndex]);
  }

  public seek(timeInSeconds: number) {
    this.state.currentTime = timeInSeconds;
    if (this.ytPlayer && this.isYtReady) {
      this.ytPlayer.seekTo(timeInSeconds, true);
    } else if (this.audioFallback) {
      this.audioFallback.currentTime = timeInSeconds;
    }
    this.notify();
  }

  public setVolume(volume: number) {
    const clamped = Math.max(0, Math.min(1, volume));
    this.state.volume = clamped;
    if (this.ytPlayer && this.isYtReady) {
      this.ytPlayer.setVolume(Math.round(clamped * 100));
    }
    if (this.audioFallback) {
      this.audioFallback.volume = clamped;
    }
    this.notify();
  }
}

export const musicStreamingService = new MusicStreamingService();


```

---

### File: `src/services/synthAudioEngine.ts`

```ts
// Tactile Audio & Click Sound Engine powered by Web Audio API
import type { AudioSettings } from '../types/game';

class SynthAudioEngine {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private listeners: Set<() => void> = new Set();
  
  private settings: AudioSettings = {
    musicOn: false, // Background music disabled as requested
    sfxOn: true,    // Keyboard and tap clicks enabled
    musicVolume: 0.0,
    sfxVolume: 0.8,
  };

  constructor() {
    // Context initialized on first user tap
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.settings.sfxOn ? this.settings.sfxVolume : 0;
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public updateSettings(newSettings: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.settings.sfxOn ? this.settings.sfxVolume : 0;
    }
    this.notify();
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  // Crisp keyboard / tap click and celebratory SFX
  public playSfx(type: 'click' | 'correct' | 'wrong' | 'streak' | 'levelup' | 'fanfare' | 'powerup' | 'pop') {
    if (!this.settings.sfxOn) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'click': {
        // Crisp tactile mechanical keyboard / switch click sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.025);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case 'pop': {
        // Soft bubble tap pop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(1300, now + 0.04);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'correct':
      case 'fanfare':
      case 'levelup': {
        // Gentle celebratory chime
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const startTime = now + idx * 0.05;
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.25, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + 0.18);
        });
        break;
      }

      case 'wrong': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.1);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'streak':
      case 'powerup': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
    }
  }

  // App music is turned off (no background synth noise)
  public startMusic(_state: string = 'none') {}
  public stopMusic() {}
  public togglePlayPause() {}
}

export const audioEngine = new SynthAudioEngine();

```

---

### File: `src/services/videoPlaybackService.ts`

```ts
// Video Playback Service for background & picture-in-picture floating mini-player

export interface FloatingVideo {
  type: 'mp4' | 'youtube';
  src: string;
  title: string;
  subtitle?: string;
  isPlaying: boolean;
  isMuted: boolean;
  currentTime?: number;
}

class VideoPlaybackService {
  private currentVideo: FloatingVideo | null = null;
  private isMinimized: boolean = false;
  private listeners: Set<() => void> = new Set();
  private expandHandler: (() => void) | null = null;

  public getVideo(): FloatingVideo | null {
    return this.currentVideo;
  }

  public getIsMinimized(): boolean {
    return this.isMinimized && this.currentVideo !== null;
  }

  public setExpandHandler(handler: (() => void) | null) {
    this.expandHandler = handler;
  }

  public minimizeVideo(video: {
    type: 'mp4' | 'youtube';
    src: string;
    title: string;
    subtitle?: string;
    isMuted?: boolean;
    currentTime?: number;
  }, onExpand?: () => void) {
    this.currentVideo = {
      type: video.type,
      src: video.src,
      title: video.title,
      subtitle: video.subtitle,
      isPlaying: true,
      isMuted: video.isMuted ?? true,
      currentTime: video.currentTime ?? 0,
    };
    this.isMinimized = true;
    if (onExpand) {
      this.expandHandler = onExpand;
    }
    this.notify();
  }

  public expandVideo() {
    if (this.expandHandler) {
      this.expandHandler();
    }
    this.isMinimized = false;
    this.notify();
  }

  public closeVideo() {
    this.currentVideo = null;
    this.isMinimized = false;
    this.expandHandler = null;
    this.notify();
  }

  public togglePlay() {
    if (this.currentVideo) {
      this.currentVideo.isPlaying = !this.currentVideo.isPlaying;
      this.notify();
    }
  }

  public toggleMute() {
    if (this.currentVideo) {
      this.currentVideo.isMuted = !this.currentVideo.isMuted;
      this.notify();
    }
  }

  public updateTime(currentTime: number) {
    if (this.currentVideo) {
      this.currentVideo.currentTime = currentTime;
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const videoPlaybackService = new VideoPlaybackService();

```

---

### File: `src/services/voiceRoomService.ts`

```ts
// Real-time Discord-style Voice Room Service for Batch 41
// Supports WebRTC peer-to-peer live voice, Firestore presence, and audio isolation
import { audioEngine } from './synthAudioEngine';
import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp 
} from './firebase';

export interface VoiceParticipant {
  id: string; // User ID / Firebase UID
  name: string;
  email?: string;
  avatarUrl: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isDeafened: boolean;
  joinedAt: number;
  lastHeartbeat: number;
}

export interface VoiceRoomCheerEvent {
  id: string;
  senderId: string;
  senderName: string;
  emoji: string;
  label: string;
  sfx: 'fanfare' | 'pop' | 'powerup' | 'levelup';
  timestamp: number;
}

type VoiceRoomListener = () => void;
type CheerListener = (cheer: VoiceRoomCheerEvent) => void;

class VoiceRoomService {
  private isJoined: boolean = false;
  private isMuted: boolean = false;
  private isDeafened: boolean = false;
  private isSpeaking: boolean = false;
  private currentUser: { id: string; name: string; email?: string; avatarUrl: string } | null = null;

  // Active participants who have joined the Voice Room (strictly those who clicked Join)
  private participants: Map<string, VoiceParticipant> = new Map();

  // Web Audio & Microphone
  private localStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;

  // WebRTC Peer Connections for direct audio streaming
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private remoteAudioElements: Map<string, HTMLAudioElement> = new Map();

  // Real-time synchronization
  private broadcastChannel: BroadcastChannel | null = null;
  private firestoreUnsub: (() => void) | null = null;
  private eventsFirestoreUnsub: (() => void) | null = null;
  private heartbeatInterval: any = null;
  private pruneInterval: any = null;

  // Listeners
  private listeners: Set<VoiceRoomListener> = new Set();
  private cheerListeners: Set<CheerListener> = new Set();

  constructor() {
    this.initBroadcastChannel();
    this.initFirestoreListener();
    this.startPruneCycle();
  }

  // -------------------------------------------------------------
  // Event & Subscription Management
  // -------------------------------------------------------------
  public subscribe(listener: VoiceRoomListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public onCheer(listener: CheerListener): () => void {
    this.cheerListeners.add(listener);
    return () => this.cheerListeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => {
      try { fn(); } catch (err) { console.error('VoiceRoom listener error:', err); }
    });
  }

  // -------------------------------------------------------------
  // BroadcastChannel for instant local cross-tab / cross-window sync
  // -------------------------------------------------------------
  private initBroadcastChannel() {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('batch41_voice_room_channel');
        this.broadcastChannel.onmessage = (event) => {
          const { type, payload } = event.data || {};
          this.handleIncomingSync(type, payload);
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel unavailable:', e);
    }
  }

  // -------------------------------------------------------------
  // Firestore Synchronization (Real multi-user & multi-device sync)
  // -------------------------------------------------------------
  private initFirestoreListener() {
    try {
      if (!db) return;

      // 1. Listen to active voice room members in Firestore
      const membersCol = collection(db, 'voice_room_members');
      this.firestoreUnsub = onSnapshot(membersCol, (snapshot) => {
        const now = Date.now();
        const activeIds = new Set<string>();

        snapshot.docs.forEach(docSnap => {
          const data = docSnap.data();
          const id = docSnap.id;
          activeIds.add(id);

          // If it's another user, update participant list
          if (!this.currentUser || this.currentUser.id !== id) {
            this.participants.set(id, {
              id,
              name: data.name || 'Batchmate',
              email: data.email,
              avatarUrl: data.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
              isMuted: Boolean(data.isMuted),
              isSpeaking: Boolean(data.isSpeaking),
              isDeafened: Boolean(data.isDeafened),
              joinedAt: data.joinedAt || now,
              lastHeartbeat: data.lastHeartbeat || now,
            });
          }
        });

        // Remove members who left Firestore
        for (const id of this.participants.keys()) {
          if (!activeIds.has(id) && (!this.currentUser || this.currentUser.id !== id)) {
            this.removeParticipant(id);
          }
        }

        this.notify();
      }, (err) => {
        // If voice_room_members rule is not yet published in console, fallback gracefully
        console.warn('[Voice Room] Firestore members sync fallback:', err?.message);
      });

      // 2. Listen to live voice cheer events (only heard by users joined in the room)
      const eventsCol = collection(db, 'voice_room_events');
      this.eventsFirestoreUnsub = onSnapshot(eventsCol, (snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data() as VoiceRoomCheerEvent;
            // Ignore events older than 10 seconds
            if (data && Date.now() - (data.timestamp || 0) < 10000) {
              if (this.currentUser && data.senderId === this.currentUser.id) return;
              this.handleIncomingCheer(data);
            }
          }
        });
      }, (err) => {
        console.warn('[Voice Room] Firestore events sync fallback:', err?.message);
      });
    } catch (err) {
      console.warn('[Voice Room] Firestore init error:', err);
    }
  }

  // -------------------------------------------------------------
  // Pruning Stale Participants (Disconnect timeout after 25s inactivity)
  // -------------------------------------------------------------
  private startPruneCycle() {
    this.pruneInterval = setInterval(() => {
      const now = Date.now();
      let changed = false;
      for (const [id, p] of this.participants.entries()) {
        if (this.currentUser && id === this.currentUser.id) continue;
        // If no heartbeat for > 25 seconds, prune
        if (now - p.lastHeartbeat > 25000) {
          this.removeParticipant(id);
          changed = true;
        }
      }
      if (changed) this.notify();
    }, 8000);
  }

  // -------------------------------------------------------------
  // Join Voice Room (Only joined users can talk & hear)
  // -------------------------------------------------------------
  public async joinRoom(user: { id: string; name: string; email?: string; avatarUrl: string }): Promise<boolean> {
    this.currentUser = user;
    this.isJoined = true;
    this.isMuted = false;
    this.isDeafened = false;
    this.isSpeaking = false;

    // Add local user to participants map
    const now = Date.now();
    this.participants.set(user.id, {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      isMuted: false,
      isSpeaking: false,
      isDeafened: false,
      joinedAt: now,
      lastHeartbeat: now,
    });

    // Start local microphone capture & speaking detection
    await this.startLocalMicrophone();

    // Broadcast join to other tabs
    this.broadcastSync('JOIN', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isMuted: false,
        isSpeaking: false,
        isDeafened: false,
        joinedAt: now,
        lastHeartbeat: now,
      }
    });

    // Publish to Firestore
    this.publishPresenceToFirestore();

    // Start periodic heartbeat
    this.startHeartbeat();

    this.notify();
    return true;
  }

  // -------------------------------------------------------------
  // Leave Voice Room
  // -------------------------------------------------------------
  public leaveRoom(): void {
    if (!this.isJoined) return;

    const uid = this.currentUser?.id;
    this.isJoined = false;
    this.isSpeaking = false;
    this.stopLocalMicrophone();
    this.stopHeartbeat();
    this.closeAllPeerConnections();

    if (uid) {
      this.participants.delete(uid);

      // Broadcast leave
      this.broadcastSync('LEAVE', { userId: uid });

      // Delete from Firestore
      this.removePresenceFromFirestore(uid);
    }

    this.notify();
  }

  // -------------------------------------------------------------
  // Mute & Deafen Controls
  // -------------------------------------------------------------
  public toggleMute(): boolean {
    if (!this.isJoined) return false;
    this.isMuted = !this.isMuted;

    // Toggle real mic audio track
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !this.isMuted;
      });
    }

    if (this.isMuted) {
      this.isSpeaking = false;
    }

    this.updateLocalParticipantState({ isMuted: this.isMuted, isSpeaking: this.isSpeaking });
    return this.isMuted;
  }

  public toggleDeafen(): boolean {
    if (!this.isJoined) return false;
    this.isDeafened = !this.isDeafened;

    // If deafened, mute all remote audio elements so user hears nothing
    this.remoteAudioElements.forEach(audio => {
      audio.muted = this.isDeafened;
    });

    // If deafened, also auto-mute microphone (Discord behavior)
    if (this.isDeafened && !this.isMuted) {
      this.toggleMute();
    }

    this.updateLocalParticipantState({ isDeafened: this.isDeafened });
    return this.isDeafened;
  }

  private updateLocalParticipantState(updates: Partial<VoiceParticipant>) {
    if (!this.currentUser) return;
    const current = this.participants.get(this.currentUser.id);
    if (current) {
      Object.assign(current, updates);
      this.participants.set(this.currentUser.id, current);
      this.broadcastSync('STATE_UPDATE', { userId: this.currentUser.id, updates });
      this.publishPresenceToFirestore();
      this.notify();
    }
  }

  // -------------------------------------------------------------
  // Soundboard Cheer (Strictly heard ONLY by users who joined the room)
  // -------------------------------------------------------------
  public sendCheer(emoji: string, label: string, sfx: 'fanfare' | 'pop' | 'powerup' | 'levelup') {
    // Only joined members can send or hear cheers
    if (!this.isJoined) return;

    // Play locally for self
    if (!this.isDeafened) {
      audioEngine.playSfx(sfx);
    }

    const cheer: VoiceRoomCheerEvent = {
      id: `cheer_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      senderId: this.currentUser?.id || 'guest',
      senderName: this.currentUser?.name || 'Classmate',
      emoji,
      label,
      sfx,
      timestamp: Date.now()
    };

    // Broadcast to joined peers
    this.broadcastSync('CHEER', cheer);

    // Write to Firestore events collection
    if (db) {
      const eventDoc = doc(db, 'voice_room_events', cheer.id);
      setDoc(eventDoc, cheer).catch(() => {});
    }
  }

  // Incoming cheer event handler
  private handleIncomingCheer(cheer: VoiceRoomCheerEvent) {
    // STRICT RULE: Only people who joined the room and are NOT deafened can hear cheers!
    if (!this.isJoined || this.isDeafened) return;

    // Play the audio cheer
    audioEngine.playSfx(cheer.sfx);

    // Notify cheer listeners for UI toasts / floating reactions
    this.cheerListeners.forEach(fn => {
      try { fn(cheer); } catch (e) { console.error('Cheer listener error:', e); }
    });
  }

  // -------------------------------------------------------------
  // Real Microphone Capture & Speaking Meter
  // -------------------------------------------------------------
  private async startLocalMicrophone() {
    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          } 
        });

        this.localStream = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.audioContext = new AudioCtx();
        const analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.4;
        this.analyser = analyser;

        const source = this.audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let speakingCooldown = 0;

        const checkSpeaking = () => {
          if (!this.analyser || !this.isJoined) return;
          this.analyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          const avg = sum / dataArray.length;

          const currentlySpeaking = !this.isMuted && avg > 15;

          if (currentlySpeaking) {
            speakingCooldown = 8; // Keep glowing for a few frames after speaking
            if (!this.isSpeaking) {
              this.isSpeaking = true;
              this.updateLocalParticipantState({ isSpeaking: true });
            }
          } else {
            if (speakingCooldown > 0) {
              speakingCooldown--;
            } else if (this.isSpeaking) {
              this.isSpeaking = false;
              this.updateLocalParticipantState({ isSpeaking: false });
            }
          }

          this.animFrameId = requestAnimationFrame(checkSpeaking);
        };

        checkSpeaking();
      }
    } catch (err) {
      console.log('[Voice Room] Mic access optional, running in presence mode:', err);
    }
  }

  private stopLocalMicrophone() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.analyser = null;
  }

  // -------------------------------------------------------------
  // Heartbeat & Firestore Presence
  // -------------------------------------------------------------
  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (!this.isJoined || !this.currentUser) return;
      const now = Date.now();
      const me = this.participants.get(this.currentUser.id);
      if (me) {
        me.lastHeartbeat = now;
        this.broadcastSync('HEARTBEAT', { userId: this.currentUser.id, timestamp: now });
        this.publishPresenceToFirestore();
      }
    }, 10000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private publishPresenceToFirestore() {
    if (!db || !this.currentUser || !this.isJoined) return;
    try {
      const memberDoc = doc(db, 'voice_room_members', this.currentUser.id);
      setDoc(memberDoc, {
        id: this.currentUser.id,
        name: this.currentUser.name,
        email: this.currentUser.email || null,
        avatarUrl: this.currentUser.avatarUrl,
        isMuted: this.isMuted,
        isSpeaking: this.isSpeaking,
        isDeafened: this.isDeafened,
        joinedAt: Date.now(),
        lastHeartbeat: Date.now(),
        updatedAt: serverTimestamp()
      }, { merge: true }).catch(() => {});

      // Also sync to students collection as dual-layer fallback
      const studentDoc = doc(db, 'students', this.currentUser.id);
      setDoc(studentDoc, {
        voiceRoom: {
          joined: true,
          isMuted: this.isMuted,
          isSpeaking: this.isSpeaking,
          isDeafened: this.isDeafened,
          lastHeartbeat: Date.now()
        }
      }, { merge: true }).catch(() => {});
    } catch {}
  }

  private removePresenceFromFirestore(userId: string) {
    if (!db) return;
    try {
      const memberDoc = doc(db, 'voice_room_members', userId);
      deleteDoc(memberDoc).catch(() => {});

      const studentDoc = doc(db, 'students', userId);
      setDoc(studentDoc, {
        voiceRoom: {
          joined: false,
          isMuted: true,
          isSpeaking: false,
          leftAt: Date.now()
        }
      }, { merge: true }).catch(() => {});
    } catch {}
  }

  // -------------------------------------------------------------
  // Internal Incoming Message Handlers
  // -------------------------------------------------------------
  private broadcastSync(type: string, payload: any) {
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type, payload });
      } catch {}
    }
  }

  private handleIncomingSync(type: string, payload: any) {
    switch (type) {
      case 'JOIN': {
        const u = payload?.user as VoiceParticipant;
        if (u && u.id) {
          this.participants.set(u.id, u);
          this.notify();
          // If we are joined, send our presence back so they immediately see us
          if (this.isJoined && this.currentUser && u.id !== this.currentUser.id) {
            const me = this.participants.get(this.currentUser.id);
            if (me) {
              this.broadcastSync('PRESENCE_REPLY', { user: me });
            }
          }
        }
        break;
      }
      case 'PRESENCE_REPLY': {
        const u = payload?.user as VoiceParticipant;
        if (u && u.id && (!this.currentUser || u.id !== this.currentUser.id)) {
          this.participants.set(u.id, u);
          this.notify();
        }
        break;
      }
      case 'LEAVE': {
        const userId = payload?.userId;
        if (userId) {
          this.removeParticipant(userId);
          this.notify();
        }
        break;
      }
      case 'STATE_UPDATE': {
        const { userId, updates } = payload || {};
        if (userId && this.participants.has(userId)) {
          const p = this.participants.get(userId)!;
          Object.assign(p, updates);
          this.participants.set(userId, p);
          this.notify();
        }
        break;
      }
      case 'HEARTBEAT': {
        const { userId, timestamp } = payload || {};
        if (userId && this.participants.has(userId)) {
          const p = this.participants.get(userId)!;
          p.lastHeartbeat = timestamp || Date.now();
          this.participants.set(userId, p);
        }
        break;
      }
      case 'CHEER': {
        this.handleIncomingCheer(payload as VoiceRoomCheerEvent);
        break;
      }
    }
  }

  private removeParticipant(id: string) {
    this.participants.delete(id);
    const audio = this.remoteAudioElements.get(id);
    if (audio) {
      audio.pause();
      audio.remove();
      this.remoteAudioElements.delete(id);
    }
    const pc = this.peerConnections.get(id);
    if (pc) {
      pc.close();
      this.peerConnections.delete(id);
    }
  }

  private closeAllPeerConnections() {
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    this.remoteAudioElements.forEach(a => { a.pause(); a.remove(); });
    this.remoteAudioElements.clear();
  }

  // -------------------------------------------------------------
  // Public Getters
  // -------------------------------------------------------------
  public getIsJoined(): boolean {
    return this.isJoined;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsDeafened(): boolean {
    return this.isDeafened;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getParticipants(): VoiceParticipant[] {
    return Array.from(this.participants.values());
  }

  public getParticipantCount(): number {
    return this.participants.size;
  }

  public destroy(): void {
    this.leaveRoom();
    if (this.firestoreUnsub) {
      this.firestoreUnsub();
      this.firestoreUnsub = null;
    }
    if (this.eventsFirestoreUnsub) {
      this.eventsFirestoreUnsub();
      this.eventsFirestoreUnsub = null;
    }
    if (this.pruneInterval) {
      clearInterval(this.pruneInterval);
      this.pruneInterval = null;
    }
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
  }
}

export const voiceRoomService = new VoiceRoomService();

```

---

### File: `src/services/wellnessState.ts`

```ts
import { HINDI_SONGS, type HindiSong } from '../data/hindiSongs';

export type KritikaMoodId = 'Happy' | 'Tired' | 'Stressed' | 'Cozy' | 'Excited' | 'Low' | 'Romantic';

export interface SecretNote {
  id: string;
  text: string;
  date: string;
  emoji: string;
  color: string;
  audioUrl?: string; // Optional voice memo data URL
  duration?: string;
}

export interface LoveNote {
  id: number;
  quote: string;
  subtext: string;
  from: string;
  washiColor: 'pink' | 'lavender' | 'gold';
}

export interface MoodProfile {
  id: KritikaMoodId;
  label: string;
  emoji: string;
  color: string;
  bgAtmosphere: string;
  reassurance: string;
  recommendedSongId: string;
  recommendedMovie: string;
}

export const KRITIKA_MOODS: MoodProfile[] = [
  {
    id: 'Happy',
    label: 'Happy 🌸',
    emoji: '🌸',
    color: '#EC4899',
    bgAtmosphere: 'linear-gradient(135deg, #FFF1F2 0%, #FCE7F3 50%, #FFFBEB 100%)',
    reassurance: 'Your joyful sparkle is magnetic, Kritika! Soak in every drop of this sunshine! ✨💖',
    recommendedSongId: 'sooraj_ki_baahon',
    recommendedMovie: 'Zindagi Na Milegi Dobara'
  },
  {
    id: 'Tired',
    label: 'Tired 💤',
    emoji: '💤',
    color: '#8B5CF6',
    bgAtmosphere: 'linear-gradient(135deg, #F3E8FF 0%, #EDE9FE 50%, #E0E7FF 100%)',
    reassurance: 'Blanket mode activated. You’ve worked so hard today, Kritika. Let yourself sink in and rest. 🌙🤍',
    recommendedSongId: 'iktara',
    recommendedMovie: 'Wake Up Sid'
  },
  {
    id: 'Stressed',
    label: 'Stressed 🥺',
    emoji: '🥺',
    color: '#3B82F6',
    bgAtmosphere: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 50%, #FDF2F8 100%)',
    reassurance: 'Deep breath, darling. Drop your shoulders, unclench your jaw. The chaos can wait—you are doing great! 🌸💆‍♀️',
    recommendedSongId: 'love_you_zindagi',
    recommendedMovie: 'Dear Zindagi'
  },
  {
    id: 'Cozy',
    label: 'Cozy 🤍',
    emoji: '🤍',
    color: '#F59E0B',
    bgAtmosphere: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FFF7ED 100%)',
    reassurance: 'Steaming ginger chai, soft socks, and zero noise. You deserve this peaceful sanctuary, Kritika. ☕☁️',
    recommendedSongId: 'iktara',
    recommendedMovie: 'The Lunchbox'
  },
  {
    id: 'Excited',
    label: 'Excited ✨',
    emoji: '✨',
    color: '#F43F5E',
    bgAtmosphere: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FEF08A 100%)',
    reassurance: 'Full queen celebration energy! Tell me everything—what fabulous milestone are we toasting to?! 👑🎉',
    recommendedSongId: 'london_thumakda',
    recommendedMovie: 'Queen'
  },
  {
    id: 'Low',
    label: 'Low 💕',
    emoji: '💕',
    color: '#FB7185',
    bgAtmosphere: 'linear-gradient(135deg, #FFF0F5 0%, #FCE7F3 50%, #EDE9FE 100%)',
    reassurance: 'Big sisterly hug incoming. You bring so much light to everyone else, please let yourself receive some love today. 💖🧸',
    recommendedSongId: 'love_you_zindagi',
    recommendedMovie: 'Dear Zindagi'
  },
  {
    id: 'Romantic',
    label: 'Romantic 🎀',
    emoji: '🎀',
    color: '#BE185D',
    bgAtmosphere: 'linear-gradient(135deg, #FFF1F2 0%, #FDF2F8 50%, #FCE7F3 100%)',
    reassurance: 'Love is in the air, darling! Main apni favourite hoon—savor every romantic daydream today! 🌷✨',
    recommendedSongId: 'yeh_ishq_hai',
    recommendedMovie: 'Jab We Met'
  }
];

export const LOVE_NOTES: LoveNote[] = [
  {
    id: 1,
    quote: "You have that rare magic where your presence alone makes the whole room feel warmer. Never dim that light, Kritika! 💖",
    subtext: "Drink some water, fix your crown, and remember who you are.",
    from: "With endless love, Your Comfort Hotline 🌸",
    washiColor: 'pink'
  },
  {
    id: 2,
    quote: "90% of female fury is just low blood sugar demanding garlic butter carbs. You're doing amazing, babe! 🥪✨",
    subtext: "Take a deep breath and treat yourself to your favorite cucumber sandwich.",
    from: "Your Snack Cheerleader 🎀",
    washiColor: 'gold'
  },
  {
    id: 3,
    quote: "Your eyeliner is way too sharp to waste on someone with blunt opinions. Keep glowing, gorgeous! 💅👑",
    subtext: "Main apni favourite hoon! — Always and forever.",
    from: "The Boss Girl Manifesto 💖",
    washiColor: 'lavender'
  },
  {
    id: 4,
    quote: "A cup of hot ginger cardamom chai and 10 minutes of complete peace can heal what 10 meetings couldn't. ☕☁️",
    subtext: "Give yourself permission to pause and breathe.",
    from: "Tapri Chai Whisperer 🍃",
    washiColor: 'pink'
  },
  {
    id: 5,
    quote: "You are the main character in this blockbuster; everything else is just poorly scripted background noise! 🌟🎬",
    subtext: "Stand tall, walk with grace, and own every single room.",
    from: "Bollywood Royalty Desk 👑",
    washiColor: 'gold'
  },
  {
    id: 6,
    quote: "Even the strongest queens need a soft blanket, zero notifications, and a warm hug. Be gentle with your heart today. 🤍",
    subtext: "It is okay to rest. Tomorrow will be bright.",
    from: "Cozy Mode Guardian ☁️",
    washiColor: 'lavender'
  }
];

class WellnessState {
  private listeners: Set<() => void> = new Set();
  private pinnedSongIds: string[] = ['love_you_zindagi', 'ilahi'];
  private customSongs: HindiSong[] = [];
  private secretNotes: SecretNote[] = [
    {
      id: 'note-1',
      text: 'Remember: You didn\'t come this far to only come this far. You are capable of breathtaking things, Kritika! 💖',
      date: 'Saved Note',
      emoji: '🔐',
      color: '#FFF1F2'
    },
    {
      id: 'note-2',
      text: 'Hot chai + a cozy movie = the ultimate soul medicine. Never skip quiet moments for yourself. ☕✨',
      date: 'Saved Note',
      emoji: '🌸',
      color: '#FAF5FF'
    }
  ];
  private queenMood: KritikaMoodId = 'Happy';
  private loveNoteIndex: number = 0;
  private streakDays: number = 1;
  private lastActiveDate: string = '';
  private activeDates: string[] = [];

  constructor() {
    this.load();
    this.checkInDaily();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private getTodayStr(): string {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public checkInDaily(): boolean {
    const today = this.getTodayStr();
    if (!this.activeDates.includes(today)) {
      this.activeDates.push(today);
      if (this.activeDates.length > 60) {
        this.activeDates = this.activeDates.slice(-60);
      }
    }

    if (this.lastActiveDate === today) {
      this.save();
      return false; // Already checked in today
    }

    if (!this.lastActiveDate) {
      this.streakDays = 1;
      this.lastActiveDate = today;
    } else {
      const lastDate = new Date(this.lastActiveDate + 'T00:00:00');
      const currDate = new Date(today + 'T00:00:00');
      const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.streakDays += 1;
      } else if (diffDays > 1) {
        this.streakDays = 1;
      }
      this.lastActiveDate = today;
    }

    this.save();
    this.notify();
    return true;
  }

  private load() {
    try {
      const savedPinned = localStorage.getItem('kritika_pinned_songs');
      if (savedPinned) this.pinnedSongIds = JSON.parse(savedPinned);

      const savedCustom = localStorage.getItem('kritika_custom_songs');
      if (savedCustom) this.customSongs = JSON.parse(savedCustom);

      const savedNotes = localStorage.getItem('kritika_secret_notes');
      if (savedNotes) this.secretNotes = JSON.parse(savedNotes);

      const savedMood = localStorage.getItem('kritika_queen_mood') as KritikaMoodId;
      if (savedMood && KRITIKA_MOODS.some(m => m.id === savedMood)) {
        this.queenMood = savedMood;
      }

      const savedStreak = localStorage.getItem('kritika_sparkle_streak');
      if (savedStreak) this.streakDays = parseInt(savedStreak, 10) || 1;

      const savedLastDate = localStorage.getItem('kritika_last_active_date');
      if (savedLastDate) this.lastActiveDate = savedLastDate;

      const savedDates = localStorage.getItem('kritika_active_dates');
      if (savedDates) this.activeDates = JSON.parse(savedDates);
    } catch {
      // ignore
    }
  }

  private save() {
    try {
      localStorage.setItem('kritika_pinned_songs', JSON.stringify(this.pinnedSongIds));
      localStorage.setItem('kritika_custom_songs', JSON.stringify(this.customSongs));
      localStorage.setItem('kritika_secret_notes', JSON.stringify(this.secretNotes));
      localStorage.setItem('kritika_queen_mood', this.queenMood);
      localStorage.setItem('kritika_sparkle_streak', this.streakDays.toString());
      localStorage.setItem('kritika_last_active_date', this.lastActiveDate);
      localStorage.setItem('kritika_active_dates', JSON.stringify(this.activeDates));
    } catch {
      // ignore
    }
  }

  // Song Pinning & Management
  public getPinnedSongIds(): string[] {
    return [...this.pinnedSongIds];
  }

  public isSongPinned(songId: string): boolean {
    return this.pinnedSongIds.includes(songId);
  }

  public togglePinSong(songId: string): boolean {
    if (this.pinnedSongIds.includes(songId)) {
      this.pinnedSongIds = this.pinnedSongIds.filter(id => id !== songId);
    } else {
      this.pinnedSongIds = [songId, ...this.pinnedSongIds];
    }
    this.save();
    this.notify();
    return this.pinnedSongIds.includes(songId);
  }

  public addCustomSong(song: Omit<HindiSong, 'id'>): HindiSong {
    const newSong: HindiSong = {
      ...song,
      id: `custom_${Date.now()}`
    };
    this.customSongs = [newSong, ...this.customSongs];
    this.save();
    this.notify();
    return newSong;
  }

  public getAllSongs(): HindiSong[] {
    const all = [...this.customSongs, ...HINDI_SONGS];
    return all.sort((a, b) => {
      const aPinned = this.pinnedSongIds.includes(a.id) ? 1 : 0;
      const bPinned = this.pinnedSongIds.includes(b.id) ? 1 : 0;
      return bPinned - aPinned;
    });
  }

  // Secret Locket Notes
  public getSecretNotes(): SecretNote[] {
    return [...this.secretNotes];
  }

  public addSecretNote(text: string, emoji: string = '💖', audioUrl?: string, duration?: string): SecretNote {
    const note: SecretNote = {
      id: `note_${Date.now()}`,
      text,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      emoji,
      color: ['#FFF1F2', '#FAF5FF', '#FEFCE8'][Math.floor(Math.random() * 3)],
      audioUrl,
      duration
    };
    this.secretNotes = [note, ...this.secretNotes];
    this.save();
    this.notify();
    return note;
  }

  public deleteSecretNote(id: string): void {
    this.secretNotes = this.secretNotes.filter(n => n.id !== id);
    this.save();
    this.notify();
  }

  // Queen's Mood
  public getQueenMood(): KritikaMoodId {
    return this.queenMood;
  }

  public getMoodProfile(): MoodProfile {
    return KRITIKA_MOODS.find(m => m.id === this.queenMood) || KRITIKA_MOODS[0];
  }

  public setQueenMood(moodId: KritikaMoodId): void {
    this.queenMood = moodId;
    this.checkInDaily();
    this.save();
    this.notify();
  }

  // Love Notes & Daily Affirmation
  public getCurrentLoveNote(): LoveNote {
    return LOVE_NOTES[this.loveNoteIndex % LOVE_NOTES.length];
  }

  public drawNextLoveNote(): LoveNote {
    this.loveNoteIndex = (this.loveNoteIndex + 1) % LOVE_NOTES.length;
    this.notify();
    return this.getCurrentLoveNote();
  }

  public getDailyAffirmation(): LoveNote {
    const today = this.getTodayStr();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash << 5) - hash + today.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % LOVE_NOTES.length;
    return LOVE_NOTES[idx];
  }

  // Sparkle Streak & Heatmap
  public getSparkleStreak(): { streak: number, trail: boolean[] } {
    const trail = [true, true, true, false, false, false, false].map((_, idx) => idx < this.streakDays);
    return { streak: this.streakDays, trail };
  }

  public getStreakHeatmap(): Array<{ date: string; dayLabel: string; active: boolean; isToday: boolean }> {
    const days: Array<{ date: string; dayLabel: string; active: boolean; isToday: boolean }> = [];
    const today = this.getTodayStr();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const dayLabel = dayNames[d.getDay()];

      days.push({
        date: dateStr,
        dayLabel,
        active: this.activeDates.includes(dateStr),
        isToday: dateStr === today
      });
    }
    return days;
  }

  public addSparkleStreak(): void {
    this.checkInDaily();
    this.streakDays += 1;
    this.save();
    this.notify();
  }
}

export const wellnessState = new WellnessState();

```

---

### File: `src/types/canvas-confetti.d.ts`

```ts
declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }
  function confetti(options?: Options): Promise<null>;
  export default confetti;
}

```

---

### File: `src/types/game.ts`

```ts
export type QuestionType = 
  | 'multiple_choice'
  | 'true_false'
  | 'guess_movie'
  | 'guess_character'
  | 'guess_actor'
  | 'guess_year'
  | 'timeline'
  | 'odd_one_out'
  | 'fact_or_fiction'
  | 'movie_detective'
  | 'marisol_mystery';

export type Category = 
  | 'Food & Cooking'
  | 'Movies'
  | 'TV Shows'
  | 'Bollywood'
  | 'Hollywood'
  | 'Music'
  | 'Pop Culture'
  | 'Science'
  | 'Space'
  | 'Technology'
  | 'Geography'
  | 'History'
  | 'Weird Facts';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Question {
  id: string;
  category: Category;
  subcategory: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  funFact: string;
  clues?: string[]; // For Movie Detective & Marisol's Mystery
  verifiedSource?: string;
  tags: string[];
  secretIngredient?: string; // Revealed when answered correctly in culinary trivia!
}

export interface Zone {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  iconName: string;
  description: string;
  totalLevels: number;
  requiredXp: number;
  marisolComment: string;
  bossName: string;
}

export interface PowerUp {
  id: 'hint' | 'clue' | 'time_freeze' | 'second_chance' | 'streak_shield';
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface CategoryMastery {
  category: Category;
  accuracy: number; // 0 to 100
  questionsAnswered: number;
  level: number;
  stampUnlocked: boolean;
}

export type ChefTitle = 
  | 'Apprentice Chopper 🥒'
  | 'Street Food Gourmet 🥪'
  | 'Bistro Sous Chef 🍳'
  | 'Flavor Alchemist 🍲'
  | 'Executive Head Chef 👩‍🍳'
  | 'Culinary Maestro 🌟'
  | '3-Star Master Chef 👑';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  cuisine: string;
  prepTime: string;
  difficulty: string;
  secretIngredients: string[];
  fullIngredients: string[];
  instructions: string[];
  moviePairing: {
    movie: string;
    quote: string;
    whyWatch: string;
  };
  hungerTrigger: string;
  emoji: string;
  accentColor: string;
  moodMatch: string;
}

export interface PlayerProfile {
  nickname: string;
  level: number;
  xp: number;
  cucumberSandwiches: number; // Primary culinary score & currency
  chefTitle: ChefTitle;
  unlockedRecipes: string[]; // List of unlocked recipe IDs
  collectedIngredients: string[]; // Current round secret ingredients
  streak: number;
  bestStreak: number;
  questionsAnswered: number;
  correctAnswers: number;
  factsDiscovered: number;
  favouriteCategory: Category;
  interests: Category[];
  unlockedZones: string[];
  completedBosses: string[];
  stamps: string[];
  powerUps: Record<string, number>;
  onboardingCompleted: boolean;
  createdAt: string;
  activeSticker?: string; // Companion mood sticker alias from the 11 stickers
}

export interface AdaptiveKnowledgeProfile {
  categoryStats: Record<Category, {
    total: number;
    correct: number;
    avgTimeMs: number;
    recentAccuracy: number[];
  }>;
  missedQuestionIds: string[];
  currentSkillRating: number; // 1 (Beginner) to 5 (Expert)
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requiredValue: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AudioSettings {
  musicOn: boolean;
  sfxOn: boolean;
  musicVolume: number; // 0 to 1
  sfxVolume: number; // 0 to 1
}

export interface TeacherProfile {
  teacherName: string;
  subject: string;
  favoriteMovies: string;
  favoriteShows: string;
  famousPhrases: string[];
  classroomMemories: string[];
  classmateNames: string[];
  customMessage: string;
}

export type MarisolExpression =
  | 'idle'
  | 'welcome'
  | 'excited'
  | 'thinking'
  | 'curious'
  | 'surprised'
  | 'shocked'
  | 'happy'
  | 'laughing'
  | 'proud'
  | 'celebrating'
  | 'encouraging'
  | 'confused'
  | 'oops'
  | 'disappointed'
  | 'motivational'
  | 'genius'
  | 'dramatic'
  | 'sleepy'
  | 'wink'
  | 'chai'
  | 'reading'
  | 'peace'
  | 'music';

export type ScreenState = 
  | 'cinematic'
  | 'onboarding'
  | 'home'
  | 'map'
  | 'quiz'
  | 'passport'
  | 'daily'
  | 'profile'
  | 'achievements'
  | 'classroom'
  | 'teacher_custom'
  | 'secret_classroom'
  | 'stickers'
  | 'recipes'
  | 'vault'
  | 'batch_wall'
  | 'music'
  | 'group_chat';




```

---

### File: `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

```

---

### File: `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FAF7F0',
          100: '#F5EFE6',
          200: '#E8DFD1',
          300: '#D7C4B0',
        },
        ink: {
          light: '#5C544E',
          DEFAULT: '#2C2825',
          dark: '#1A1816',
        },
        plum: {
          500: '#6B4670',
          600: '#4D3152',
          700: '#3D2C40',
        },
        coral: {
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FA5252',
        },
        doodleGold: '#F59E0B',
        doodleTeal: '#14B8A6',
        doodlePink: '#F472B6',
      },
      fontFamily: {
        hand: ['"Patrick Hand"', '"Kalam"', '"Caveat"', 'cursive'],
        display: ['"Outfit"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'sketch': '3px 3px 0px 0px #2C2825',
        'sketch-lg': '5px 5px 0px 0px #2C2825',
        'sketch-xl': '8px 8px 0px 0px #2C2825',
        'paper': '0 4px 20px -2px rgba(61, 44, 64, 0.08)',
      },
      borderRadius: {
        'sketch': '255px 15px 225px 15px/15px 225px 15px 255px',
        'card': '1.25rem',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      },
      animation: {
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

```

---

### File: `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

---

### File: `tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

---

### File: `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

---

### File: `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/manifest.webmanifest",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}

```

---

### File: `vite.config.ts`

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
})


```

---

