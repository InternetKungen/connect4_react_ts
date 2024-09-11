// Display Game Rules 

import React from 'react';
import { GameState } from '../../utils/Types'; // Adjust the import path accordingly
import './rules.css';

interface RulesProps {
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function Rules(props: RulesProps) {
  function onAcceptClick() {
    props.setGameState('main-menu');
  }

  return (
    <div className="rules-container">
      <div className="rules-content">
        <h2>Rules</h2>
        <div className="rule-block">
          <h3>Objective</h3>
          <p>
            Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div className="rule-block">
          <h3>How to play</h3>
          <ol>
            <li><span>Blue goes first in the first game.</span></li>
            <li><span>Players take turns placing discs into the grid.</span></li>
            <li><span>The game ends when one of the players has a row of 4 of their discs in a row</span></li>
            <li><span>The row can be vertical, horizontal, or diagonal.</span></li>
          </ol>
        </div>
      </div>
      <div className="button-container">
        <button className="accept-button" onClick={onAcceptClick}>Accept</button>
      </div>
    </div>
  );
}

