// components/PopUpMenu/PopUpMenu.tsx
import React, { useState, useEffect } from 'react';
import './PopUpMenu.css'; // Assuming this is where your styles are

interface PopUpMenuProps {
  onRestart: () => void;
  onQuit: () => void;
}

const PopUpMenu: React.FC<PopUpMenuProps> = ({ onRestart, onQuit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Bind ESC key to open/close the menu
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
