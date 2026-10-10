import React from "react";

export interface SafeZoneContainerProps {
  children: React.ReactNode;
  showOverlay?: boolean;
  className?: string;
  style?: React.CSSProperties;
  dir?: "rtl" | "ltr";
}

/**
 * SafeZoneContainer:
 * Enforces vertical video margins for 1080x1920 formats:
 * - Top: 180px (clears username, header controls, search icon)
 * - Bottom: 320px (clears captions, music tickers, engagement buttons)
 * - Left & Right: 90px (clears screen edge and action icon margins)
 */
export const SafeZoneContainer: React.FC<SafeZoneContainerProps> = ({
  children,
  showOverlay = false,
  className = "",
  style = {},
  dir = "ltr",
}) => {
  return (
    <div
      dir={dir}
      style={{
        position: "relative",
        width: "1080px",
        height: "1920px",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {/* Safe Area Inner Container */}
      <div
        style={{
          position: "absolute",
          top: "180px",
          bottom: "320px",
          left: "90px",
          right: "90px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>

      {/* Visual Debug Overlay (Optional) */}
      {showOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            border: "2px dashed rgba(239, 68, 68, 0.4)",
          }}
        >
          {/* Top Danger Zone */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "180px",
              background: "rgba(239, 68, 68, 0.15)",
              borderBottom: "1px solid rgba(239, 68, 68, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(239, 68, 68, 0.8)",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            TOP SAFE MARGIN: 180px
          </div>

          {/* Bottom Danger Zone */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "320px",
              background: "rgba(239, 68, 68, 0.15)",
              borderTop: "1px solid rgba(239, 68, 68, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(239, 68, 68, 0.8)",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            BOTTOM SAFE MARGIN: 320px (Captions & UI)
          </div>

          {/* Left Danger Margin */}
          <div
            style={{
              position: "absolute",
              top: "180px",
              bottom: "320px",
              left: 0,
              width: "90px",
              background: "rgba(239, 68, 68, 0.1)",
              borderRight: "1px solid rgba(239, 68, 68, 0.5)",
            }}
          />

          {/* Right Danger Margin */}
          <div
            style={{
              position: "absolute",
              top: "180px",
              bottom: "320px",
              right: 0,
              width: "90px",
              background: "rgba(239, 68, 68, 0.1)",
              borderLeft: "1px solid rgba(239, 68, 68, 0.5)",
            }}
          />
        </div>
      )}
    </div>
  );
};
