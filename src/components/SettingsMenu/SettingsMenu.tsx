import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import './SettingsMenu.css';
/*Sounds*/
import useSound, { setGlobalSoundEnabled } from '../../hooks/useSound';
import hoverButtonSound from '../../assets/sounds/hoverButton.mp3';
import clickMouseDownButtonBackSound from '../../assets/sounds/clickMouseDownButtonBack.mp3';
import clickMouseUpButtonBackSound from '../../assets/sounds/clickMouseUpButtonBack.mp3';

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
  const [soundEnabled, setSoundEnabled] = useState(true);
  // const [backgroundSoundEnabled, setBackgroundSoundEnabled] = useState(true);

  setGlobalSoundEnabled(soundEnabled);

  const { playSound: playHoverButtonSound } = useSound(hoverButtonSound, 0.3);
  const { playSound: playClickMouseDownButtonBackSound } = useSound(clickMouseDownButtonBackSound, 0.7);
  const { playSound: playClickMouseUpButtonBackSound } = useSound(clickMouseUpButtonBackSound, 0.7);

  const handleSoundToggle = () => {
      setSoundEnabled(!soundEnabled);
      setGlobalSoundEnabled(!soundEnabled);
  };

  // const handleBackgroundSoundToggle = () => {
  //   setBackgroundSoundEnabled(!backgroundSoundEnabled);
  // };

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
        <label>
          <Switch
            checked={soundEnabled}
            onChange={handleSoundToggle}
          />
          Enable Sound
        </label>
        {/* <label>
          <Switch
            checked={backgroundSoundEnabled}
            onChange={handleBackgroundSoundToggle}
          />
          Enable Background Sound
        </label> */}
        <button
          onMouseEnter={() => { playHoverButtonSound(); }}
          onMouseDown={() => { playClickMouseDownButtonBackSound(); }}
          onMouseUp={() => { playClickMouseUpButtonBackSound(); }}
          onClick={onClose}>Back</button>
      </div>
    </div>
  );
};

export default SettingsMenu;


