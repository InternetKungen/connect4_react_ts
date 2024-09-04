// src/components/Cell.tsx
import React from 'react';
import './Cell.css';

interface CellProps {
  value: string;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  return (
    <div className={`cell ${value}`}>
      {value}
    </div>
  );
};

export default Cell;


