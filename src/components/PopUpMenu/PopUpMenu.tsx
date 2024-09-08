// components/PopUpMenu/PopUpMenu.tsx
import React, { useState } from 'react';
import './PopUpMenu.css'; // Import the CSS file for styling

interface PopUpMenuProps {
  onRestart: () => void;
  onQuit: () => void;
}

const PopUpMenu: React.FC<PopUpMenuProps> = ({ onRestart, onQuit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true); // Open the menu
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Close the menu
  };

  const handleContinue = () => {
    setIsMenuOpen(false); // Close the menu without restarting or quitting
  };

  return (
    <>
      <button className="popup-menu-button" onClick={handleOpenMenu}>
        Menu
      </button>

      {isMenuOpen && (
        <div className="menu-modal-overlay">
          <div className="menu-modal-content">
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
