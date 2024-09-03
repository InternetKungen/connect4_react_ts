// src/components/BoardComponent.tsx
//Renders the visual representation of the game board

import React from 'react';
import Column from '../Column/Column';
import Board from '../../classes/Board';

interface BoardProps {
  board: Board;
  onColumnClick: (column: number) => void;
}

const BoardComponent: React.FC<BoardProps> = ({ board, onColumnClick }) => {
  return (
    <div className="board">
      {board.matrix[0].map((_, columnIndex) => (
        <Column
          key={columnIndex}
          columnIndex={columnIndex}
          onClick={onColumnClick}
          column={board.matrix.map(row => row[columnIndex]).reverse()}  
        />
      ))}
    </div>
  );
};

export default BoardComponent;


