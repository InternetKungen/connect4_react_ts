import React, { useEffect } from 'react';
import './SetPlayerName.css'; // Ensure the correct path

interface SetPlayerNameProps {
  onSubmit: (playerXName: string, playerOName?: string) => void;
  isAiSetup: boolean; // Add this prop
  backSpace: () => void; // Add this prop for back navigation
}

const SetPlayerName: React.FC<SetPlayerNameProps> = ({ onSubmit, isAiSetup, backSpace }) => {
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
      } else if (e.key === 'Escape') {
        backSpace(); // Call the onBack function
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [backSpace]);

  return (
    <form onSubmit={handleFormSubmit} className="set-player-name-form">
      <button type="button" className="popup-menu-button" onClick={backSpace}>
        Back
      </button> {/* Back Button styled like Menu button */}
      <label>
        Player X Name:
        <input name="playerX" placeholder="Enter player name" className="input-field" />
      </label>
      {!isAiSetup && (
        <label>
          Player O Name:
          <input name="playerO" placeholder="Enter player name" className="input-field" />
        </label>
      )}
      <button type="submit" className="submit-button">Start Game</button>
    </form>
  );
};

export default SetPlayerName;


