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
      className={`cell ${value} ${isAnimating ? 'falling' : ''} ${isHighlighted ? `highlighted${highlightColor}` : ''}`} // cell.highlighted.X collide with styles cell.X and cell.O
      // style={isHighlighted ? { backgroundColor: highlightColor } : {}} // highlightColor is 'X' or 'O' - there's no such color.
    >
      {!isAnimating && value}
    </div>
  );
};

export default Cell;