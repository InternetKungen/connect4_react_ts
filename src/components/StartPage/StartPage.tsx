// StartPage.tsx
import React from 'react';
import './StartPage.css';

interface StartPageProps {
  onStart: () => void; // Define the type for the onStart function
  onStartAI: () => void; // New handler for starting PLAYER VS AI
  onShowRules: () => void; // New handler for showing game rules
}

const StartPage: React.FC<StartPageProps> = ({ onStart, onStartAI, onShowRules }) => {
  return (
    <div className="start-menu-container">
      <h1 className="start-menu-title"></h1>
      <div className='start-menu-button-container'>
      <button
        onClick={onStart}
        className="start-menu-button"
      >
        PLAYER VS PLAYER
      </button>
      <button
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

