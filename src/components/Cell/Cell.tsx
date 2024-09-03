// src/components/Cell/Cell.tsx
import React from 'react';
import './Cell.css';  // Ensure the path is correct

interface CellProps {
  value: string;  // Use string directly
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  // Determine the class based on the cell value
  const cellClass = value === 'X' ? 'cell X' : value === 'O' ? 'cell O' : 'cell';

  return (
    <div className={cellClass} onClick={onClick}>
      {/* Do not render the value */}
    </div>
  );
};

export default Cell;



