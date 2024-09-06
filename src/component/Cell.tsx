// src/components/Cell.tsx
// This component is responsible for rendering a single cell
import React from 'react';

interface CellProps {
  value: string; // The value represents the content of the cell, which could be 'X', 'O', or an empty space ' '
}

const Cell: React.FC<CellProps> = ({ value }) => {
  // Render the cell with a dynamic class name based on the value ('X', 'O', or empty ' ')
  // This class is used to apply different styles (different colors for X and O)
  return <div className={`cell ${value}`}>{value}</div>; // display the actual content of the cell
};

export default Cell;
