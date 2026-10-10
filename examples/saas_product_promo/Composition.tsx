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
import { AnimatedCounter } from "../../templates/primitives/AnimatedCounter";
import { DeviceMockup } from "../../templates/primitives/DeviceMockup";
import { CameraRig } from "../../templates/primitives/CameraRig";

// -----------------------------------------------------------------------------
// Scene 1: The Problem Hook (0s - 3s = 90 frames)
// -----------------------------------------------------------------------------
export const Scene1_Hook: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#090D16] flex flex-col items-center justify-center px-12 text-center">
      {/* Background radial glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
        }}
      />
      
      <div className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-4">
        Workflow Bottlenecks
      </div>

      <KineticText
        text="Still manually deploying your infrastructure?"
        className="text-5xl font-extrabold text-white max-w-3xl leading-tight"
        damping={12}
        mass={0.5}
      />
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 2: Solution Reveal (3s - 8s = 150 frames)
// -----------------------------------------------------------------------------
export const Scene2_Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });

  return (
    <AbsoluteFill className="bg-[#090D16] flex items-center justify-center p-12">
      <CameraRig
        zoom={{ from: 0.95, to: 1.05, durationInFrames: 150 }}
        tiltX={{ from: 12, to: 0, durationInFrames: 60 }}
      >
        <div
          style={{
            transform: `scale(${entrance})`,
            opacity: entrance,
            width: "880px",
          }}
        >
          <DeviceMockup type="browser" title="CloudPulse Dashboard" url="cloudpulse.io/deployments">
            <div className="p-8 bg-[#0B0F19] flex flex-col space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Production Deployment</h3>
                  <p className="text-xs text-slate-400">Region: us-east-1 (Kubernetes Cluster)</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live & Healthy
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs text-slate-400">Response Time</div>
                  <div className="text-2xl font-bold text-indigo-400 mt-1">12ms</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs text-slate-400">Success Rate</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">99.99%</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs text-slate-400">Auto Scaled</div>
                  <div className="text-2xl font-bold text-sky-400 mt-1">48 Nodes</div>
                </div>
              </div>
            </div>
          </DeviceMockup>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 3: Metric Ticker (8s - 12s = 120 frames)
// -----------------------------------------------------------------------------
export const Scene3_Metric: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#090D16] flex flex-col items-center justify-center text-center p-8">
      <div className="text-sm font-semibold tracking-widest text-emerald-400 uppercase mb-3">
        Proven Impact
      </div>

      <div className="text-7xl font-black text-white tracking-tight flex items-baseline">
        <AnimatedCounter
          from={1}
          to={10}
          durationInFrames={60}
          suffix="x"
          className="text-emerald-400 mr-2"
        />
        <span>Faster Delivery</span>
      </div>

      <p className="text-xl text-slate-400 mt-4 max-w-xl">
        Automate your entire release pipeline in minutes, not months.
      </p>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Scene 4: Outro CTA (12s - 15s = 90 frames)
// -----------------------------------------------------------------------------
export const Scene4_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 120 },
  });

  return (
    <AbsoluteFill className="bg-[#090D16] flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6">
        <span className="text-3xl text-white font-black">⚡</span>
      </div>

      <h2 className="text-4xl font-extrabold text-white mb-6">
        Build Faster with CloudPulse
      </h2>

      <div
        style={{
          transform: `scale(${buttonSpring})`,
          opacity: buttonSpring,
        }}
      >
        <button className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-600/40">
          Start Free Trial → cloudpulse.io
        </button>
      </div>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Main Composed Video (Total: 450 frames @ 30fps = 15.0 seconds)
// -----------------------------------------------------------------------------
export const SaasProductPromo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <Scene1_Hook />
      </Series.Sequence>

      <Series.Sequence durationInFrames={150}>
        <Scene2_Solution />
      </Series.Sequence>

      <Series.Sequence durationInFrames={120}>
        <Scene3_Metric />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <Scene4_Outro />
      </Series.Sequence>
    </Series>
  );
};
