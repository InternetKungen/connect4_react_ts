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

const Cell: React.FC<CellProps> = ({ value, isAnimating, isHighlighted, highlightColor, player }) => {
  return (
    <div
      className={`cell ${value} ${isAnimating ? 'falling' : ''} ${isHighlighted ? `highlighted${highlightColor}` : ''}`}
    >
      {!isAnimating && value}
    </div>
  );
};

export default Cell;