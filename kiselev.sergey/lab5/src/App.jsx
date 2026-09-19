import {useState} from "react";

import Board from "./components/Board.jsx";
import {createEmptyBoard, findWinner, isBoardFull} from "./game.js";

export default function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [current, setCurrent] = useState("X");

  const winner = findWinner(board);
  const isDraw = winner === null && isBoardFull(board);
  const isFinished = winner !== null || isDraw;

  function handleSelect(index) {
    if (isFinished || board[index] !== null) {
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

  let status = `Ходят ${current === "X" ? "крестики" : "нолики"}`;

  if (winner !== null) {
    status = `Победили ${winner.mark === "X" ? "крестики" : "нолики"}`;
  } else if (isDraw) {
    status = "Ничья";
  }

  return (
    <main className="app" data-testid="app">
      <h1 className="app-title">Крестики-нолики</h1>

      <p className="game-status" data-testid="game-status">
        {status}
      </p>

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