"use client";

import StarCanvas from "./StarCanvas";
import ChooseScreen from "./ChooseScreen";
import GameScreen from "./GameScreen";
import WinScreen from "./WinScreen";
import { useGameLogic } from "./useGameLogic";

export default function TicTacToe() {
  const { state, startGame, handleCellClick, resetGame, goToChoose } = useGameLogic();

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#03030a] text-[#dde4f0] select-none">
      <StarCanvas />

      {/* Nebulae */}
      <div
        className="fixed rounded-full pointer-events-none z-[1]"
        style={{
          width: "40vw",
          height: "40vw",
          background: "#5ba8ff",
          opacity: 0.04,
          top: "-10vw",
          left: "-10vw",
          filter: "blur(80px)",
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none z-[1]"
        style={{
          width: "35vw",
          height: "35vw",
          background: "#ff7c1a",
          opacity: 0.04,
          bottom: "-8vw",
          right: "-8vw",
          filter: "blur(80px)",
        }}
      />

      {/* Screens */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {state.screen === "choose" && (
          <ChooseScreen onChoose={startGame} />
        )}
        {state.screen === "game" && (
          <GameScreen
            state={state}
            onCellClick={handleCellClick}
            onReset={resetGame}
          />
        )}
        {state.screen === "win" && (
          <WinScreen state={state} onPlayAgain={goToChoose} />
        )}
      </div>
    </div>
  );
}
