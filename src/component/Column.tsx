// src/components/Column.tsx
// This component represents a single column in the board, responsible for rendering the column
// and handling click events to place a disc
import React from 'react';
import Cell from './Cell';
// Interface defining the props for the Column component
interface ColumnProps {
  columnIndex: number;
  onClick: (columnIndex: number) => void;
  column: Array<string>;
}
// Component to render a column in the Connect-4 board
const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
  // Handler function to call onClick with columnIndex
  const handleClick = () => {
    onClick(columnIndex);
  };

  return (
    // Render the column, which is clickable
    <div className='column' onClick={handleClick}>
      {/* Map through the cells in the column and render each using the Cell component */}
      {column.map((cell, rowIndex) => (
        <Cell key={rowIndex} value={cell} />
      ))}
    </div>
  );
};

export default Column;
