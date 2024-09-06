// src/ai/AiHardMode.ts
import Board from '../classes/Board';

// Simulate a move and check for winning condition
const simulateMove = (board: Board, column: number, playerColor: string): boolean => {
  const boardCopy = new Board();
  boardCopy.matrix = board.matrix.map(row => [...row]);
  boardCopy.currentPlayerColor = playerColor;

  if (!boardCopy.dropDisc(column)) return false;
  return boardCopy.winCheck() === playerColor;
};

// Decide the best move for AI
export const getBestMove = (board: Board): number => {
  const availableColumns = board.getAvailableColumns();
  const aiColor = board.currentPlayerColor;
  const opponentColor = aiColor === 'X' ? 'O' : 'X';

  // 1. Block opponent's winning move
  for (const col of availableColumns) {
    if (simulateMove(board, col, opponentColor)) {
      console.log(`AI blocks opponent's win by dropping disc in column ${col}`);
      return col;
    }
  }

  // 2. Try to create a potential win (2 in a row)
  for (const col of availableColumns) {
    if (createsTwoInLine(board, col, aiColor)) {
      console.log(`AI creates a potential win by dropping disc in column ${col}`);
      return col;
    }
  }

  // 3. Block opponent's potential win (2 in a row)
  for (const col of availableColumns) {
    if (createsTwoInLine(board, col, opponentColor)) {
      console.log(`AI blocks opponent's potential win by dropping disc in column ${col}`);
      return col;
    }
  }

  // 4. Decide the best strategic move based on board state
  const strategicMove = findBestStrategicMove(board);
  if (strategicMove !== null) {
    console.log(`AI chooses strategic move in column ${strategicMove}`);
    return strategicMove;
  }

  // 5. Check for strategic move if not found make random move
  const randomIndex = Math.floor(Math.random() * availableColumns.length);
  console.log(`No immediate win or block; AI chooses random column ${availableColumns[randomIndex]}`);
  return availableColumns[randomIndex];
};

// Check if placing a disc creates a two-in-line
const createsTwoInLine = (board: Board, column: number, playerColor: string): boolean => {
  const boardCopy = new Board();
  boardCopy.matrix = board.matrix.map(row => [...row]);
  boardCopy.currentPlayerColor = board.currentPlayerColor;

  if (!boardCopy.dropDisc(column)) return false;

  // Check for two-in-a-line (horizontally, vertically, diagonally)
  return checkTwoInLine(boardCopy, playerColor);
};

// Check for two-in-line discs
const checkTwoInLine = (board: Board, playerColor: string): boolean => {
  const matrix = board.matrix;
  const directions = [
    { x: 1, y: 0 },  // Horizontal
    { x: 0, y: 1 },  // Vertical
    { x: 1, y: 1 },  // Diagonal down-right
    { x: 1, y: -1 }  // Diagonal up-right
  ];

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (matrix[r][c] === playerColor) {
        for (const dir of directions) {
          let count = 1;
          let x = r + dir.x;
          let y = c + dir.y;

          while (x >= 0 && x < numRows && y >= 0 && y < numCols) {
            if (matrix[x][y] === playerColor) {
              count++;
              if (count === 2) {
                return true;
              }
            } else {
              break;
            }
            x += dir.x;
            y += dir.y;
          }
        }
      }
    }
  }

  return false;
};

// Find the best strategic move (balance between offense and defense)
const findBestStrategicMove = (board: Board): number | null => {
  const centerColumn = Math.floor(board.matrix[0].length / 2);
  if (board.getAvailableColumns().includes(centerColumn)) {
    return centerColumn;  
  }

  
  return null;
};









