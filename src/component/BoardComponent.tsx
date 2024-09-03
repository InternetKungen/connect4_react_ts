// src/components/BoardComponent.tsx
//Renders the visual representation of the game board

import React from 'react';
import Column from './Column';
import Board from '../classes/Board';
// Definse the type for the props that the BoardComponent expects to receive
interface BoardProps {
  board: Board;
  onColumnClick: (column: number) => void;
}

const BoardComponent: React.FC<BoardProps> = ({ board, onColumnClick }) => {
  return (
    <div className='board'>
      {board.matrix[0].map((_, columnIndex) => (
        <Column
          key={columnIndex}
          columnIndex={columnIndex}
          onClick={() => onColumnClick(columnIndex)}
          column={board.matrix.map((row) => row[columnIndex]).reverse()} // Reverse each column's rows for proper display
        />
      ))}
    </div>
  );
};

export default BoardComponent;
