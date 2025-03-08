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
import buttonHoverSound from '../../assets/sounds/hoverButton.mp3';

interface SetPlayerNameProps {
  onSubmit: (playerXName: string, playerOName?: string) => void; // This function runs when players submit their names
  isAiSetup: boolean; // Flag to check if the game is human vs Ai
  backSpace: () => void; //Function to handle back button or backspace
}

const SetPlayerName: React.FC<SetPlayerNameProps> = ({ onSubmit, isAiSetup, backSpace }) => {

  // UseSound hooks
  const { playSound: playClickMouseDownButtonBackSound} = useSound(clickMouseDownButtonBackSound, 0.8);
  const { playSound: playClickMouseUpButtonBackSound } = useSound(clickMouseUpButtonBackSound, 0.8);
  const { playSound: playClickMouseDownButton } = useSound(clickMouseDownButton, 0.8);
  const { playSound: playClickMouseUpButtonStartGame } = useSound(clickMouseUpButtonStartGame, 0.8);
  const { playSound: playButtonHoverSound } = useSound(buttonHoverSound, 0.3);
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
        <label className="player-label player-label-x">
          <div className="player-label-x-symbol">X</div>
          <span className="player-x-symbol"></span>
          <input name="playerX" placeholder="Player X name" className="input-field input-field-x" required />
        </label>
        {!isAiSetup && (
          <label className="player-label player-label-o">
            <div className="player-label-o-symbol">O</div>
            <span className="player-o-symbol"></span>
            <input name="playerO" placeholder="Player O name" className="input-field input-field-o" required />
          </label>
        )}
        <div className="set-player-name-button-container">
          <button
            type="submit"
            className="set-player-name-submit-button"
            onMouseDown={playClickMouseDownButton}
            onMouseUp={playClickMouseUpButtonStartGame}
            onMouseEnter={playButtonHoverSound}
          >Start Game</button>
          <button
            className="set-player-name-back-button"
            onMouseDown={playClickMouseDownButtonBackSound}
            onMouseUp={playClickMouseUpButtonBackSound}
            onMouseEnter={playButtonHoverSound}
            onClick={backSpace}
          >Back</button>
        </div>
      </form>
    </div>
  );
};

export default SetPlayerName;

