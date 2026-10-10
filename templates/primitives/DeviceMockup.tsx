import React from "react";

export interface DeviceMockupProps {
  type?: "browser" | "terminal" | "phone";
  title?: string;
  url?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  type = "browser",
  title = "Dashboard",
  url = "app.domain.com",
  children,
  className = "",
  style = {},
}) => {
  if (type === "terminal") {
    return (
      <div
        className={`rounded-xl border border-slate-700/60 bg-slate-950/90 shadow-2xl backdrop-blur-md overflow-hidden text-slate-200 font-mono ${className}`}
        style={style}
      >
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-3 bg-slate-900/80 border-b border-slate-800">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs text-slate-400 font-medium tracking-wide">
            {title || "bash - terminal"}
          </div>
        </div>
        {/* Terminal Body */}
        <div className="p-5">{children}</div>
      </div>
    );
  }

  if (type === "phone") {
    return (
      <div
        className={`relative rounded-[40px] border-4 border-slate-700 bg-slate-950 shadow-2xl overflow-hidden ${className}`}
        style={{
          width: "360px",
          height: "720px",
          ...style,
        }}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
        </div>
        {/* Screen Area */}
        <div className="w-full h-full pt-10 overflow-hidden">{children}</div>
      </div>
    );
  }

  // Default: Browser Window
  return (
    <div
      className={`rounded-2xl border border-slate-800/80 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden ${className}`}
      style={style}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800/60">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>

        {/* URL Address Pill */}
        <div className="flex items-center space-x-1.5 px-4 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 font-medium">
          <span className="text-emerald-400">🔒</span>
          <span>{url}</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Viewport Content */}
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
};
