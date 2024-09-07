// StartPage.tsx
import React, { useState } from 'react';
import './StartPage.css';

interface StartPageProps {
  onStart: () => void; // Define the type for the onStart function
  onStartAI: () => void; // New handler for starting PLAYER VS AI
  onShowRules: () => void; // New handler for showing game rules
}

const StartPage: React.FC<StartPageProps> = ({ onStart, onStartAI, onShowRules }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  return (
    <div className="start-menu-container">
      <h1 className="start-menu-title"></h1>
      
      <div 
        className="start-menu-animation-display"
      >
        <img 
          className={`logo-main ${hoveredButton ? 'logo-hidden' : ''}`} 
          src='./img/connect-4-logo.png' 
          alt="logo" 
        />
        
        <div className="start-menu-animation-cutting-frame">
          <div className="start-menu-animation-box">
            <div className={`animation ${hoveredButton === 'pvp' ? '' : 'hidden'}`}>
              <div className={`left-moving-box ${hoveredButton === 'pvp' ? 'animate-left' : ''}`}></div>
              <div className={`middle-static-box ${hoveredButton === 'pvp' ? 'show-vs-screen' : ''}`}></div>
              <div className={`right-moving-box ${hoveredButton === 'pvp' ? 'animate-right' : ''}`}></div>
            </div>

            <div className={`animation ${hoveredButton === 'cpu' ? '' : 'hidden'}`}>
              <div className={`left-moving-box ${hoveredButton === 'cpu' ? 'animate-left' : ''}`}></div>
              <div className={`middle-static-box ${hoveredButton === 'cpu' ? 'show-vs-screen' : ''}`}></div>
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
      </div>
    </div>
  );
};

export default StartPage;

