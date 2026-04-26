"use client";

import type { Side } from "./useGameLogic";

interface Props {
  onChoose: (side: Side) => void;
}

export default function ChooseScreen({ onChoose }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-10 max-w-6xl mx-auto overflow-x-hidden">
      
      {/* Subtitle */}
      <p className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#4a4a6a] uppercase font-orbitron text-center mb-2">
        Choose your side
      </p>

      {/* Main Title Section - Scaled for all viewports */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 w-full mb-8">
        <h1 className="font-orbitron font-black text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter sm:tracking-tight uppercase text-[#5ba8ff] whitespace-nowrap leading-none">
          Athena
        </h1>
        
        <span className="font-orbitron text-[8px] sm:text-xs font-bold text-[#4a4a6a] tracking-wider border border-white/10 px-2 py-1 rounded shrink-0">
          VS
        </span>
        
        <h1 className="font-orbitron font-black text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter sm:tracking-tight uppercase text-[#ff7c1a] whitespace-nowrap leading-none">
          Neura
        </h1>
      </div>

      {/* Cards Grid - Restricted to 4xl so they don't get too wide on laptop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Athena Card */}
        <button
          onClick={() => onChoose("a")}
          className="group relative rounded-2xl p-6 sm:p-10 flex flex-col items-center gap-4 overflow-hidden border border-[rgba(91,168,255,0.25)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(91,168,255,0.18),0_0_0_1px_rgba(91,168,255,0.4)] active:scale-[0.97]"
          style={{
            background: "linear-gradient(160deg, #0d1e38 0%, #060d1a 60%, #03060e 100%)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 opacity-[0.12] group-hover:opacity-[0.22] transition-opacity pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% -10%, #5ba8ff, transparent 70%)" }}
          />
          <div className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, #5ba8ff, transparent)", opacity: 0.6 }}
          />

          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-orbitron font-black text-2xl sm:text-3xl relative z-10"
            style={{
              background: "radial-gradient(circle, #0e2a50 0%, #060e1e 100%)",
              border: "1.5px solid rgba(91,168,255,0.5)",
              color: "#8ecfff",
              boxShadow: "0 0 20px rgba(91,168,255,0.25), inset 0 0 20px rgba(91,168,255,0.08)",
            }}
          >
            A
          </div>

          <p className="font-orbitron font-bold text-xl sm:text-2xl tracking-widest uppercase text-[#8ecfff] relative z-10">
            Athena
          </p>
          <p className="text-sm text-[#4a4a6a] text-center leading-relaxed relative z-10 max-w-[220px]">
            Wisdom of the night sky. Calm, precise, inevitable.
          </p>

          <span
            className="relative z-10 mt-2 px-8 py-3 rounded-full font-orbitron font-bold text-[10px] sm:text-xs tracking-wider uppercase transition-all"
            style={{
              background: "linear-gradient(135deg, #1e4a8a, #2a6ac0)",
              color: "#c8e4ff",
              boxShadow: "0 4px 20px rgba(91,168,255,0.3)",
            }}
          >
            Play as Athena
          </span>
        </button>

        {/* Neura Card */}
        <button
          onClick={() => onChoose("n")}
          className="group relative rounded-2xl p-6 sm:p-10 flex flex-col items-center gap-4 overflow-hidden border border-[rgba(255,124,26,0.25)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,124,26,0.18),0_0_0_1px_rgba(255,124,26,0.4)] active:scale-[0.97]"
          style={{
            background: "linear-gradient(160deg, #2a1000 0%, #160800 60%, #0a0400 100%)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 opacity-[0.12] group-hover:opacity-[0.22] transition-opacity pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% -10%, #ff7c1a, transparent 70%)" }}
          />
          <div className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, #ff7c1a, transparent)", opacity: 0.6 }}
          />

          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-orbitron font-black text-2xl sm:text-3xl relative z-10"
            style={{
              background: "radial-gradient(circle, #3a1a00 0%, #180900 100%)",
              border: "1.5px solid rgba(255,124,26,0.5)",
              color: "#ffab60",
              boxShadow: "0 0 20px rgba(255,124,26,0.25), inset 0 0 20px rgba(255,124,26,0.08)",
            }}
          >
            N
          </div>

          <p className="font-orbitron font-bold text-xl sm:text-2xl tracking-widest uppercase text-[#ffab60] relative z-10">
            Neura
          </p>
          <p className="text-sm text-[#4a4a6a] text-center leading-relaxed relative z-10 max-w-[220px]">
            Raw neural fire. Chaotic, blazing, relentless.
          </p>

          <span
            className="relative z-10 mt-2 px-8 py-3 rounded-full font-orbitron font-bold text-[10px] sm:text-xs tracking-wider uppercase transition-all"
            style={{
              background: "linear-gradient(135deg, #8a3800, #c05a00)",
              color: "#ffd4a8",
              boxShadow: "0 4px 20px rgba(255,124,26,0.3)",
            }}
          >
            Play as Neura
          </span>
        </button>
      </div>

      {/* Footer Text */}
      <p className="text-[10px] sm:text-xs text-[#4a4a6a] tracking-wide text-center max-w-xs mt-8 opacity-70">
        Pick your side and challenge the AI opponent in a battle of strategy
      </p>
    </div>
  );
}