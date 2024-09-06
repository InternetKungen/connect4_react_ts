import React from 'react';
import './ScoreBoard.css';

interface ScoreBoardProps {
  playerXName: string; // Player X name
  playerOName: string; // Player O name (or AI name)
  playerXScore: number; // Player X score
  playerOScore: number; // Player O score
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  playerXName,
  playerOName,
  playerXScore,
  playerOScore,
}) => {
  return (
    <div className='scoreboard'>
      <div className='scoreboard-player'>
        <span className='player-name'>{playerXName}</span>
        <span className='player-score'>{playerXScore}</span>
      </div>
      <div className='scoreboard-player'>
        <span className='player-name'>{playerOName}</span>
        <span className='player-score'>{playerOScore}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
