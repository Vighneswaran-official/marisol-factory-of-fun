# 🌸 CHAT_WITH_CLAUDE.md — Master Project Guide & Prompt for Claude

> **How to use this file:**
> - **Option 1 (Web / Mobile Claude)**: Upload or copy-paste this file directly into [Claude.ai](https://claude.ai) or the Claude mobile app at the start of a conversation.
> - **Option 2 (Claude Projects / Claude Desktop)**: Add this file to your Claude Project knowledge base.
> - **Option 3 (Terminal CLI)**: Run `node scripts/chat_with_claude.cjs` to chat directly with Claude right from your terminal.
> - **Option 4 (Full Codebase Dump)**: If you need Claude to inspect every single line of code across the entire repository, upload [`CLAUDE_CODEBASE_BUNDLE.md`](./CLAUDE_CODEBASE_BUNDLE.md) (generated via `node scripts/generate_bundle.cjs`).

---

## 🤖 System Prompt for Claude

```
You are Claude, acting as the Lead Full-Stack Architect, UI/UX Designer, and Sisterly Wellness Companion Engineer for "Marisol: Factory of Fun".

Your mission:
1. Provide thoughtful, production-grade TypeScript (React 19 + Vite) code and architectural guidance.
2. Maintain the warm, playful, pastel, and sisterly aesthetic (rose, amber, lavender, glassmorphism) tailored for Kritika and Batch MLP41PT.
3. Keep real-time features resilient (Firebase Firestore, WebRTC Voice Room, BroadcastChannel).
4. Strictly respect privacy rules: email verification required for active participation, new user message privacy, and author-only edit controls.
```

---

## 1. Project Overview & Vision

- **Project Name**: Marisol: Factory of Fun
- **Repository**: [https://github.com/Vighneswaran-official/marisol-factory-of-fun](https://github.com/Vighneswaran-official/marisol-factory-of-fun)
- **Primary Beneficiary**: Dedicated as a warm sisterly wellness companion, culinary cinema trivia celebration, and interactive community lounge for **Kritika** and **Batch MLP41PT** classmates.
- **Tone & Aesthetics**: Warm, comforting, whimsical, vibrant, and interactive. Smooth micro-animations, pastel cards, glassmorphic docks, sound synthesizer feedback, and confetti celebrations.

---

## 2. Technology Stack

| Layer | Technology & Version | Details |
|---|---|---|
| **Framework** | React 19 (`react`, `react-dom`) | Functional components, modern hooks, Strict Mode |
| **Language** | TypeScript 5.8+ | Strict type checking (`tsc -b`) |
| **Bundler** | Vite 8+ | Rapid HMR, asset optimization |
| **Styling** | Tailwind CSS + Custom CSS (`src/index.css`) | Glassmorphism, pastel themes, mobile dock navigation |
| **Icons** | `lucide-react` | Unified SVG icons |
| **Audio SFX** | Web Audio API Synthesizer (`src/services/synthAudioEngine.ts`) | Zero external audio asset dependencies; purely synthesized chimes, pops, fanfare |
| **Realtime & Auth** | Firebase 12+ (Firestore & Auth) | Group chat sync, wall posts, live reactions, email verification |
| **Live Voice** | WebRTC + Firestore Signaling (`src/services/voiceRoomService.ts`) | Discord-style real-time voice lounge with peer audio isolation |
| **PWA & Mobile** | Capacitor 8 (`@capacitor/android`) & `vite-plugin-pwa` | Installable on Android & iOS, home screen prompt modal |

---

## 3. Key Systems & Architecture

### A. Discord-Style Real-Time Voice Room (`src/services/voiceRoomService.ts`)
- **Peer-to-Peer WebRTC**: Connects participants via RTCPeerConnection with STUN fallback (`stun:stun.l.google.com:19302`).
- **Audio Isolation**: Only members who explicitly click **"Join Voice Room"** transmit or receive live audio.
- **Speaking & Volume Detection**: Browser `AudioContext` with `AnalyserNode` monitors mic levels to show glowing visual speaking indicators.
- **Interactive Cheers**: Participants can send sound-effect reactions (`fanfare`, `pop`, `powerup`, `levelup`) that play synchronously across listeners.
- **Controls**: Mute/unmute microphone, deafen/undeafen audio, and leave room.

### B. Unified Batch 41 Community Hub (`src/components/BatchUpdatesWall.tsx` & `src/services/batchWallState.ts`)
1. **💬 Group Lounge (Real-Time Chat)**:
   - Shared lounge for all Batch 41 peers.
   - Rich messaging: text, stickers, image sharing, quote replies, and quick polls.
   - **Strict Access Control**: Anonymous users can browse, but posting requires connecting a verified email address (`authService.isUserAllowedToChat()`).
   - **New User Privacy**: Recent members do not see chat history prior to their join timestamp.
2. **📌 Pinned & Important Highlights**:
   - Filterable by tags: `[Notice]`, `[Important]`, `[Deadline]`, `[Resource]`, `[Event]`.
   - **"Jump to Message ↗"** button scrolls seamlessly to highlight the source message in chat.
3. **📸 Batch Photo & Story Wall**:
   - Instagram-style photo sharing with retro filter presets (Vintage, Warm, Cool, Sepia, Monochrome).
   - In-app comments, multi-reaction picker (❤️, 👏, 🔥, 😂, 🌸), unique likes modal, and share count tracking.
   - **Author-Only Permissions**: Only the original poster can edit or delete their post.

### C. Sisterly Wellness & Comfort Hub
- **Pinterest 1–9 Mood Scale**: Interactive visual mood selector inspired by Kritika's sticker sheet.
- **Comfort Corner (`ComfortCornerModal.tsx`)**: Breathing exercise guidance, warm tea timers, and calming advice.
- **Dynamic Affirmations (`AffirmationCard.tsx` / `LittleLoveNote.tsx`)**: Daily sisterly pick-me-up notes.
- **Secret Locket (`SecretLocketModal.tsx`)**: Audio memos, keepsakes, and personalized messages.
- **Glow-Up Polaroid Scrapbook (`GlowUpWeekModal.tsx`)**: Photo memory wall with polaroid styling.

### D. Cinema Trivia & Gamification Engine (`src/services/gameState.ts`)
- **Culinary & Bollywood Quiz**: Multi-level trivia with instant synthesizer sound feedback.
- **Reward Economy**: Earn "Cucumber Sandwich" tokens, maintain streak multipliers, and unlock secrets.
- **Celebration Modals**: Full-screen hero video playback (`Hero Banner video.mp4`) and `canvas-confetti` bursts on level clear.
- **YouTube Jukebox (`MusicJukeboxModal.tsx`)**: In-app music player with Hindi playlist and live YouTube streaming.

---

## 4. Directory Map

```
marisol-factory-of-fun/
├── CLAUDE.md                         # Project instructions for Claude Code / Claude Desktop
├── CHAT_WITH_CLAUDE.md               # Master chat guide & prompt (this file)
├── CLAUDE_CODEBASE_BUNDLE.md         # Full bundled source code of the entire repository
├── CLAUDE_MOOD_RECOMMENDATION_PROMPT.md # Prompt for mood scale recipes & trivia
├── package.json                      # Scripts and dependencies
├── vite.config.ts                    # Vite & PWA configuration
├── tailwind.config.js                # Theme colors and fonts
├── scripts/
│   ├── chat_with_claude.cjs          # Terminal interactive chat script with Claude API
│   ├── generate_bundle.cjs           # Regenerates CLAUDE_CODEBASE_BUNDLE.md
│   └── process_all_11_images.cjs     # Asset slicing utilities
└── src/
    ├── App.tsx                       # Master screen router & global modals
    ├── main.tsx                      # Entry point
    ├── index.css                     # Global design tokens, scrollbars, animations
    ├── components/                   # UI Modules (36+ modular components)
    │   ├── BatchUpdatesWall.tsx      # Group Chat, Pinned Notices & Photo Wall
    │   ├── GoogleSignInModal.tsx     # Email authentication modal
    │   ├── MusicJukeboxModal.tsx     # Music player & YouTube stream
    │   ├── LevelClearHeroModal.tsx   # Video celebration modal
    │   ├── ComfortCornerModal.tsx    # Wellness breathing & soothing tools
    │   └── BottomNavigationDock.tsx  # Floating bottom dock
    ├── services/                     # Business logic singletons
    │   ├── authService.ts            # User profile, email check, role detection
    │   ├── batchWallState.ts         # Group chat, pinned messages & Firestore sync
    │   ├── voiceRoomService.ts       # WebRTC voice room & audio analysis
    │   ├── synthAudioEngine.ts       # Native Web Audio sound synthesis
    │   ├── gameState.ts              # Quiz score, streak, cucumber tokens
    │   └── firebase.ts               # Firebase App & Firestore initialization
    └── data/                         # Hardcoded data & trivia sets
        ├── questions.ts              # Cinema & culinary quiz items
        ├── recipes.ts                # Cucumber sandwich recipes
        ├── stickers.ts               # Chat stickers & emojis
        └── affirmations.ts           # Sisterly daily affirmation quotes
```

---

## 5. Development & Testing Commands

```bash
# Start local development server
npm run dev

# Run TypeScript type-checker & production build
npm run build

# Fast code linter
npm run lint

# Chat with Claude directly from your terminal (needs ANTHROPIC_API_KEY)
node scripts/chat_with_claude.cjs

# Re-bundle all source code into CLAUDE_CODEBASE_BUNDLE.md
node scripts/generate_bundle.cjs
```

---

## 6. Sample Prompts to Ask Claude

Copy and paste any of these prompts into your chat with Claude:

### 💡 Feature Expansion
> *"Claude, I want to add a live collaborative drawing canvas to the Comfort Corner in Marisol Factory of Fun. How should we architect this using Firebase Firestore or WebRTC data channels so it matches the warm aesthetic?"*

### 🛠️ Bug Fixing & Optimization
> *"Claude, review `src/services/voiceRoomService.ts` for edge cases where a user disconnects abruptly or switches audio output devices. Provide the updated TypeScript code."*

### 🎨 UI & Polish
> *"Claude, suggest 3 micro-animation improvements for `BottomNavigationDock.tsx` using Tailwind CSS and smooth CSS springs that enhance the sisterly companion feel."*

### ❓ New Content Generation
> *"Claude, generate 10 new Bollywood cinema and culinary trivia questions formatted to match `src/data/questions.ts`, focusing on 2000s comfort cinema (Jab We Met, Yeh Jawaani Hai Deewani)."*
