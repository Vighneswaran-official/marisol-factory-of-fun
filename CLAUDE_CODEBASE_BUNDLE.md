# Marisol Factory of Fun - Complete Codebase for Claude

## Project Overview
- **Project Name**: Marisol Factory of Fun (Kritika Companion & Culinary Cinema Trivia)
- **GitHub Repository**: https://github.com/Vighneswaran-official/marisol-factory-of-fun
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Web Audio API / Synth, PWA (vite-plugin-pwa)
- **Key Features**:
  - Sisterly wellness companion (dynamic mood, affirmations, comfort corner)
  - Culinary & Bollywood cinema trivia engine with recipes & cucumber sandwich scoring
  - In-website YouTube Jukebox & live search
  - Level clear celebration with hero banner video
  - Secret locket with voice memos & notes
  - Glow-Up Week polaroid scrapbook
  - Full PWA downloadable on Android & iOS

## Project Directory Structure
```
.gitignore
.oxlintrc.json
README.md
api/
  youtube-search.ts
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
    marisol_sheet.jpg
    poses/
      big_dreams.png
      bigger_adventures.png
      bigger_adventures_test.png
      brighter_ideas.png
      brighter_ideas_test.png
      brighter_ideas_with_title.png
      chai_happiness.png
      grateful_always.png
      happier_days.png
      just_me.png
      music_mood.png
      music_mood_test.png
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
  generate_bundle.cjs
  process_all_11_images.cjs
  slice_poses.cjs
src/
  App.css
  App.tsx
  assets/
    Hero Banner video.mp4
    hero.png
    react.svg
    vite.svg
  components/
    BossRound.tsx
    BottomNavigationDock.tsx
    CelebrationLocketModal.tsx
    ClassroomMode.tsx
    ComfortCornerModal.tsx
    CozyModeOverlay.tsx
    DailyChallenge.tsx
    GameMap.tsx
    GlowUpWeekModal.tsx
    HomeScreen.tsx
    InstallAppModal.tsx
    KnowledgePassport.tsx
    LearningCard.tsx
    LevelClearHeroModal.tsx
    LittleLoveNote.tsx
    Marisol.tsx
    MoodSelectorModal.tsx
    MovieDetectiveCard.tsx
    MusicJukeboxModal.tsx
    Navbar.tsx
    OpeningCinematic.tsx
    PlayerProfileCard.tsx
    QuestionCard.tsx
    RecipeModal.tsx
    RecipeVault.tsx
    SecretClassroom.tsx
    SecretLocketModal.tsx
    SparkleStreak.tsx
    StickerCollection.tsx
    TeacherMode.tsx
  data/
    achievements.ts
    animeScenes.ts
    hindiSongs.ts
    questions.ts
    recipes.ts
    stickers.ts
    zones.ts
  index.css
  main.tsx
  services/
    adaptiveEngine.ts
    animeAudio.ts
    gameState.ts
    synthAudioEngine.ts
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

### File: `api/youtube-search.ts`

```ts
﻿export default async function handler(req: any, res: any) {
  try {
    const query = (req.query?.q || '').toString().trim();
    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter', results: [] });
    }

    const fetchRes = await fetch(https://www.youtube.com/results?search_query=, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    const html = await fetchRes.text();
    const match = html.match(/var ytInitialData = ({.*?});<\/script>/) || html.match(/ytInitialData\s*=\s*({.+?});/);
    const results: Array<{
      videoId: string;
      title: string;
      channel: string;
      duration: string;
      thumbnail: string;
    }> = [];

    if (match) {
      const json = JSON.parse(match[1]);
      const contents = json.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
      for (const item of contents) {
        const v = item.videoRenderer;
        if (v && v.videoId) {
          results.push({
            videoId: v.videoId,
            title: v.title?.runs?.[0]?.text || 'YouTube Song',
            channel: v.ownerText?.runs?.[0]?.text || 'YouTube Creator',
            duration: v.lengthText?.simpleText || '',
            thumbnail: https://img.youtube.com/vi//mqdefault.jpg
          });
        }
        if (results.length >= 12) break;
      }
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ results });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error', results: [] });
  }
}

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
    
    <!-- PWA Manifest for Android & Desktop -->
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#F43F5E" />
    <meta name="mobile-web-app-capable" content="yes" />

    <!-- iOS Apple Touch Icon & Fullscreen Standalone App Configuration -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
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
  </head>
  <body class="bg-paper-50 text-ink antialiased overflow-x-hidden selection:bg-doodleGold/30 selection:text-ink">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>

    <!-- Register PWA Service Worker for Offline & Install Capability -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then((reg) => {
            console.log('[PWA] Service Worker registered successfully:', reg.scope);
          }).catch((err) => {
            console.log('[PWA] Service Worker registration failed:', err);
          });
        });
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
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
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
const CACHE_NAME = 'marisol-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/maskable-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
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
  if (url.pathname.startsWith('/api/')) return;
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
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
import { LevelClearHeroModal } from './components/LevelClearHeroModal';
import { InstallAppModal } from './components/InstallAppModal';
import { GlowUpWeekModal } from './components/GlowUpWeekModal';
import { CozyModeOverlay } from './components/CozyModeOverlay';
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
  const [showLevelClearHero, setShowLevelClearHero] = useState(false);
  const [showCelebrationLocket, setShowCelebrationLocket] = useState(false);
  const [showGlowUpWeek, setShowGlowUpWeek] = useState(false);
  const [showCozyMode, setShowCozyMode] = useState(false);
  const [showInstallApp, setShowInstallApp] = useState(false);

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
      // Trigger Hero Banner Video level clear celebration!
      setShowLevelClearHero(true);
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
        <Navbar 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          onOpenInstallApp={() => setShowInstallApp(true)}
        />
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
            onOpenInstallApp={() => setShowInstallApp(true)}
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
            onComplete={(passed) => {
              if (passed) {
                setShowLevelClearHero(true);
              }
              handleNavigate('map');
            }}
          />
        )}

        {currentScreen === 'passport' && (
          <KnowledgePassport />
        )}

        {currentScreen === 'daily' && (
          <DailyChallenge onComplete={() => {
            setShowLevelClearHero(true);
            handleNavigate('home');
          }} />
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

        {/* Install / Download App Modal (Android & iOS) */}
        {showInstallApp && (
          <InstallAppModal onClose={() => setShowInstallApp(false)} />
        )}

        {/* Level Cleared Hero Banner Video Celebration Modal */}
        {showLevelClearHero && (
          <LevelClearHeroModal
            earnedSandwiches={roundSandwiches || 5}
            onClose={() => {
              setShowLevelClearHero(false);
              setShowRecipeModal(true);
            }}
          />
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

```

---

### File: `src/components/BossRound.tsx`

```tsx
import React, { useState } from 'react';
import type { Zone, Question } from '../types/game';
import { QUESTIONS_DATABASE } from '../data/questions';
import { QuestionCard } from './QuestionCard';
import { LearningCard } from './LearningCard';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { Film, ArrowRight } from 'lucide-react';

interface BossRoundProps {
  zone: Zone;
  onComplete: (success: boolean) => void;
}

export const BossRound: React.FC<BossRoundProps> = ({ zone, onComplete }) => {
  const [questions] = useState<Question[]>(() => {
    // Select 10 questions for the Boss Battle
    const available = QUESTIONS_DATABASE.filter(q => q.category === zone.category || q.category === 'Movies');
    return available.slice(0, 10);
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
    const qXp = isCorrect ? 250 : 0;

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
      // Finished 10 Boss Questions
      setIsFinished(true);
      const passed = correctCount >= 7; // Need 7/10 to pass Boss
      if (passed) {
        audioEngine.playSfx('fanfare');
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameState.unlockZone(zone.id);
        gameState.addXp(earnedXp + 500); // 500 XP Boss Bonus
      }
    }
  };

  if (isFinished) {
    const passed = correctCount >= 7;

    return (
      <div className="min-h-screen bg-paper-50 p-4 sm:p-6 flex items-center justify-center text-ink">
        <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl max-w-lg w-full text-center space-y-6 animate-fade-in">
          
          <Marisol
            expression={passed ? 'celebrating' : 'encouraging'}
            size="large"
            dialogue={
              passed
                ? `PROJECTOR FULLY POWERED! You conquered ${zone.bossName}!`
                : `So close! You powered ${correctCount}/10 light bulbs. Try again anytime!`
            }
            bubblePosition="top"
          />

          <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
            {passed ? 'BOSS DEFEATED! 🎉' : 'PROJECTOR DIMMED'}
          </h1>

          <div className="bg-paper-50 border-2 border-ink p-4 rounded-2xl space-y-2 font-sans">
            <div className="text-sm text-ink-light">Projector Power Score:</div>
            <div className="font-display font-black text-3xl text-coral-500">
              {correctCount} / 10 BULBS LIT
            </div>
            {passed && (
              <div className="text-xs font-bold text-doodleTeal uppercase tracking-wider">
                +500 BONUS XP EARNED!
              </div>
            )}
          </div>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onComplete(passed);
            }}
            className="sketch-btn-primary w-full py-4 text-xl font-black uppercase flex items-center justify-center gap-2 shadow-sketch-lg"
          >
            <span>RETURN TO MAP</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Boss Header: Vintage Projector Light Meter */}
      <div className="max-w-xl mx-auto mb-6 bg-white border-3 border-ink rounded-2xl p-4 shadow-sketch-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-black text-base text-plum-700">
            <Film className="w-5 h-5 text-coral-500 animate-spin" />
            <span>BOSS: {zone.bossName}</span>
          </div>
          <div className="font-handwritten text-sm font-bold text-ink-light">
            PROJECTOR POWER: {correctCount}/10
          </div>
        </div>

        {/* 10 Bulb Light Meter */}
        <div className="grid grid-cols-10 gap-1.5 pt-1">
          {Array.from({ length: 10 }).map((_, idx) => {
            const isLit = idx < correctCount;
            return (
              <div
                key={idx}
                className={`
                  h-4 rounded-md border-1.5 border-ink transition-all duration-300
                  ${isLit ? 'bg-doodleGold shadow-sketch scale-105' : 'bg-paper-200'}
                `}
              />
            );
          })}
        </div>
      </div>

      {/* Question or Learning Card */}
      {!showLearningCard ? (
        <QuestionCard
          question={currentQ}
          questionNumber={currentIndex + 1}
          totalQuestions={10}
          onAnswer={handleAnswer}
        />
      ) : (
        <LearningCard
          question={currentQ}
          isCorrect={currentAnswer?.isCorrect || false}
          userAnswer={currentAnswer?.option || ''}
          earnedXp={currentAnswer?.isCorrect ? 250 : 0}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
};

```

---

### File: `src/components/BottomNavigationDock.tsx`

```tsx
import React from 'react';
import { Home, Music, Play, Lock } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

export type MainNavTab = 'home' | 'lounge' | 'quiz' | 'locket';

interface BottomNavigationDockProps {
  activeTab: MainNavTab;
  onTabSelect: (tab: MainNavTab) => void;
}

export const BottomNavigationDock: React.FC<BottomNavigationDockProps> = ({ activeTab, onTabSelect }) => {
  const tabs: Array<{ id: MainNavTab; label: string; icon: React.ReactNode; emoji: string }> = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, emoji: '🏠' },
    { id: 'lounge', label: 'Lounge', icon: <Music className="w-4 h-4" />, emoji: '🎵' },
    { id: 'quiz', label: 'Quiz', icon: <Play className="w-4 h-4 fill-current" />, emoji: '🍳' },
    { id: 'locket', label: 'Locket', icon: <Lock className="w-4 h-4" />, emoji: '🔐' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-white/90 backdrop-blur-md border-2 border-pink-300 rounded-full px-3 py-1.5 shadow-sketch-lg flex items-center gap-1 sm:gap-2 max-w-md w-full justify-around">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playSfx('click');
                onTabSelect(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 sm:px-3 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs scale-105 font-black'
                  : 'text-stone-500 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <span className="text-base sm:text-lg leading-none">{tab.emoji}</span>
              <span className="text-[10px] sm:text-[11px] font-display font-black tracking-tight mt-0.5">
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
import { Heart, Sparkles, X, Award } from 'lucide-react';

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
    // Soft celebratory chime fanfare
    audioEngine.playSfx('fanfare');

    // Confetti shower
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#EC4899', '#FBBF24', '#A855F7', '#10B981']
    });

    // Local animated photo memory loop on canvas (100% private client-side)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let currentImageIndex = 0;
    let progress = 0;

    const loadedImages: HTMLImageElement[] = [];
    let imagesReady = false;

    // Preload images
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

        // Draw soft pastel glow background
        const gradient = ctx.createRadialGradient(160, 160, 20, 160, 160, 160);
        gradient.addColorStop(0, '#FFF1F2');
        gradient.addColorStop(1, '#FCE7F3');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ken-burns gentle zoom effect
        const scale = 1.0 + Math.sin(progress * Math.PI) * 0.08;
        const w = 240 * scale;
        const h = 240 * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;

        // Draw current image with cross-fade
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

      // Draw floating heart & bow particles
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
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-4xl max-w-md w-full p-6 shadow-sketch-2xl space-y-4 text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors z-20 shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header Ribbon */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-display font-black text-xs px-3.5 py-1 rounded-full border border-ink shadow-xs">
          <Award className="w-4 h-4" />
          <span>MILESTONE CONQUERED!</span>
        </div>

        {/* Heart Locket Ornate Frame */}
        <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 p-3 bg-gradient-to-tr from-amber-300 via-rose-300 to-pink-400 rounded-full border-4 border-ink shadow-sketch-xl flex items-center justify-center">
          
          {/* Inner Canvas for Local Animated Photo Memory Reel */}
          <div className="w-full h-full rounded-full overflow-hidden border-3 border-white shadow-inner bg-pink-50 relative">
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Locket Charms */}
          <Heart className="w-8 h-8 fill-pink-500 text-white absolute -top-2 -left-2 drop-shadow-md animate-bounce-gentle" />
          <Sparkles className="w-8 h-8 text-amber-300 absolute -bottom-2 -right-2 drop-shadow-md animate-spin" />
        </div>

        {/* Cute Speech Bubble Message */}
        <div className="relative bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch text-center space-y-1">
          {/* Bubble tail */}
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
    </div>
  );
};

```

---

### File: `src/components/ClassroomMode.tsx`

```tsx
import React, { useState } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import { Users, Trophy, Copy, Check } from 'lucide-react';

interface ClassroomModeProps {
  onStartQuiz: () => void;
}

const DUMMY_LEADERBOARD = [
  { rank: 1, name: 'Aarav (Movie Expert)', xp: 1450, badge: '👑 Class Champion' },
  { rank: 2, name: 'Riya (Fastest Thinker)', xp: 1220, badge: '⚡ Flash Brain' },
  { rank: 3, name: 'Ananya (Fact Collector)', xp: 1150, badge: '📚 Curiosity Queen' },
  { rank: 4, name: 'You (Curious Explorer)', xp: 980, badge: '🔥 Comeback Star' },
  { rank: 5, name: 'Karan (Bollywood Soul)', xp: 850, badge: '🎬 Filmy Star' },
];

export const ClassroomMode: React.FC<ClassroomModeProps> = ({ onStartQuiz }) => {
  const [roomCode] = useState('MARISOL-482');
  const [selectedMode, setSelectedMode] = useState<'1v1' | 'team' | 'class'>('1v1');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    audioEngine.playSfx('click');
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-coral-500">
          🏫 CLASSROOM ARENA
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700">
          MULTIPLAYER CLASSROOM
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Challenge your classmates, form teams, or take on the Teacher Battle!
        </p>
      </div>

      {/* Marisol Guide */}
      <div className="max-w-xl mx-auto mb-8 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol expression="excited" size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-lg text-ink">Classroom Host Marisol</h3>
          <p className="font-handwritten text-base text-ink-light">
            "Share room code MARISOL-482 with your classmates to battle together!"
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Room Setup Box */}
        <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-6">
          <h2 className="font-display font-black text-2xl text-ink flex items-center gap-2">
            <Users className="w-6 h-6 text-coral-500" />
            <span>JOIN OR HOST ROOM</span>
          </h2>

          {/* Room Code Pill */}
          <div className="bg-paper-50 p-4 rounded-2xl border-2 border-ink flex items-center justify-between">
            <div>
              <div className="font-handwritten text-xs font-bold text-ink-light">PRIVATE ROOM CODE</div>
              <div className="font-display font-black text-2xl text-plum-700">{roomCode}</div>
            </div>
            <button
              onClick={copyCode}
              className="sketch-btn px-3 py-2 text-xs font-bold flex items-center gap-1 bg-white"
            >
              {copied ? <Check className="w-4 h-4 text-doodleTeal" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          {/* Game Modes Selection */}
          <div className="space-y-3">
            <div className="font-display font-bold text-sm text-ink-light">SELECT BATTLE MODE:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedMode('1v1')}
                className={`sketch-btn p-3 text-center transition-all ${
                  selectedMode === '1v1' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                }`}
              >
                1v1 Duel
              </button>
              <button
                onClick={() => setSelectedMode('team')}
                className={`sketch-btn p-3 text-center transition-all ${
                  selectedMode === 'team' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
                }`}
              >
                Team Battle
              </button>
              <button
                onClick={() => setSelectedMode('class')}
                className={`sketch-btn p-3 text-center transition-all ${
                  selectedMode === 'class' ? 'bg-coral-500 text-white font-bold' : 'bg-white text-ink'
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
  );
};

```

---

### File: `src/components/ComfortCornerModal.tsx`

```tsx
import React, { useState } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { Heart, Sparkles, X, Utensils, Music, ShieldAlert, Award, Smile } from 'lucide-react';

interface ComfortCornerModalProps {
  onClose: () => void;
  onOpenMusic: () => void;
  onOpenHindiSong?: (songId: string) => void;
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

export const ComfortCornerModal: React.FC<ComfortCornerModalProps> = ({ onClose, onOpenMusic, onOpenHindiSong }) => {
  const [poppedBubbles, setPoppedBubbles] = useState<Record<string, boolean>>({});
  const [claimedSandwiches, setClaimedSandwiches] = useState(false);
  const [activeTab, setActiveTab] = useState<'rage' | 'cravings' | 'vent' | 'affirmations'>('rage');
  const [affirmationIdx, setAffirmationIdx] = useState(0);

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
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl border-2 border-ink bg-coral-500 text-white flex items-center justify-center font-bold text-xl shadow-sketch">
              <Heart className="w-6 h-6 fill-white animate-bounce-gentle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-xl sm:text-2xl text-ink leading-tight">
                  GIRL'S COMFORT CORNER ♡
                </h2>
                <span className="bg-coral-100 text-coral-800 font-handwritten text-[11px] font-black px-2 py-0.5 rounded-full border border-coral-400">
                  TLC & VENT
                </span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                From one girl to another: validation, comfort carbs & instant de-stressing!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1.5 bg-paper-200 border-2 border-ink rounded-2xl p-1 font-display font-black text-[11px] sm:text-xs text-center">
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('rage'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'rage' ? 'bg-white shadow-sketch border border-ink text-coral-600' : 'text-ink-light hover:text-ink'}`}
          >
            🔥 VENT & POP
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('cravings'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'cravings' ? 'bg-white shadow-sketch border border-ink text-amber-700' : 'text-ink-light hover:text-ink'}`}
          >
            🍜 CRAVINGS
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('affirmations'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'affirmations' ? 'bg-white shadow-sketch border border-ink text-purple-700' : 'text-ink-light hover:text-ink'}`}
          >
            ✨ AFFIRMATIONS
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('vent'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'vent' ? 'bg-white shadow-sketch border border-ink text-emerald-700' : 'text-ink-light hover:text-ink'}`}
          >
            🎧 MOOD BEAT
          </button>
        </div>

        {/* Tab 1: Interactive Stress Popper */}
        {activeTab === 'rage' && (
          <div className="space-y-3">
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

        {/* Tab 2: Comfort Food Cravings */}
        {activeTab === 'cravings' && (
          <div className="space-y-2.5">
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
                  className="bg-white border-2 border-ink/30 rounded-2xl p-3 flex items-start gap-3 shadow-sketch-xs hover:border-ink transition-all"
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

        {/* Tab 3: Affirmations */}
        {activeTab === 'affirmations' && (
          <div className="space-y-4 text-center py-3">
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

        {/* Tab 4: Mood Beat Switches */}
        {activeTab === 'vent' && (
          <div className="space-y-3">
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
          <p className="font-handwritten text-xs text-rose-900 font-bold">
            "Bad moods are temporary, but good food, great music, and you being iconic is forever." ♡
          </p>
        </div>
      </div>
    </div>
  );
};

```

---

### File: `src/components/CozyModeOverlay.tsx`

```tsx
import React from 'react';
import { wellnessState } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import { RECIPES } from '../data/recipes';
import { X, Coffee, Film } from 'lucide-react';

interface CozyModeOverlayProps {
  onClose: () => void;
  onOpenMusic: () => void;
}

export const CozyModeOverlay: React.FC<CozyModeOverlayProps> = ({ onClose, onOpenMusic }) => {
  const pinnedIds = wellnessState.getPinnedSongIds();
  const allSongs = wellnessState.getAllSongs();
  const favoriteSong = allSongs.find(s => pinnedIds.includes(s.id)) || allSongs[0];
  const chaiRecipe = RECIPES.find(r => r.id === 'bollywood_masala_chai') || RECIPES[1];

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#372E3A]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Blanket-Wrap Transition Container */}
      <div 
        className="bg-gradient-to-br from-[#FFFDF7] via-[#FFF8F0] to-[#FAF5FF] border-3 border-pink-300/80 rounded-4xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-sketch-2xl space-y-4 relative animate-blanket-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border-2 border-pink-200 flex items-center justify-center font-black bg-white hover:bg-pink-100 transition-colors z-20 shadow-xs"
        >
          <X className="w-5 h-5 text-pink-700" />
        </button>

        {/* Cozy Blanket Header */}
        <div className="text-center space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full font-handwritten text-xs font-bold shadow-2xs">
            <span>☁️</span>
            <span>COZY MODE ACTIVATED</span>
            <span>🤍</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
            Wrap Yourself in Warmth, Babe
          </h2>
          <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold max-w-sm mx-auto">
            Notifications on pause. Warm chai steaming. Your favorite song ready. You've earned this tranquility.
          </p>
        </div>

        {/* Cozy Trifecta: Pinned Song, Tapri Chai, Movie Recommendation */}
        <div className="space-y-3 pt-1">
          
          {/* Item 1: Favorite Pinned Song */}
          <div className="bg-white/90 border-2 border-pink-200 rounded-3xl p-4 flex items-center justify-between shadow-sketch-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                {favoriteSong.emoji}
              </div>
              <div>
                <span className="text-[10px] uppercase font-handwritten font-bold text-pink-600 block">
                  YOUR #1 PINNED TRACK 🎵
                </span>
                <h4 className="font-display font-black text-sm text-ink truncate">
                  {favoriteSong.title}
                </h4>
                <p className="font-handwritten text-xs text-ink-light font-bold">
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
              PLAY NOW
            </button>
          </div>

          {/* Item 2: Highway Tapri Masala Chai */}
          <div className="bg-white/90 border-2 border-amber-200 rounded-3xl p-4 flex items-center justify-between shadow-sketch-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-handwritten font-bold text-amber-700 block">
                  COZY CHAI PRESCRIPTION ☕
                </span>
                <h4 className="font-display font-black text-sm text-ink truncate">
                  {chaiRecipe.title.split('&')[0]}
                </h4>
                <p className="font-handwritten text-xs text-ink-light font-bold">
                  Crushed ginger, green cardamom & warm milk hug
                </p>
              </div>
            </div>

            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-amber-300 font-handwritten">
              20 Mins
            </span>
          </div>

          {/* Item 3: Recommended Movie Pairing */}
          <div className="bg-white/90 border-2 border-purple-200 rounded-3xl p-4 flex items-center justify-between shadow-sketch-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-400 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-handwritten font-bold text-purple-700 block">
                  MOVIE NIGHT PAIRING 🎬
                </span>
                <h4 className="font-display font-black text-sm text-ink truncate">
                  Jab We Met & Dil Se
                </h4>
                <p className="font-handwritten text-xs text-ink-light font-bold">
                  Monsoon romance & unstoppable smiles
                </p>
              </div>
            </div>

            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-purple-300 font-handwritten">
              Feel Good
            </span>
          </div>

        </div>

        {/* Ambient Affirmation */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 text-center">
          <p className="font-handwritten text-xs sm:text-sm text-amber-900 font-bold italic">
            "Give yourself permission to just be. The world can wait while you enjoy your warm sip." 🤍
          </p>
        </div>

        {/* Return Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:from-amber-300 hover:to-purple-300 text-ink font-display font-black text-xs uppercase rounded-2xl border-2 border-ink shadow-sketch hover:scale-101 active:scale-98 transition-all"
        >
          STAY IN COZY PEACE ☁️
        </button>

      </div>
    </div>
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

### File: `src/components/GameMap.tsx`

```tsx
import React from 'react';
import { GAME_ZONES } from '../data/zones';
import type { Zone } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import { Lock, Play, Film, Tv, Sparkles, Clapperboard, HelpCircle, Rocket, Globe, Cpu, Music, ShieldAlert } from 'lucide-react';

interface GameMapProps {
  onSelectZone: (zone: Zone, isBoss: boolean) => void;
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
                    <>
                      {/* Standard Quiz Round */}
                      <button
                        onClick={() => {
                          audioEngine.playSfx('click');
                          onSelectZone(zone, false);
                        }}
                        className="sketch-btn-primary flex-1 sm:flex-initial px-4 py-2.5 flex items-center justify-center gap-2 text-sm sm:text-base font-bold shadow-sketch"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>PLAY ROUND</span>
                      </button>

                      {/* Boss Challenge */}
                      <button
                        onClick={() => {
                          audioEngine.playSfx('click');
                          onSelectZone(zone, true);
                        }}
                        className="sketch-btn-gold px-3 py-2.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black shadow-sketch"
                        title="Boss Battle: The Final Cut"
                      >
                        <ShieldAlert className="w-4 h-4 text-ink" />
                        <span>BOSS</span>
                      </button>
                    </>
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
import React from 'react';
import { gameState } from '../services/gameState';
import { wellnessState } from '../services/wellnessState';
import { RECIPES } from '../data/recipes';
import { X, Sparkles, Heart, Camera } from 'lucide-react';

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

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-lg sm:text-xl text-ink leading-tight">
                  YOUR GLOW-UP WEEK 📸
                </h2>
                <span className="bg-pink-100 text-pink-700 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-300">
                  SCRAPBOOK
                </span>
              </div>
              <p className="font-handwritten text-xs text-ink-light font-bold">
                A polaroid memory reel of your triumphs, songs, and flavors!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-4 h-4" />
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
    </div>
  );
};

