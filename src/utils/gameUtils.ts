// gameUtils manages game logic, handling players moves, computer moves and game resets
// handleColumnClick manages players move and computer moves
// getComputerMove decide the computer moves based on the selected difficulty level
// handleReset resets the game board to its initial state.

import Board from '../classes/Board';
import Player from '../classes/Player';
import { getBestMove } from '../classes/AiHardMode';

// Handles a click on a column in the game board
export const handleColumnClick = (
  column: number,
  board: Board,
  playerX: Player | null,
  playerO: Player | null,
  setBoard: (board: Board) => void,
  difficulty: 'easy' | 'hard' | null,
  isLocked: boolean,
  setIsLocked: (locked: boolean) => void,
  isAiVsAi: boolean // Added parameter to determine if it's AI vs AI
) => {
  if (board.gameOver || !playerX || !playerO || isLocked) return;

  setIsLocked(true);

  // Create a copy of the current board state
  const newBoard = new Board();
  newBoard.matrix = board.matrix.map((row) => [...row]);
  newBoard.currentPlayerColor = board.currentPlayerColor;
  newBoard.gameOver = board.gameOver;
  newBoard.isADraw = board.isADraw;
  newBoard.winner = board.winner;
  newBoard.stateUpdater = () => setBoard(newBoard);

  //Player makes a move
  newBoard.dropDisc(column);
  setBoard(newBoard);

  if (isAiVsAi) {
    // Handle AI vs AI scenario
    if (!newBoard.gameOver && newBoard.currentPlayerColor === playerO.color && playerO.isComputer) {
      setTimeout(() => {
        const updatedBoard = new Board();
        updatedBoard.matrix = newBoard.matrix.map((row) => [...row]);
        updatedBoard.currentPlayerColor = newBoard.currentPlayerColor;
        updatedBoard.gameOver = newBoard.gameOver;
        updatedBoard.isADraw = newBoard.isADraw;
        updatedBoard.winner = newBoard.winner;
        updatedBoard.stateUpdater = () => setBoard(updatedBoard);

        // Get the computer's move based on difficulty
        const computerMove = getComputerMove(updatedBoard, difficulty);
        const computerMoveSuccessful = updatedBoard.dropDisc(computerMove);
        // If the computer's move is successful, update the board state
        if (computerMoveSuccessful) {
          setBoard(updatedBoard);
        }
        setIsLocked(false);
      }, 700); // Delay for the computer's move
    } else {
      setIsLocked(false);
    }
  } else {
    // Handle normal Player vs Computer scenario
    if (!newBoard.gameOver && newBoard.currentPlayerColor === playerO.color && playerO.isComputer) {
      setTimeout(() => {
        const updatedBoard = new Board();
        updatedBoard.matrix = newBoard.matrix.map((row) => [...row]);
        updatedBoard.currentPlayerColor = newBoard.currentPlayerColor;
        updatedBoard.gameOver = newBoard.gameOver;
        updatedBoard.isADraw = newBoard.isADraw;
        updatedBoard.winner = newBoard.winner;
        updatedBoard.stateUpdater = () => setBoard(updatedBoard);

        // Get the computer's move based on difficulty
        const computerMove = getComputerMove(updatedBoard, difficulty);
        const computerMoveSuccessful = updatedBoard.dropDisc(computerMove);
        // If the computer's move is successful, update the board state
        if (computerMoveSuccessful) {
          setBoard(updatedBoard);
        }
        setIsLocked(false);
      }, 700); // Delay for the computer's move
    } else {
      setIsLocked(false);
    }
  }
};

// Function to handle the computer's move based on the selected difficulty
export const getComputerMove = (board: Board, difficulty: 'easy' | 'hard' | null): number => {
  if (difficulty === 'easy') {
    // Easy mode: Randomly select an available column
    const availableColumns = board.getAvailableColumns();
    return availableColumns[Math.floor(Math.random() * availableColumns.length)];
  } else if (difficulty === 'hard') {
    // Hard mode: Use advanced AI to choose the best move
    return getBestMove(board);
  }

  // Fallback case (should not occur if difficulty is properly set)
  return 0;
};

// Function to reset the board to its initial state
export const handleReset = (setBoard: (board: Board) => void) => {
  const newBoard = new Board();
  newBoard.stateUpdater = () => setBoard(newBoard);
  newBoard.reset();
  setBoard(newBoard);
};
