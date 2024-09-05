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
}

const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column, currentPlayer, gameOver }) => {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);  // Index för animationens position
  const [falling, setFalling] = useState<boolean>(false);  // Indikator om animationen pågår
  const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);  // Håller reda på spelarens pjäs som faller
  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

  useEffect(() => {
    // Kör animationen om `animateIndex` är satt och om animationen pågår
    if (animateIndex !== null && falling) {
      const timeoutId = setTimeout(() => {
        if (animateIndex > 0 && column[animateIndex - 1] === ' ') {
          // Flytta animeringen uppåt om nästa cell är tom
          setAnimateIndex(animateIndex - 1);
        } else {
          // Stoppa animeringen när vi når den första lediga platsen
          setFalling(false);
          onClick(columnIndex);  // Lägger pjäsen på korrekt plats i spelet
        }
      }, 30);

      return () => clearTimeout(timeoutId);
    }
  }, [animateIndex, falling, onClick, columnIndex, column]);

   // När musen går in i kolumnen
  const handleMouseEnter = () => {
    const firstEmptyCell = column.findIndex((cell) => cell === ' ');
    if (firstEmptyCell !== -1) {
      setHighlightedCell(firstEmptyCell); // Markera första tomma cellen
    }
  };

  // När musen lämnar kolumnen
  const handleMouseLeave = () => {
    setHighlightedCell(null); // Ta bort markeringen
  };
  const handleClick = () => {
    if (!falling && !gameOver) {
      const firstEmptyCell = column.findIndex((cell) => cell === ' ');
      
      if (firstEmptyCell !== -1) {
        // Sätt den fallande pjäsen till aktuell spelare
        setFallingPlayer(currentPlayer);
        setAnimateIndex(column.length - 1);  // Börja från botten (index column.length - 1)
        setFalling(true);  // Starta animeringen
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
          isHighlighted={rowIndex === highlightedCell} // Markera cellen
          highlightColor={currentPlayer} // Färg som matchar spelarens färg
        />
      ))}
    </div>
  );
};

export default Column;

