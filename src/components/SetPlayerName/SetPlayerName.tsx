// This component handle Set player name section for both Player vs Player and Player vs Ai
// When players submit their names onSubmit function is called and send the names back to the parent component
// isAiSetUp function hide PlayerO field if player vs CPU = true
// handle backSpace with keybind and onClick  
import React, { useEffect } from 'react';
import './SetPlayerName.css'; 

interface SetPlayerNameProps {
  onSubmit: (playerXName: string, playerOName?: string) => void; // This function runs when players submit their names
  isAiSetup: boolean; // Flag to check if the game is human vs Ai
  backSpace: () => void; //Function to handle back button or backspace
}

const SetPlayerName: React.FC<SetPlayerNameProps> = ({ onSubmit, isAiSetup, backSpace }) => {

  // Function to handle submission form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement).value;
    const playerOName = !isAiSetup ? (form.elements.namedItem('playerO') as HTMLInputElement).value : undefined;
    onSubmit(playerXName, playerOName);
  };

// Effect to listen for Enter and Backspace key events
useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;

      // When Enter key is pressed, submit the form
      if (e.key === 'Enter') {
        const submitButton = document.querySelector('.submit-button') as HTMLButtonElement;
        submitButton?.click(); 
      }

      // When Backspace is pressed, check if the focused input is empty
      if (e.key === 'Backspace') {
        // Check if an input field is focused and if it's empty
        if (
          activeElement.tagName === 'INPUT' &&
          (activeElement as HTMLInputElement).value !== ''
        ) {
          // Allow the user to backspace normally to delete characters in the input
          return;
        }
        
        // If no input field is focused or the input is empty, trigger backSpace
        e.preventDefault();
        backSpace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [backSpace]);

  // Render the form
 return (
    <div className="set-player-name-container">
     <form onSubmit={handleFormSubmit} className="set-player-name-form">
         <button className="back-button" onClick={backSpace}>Back</button>
     
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
          <button type="submit" className="submit-button">Start Game</button>
        </div>
     </form>
   </div>
   
   
  );
};

export default SetPlayerName;

