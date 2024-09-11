import React, { useEffect, useState } from 'react';
import './PlayerTurnDisplay.css';
import useSound from '../../hooks/useSound';
/* Import Sound */
import playerTurnSound from '../../assets/sounds/playerTurn.mp3';

interface PlayerTurnDisplayProps {
  playerTurn: 'X' | 'O';  // Prop to determine whose turn it is
}

const PlayerTurnDisplay: React.FC<PlayerTurnDisplayProps> = ({ playerTurn }) => {
  const [isPlayerXTurn, setIsPlayerXTurn] = useState<boolean>(playerTurn === 'X');

  // Initialize sound
  const { playSound: playPlayerTurnSound } = useSound(playerTurnSound, 0.05);

  useEffect(() => {
    setIsPlayerXTurn(playerTurn === 'X');
    playPlayerTurnSound(); // Play the sound when the player turn changes
  }, [playerTurn, playPlayerTurnSound]);

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