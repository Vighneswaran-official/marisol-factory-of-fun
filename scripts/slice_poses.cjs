const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function refinePoses() {
  const posesDir = path.resolve('public/marisol/poses');
  const srcImage = path.resolve('public/marisol/marisol_sheet.jpg');
  const bgBuffer = await sharp(srcImage).toBuffer();

  const mask = (w, h) =>
    Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#FAF7F0"/></svg>`);

  // 1. Same Girl Brighter Ideas
  // Top-left: head at X~100..320, Y~85..360. Text "Same Girl Brighter Ideas ♡" is on the left X~25..120, Y~170..270.
  // Above is "Kritika ♡" at X~30..280, Y~20..140. We clean the "Kritika" script text so this sticker stands on its own as "Same Girl Brighter Ideas".
  await sharp(bgBuffer)
    .extract({ left: 15, top: 85, width: 345, height: 275 })
    .composite([
      // Mask the word "Kritika" that spills into top-left
      { input: mask(220, 75), top: 0, left: 0 },
      // Mask any cloud peek at the bottom-left
      { input: mask(120, 30), top: 245, left: 0 }
    ])
    .toFile(path.join(posesDir, 'brighter_ideas.png'));

  // 2. Good Ideas Happier Days
  // Top-center: head at X~380..630, Y~80..370. Doodles at left X~360, text "Good Ideas Happier Days ♡" at X~590..705, Y~40..230.
  await sharp(bgBuffer)
    .extract({ left: 350, top: 40, width: 360, height: 325 })
    .composite([
      // Clean top-left peek of small doodle from figure 1 if any
      { input: mask(40, 40), top: 0, left: 0 }
    ])
    .toFile(path.join(posesDir, 'happier_days.png'));

  // 3. Wink & Conquer
  // Top-right: head at X~710..925, Y~70..370. Doodles and text "Wink & Conquer ♡" at X~750..980, Y~90..280.
  await sharp(bgBuffer)
    .extract({ left: 695, top: 45, width: 320, height: 325 })
    .composite([
      // Clean left edge if Happier Days text touched
      { input: mask(20, 180), top: 0, left: 0 }
    ])
    .toFile(path.join(posesDir, 'wink_conquer.png'));

  // 4. Overthinking But Making Progress
  // Mid-left: cloud at X~50..180, Y~340..430. Text "Overthinking ... but making progress ♡" at X~10..150, Y~410..540.
  // Head at X~100..280, laptop at X~45..280.
  await sharp(bgBuffer)
    .extract({ left: 5, top: 335, width: 280, height: 300 })
    .composite([
      // Clean top left brown sliver
      { input: mask(120, 35), top: 0, left: 100 }
    ])
    .toFile(path.join(posesDir, 'overthinking.png'));

  // 5. Chai = Happiness
  // Mid-center-left: heart at left, chai mug, smiling girl.
  await sharp(bgBuffer)
    .extract({ left: 280, top: 350, width: 245, height: 285 })
    .composite([
      // Clean top edge
      { input: mask(245, 20), top: 0, left: 0 }
    ])
    .toFile(path.join(posesDir, 'chai_happiness.png'));

  // 6. Silly Is A Vibe
  // Mid-center-right: "Silly Is A Vibe ♡" at X~525..600, head and hands X~560..760
  await sharp(bgBuffer)
    .extract({ left: 520, top: 350, width: 255, height: 285 })
    .composite([
      // Clean top edge
      { input: mask(255, 20), top: 0, left: 0 },
      // Clean top-right corner where pink dupatta hovered
      { input: mask(50, 30), top: 0, left: 205 }
    ])
    .toFile(path.join(posesDir, 'silly_vibe.png'));

  // 7. Big Dreams
  // Mid-right: airplane bubble at X~840..980, text "Big Dreams ♡" at X~860..995, girl X~770..970.
  await sharp(bgBuffer)
    .extract({ left: 765, top: 350, width: 255, height: 290 })
    .composite([
      // Clean top edge where pink dupatta was
      { input: mask(150, 25), top: 0, left: 0 },
      // Clean left edge if green dress touched
      { input: mask(20, 100), top: 120, left: 0 }
    ])
    .toFile(path.join(posesDir, 'big_dreams.png'));

  // 8. Grateful Always
  // Bottom-left: "Grateful Always ♡" at X~10..130, girl hugging book stack X~30..290.
  await sharp(bgBuffer)
    .extract({ left: 5, top: 635, width: 295, height: 310 })
    .composite([
      // Clean top edge
      { input: mask(295, 20), top: 0, left: 0 },
      // Clean top-right corner where 'J' from Just Me was
      { input: mask(35, 60), top: 0, left: 260 }
    ])
    .toFile(path.join(posesDir, 'grateful_always.png'));

  // 9. Just Me
  // Bottom-center-left: "Just Me ♡" at X~290..350, peace sign girl X~305..520.
  await sharp(bgBuffer)
    .extract({ left: 290, top: 640, width: 240, height: 290 })
    .composite([
      // Clean top edge
      { input: mask(240, 25), top: 0, left: 0 },
      // Clean right edge cloud border
      { input: mask(25, 70), top: 0, left: 215 }
    ])
    .toFile(path.join(posesDir, 'just_me.png'));

  // 10. Same Kritika Bigger Adventures
  // Bottom-center-right: heart bubble at X~520..600, girl X~540..750, text "Same Kritika Bigger Adventures ♡" at X~700..810.
  await sharp(bgBuffer)
    .extract({ left: 515, top: 625, width: 290, height: 320 })
    .composite([
      // Clean top edge
      { input: mask(290, 25), top: 0, left: 0 },
      // Clean bottom banner "you got this"
      { input: mask(150, 40), top: 280, left: 70 }
    ])
    .toFile(path.join(posesDir, 'bigger_adventures.png'));

  // 11. Good Music Brighter Mood
  // Bottom-right: girl with headphones X~765..950, notes X~860..940, text "Good Music Brighter Mood ♡" X~790..975.
  // Left of her hair is around X~770.
  await sharp(bgBuffer)
    .extract({ left: 785, top: 645, width: 235, height: 300 })
    .composite([
      // Clean top edge
      { input: mask(235, 20), top: 0, left: 0 },
      // Clean bottom banner peek
      { input: mask(50, 30), top: 270, left: 0 }
    ])
    .toFile(path.join(posesDir, 'music_mood.png'));

  console.log('Successfully refined all 11 poses!');
}

refinePoses().catch(console.error);
