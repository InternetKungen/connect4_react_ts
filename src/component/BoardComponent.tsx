// src/components/BoardComponent.tsx
//Renders the visual representation of the game board

import React from 'react';
import Column from './Column';
import Board from '../classes/Board';
// Defines the type for the props that the BoardComponent expects to receive
interface BoardProps {
  board: Board; // The board object representing the current state of the game
  onColumnClick: (column: number) => void; // A function to handle when a column is clicked
}
// Component with props of type BoardProps
const BoardComponent: React.FC<BoardProps> = ({ board, onColumnClick }) => {
  return (
    // The container for the entire game board
    <div className='board'>
      {/* Iterate over the columns in the first row of the board's matrix */}
      {board.matrix[0].map((_, columnIndex) => (
        // Render a Column component for each column index
        <Column
          key={columnIndex}
          columnIndex={columnIndex}
          onClick={() => onColumnClick(columnIndex)} // click handler to handle clicks on this column
          column={board.matrix.map((row) => row[columnIndex]).reverse()} // Pass the column data to the Column component, reversed for proper visual display
        />
      ))}
    </div>
  );
};

export default BoardComponent;
