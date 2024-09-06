// src/components/GameOverComponent.tsx
// Displays the game-over message and provides options to reset the game
import React from 'react';

interface GameOverComponentProps {
  winner: string | null; // The winner can be either 'X', 'O', or null (for a tie)
  onReset: () => void; // A function to handle resetting the game
}

const GameOverComponent: React.FC<GameOverComponentProps> = ({
  winner,
  onReset,
}) => {
  return (
    <div className='game-over'>
      {winner ? <>Player {winner} has won!</> : <>It's a tie!</>}
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default GameOverComponent;
