// PopUpMenu component handle open and closed in game menu
// comes with three functions
// "Continue" Allows player to close the menu and return to the game
// "Restart" trigger reset function and restart the board
// "Quit" Exists the current game and trigger quit function back to menu 

import React, { useState, useEffect } from 'react';
import './PopUpMenu.css'; 
import useSound from '../../hooks/useSound';

import hoverButtonSound from '../../assets/sounds/hoverButton.mp3';
import clickMouseDownSound from '../../assets/sounds/clickMouseDownButton.mp3';
import clickMouseUpSound from '../../assets/sounds/clickMouseUpButton.mp3';
import clickGameOverSound from '../../assets/sounds/buttonClick.mp3';

interface PopUpMenuProps {
  onRestart: () => void; // Function to restart the game
  onQuit: () => void;// Function to quit the game
}

const PopUpMenu: React.FC<PopUpMenuProps> = ({ onRestart, onQuit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // state to track if the menu is open or closed

  /*Bind Sounds*/
  const { playSound: playHoverButtonSound } = useSound(hoverButtonSound, 0.3);
  const { playSound: playClickMouseDownSound } = useSound(clickMouseDownSound, 0.7);
  const { playSound: playClickMouseUpSound } = useSound(clickMouseUpSound, 0.7);
  const { playSound: playClickGameOverSound } = useSound(clickGameOverSound, 0.3);

  // useEffect to bind the ESC key to opening/closing the menu
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen((prev) => !prev); // Toggle menu visibility
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleOpenMenu = () => {
    setIsMenuOpen(true); // Open the menu
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Close the menu
  };

  const handleContinue = () => {
    setIsMenuOpen(false); // Close the menu without restarting or quitting
  };

  // Function to handle closing the menu if clicking outside the menu content
  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('menu-modal-overlay')) {
      handleCloseMenu(); // Close the menu if click is on the overlay
    }
  };

  return (
    <>
      <button className='popup-menu-button' onMouseDown={() => playClickMouseDownSound()} onMouseUp={() => playClickMouseUpSound()} onClick={handleOpenMenu}>
        Menu
      </button>

      {isMenuOpen && (
        <div className='menu-modal-overlay' onClick={handleClickOutside}>
          <div className='menu-modal-content'>
            <h2>Game Menu</h2>

            <button
              onMouseEnter={() => playHoverButtonSound()}
              onMouseDown={() => playClickMouseDownSound()}
              onMouseUp={() => playClickMouseUpSound()}
              onClick={handleContinue}>Continue</button>

            <button
              onMouseEnter={() => playHoverButtonSound()}
              onMouseDown={() => playClickMouseDownSound()}
              onMouseUp={() => playClickMouseUpSound()}
              onClick={() => {
                handleCloseMenu();
                onRestart();
              }}
            >
              Restart
            </button>
            <button
              onMouseEnter={() => playHoverButtonSound()}
              onMouseDown={() => playClickMouseDownSound()}
              onMouseUp={() => playClickGameOverSound()}
              onClick={() => {
                handleCloseMenu();
                onQuit();
              }}
            >
              Quit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpMenu;
