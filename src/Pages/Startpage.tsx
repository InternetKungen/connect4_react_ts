// src/components/StartPage/StartPage.tsx
import React from 'react';
import './Startpage.css';
import logo from '../assets/Images/connect-4-logo.png';

interface StartPageProps {
  onStart: () => void; // Define the type for the onStart function
  onStartAI: () => void; // New handler for starting PLAYER VS AI
  onShowRules: () => void; // New handler for showing game rules
}

const StartPage: React.FC<StartPageProps> = ({ onStart, onStartAI, onShowRules }) => {
  return (
      <div className="container">
      <img src={logo} alt="Connect-4 Logo" className="logo" /> {/* Use an img tag to display the logo */}
      <button onClick={onStart} className="button">PLAYER VS PLAYER</button>
      <button onClick={onStartAI} className="button">Player vs AI</button>
      <button onClick={onShowRules} className="button">GAME RULES</button>
    </div>
  );
};

export default StartPage;