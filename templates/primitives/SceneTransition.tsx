import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SceneTransitionProps {
  children: React.ReactNode;
  type?: "fade" | "slide-up" | "slide-left" | "zoom-fade" | "wipe-left";
  direction?: "in" | "out";
  durationInFrames?: number;
  delayInFrames?: number;
  className?: string;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  type = "fade",
  direction = "in",
  durationInFrames = 20,
  delayInFrames = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: {
      damping: 15,
      mass: 0.6,
      stiffness: 100,
    },
  });

  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const factor = direction === "in" ? clampedProgress : 1 - clampedProgress;

  let style: React.CSSProperties = {};

  switch (type) {
    case "fade":
      style = { opacity: factor };
      break;

    case "slide-up":
      style = {
        opacity: factor,
        transform: `translateY(${(1 - factor) * 80}px)`,
      };
      break;

    case "slide-left":
      style = {
        opacity: factor,
        transform: `translateX(${(1 - factor) * 120}px)`,
      };
      break;

    case "zoom-fade":
      style = {
        opacity: factor,
        transform: `scale(${0.85 + factor * 0.15})`,
      };
      break;

    case "wipe-left": {
      const clipPercent = factor * 100;
      style = {
        clipPath: `inset(0 0 0 ${100 - clipPercent}%)`,
      };
      break;
    }

    default:
      style = { opacity: factor };
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        willChange: "transform, opacity, clip-path",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
