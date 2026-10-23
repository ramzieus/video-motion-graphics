---
name: video-motion-graphics
description: >-
  Creates code-driven 1080x1920 vertical motion graphic videos using Remotion.
  Upon activation, immediately asks the user for the video and communication languages,
  guides them through combined Level 1 (prompt-driven) and Level 2 (asset-driven) intake, enforces
  strict safe zones (180 top, 320 bottom, 90 sides), and halts for user approval after
  each phase: Script -> Storyboard -> Draft -> Final.
---

# Video Motion Graphics Skill (1080x1920)

This skill provides full instructions for an AI assistant to collaborate with a user to produce professional, code-driven vertical motion graphics (1080x1920) using **Remotion** (React & TypeScript).

---

## 🚨 Mandatory Agent Operating Rules

When this skill is activated by a user request:
1. **DO NOT generate video code immediately.**
2. **DO NOT assume language, content, or styling.**
3. **Execute Step 0 immediately:** Ask the language questions.
4. **Follow the Phased Approval Gate:** `Script -> Storyboard -> Draft -> Final`. **You MUST STOP after every step and wait for the user's explicit approval before proceeding.**

---

## Step 0: Language Discovery (Prompt the User First)

Immediately start by asking the user the following two questions:

> 1. **Video Language**: *"What language will the video content and on-screen text be in? (e.g., Arabic, English, etc.)"*
> 2. **Communication Language**: *"What language would you prefer to communicate with me in during this process?"*

Once the user replies, conduct all subsequent questions, explanations, and approvals in their chosen **Communication Language**.

Do NOT ask the user to choose a workflow level. Always use **both** levels together:
- **Level 1**: Prompt-Driven (topic, text, style, motion, ending)
- **Level 2**: Asset-Driven (local files: fonts, colors, audio, clips, photo). Every Level 2 field is optional; if the user skips one, fall back to the Level 1 default.

**NEVER dump the templates or a full questionnaire on the user.** Collect requirements interactively, **one question at a time**: ask a single question, wait for the answer, then ask the next. Use `AskUserQuestion` when available (use the listed options, plus "Other" for custom input); otherwise ask in plain text. Ask all questions in the **Communication Language**.

---

## Intake Questions (One by One)

Ask in this order. Show the example options under each question so the user can pick directly or type their own. Never combine two questions in one message. Do not proceed until the current one is answered.

### Level 1: Prompt-Driven
1. **Topic**: "What is the topic of the video, in one sentence?"
   - Examples: "Why discipline beats motivation" / "5 habits of productive developers" / "Launching my new app" / "A short story about patience"
2. **On-screen text**: "What are the 3 to 5 short sentences to show on screen?"
   - Options: "I'll write them myself" / "Draft them for me from the topic" / "Draft them, then I'll edit" / "Use a quote or saying (I'll paste it)"
3. **Style**: "Which visual style do you want?"
   - Options: "Default: calm and confident, dark background, two colors + one highlight word" / "Bold and energetic: high contrast, neon accent" / "Clean and light: white background, soft pastel accent" / "Luxury: black and gold, elegant serif"
4. **Motion**: "Which motion feel do you want?"
   - Options: "Default: smooth spring entrances, a cut every 2 to 3s, code-made SFX" / "Fast and punchy: quick cuts, kinetic text, impact SFX" / "Slow and cinematic: long fades, soft camera drift, ambient SFX" / "Minimal: simple fades, no SFX"
5. **Ending**: "What should the ending say?"
   - Options: "My name + 'Follow me' (or 'تابعني')" / "My name + a call to action (e.g. 'Link in bio')" / "My name + handle (e.g. @username)" / "No ending card"

Safe zone is fixed (180 top, 320 bottom, 90 sides). Do not ask about it.

### Level 2: Asset-Driven
Each is optional. The user may answer "none" or "skip".
6. **Font**: "Do you have a font file?"
   - Options: "Skip (use default: Cairo for Arabic, Plus Jakarta Sans for Latin)" / "Yes, here is the path" / "Suggest a font for my style"
7. **Colors**: "Do you have brand color codes?"
   - Options: "Skip (use style defaults)" / "Yes, I'll give 5 hex codes (background, surface, text, muted text, accent)" / "Pick a palette for me" (e.g. obsidian + cyan, navy + amber, charcoal + coral)
8. **Music**: "Do you have a music file?"
   - Options: "Skip (code-made SFX only)" / "Yes, here is the path (cut scenes to its beat)" / "Suggest a music mood (calm, epic, upbeat)"
9. **Your photo**: "Do you have a photo of yourself without a background, for the ending?"
   - Options: "Skip (name badge only)" / "Yes, here is the path"
10. **Photos or clips**: "Any photos or video clips to include?"
   - Options: "Skip (pure motion graphics)" / "Yes, here are the paths (use as b-roll/backgrounds)" / "Yes, a logo only (path)"
