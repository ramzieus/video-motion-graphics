import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SafeZoneContainer } from "../../templates/primitives/SafeZoneContainer";

// Highlighted sentence component: renders sentence with 1 emphasized word in accent color
interface HighlightSentenceProps {
  sentenceParts: { text: string; isHighlight?: boolean }[];
  accentColor?: string;
}

const HighlightSentence: React.FC<HighlightSentenceProps> = ({
  sentenceParts,
  accentColor = "#F59E0B", // Gold / Amber accent
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 100 },
  });

  const translateY = (1 - entrance) * 60;

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity: entrance,
        textAlign: "center",
        lineHeight: 1.5,
      }}
      className="text-6xl font-black text-white"
    >
      {sentenceParts.map((part, idx) => (
        <span
          key={idx}
          style={{
            color: part.isHighlight ? accentColor : "#FFFFFF",
            display: "inline-block",
            margin: "0 8px",
            textShadow: part.isHighlight
              ? `0 0 35px ${accentColor}66`
              : "none",
          }}
        >
          {part.text}
        </span>
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Scene 1: First Sentence (0s - 2.5s = 75 frames)
// -----------------------------------------------------------------------------
export const ArabicScene1: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#0A0D14]">
      <SafeZoneContainer dir="rtl">
        <HighlightSentence
          sentenceParts={[
            { text: "السر" },
            { text: "الحقيقي" },
            { text: "للنجاح" },
            { text: "هو" },
            { text: "الاستمرارية", isHighlight: true },
          ]}
        />
      </SafeZoneContainer>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 2: Second Sentence (2.5s - 5.0s = 75 frames)
// -----------------------------------------------------------------------------
export const ArabicScene2: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#0A0D14]">
      <SafeZoneContainer dir="rtl">
        <HighlightSentence
          sentenceParts={[
            { text: "لا" },
            { text: "تنتظر" },
            { text: "الظروف" },
            { text: "المثالية", isHighlight: true },
            { text: "لتبدأ" },
          ]}
        />
      </SafeZoneContainer>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 3: Third Sentence (5.0s - 7.5s = 75 frames)
// -----------------------------------------------------------------------------
export const ArabicScene3: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#0A0D14]">
      <SafeZoneContainer dir="rtl">
        <HighlightSentence
          sentenceParts={[
            { text: "خطوة" },
            { text: "واحدة" },
            { text: "يومياً" },
            { text: "تصنع", isHighlight: true },
            { text: "الفارق" },
          ]}
        />
      </SafeZoneContainer>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 4: Outro Ending (7.5s - 10.0s = 75 frames)
// Ending: My name is [your name] + "تابعني" ("Follow me")
// -----------------------------------------------------------------------------
export const ArabicEndingScene: React.FC<{ creatorName?: string }> = ({
  creatorName = "أحمد خالد",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 120 },
  });

  return (
    <AbsoluteFill className="bg-[#0A0D14]">
      <SafeZoneContainer dir="rtl">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Creator Avatar Placeholder or Cutout */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <span className="text-5xl font-black text-slate-950">✦</span>
          </div>

          <div className="text-4xl font-extrabold text-white">
            {creatorName}
          </div>

          <div
            style={{
              transform: `scale(${buttonSpring})`,
              opacity: buttonSpring,
            }}
          >
            <div className="px-10 py-4 rounded-full bg-amber-500 text-slate-950 font-black text-2xl shadow-xl shadow-amber-500/40">
              تابعني للمزيد 🚀
            </div>
          </div>
        </div>
      </SafeZoneContainer>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Full Level 1 Composition (Total: 300 frames @ 30fps = 10.0s)
// -----------------------------------------------------------------------------
export const ArabicLevel1Composition: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={75}>
        <ArabicScene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <ArabicScene2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <ArabicScene3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <ArabicEndingScene />
      </Series.Sequence>
    </Series>
  );
};
