# Remotion Motion Graphics: Technical Best Practices & Golden Rules

Writing code for video rendering is fundamentally different from building standard web apps. In video, **reproducibility and frame determinism are absolute requirements**. Every render must be pixel-identical regardless of system speed.

---

## 1. Frame Determinism & Mathematical Rules

### Rule 1: No Non-Deterministic APIs
- ❌ **NEVER USE**: `setTimeout`, `setInterval`, `Date.now()`, `Math.random()` (without a seed), or `requestAnimationFrame`.
- ✅ **ALWAYS USE**: `useCurrentFrame()` and `useVideoConfig()`. Every calculation must be a pure mathematical function of `frame`.

```tsx
// ❌ WRONG: Non-deterministic
const randomOffset = Math.random() * 100;

// ✅ CORRECT: Deterministic pseudo-random seed based on index
const deterministicOffset = ((index * 9301 + 49297) % 233280) / 233280 * 100;
```

### Rule 2: Always Clamp Interpolations
By default, Remotion extrapolates linearly beyond the specified frame bounds. If you animate opacity from 0 to 1 over frames [0, 30], on frame 60 opacity will be 2.0 (which can cause render artifacts).

```tsx
import { interpolate, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();

// ✅ ALWAYS specify clamping
const progress = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

---

## 2. Spring Physics Calibration

Spring physics give motion graphics a tactile, human, and professional feel. Remotion's `spring()` calculates smooth position, scale, and rotation curves.

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const springValue = spring({
  frame: frame - delayInFrames,
  fps,
  config: {
    damping: 12,
    mass: 0.5,
    stiffness: 120,
  },
});
```

### Curated Spring Presets

| Style | Mass | Damping | Stiffness | Best Used For |
| :--- | :---: | :---: | :---: | :--- |
| **Snappy Tech / Punchy** | `0.4` | `12` | `140` | SaaS UI elements, badges, cursor clicks, notification popups |
| **Gentle / Cinematic** | `1.0` | `20` | `80` | Camera pans, subtle text reveals, smooth card transitions |
| **Playful / Bouncy** | `0.6` | `8` | `100` | Emojis, confetti, attention-grabbing badges, social stickers |
| **Heavy / Grounded** | `1.5` | `24` | `90` | Large device frames, browser mockups, modal dialogs |

---

## 3. Composition Structure: `<Series>` vs `<Sequence>`

### Use `<Series>` for Sequential Scenes
When scenes play strictly one after another, `<Series>` eliminates manual frame math:

```tsx
import { Series } from "remotion";

export const VideoTimeline = () => {
  return (
    <Series>
      {/* Plays frames 0 -> 89 */}
      <Series.Sequence durationInFrames={90}>
        <HookScene />
      </Series.Sequence>

      {/* Automatically starts at frame 90 -> 239 */}
      <Series.Sequence durationInFrames={150}>
        <FeatureScene />
      </Series.Sequence>

      {/* Automatically starts at frame 240 -> 329 */}
      <Series.Sequence durationInFrames={90}>
        <OutroScene />
      </Series.Sequence>
    </Series>
  );
};
```

### Use `<Sequence>` for Overlapping & Parallel Layers
Use `<Sequence>` when elements appear concurrently or overlap:
- Background music playing across all scenes.
- Persistent watermark or progress bar.
- Ambient floating particles behind multiple scenes.

---

## 4. Hardware-Accelerated Animation Styles

To ensure blazing-fast render times and crisp visuals:
1. **Animate `transform` and `opacity` only**. Avoid animating `width`, `height`, `top`, or `left` which trigger browser reflows.
2. Use `will-change: transform` or `backface-visibility: hidden` to enable GPU compositing for 3D perspective layers.

```tsx
// 2.5D Device tilt animation
const tiltX = interpolate(frame, [0, 60], [15, 0], { extrapolateRight: "clamp" });
const scale = spring({ frame, fps, config: { damping: 14 } });

return (
  <div
    style={{
      transform: `perspective(1000px) rotateX(${tiltX}deg) scale(${scale})`,
      transformStyle: "preserve-3d",
      willChange: "transform",
    }}
  >
    {/* Content */}
  </div>
);
```

---

## 5. Audio Synchronization & Beat Alignment

Audio transforms a generic graphic into an engaging visual hook.

### 1. Synchronizing Hits with Spring Peaks
When triggering a sound effect (like a click or swoosh), trigger it at the impact frame:

```tsx
import { Audio, staticFile } from "remotion";

export const SceneWithAudio = () => {
  return (
    <>
      <VisualCard />
      {/* Sound plays exactly when the card lands on frame 15 */}
      <Sequence from={15}>
        <Audio src={staticFile("audio/pop.mp3")} volume={0.8} />
      </Sequence>
    </>
  );
};
```

### 2. Smooth Audio Fades
Always fade music out at the end of the video:

```tsx
import { Audio, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const BackgroundMusic = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out over the last 30 frames (1 second)
  const volume = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return <Audio src={staticFile("audio/bgm.mp3")} volume={volume} />;
};
```

---

## 6. Typography & Font Loading

Never rely on system fonts, which look different across Linux, macOS, and Docker render runners.

1. Install `@remotion/google-fonts`:
   ```bash
   npm install @remotion/google-fonts
   ```
2. Import the font loader in your composition:
   ```tsx
   import { loadFont } from "@remotion/google-fonts/Inter";

   const { fontFamily } = loadFont();
   ```
This guarantees fonts are pre-downloaded and rendered with 100% fidelity.
