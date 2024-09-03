// src/components/PlayerNames/PlayerNames.tsx
// Set player name component that handle set player name if Player vs Player option was chosen. 
import React from 'react';
import logo from '../../assets/Images/connect-4-logo.png';
import './PlayerNames.style.css';



interface PlayerNamesProps {
  onSetPlayer: (name: string, color: 'X' | 'O') => void;
}

const PlayerNames: React.FC<PlayerNamesProps> = ({ onSetPlayer }) => {
  const handlePlayerSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement).value;
    const playerOName = (form.elements.namedItem('playerO') as HTMLInputElement).value;
    if (playerXName) onSetPlayer(playerXName, 'X');
    if (playerOName) onSetPlayer(playerOName, 'O');
  };

   return (
    <div className="container">
      <img src={logo} alt="Connect-4 Logo" className="logo" /> {/* Use an img tag to display the logo */}
      <form onSubmit={handlePlayerSetupSubmit} className="form">
        <label className="label">
          Player X Name:
          <input
            name="playerX"
            placeholder="Enter player name"
            className="input"
          />
        </label>
        <label className="label">
          Player O Name:
          <input
            name="playerO"
            placeholder="Enter player name"
            className="input"
          />
        </label>
        <button
          type="submit"
          className="button"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerNames;

