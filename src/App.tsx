import { useState, useEffect } from 'react';
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
import SettingsMenu from './components/SettingsMenu/SettingsMenu';
import TimerDisplay from './components/Timer/Timer';
import { getBestMove } from './classes/AiHardMode';
import useSound , { getGlobalSoundEnabled } from './hooks/useSound';

/*Sounds*/
import backgroundSound from './assets/sounds/backgroundSound.mp3';

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
  const [isAiVsAi, setIsAiVsAi] = useState<boolean>(false); 
  const [boardHistory, setBoardHistory] = useState<Board[]>([]);

  // State to store player names
  const [playerXName, setPlayerXName] = useState<string>('');
  const [playerOName, setPlayerOName] = useState<string>('');

  // State for settings
  const [hideUndoButton, setHideUndoButton] = useState<boolean>(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds per turn
  
  // Set fixed volume for each sound
  const { playSound: playBackgroundSound, stopSound: stopBackgroundSound } = useSound(backgroundSound, 0.3, 15);

  // Listen for first interaction - to start play the background sound
  const [hasInteracted, setHasInteracted] = useState(false);

  // useEffect(() => {
  //   const handleInteraction = () => {
  //     if (!hasInteracted) {
  //       setHasInteracted(true);
  //       playBackgroundSound();
  //     }
  //   };

  //   // Lägg till eventlistener för olika interaktioner
  //   document.addEventListener('click', handleInteraction);
  //   document.addEventListener('touchstart', handleInteraction);

  //   // Rensa eventlisteners när komponenten avmonteras
  //   return () => {
  //     document.removeEventListener('click', handleInteraction);
  //     document.removeEventListener('touchstart', handleInteraction);
  //   };
  // }, [hasInteracted]);

  // useEffect(() => {
  //   if (gameState === 'main-menu' && hasInteracted) {
  //     playBackgroundSound();
  //   }
  // }, [gameState, hasInteracted]);
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (getGlobalSoundEnabled()) {
          playBackgroundSound();
        }
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted, playBackgroundSound]);

  useEffect(() => {
    if (gameState === 'main-menu' && hasInteracted) {
      if (getGlobalSoundEnabled()) {
        playBackgroundSound();
      } else {
        stopBackgroundSound();
      }
    }
  }, [gameState, hasInteracted, playBackgroundSound, stopBackgroundSound]);

  // Lägg till denna useEffect för att lyssna på ändringar i globala ljudinställningar
  useEffect(() => {
    const handleGlobalSoundChange = () => {
      if (getGlobalSoundEnabled()) {
        playBackgroundSound();
      } else {
        stopBackgroundSound();
      }
    };

    // Lyssna på en anpassad event för ljudändringar
    window.addEventListener('globalSoundChange', handleGlobalSoundChange);

    return () => {
      window.removeEventListener('globalSoundChange', handleGlobalSoundChange);
    };
  }, [playBackgroundSound, stopBackgroundSound]);
  // Handler to start the game (Player vs Player)
  const handleStartGame = () => {
    setAiSetup(false); // Ensure AI setup is not active
    setIsAiVsAi(false); // Disable AI vs AI
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
    setIsAiVsAi(false); // Disable AI vs AI
    setGameState('player-name-setup'); // Go to player name setup
  };

  const handleRestart = () => {
    handleReset(setBoard);
    setPlayerXScore(0);
    setPlayerOScore(0);
    resetTimer(); // Reset timer when restarting the game
  };

  // Render the main menu screen and reset the board, scores, and player names
  const handleQuit = () => {
    setGameState('main-menu');
    handleReset(setBoard);
    setPlayerXScore(0);
    setPlayerOScore(0);
    resetTimer(); // Reset the timer when quitting the game
    setIsAiVsAi(false); // Reset AI vs AI mode
  };

  const handleSelectedDifficulty = (selectedDifficulty: 'easy' | 'hard') => {
    setDifficulty(selectedDifficulty);
    setPlayerX(new Player('Player X', 'X', false));
    setPlayerO(new Player('Computer', 'O', true));
    setGameState('game-board');
  };

  const handleStartAIVsAI = () => {
  setPlayerX(new Player('AI X', 'X', true)); // Set player X to AI X
  setPlayerO(new Player('AI O', 'O', true)); // Set player O to AI O
  setPlayerXName('AI X'); // Set the display name for Player X
  setPlayerOName('AI O'); // Set the display name for Player O
  setIsAiVsAi(true); // Enable AI vs AI mode
  setGameState('game-board'); // Transition to the game board
};
  // Handler to show the game rules
  const handleShowRules = () => {
    setGameState('rules');
  };

  const handleOpenSettings = () => {
    setGameState('settings'); // Set game state to 'settings'
  };

  // Function to handle player name setup and transition to game board
  const handlePlayerSetupSubmit = (playerXName: string, playerOName?: string) => {
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
      resetTimer(); // Ensure the timer starts when the game board is rendered
    }
  };


  // AI vs AI game logic
  useEffect(() => {
  console.log('AI vs AI Check:', isAiVsAi);
  if (isAiVsAi && gameState === 'game-board' && !board.gameOver && !isLocked) {
    const currentAIPlayer = board.currentPlayerColor === 'X' ? playerX : playerO;
    console.log('Current AI Player:', currentAIPlayer);

    if (currentAIPlayer?.isComputer) {
      setIsLocked(true);

      const column = getBestMove(board);
      console.log('AI Move Column:', column);

      setTimeout(() => {
        handleColumnClick(
          column,
          board,
          playerX,
          playerO,
          setBoard,
          difficulty,
          isLocked,
          setIsLocked,
          isAiVsAi
        );
      }, 1000);
    }
  }
}, [board, isAiVsAi, gameState, playerX, playerO, isLocked, difficulty]);



  // Timer logic
  useEffect(() => {
    // Only run the timer if the game is on the board and it's not over
    if (gameState === 'game-board' && timeLeft > 0 && !board.gameOver) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timerId); // Clear the timer on unmount or reset
    }

    // If the timer hits zero, handle the timeout
    if (timeLeft === 0 && !board.gameOver) {
      handleTimeout();
    }
  }, [timeLeft, gameState, board.gameOver]);

  // This useEffect ensures the timer is reset when game bord renders
  useEffect(() => {
    if (gameState === 'game-board') {
      resetTimer();
    }
  }, [gameState]);

  // Stop the timer when game is over
  /* useEffect(() => {
    if (board.gameOver) {
      handleGameOver(); // Stop the timer when game is over
    }
  }, [board.gameOver]); */

  // Handle when the timer runs out
  const handleTimeout = () => {
    if (board.currentPlayerColor === playerX?.color) {
      // Switch turn to Player O or AI when Player X's time runs out
      setBoard((prevBoard) => {
        const newBoard = new Board();
        newBoard.matrix = prevBoard.matrix.map((row) => [...row]);
        newBoard.currentPlayerColor = 'O'; // Switch turn to O
        return newBoard;
      });
    } else {
      // Switch turn to Player X when Player O's time runs out
      setBoard((prevBoard) => {
        const newBoard = new Board();
        newBoard.matrix = prevBoard.matrix.map((row) => [...row]);
        newBoard.currentPlayerColor = 'X'; // Switch turn to X
        return newBoard;
      });
    }
    resetTimer(); // Reset timer after switch
  };

  // Function to reset timer after each move
  const resetTimer = () => {
    setTimeLeft(30); // Reset timer to initial value
  };
  // Function to stop the timer and reset the timer display
  /*  const handleGameOver = () => {
    if (board.gameOver) {
      setTimeLeft(0);
    }
  }; */

  // Score Update Function that checks the winner after each game ends
  const updateScore = () => {
    if (board.winner === 'X') {
      setPlayerXScore((prevScore) => prevScore + 1); // Increment Player X score if win
    } else if (board.winner === 'O') {
      setPlayerOScore((prevScore) => prevScore + 1); // Increment Player O (or AI) score if win
    }

    setBoardHistory([]); //Clearing the board history when theres a win/draw in a game
  };

  // Undo-Move handler
  const handleUndoMove = () => {
    //Checking if there's any history to undo, checking that the game is not over before making the undo move
    if (boardHistory.length > 0 && !board.gameOver) {
      //Retrieving the last board state from history
      const previousBoard = boardHistory[boardHistory.length - 1];
      //Updating the board history, removing the last state
      setBoardHistory((prevHistory) => prevHistory.slice(0, -1)); //Removing the last state from history
      //Setting the board to previous state
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
            onStartAIVsAI={handleStartAIVsAI}  
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
        <div className="app">
          <img className="background-menu" src="./img/background-menu.png" alt="background" />
          <div className="empty-board"></div>
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
        <div className="app">
          <img className="background-menu" src="./img/background-menu.png" alt="background" />
          <div className="empty-board"></div>
          <ComputerMenu onSelectDifficulty={handleSelectedDifficulty} />
        </div>
      );
    case 'game-board':
      if (!playerX || !playerO) {
        return <div>Loading player setup...</div>;
      }
      return (
        <div className="app">
          <img className="background-menu" src="./img/background-menu.png" alt="background" />
          <div className="empty-board"></div>
          <ScoreBoard
            playerXName={playerXName || 'Player X'}
            playerOName={playerOName || 'Player O'}
            playerXScore={playerXScore}
            playerOScore={playerOScore}
          />
          <PlayerTurnDisplay playerTurn={board.currentPlayerColor as 'X' | 'O'} />
          <BoardComponent
            board={board}
            onColumnClick={(column: number) => {
              setBoardHistory((prevHistory) => [...prevHistory, board]);
              handleColumnClick(
                column,
                board,
                playerX,
                playerO,
                setBoard,
                difficulty,
                isLocked,
                setIsLocked,
                isAiVsAi
              );
              resetTimer(); // Reset timer after each move
            }}
            isLocked={isLocked}
            isAiVsAi={isAiVsAi}
          />
          <TimerDisplay timeLeft={timeLeft} />
          <div className="board-button-container">
              <div className="menu-button-container">
                <PopUpMenu
                  onRestart={handleRestart}
                  onQuit={handleQuit}
                  hideBackgroundEffect={hideBackgroundEffect}
                  hideUndoButton={hideUndoButton}
                  onToggleBackground={handleToggleBackgroundEffect}
                  onToggleUndoButton={handleToggleUndoButton}
                    />
              </div>
            {!hideUndoButton && (
              <div className="undo-container">
                <button onClick={handleUndoMove} disabled={boardHistory.length === 0}>
                  Undo Move
                </button>
              </div>
            )}
          </div>
          {board.gameOver && (
            <GameOverComponent
              winner={board.winner}
              playerXName={playerXName}
              playerOName={playerOName}
              onReset={() => {
                updateScore(); // Update the score after the game is over
                handleReset(setBoard); // Reset the game board for a new game
                resetTimer(); // Reset timer the game is over
                /* handleGameOver(); */
              }}
              onQuit={() => {
                handleQuit(); // Quit the game
                /* handleGameOver(); */ // Stop the timer when quitting
              }}
            />
          )}
        </div>
      );
    default:
      return <div>Error: Unknown game state</div>;
  }
}

export default App;
