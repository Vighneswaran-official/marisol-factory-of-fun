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
