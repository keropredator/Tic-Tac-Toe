// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Square from './Square';

function Board() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();

    if (winner || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyPoint.concat([{ squares: currentSquares }]));
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);

    // Check for tie
    if (
      calculateWinner(currentSquares) === null &&
      currentSquares.every((square) => square !== null)
    ) {
      // Use confirm to ask if the user wants to start a new game
      if (window.confirm("It's a tie! Start a new game?")) {
        resetGame(); // Reset the game only if the user clicks OK
      }
    }
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const undoMove = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
      setXIsNext(!xIsNext);
    }
  };

  const redoMove = () => {
    if (stepNumber < history.length - 1) {
      setStepNumber(stepNumber + 1);
      setXIsNext(!xIsNext);
    }
  };

  const renderSquare = (i) => (
    <Square value={current.squares[i]} onClick={() => handleClick(i)} />
  );

  return (
    <div>
      <div className="status">{status}</div>
      <button onClick={resetGame}>Reset Game</button>
      <button onClick={undoMove} disabled={stepNumber === 0}>
        Undo
      </button>
      <button onClick={redoMove} disabled={stepNumber === history.length - 1}>
        Redo
      </button>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
