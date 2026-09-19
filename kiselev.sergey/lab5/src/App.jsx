import {useEffect, useState} from "react";

import Board from "./components/Board.jsx";
import {chooseComputerMove} from "./ai.js";
import {createEmptyBoard, findWinner, isBoardFull} from "./game.js";

const COMPUTER_MARK = "O";

const COMPUTER_DELAY = 500;

export default function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [current, setCurrent] = useState("X");
  const [mode, setMode] = useState("computer");

  const winner = findWinner(board);
  const isDraw = winner === null && isBoardFull(board);
  const isFinished = winner !== null || isDraw;
  const isComputerTurn = mode === "computer" && current === COMPUTER_MARK && !isFinished;

  useEffect(() => {
    if (!isComputerTurn) {
      return undefined;
    }

    const timer = setTimeout(() => {
      const index = chooseComputerMove(board, COMPUTER_MARK);
      const next = board.slice();
      next[index] = COMPUTER_MARK;

      setBoard(next);
      setCurrent("X");
    }, COMPUTER_DELAY);

    return () => clearTimeout(timer);
  }, [isComputerTurn, board]);

  function handleSelect(index) {
    if (isFinished || isComputerTurn || board[index] !== null) {
      return;
    }

    const next = board.slice();
    next[index] = current;

    setBoard(next);
    setCurrent(current === "X" ? "O" : "X");
  }

  function handleRestart() {
    setBoard(createEmptyBoard());
    setCurrent("X");
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setBoard(createEmptyBoard());
    setCurrent("X");
  }

  let status = `Ходят ${current === "X" ? "крестики" : "нолики"}`;

  if (winner !== null) {
    status = `Победили ${winner.mark === "X" ? "крестики" : "нолики"}`;
  } else if (isDraw) {
    status = "Ничья";
  } else if (isComputerTurn) {
    status = "Компьютер думает";
  }

  return (
    <main className="app" data-testid="app">
      <h1 className="app-title">Крестики-нолики</h1>

      <p className="game-status" data-testid="game-status">
        {status}
      </p>

      <div className="mode-panel">
        <button
          type="button"
          className="mode-button"
          data-testid="mode-computer"
          aria-pressed={mode === "computer"}
          onClick={() => handleModeChange("computer")}
        >
          С компьютером
        </button>
        <button
          type="button"
          className="mode-button"
          data-testid="mode-human"
          aria-pressed={mode === "human"}
          onClick={() => handleModeChange("human")}
        >
          Вдвоём
        </button>
      </div>

      <Board board={board} winningLine={winner?.line} onSelect={handleSelect} />

      <button
        type="button"
        className="game-restart"
        data-testid="game-restart"
        onClick={handleRestart}
      >
        Новая игра
      </button>
    </main>
  );
}