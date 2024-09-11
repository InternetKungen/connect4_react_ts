import React from 'react';
import Switch from '@mui/material/Switch';

interface SettingsMenuProps {
  hideBackgroundEffect: boolean; // Renamed prop
  hideUndoButton: boolean;
  onToggleBackgroundEffect: (hide: boolean) => void; // Renamed prop
  onToggleUndoButton: (hide: boolean) => void;
  onClose: () => void; // Function to close the settings menu
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  hideBackgroundEffect, // Renamed prop
  hideUndoButton,
  onToggleBackgroundEffect, // Renamed prop
  onToggleUndoButton,
  onClose
}) => {

  return (
    <div className='menu-modal-overlay'>
      <div className='menu-modal-content'>
        <h2>Settings</h2>
        <label>
          <Switch
            checked={hideBackgroundEffect} // Use hideBackgroundEffect
            onChange={() => onToggleBackgroundEffect(!hideBackgroundEffect)} // Toggle background effect
          />
          Hide Background Effect
        </label>
        <label>
          <Switch
            checked={hideUndoButton}
            onChange={() => onToggleUndoButton(!hideUndoButton)}
          />
          Hide Undo Button
        </label>
        <button onClick={onClose}>Back</button>
      </div>
    </div>
  );
};

export default SettingsMenu;


