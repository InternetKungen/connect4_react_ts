// src/components/GameOverComponent.tsx
//Displays the game-over message and provides options to reset the game
import React, { useState } from 'react';
import './GameOverComponent.css';

// Modal Component
interface ModalProps {
  winner: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ winner, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{winner ? `${winner} has won!` : "It's a tie!"}</p>
        <button onClick={onClose}>Play Again</button>
      </div>
    </div>
  );
};

interface GameOverComponentProps {
  winner: string | null;
  playerXName: string;
  playerOName: string;
  onReset: () => void;
}

const GameOverComponent: React.FC<GameOverComponentProps> = ({ winner, playerXName, playerOName, onReset }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onReset(); // Reset the game when modal is closed
  };

  // Determine the winner's name
  const winnerName = winner === 'X' ? playerXName : winner === 'O' ? playerOName : null;

  return (
    <div className="game-over">
      {isModalOpen && <Modal winner={winnerName} onClose={handleCloseModal} />}
    </div>
  );
};

export default GameOverComponent;








