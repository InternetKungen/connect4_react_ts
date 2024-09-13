import { useState } from 'react';
import Board from './classes/Board';
import Player from './classes/Player';
import BoardComponent from './components/BoardComponent/BoardComponent';
import PlayerTurnDisplay from './components/PlayerTurnDisplay/PlayerTurnDisplay';
import GameOverComponent from './components/GameOverComponent/GameOverComponent';
import StartMenu from './components/StartMenu/StartMenu';
import Rules from './components/GameRules/Rules';
import { GameState } from './utils/Types';
import SetPlayerName from './components/SetPlayerName/SetPlayerName';
import './index.css';
import ComputerMenu from './components/ComputerMenu/ComputerMenu';
import PopUpMenu from './components/PopUpMenu/PopUpMenu';
import { handleColumnClick, handleReset } from './utils/gameUtils';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
// import Background from './components/Background/Background';
import SettingsMenu from './components/SettingsMenu/SettingsMenu';

function App({
  setHideBackgroundEffect,
  hideBackgroundEffect}: { 
    setHideBackgroundEffect: (hide: boolean) => void
    hideBackgroundEffect: boolean
}) {
  // State to manage the current view
  const [gameState, setGameState] = useState<GameState>('main-menu');
  const [board, setBoard] = useState(new Board());
  const [playerX, setPlayerX] = useState<Player | null>(null);
  const [playerO, setPlayerO] = useState<Player | null>(null);
  // States to keep track of the respective players' scores throughout the game
  const [playerXScore, setPlayerXScore] = useState<number>(0); // Player X's score
  const [playerOScore, setPlayerOScore] = useState<number>(0); // Player O's score

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard' | null>(null);

  const [aiSetup, setAiSetup] = useState<boolean>(false);
  const [boardHistory, setBoardHistory] = useState<Board[]>([]);

  // State to store player names
  const [playerXName, setPlayerXName] = useState<string>('');
  const [playerOName, setPlayerOName] = useState<string>('');

  // State for settings
  // const [hideBackgroundEffect, setHideBackgroundEffect] = useState<boolean>(false);
  const [hideUndoButton, setHideUndoButton] = useState<boolean>(false);

  // Handler to start the game (Player vs Player)
  const handleStartGame = () => {
    setAiSetup(false); // Ensure AI setup is not active
    setGameState('player-name-setup'); // Go to player name setup
  };

    const handleToggleBackgroundEffect = (hide: boolean) => {
    setHideBackgroundEffect(hide);
  };

    const handleToggleUndoButton = (hide: boolean) => {
    setHideUndoButton(hide);
  };

  // Handler to start the game against AI
  const handleStartAI = () => {
    setAiSetup(true); // Activate AI setup
    setGameState('player-name-setup'); // Go to player name setup
  };

  const handleRestart = () => {
    handleReset(setBoard);
    setPlayerXScore(0);
    setPlayerOScore(0);
  };

  // Render the main menu screen and reset the board, scores, and player names
  const handleQuit = () => {
    setGameState('main-menu');
    handleReset(setBoard);
    setPlayerXScore(0);
    setPlayerOScore(0);
    setPlayerXName('');
    setPlayerOName('');
  };

  const handleSelectedDifficulty = (selectedDifficulty: 'easy' | 'hard') => {
    setDifficulty(selectedDifficulty);
    setPlayerX(new Player('Player X', 'X', false));
    setPlayerO(new Player('Computer', 'O', true));
    setGameState('game-board');
  };

  // Handler to show the game rules
  const handleShowRules = () => {
    setGameState('rules');
  };

  const handleOpenSettings = () => {
    setGameState('settings'); // Set game state to 'settings'
  };

  // Function to handle player name setup and transition to game board
  const handlePlayerSetupSubmit = (
    playerXName: string,
    playerOName?: string
  ) => {
    if (playerXName) {
      setPlayerX(new Player(playerXName, 'X', false));
      setPlayerXName(playerXName);
    }

    if (aiSetup) {
      // If it's AI setup, go to difficulty selection
      setPlayerO(new Player('AI', 'O', true)); // Set AI as Player O
      setPlayerOName('AI'); // Set AI's name for display purposes
      setGameState('difficulty-selection');
    } else {
      // If it's PvP setup, set Player O and start the game
      if (playerOName) {
        setPlayerO(new Player(playerOName, 'O', false));
        setPlayerOName(playerOName);
      }
      setGameState('game-board');
    }
  };

  // Score Update Function that checks the winner after each game ends
  const updateScore = () => {
    if (board.winner === 'X') {
      setPlayerXScore((prevScore) => prevScore + 1); // Increment Player X score if win
    } else if (board.winner === 'O') {
      setPlayerOScore((prevScore) => prevScore + 1); // Increment Player O (or AI) score if win
    }
  };

  // Undo-Move handler
  const handleUndoMove = () => {
    // Checking if there's any history to undo
    if (boardHistory.length > 0) {
      // Retrieving the last board state from history
      const previousBoard = boardHistory[boardHistory.length - 1];
      // Updating the board history, removing the last state
      setBoardHistory(prevHistory => prevHistory.slice(0, -1)); // Removing the last state from history
      // Setting the board to previous state
      setBoard(previousBoard);
    }
  };

  // Back navigation handler
  const handleBackSpace = () => {
    if (gameState === 'player-name-setup') {
      setGameState('main-menu');
    } else {
      setGameState('main-menu');
      handleReset(setBoard);
      setPlayerXName('');
      setPlayerOName('');
      setPlayerX(null);
      setPlayerO(null);
      
    }
  };


  // Conditional rendering based on the current game state
  switch (gameState) {
    case 'main-menu':
      return (
        <div className='app'>
          <img
            className='background-menu'
            src='./img/background-menu.png'
            alt='background'
          />
          <div className='empty-board'></div>
          <StartMenu
            onStart={handleStartGame}
            onStartAI={handleStartAI}
            onShowRules={handleShowRules}
            onOpenSettings={handleOpenSettings}
          />
        </div>
      );
    case 'rules':
      return <Rules setGameState={setGameState} />;
    
    case 'settings': // New case for settings
      return (
        <div className='app'>
          <img
            className='background-menu'
            src='./img/background-menu.png'
            alt='background'
          />
          <div className='empty-board'></div>
          <SettingsMenu
            hideBackgroundEffect={hideBackgroundEffect}
            hideUndoButton={hideUndoButton}
            onToggleBackgroundEffect={handleToggleBackgroundEffect}
            onToggleUndoButton={handleToggleUndoButton}
            onClose={() => setGameState('main-menu')} // Navigate back to the main menu
          />
        </div>
      );
    
    case 'player-name-setup':
      return (
        <div className='app'>
          <img
            className='background-menu'
            src='./img/background-menu.png'
            alt='background'
          />
          <div className='empty-board'></div>
          <img className='logo' src='./img/connect-4-logo.png' alt='logo' />
          <h1>{aiSetup ? 'Enter your name' : 'Please enter player names'}</h1>
          <SetPlayerName
            onSubmit={handlePlayerSetupSubmit}
            isAiSetup={aiSetup}
            backSpace={handleBackSpace}
          />
        </div>
      );
    case 'difficulty-selection':
      return (
        <div className='app'>
          <img
            className='background-menu'
            src='./img/background-menu.png'
            alt='background'
          />
          <div className='empty-board'></div>
          <ComputerMenu onSelectDifficulty={handleSelectedDifficulty} />
        </div>
      );
    case 'game-board':
      if (!playerX || !playerO) {
        return <div>Loading player setup...</div>;
      }
      return (
        <div className='app'>
          <img
            className='background-menu'
            src='./img/background-menu.png'
            alt='background'
          />
          <div className='empty-board'></div>

          <ScoreBoard
            playerXName={playerXName || 'Player X'}
            playerOName={playerOName || 'Player O'}
            playerXScore={playerXScore}
            playerOScore={playerOScore}
          />

          <PlayerTurnDisplay
            playerTurn={board.currentPlayerColor as 'X' | 'O'}
          />

          <BoardComponent
            board={board}
            onColumnClick={(column: number) => {
              setBoardHistory(prevHistory => [...prevHistory, board]);
              handleColumnClick(
                column,
                board,
                playerX,
                playerO,
                setBoard,
                difficulty,
                isLocked,
                setIsLocked
              );
            }}
            isLocked={isLocked}
          />

          {!hideUndoButton && (
            <div className="undo-container">
              <button onClick={handleUndoMove} disabled={boardHistory.length === 0}>
                Undo Move
              </button>
            </div>
          )}

          <PopUpMenu
            onRestart={handleRestart}
            onQuit={handleQuit}
            hideBackgroundEffect={hideBackgroundEffect}
            hideUndoButton={hideUndoButton}
            onToggleBackground={handleToggleBackgroundEffect}
            onToggleUndoButton={handleToggleUndoButton}
          />

          {board.gameOver && (
            <GameOverComponent
              winner={board.winner}
              playerXName={playerXName}
              playerOName={playerOName}
              onReset={() => {
                updateScore();
                handleReset(setBoard);
              }}
              onQuit={handleQuit}
            />
          )}
        </div>
      );
    default:
      return <div>Error: Unknown game state</div>;
  }
}

export default App;
