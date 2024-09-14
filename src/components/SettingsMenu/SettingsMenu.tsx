import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import './SettingsMenu.css';
/*Sounds*/
import useSound, { setGlobalSoundEnabled, getGlobalSoundEnabled } from '../../hooks/useSound';
import hoverButtonSound from '../../assets/sounds/hoverButton.mp3';
import clickMouseDownButtonBackSound from '../../assets/sounds/clickMouseDownButtonBack.mp3';
import clickMouseUpButtonBackSound from '../../assets/sounds/clickMouseUpButtonBack.mp3';

interface SettingsMenuProps {
  hideBackgroundEffect: boolean; 
  hideUndoButton: boolean;
  hideAIvsAIButton: boolean;
  onToggleBackgroundEffect: (hide: boolean) => void; 
  onToggleUndoButton: (hide: boolean) => void;
  onToggleAIvsAIButton: (hide: boolean) => void;
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  hideBackgroundEffect,
  hideUndoButton,
  hideAIvsAIButton,
  onToggleBackgroundEffect,
  onToggleUndoButton,
  onToggleAIvsAIButton,
  onClose
}) => {
  const [soundEnabled, setSoundEnabled] = useState(getGlobalSoundEnabled);

  useEffect(() => {
    setGlobalSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const { playSound: playHoverButtonSound } = useSound(hoverButtonSound, 0.3);
  const { playSound: playClickMouseDownButtonBackSound } = useSound(clickMouseDownButtonBackSound, 0.7);
  const { playSound: playClickMouseUpButtonBackSound } = useSound(clickMouseUpButtonBackSound, 0.7);

  const handleSoundToggle = () => {
    setSoundEnabled(prevState => {
      const newState = !prevState;
      setGlobalSoundEnabled(newState);
      window.dispatchEvent(new Event('globalSoundChange'));
      return newState;
    });
  };

  return (
    <div className='menu-modal-overlay'>
      <div className='menu-modal-content'>
        <h2>Settings</h2>
        <label>
          <Switch
            checked={hideBackgroundEffect} 
            onChange={() => onToggleBackgroundEffect(!hideBackgroundEffect)}
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
            checked={hideAIvsAIButton}
            onChange={() => onToggleAIvsAIButton(!hideAIvsAIButton)}
          />
          Hide AI vs AI Button
        </label>
        <label>
          <Switch
            checked={soundEnabled}
            onChange={handleSoundToggle}
          />
          Enable Sound
        </label>
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


