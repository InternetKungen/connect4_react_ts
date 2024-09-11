// PopUpMenu component handle open and closed in game menu
// comes with three functions
// "Continue" Allows player to close the menu and return to the game
// "Restart" trigger reset function and restart the board
// "Quit" Exists the current game and trigger quit function back to menu 

import React, { useState, useEffect } from 'react';
import './PopUpMenu.css'; 

interface PopUpMenuProps {
  onRestart: () => void; // Function to restart the game
  onQuit: () => void;    // Function to quit the game
  onToggleBackground: (hide: boolean) => void; // Function to toggle background effect
  onToggleUndoButton: (hide: boolean) => void; // Function to toggle undo button visibility
}

const PopUpMenu: React.FC<PopUpMenuProps> = ({ onRestart, onQuit, onToggleBackground, onToggleUndoButton }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Main menu state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false); // Settings menu state
  const [hideBackgroundEffect, setHideBackgroundEffect] = useState<boolean>(false); // State for background effect
  const [hideUndoButton, setHideUndoButton] = useState<boolean>(false); // State for undo button

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
    setIsMenuOpen(true); // Open the main menu
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Close the main menu
  };

  const handleContinue = () => {
    setIsMenuOpen(false); // Close the main menu without restarting or quitting
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true); // Open the settings menu
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false); // Close the settings menu
  };

  // Handle background effect toggle
  const handleBackgroundToggle = () => {
    const newValue = !hideBackgroundEffect;
    setHideBackgroundEffect(newValue);
    onToggleBackground(newValue); // Send value to parent component (or handle it here)
  };

  // Handle undo button toggle
  const handleUndoToggle = () => {
    const newValue = !hideUndoButton;
    setHideUndoButton(newValue);
    onToggleUndoButton(newValue); // Send value to parent component (or handle it here)
  };

  return (
    <>
      <button className='popup-menu-button' onClick={handleOpenMenu}>
        Menu
      </button>

      {isMenuOpen && (
        <div className='menu-modal-overlay'>
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
            <button onClick={handleOpenSettings}>Settings</button> {/* Settings button */}
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className='menu-modal-overlay'>
          <div className='menu-modal-content'>
            <h2>Settings</h2>
            <label>
              <input
                type='checkbox'
                checked={hideBackgroundEffect}
                onChange={handleBackgroundToggle}
              />
              Hide Background Effect
            </label>
            <label>
              <input
                type='checkbox'
                checked={hideUndoButton}
                onChange={handleUndoToggle}
              />
              Hide Undo Button
            </label>
            <button onClick={handleCloseSettings}>Back</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpMenu;

