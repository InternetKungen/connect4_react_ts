// src/App.tsx
import { useState } from 'react';
import Board from './classes/Board';
import Player from './classes/Player';
import BoardComponent from './component/BoardComponent';
import GameOverComponent from './component/GameOverComponent';
import StartPage from './Pages/Startpage';


import './index.css';

function App() {
  //Set up the starting game board with useState
  const [board, setBoard] = useState(new Board());
  //Set up the stats for players by using useState
   const [playerX, setPlayerX] = useState<Player | null>(null);
  const [playerO, setPlayerO] = useState<Player | null>(null);
  const [gameStarted, setGameStarted] = useState(false);


   // Handler to start the game
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Handle function column click on game board.
  const handleColumnClick = (column: number) => {
    if (board.gameOver || !playerX || !playerO) return;
    // Creating a new board instance and copying the current board state into it.
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
// Handle function resetting the game 
  const handleReset = () => {
    const newBoard = new Board();
    newBoard.stateUpdater = () => setBoard(newBoard);
    newBoard.reset();
    setBoard(newBoard);
  };
//function to set players name and color.
  const handleSetPlayer = (name: string, color: 'X' | 'O') => {
    if (color === 'X') {
      setPlayerX(new Player(name, color));
    } else {
      setPlayerO(new Player(name, color));
    }
  };

    if (!gameStarted) {
    return <StartPage onStart={handleStartGame} />;
  }
  
  // if player names are not set, render the form to do so.
  if (!playerX || !playerO) {
    return (
      <div className="app">
        <h1>Welcome to Connect 4!</h1>§§
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement).value;
            const playerOName = (form.elements.namedItem('playerO') as HTMLInputElement).value;
            if (playerXName) handleSetPlayer(playerXName, 'X');
            if (playerOName) handleSetPlayer(playerOName, 'O');
          }}
        >
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
// if the game is over render the game over message and game board.
  return (
    <div className="app">
      <BoardComponent board={board} onColumnClick={handleColumnClick} />
      {board.gameOver && (
        <GameOverComponent winner={board.winner} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;






