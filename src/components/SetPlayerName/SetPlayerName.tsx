import React, { useEffect } from 'react';
import './SetPlayerName.css'; // Ensure the correct path

interface SetPlayerNameProps {
  onSubmit: (playerXName: string, playerOName?: string) => void;
  isAiSetup: boolean; // Add this prop
  backSpace: () => void; // Add this prop for handling backspace
}

const SetPlayerName: React.FC<SetPlayerNameProps> = ({ onSubmit, isAiSetup, backSpace }) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement).value;
    const playerOName = !isAiSetup ? (form.elements.namedItem('playerO') as HTMLInputElement).value : undefined;

    onSubmit(playerXName, playerOName);
  };

  // Use effect to listen for Enter key and Backspace key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const submitButton = document.querySelector('.submit-button') as HTMLButtonElement;
        submitButton?.click(); // Simulate a button click
      }
      if (e.key === 'Backspace') {
        e.preventDefault(); // Prevent the default Backspace action (e.g., navigating back in the browser)
        backSpace(); // Call the backSpace function
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [backSpace]);

 return (
    <div className="set-player-name-container">
      <form onSubmit={handleFormSubmit} className="set-player-name-form">
        <label>
          Player X Name:
          <input name="playerX" placeholder="Enter player name" className="input-field" required />
        </label>
        {!isAiSetup && (
          <label>
            Player O Name:
            <input name="playerO" placeholder="Enter player name" className="input-field" required />
          </label>
        )}
        <div className="button-container">
          <button type="button" className="back-button" onClick={() => window.history.back()}>Back</button>
          <button type="submit" className="submit-button">Start Game</button>
        </div>
     </form>
   </div>
   
   
  );
};

export default SetPlayerName;

