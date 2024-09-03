import { useState } from 'react';
import Board from './classes/Board';
import Player from './classes/Player';
import BoardComponent from './components/BoardComponent/BoardComponent';
import GameOverComponent from './components/GameOverComponent/GameOverComponent';
import StartPage from './Pages/Startpage';
import Rules from './components/GameRules/Rules';
import { GameState } from './utils/Types';
import './index.css';
import ComputerMenu from './components/ComputerMenu/ComputerMenu';


function App() {
  // State to manage the current view
  const [gameState, setGameState] = useState<GameState>('main-menu');
  const [board, setBoard] = useState(new Board());
  const [playerX, setPlayerX] = useState<Player | null>(null);
  const [playerO, setPlayerO] = useState<Player | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard' | null>(null)

  // Handler to start the game (Player vs Player)
  const handleStartGame = () => {
    setGameState('game-board');
  };

  // Handler to start the game against AI
  const handleStartAI = () => {
    // Logic for AI game initialization can go here
    setGameState('difficulty-selection');
  };

  const handleSelectedDifficulty = (selectedDifficulty: 'easy' | 'hard') => {
    setDifficulty(selectedDifficulty);
    setPlayerO(new Player('Computer', 'O'));
    setGameState('game-board')
  }

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

    //Player makes a move
    newBoard.dropDisc(column);
    setBoard(newBoard);
    console.log("Player move made");

    //Computer makes a move
    if (newBoard.currentPlayerColor === playerO.color) {
    setTimeout(() => {
      const computerMove = getComputerMove(newBoard);
      newBoard.dropDisc(computerMove);
      setBoard(newBoard);
      console.log("Computer move made");
      }, 1700);
    }
  };

  const getComputerMove = (board: Board): number => {
    if (difficulty === 'easy') {
      const availableColumns = board.getAvailableColumns();
      return availableColumns[Math.floor(Math.random() * availableColumns.length)];
    }
    return 0; // Placeholder for hard computer logic
  };

// Handle function resetting the game

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

  // Handle player setup form submission
  const handlePlayerSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement).value;
    const playerOName = (form.elements.namedItem('playerO') as HTMLInputElement).value;
    if (playerXName) handleSetPlayer(playerXName, 'X');
    if (playerOName) handleSetPlayer(playerOName, 'O');
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
    case 'difficulty-selection':
      return (
        <ComputerMenu onSelectDifficulty={handleSelectedDifficulty}/>
      )
    case 'game-board':
      if (!playerX || !playerO) {
        return (
          <div className="app">
            <h1>Welcome to Connect 4!</h1>
            <form onSubmit={handlePlayerSetupSubmit}>
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







