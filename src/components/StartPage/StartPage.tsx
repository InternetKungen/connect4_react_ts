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
      <h1 className="start-menu-title">Welcome to Connect-4!</h1>
      
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
        Player vs AI
      </button>
      <button
        onClick={onShowRules}
        className="start-menu-button"
      >
        GAME RULES
      </button>
    </div>
  );
};

export default StartPage;

