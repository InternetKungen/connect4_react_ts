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
import PopUpMenu from './components/PopUpMenu/PopUpMenu';
import { handleColumnClick, handleReset } from './utils/Gamelogic';

function App() {
  // State to manage the current view
  const [gameState, setGameState] = useState<GameState>('main-menu');
  const [board, setBoard] = useState(new Board());
  const [playerX, setPlayerX] = useState<Player | null>(null);
  const [playerO, setPlayerO] = useState<Player | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard' | null>(null)
  const [playerSetupRequired, setPlayerSetupRequired] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

   // State to store player names
  const [playerXName, setPlayerXName] = useState<string>('');
  const [playerOName, setPlayerOName] = useState<string>('');
  

  // Handler to start the game (Player vs Player)
   const handleStartGame = () => {
    setPlayerSetupRequired(true); // Indicate that player setup is required
    setGameState('game-board');
  };

  // Handler to start the game against AI
  const handleStartAI = () => {
    setGameState('difficulty-selection');
  };

   const handleRestart = () => {
    handleReset(setBoard);
  };

  const handleQuit = () => {
    setGameState('main-menu');
     handleReset(setBoard);

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

    // Handler for PopUpMenu button click


  // Function to handle player name setup and transition to game board
  const handlePlayerSetupSubmit = (playerXName: string, playerOName: string) => {
    if (playerXName) {
      setPlayerX(new Player(playerXName, 'X', false));
      setPlayerXName(playerXName);
    }
    if (playerOName) {
      setPlayerO(new Player(playerOName, 'O', false));
      setPlayerOName(playerOName);
    }
    setPlayerSetupRequired(false);
    setGameState('game-board');
  };

  // Conditional rendering based on the current game state
  switch (gameState) {
    case 'main-menu':
      return (
        <div className="app">
          <img className='background-menu' src='./img/background-menu.png' alt="background" />
          <div className='empty-board'></div>
          <img className='logo-main' src='./img/connect-4-logo.png' alt="logo" />

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
        <ComputerMenu onSelectDifficulty={handleSelectedDifficulty} />
      );
    case 'game-board':
      if (playerSetupRequired) {
        return (
          <div className="app">
            <img className='background-menu' src='./img/background-menu.png' alt="background" />
            <div className='empty-board'></div>
            <img className='logo' src='./img/connect-4-logo.png' alt="logo" />
            <h1>Please enter player names</h1>

            <SetPlayerName onSubmit={handlePlayerSetupSubmit} />
          </div>
        );
      }
      if (!playerX || !playerO) {
        return <div>Loading player setup...</div>;
      }
      return (
        <div className="app">
          <img className='background-menu' src="./img/background-menu.png" alt="background" />
          <div className='empty-board'></div>
          <img className='logo' src='./img/connect-4-logo.png' alt="logo" />
          <BoardComponent
            board={board}
            onColumnClick={(column: number) =>
              handleColumnClick(column, board, playerX, playerO, setBoard, difficulty, isLocked, setIsLocked)
            }
            isLocked={isLocked}
          />
            <PopUpMenu
            onRestart={handleRestart}
            onQuit={handleQuit}
          />
          {board.gameOver && (
            <GameOverComponent
              winner={board.winner}
              playerXName={playerXName}
              playerOName={playerOName}
              onReset={() => handleReset(setBoard)}
            />
          )}
        </div>
      );
    default:
      return <div>Error: Unknown game state</div>;
  }
}

export default App;




