// src/components/Cell.tsx
import React from 'react';
import './Cell.css';

interface CellProps {
  value: string;
  isAnimating?: boolean;
  player?: string; 
}

const Cell: React.FC<CellProps> = ({ value, isAnimating }) => {
  return (
    <div className={`cell ${value} ${isAnimating ? 'falling' : ''}`}>
      {!isAnimating && value}
    </div>
  );
};

export default Cell;