import { useState } from 'react';
import Board from './classes/Board'; // Importing the Board class that represents the game board
import Player from './classes/Player'; // Importing the Player class for player objects
import BoardComponent from './component/BoardComponent'; // Component to render the board UI
import GameOverComponent from './component/GameOverComponent'; // Component to display game-over message
import StartPage from './Pages/Startpage'; // Start page with options to start the game or view rules
import Rules from './component/GameRules/Rules'; // Component for displaying the game rules
import { GameState } from './utils/Types'; // Importing the game state types for type safety
import './index.css'; // Importing CSS for styling

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
    setGameState('game-board');
  };

  // Handler to show the game rules
  const handleShowRules = () => {
    setGameState('rules');
  };

  // Handler for when a column is clicked (i.e., a disc is dropped into a column)
  const handleColumnClick = (column: number) => {
    if (board.gameOver || !playerX || !playerO) return;
    // Create a copy of the board
    const newBoard = new Board();
    newBoard.matrix = board.matrix.map((row) => [...row]); // Copy the matrix (board state)
    newBoard.currentPlayerColor = board.currentPlayerColor;
    newBoard.gameOver = board.gameOver;
    newBoard.isADraw = board.isADraw;
    newBoard.winner = board.winner;
    newBoard.stateUpdater = () => setBoard(newBoard); // Set the stateUpdater to update the board state
    // Drop a disc in the specified column and update the board
    newBoard.dropDisc(column);
    setBoard(newBoard);
  };

  // Handler to reset the game (creates a new board and resets state)
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

  // Handle player setup form submission
  const handlePlayerSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement)
      .value;
    const playerOName = (form.elements.namedItem('playerO') as HTMLInputElement)
      .value;
    if (playerXName) handleSetPlayer(playerXName, 'X');
    if (playerOName) handleSetPlayer(playerOName, 'O');
  };

  // Conditional rendering based on the current game state
  switch (gameState) {
    // Main menu state, shows the start page with options to start the game or view rules
    case 'main-menu':
      return (
        <StartPage
          onStart={handleStartGame}
          onStartAI={handleStartAI}
          onShowRules={handleShowRules}
        />
      );
    // Rules state, shows the game rules
    case 'rules':
      return <Rules setGameState={setGameState} />;
    // Game board state, shows the game board if both players are set up
    case 'game-board':
      if (!playerX || !playerO) {
        return (
          <div className='app'>
            <h1>Welcome to Connect 4!</h1>
            <form onSubmit={handlePlayerSetupSubmit}>
              <label>
                Player X Name:
                <input name='playerX' placeholder='Enter player name' />
              </label>
              <br />
              <label>
                Player O Name:
                <input name='playerO' placeholder='Enter player name' />
              </label>
              <br />
              <button type='submit'>Start Game</button>
            </form>
          </div>
        );
      }
      // If players are set, show the game board and handle column clicks
      return (
        <div className='app'>
          <BoardComponent board={board} onColumnClick={handleColumnClick} />
          {board.gameOver && (
            <GameOverComponent winner={board.winner} onReset={handleReset} />
          )}
        </div>
      );
    // Fallback case for unexpected states
    default:
      return <div>Error: Unknown game state</div>;
  }
}

export default App;
