"use client";

import { useState, useCallback } from "react";

export type Side = "a" | "n";
export type Screen = "choose" | "game" | "win";
export type Board = (Side | null)[];

const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const QUOTES = {
  a: [
    "The cosmos favors the precise.",
    "Written in the stars.",
    "Patience and power — unstoppable.",
    "The night sky never rushes, yet always wins.",
    "Cool minds dominate.",
  ],
  n: [
    "The fire burned brightest today.",
    "Chaos wins again.",
    "Raw energy conquers all.",
    "Where logic ends, Neura begins.",
    "Unleash the neural storm.",
  ],
  draw: [
    "Balance is restored.",
    "Neither side yields.",
    "The universe remains in equilibrium.",
    "A perfect stalemate.",
    "Wisdom and fire in harmony.",
  ],
};

function findWinningMove(board: Board, side: Side): number | null {
  for (const [a, b, c] of WIN_COMBOS) {
    const values = [board[a], board[b], board[c]];
    if (values.filter((v) => v === side).length === 2 && values.includes(null)) {
      return [a, b, c][values.indexOf(null)];
    }
  }
  return null;
}

function checkWinner(board: Board): { winner: Side | "draw" | null; combo: number[] | null } {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Side, combo };
    }
  }
  if (!board.includes(null)) return { winner: "draw", combo: null };
  return { winner: null, combo: null };
}

export interface GameState {
  board: Board;
  player: Side | null;
  ai: Side | null;
  currentPlayer: Side;
  gameActive: boolean;
  scores: { a: number; n: number; draw: number };
  winningCombo: number[] | null;
  winResult: Side | "draw" | null;
  screen: Screen;
  quote: string;
  poppingCell: number | null;
}

const initialState = (): GameState => ({
  board: Array(9).fill(null),
  player: null,
  ai: null,
  currentPlayer: "a",
  gameActive: false,
  scores: { a: 0, n: 0, draw: 0 },
  winningCombo: null,
  winResult: null,
  screen: "choose",
  quote: "",
  poppingCell: null,
});

export function useGameLogic() {
  const [state, setState] = useState<GameState>(initialState);

  const applyMove = useCallback(
    (board: Board, index: number, side: Side): Board => {
      const next = [...board];
      next[index] = side;
      return next;
    },
    []
  );

  const resolveAfterMove = useCallback(
    (
      board: Board,
      currentScores: { a: number; n: number; draw: number },
      playerSide: Side,
      aiSide: Side
    ): Partial<GameState> => {
      const { winner, combo } = checkWinner(board);
      if (winner) {
        const newScores = { ...currentScores };
        if (winner !== "draw") newScores[winner]++;
        else newScores.draw++;

        const quoteList =
          winner === "draw" ? QUOTES.draw : QUOTES[winner as Side];
        const quote = quoteList[Math.floor(Math.random() * quoteList.length)];

        return {
          board,
          gameActive: false,
          winningCombo: combo,
          winResult: winner,
          scores: newScores,
          quote,
          screen: "win",
        };
      }
      return { board };
    },
    []
  );

  const scheduleAIMove = useCallback(
    (
      board: Board,
      aiSide: Side,
      playerSide: Side,
      scores: { a: number; n: number; draw: number }
    ) => {
      setTimeout(() => {
        let move: number | null = null;

        move = findWinningMove(board, aiSide);
        if (move === null) move = findWinningMove(board, playerSide);
        if (move === null && board[4] === null) move = 4;
        if (move === null) {
          const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
          if (corners.length > 0)
            move = corners[Math.floor(Math.random() * corners.length)];
        }
        if (move === null) {
          const available = board
            .map((v, i) => (v === null ? i : null))
            .filter((v): v is number => v !== null);
          if (available.length > 0)
            move = available[Math.floor(Math.random() * available.length)];
        }

        if (move === null) return;

        const finalMove = move;
        setState((prev) => {
          if (!prev.gameActive) return prev;
          const newBoard = applyMove(prev.board, finalMove, aiSide);
          const resolution = resolveAfterMove(newBoard, prev.scores, playerSide, aiSide);
          const isGameOver = !!resolution.winResult || !!resolution.screen;

          return {
            ...prev,
            ...resolution,
            poppingCell: finalMove,
            currentPlayer: isGameOver ? prev.currentPlayer : playerSide,
          };
        });

        setTimeout(() => {
          setState((prev) => ({ ...prev, poppingCell: null }));
        }, 350);
      }, 600);
    },
    [applyMove, resolveAfterMove]
  );

  const startGame = useCallback(
    (playerSide: Side) => {
      const aiSide: Side = playerSide === "a" ? "n" : "a";
      const board: Board = Array(9).fill(null);

      setState((prev) => ({
        ...initialState(),
        scores: prev.scores,
        board,
        player: playerSide,
        ai: aiSide,
        currentPlayer: "a",
        gameActive: true,
        screen: "game",
      }));

      if (aiSide === "a") {
        scheduleAIMove(board, aiSide, playerSide, { a: 0, n: 0, draw: 0 });
      }
    },
    [scheduleAIMove]
  );

  const handleCellClick = useCallback(
    (index: number) => {
      setState((prev) => {
        if (!prev.gameActive) return prev;
        if (prev.board[index] !== null) return prev;
        if (prev.currentPlayer !== prev.player) return prev;

        const newBoard = applyMove(prev.board, index, prev.player!);
        const resolution = resolveAfterMove(newBoard, prev.scores, prev.player!, prev.ai!);
        const isGameOver = !!resolution.winResult;

        if (!isGameOver) {
          // Schedule AI move after state update
          setTimeout(() => {
            setState((s) => {
              if (!s.gameActive) return s;
              return { ...s, currentPlayer: s.ai! };
            });
            scheduleAIMove(newBoard, prev.ai!, prev.player!, prev.scores);
          }, 0);
        }

        return {
          ...prev,
          ...resolution,
          poppingCell: index,
          currentPlayer: isGameOver ? prev.currentPlayer : prev.ai!,
        };
      });

      setTimeout(() => {
        setState((prev) => ({ ...prev, poppingCell: null }));
      }, 350);
    },
    [applyMove, resolveAfterMove, scheduleAIMove]
  );

  const resetGame = useCallback(() => {
    setState((prev) => {
      const board: Board = Array(9).fill(null);
      const newState: GameState = {
        ...prev,
        board,
        currentPlayer: "a",
        gameActive: true,
        winningCombo: null,
        winResult: null,
        screen: "game",
        poppingCell: null,
      };

      if (prev.ai === "a") {
        scheduleAIMove(board, prev.ai!, prev.player!, prev.scores);
      }

      return newState;
    });
  }, [scheduleAIMove]);

  const goToChoose = useCallback(() => {
    setState((prev) => ({ ...prev, screen: "choose" }));
  }, []);

  return { state, startGame, handleCellClick, resetGame, goToChoose };
}
