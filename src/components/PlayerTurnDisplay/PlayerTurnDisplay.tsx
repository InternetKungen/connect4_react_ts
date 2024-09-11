// This component toggle between left-active and right-active which indicate which players turn it is 
import React, { useEffect, useState } from 'react';
import './PlayerTurnDisplay.css';

interface PlayerTurnDisplayProps {
  playerTurn: 'X' | 'O';  // Prop to determine whose turn it is
}

const PlayerTurnDisplay: React.FC<PlayerTurnDisplayProps> = ({ playerTurn }) => {
  const [isPlayerXTurn, setIsPlayerXTurn] = useState<boolean>(playerTurn === 'X');

  // Update the state when playerTurn prop changes
  useEffect(() => {
    setIsPlayerXTurn(playerTurn === 'X');
  }, [playerTurn]);

  return (
    <div className="player-turn-display">
      <div className={`player-container ${isPlayerXTurn ? 'left-active' : 'right-active'}`}>
        <div className="player player-x"></div>
        <div className="player player-o"></div>
      </div>
    </div>
  );
};

export default PlayerTurnDisplay;