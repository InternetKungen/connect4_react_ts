// PopUpMenu component handle open and closed in game menu
// comes with three functions
// "Continue" Allows player to close the menu and return to the game
// "Restart" trigger reset function and restart the board
// "Quit" Exists the current game and trigger quit function back to menu 

import React, { useState, useEffect } from 'react';
import './PopUpMenu.css'; 

interface PopUpMenuProps {
  onRestart: () => void; // Function to restart the game
  onQuit: () => void;// Function to quit the game
}

const PopUpMenu: React.FC<PopUpMenuProps> = ({ onRestart, onQuit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // state to track if the menu is open or closed

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
      <button className='popup-menu-button' onClick={handleOpenMenu}>
        Menu
      </button>

      {isMenuOpen && (
        <div className='menu-modal-overlay' onClick={handleClickOutside}>
          <div className='menu-modal-content'>
            <h2>Game Menu</h2>
            <button onClick={handleContinue}>Continue</button>
            <button
              onClick={() => {
                handleCloseMenu();
                onRestart();
              }}
            >
              Restart
            </button>
            <button
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
