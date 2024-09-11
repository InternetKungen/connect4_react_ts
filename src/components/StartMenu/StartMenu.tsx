// This is StartMenu page which is the landing / first page you encounter when you start up the game 
import React, { useState } from 'react';
import './StartMenu.css';

interface StartMenuProps {
  onStart: () => void; // Function that starts Player vs Player 
  onStartAI: () => void; // Function that starts Player vs Ai Mode / Computer 
  onShowRules: () => void; // Function that shows Game Rules
  onOpenSettings: () => void; // Function to open settings
  hideBackgroundEffect: boolean; //
}

const StartMenu: React.FC<StartMenuProps> = ({ onStart, onStartAI, onShowRules, onOpenSettings, hideBackgroundEffect }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className={`start-menu-container ${hideBackgroundEffect ? 'hidden-background' : ''}`}>
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
          onMouseEnter={() => setHoveredButton('pvp')}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={onStart}
          className="start-menu-button"
        >
          PLAYER VS PLAYER
        </button>
        <button
          onMouseEnter={() => setHoveredButton('cpu')}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={onStartAI}
          className="start-menu-button"
        >
          PLAYER VS CPU
        </button>
        <button
          onClick={onShowRules}
          className="start-menu-button"
        >
          GAME RULES
        </button>
        <button
          onClick={onOpenSettings}
          className="start-menu-button"
        >
          SETTINGS
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
