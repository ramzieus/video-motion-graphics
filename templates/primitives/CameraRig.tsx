import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CameraRigProps {
  children: React.ReactNode;
  zoom?: { from: number; to: number; durationInFrames: number; delay?: number };
  tiltX?: { from: number; to: number; durationInFrames: number; delay?: number };
  tiltY?: { from: number; to: number; durationInFrames: number; delay?: number };
  panX?: { from: number; to: number; durationInFrames: number; delay?: number };
  panY?: { from: number; to: number; durationInFrames: number; delay?: number };
  perspective?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  zoom,
  tiltX,
  tiltY,
  panX,
  panY,
  perspective = 1200,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();

  const getInterpolated = (
    conf: { from: number; to: number; durationInFrames: number; delay?: number } | undefined,
    fallback: number
  ) => {
    if (!conf) return fallback;
    const delay = conf.delay || 0;
    return interpolate(
      frame - delay,
      [0, conf.durationInFrames],
      [conf.from, conf.to],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  };

  const currentScale = getInterpolated(zoom, 1);
  const currentTiltX = getInterpolated(tiltX, 0);
  const currentTiltY = getInterpolated(tiltY, 0);
  const currentPanX = getInterpolated(panX, 0);
  const currentPanY = getInterpolated(panY, 0);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        perspective: `${perspective}px`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate3d(${currentPanX}px, ${currentPanY}px, 0) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) scale(${currentScale})`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
