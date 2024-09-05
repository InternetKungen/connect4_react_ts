// // src/components/Column.tsx
// //Represents a single column in the board.
import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import './Column.css';

interface ColumnProps {
  columnIndex: number;
  onClick: (columnIndex: number) => void;
  column: Array<string>;
  currentPlayer: string;  // Nytt: Lägger till nuvarande spelare
}

const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column, currentPlayer }) => {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);  // Index för animationens position
  const [falling, setFalling] = useState<boolean>(false);  // Indikator om animationen pågår
  const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);  // Håller reda på spelarens pjäs som faller

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

  const handleClick = () => {
    if (!falling) {
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
    <div className="column" onClick={falling ? undefined : handleClick}>
      {column.map((cell, rowIndex) => (
        <Cell
          key={rowIndex}
          value={falling && rowIndex === animateIndex ? '' : cell}  // Visa inget tecken under fallet
          isAnimating={falling && rowIndex === animateIndex}
          player={falling && rowIndex === animateIndex ? fallingPlayer! : cell}  // Sätt spelarens CSS-klass under animationen
        />
      ))}
    </div>
  );
};

export default Column;

