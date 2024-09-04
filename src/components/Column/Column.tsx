// src/components/Column.tsx
//Represents a single column in the board.
import React from 'react';
import Cell from '../Cell/Cell';
import './Column.css';

interface ColumnProps {
  columnIndex: number;
  onClick: (columnIndex: number) => void;
  column: Array<string>;
}

const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
  // Handler function to call onClick with columnIndex
  const handleClick = () => {
    onClick(columnIndex);
  };

  return (
    <div className="column" onClick={handleClick}>
      {column.map((cell, rowIndex) => (
        <Cell key={rowIndex} value={cell} />
      ))}
    </div>
  );
};

export default Column;


