import React, { useEffect } from 'react';
import './SetPlayerName.css'; // Ensure the correct path

interface SetPlayerNameProps {
  onSubmit: (playerXName: string, playerOName?: string) => void;
  isAiSetup: boolean; // Add this prop
}

const SetPlayerName: React.FC<SetPlayerNameProps> = ({ onSubmit, isAiSetup }) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement).value;
    const playerOName = !isAiSetup ? (form.elements.namedItem('playerO') as HTMLInputElement).value : undefined;

    onSubmit(playerXName, playerOName);
  };

    // Use effect to listen for Enter key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const submitButton = document.querySelector('.submit-button') as HTMLButtonElement;
        submitButton?.click(); // Simulate a button click
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="set-player-name-form">
      <label>
        Player X Name:
        <input name="playerX" placeholder="Enter player name" className="input-field" required/>
      </label>
      {!isAiSetup && (
        <label>
          Player O Name:
          <input name="playerO" placeholder="Enter player name" className="input-field" required />
        </label>
      )}
      <button type="submit" className="submit-button">Start Game</button>
    </form>
  );
};

export default SetPlayerName;

