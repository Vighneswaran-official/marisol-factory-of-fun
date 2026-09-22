const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processAllImages() {
  const baseDir = path.resolve('public/marisol');
  const stickersDir = path.join(baseDir, 'stickers');
  const avatarsDir = path.join(baseDir, 'avatars');
  const posesDir = path.join(baseDir, 'poses');

  [stickersDir, avatarsDir, posesDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const srcPath = path.join(baseDir, 'marisol_sheet.jpg');
  const bgBuffer = await sharp(srcPath).toBuffer();

  const patch = (w, h, color = '#FAF7F0') =>
    Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${color}" /></svg>`);

  const items = [
    {
      id: '01_brighter_ideas',
      alias: 'brighter_ideas',
      title: 'Same Girl Brighter Ideas',
      quote: 'Same Girl Brighter Ideas ♡',
      vibe: 'Inspiring & Thoughtful',
      crop: { left: 15, top: 15, width: 345, height: 345 },
      avatarCrop: { left: 80, top: 90, width: 260, height: 260 },
      overlays: []
    },
    {
      id: '02_happier_days',
      alias: 'happier_days',
      title: 'Good Ideas Happier Days',
      quote: 'Good Ideas Happier Days ♡',
      vibe: 'Radiant Joy & Optimism',
      crop: { left: 360, top: 35, width: 345, height: 330 },
      avatarCrop: { left: 380, top: 60, width: 265, height: 265 },
      overlays: [
        { input: patch(30, 40, '#FAF7F0'), top: 0, left: 0 }
      ]
    },
    {
      id: '03_wink_conquer',
      alias: 'wink_conquer',
      title: 'Wink & Conquer',
      quote: 'Wink & Conquer ♡',
      vibe: 'Bold & Confident',
      crop: { left: 695, top: 40, width: 325, height: 325 },
      avatarCrop: { left: 700, top: 50, width: 265, height: 265 },
      overlays: [
        { input: patch(15, 160, '#FAF7F0'), top: 0, left: 0 }
      ]
    },
    {
      id: '04_overthinking',
      alias: 'overthinking',
      title: 'Overthinking But Making Progress',
      quote: 'Overthinking ... but making progress ♡',
      vibe: 'Analytical & Tenacious',
      crop: { left: 5, top: 335, width: 285, height: 300 },
      avatarCrop: { left: 50, top: 360, width: 235, height: 235 },
      overlays: [
        { input: patch(285, 16, '#FAF7F0'), top: 0, left: 0 },
        { input: patch(130, 25, '#FAF7F0'), top: 0, left: 155 }
      ]
    },
    {
      id: '05_chai_happiness',
      alias: 'chai_happiness',
      title: 'Chai = Happiness',
      quote: 'Chai = Happiness ♡',
      vibe: 'Cozy & Mindful',
      crop: { left: 280, top: 345, width: 245, height: 290 },
      avatarCrop: { left: 285, top: 360, width: 235, height: 235 },
      overlays: [
        { input: patch(245, 18, '#FAF7F0'), top: 0, left: 0 }
      ]
    },
    {
      id: '06_silly_vibe',
      alias: 'silly_vibe',
      title: 'Silly Is A Vibe',
      quote: 'Silly Is A Vibe ♡',
      vibe: 'Playful & Full of Laughter',
      crop: { left: 515, top: 350, width: 255, height: 285 },
      avatarCrop: { left: 535, top: 365, width: 235, height: 235 },
      overlays: [
        { input: patch(255, 18, '#FAF7F0'), top: 0, left: 0 },
        { input: patch(50, 30, '#FAF7F0'), top: 0, left: 205 }
      ]
    },
    {
      id: '07_big_dreams',
      alias: 'big_dreams',
      title: 'Big Dreams',
      quote: 'Big Dreams ♡',
      vibe: 'Limitless & Visionary',
      crop: { left: 765, top: 345, width: 255, height: 295 },
      avatarCrop: { left: 775, top: 365, width: 240, height: 240 },
      overlays: [
        { input: patch(140, 22, '#FAF7F0'), top: 0, left: 0 },
        { input: patch(18, 90, '#FAF7F0'), top: 120, left: 0 }
      ]
    },
    {
      id: '08_grateful_always',
      alias: 'grateful_always',
      title: 'Grateful Always',
      quote: 'Grateful Always ♡',
      vibe: 'Grounded & Appreciative',
      crop: { left: 5, top: 635, width: 295, height: 310 },
      avatarCrop: { left: 35, top: 645, width: 260, height: 260 },
      overlays: [
        { input: patch(295, 18, '#FAF7F0'), top: 0, left: 0 },
        { input: patch(35, 45, '#FAF7F0'), top: 0, left: 260 }
      ]
    },
    {
      id: '09_just_me',
      alias: 'just_me',
      title: 'Just Me',
      quote: 'Just Me ♡',
      vibe: 'Authentic & Unapologetic',
      crop: { left: 290, top: 635, width: 235, height: 295 },
      avatarCrop: { left: 300, top: 645, width: 225, height: 225 },
      overlays: [
        { input: patch(235, 20, '#FAF7F0'), top: 0, left: 0 },
        { input: patch(30, 65, '#FAF7F0'), top: 0, left: 205 }
      ]
    },
    {
      id: '10_bigger_adventures',
      alias: 'bigger_adventures',
      title: 'Same Kritika Bigger Adventures',
      quote: 'Same Kritika Bigger Adventures ♡',
      vibe: 'Daring & Curious',
      crop: { left: 515, top: 625, width: 300, height: 320 },
      avatarCrop: { left: 535, top: 640, width: 245, height: 245 },
      overlays: [
        { input: patch(300, 18, '#FAF7F0'), top: 0, left: 0 },
        { input: patch(140, 30, '#FAF7F0'), top: 290, left: 70 }
      ]
    },
    {
      id: '11_music_mood',
      alias: 'music_mood',
      title: 'Good Music Brighter Mood',
      quote: 'Good Music Brighter Mood ♡',
      vibe: 'Euphoric & Rhythmic',
      crop: { left: 785, top: 640, width: 235, height: 315 },
      avatarCrop: { left: 800, top: 650, width: 220, height: 220 },
      overlays: [
        { input: patch(235, 18, '#FAF7F0'), top: 0, left: 0 }
      ]
    }
  ];

  for (const item of items) {
    let stickerPipeline = sharp(bgBuffer).extract(item.crop);
    if (item.overlays && item.overlays.length > 0) {
      stickerPipeline = stickerPipeline.composite(item.overlays);
    }
    const stickerDest = path.join(stickersDir, `${item.id}.png`);
    await stickerPipeline.toFile(stickerDest);
    
    // Save pose alias
    await sharp(stickerDest).toFile(path.join(posesDir, `${item.alias}.png`));

    // Save avatar
    const avatarDest = path.join(avatarsDir, `${item.id}.png`);
    await sharp(bgBuffer)
      .extract(item.avatarCrop)
      .resize(256, 256, { fit: 'cover' })
      .toFile(avatarDest);
    await sharp(avatarDest).toFile(path.join(avatarsDir, `${item.alias}.png`));

    console.log(`✓ Generated Sticker & Avatar: ${item.id} - ${item.quote}`);
  }

  // Create TypeScript data module so all React components can use the 11 stickers cleanly
  const tsContent = `// Auto-generated 11 Marisol / Kritika Stickers Manifest
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

export const STICKERS: StickerData[] = ${JSON.stringify(
    items.map((item, idx) => ({
      index: idx + 1,
      id: item.id,
      alias: item.alias,
      title: item.title,
      quote: item.quote,
      vibe: item.vibe,
      stickerUrl: `/marisol/stickers/${item.id}.png`,
      poseUrl: `/marisol/poses/${item.alias}.png`,
      avatarUrl: `/marisol/avatars/${item.id}.png`,
      accentColor: [
        '#F9A825', // 1 gold
        '#F472B6', // 2 pink
        '#EC4899', // 3 rose
        '#6366F1', // 4 indigo
        '#F97316', // 5 orange
        '#10B981', // 6 emerald
        '#3B82F6', // 7 blue
        '#8B5CF6', // 8 violet
        '#14B8A6', // 9 teal
        '#EF4444', // 10 red
        '#8B5CF6'  // 11 purple
      ][idx],
      badgeEmoji: ['💡', '☀️', '😉', '💻', '☕', '😜', '✈️', '📚', '✌️', '❤️', '🎧'][idx]
    })),
    null,
    2
  )};

export const STICKERS_BY_ALIAS: Record<string, StickerData> = Object.fromEntries(
  STICKERS.map(s => [s.alias, s])
);
`;

  fs.writeFileSync(path.resolve('src/data/stickers.ts'), tsContent);
  console.log('✓ Created src/data/stickers.ts!');
}

processAllImages().catch(console.error);
