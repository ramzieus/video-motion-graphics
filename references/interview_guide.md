# Motion Graphics Agent Interview Guide

This guide gives the AI agent the exact word-for-word prompts to present to any user who invokes this skill.

---

## 1. Initial Prompt (Step 0: Languages)

When the user asks to create a video motion graphic, the agent must output:

```text
Welcome! Before we start designing your motion graphic, please answer two quick questions:

1. What language will the video content and on-screen text be in? (e.g., Arabic, English, etc.)
2. What language would you prefer we communicate in during this process?
```

After the languages are answered, run the intake **one question at a time** (sections 2 and 3). Never show the whole questionnaire at once. Do not ask the user to pick a level; both are always used.

---

## 2. Level 1 Questions (ask one by one, wait for each answer)

1. Topic: "What is the topic of the video, in one sentence?"
2. On-screen text: "What are the 3 to 5 short sentences to show on screen? (Or should I draft them for you?)"
3. Style: "Default: calm and confident, dark background, two colors plus a highlight color for a single word, large clear font. Keep or change?"
4. Motion: "Default: smooth sentence entrances, transition every 2 to 3 seconds, code-generated sound effects. Keep or change?"
5. Ending: "What name should appear at the end, with 'Follow me' (or 'تابعني')?"

Safe zone (180 top, 320 bottom, 90 sides) is fixed; do not ask.

---

## 3. Level 2 Questions (ask one by one; each is optional, skipped = Level 1 default)

6. Font: "Do you have a font file? Give the path, or skip."
7. Colors: "Do you have 5 brand color codes? Give them, or skip."
8. Music: "Do you have a music file? If yes, give the path and I will cut scenes to its beat."
9. Photo: "Do you have a photo of yourself without a background, for the ending? Give the path, or skip."
10. Photos or clips: "Any photos or video clips to include? Give the paths, or skip."
11. Reference video: "Is there a video whose rhythm and style you like? Give the path and I will take its feel without copying."

Then summarize the requirements and ask: "Before I start, is there anything missing or any additional detail you would like to include?"

Workflow reminder to the user: Script -> Storyboard -> Draft -> Final. I will stop after each step until you review and approve.

---

## 4. Phase-by-Phase Execution & Stop Rules

```text
Phase 1: SCRIPT
- Draft 3 to 5 punchy sentences.
- Bold exactly ONE highlight word per sentence.
- Include the ending line: [Name] + "Follow me".
- STOP: "Please review the script above. Let me know if you approve or would like any changes."

Phase 2: STORYBOARD
- Build a timeline table (1080x1920 @ 30 FPS).
- Allocate 2 to 3 seconds (60 to 90 frames) per scene.
- Detail motion entrances, spring physics, and sound effects.
- STOP: "Please review the storyboard beats above. Once approved, I will begin coding the draft."

Phase 3: DRAFT
- Code Remotion components inside SafeZoneContainer (180 top, 320 bottom, 90 sides).
- Apply spring physics and sound effect triggers.
- Start Remotion preview or provide code.
- STOP: "The draft is ready. Please preview it and let me know your thoughts."

Phase 4: FINAL & SELF-REVIEW
- Inspect all frames: Check for text clipping outside the safe zone and ensure fonts are legible on mobile.
- If FFmpeg is available: Render MP4 at 1080x1920.
- If FFmpeg is absent: Provide browser-viewable Remotion Player preview.
```
