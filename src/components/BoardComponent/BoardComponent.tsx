// src/components/BoardComponent.tsx
//Renders the visual representation of the game board

import React from 'react';
import Column from '../Column/Column';
import Board from '../../classes/Board';
import './BoardComponent.css';

interface BoardProps {
  board: Board;
  onColumnClick: (column: number) => void;
  isLocked: boolean;
}

const BoardComponent: React.FC<BoardProps> = ({ board, onColumnClick, isLocked }) => {
  return (
    <div className={`board ${isLocked ? 'locked' : ''}`}>
      {board.matrix[0].map((_, columnIndex) => (
        <Column
          key={columnIndex}
          columnIndex={columnIndex}
          onClick={() => onColumnClick(columnIndex)}
          column={board.matrix.map(row => row[columnIndex]).reverse()}
          currentPlayer={board.currentPlayerColor}
          gameOver={board.gameOver} // Skickar gameOver till kolumnerna
        />
      ))}
    </div>
  );
};

export default BoardComponent;


