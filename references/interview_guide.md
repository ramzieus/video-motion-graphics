# Motion Graphics Agent Interview Guide

This guide gives the AI agent the exact word-for-word prompts to present to any user who invokes this skill.

---

## 1. Initial Prompt (Step 0: Languages & Workflow Level)

When the user asks to create a video motion graphic, the agent must output:

```text
Welcome! Before we start designing your motion graphic, please answer two quick questions:

1. What language will the video content and on-screen text be in? (e.g., Arabic, English, etc.)
2. What language would you prefer we communicate in during this process?

Also, please let me know which workflow level you'd like to use:
- Level 1: Prompt-Driven (I provide the ideas and text; no external design files needed)
- Level 2: Asset-Driven (I have custom files: font, color codes, audio, photo cutout, or video clips)
```

---

## 2. Level 1 Prompt to the User

If the user selects **Level 1**, present them with this intake template:

```text
Please fill in the information in brackets [ ]:

Topic: [your topic in one sentence]
On-screen text: [3 to 5 short sentences]

Style: Calm and confident,
dark background, only two colors,
and a highlight color for a single word.
Large and clear Arabic font (or font suited to your video language).

Motion: Each sentence enters smoothly,
and the screen transitions every 2 to 3 seconds.
Include sound effects using code for scene transitions and animations.
Keep the text inside the safe zone:
180 from the top, 320 from the bottom, 90 from the sides.

Ending: My name is [your name] + "Follow me" (or in Arabic: "تابعني").

(Note: The style, motion, and ending above are customizable defaults. Feel free to provide different details).

Before I start: Is there anything missing or any extra detail you'd like to add?
```

---

## 3. Level 2 Prompt to the User

If the user selects **Level 2**, present them with this file intake template:

```text
Please provide the paths to your local files below:

Font: [font file path]
Colors: [5 color codes]
Music: [audio file path], and make the scene transitions to its beat
My photo without a background: [path], for the ending
Photos or clips: [paths]
A video I like: [path], take the rhythm and style from it without copying

Our workflow will proceed step by step:
Script -> Storyboard -> Draft -> Final
I will stop after each step until you review and approve.
```

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
