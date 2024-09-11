import React from 'react';
import './Timer.css';

interface TimerProps {
  timeLeft: number;
}

const TimerDisplay: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <div className="timer">
      <p>Time Left: {timeLeft}s</p>
    </div>
  );
};

export default TimerDisplay;
