// // src/components/GameOverComponent.tsx
// //Displays the game-over message and provides options to reset the game
import React, { useState } from 'react';
import './GameOverComponent.css';
import WinAnimation from '../WinAnimaion/WinAnimation';

interface GameOverComponentProps {
  winner: string | null;
  playerXName: string;
  playerOName: string;
  onReset: () => void;
  onQuit: () => void;
}

const GameOverComponent: React.FC<GameOverComponentProps> = ({ winner, playerXName, playerOName, onReset, onQuit }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onReset();
  };

  const winnerName = winner === 'X' ? playerXName : winner === 'O' ? playerOName : null;

  return (
    <div className="game-over">
      {isModalOpen && (
        <WinAnimation 
          winner={winnerName} 
          winnerSymbol={winner}
          onClose={handleCloseModal} 
          onQuit={onQuit} 
        />
      )}
    </div>
  );
};

export default GameOverComponent;





