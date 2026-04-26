"use client";

import type { GameState, Side } from "./useGameLogic";

interface Props {
  state: GameState;
  onPlayAgain: () => void;
}

export default function WinScreen({ state, onPlayAgain }: Props) {
  const { winResult, scores, quote, player } = state;

  const isDraw = winResult === "draw";
  const isPlayerWin = !isDraw && winResult === player;
  const winnerName =
    winResult === "a" ? "Athena" : winResult === "n" ? "Neura" : "Draw";

  const bgGradient = isDraw
    ? "radial-gradient(ellipse 80% 60% at 50% 30%, #1a1a2e 0%, #03030a 70%)"
    : winResult === "a"
    ? "radial-gradient(ellipse 80% 60% at 50% 30%, #091528 0%, #03030a 70%)"
    : "radial-gradient(ellipse 80% 60% at 50% 30%, #1e0900 0%, #03030a 70%)";

  const nameColor = isDraw
    ? "text-[#aaaaaa]"
    : winResult === "a"
    ? "text-[#5ba8ff]"
    : "text-[#ff7c1a]";

  const subtitle = isDraw
    ? "The battle ends in balance"
    : isPlayerWin
    ? "You are victorious!"
    : "The AI prevails";

  return (
    <div
      className="flex flex-col items-center gap-4 w-full px-6 py-10"
      style={{ background: bgGradient }}
    >
      <p className="font-orbitron text-[11px] tracking-[0.35em] text-[#4a4a6a] uppercase">
        Battle Complete
      </p>

      <h2
        className={`font-orbitron font-black text-6xl sm:text-8xl leading-none tracking-tight uppercase ${nameColor} animate-fadein`}
      >
        {winnerName}
      </h2>

      <p
        className={`font-orbitron font-bold text-xs sm:text-sm tracking-[0.3em] uppercase opacity-40 -mt-1 ${
          isDraw ? "text-[#aaaaaa]" : winResult === "a" ? "text-[#5ba8ff]" : "text-[#ff7c1a]"
        }`}
      >
        {subtitle}
      </p>

      <p className="text-sm italic text-[#4a4a6a] max-w-xs text-center leading-relaxed my-2">
        {quote}
      </p>

      {/* Scores */}
      <div className="flex gap-4 flex-wrap justify-center my-2">
        <ScoreBox
          tag="Athena"
          value={scores.a}
          label="Wins"
          accent="#5ba8ff"
          bg="#060e1e"
        />
        <ScoreBox
          tag="Neura"
          value={scores.n}
          label="Wins"
          accent="#ff7c1a"
          bg="#120600"
        />
        <ScoreBox
          tag="Draws"
          value={scores.draw}
          label="Tied"
          accent="#aaaaaa"
          bg="#1a1a2e"
        />
      </div>

      <button
        onClick={onPlayAgain}
        className="mt-2 font-orbitron font-bold text-xs tracking-[0.15em] uppercase px-12 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white/50 cursor-pointer transition-all hover:border-white/35 hover:text-white/85 hover:bg-white/[0.08] active:scale-[0.96]"
      >
        Play Again
      </button>
    </div>
  );
}

function ScoreBox({
  tag,
  value,
  label,
  accent,
  bg,
}: {
  tag: string;
  value: number;
  label: string;
  accent: string;
  bg: string;
}) {
  return (
    <div
      className="relative text-center px-7 sm:px-9 py-5 rounded-2xl border border-white/[0.07] min-w-[110px] sm:min-w-[130px] overflow-hidden"
      style={{ background: bg }}
    >
      {/* top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <p
        className="font-orbitron font-bold text-[10px] tracking-[0.14em] uppercase mb-2"
        style={{ color: accent }}
      >
        {tag}
      </p>
      <p
        className="font-orbitron font-black text-4xl sm:text-5xl leading-none"
        style={{ color: accent }}
      >
        {value}
      </p>
      <p
        className="text-[10px] font-semibold tracking-widest uppercase mt-2 opacity-45"
        style={{ color: accent }}
      >
        {label}
      </p>
    </div>
  );
}
