# Athena vs Neura — Next.js Tic-Tac-Toe

## Project Structure

```
athena-neura/
├── app/
│   ├── globals.css        # Tailwind + custom animations
│   ├── layout.tsx         # Root layout with font meta
│   └── page.tsx           # Entry point → mounts TicTacToe
├── components/
│   ├── useGameLogic.ts    # All game state & AI logic (custom hook)
│   ├── StarCanvas.tsx     # Animated starfield background
│   ├── ChooseScreen.tsx   # Side selection screen
│   ├── GameScreen.tsx     # Board + turn indicators
│   ├── WinScreen.tsx      # Results + score tracking
│   └── TicTacToe.tsx      # Root orchestrator component
├── tailwind.config.ts     # Custom font extensions
└── README.md
```

## Setup

```bash
npx create-next-app@latest my-game --typescript --tailwind --app
cd my-game

# Copy the files from this folder into your project,
# then install fonts (already loaded via Google Fonts in globals.css)

npm run dev
```

## How it works

- **`useGameLogic`** — pure hook with no DOM deps; holds all state and AI strategy
- **AI strategy**: win → block → center → corner → random
- **`StarCanvas`** — RAF-based canvas animation, cleans up on unmount
- Screen transitions are plain conditional renders (no router needed)
- Scores persist across rounds within a session
