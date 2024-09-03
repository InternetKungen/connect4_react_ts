// src/components/Column.tsx
import React from 'react';
import Cell from '../Cell/Cell';

interface ColumnProps {
  columnIndex: number;
  onClick: (columnIndex: number) => void;
  column: Array<string>;  // Array of strings
}

const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
  const handleClick = () => {
    onClick(columnIndex);
  };

  return (
    <div className="column" onClick={handleClick}>
      {column.map((cell, rowIndex) => (
        <Cell key={rowIndex} value={cell} onClick={() => { /* Optionally handle click */ }} />
      ))}
    </div>
  );
};

export default Column;



