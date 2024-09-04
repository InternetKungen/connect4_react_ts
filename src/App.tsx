import { useState } from 'react';
import Board from './classes/Board';
import Player from './classes/Player';
import BoardComponent from './components/BoardComponent/BoardComponent';
import GameOverComponent from './components/GameOverComponent/GameOverComponent';
import StartPage from './components/StartPage/StartPage';
import Rules from './components/GameRules/Rules';
import { GameState } from './utils/Types';
import SetPlayerName from './components/SetPlayerName/SetPlayerName';
import './index.css';
import ComputerMenu from './components/ComputerMenu/ComputerMenu';
import { handleColumnClick, handleReset } from './utils/Gamelogic';
import {  handlePlayerSetupSubmit } from './utils/PlayerManagement';

function App() {
  // State to manage the current view
  const [gameState, setGameState] = useState<GameState>('main-menu');
  const [board, setBoard] = useState(new Board());
  const [playerX, setPlayerX] = useState<Player | null>(null);
  const [playerO, setPlayerO] = useState<Player | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard' | null>(null)

  // Handler to start the game (Player vs Player)
  const handleStartGame = () => {
    setPlayerX(new Player("Player X", 'X', false));
    setPlayerO(new Player("Player O", 'O', false));
    setGameState('game-board');
    setDifficulty(null);
  };

  // Handler to start the game against AI
  const handleStartAI = () => {
    setGameState('difficulty-selection');
  };

  const handleSelectedDifficulty = (selectedDifficulty: 'easy' | 'hard') => {
    setDifficulty(selectedDifficulty);
     setPlayerX(new Player("Player X", 'X', false));
    setPlayerO(new Player('Computer', 'O', true));
    setGameState('game-board');
  }

  // Handler to show the game rules
  const handleShowRules = () => {
    setGameState('rules');
  };


  // Conditional rendering based on the current game state
  switch (gameState) {
    case 'main-menu':
      return (
        <div className="app">
          <img className='background-menu' src='./img/background-menu.png' alt="background" />
          <div className='empty-board'></div>
          <img className='logo' src='./img/connect-4-logo.png' alt="logo" />

          <StartPage
            onStart={handleStartGame}
            onStartAI={handleStartAI}
            onShowRules={handleShowRules}
          />
        </div>
      );
    case 'rules':
      return (
        <Rules setGameState={setGameState} />
      );
    case 'difficulty-selection':
      return (
        <ComputerMenu onSelectDifficulty={handleSelectedDifficulty}/>
      )
    case 'game-board':
      if (!playerX || !playerO) {
        return (
          <div className="app">
            <img className='background-menu' src='./img/background-menu.png' alt="background" />
            <div className='empty-board'></div>
            <img className='logo' src='./img/connect-4-logo.png' alt="logo" />
            <h1>Welcome to Connect 4!</h1>

            <SetPlayerName onSubmit={handlePlayerSetupSubmit} />
             <form onSubmit={(e) => handlePlayerSetupSubmit(e, setPlayerX, setPlayerO)}>
              <label>
                Player X Name:
                <input name="playerX" placeholder="Enter player name" />
              </label>
              <br />
              <label>
                Player O Name:
                <input name="playerO" placeholder="Enter player name" />
              </label>
              <br />
              <button type="submit">Start Game</button>
            </form>
          </div>
        );
      }
      return (
        <div className="app">
           <img className='background-menu' src="./img/background-menu.png" alt="background" />
          <div className='empty-board'></div>
          <img className='logo' src='./img/connect-4-logo.png' alt="logo" />
          <BoardComponent
            board={board}
            onColumnClick={(column: number) =>
            handleColumnClick(column, board, playerX, playerO, setBoard, difficulty)
  }/>
          {board.gameOver && (
            <GameOverComponent
             winner={board.winner} onReset={() => handleReset(setBoard)}/>
          )}
        </div>
      );
    default:
      return <div>Error: Unknown game state</div>;
  }
}

export default App;







