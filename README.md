# 🎬 Video Motion Graphics Skill (1080x1920)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Remotion](https://img.shields.io/badge/Render%20Engine-Remotion-blueviolet)](https://www.remotion.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6)](https://www.typescriptlang.org/)
[![Arabic & Multilingual](https://img.shields.io/badge/Languages-Arabic%20%7C%20English%20%7C%20Global-success)](https://github.com/)

A specialized Agent Skill for designing, storyboarding, and rendering high-retention 9:16 vertical motion graphics (1080x1920) using **Remotion** (React & TypeScript).

Supports **Level 1 (Prompt-Driven)** and **Level 2 (Asset-Driven)** production pipelines with strict safe zones, sound design, and a step-by-step approval gate (**Script ➔ Storyboard ➔ Draft ➔ Final**).

---

## 🧭 Step 0: Language & Collaboration Setup

Before starting creative direction, the agent establishes:
1. **Video Language**: What language the on-screen text and voiceover will be in (e.g., Arabic, English, French, Spanish).
2. **Communication Language**: What language you prefer to converse with the model in.

All subsequent discovery questions, scripts, and reviews take place in your preferred language.

---

## ⚡ The Two Interaction Levels

### Level 1: Prompt-Driven (Zero Files Needed)
You provide ideas through text prompts; the agent fills the gaps:

- **Topic**: `[your topic in one sentence]`
- **On-Screen Text**: `[3 to 5 short sentences]`
- **Visual Style**:
  - Calm and confident mood.
  - Dark background (`#0A0D14` obsidian slate).
  - Only two colors + one vibrant highlight color applied to **a single word** per sentence.
  - Large, clear font (e.g., Arabic *Cairo* or Latin *Plus Jakarta Sans*).
- **Motion & Safe Zones**:
  - Smooth spring entrances for each sentence.
  - Transitions every 2 to 3 seconds.
  - Code-triggered sound effects for scene cuts.
  - **Safe Zone**: 180px top, 320px bottom, 90px sides (1080x1920).
- **Ending**: `[your name]` + "Follow me" / "تابعني".
- **Self-Review**:
  - Pre-flight check: *"Is anything missing before we begin?"*
  - Frame inspection: Verifies text does not go off-screen or scale too small for mobile.
- **Export**: Rendered to MP4 via FFmpeg, with browser preview fallback if FFmpeg is absent.

---

### Level 2: Asset-Driven (Local Files)
When you have custom brand assets, provide local file paths:

- **Font**: `[font file path]` (`.ttf` / `.woff2`)
- **Colors**: `[5 color codes]` (Background, Surface, Primary Text, Muted Text, Accent Highlight)
- **Music**: `[audio file path]` (Transitions synchronized to the audio beat)
- **Creator Photo**: `[path]` (Cutout without background for the ending scene)
- **Photos / Clips**: `[paths]` (Integrated as background b-roll or cards)
- **Reference Video**: `[path]` (Analyzes rhythm and style without copying)

---

## 🛑 The Step-by-Step Approval Gate

To ensure complete control over the creative process, the agent stops and requests approval at each stage:

```text
1. SCRIPT       ➔ 3-5 punchy sentences + 1 highlight word each ➔ [WAIT FOR APPROVAL]
2. STORYBOARD   ➔ Frame-by-frame breakdown table (2-3s/scene)  ➔ [WAIT FOR APPROVAL]
3. DRAFT        ➔ Remotion code with SafeZoneContainer         ➔ [WAIT FOR APPROVAL]
4. FINAL        ➔ Automated frame inspection & MP4 render      ➔ [DELIVERY]
```

---

## 🛡️ Safe Zone Specifications (1080x1920)

Vertical social platforms (Reels, TikTok, Shorts) obscure large areas with user avatars, search bars, captions, and engagement buttons. This skill enforces strict safe margins:

```text
┌──────────────────────────────────────────────┐ 0px
│             TOP DANGER ZONE (180px)          │
├────────┬────────────────────────────┬────────┤ 180px
│        │                            │        │
│ 90px   │       SAFE CONTENT         │ 90px   │
│ LEFT   │           AREA             │ RIGHT  │
│ MARGIN │                            │ MARGIN │
│        │   (Titles, Copy, Mockups)  │        │
│        │                            │        │
├────────┴────────────────────────────┴────────┤ 1600px
│           BOTTOM DANGER ZONE (320px)         │
│          (Captions & Platform Buttons)       │
└──────────────────────────────────────────────┘ 1920px
```

Use the included primitive:
```tsx
import { SafeZoneContainer } from "./templates/primitives/SafeZoneContainer";

<SafeZoneContainer dir="rtl" showOverlay={false}>
  <YourContent />
</SafeZoneContainer>
```

---

## 📁 Repository Structure

```text
.
├── SKILL.md                          # Primary agent skill specification & workflow
├── README.md                         # Public documentation & usage guide
├── LICENSE                           # MIT License
├── .gitignore                        # Git ignore patterns
├── references/
│   ├── interview_guide.md            # Level 1 & Level 2 questionnaire & gap-filling matrix
│   ├── remotion_best_practices.md    # Remotion rules, spring physics & performance tips
│   └── color_palettes_and_styles.md  # Aesthetic palettes (Dark SaaS, Cyberpunk, Apple, Pop)
├── templates/
│   └── primitives/                   # Reusable animation components
│       ├── SafeZoneContainer.tsx     # Enforces 180 top, 320 bottom, 90 side margins
│       ├── KineticText.tsx           # Staggered split-text spring animation
│       ├── AnimatedCounter.tsx       # Smooth number ticker
│       ├── DeviceMockup.tsx          # Browser, terminal & phone frames
│       ├── CameraRig.tsx             # 2.5D perspective camera container
│       └── SceneTransition.tsx       # Directional wipes & fades
├── scripts/
│   ├── init_remotion.sh              # One-command project bootstrapper
│   └── render_video.sh               # CLI helper for 1080p, 4K, GIF & transparent WebM
└── examples/
    ├── level1_arabic_reels/          # 1080x1920 Arabic reel with highlight word & safe zones
    ├── saas_product_promo/           # 16:9 Landscape 15s product promo composition
    └── social_reel_9x16/             # 9:16 Vertical 10s social media reel composition
```

---

## 🛠️ CLI Rendering Utilities

```bash
# Render MP4 (1080x1920)
./scripts/render_video.sh MainVideo out/video.mp4 1080p

# Ultra-crisp 4K
./scripts/render_video.sh MainVideo out/video-4k.mp4 4k

# Animated GIF preview
./scripts/render_video.sh MainVideo out/preview.gif gif
```

---

## 📄 License

MIT License. Free for personal, commercial, and open-source use.
