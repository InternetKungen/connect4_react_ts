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
  isAiVsAi: boolean; // Added to handle AI vs AI logic
}

const BoardComponent: React.FC<BoardProps> = ({ board, onColumnClick, isLocked, isAiVsAi }) => {
  return (
    <div className={`board ${isLocked ? 'locked' : ''} ${isAiVsAi ? 'ai-vs-ai' : ''}`}>
      {board.matrix[0].map((_, columnIndex) => (
        <Column
          key={columnIndex}
          columnIndex={columnIndex}
          onClick={() => !isAiVsAi && onColumnClick(columnIndex)} // Prevent user clicks in AI vs AI mode
          column={board.matrix.map(row => row[columnIndex]).reverse()}
          currentPlayer={board.currentPlayerColor}
          gameOver={board.gameOver} // Pass gameOver to columns
          isAiVsAi={isAiVsAi} // Optionally pass AI vs AI state if needed in Column component
        />
      ))}
    </div>
  );
};

export default BoardComponent;