```

---

### File: `src/components/HomeScreen.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import type { ScreenState } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { wellnessState, KRITIKA_MOODS, type KritikaMoodId } from '../services/wellnessState';
import { Marisol } from './Marisol';
import { LittleLoveNote } from './LittleLoveNote';
import { SparkleStreak } from './SparkleStreak';
import { 
  Play, 
  Sparkles, 
  Heart, 
  Lock, 
  Camera, 
  Music,
  Film
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenState) => void;
  onQuickPlay: () => void;
  onOpenMusic: () => void;
  onOpenComfortCorner: () => void;
  onOpenSecretLocket: () => void;
  onOpenGlowUpWeek: () => void;
  onOpenCozyMode: () => void;
  onOpenInstallApp?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onQuickPlay,
  onOpenMusic,
  onOpenComfortCorner,
  onOpenSecretLocket,
  onOpenGlowUpWeek,
  onOpenCozyMode,
  onOpenInstallApp,
}) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentQueenMood = wellnessState.getQueenMood();
  const moodProfile = wellnessState.getMoodProfile();

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const handleSelectQueenMood = (moodId: KritikaMoodId) => {
    audioEngine.playSfx('click');
    wellnessState.setQueenMood(moodId);
  };

  // Dialogue adapted to queen's selected mood
  const getQueenDialogue = () => {
    switch (currentQueenMood) {
      case 'Tired':
        return "You've worked so hard today, Kritika. Let's wrap in a warm blanket and recharge. 🌙💤";
      case 'Stressed':
        return "Deep breath, darling. Drop your shoulders, sip some chai. You are doing amazing! 🌸💆‍♀️";
      case 'Cozy':
        return "Hot cup of ginger chai & zero stress on our agenda today, queen! ☕☁️";
      case 'Excited':
        return "Tell me everything! What great news are we celebrating today?! 👑✨🎉";
      case 'Low':
        return "Sending you the biggest, warmest sisterly hug. You are so cherished, Kritika! 💕🧸";
      case 'Romantic':
        return "Main apni favourite hoon! Savor every dreamy moment and sweet daydream! 🎀🌷";
      case 'Happy':
      default:
        return player.streak >= 3
          ? `You're on a ${player.streak}-question streak! Unstoppable glow, queen! ✨`
          : `Ready for today's comfort snack & good Bollywood tunes, babe? 💖`;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] p-3 sm:p-5 pb-28 text-ink">
      <div className="max-w-xl mx-auto space-y-4">
        
        {/* TOP BAR: How is Kritika doing today? 💗 & Cozy Mode Button */}
        <div 
          className="border-2 border-pink-200/90 rounded-3xl p-4 shadow-sketch-sm space-y-3 transition-all duration-500"
          style={{ background: moodProfile.bgAtmosphere }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-pulse">💗</span>
              <div>
                <h2 className="font-display font-black text-sm sm:text-base text-pink-950 tracking-tight flex items-center gap-1.5">
                  HOW IS KRITIKA DOING TODAY?
                </h2>
                <p className="text-[11px] font-handwritten font-bold text-pink-800/80">
                  Tap your mood to personalize your entire comfort sanctuary ♡
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  audioEngine.playSfx('powerup');
                  onOpenComfortCorner();
                }}
                className="inline-flex items-center gap-1 bg-pink-100 hover:bg-pink-200 border border-pink-300 text-pink-900 font-display font-black text-xs px-2.5 py-1.5 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all"
                title="Girl's Comfort Corner & Mood TLC"
              >
                <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                <span>TLC</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playSfx('powerup');
                  onOpenCozyMode();
                }}
                className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white border-2 border-pink-300 text-pink-900 font-display font-black text-xs px-3 py-1.5 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all"
              >
                <span>Cozy Mode</span>
                <span>🤍</span>
              </button>
            </div>
          </div>

          {/* 7 Mood Selector Chips: Happy, Tired, Stressed, Cozy, Excited, Low, Romantic */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
            {KRITIKA_MOODS.map(mood => {
              const isSelected = mood.id === currentQueenMood;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleSelectQueenMood(mood.id)}
                  className={`
                    px-3 py-1.5 rounded-2xl border transition-all shrink-0 flex items-center gap-1.5
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-600 shadow-sm scale-105 font-black ring-2 ring-pink-300'
                        : 'bg-white/80 text-ink-light border-pink-200 hover:bg-white hover:border-pink-400'
                    }
                  `}
                >
                  <span className="text-sm">{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Sisterly Reassurance Banner */}
          <div className="bg-white/85 backdrop-blur-xs border border-pink-200 p-2.5 rounded-2xl flex items-center gap-2.5 animate-fade-in shadow-2xs">
            <span className="text-xl">🌸</span>
            <p className="text-xs font-handwritten font-black text-pink-900 leading-snug">
              {moodProfile.reassurance}
            </p>
          </div>
        </div>


        {/* HERO CARD 2: Kritika Companion & Chef Score Hub */}
        <div className="bg-white border-3 border-pink-200/90 rounded-3xl p-5 shadow-sketch text-center space-y-3.5 relative overflow-hidden">
          
          {/* Active Mood Pill */}
          <div className="inline-flex items-center gap-1.5 bg-pink-50 border border-pink-200 px-3 py-0.5 rounded-full font-handwritten text-xs font-bold text-pink-800">
            <span>{moodProfile.emoji}</span>
            <span>Active Vibe: {moodProfile.label}</span>
            <Sparkles className="w-3 h-3 text-pink-400" />
          </div>

          {/* Kritika Companion with Dynamic Dialogue */}
          <div className="flex justify-center pt-0.5">
            <Marisol
              pose={player.activeSticker}
              expression={player.streak >= 3 ? 'excited' : 'welcome'}
              size="large"
              dialogue={getQueenDialogue()}
              bubblePosition="top"
              onClick={() => {
                audioEngine.playSfx('powerup');
                onNavigate('stickers');
              }}
            />
          </div>

          {/* Chef Rank & Cucumber Sandwiches Score Board */}
          <div className="space-y-1.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-pink-50 border-2 border-emerald-400/40 rounded-2xl p-3 text-left shadow-inner">
            <div className="flex justify-between items-center font-display text-xs sm:text-sm font-black text-ink">
              <span className="text-emerald-900 flex items-center gap-1">
                <span>👩‍🍳</span> {player.chefTitle || 'Apprentice Chopper 🥒'}
              </span>
              <span className="text-emerald-800 bg-white border border-emerald-400 px-2.5 py-0.5 rounded-xl shadow-2xs font-black">
                {player.cucumberSandwiches || 0} 🥪 Cucumber Sandwiches
              </span>
            </div>

            {/* Progress to Next Chef Title */}
            <div className="w-full h-3 bg-white border border-ink/30 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-pink-400 border-r border-ink/40 transition-all duration-500"
                style={{ width: `${Math.min(100, ((player.cucumberSandwiches || 0) % 25) * 4)}%` }}
              />
            </div>

            <div className="flex justify-between items-center font-handwritten text-[11px] text-ink-light font-bold">
              <span>+3 Cucumber Sandwiches per correct trivia</span>
              <span>Next Title at {(Math.floor((player.cucumberSandwiches || 0) / 25) + 1) * 25} 🥪</span>
            </div>
          </div>
        </div>

        {/* LITTLE LOVE NOTE (Sticky Note Affirmation) */}
        <LittleLoveNote />

        {/* SPARKLE STREAK (Consecutive Day Tracker) */}
        <SparkleStreak />

        {/* PRIMARY ACTION: COOKING & CINEMA TRIVIA */}
        <button
          onClick={() => {
            audioEngine.playSfx('click');
            onQuickPlay();
          }}
          className="sketch-btn-primary w-full p-4 sm:p-5 text-xl sm:text-2xl font-black uppercase flex items-center justify-between shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🍳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span>COOKING & CINEMA TRIVIA</span>
                <span className="bg-white text-rose-800 font-display text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ENDLESS
                </span>
              </div>
              <span className="block font-handwritten text-xs sm:text-sm text-paper-100 normal-case font-bold mt-0.5">
                Answer trivia, collect secret ingredients & unlock mouth-watering recipes!
              </span>
            </div>
          </div>
          <Play className="w-7 h-7 fill-white shrink-0 ml-2" />
        </button>

        {/* SECTION TILES: Bollywood Lounge & Food-Movie Pairings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Card: Hindi Bollywood Songs (YouTube Connected) */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenMusic();
            }}
            className="w-full bg-gradient-to-br from-red-600 via-rose-600 to-purple-700 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl border-2 border-white/40 overflow-hidden bg-rose-200 shrink-0 shadow-inner">
                <img 
                  src="/marisol/avatars/11_music_mood.png" 
                  alt="Kritika Headphones" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-display font-black text-sm uppercase">YOUTUBE JUKEBOX</span>
                  <span className="bg-red-500 text-white font-display text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white/40">
                    🔴 YT CONNECTED
                  </span>
                </div>
                <div className="font-handwritten text-xs text-rose-100 font-bold truncate">
                  Stream Bollywood hits, search & pin songs! 🎵
                </div>
              </div>
            </div>
            <Music className="w-5 h-5 text-rose-200 group-hover:rotate-45 transition-transform shrink-0" />
          </button>

          {/* Card: Food & Movie Pairings */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('recipes');
            }}
            className="w-full bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 text-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch hover:shadow-sketch-lg hover:scale-102 transition-all text-left flex items-center justify-between relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl border-2 border-white/40 bg-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🎬
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-sm uppercase">FOOD & MOVIES</span>
                  <span className="bg-white/25 text-[9px] px-1.5 py-0.5 rounded-full font-handwritten">PAIRED</span>
                </div>
                <div className="font-handwritten text-xs text-rose-100 font-bold truncate">
                  Highway Chai, Rajma Chawal & cinema!
                </div>
              </div>
            </div>
            <Film className="w-5 h-5 text-white group-hover:scale-125 transition-transform shrink-0" />
          </button>
        </div>

        {/* DEDICATED WELLNESS SHORTCUTS: Secret Locket & Glow-Up Week */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Secret Locket */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenSecretLocket();
            }}
            className="bg-white border-2.5 border-pink-300 rounded-3xl p-3.5 flex flex-col items-center justify-center text-center gap-1 shadow-sketch-sm hover:border-pink-500 hover:scale-102 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-700 shadow-2xs">
              <Lock className="w-5 h-5" />
            </div>
            <span className="font-display font-black text-xs sm:text-sm text-ink">
              SECRET LOCKET 🔐
            </span>
            <span className="font-handwritten text-[11px] text-pink-700 font-bold">
              Notes & Voice Memos
            </span>
          </button>

          {/* Glow-Up Week Scrapbook */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenGlowUpWeek();
            }}
            className="bg-white border-2.5 border-purple-300 rounded-3xl p-3.5 flex flex-col items-center justify-center text-center gap-1 shadow-sketch-sm hover:border-purple-500 hover:scale-102 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shadow-2xs">
              <Camera className="w-5 h-5" />
            </div>
            <span className="font-display font-black text-xs sm:text-sm text-ink">
              GLOW-UP WEEK 📸
            </span>
            <span className="font-handwritten text-[11px] text-purple-700 font-bold">
              Polaroid Scrapbook
            </span>
          </button>
        </div>

        {/* DOWNLOAD ON MOBILE APP BANNER */}
        {onOpenInstallApp && (
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onOpenInstallApp();
            }}
            className="w-full bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border-2.5 border-pink-300 rounded-3xl p-4 shadow-sketch hover:border-pink-500 hover:scale-101 active:scale-98 transition-all flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl border-2 border-ink overflow-hidden bg-rose-200 shadow-xs shrink-0 group-hover:rotate-6 transition-transform">
                <img src="/icon-192.png" alt="Marisol App" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-display font-black text-xs sm:text-sm text-ink">DOWNLOAD APP ON MOBILE</span>
                  <span className="bg-pink-500 text-white font-display text-[9px] font-black px-1.5 py-0.2 rounded-full">
                    📲 ANDROID & IOS
                  </span>
                </div>
                <p className="font-handwritten text-xs text-pink-700 font-bold">
                  Install on your iPhone or Android home screen for instant full-screen comfort! 💖
                </p>
              </div>
            </div>
            <span className="text-xl shrink-0 group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        )}

      </div>
    </div>
  );
};

