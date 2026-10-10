import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AnimatedCounterProps {
  from?: number;
  to: number;
  durationInFrames?: number;
  delayInFrames?: number;
  useSpring?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  formatter?: (val: number) => string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  durationInFrames = 45,
  delayInFrames = 0,
  useSpring = false,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  formatter,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let progress = 0;

  if (useSpring) {
    progress = spring({
      frame: frame - delayInFrames,
      fps,
      config: {
        damping: 14,
        mass: 0.6,
        stiffness: 90,
      },
    });
  } else {
    progress = interpolate(
      frame - delayInFrames,
      [0, durationInFrames],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  }

  const currentValue = from + (to - from) * Math.min(progress, 1);
  const formattedNumber = formatter
    ? formatter(currentValue)
    : currentValue.toFixed(decimals);

  return (
    <span className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
