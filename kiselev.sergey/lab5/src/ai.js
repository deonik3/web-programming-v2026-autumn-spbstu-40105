import {WINNING_LINES, getEmptyCells} from "./game.js";

function findLineMove(board, mark) {
  for (const line of WINNING_LINES) {
    const marks = line.filter((index) => board[index] === mark);
    const empty = line.filter((index) => board[index] === null);

    if (marks.length === 2 && empty.length === 1) {
      return empty[0];
    }
  }

  return null;
}

export function chooseComputerMove(board, mark) {
  const opponent = mark === "X" ? "O" : "X";

  const winningMove = findLineMove(board, mark);

  if (winningMove !== null) {
    return winningMove;
  }

  const blockingMove = findLineMove(board, opponent);

  if (blockingMove !== null) {
    return blockingMove;
  }

  if (board[4] === null) {
    return 4;
  }

  const empty = getEmptyCells(board);

  return empty[Math.floor(Math.random() * empty.length)];
}