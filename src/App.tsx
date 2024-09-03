import { useState } from 'react';
import Board from './classes/Board';
import Player from './classes/Player';
import BoardComponent from './components/BoardComponent/BoardComponent';
import GameOverComponent from './components/GameOverComponent/GameOverComponent';
import StartPage from './Pages/Startpage';
import Rules from './components/GameRules/Rules';
import PlayerNames from './components/PlayerNames/PlayerNames';
import { GameState } from './utils/Types';

import './index.css';

function App() {
  // State to manage the current view
  const [gameState, setGameState] = useState<GameState>('main-menu');
  const [board, setBoard] = useState(new Board());
  const [playerX, setPlayerX] = useState<Player | null>(null);
  const [playerO, setPlayerO] = useState<Player | null>(null);

  // Handler to start the game (Player vs Player)
  const handleStartGame = () => {
    setGameState('game-board');
  };

  // Handler to start the game against AI
  const handleStartAI = () => {
    // Logic for AI game initialization can go here
    setGameState('game-board');
  };

  // Handler to show the game rules
  const handleShowRules = () => {
    setGameState('rules');
  };

  // Handler for column clicks on the game board
  const handleColumnClick = (column: number) => {
    if (board.gameOver || !playerX || !playerO) return;

    const newBoard = new Board();
    newBoard.matrix = board.matrix.map(row => [...row]);
    newBoard.currentPlayerColor = board.currentPlayerColor;
    newBoard.gameOver = board.gameOver;
    newBoard.isADraw = board.isADraw;
    newBoard.winner = board.winner;
    newBoard.stateUpdater = () => setBoard(newBoard);

    newBoard.dropDisc(column);
    setBoard(newBoard);
  };

  // Handler to reset the game
  const handleReset = () => {
    const newBoard = new Board();
    newBoard.stateUpdater = () => setBoard(newBoard);
    newBoard.reset();
    setBoard(newBoard);
  };

  // Function to set players' names and colors
  const handleSetPlayer = (name: string, color: 'X' | 'O') => {
    if (color === 'X') {
      setPlayerX(new Player(name, color));
    } else {
      setPlayerO(new Player(name, color));
    }
  };



  // Conditional rendering based on the current game state
   switch (gameState) {
    case 'main-menu':
      return (
        <StartPage 
          onStart={handleStartGame} 
          onStartAI={handleStartAI} 
          onShowRules={handleShowRules} 
        />
      );
    case 'rules':
      return (
        <Rules
          setGameState={setGameState}
        />
      );
    case 'game-board':
      if (!playerX || !playerO) {
        return (
          <PlayerNames onSetPlayer={handleSetPlayer} />
        );
      }
      return (
        <div className="app">
          <BoardComponent board={board} onColumnClick={handleColumnClick} />
          {board.gameOver && (
            <GameOverComponent winner={board.winner} onReset={handleReset} />
          )}
        </div>
      );
    default:
      return <div>Error: Unknown game state</div>;
  }
}

export default App;







