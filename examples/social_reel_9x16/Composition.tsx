import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../../templates/primitives/KineticText";
import { DeviceMockup } from "../../templates/primitives/DeviceMockup";

// -----------------------------------------------------------------------------
// Scene 1: Rapid Attention Hook (0s - 3s = 90 frames)
// -----------------------------------------------------------------------------
export const ReelHookScene: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#050505] flex flex-col justify-center items-center px-10 text-center">
      {/* Dynamic neon gradient background orb */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(139, 92, 246, 0.2) 60%, transparent 80%)",
        }}
      />

      {/* Top sticker badge */}
      <div className="px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 font-bold text-sm tracking-wider uppercase mb-8">
        🔥 Pro Dev Secret
      </div>

      <KineticText
        text="Stop writing boilerplate CSS."
        className="text-6xl font-black text-white leading-tight"
        mode="word"
        damping={10}
        mass={0.4}
        stiffness={140}
      />
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 2: Mobile UI Reveal (3s - 7s = 120 frames)
// -----------------------------------------------------------------------------
export const ReelMobileScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 100 },
  });

  const translateY = (1 - phoneSpring) * 300;

  return (
    <AbsoluteFill className="bg-[#050505] flex flex-col items-center justify-center p-6">
      <div className="text-2xl font-bold text-slate-300 mb-6 text-center">
        Generate custom components <br />
        <span className="text-violet-400 font-black">in 1 tap</span>
      </div>

      <div
        style={{
          transform: `translateY(${translateY}px) scale(${phoneSpring})`,
          opacity: phoneSpring,
        }}
      >
        <DeviceMockup type="phone">
          <div className="p-5 flex flex-col space-y-4 bg-slate-900 h-full">
            <div className="w-full h-32 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              ✨ Instant UI
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded-md w-3/4" />
              <div className="h-4 bg-slate-800 rounded-md w-1/2" />
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
              $ npx create-component
            </div>
          </div>
        </DeviceMockup>
      </div>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 3: Fast Outro / Follow CTA (7s - 10s = 90 frames)
// -----------------------------------------------------------------------------
export const ReelOutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = spring({
    frame: frame % 30,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  return (
    <AbsoluteFill className="bg-[#050505] flex flex-col justify-center items-center px-8 text-center">
      <div className="text-5xl font-black text-white mb-6">
        Want more tips?
      </div>

      <div
        style={{
          transform: `scale(${0.95 + pulse * 0.05})`,
        }}
        className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black text-2xl shadow-xl shadow-purple-500/40"
      >
        Follow for more 🚀
      </div>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Composed 9:16 Social Reel (Total: 300 frames @ 30fps = 10.0 seconds)
// -----------------------------------------------------------------------------
export const SocialReelComposition: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <ReelHookScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <ReelMobileScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90}>
        <ReelOutroScene />
      </Series.Sequence>
    </Series>
  );
};
