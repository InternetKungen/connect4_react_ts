// // src/components/Column.tsx
// //Represents a single column in the board.
import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import './Column.css';
import useSound from '../../hooks/useSound';

/*import Sounds*/
import clickColumnFlare from '../../assets/sounds/clickColumnFlare.mp3';
import columnRelease from '../../assets/sounds/columnRelease.mp3';
import blockChangeSound from '../../assets/sounds/blockChange.mp3';
import cellSound from '../../assets/sounds/cellSound.mp3';

interface ColumnProps {
  columnIndex: number;
  onClick: (columnIndex: number) => void;
  column: Array<string>;
  currentPlayer: string;
  gameOver: boolean;
}

const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column, currentPlayer, gameOver }) => {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);  // Animation's position index
  const [falling, setFalling] = useState<boolean>(false);  // Indicator if the animation is in progress
  const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);  // Tracks the player's falling piece
  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

  /*Bind Sounds*/
  const {playSound:playClickColumnFlare} = useSound(clickColumnFlare, 0.6);
  const {playSound:playColumnReleaseSound }= useSound(columnRelease, 1);
  const {playSound:playBlockChangeSound} = useSound(blockChangeSound, 0.6);
  const {playSound:playCellSound} = useSound(cellSound, 0.1);

  const handleClick = () => {
    if (!falling && !gameOver) {
      playClickColumnFlare();
      playColumnReleaseSound(); // Play the sound when the column is clicked
      const firstEmptyCell = column.findIndex((cell) => cell === ' ');

      if (firstEmptyCell !== -1) {
        // Set the falling piece to the current player
        setFallingPlayer(currentPlayer);
        setAnimateIndex(column.length - 1);  // Start from the bottom (index column.length - 1)
        setFalling(true);  // Start the animation
      }
    }
  };

  useEffect(() => {
    // Run the animation if animateIndex is set and the animation is in progress
    if (animateIndex !== null && falling) {
      const timeoutId = setTimeout(() => {
        if (animateIndex > 0 && column[animateIndex - 1] === ' ') {
          playCellSound();  // Play the cell sound
          // Move the animation upward if the next cell is empty
          setAnimateIndex(animateIndex - 1);
        } else {
          // Stop the animation when the first available spot is reached
          setFalling(false);
          playBlockChangeSound();  // Play the block change sound
          onClick(columnIndex);  // Place the piece in the correct spot on the game board
        }
      }, 40);

      return () => clearTimeout(timeoutId);
    }
  }, [animateIndex, falling, onClick, columnIndex, column, playCellSound, playBlockChangeSound]);

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