```

---

### File: `src/components/InstallAppModal.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { X, Download, Smartphone, Share2, PlusSquare, Sparkles, Check, Apple } from 'lucide-react';

interface InstallAppModalProps {
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // Detect if already installed / running standalone
    const standaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standaloneMode);

    // Detect device platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isAndroidDevice = /android/.test(userAgent);

    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);

    // Listen for Android / Chromium PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallAndroid = async () => {
    audioEngine.playSfx('click');
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        audioEngine.playSfx('fanfare');
        setInstalledSuccess(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instruction if browser already triggered or in different browser
      alert("To install on Android:\n1. Tap the three dots (⋮) in your browser menu.\n2. Tap 'Install app' or 'Add to Home screen'.");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-sketch-2xl space-y-4 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-12 h-12 rounded-2xl border-2 border-ink overflow-hidden bg-rose-200 shadow-sketch shrink-0">
              <img 
                src="/icon-192.png" 
                alt="Marisol App Icon" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-ink leading-tight flex items-center gap-1.5">
                <span>DOWNLOAD MARISOL</span>
                <Sparkles className="w-4 h-4 text-pink-500" />
              </h3>
              <p className="font-handwritten text-xs text-pink-700 font-bold">
                Install on your Android or iPhone Home Screen! 📲
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-bold bg-white hover:bg-paper-200 transition-colors shadow-xs shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Already Installed Badge */}
        {isStandalone || installedSuccess ? (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 text-center space-y-1.5 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <p className="font-display font-black text-sm text-emerald-950">
              App Installed Successfully! 🎉
            </p>
            <p className="font-handwritten text-xs text-emerald-800 font-bold">
              Marisol is now added to your home screen!
            </p>
          </div>
        ) : (
          <>
            {/* Feature Perks */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-pink-50 border border-pink-200 rounded-xl p-2">
                <span className="text-base">⚡</span>
                <p className="font-display font-bold text-[10px] text-pink-900 mt-0.5">INSTANT LAUNCH</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-2">
                <span className="text-base">📱</span>
                <p className="font-display font-bold text-[10px] text-purple-900 mt-0.5">FULLSCREEN</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2">
                <span className="text-base">📶</span>
                <p className="font-display font-bold text-[10px] text-amber-900 mt-0.5">OFFLINE READY</p>
              </div>
            </div>

            {/* iOS Instructions */}
            {isIOS ? (
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-pink-300 rounded-2xl p-4 text-left space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-pink-950 font-display font-black text-xs uppercase tracking-wider">
                  <Apple className="w-4 h-4 text-ink" />
                  <span>HOW TO INSTALL ON IPHONE / IPAD:</span>
                </div>

                <div className="space-y-2 text-xs font-handwritten font-bold text-ink">
                  <div className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-pink-200">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
                    <div className="flex-1">
                      Tap the <strong className="text-pink-900 flex-inline items-center gap-1">Share button <Share2 className="w-3.5 h-3.5 inline text-blue-600" /></strong> at the bottom of Safari.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-pink-200">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
                    <div className="flex-1">
                      Scroll down and tap <strong className="text-pink-900 flex-inline items-center gap-1">"Add to Home Screen" <PlusSquare className="w-3.5 h-3.5 inline text-pink-600" /></strong>.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-pink-200">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">3</span>
                    <div className="flex-1">
                      Tap <strong className="text-pink-900">Add</strong> in the top right corner. You're done! 💖
                    </div>
                  </div>
                </div>
              </div>
            ) : isAndroid || deferredPrompt ? (
              /* Android One-Click Install */
              <div className="space-y-3">
                <button
                  onClick={handleInstallAndroid}
                  className="sketch-btn-primary w-full py-3.5 text-base font-black uppercase flex items-center justify-center gap-2 shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
                >
                  <Download className="w-5 h-5" />
                  <span>INSTALL ON ANDROID NOW</span>
                </button>

                <p className="font-handwritten text-xs text-ink-light font-bold">
                  Installs directly to your home screen with zero storage overhead!
                </p>
              </div>
            ) : (
              /* Universal Mobile / Desktop Instructions */
              <div className="space-y-3">
                <button
                  onClick={handleInstallAndroid}
                  className="sketch-btn-primary w-full py-3 text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
                >
                  <Download className="w-4 h-4" />
                  <span>ADD TO HOME SCREEN / INSTALL</span>
                </button>

                <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-3 text-left space-y-1.5 text-xs font-handwritten font-bold text-ink-light">
                  <div className="flex items-center gap-1.5 text-ink font-display font-bold text-[11px]">
                    <Smartphone className="w-3.5 h-3.5 text-pink-600" />
                    <span>Quick Steps:</span>
                  </div>
                  <p>• <strong>iPhone (Safari):</strong> Tap Share ⎋ ➔ 'Add to Home Screen'</p>
                  <p>• <strong>Android (Chrome):</strong> Tap Menu ⋮ ➔ 'Install App' or 'Add to Home Screen'</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer Note */}
        <div className="bg-pink-100/50 border border-pink-200 rounded-xl p-2.5 font-handwritten text-xs text-pink-900 font-bold">
          "Now Kritika can carry her comfort zone everywhere in her pocket!" 💖
        </div>

      </div>
    </div>
  );
};

```

---

### File: `src/components/KnowledgePassport.tsx`

```tsx
import React from 'react';
import { gameState } from '../services/gameState';
import { Marisol } from './Marisol';
import type { Category } from '../types/game';
import { CheckCircle, Lock, Film, Tv, Sparkles, Music, Cpu, Rocket, Globe, HelpCircle } from 'lucide-react';

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

export const KnowledgePassport: React.FC = () => {
  const player = gameState.getPlayer();

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-doodleTeal">
          📘 OFFICIAL DOCUMENT
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700">
          KNOWLEDGE PASSPORT
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Collect illustrated stamps as you master categories across the Factory of Fun!
        </p>
      </div>

      {/* Marisol Passport Guide */}
      <div className="max-w-xl mx-auto mb-8 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol expression="proud" size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-lg text-ink">Marisol's Stamp Book</h3>
          <p className="font-handwritten text-base text-ink-light">
            "Look at all these stamps! Play challenges in every category to stamp your passport."
          </p>
        </div>
      </div>

      {/* Stamp Collection Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PASSPORT_CATEGORIES.map(item => {
          const Icon = item.icon;
          const isStamped = player.questionsAnswered >= item.requiredQuestions;

          return (
            <div
              key={item.category}
              className={`
                relative bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg flex flex-col items-center text-center space-y-3 transition-all
                ${isStamped ? 'hover:-translate-y-1' : 'opacity-60 bg-paper-100'}
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
import { Sparkles, Volume2, VolumeX, Play, Pause, ArrowRight, Trophy } from 'lucide-react';
import heroBannerVideoSrc from '../assets/Hero Banner video.mp4';

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
    // Play celebratory sound fanfare
    audioEngine.playSfx('fanfare');

    // Confetti celebration shower
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

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative text-center overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Sparkles & Crown Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">👑</span>
            <div className="text-left">
              <h3 className="font-display font-black text-lg sm:text-xl text-ink leading-tight flex items-center gap-1.5">
                <span>{title}</span>
                <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
              </h3>
              <p className="font-handwritten text-xs text-pink-700 font-bold">
                {subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-bold bg-white hover:bg-paper-200 transition-colors shadow-xs shrink-0"
          >
            ✕
          </button>
        </div>

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

            <button
              type="button"
              onClick={handleReplay}
              className="text-xs font-handwritten font-bold text-pink-200 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              Watch Again 🔄
            </button>
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

        {/* PRIMARY CONTINUE ACTION */}
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

      </div>
    </div>
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

### File: `src/components/MoodSelectorModal.tsx`

```tsx
import React from 'react';
import { STICKERS, type StickerData } from '../data/stickers';
import { RECIPES_BY_MOOD } from '../data/recipes';
import { Sparkles, Utensils, X } from 'lucide-react';
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
    <div 
      className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl border-2 border-ink bg-coral-500 text-white flex items-center justify-center font-bold text-lg shadow-sketch">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl text-ink leading-tight">
                SELECT YOUR COOKING MOOD ♡
              </h2>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                Pick from Kritika's 11 mood stickers to flavor your trivia and unlock a matching recipe!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

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
    </div>
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
import { X, Sparkles, ExternalLink, SkipForward, SkipBack, Heart, Search, Pin, Plus, Copy, Check, Play } from 'lucide-react';

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

  // Live in-website YouTube search state
  interface LiveYtItem {
    videoId: string;
    title: string;
    channel: string;
    duration: string;
    thumbnail: string;
  }
  const [liveYtResults, setLiveYtResults] = useState<LiveYtItem[]>([]);
  const [isSearchingYt, setIsSearchingYt] = useState(false);
  const [ytSearchNotice, setYtSearchNotice] = useState<string | null>(null);

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

  // LIVE IN-WEBSITE YOUTUBE SEARCH
  const executeInWebsiteYouTubeSearch = async (queryText?: string) => {
    const q = (queryText !== undefined ? queryText : searchQuery).trim();
    if (!q) return;

    if (queryText !== undefined) {
      setSearchQuery(queryText);
    }

    setIsSearchingYt(true);
    setYtSearchNotice(`Searching YouTube for "${q}"...`);
    audioEngine.playSfx('click');

    try {
      const res = await fetch(`/api/youtube-search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setLiveYtResults(data.results);
        setYtSearchNotice(`Found ${data.results.length} live YouTube videos!`);
        audioEngine.playSfx('fanfare');
      } else {
        setLiveYtResults([]);
        setYtSearchNotice(`No results found directly on YouTube. Try another search!`);
      }
    } catch {
      // Local fallback
      const localMatches = allSongs.filter(s =>
        s.title.toLowerCase().includes(q.toLowerCase()) ||
        s.movie.toLowerCase().includes(q.toLowerCase()) ||
        s.singers.toLowerCase().includes(q.toLowerCase())
      );
      if (localMatches.length > 0) {
        setLiveYtResults(localMatches.map(s => ({
          videoId: s.youtubeId,
          title: `${s.title} (${s.movie})`,
          channel: s.singers,
          duration: 'HD',
          thumbnail: `https://img.youtube.com/vi/${s.youtubeId}/mqdefault.jpg`
        })));
        setYtSearchNotice(`Found ${localMatches.length} matching songs in library!`);
      } else {
        setLiveYtResults([]);
        setYtSearchNotice('Could not reach YouTube search. Try pasting link directly below!');
      }
    } finally {
      setIsSearchingYt(false);
    }
  };

  // Play a live YouTube item right inside the website
  const handlePlayLiveYtItem = (item: LiveYtItem) => {
    audioEngine.playSfx('click');
    audioEngine.stopMusic();

    const existing = allSongs.find(s => s.youtubeId === item.videoId);
    if (existing) {
      setSelectedSong(existing);
      setIsPlaying(true);
      return;
    }

    const cleanTitle = item.title
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    const newSong: HindiSong = {
      id: `yt_${item.videoId}`,
      title: cleanTitle.length > 45 ? cleanTitle.slice(0, 45) + '...' : cleanTitle,
      movie: item.channel || 'YouTube Song',
      singers: item.channel || 'YouTube Stream',
      year: new Date().getFullYear(),
      emoji: '🔴',
      accentColor: '#EF4444',
      youtubeId: item.videoId,
      vibe: 'YouTube Search Hit',
      lyricsHighlight: cleanTitle,
      movieQuote: '"Streaming directly from YouTube search!"',
      tags: ['YouTube Search', 'Stream']
    };

    setSelectedSong(newSong);
    setIsPlaying(true);
  };

  // Pin a live YouTube item to Kritika's favorites
  const handlePinLiveYtItem = (e: React.MouseEvent, item: LiveYtItem) => {
    e.stopPropagation();
    audioEngine.playSfx('fanfare');

    const cleanTitle = item.title
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    const created = wellnessState.addCustomSong({
      title: cleanTitle.length > 45 ? cleanTitle.slice(0, 45) + '...' : cleanTitle,
      movie: item.channel || 'YouTube Pick',
      singers: item.channel || 'YouTube Creator',
      year: new Date().getFullYear(),
      emoji: '🔴',
      accentColor: '#EF4444',
      youtubeId: item.videoId,
      vibe: 'Queen\'s YouTube Pick',
      lyricsHighlight: `Saved from YouTube search: "${cleanTitle}"`,
      movieQuote: '"Music on demand, saved by Queen Kritika!"',
      tags: ['YouTube Pick', 'Favorites']
    });

    wellnessState.togglePinSong(created.id);
    setSelectedSong(created);
    setIsPlaying(true);
  };

  // Instant Quick YouTube Link Paste & Play
  const handleQuickPlayYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickYtInput.trim()) return;

    const ytId = extractVideoId(quickYtInput);
    if (!ytId) return;

    audioEngine.playSfx('fanfare');
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
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with YouTube Connectivity Badge */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl border-2 border-ink bg-gradient-to-tr from-red-600 via-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-xl shadow-sketch">
              <YouTubeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-display font-black text-xl sm:text-2xl text-ink leading-tight">
                  KRITIKA'S YOUTUBE LOUNGE
                </h2>
                <span className="bg-red-500 text-white font-display text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  YOUTUBE LIVE
                </span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                Search & play any song on YouTube right on this website! 💖
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded YouTube Player */}
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
              <div className="flex items-center gap-2">
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

                <span>•</span>

                <button
                  onClick={() => executeInWebsiteYouTubeSearch(`${selectedSong.title} ${selectedSong.movie}`)}
                  className="hover:text-white flex items-center gap-1 text-white/80 transition-colors"
                >
                  <Search className="w-3 h-3 text-red-400" />
                  <span>Search similar on site</span>
                </button>
              </div>

              <span className="text-[10px] text-zinc-400 hidden sm:inline">
                ID: {selectedSong.youtubeId}
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

        {/* IN-WEBSITE YOUTUBE SEARCH BAR */}
        <div className="space-y-2">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              executeInWebsiteYouTubeSearch();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                type="text"
                placeholder="Search any song, artist, or movie on YouTube..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border-2 border-red-300 rounded-2xl font-display text-xs text-ink placeholder:text-ink-light focus:border-red-500 focus:outline-hidden shadow-2xs"
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

            {/* Direct In-Website YouTube Search Button */}
            <button
              type="submit"
              disabled={isSearchingYt}
              className="px-3.5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-50 text-white border-2 border-ink font-display font-black text-xs rounded-2xl flex items-center gap-1.5 shadow-sketch-xs shrink-0 transition-transform active:scale-95"
              title="Search directly on YouTube inside this website"
            >
              {isSearchingYt ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <YouTubeIcon className="w-4 h-4 text-white" />
                  <span>Search YouTube</span>
                </>
              )}
            </button>

            {/* Expand Detailed Add Modal */}
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-2.5 bg-pink-100 hover:bg-pink-200 text-pink-800 border-2 border-pink-300 font-display font-black text-xs rounded-2xl flex items-center gap-1 shadow-2xs shrink-0 transition-transform active:scale-95"
              title="Add Custom Song Details"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Custom</span>
            </button>
          </form>

          {/* Search Status Toast / Notice */}
          {ytSearchNotice && (
            <div className="flex items-center justify-between bg-red-50/90 border border-red-200 rounded-xl px-3 py-1.5 text-xs font-handwritten text-red-900 font-bold animate-fade-in">
              <span>{ytSearchNotice}</span>
              {liveYtResults.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setLiveYtResults([]);
                    setYtSearchNotice(null);
                  }}
                  className="text-[11px] text-red-600 hover:text-red-900 underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Quick YouTube Search Chips (Click to Search on Website) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
            <span className="text-[11px] text-ink-light uppercase tracking-wider font-display font-bold shrink-0">
              🔴 Quick Search:
            </span>
            {[
              'Kesariya',
              'Apna Bana Le',
              'Channa Mereya',
              'Heeriye',
              'Arijit Singh',
              'Tauba Tauba',
              'Lofi Hindi',
            ].map(ytQuery => (
              <button
                key={ytQuery}
                type="button"
                onClick={() => executeInWebsiteYouTubeSearch(ytQuery)}
                className="px-2.5 py-0.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 rounded-full shrink-0 flex items-center gap-1 transition-colors active:scale-95"
              >
                <YouTubeIcon className="w-2.5 h-2.5 text-red-600" />
                <span>{ytQuery}</span>
              </button>
            ))}
          </div>
        </div>

        {/* LIVE IN-WEBSITE YOUTUBE SEARCH RESULTS SHELF */}
        {liveYtResults.length > 0 && (
          <div className="space-y-2 bg-gradient-to-br from-red-50/80 via-white to-pink-50/80 border-2.5 border-red-400 rounded-3xl p-3.5 shadow-sketch animate-fade-in">
            <div className="flex items-center justify-between border-b border-red-200 pb-2">
              <div className="flex items-center gap-1.5">
                <YouTubeIcon className="w-4 h-4 text-red-600" />
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-red-950">
                  LIVE YOUTUBE SEARCH RESULTS ({liveYtResults.length})
                </h4>
              </div>
              <button
                onClick={() => {
                  setLiveYtResults([]);
                  setYtSearchNotice(null);
                }}
                className="text-[11px] font-display font-bold text-red-600 hover:text-red-900"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {liveYtResults.map((item) => {
                const isCurrent = selectedSong.youtubeId === item.videoId;
                const isPinned = pinnedIds.includes(item.videoId) || pinnedIds.includes(`yt_${item.videoId}`);
                return (
                  <div
                    key={item.videoId}
                    onClick={() => handlePlayLiveYtItem(item)}
                    className={`
                      p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 relative cursor-pointer group
                      ${
                        isCurrent
                          ? 'border-red-500 bg-red-50/80 shadow-sketch ring-2 ring-red-400'
                          : 'border-red-200 bg-white hover:border-red-400 hover:shadow-sketch-xs'
                      }
                    `}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-18 h-13 rounded-xl overflow-hidden border border-red-300 bg-slate-900 shrink-0 shadow-xs">
                      <img 
                        src={item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                          <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                        </div>
                      </div>
                      {item.duration && (
                        <span className="absolute bottom-0.5 right-1 bg-black/80 text-white font-mono text-[9px] px-1 rounded-sm">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-black text-xs text-ink line-clamp-2 leading-tight">
                        {item.title}
                      </div>
                      <div className="font-handwritten text-[11px] text-red-700 font-bold truncate mt-0.5">
                        {item.channel}
                      </div>
                    </div>

                    {/* Pin and external link */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handlePinLiveYtItem(e, item)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isPinned
                            ? 'bg-pink-500 text-white border-pink-400'
                            : 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100 hover:scale-110'
                        }`}
                        title={isPinned ? 'Pinned in Favorites!' : 'Pin to Favorites'}
                      >
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${item.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-red-500 hover:text-red-700 hover:scale-125 transition-transform"
                        title="Watch on YouTube.com"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* QUICK YOUTUBE LINK PASTE & PLAY BAR */}
        <form 
          onSubmit={handleQuickPlayYouTube}
          className="bg-red-50/90 border-2 border-red-200 rounded-2xl p-2.5 flex items-center gap-2 shadow-2xs"
        >
          <div className="w-7 h-7 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <YouTubeIcon className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            placeholder="Or paste any YouTube URL or Video ID to play & pin..."
            value={quickYtInput}
            onChange={(e) => setQuickYtInput(e.target.value)}
            className="flex-1 min-w-0 bg-white border border-red-200 rounded-xl px-2.5 py-1.5 font-display text-xs text-ink placeholder:text-ink-light focus:outline-hidden focus:border-red-500"
          />
          <button
            type="submit"
            disabled={!quickYtInput.trim()}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-display font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 transition-all active:scale-95"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Play</span>
          </button>
        </form>


        {/* Quick Mood Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
          <span className="text-[11px] text-ink-light uppercase tracking-wider font-display font-bold shrink-0">
            Mood Filter:
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

        {/* Detailed Add Song Form (Expandable) */}
        {showAddForm && (
          <form 
            onSubmit={handleAddSong}
            className="bg-pink-50/90 border-2 border-pink-300 rounded-2xl p-3.5 space-y-2.5 animate-fade-in shadow-sketch-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs text-pink-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>ADD CUSTOM YOUTUBE TRACK WITH DETAILS</span>
              </span>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="text-xs font-bold text-pink-600 hover:text-pink-900"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Song Title (e.g. Tum Se Hi)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
              <input
                type="text"
                placeholder="Movie / Album (e.g. Jab We Met)"
                value={newMovie}
                onChange={e => setNewMovie(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Singers (e.g. Mohit Chauhan)"
                value={newSingers}
                onChange={e => setNewSingers(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
              <input
                type="text"
                required
                placeholder="YouTube Link or Video ID (e.g. https://youtu.be/...)"
                value={newYoutubeUrl}
                onChange={e => setNewYoutubeUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white font-display font-black text-xs uppercase rounded-xl border border-ink shadow-xs hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <YouTubeIcon className="w-4 h-4 text-white" />
              <span>PIN & ADD TO MY PLAYLIST 💖</span>
            </button>
          </form>
        )}

        {/* PINNED FAVORITES SHELF WITH REAL YOUTUBE THUMBNAILS */}
        {pinnedSongsList.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-pink-900 flex items-center gap-1.5">
                <span>👑 QUEEN'S PINNED FAVORITES</span>
                <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-300">
                  {pinnedSongsList.length} Pinned
                </span>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pinnedSongsList.map((song) => {
                const isCurrent = song.id === selectedSong.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => handleSelectSong(song)}
                    className={`
                      p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 relative cursor-pointer group
                      ${
                        isCurrent
                          ? 'border-pink-500 bg-pink-50/70 shadow-sketch ring-2 ring-pink-400'
                          : 'border-pink-200 bg-white hover:border-pink-400 hover:shadow-sketch-xs'
                      }
                    `}
                  >
                    {/* Real YouTube Video Thumbnail */}
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-pink-300 bg-slate-900 shrink-0 shadow-xs">
                      <img 
                        src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`} 
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          // Fallback if image fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                          <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-display font-black text-xs text-ink truncate flex items-center gap-1">
                        <span>{song.title}</span>
                      </div>
                      <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                        {song.movie}
                      </div>
                      <div className="text-[10px] font-handwritten text-pink-700 truncate">
                        {song.singers}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handleTogglePin(e, song.id)}
                        className="p-1 text-pink-500 hover:scale-125 transition-transform"
                        title="Unpin"
                      >
                        <Pin className="w-4 h-4 fill-pink-500" />
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-red-500 hover:text-red-700 hover:scale-125 transition-transform"
                        title="Watch on YouTube.com"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ALL BOLLYWOOD SONGS WITH REAL YOUTUBE THUMBNAILS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
              <span>ALL BOLLYWOOD SONGS ({filteredSongs.length})</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            </h4>
            <span className="font-handwritten text-xs font-bold text-ink-light">
              Tap pin to save to favorites
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {otherSongsList.map((song) => {
              const isCurrent = song.id === selectedSong.id;
              return (
                <div
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`
                    p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 relative cursor-pointer group
                    ${
                      isCurrent
                        ? 'border-pink-500 bg-pink-50/70 shadow-sketch ring-2 ring-pink-400'
                        : 'border-pink-200/80 bg-white hover:border-pink-400 hover:shadow-sketch-xs'
                    }
                  `}
                >
                  {/* Real YouTube Video Thumbnail */}
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-pink-200 bg-slate-900 shrink-0 shadow-xs">
                    <img 
                      src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`} 
                      alt={song.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                        <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-black text-xs text-ink truncate">
                      {song.title}
                    </div>
                    <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      {song.movie}
                    </div>
                    <div className="text-[10px] font-handwritten text-pink-700 truncate">
                      {song.singers}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => handleTogglePin(e, song.id)}
                      className="p-1 text-ink-light hover:text-pink-500 hover:scale-125 transition-transform"
                      title="Pin to Favorites"
                    >
                      <Pin className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-red-500/70 hover:text-red-700 hover:scale-125 transition-transform"
                      title="Watch on YouTube.com"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with YouTube & Personal Comfort Note */}
        <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 border-1.5 border-pink-200 rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src="/marisol/avatars/11_music_mood.png" 
              alt="Kritika with headphones" 
              className="w-10 h-10 rounded-full border-2 border-ink bg-white shrink-0"
            />
            <div className="font-handwritten text-xs text-pink-900 font-bold leading-relaxed truncate">
              "Every song here is connected to YouTube for seamless listening!" ♡
            </div>
          </div>
          <button
            onClick={() => executeInWebsiteYouTubeSearch()}
            className="text-[11px] font-display font-black text-red-600 hover:text-red-800 underline shrink-0 flex items-center gap-1"
          >
            <YouTubeIcon className="w-3.5 h-3.5 text-red-600" />
            <span>Search YouTube</span>
          </button>
        </div>

      </div>
    </div>
  );
};


```

---

### File: `src/components/Navbar.tsx`

```tsx
import React, { useState } from 'react';
import type { ScreenState, AudioSettings } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Flame, Volume2, VolumeX, BookOpen, Lock } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onOpenInstallApp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onOpenInstallApp }) => {
  const player = gameState.getPlayer();
  const [audioState, setAudioState] = useState<AudioSettings>(audioEngine.getSettings());
  const [showAudioModal, setShowAudioModal] = useState(false);

  const toggleMusic = () => {
    const next = !audioState.musicOn;
    audioEngine.updateSettings({ musicOn: next });
    setAudioState(audioEngine.getSettings());
    if (next) {
      audioEngine.startMusic('menu');
    }
  };

  const toggleSfx = () => {
    const next = !audioState.sfxOn;
    audioEngine.updateSettings({ sfxOn: next });
    setAudioState(audioEngine.getSettings());
    if (next) {
      audioEngine.playSfx('click');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b-2.5 border-ink px-4 py-2.5 shadow-paper">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Title */}
        <button 
          onClick={() => {
            audioEngine.playSfx('click');
            onNavigate('home');
          }}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-9 h-9 rounded-full border-2 border-ink bg-coral-500 overflow-hidden shadow-sketch flex items-center justify-center">
            <span className="font-handwritten text-white text-lg font-bold">M</span>
          </div>
          <div>
            <h1 className="font-display font-black text-lg sm:text-xl tracking-tight leading-none text-ink group-hover:text-plum-700 transition-colors">
              MARISOL
            </h1>
            <p className="font-handwritten text-xs text-ink-light font-bold -mt-0.5">
              FACTORY OF FUN
            </p>
          </div>
        </button>

        {/* Stats Pill (Chef Title, Sandwiches, Streak) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Chef Title Badge */}
          <div className="flex items-center gap-1.5 bg-white border-2 border-ink px-2.5 py-1 rounded-xl shadow-sketch text-xs font-bold text-plum-700">
            <span className="truncate max-w-[130px] sm:max-w-none">
              {player.chefTitle || 'Apprentice Chopper 🥒'}
            </span>
          </div>

          {/* Cucumber Sandwiches Currency / Score */}
          <div 
            className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border-2 border-ink px-2.5 sm:px-3 py-1 rounded-xl shadow-sketch text-xs sm:text-sm font-black"
            title={`${player.cucumberSandwiches || 0} Cucumber Sandwiches`}
          >
            <span>🥪</span>
            <span>{player.cucumberSandwiches || 0}</span>
            <span className="hidden sm:inline font-handwritten text-xs font-bold text-emerald-700">Sandwiches</span>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1 bg-coral-500 text-white border-2 border-ink px-2.5 py-1 rounded-xl shadow-sketch text-xs sm:text-sm font-bold">
            <Flame className="w-4 h-4 fill-white animate-bounce-gentle" />
            <span>{player.streak}</span>
          </div>

          {/* Navigation Dropdown / Buttons */}
          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('recipes');
              }}
              title="Kritika's Recipe Vault"
              className={`p-2 rounded-xl border-2 border-ink shadow-sketch transition-all flex items-center gap-1 ${
                currentScreen === 'recipes' ? 'bg-emerald-600 text-white' : 'bg-white text-ink hover:bg-paper-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span className="font-handwritten text-xs font-black hidden lg:inline">RECIPES</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('stickers');
              }}
              title="Kritika's 11 Mood Stickers"
              className={`p-2 rounded-xl border-2 border-ink shadow-sketch transition-all flex items-center gap-1 ${
                currentScreen === 'stickers' ? 'bg-coral-500 text-white' : 'bg-white text-ink hover:bg-paper-100'
              }`}
            >
              <span className="text-xs">✨</span>
              <span className="font-handwritten text-xs font-black hidden md:inline">11 MOODS</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('secret_classroom');
              }}
              title="Secret Classroom (Teacher Tribute)"
              className="p-2 rounded-xl border-2 border-ink bg-purple-600 text-white shadow-sketch hover:bg-purple-700 transition-all"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setShowAudioModal(!showAudioModal);
              }}
              className="p-2 rounded-xl border-2 border-ink bg-white text-ink shadow-sketch hover:bg-paper-100 transition-all"
              title="Audio Settings"
            >
              {audioState.musicOn || audioState.sfxOn ? (
                <Volume2 className="w-4 h-4 text-plum-700" />
              ) : (
                <VolumeX className="w-4 h-4 text-coral-500" />
              )}
            </button>

            {/* Install / Download App Button */}
            {onOpenInstallApp && (
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenInstallApp();
                }}
                className="px-2.5 py-1.5 rounded-xl border-2 border-ink bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-sketch hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-display font-black"
                title="Download Marisol App on Android & iOS"
              >
                <span>📲</span>
                <span className="hidden sm:inline">INSTALL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Audio Settings Dropdown Modal */}
      {showAudioModal && (
        <div className="absolute right-4 top-16 z-50 w-64 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg animate-wiggle">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display font-bold text-ink">80s Synth Sound System</h3>
            <button 
              onClick={() => setShowAudioModal(false)}
              className="font-handwritten text-lg font-bold text-ink-light hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 font-sans text-sm">
            <div className="flex items-center justify-between bg-paper-50 p-2.5 rounded-xl border-1.5 border-ink">
              <span className="font-semibold text-ink">80s Synth Music</span>
              <button 
                onClick={toggleMusic}
                className={`px-3 py-1 rounded-lg border-2 border-ink font-bold text-xs shadow-sketch ${
                  audioState.musicOn ? 'bg-doodleTeal text-white' : 'bg-paper-200 text-ink-light'
                }`}
              >
                {audioState.musicOn ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between bg-paper-50 p-2.5 rounded-xl border-1.5 border-ink">
              <span className="font-semibold text-ink">Sound Effects</span>
              <button 
                onClick={toggleSfx}
                className={`px-3 py-1 rounded-lg border-2 border-ink font-bold text-xs shadow-sketch ${
                  audioState.sfxOn ? 'bg-doodleTeal text-white' : 'bg-paper-200 text-ink-light'
                }`}
              >
                {audioState.sfxOn ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
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
import { Flame, Award, Zap, HelpCircle, BookOpen, User, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlayerProfileCard: React.FC = () => {
  const [player, setPlayer] = useState(gameState.getPlayer());
  const [activeSticker, setActiveSticker] = useState<string>(gameState.getActiveSticker());
  const achievements = gameState.getAchievements();
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  const handleSelectSticker = (alias: string) => {
    gameState.setActiveSticker(alias);
    setActiveSticker(alias);
    setPlayer(gameState.getPlayer());
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const currentStickerObj = STICKERS.find(s => s.alias === activeSticker) || STICKERS[0];

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Main Illustrated Player Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-6 relative overflow-hidden">
          
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
                <p className="font-handwritten text-sm text-ink-light font-bold">
                  Curious Mind • Member since 2026
                </p>
              </div>
            </div>

            <div className="bg-doodleGold text-ink border-2 border-ink px-3 py-1 rounded-xl shadow-sketch font-display font-bold text-sm">
              LEVEL {player.level}
            </div>
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

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-[#FAF7F0] p-2.5 rounded-2xl border-2 border-ink">
              {STICKERS.map(s => {
                const isSelected = s.alias === activeSticker;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSticker(s.alias)}
                    title={s.quote}
                    className={`
                      relative rounded-xl border-2 transition-all p-1 flex flex-col items-center
                      ${isSelected 
                        ? 'border-ink bg-doodleGold shadow-sketch scale-105 z-10' 
                        : 'border-ink/30 bg-white hover:border-ink hover:scale-102'
                      }
                    `}
                  >
                    <img
                      src={s.avatarUrl}
                      alt={s.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-[10px] font-handwritten font-bold truncate max-w-[50px] mt-0.5">
                      {s.badgeEmoji}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 bg-ink text-white rounded-full p-0.5 border border-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 font-sans">
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

          {/* Achievements Section */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
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
    <div className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-2xl w-full my-6 p-4 sm:p-6 shadow-sketch-2xl space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
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
    </div>
  );
};

```

---

### File: `src/components/RecipeVault.tsx`

```tsx
import React, { useState } from 'react';
import type { ScreenState, Recipe } from '../types/game';
import { RECIPES } from '../data/recipes';
import { gameState } from '../services/gameState';
import { ArrowLeft, ChefHat, Film, Clock, Lock, Sparkles } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface RecipeVaultProps {
  onNavigate: (screen: ScreenState) => void;
  onCookRecipe: (recipe: Recipe) => void;
}

export const RecipeVault: React.FC<RecipeVaultProps> = ({ onNavigate, onCookRecipe }) => {
  const player = gameState.getPlayer();
  const unlockedIds = gameState.getUnlockedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-4 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="sketch-btn p-3 bg-white flex items-center gap-2 shadow-sketch"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display font-bold text-sm hidden sm:inline">HOME</span>
          </button>

          <div className="text-center">
            <div className="font-handwritten text-emerald-600 font-bold text-sm flex items-center justify-center gap-1">
              <ChefHat className="w-4 h-4" /> KRITIKA'S CULINARY ARCHIVE
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight">
              THE SECRET RECIPE VAULT 📖
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-3 py-1.5 rounded-full font-handwritten text-sm font-bold shadow-sketch">
            <span className="text-emerald-600">{unlockedIds.length}</span> / {RECIPES.length} DISHES
          </div>
        </div>

        {/* Chef Status Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2.5 border-ink bg-doodleGold flex items-center justify-center text-3xl shadow-sketch">
              🥪
            </div>
            <div>
              <div className="font-handwritten text-xs font-bold text-ink-light uppercase tracking-wider">
                ACTIVE CHEF TITLE
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-plum-700">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </h2>
              <p className="font-sans text-xs text-ink-light">
                Total Score: <span className="font-bold text-emerald-600">{player.cucumberSandwiches || 0} Cucumber Sandwiches</span> 🥪
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <button
              onClick={() => onCookRecipe(RECIPES[0])}
              className="sketch-btn-primary px-4 py-2.5 text-xs sm:text-sm font-bold uppercase flex items-center gap-2 shadow-sketch"
            >
              <Sparkles className="w-4 h-4" />
              <span>PLAY FOR NEXT RECIPE</span>
            </button>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {RECIPES.map((recipe) => {
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
                  bg-white border-2.5 border-ink rounded-3xl p-5 shadow-sketch-lg transition-all
                  ${isUnlocked ? 'hover:shadow-sketch-xl hover:-translate-y-1 cursor-pointer' : 'opacity-70 bg-paper-100'}
                `}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl border-2 border-ink flex items-center justify-center text-2xl bg-[#FAF7F0] shadow-sm shrink-0">
                    {isUnlocked ? recipe.emoji : <Lock className="w-5 h-5 text-ink-light" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-handwritten text-xs font-bold text-coral-600 uppercase tracking-wide block">
                      {recipe.cuisine}
                    </span>
                    <h3 className="font-display font-black text-lg text-ink leading-tight">
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
                      <span className="flex items-center gap-1 font-bold text-plum-700">
                        <Film className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">{recipe.moviePairing.movie}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecipe(recipe);
                      }}
                      className="w-full py-2 bg-paper-100 hover:bg-paper-200 border-1.5 border-ink rounded-xl font-display font-bold text-xs uppercase text-center"
                    >
                      VIEW RECIPE & STEPS
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t-1.5 border-dashed border-ink/20 flex items-center justify-between">
                    <span className="font-handwritten text-xs text-ink-light">
                      🔒 Answer 5 food questions to unlock
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCookRecipe(recipe);
                      }}
                      className="text-xs font-bold text-coral-500 font-display hover:underline"
                    >
                      Cook Now →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal: Full Recipe Details */}
        {selectedRecipe && (
          <div
            className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedRecipe(null)}
          >
            <div
              className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-xl w-full my-6 p-5 sm:p-6 shadow-sketch-2xl space-y-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
                <div>
                  <span className="font-handwritten text-xs text-coral-500 font-bold uppercase">
                    {selectedRecipe.cuisine} • {selectedRecipe.prepTime}
                  </span>
                  <h3 className="font-display font-black text-xl text-ink">
                    {selectedRecipe.emoji} {selectedRecipe.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200"
                >
                  ✕
                </button>
              </div>

              {/* Movie Pairing Note */}
              <div className="bg-purple-50 border-1.5 border-purple-300 rounded-2xl p-3 text-xs space-y-1">
                <span className="font-display font-bold text-purple-900 flex items-center gap-1.5">
                  <Film className="w-4 h-4" /> Watch: {selectedRecipe.moviePairing.movie}
                </span>
                <p className="font-handwritten text-ink italic">
                  {selectedRecipe.moviePairing.quote}
                </p>
              </div>

              {/* Ingredients */}
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xs uppercase text-ink">
                  Ingredients:
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
                  Method:
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
                  className="sketch-btn-primary w-full py-3 text-xs font-bold uppercase"
                >
                  Close Cookbook
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

```

---

### File: `src/components/SecretClassroom.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import confetti from 'canvas-confetti';
import { Sparkles, Star, ArrowRight } from 'lucide-react';

interface SecretClassroomProps {
  onBackToHome: () => void;
}

export const SecretClassroom: React.FC<SecretClassroomProps> = ({ onBackToHome }) => {
  const teacher = gameState.getTeacherProfile();
  const [slide, setSlide] = useState<number>(1);

  useEffect(() => {
    // Start warm emotional synth music
    audioEngine.startMusic('final');

    const timer = setTimeout(() => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNextSlide = () => {
    audioEngine.playSfx('click');
    if (slide < 3) {
      setSlide(prev => prev + 1);
    } else {
      onBackToHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center p-4 sm:p-6 text-ink relative overflow-hidden">
      
      {/* Background Chalkboard & Doodle Accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="w-full h-full border-12 border-ink/20 rounded-3xl m-4" />
      </div>

      <div className="max-w-2xl w-full z-10 space-y-6 text-center animate-fade-in">
        
        {slide === 1 && (
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
              onClick={handleNextSlide}
              className="sketch-btn-primary w-full py-4 text-xl font-black uppercase shadow-sketch-lg hover:scale-105 transition-all mt-4"
            >
              ENTER THE SECRET CLASSROOM ❤️
            </button>
          </div>
        )}

        {slide === 2 && (
          <div className="bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6 text-left">
            <div className="text-center">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-plum-700">
                CLASSROOM MEMORIES 📸
              </h1>
              <p className="font-handwritten text-xl text-coral-500 font-bold">
                Dedicated to {teacher.teacherName}
              </p>
            </div>

            {/* Classmate Quotes & Memories Cards */}
            <div className="space-y-3 font-handwritten text-lg text-ink">
              {teacher.classroomMemories.map((mem, idx) => (
                <div key={idx} className="bg-paper-50 p-4 rounded-2xl border-2 border-ink shadow-sketch flex items-start gap-3">
                  <Star className="w-5 h-5 text-doodleGold flex-shrink-0 mt-0.5" />
                  <span>"{mem}"</span>
                </div>
              ))}
            </div>

            {/* Teacher Quotes */}
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
              onClick={handleNextSlide}
              className="sketch-btn-gold w-full py-3.5 text-lg font-black uppercase shadow-sketch flex items-center justify-center gap-2"
            >
              <span>THE FINAL MESSAGE</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {slide === 3 && (
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
              <p className="font-handwritten text-2xl font-bold text-doodleTeal">
                Made with love by your class. ✨
              </p>
            </div>

            <button
              onClick={onBackToHome}
              className="sketch-btn-primary px-8 py-3.5 text-lg font-black uppercase shadow-sketch hover:scale-105 transition-all"
            >
              RETURN TO MAIN MENU 🏠
            </button>
          </div>
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
import { Lock, Unlock, Heart, Plus, Trash2, X, Sparkles, Mic, Square, Play, Pause } from 'lucide-react';

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
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-ink leading-tight flex items-center gap-1.5">
                <span>SECRET HEART LOCKET</span>
                <span>🔐</span>
              </h2>
              <p className="font-handwritten text-xs text-ink-light font-bold">
                Private notes, affirmations & voice memos for Kritika ♡
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

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
    </div>
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
import { Sparkles, Star, Flame } from 'lucide-react';

export const SparkleStreak: React.FC = () => {
  const [, setTick] = useState(0);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const { streak, trail } = wellnessState.getSparkleStreak();

  const handleSparkleCheckIn = () => {
    audioEngine.playSfx('fanfare');
    wellnessState.addSparkleStreak();
    setJustCheckedIn(true);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F59E0B', '#F43F5E', '#A855F7']
    });
    setTimeout(() => setJustCheckedIn(false), 2000);
  };

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-gradient-to-r from-amber-50/90 via-pink-50/80 to-purple-50/90 border-2.5 border-amber-300/80 rounded-3xl p-4 shadow-sketch text-left space-y-3 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-white flex items-center justify-center shadow-xs">
            <Flame className="w-4 h-4 fill-white animate-bounce-gentle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-black text-xs sm:text-sm text-ink uppercase tracking-wider">
                SPARKLE STREAK ✨
              </h3>
              <span className="bg-amber-100 text-amber-800 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                {streak} Days Glowing
              </span>
            </div>
            <p className="font-handwritten text-[11px] text-ink-light font-bold">
              Consecutive days of taking time for yourself, queen!
            </p>
          </div>
        </div>

        <button
          onClick={handleSparkleCheckIn}
          disabled={justCheckedIn}
          className={`
            px-2.5 py-1 rounded-xl font-display font-black text-[11px] uppercase border shadow-2xs transition-all flex items-center gap-1
            ${
              justCheckedIn
                ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300 hover:scale-105 active:scale-95'
            }
          `}
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{justCheckedIn ? 'Glow Added!' : 'Add Sparkle ✨'}</span>
        </button>
      </div>

      {/* Constellation Trail Visual */}
      <div className="flex items-center justify-between pt-1 relative">
        {/* Connecting Ribbon Line */}
        <div className="absolute top-1/2 left-3 right-3 h-1 bg-amber-200/70 -translate-y-1/2 z-0 rounded-full" />

        {trail.map((active, idx) => (
          <div key={idx} className="flex flex-col items-center relative z-10 gap-1">
            <div 
              className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-2xs
                ${
                  active
                    ? 'bg-amber-400 border-amber-600 text-white scale-110 ring-2 ring-amber-300'
                    : 'bg-white border-amber-200 text-amber-300 scale-95'
                }
              `}
            >
              <Star className={`w-3.5 h-3.5 ${active ? 'fill-white animate-pulse' : ''}`} />
            </div>
            <span className="font-handwritten text-[10px] text-ink-light font-bold">
              {dayLabels[idx]}
            </span>
          </div>
        ))}
      </div>

      {/* Encouragement Footer */}
      <div className="text-center font-handwritten text-xs text-amber-900 font-bold bg-white/60 py-1 px-3 rounded-full border border-amber-200/50">
        "Consistency is a love letter to your future self." 🎀 Keep shining!
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

interface StickerCollectionProps {
  onNavigate: (screen: ScreenState) => void;
  onSelectMood?: (stickerAlias: string) => void;
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

export const StickerCollection: React.FC<StickerCollectionProps> = ({ onNavigate, onSelectMood }) => {
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
    <div className="min-h-screen bg-[#FAF7F0] p-4 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="sketch-btn p-3 bg-white flex items-center gap-2 shadow-sketch"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display font-bold text-sm hidden sm:inline">BACK HOME</span>
          </button>

          <div className="text-center">
            <div className="font-handwritten text-coral-500 font-bold text-sm sm:text-base flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" /> 11 HAND-DRAWN MOOD STICKERS
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight">
              KRITIKA'S STICKER VAULT ♡
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-3 py-1.5 rounded-full font-handwritten text-sm font-bold shadow-sketch">
            <span className="text-coral-500">11</span> / 11 COLLECTED
          </div>
        </div>

        {/* Active Companion Banner */}
        {(() => {
          const active = STICKERS.find(s => s.alias === activeSticker) || STICKERS[0];
          const role = STICKER_GAME_ROLES[active.alias];
          return (
            <div className="bg-white border-3 border-ink rounded-3xl p-4 sm:p-6 shadow-sketch-xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-5">
              {/* Tape Accent */}
              <div className="absolute -top-3 left-10 w-24 h-6 bg-doodleGold/40 border border-ink/40 -rotate-3 z-10" />

              {/* Active Sticker Visual */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-2.5 border-ink bg-[#FAF7F0] overflow-hidden shadow-sketch p-1 flex items-center justify-center">
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

        {/* The 11 Stickers Grid */}
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
                        className="w-full h-auto object-contain rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {viewMode === 'cards' && (
                    <div className="w-full max-w-[220px] bg-white border-2 border-ink rounded-2xl p-2 shadow-sketch text-center group-hover:rotate-1 transition-transform">
                      <div className="w-full rounded-xl overflow-hidden border border-ink bg-[#FAF7F0] mb-2">
                        <img
                          src={sticker.stickerUrl}
                          alt={sticker.title}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="font-handwritten text-xs font-bold text-ink block truncate">
                        {sticker.quote}
                      </span>
                    </div>
                  )}

                  {viewMode === 'avatars' && (
                    <div className="w-36 h-36 rounded-full border-3 border-ink overflow-hidden shadow-sketch-lg bg-[#FAF7F0] group-hover:scale-105 transition-transform">
                      <img
                        src={sticker.avatarUrl}
                        alt={sticker.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Sticker Details & Quote */}
                <div className="space-y-3 pt-2">
                  <div className="text-center">
                    <h3 className="font-display font-black text-base text-ink leading-snug">
                      {sticker.quote}
                    </h3>
                    <div className="font-handwritten text-xs text-coral-600 font-bold mt-1">
                      {role?.zone}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => handleEquip(sticker, e)}
                      className={`
                        w-full py-2.5 px-3 rounded-xl font-display font-bold text-xs uppercase
                        border-2 border-ink flex items-center justify-center gap-1.5 transition-all
                        ${
                          isEquipped
                            ? 'bg-doodleGold text-ink shadow-inner font-black'
                            : 'bg-paper-100 hover:bg-ink hover:text-white shadow-sketch-sm'
                        }
                      `}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>EQUIPPED</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>EQUIP MOOD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Full Sticker Inspection */}
        {selectedModalSticker && (
          <div 
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedModalSticker(null)}
          >
            <div 
              className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-md w-full p-6 shadow-sketch-2xl space-y-4 relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedModalSticker.badgeEmoji}</span>
                  <div>
                    <h3 className="font-display font-black text-lg">
                      STICKER #{selectedModalSticker.index}
                    </h3>
                    <span className="font-handwritten text-xs text-ink-light">
                      {selectedModalSticker.vibe}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModalSticker(null)}
                  className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200"
                >
                  ✕
                </button>
              </div>

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
              <div className="flex gap-2">
                <button
                  onClick={() => handleEquip(selectedModalSticker)}
                  className="sketch-btn-primary flex-1 py-3 text-sm font-black uppercase flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>EQUIP AS COMPANION</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

```

---

### File: `src/components/TeacherMode.tsx`

```tsx
import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import type { TeacherProfile } from '../types/game';
import { Marisol } from './Marisol';
import { Save } from 'lucide-react';

interface TeacherModeProps {
  onSave: () => void;
}

export const TeacherMode: React.FC<TeacherModeProps> = ({ onSave }) => {
  const current = gameState.getTeacherProfile();
  const [form, setForm] = useState<TeacherProfile>({ ...current });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSfx('fanfare');
    gameState.saveTeacherProfile(form);
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onSave();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-coral-500">
          ❤️ CLASS GIFT CUSTOMIZER
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700">
          TEACHER'S CHALLENGE SETUP
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Personalize Marisol's Factory of Fun with your teacher's favorite movies, phrases, and class memories!
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6">
        
        <div className="flex items-center gap-4 bg-paper-50 p-4 rounded-2xl border-2 border-ink">
          <Marisol expression="chai" size="small" showSpeechBubble={false} />
          <div className="font-handwritten text-base text-ink font-semibold">
            "Enter your teacher's favorite things below! I'll sprinkle them directly into the trivia and secret classroom reveal!"
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          
          <div>
            <label className="block text-sm font-bold text-ink mb-1">Teacher's Name</label>
            <input
              type="text"
              value={form.teacherName}
              onChange={e => setForm({ ...form, teacherName: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Subject / Department</label>
            <input
              type="text"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Favorite Movies / Cinema</label>
            <input
              type="text"
              value={form.favoriteMovies}
              onChange={e => setForm({ ...form, favoriteMovies: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Favorite TV Shows</label>
            <input
              type="text"
              value={form.favoriteShows}
              onChange={e => setForm({ ...form, favoriteShows: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-display text-base bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-1">Personal Thank You Note from the Class</label>
            <textarea
              rows={3}
              value={form.customMessage}
              onChange={e => setForm({ ...form, customMessage: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-ink font-handwritten text-lg bg-paper-50 focus:outline-none focus:ring-2 focus:ring-coral-400"
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
            <div className="text-center font-handwritten text-lg font-bold text-doodleTeal animate-bounce-gentle">
              ✨ Saved! Marisol is ready with your personalized teacher tribute!
            </div>
          )}
        </form>
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
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
  public selectQuestions(category: Category, count: number = 5, playedIds: string[] = []): Question[] {
    let available = QUESTIONS_DATABASE.filter(q => !playedIds.includes(q.id));

    // If category specific, filter by category
    const categoryQuestions = available.filter(q => q.category === category);
    if (categoryQuestions.length >= count) {
      available = categoryQuestions;
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

### File: `src/services/synthAudioEngine.ts`

```ts
// 80s Synth & Sound Effects Audio Engine powered by Web Audio API
import type { AudioSettings } from '../types/game';

export interface MusicTrack {
  id: string;
  title: string;
  emoji: string;
  genre: string;
  tagline: string;
  vibe: string;
  color: string;
  tempoMs: number;
  pattern: number[];
  oscType: OscillatorType;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'girl_power',
    title: 'Girl Power Anthem ♡',
    emoji: '👑',
    genre: 'Upbeat Disco Synth',
    tagline: 'Boss-girl sparkle for running the world and conquering your day!',
    vibe: 'Empowered & Sparkling',
    color: '#EC4899',
    tempoMs: 200,
    pattern: [523.25, 659.25, 783.99, 1046.50, 880.00, 783.99, 659.25, 880.00, 1046.50, 1174.66, 1046.50, 880.00],
    oscType: 'triangle'
  },
  {
    id: 'cozy_chai',
    title: 'Tapri Chai & Rainy Day Lo-Fi',
    emoji: '☕',
    genre: 'Soulful Monsoon Lo-Fi',
    tagline: 'Warm ginger-cardamom comfort while raindrops hit the windowpane.',
    vibe: 'Warm, Cozy & Mindful',
    color: '#F97316',
    tempoMs: 320,
    pattern: [220.00, 277.18, 329.63, 415.30, 440.00, 329.63, 277.18, 220.00, 196.00, 246.94, 293.66, 369.99],
    oscType: 'sine'
  },
  {
    id: 'bollywood',
    title: 'Bollywood Thumka Beats',
    emoji: '💃',
    genre: 'Desi Celebratory Pop',
    tagline: 'Infectious upbeat rhythm to snap your fingers and dance away tension!',
    vibe: 'Bubbly, Joyous & Sassy',
    color: '#EAB308',
    tempoMs: 190,
    pattern: [293.66, 329.63, 369.99, 440.00, 493.88, 440.00, 369.99, 329.63, 293.66, 220.00, 293.66, 369.99],
    oscType: 'triangle'
  },
  {
    id: 'retro_synth',
    title: '80s Neon Sunset Drive',
    emoji: '🌆',
    genre: 'Retro Synthwave',
    tagline: 'Cruising down neon highways with cool confidence and zero drama.',
    vibe: 'Dreamy, Nostalgic & Cool',
    color: '#8B5CF6',
    tempoMs: 220,
    pattern: [164.81, 196.00, 246.94, 329.63, 293.66, 246.94, 196.00, 146.83, 164.81, 220.00, 261.63, 329.63],
    oscType: 'sawtooth'
  },
  {
    id: 'zen_chill',
    title: 'Zen Mind Spa & Calm',
    emoji: '🧘',
    genre: 'Ambient Mindful Chimes',
    tagline: 'Soft chimes and deep breath tempo to gently dissolve overthinking.',
    vibe: 'Peaceful, Serene & Grounded',
    color: '#10B981',
    tempoMs: 380,
    pattern: [392.00, 440.00, 523.25, 659.25, 523.25, 440.00, 329.63, 392.00],
    oscType: 'sine'
  },
  {
    id: 'rage_buster',
    title: 'Hangry Rage Popper & Vent Beat',
    emoji: '💥',
    genre: 'High-Octane Mood Lifter',
    tagline: 'Fast punchy groove to channel anger into unstoppable superstar energy!',
    vibe: 'Punchy, Fiery & Cathartic',
    color: '#EF4444',
    tempoMs: 160,
    pattern: [130.81, 164.81, 196.00, 261.63, 196.00, 164.81, 220.00, 261.63, 329.63, 261.63, 220.00, 174.61],
    oscType: 'sawtooth'
  }
];

class SynthAudioEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private isPlayingMusic = false;
  private currentMusicState: string = 'none';
  private currentTrackId: string = 'girl_power';
  private musicInterval: any = null;
  private listeners: Set<() => void> = new Set();
  
  private settings: AudioSettings = {
    musicOn: false,
    sfxOn: true,
    musicVolume: 0.5,
    sfxVolume: 0.7,
  };

  constructor() {
    // AudioContext will be initialized on first user interaction
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

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.settings.musicOn ? this.settings.musicVolume * 0.4 : 0;
      this.musicGain.connect(this.masterGain);

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
    if (this.musicGain) {
      this.musicGain.gain.value = this.settings.musicOn ? this.settings.musicVolume * 0.4 : 0;
    }
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.settings.sfxOn ? this.settings.sfxVolume : 0;
    }
    if (!this.settings.musicOn && this.isPlayingMusic) {
      this.stopMusic();
    }
    this.notify();
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public getTracks(): MusicTrack[] {
    return MUSIC_TRACKS;
  }

  public getCurrentTrack(): MusicTrack {
    return MUSIC_TRACKS.find(t => t.id === this.currentTrackId) || MUSIC_TRACKS[0];
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public getCurrentMusicState(): string {
    return this.currentMusicState;
  }

  // Play retro synth sound effects
  public playSfx(type: 'click' | 'correct' | 'wrong' | 'streak' | 'levelup' | 'fanfare' | 'powerup' | 'boss' | 'pop') {
    if (!this.settings.sfxOn) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'pop': {
        // Satisfying bubble bubble pop sound for stress reliever
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 300, now);
        osc.frequency.exponentialRampToValueAtTime(1200 + Math.random() * 200, now + 0.06);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case 'correct': {
        // Bright 80s synth chime arpeggio (C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const startTime = now + idx * 0.07;
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.4, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + 0.25);
        });
        break;
      }

      case 'wrong': {
        // Soft retro comedic blip (E3 -> Bb2)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(164.81, now);
        osc.frequency.linearRampToValueAtTime(116.54, now + 0.2);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }

      case 'streak': {
        // Rising synth sequence
        const freqs = [440, 554.37, 659.25, 880, 1108.73];
        freqs.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          const startTime = now + i * 0.06;
          osc.frequency.setValueAtTime(f, startTime);

          gain.gain.setValueAtTime(0.25, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + 0.15);
        });
        break;
      }

      case 'levelup':
      case 'fanfare': {
        // Energetic 80s victory fanfare
        const notes = [
          { f: 523.25, d: 0.1, t: 0 },
          { f: 659.25, d: 0.1, t: 0.1 },
          { f: 783.99, d: 0.1, t: 0.2 },
          { f: 1046.50, d: 0.3, t: 0.3 },
          { f: 880.00, d: 0.15, t: 0.5 },
          { f: 1046.50, d: 0.5, t: 0.65 }
        ];

        notes.forEach(n => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          const startTime = now + n.t;
          osc.frequency.setValueAtTime(n.f, startTime);

          gain.gain.setValueAtTime(0.3, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.d);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(startTime);
          osc.stop(startTime + n.d);
        });
        break;
      }

      case 'powerup': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }
    }
  }

  // Play a specific curated track
  public playTrack(trackId: string) {
    const track = MUSIC_TRACKS.find(t => t.id === trackId) || MUSIC_TRACKS[0];
    this.currentTrackId = track.id;

    if (!this.settings.musicOn) {
      this.updateSettings({ musicOn: true });
    }

    this.initCtx();
    this.stopMusicIntervalOnly();

    this.isPlayingMusic = true;
    this.currentMusicState = track.id;

    let noteIdx = 0;
    const tempoMs = track.tempoMs;

    this.musicInterval = setInterval(() => {
      if (!this.isPlayingMusic || !this.ctx || !this.musicGain || !this.settings.musicOn) return;

      const freq = track.pattern[noteIdx % track.pattern.length];
      noteIdx++;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = track.oscType;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (tempoMs / 1000) * 0.95);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + (tempoMs / 1000) * 0.95);
    }, tempoMs);

    this.notify();
  }

  public togglePlayPause() {
    if (this.isPlayingMusic) {
      this.stopMusic();
    } else {
      this.playTrack(this.currentTrackId);
    }
  }

  public nextTrack() {
    const currentIdx = MUSIC_TRACKS.findIndex(t => t.id === this.currentTrackId);
    const nextIdx = (currentIdx + 1) % MUSIC_TRACKS.length;
    this.playTrack(MUSIC_TRACKS[nextIdx].id);
  }

  public prevTrack() {
    const currentIdx = MUSIC_TRACKS.findIndex(t => t.id === this.currentTrackId);
    const prevIdx = (currentIdx - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    this.playTrack(MUSIC_TRACKS[prevIdx].id);
  }

  // 80s Synth Background Loop Engine (Legacy / Screen-state integration)
  public startMusic(state: 'menu' | 'map' | 'quiz' | 'boss' | 'final' | string = 'menu') {
    // Map screen state to appropriate track
    if (state === 'quiz') {
      this.playTrack('girl_power');
    } else if (state === 'map') {
      this.playTrack('retro_synth');
    } else if (state === 'final') {
      this.playTrack('cozy_chai');
    } else {
      // Menu / default
      if (!this.isPlayingMusic) {
        this.playTrack(this.currentTrackId || 'girl_power');
      }
    }
  }

  private stopMusicIntervalOnly() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    this.currentMusicState = 'none';
    this.stopMusicIntervalOnly();
    this.notify();
  }
}

export const audioEngine = new SynthAudioEngine();

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
  private streakDays: number = 3;

  constructor() {
    this.load();
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
      if (savedStreak) this.streakDays = parseInt(savedStreak, 10) || 3;
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
    this.save();
    this.notify();
  }

  // Love Notes
  public getCurrentLoveNote(): LoveNote {
    return LOVE_NOTES[this.loveNoteIndex % LOVE_NOTES.length];
  }

  public drawNextLoveNote(): LoveNote {
    this.loveNoteIndex = (this.loveNoteIndex + 1) % LOVE_NOTES.length;
    this.notify();
    return this.getCurrentLoveNote();
  }

  // Sparkle Streak
  public getSparkleStreak(): { streak: number, trail: boolean[] } {
    const trail = [true, true, true, false, false, false, false].map((_, idx) => idx < this.streakDays);
    return { streak: this.streakDays, trail };
  }

  public addSparkleStreak(): void {
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
  | 'boss'
  | 'passport'
  | 'daily'
  | 'profile'
  | 'achievements'
  | 'classroom'
  | 'teacher_custom'
  | 'secret_classroom'
  | 'stickers'
  | 'recipes';



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
  ]
}

```

---

### File: `vite.config.ts`

```ts
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function youtubeSearchPlugin(): Plugin {
  return {
    name: 'youtube-search-api',
    configureServer(server) {
      server.middlewares.use('/api/youtube-search', async (req, res) => {
        try {
          const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
          const query = url.searchParams.get('q') || '';
          if (!query.trim()) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing query' }));
            return;
          }

          const fetchRes = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query.trim() + ' song')}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept-Language': 'en-US,en;q=0.9',
            }
          });
          const html = await fetchRes.text();
          const match = html.match(/var ytInitialData = ({.*?});<\/script>/) || html.match(/ytInitialData\s*=\s*({.+?});/);
          const results: Array<{
            videoId: string;
            title: string;
            channel: string;
            duration: string;
            thumbnail: string;
          }> = [];

          if (match) {
            const json = JSON.parse(match[1]);
            const contents = json.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
            for (const item of contents) {
              const v = item.videoRenderer;
              if (v && v.videoId) {
                results.push({
                  videoId: v.videoId,
                  title: v.title?.runs?.[0]?.text || 'YouTube Song',
                  channel: v.ownerText?.runs?.[0]?.text || 'YouTube Music',
                  duration: v.lengthText?.simpleText || '',
                  thumbnail: `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`
                });
              }
              if (results.length >= 12) break;
            }
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ results }));
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: message, results: [] }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), youtubeSearchPlugin()],
})


```

---

