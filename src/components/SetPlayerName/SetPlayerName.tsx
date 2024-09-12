// This component handle Set player name section for both Player vs Player and Player vs Ai
// When players submit their names onSubmit function is called and send the names back to the parent component
// isAiSetUp function hide PlayerO field if player vs CPU = true
// handle backSpace with keybind and onClick  
import React, { useEffect } from 'react';
import './SetPlayerName.css';
import useSound from '../../hooks/useSound';

import clickMouseDownButtonBackSound from '../../assets/sounds/clickMouseDownButtonBack.mp3';
import clickMouseUpButtonBackSound from '../../assets/sounds/clickMouseUpButtonBack.mp3';
import clickMouseDownButton from '../../assets/sounds/clickMouseDownButton.mp3';
import clickMouseUpButtonStartGame from '../../assets/sounds/clickMouseUpStartGame.mp3';

interface SetPlayerNameProps {
  onSubmit: (playerXName: string, playerOName?: string) => void; // This function runs when players submit their names
  isAiSetup: boolean; // Flag to check if the game is human vs Ai
  backSpace: () => void; //Function to handle back button or backspace
}

const SetPlayerName: React.FC<SetPlayerNameProps> = ({ onSubmit, isAiSetup, backSpace }) => {

  // UseSound hooks
  const {playSound: playClickMouseDownButtonBackSound} = useSound(clickMouseDownButtonBackSound, 0.8);
  const { playSound: playClickMouseUpButtonBackSound } = useSound(clickMouseUpButtonBackSound, 0.8);
  const { playSound: playClickMouseDownButton } = useSound(clickMouseDownButton, 0.8);
  const { playSound: playClickMouseUpButtonStartGame } = useSound(clickMouseUpButtonStartGame, 0.8);
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
         <button type="submit" className="submit-button" onMouseDown={playClickMouseDownButton} onMouseUp={playClickMouseUpButtonStartGame}>Start Game</button>
          <button className="back-button" onMouseDown={playClickMouseDownButtonBackSound} onMouseUp={playClickMouseUpButtonBackSound} onClick={backSpace}>Back</button>
     
        </div>
     </form>
   </div>
   
   
  );
};

export default SetPlayerName;

