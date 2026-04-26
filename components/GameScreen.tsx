"use client";

import type { GameState } from "./useGameLogic";

interface Props {
  state: GameState;
  onCellClick: (index: number) => void;
  onReset: () => void;
}

export default function GameScreen({ state, onCellClick, onReset }: Props) {
  const { board, player, ai, currentPlayer, gameActive, winningCombo, poppingCell } = state;

  const isPlayerTurn = currentPlayer === player;

  const getCellLabel = (val: "a" | "n" | null) => {
    if (val === "a") return "A";
    if (val === "n") return "N";
    return "";
  };

  const getCellClasses = (index: number, val: "a" | "n" | null) => {
    const base =
      "aspect-square rounded-2xl flex items-center justify-center font-orbitron font-black text-5xl sm:text-6xl cursor-pointer transition-all duration-200 relative overflow-hidden select-none";

    const isWin = winningCombo?.includes(index);
    const isPopping = poppingCell === index;

    if (val === "a") {
      return `${base} text-[#8ecfff] bg-[rgba(30,60,120,0.4)] border border-[rgba(91,168,255,0.4)] ${
        isWin ? "animate-win-pulse" : ""
      } ${isPopping ? "animate-cell-pop" : ""}`;
    }
    if (val === "n") {
      return `${base} text-[#ffab60] bg-[rgba(120,60,30,0.4)] border border-[rgba(255,124,26,0.4)] ${
        isWin ? "animate-win-pulse" : ""
      } ${isPopping ? "animate-cell-pop" : ""}`;
    }

    const hoverClass =
      gameActive && isPlayerTurn
        ? player === "a"
          ? "hover:bg-[rgba(40,70,130,0.7)] hover:border-[rgba(91,168,255,0.6)] active:scale-95"
          : "hover:bg-[rgba(130,70,40,0.7)] hover:border-[rgba(255,124,26,0.6)] active:scale-95"
        : "";

    return `${base} bg-[rgba(20,30,60,0.6)] border border-white/[0.07] ${hoverClass}`;
  };

  const indicatorClass =
    currentPlayer === "a"
      ? "w-3 h-3 rounded-full bg-[#5ba8ff] shadow-[0_0_12px_rgba(91,168,255,0.5)] transition-all duration-300"
      : "w-3 h-3 rounded-full bg-[#ff7c1a] shadow-[0_0_12px_rgba(255,124,26,0.5)] transition-all duration-300";

  const statusText = gameActive
    ? isPlayerTurn
      ? "Your turn"
      : "AI is thinking..."
    : "";

  return (
    <div className="flex flex-col items-center gap-4 w-full px-4 pt-8 sm:pt-12">
      {/* Header */}
      <div
        className="flex justify-between items-center w-full max-w-[500px] p-4 rounded-xl border border-white/[0.07]"
        style={{
          background: "rgba(3,3,10,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-orbitron font-bold text-base sm:text-lg tracking-widest uppercase text-[#5ba8ff]">
            Athena
          </span>
          <span className="text-xs text-[#4a4a6a] font-medium">
            {currentPlayer === "a"
              ? player === "a"
                ? "Your turn"
                : "AI thinking..."
              : player === "a"
              ? "Waiting..."
              : "Your turn"}
          </span>
        </div>

        <div className={indicatorClass} />

        <div className="flex flex-col items-center gap-1">
          <span className="font-orbitron font-bold text-base sm:text-lg tracking-widest uppercase text-[#ff7c1a]">
            Neura
          </span>
          <span className="text-xs text-[#4a4a6a] font-medium">
            {currentPlayer === "n"
              ? player === "n"
                ? "Your turn"
                : "AI thinking..."
              : player === "n"
              ? "Waiting..."
              : "Your turn"}
          </span>
        </div>
      </div>

      {/* Status */}
      <p className="font-orbitron text-base sm:text-lg font-semibold text-[#4a4a6a] tracking-wide min-h-6">
        {statusText}
      </p>

      {/* Board */}
      <div
        className="grid grid-cols-3 gap-3 sm:gap-4 w-[min(90vw,450px)] aspect-square p-4 sm:p-5 rounded-2xl border border-white/[0.07]"
        style={{
          background: "rgba(10,15,30,0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {board.map((val, index) => (
          <div
            key={index}
            className={getCellClasses(index, val)}
            onClick={() => val === null && gameActive && onCellClick(index)}
            style={
              val === "a"
                ? { textShadow: "0 0 15px rgba(91,168,255,0.35)" }
                : val === "n"
                ? { textShadow: "0 0 15px rgba(255,124,26,0.35)" }
                : {}
            }
          >
            {getCellLabel(val)}
          </div>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="mt-2 font-orbitron font-bold text-xs tracking-[0.15em] uppercase px-10 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white/50 cursor-pointer transition-all hover:border-white/35 hover:text-white/85 hover:bg-white/[0.08] active:scale-[0.96]"
      >
        New Game
      </button>
    </div>
  );
}
