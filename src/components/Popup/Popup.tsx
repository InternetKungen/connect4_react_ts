// src/components/Popup/Popup.tsx
import React from 'react';
import './Popup.css'; // Make sure to create this CSS file for styling

interface PopupProps {
  message: string;
  onPlayAgain: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onPlayAgain }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{message}</h2>
        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
