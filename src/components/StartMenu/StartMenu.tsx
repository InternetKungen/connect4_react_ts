// This is StartMenu page which is the landing / first page you encounter when you start up the game 
import React, { useState } from 'react';
import './StartMenu.css';
import useSound from '../../hooks/useSound';

import machineSound from '../../assets/sounds/playerTurn.mp3';
import machineSoundReverse from '../../assets/sounds/playerTurnReverse.mp3';
import hoverButtonSound from '../../assets/sounds/hoverButton.mp3';
import clickMouseDownSound from '../../assets/sounds/clickMouseDownButton.mp3';
import clickMouseUpSound from '../../assets/sounds/clickMouseUpButton.mp3';

interface StartMenuProps {
  onStart: () => void; // Function that starts Player vs Player 
  onStartAI: () => void; // Function that starts Player vs Ai Mode / Computer 
  onStartAIVsAI: () => void; // Function that starts AI vs AI Mode
  onShowRules: () => void; // Function that shows Game Rules
  onOpenSettings: () => void; // Function to open settings
}

const StartMenu: React.FC<StartMenuProps> = ({ onStart, onStartAI, onShowRules, onStartAIVsAI, onOpenSettings }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  
  /*Bind Sounds*/
  const { playSound: playMachineSound } = useSound(machineSound, 0.01);
  const { playSound: playMachineSoundReverse } = useSound(machineSoundReverse, 0.01);
  const { playSound: playHoverButtonSound } = useSound(hoverButtonSound, 0.3);
  const { playSound: playClickMouseDownSound } = useSound(clickMouseDownSound, 0.7);
  const { playSound: playClickMouseUpSound } = useSound(clickMouseUpSound, 0.7);

  return (
    <div className={`start-menu-container`}>
      <h1 className="start-menu-title"></h1>
      
      <div className="start-menu-animation-display">
        <img 
          className={`logo-main ${hoveredButton ? 'logo-hidden' : ''}`} 
          src='./img/connect-4-logo.png' 
          alt="logo" 
        />
        
        <div className="start-menu-animation-cutting-frame">
          <div className={`start-menu-animation-box-background ${hoveredButton ? 'darken-background' : ''}`}></div>
          <div className="start-menu-animation-box">
            <div className={`animation ${hoveredButton === 'pvp' ? '' : 'hidden'}`}>

              <div className={`left-moving-box-glow ${hoveredButton === 'pvp' ? 'show-glow' : ''}`}></div>
              <div className={`left-moving-box ${hoveredButton === 'pvp' ? 'animate-left' : ''}`}></div>
                
              <div className={`middle-static-box ${hoveredButton === 'pvp' ? 'show-vs-screen' : ''}`}>VS</div>
              
              <div className={`right-moving-box-glow ${hoveredButton === 'pvp' ? 'show-glow' : ''}`}></div>
              <div className={`right-moving-box ${hoveredButton === 'pvp' ? 'animate-right' : ''}`}></div>
            </div>

            <div className={`animation ${hoveredButton === 'cpu' ? '' : 'hidden'}`}>
              <div className={`left-moving-box-glow ${hoveredButton === 'cpu' ? 'show-glow' : ''}`}></div>
              <div className={`left-moving-box ${hoveredButton === 'cpu' ? 'animate-left' : ''}`}></div>
              <div className={`middle-static-box ${hoveredButton === 'cpu' ? 'show-vs-screen' : ''}`}>VS</div>
              <div className={`right-moving-box-glow ${hoveredButton === 'cpu' ? 'show-glow' : ''}`}></div>
              <div className={`right-moving-box-cpu ${hoveredButton === 'cpu' ? 'animate-right' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className='start-menu-button-container'>
        <button
          onMouseEnter={() => { setHoveredButton('pvp'), playMachineSound(), playHoverButtonSound(); }}
          onMouseLeave={() => {setHoveredButton(null), playMachineSoundReverse(); }}
          onMouseDown={() => { playClickMouseDownSound(); }}
          onMouseUp={() => { playClickMouseUpSound(); onStart(); }}
          className="start-menu-button"
        >
          PLAYER VS PLAYER
        </button>
        <button
          onMouseEnter={() => {setHoveredButton('cpu'), playMachineSound(), playHoverButtonSound(); }}
          onMouseLeave={() => {setHoveredButton(null), playMachineSoundReverse(); }}
          onMouseDown={() => { playClickMouseDownSound(); }}
          onMouseUp={() => { playClickMouseUpSound(); }}
          onClick={() => { onStartAI(); }}
          className="start-menu-button"
        >
        PLAYER VS CPU
        </button>
        <button
          onMouseDown={() => { playClickMouseDownSound(); }}
          onMouseUp={() => { playClickMouseUpSound(); }}
          onMouseEnter={() => { setHoveredButton('ai-vs-ai'), playHoverButtonSound(); }}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={onStartAIVsAI}  // Trigger AI vs AI game
          className="start-menu-button"
        >
          AI VS AI
        </button>
        <button
          onMouseEnter={() => { playHoverButtonSound(); }}
          onMouseDown={() => { playClickMouseDownSound(); }}
          onMouseUp={() => { playClickMouseUpSound(); }}
          onClick={() =>{ onShowRules(); }}
          className="start-menu-button"
        >
        GAME RULES
        </button>
        <button
          onMouseEnter={() => { playHoverButtonSound(); }}
          onMouseDown={() => { playClickMouseDownSound(); }}
          onMouseUp={() => { playClickMouseUpSound(); }}
          onClick={ onOpenSettings }
          className="start-menu-button"
        >
          SETTINGS
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
