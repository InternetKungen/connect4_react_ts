// src/components/Cell.tsx
import React from 'react';
import './Cell.css';

interface CellProps {
  value: string;
  isAnimating?: boolean;
  player?: string; 
  isHighlighted?: boolean;
  highlightColor?: string;
}

const Cell: React.FC<CellProps> = ({ value, isAnimating, isHighlighted, highlightColor }) => {
  return (
    <div
      className={`cell ${value} ${isAnimating ? 'falling' : ''} ${isHighlighted ? 'highlighted' : ''}`}
      style={isHighlighted ? { backgroundColor: highlightColor } : {}}
    >
      {!isAnimating && value}
    </div>
  );
};

export default Cell;