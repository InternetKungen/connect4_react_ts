// src/components/GameOverComponent.tsx
//Displays the game-over message and provides options to reset the game
import React, { useState } from 'react';
import './GameOverComponent.css'; // Import CSS for modal styling

interface GameOverComponentProps {
  winner: string | null;
  onReset: () => void;
}

const GameOverComponent: React.FC<GameOverComponentProps> = ({ winner, onReset }) => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Initially open the modal

  const closeModal = () => {
    setIsModalOpen(false);
    onReset(); // Optionally reset the game when closing the modal
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{winner ? `Player ${winner} has won!` : "It's a tie!"}</h2>
            <button onClick={closeModal}>Play Again</button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameOverComponent;




