// src/components/GameOverComponent.tsx
//Displays the game-over message and provides options to reset the game
import React, { useState } from 'react';
import './GameOverComponent.css';
import useSound from '../../hooks/useSound';

import hoverButtonSound from '../../assets/sounds/hoverButton.mp3';
import clickMouseDownSound from '../../assets/sounds/clickMouseDownButton.mp3';
import clickMouseUpSound from '../../assets/sounds/clickMouseUpButton.mp3';
import clickGameOverSound from '../../assets/sounds/buttonClick.mp3';


// Modal Component
interface ModalProps {
  winner: string | null;
  onClose: () => void;
  onQuit: () => void;
}

const Modal: React.FC<ModalProps> = ({ winner, onClose, onQuit }) => {

  const { playSound: playHoverButtonSound } = useSound(hoverButtonSound, 0.3);
  const { playSound: playClickMouseDownSound } = useSound(clickMouseDownSound, 0.7);
  const { playSound: playClickMouseUpSound } = useSound(clickMouseUpSound, 0.7);
  const { playSound: playClickGameOverSound } = useSound(clickGameOverSound, 0.7);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{winner ? `${winner} has won!` : "It's a tie!"}</p>
        <button
          onMouseEnter={() => playHoverButtonSound()}
          onMouseDown={() => playClickMouseDownSound()}
          onMouseUp={() => playClickMouseUpSound()}
          onClick={onClose}>Play Again</button>
        <button
          onMouseEnter={() => playHoverButtonSound()}
          onMouseDown={() => playClickMouseDownSound()}
          onMouseUp={() => playClickGameOverSound()}
          onClick={onQuit}>Back to Menu</button>
      </div>
    </div>
  );
};

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
    onReset(); // Reset the game when modal is closed
  };

  // Determine the winner's name
  const winnerName = winner === 'X' ? playerXName : winner === 'O' ? playerOName : null;

  return (
    <div className="game-over">
      {isModalOpen && <Modal winner={winnerName} onClose={handleCloseModal} onQuit={onQuit} />}
    </div>
  );
};

export default GameOverComponent;