11. **Reference video**: "Is there a video whose rhythm and style you like?"
   - Options: "Skip" / "Yes, here is the path (take the feel without copying)"

### Pre-Flight Check (Mandatory)
After the last question and before Step 1 (Script), summarize the collected requirements briefly, then ask:
> *"Before I start, is there anything missing or any additional detail you would like to include?"*

---

## The 4-Phase Approval Protocol (Hard Stops)

Work strictly step by step: **Script ➔ Storyboard ➔ Draft ➔ Final**.
**STOP after each step until the user approves.**

### Phase 1: Script
1. Formulate 3 to 5 short, high-impact sentences in the chosen **Video Language**.
2. Select and highlight exactly **one key word** per sentence using the accent color.
3. Define the ending line: `[User's Name]` + "Follow me" (or target language equivalent).
4. **STOP: Present the script to the user and wait for their explicit approval before doing anything else.**

---

### Phase 2: Storyboard
Once the script is approved, construct a frame-accurate scene timeline:
- **Resolution**: `1080x1920` (9:16 vertical).
- **Pacing**: Transition every `2 to 3 seconds` (60 to 90 frames @ 30 FPS).
- If Level 2 music was provided: Align scene cuts directly to the music's beats.

Output a structured storyboard table:

| Scene | Duration | Frame Range (@30fps) | On-Screen Text & Highlight | Visual Motion & Layout | Audio / SFX Beat |
| :---: | :---: | :---: | :--- | :--- | :--- |
| **1** | 2.5s | 0 – 75 | Sentence 1 (with **[Highlight Word]**) | Smooth spring entrance | Transition whoosh SFX |
| **2** | 2.5s | 75 – 150 | Sentence 2 (with **[Highlight Word]**) | Smooth spring entrance | Impact chime SFX |
| ... | ... | ... | ... | ... | ... |
| **Ending** | 2.5s | (End - 75) – End | Name + "Follow me" / "تابعني" | Creator cutout / badge reveal | Outro sound chord |

**STOP: Present the storyboard to the user and wait for their explicit approval before writing code.**

---

### Phase 3: Draft
Once the storyboard is approved, generate the Remotion composition code:
1. Wrap all visual content inside the `SafeZoneContainer` (`templates/primitives/SafeZoneContainer.tsx`), strictly honoring:
   - **Top margin**: `180px`
   - **Bottom margin**: `320px`
   - **Left & Right margins**: `90px`
2. Apply physics-based springs (`damping: 12, mass: 0.5, stiffness: 120`).
3. If Arabic is selected: Set `dir="rtl"` and configure an Arabic font (e.g. *Cairo* or user's font file).
4. Integrate sound effects using Remotion audio components at scene boundaries.
5. **Live preview after every edit (Mandatory)**: After each edit to the composition (including the last one), start (or reuse) the Remotion preview and open it directly in the user's browser. Never just hand over code, and never wait to be asked:
   ```bash
   npx remotion preview --port 3000   # opens the browser automatically
   # if the browser did not open:
   xdg-open http://localhost:3000 || open http://localhost:3000
   ```
   Run the server in the background so the session stays usable; hot reload shows later edits, but re-open/confirm the browser tab after each last edit.
6. **STOP: Ask the user to review the draft and wait for their feedback or approval.**

---

### Phase 4: Final & Automated Self-Review

Before rendering the final video:

#### 1. Self-Review Frame Inspection (Mandatory)
The agent must review the composition layout and verify:
- [ ] **No Text Overflow**: All text elements are completely inside the safe zone bounds (not within 180px from top, 320px from bottom, or 90px from sides).
- [ ] **Legibility**: Headline text is large and clear (font size ≥ 48px), subtitle text ≥ 28px.
- [ ] **Color Contrast**: Only two main colors are used, with exactly one single word highlighted per sentence.
- [ ] **Pacing**: Scene transitions occur smoothly every 2 to 3 seconds.
- [ ] **Any issue found must be fixed automatically before exporting.**

#### 2. Preview Gate (Mandatory, before any render)
Any time the composition was edited (including fixes from the self-review above), open the preview in the user's browser first (`npx remotion preview`, plus `xdg-open`/`open` of the URL) and show it. **Do not run `render_video.sh` or `npx remotion render` until the user has seen the latest edit in the browser and approved.** Every new edit re-triggers this gate.

#### 3. Export & Deliver
Check whether FFmpeg is available on the user's system:
- **If FFmpeg is available**:
  Export as an MP4 at `1080x1920` resolution using:
  ```bash
  ./scripts/render_video.sh MainVideo out/video.mp4 1080p
  ```
- **If FFmpeg is NOT available**:
  Make it a browser-viewable page using Remotion Player so the user can view and interact with the video directly in their web browser:
  ```bash
  npm start # Or npx remotion preview
  ```
