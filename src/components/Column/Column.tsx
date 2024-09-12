// // src/components/Column.tsx
// //Represents a single column in the board.
import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import './Column.css';

interface ColumnProps {
  columnIndex: number;
  onClick: (columnIndex: number) => void;
  column: Array<string>;
  currentPlayer: string;
  gameOver: boolean;
   isAiVsAi: boolean;
}

const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column, currentPlayer, gameOver }) => {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);  // Animation's position index
  const [falling, setFalling] = useState<boolean>(false);  // Indicator if the animation is in progress
  const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);  // Tracks the player's falling piece
  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

  useEffect(() => {
    // Run the animation if animateIndex is set and the animation is in progress
    if (animateIndex !== null && falling) {
      const timeoutId = setTimeout(() => {
        if (animateIndex > 0 && column[animateIndex - 1] === ' ') {
          // Move the animation upward if the next cell is empty
          setAnimateIndex(animateIndex - 1);
        } else {
          // Stop the animation when the first available spot is reached
          setFalling(false);
          onClick(columnIndex);  // Place the piece in the correct spot on the game board
        }
      }, 30);

      return () => clearTimeout(timeoutId);
    }
  }, [animateIndex, falling, onClick, columnIndex, column]);

   // When the mouse enters the column
  const handleMouseEnter = () => {
    const firstEmptyCell = column.findIndex((cell) => cell === ' ');
    if (firstEmptyCell !== -1) {
      setHighlightedCell(firstEmptyCell); // Highlight the first empty cell
    }
  };

  // När musen lämnar kolumnen
  const handleMouseLeave = () => {
    setHighlightedCell(null); // Remove the highlight
  };
  const handleClick = () => {
    if (!falling && !gameOver) {
      const firstEmptyCell = column.findIndex((cell) => cell === ' ');

      if (firstEmptyCell !== -1) {
        // Set the falling piece to the current player
        setFallingPlayer(currentPlayer);
        setAnimateIndex(column.length - 1);  // Start from the bottom (index column.length - 1)
        setFalling(true);  // Start the animation
      }
    }
  };

  return (
    <div
      className="column"
      onClick={falling || gameOver ? undefined : handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {column.map((cell, rowIndex) => (
        <Cell
          key={rowIndex}
          value={falling && rowIndex === animateIndex ? '' : cell}
          isAnimating={falling && rowIndex === animateIndex}
          player={falling && rowIndex === animateIndex ? fallingPlayer! : cell}
          isHighlighted={rowIndex === highlightedCell} // Highlight the cell
          highlightColor={currentPlayer} // Color that matches the player's color
        />
      ))}
    </div>
  );
};

export default Column;

