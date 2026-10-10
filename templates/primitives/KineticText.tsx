import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface KineticTextProps {
  text: string;
  delayInFrames?: number;
  staggerFrames?: number;
  mode?: "word" | "character";
  className?: string;
  wordClassName?: string;
  damping?: number;
  mass?: number;
  stiffness?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delayInFrames = 0,
  staggerFrames = 3,
  mode = "word",
  className = "",
  wordClassName = "",
  damping = 12,
  mass = 0.5,
  stiffness = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tokens = mode === "word" ? text.split(" ") : text.split("");

  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: mode === "word" ? "0.3em" : "0.02em",
        alignItems: "baseline",
      }}
      className={className}
    >
      {tokens.map((token, index) => {
        const itemDelay = delayInFrames + index * staggerFrames;
        const progress = spring({
          frame: frame - itemDelay,
          fps,
          config: {
            damping,
            mass,
            stiffness,
          },
        });

        const translateY = (1 - progress) * 40;
        const opacity = progress;
        const scale = 0.8 + progress * 0.2;

        return (
          <span
            key={`${token}-${index}`}
            style={{
              display: "inline-block",
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
              willChange: "transform, opacity",
            }}
            className={wordClassName}
          >
            {token}
          </span>
        );
      })}
    </div>
  );
};
