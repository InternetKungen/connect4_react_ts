import Board from '../classes/Board';

// Simulate a move and check for winning condition
const simulateMove = (board: Board, column: number, playerColor: string): boolean => {
  const boardCopy = new Board();
  boardCopy.matrix = board.matrix.map(row => [...row]);
  boardCopy.currentPlayerColor = playerColor;

  if (!boardCopy.dropDisc(column)) return false;
  return boardCopy.winCheck() === playerColor;
};

// Decide the best move for AI with some randomness
export const getBestMove = (board: Board): number => {
  const availableColumns = board.getAvailableColumns();
  const aiColor = board.currentPlayerColor;
  const opponentColor = aiColor === 'X' ? 'O' : 'X';

  // 1. Check for AI's immediate winning move
  for (const col of availableColumns) {
    if (simulateMove(board, col, aiColor)) {
      console.log(`AI wins by dropping disc in column ${col}`);
      return col;
    }
  }

  // 2. Block opponent's immediate winning move
  for (const col of availableColumns) {
    if (simulateMove(board, col, opponentColor)) {
      console.log(`AI blocks opponent's win by dropping disc in column ${col}`);
      return col;
    }
  }

  // 3. Try to create a potential win (3 in a row)
  for (const col of availableColumns) {
    if (createsThreeInLine(board, col, aiColor)) {
      console.log(`AI creates a potential win by dropping disc in column ${col}`);
      return col;
    }
  }

  // 4. Block opponent's potential win (3 in a row)
  for (const col of availableColumns) {
    if (createsThreeInLine(board, col, opponentColor)) {
      console.log(`AI blocks opponent's potential win by dropping disc in column ${col}`);
      return col;
    }
  }

  // 5. Make a random strategic move if no immediate win or block
  const strategicMove = findBestStrategicMove(board);
  if (strategicMove !== null) {
    console.log(`AI chooses strategic move in column ${strategicMove}`);
    return strategicMove;
  }

  // 6. If no strategic move found, pick a random available column
  const randomIndex = Math.floor(Math.random() * availableColumns.length);
  console.log(`No immediate win or block; AI chooses random column ${availableColumns[randomIndex]}`);
  return availableColumns[randomIndex];
};

// Check if placing a disc creates a three-in-line
const createsThreeInLine = (board: Board, column: number, playerColor: string): boolean => {
  const boardCopy = new Board();
  boardCopy.matrix = board.matrix.map(row => [...row]);
  boardCopy.currentPlayerColor = playerColor;

  if (!boardCopy.dropDisc(column)) return false;

  // Check for three-in-a-line (horizontally, vertically, diagonally)
  return checkThreeInLine(boardCopy, playerColor);
};

// Check for three-in-line discs
const checkThreeInLine = (board: Board, playerColor: string): boolean => {
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
              if (count === 3) {
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

// Find the best strategic move (mixes randomness with center preference)
const findBestStrategicMove = (board: Board): number | null => {
  const availableColumns = board.getAvailableColumns();
  const centerColumn = Math.floor(board.matrix[0].length / 2);

  // 50% chance to prioritize center, 50% to randomize
  const prioritizeCenter = Math.random() < 0.5;

  if (prioritizeCenter && availableColumns.includes(centerColumn)) {
    return centerColumn;
  }

  // Choose a random column if center isn't prioritized
  const randomIndex = Math.floor(Math.random() * availableColumns.length);
  return availableColumns[randomIndex];
};









