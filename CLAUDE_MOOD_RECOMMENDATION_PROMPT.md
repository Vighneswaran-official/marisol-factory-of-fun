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
