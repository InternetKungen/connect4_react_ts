// src/classes/Board.ts
// This class handles the game board logic
import WinCheck from './Wincheck'; // Import the WinCheck class, which contains logic to check for win conditions

export default class Board {
  // The game board is represented as a 2D array (6 rows by 7 columns) filled with empty spaces (' ')
  matrix: Array<Array<string>> = Array.from({ length: 6 }, () =>
    Array(7).fill(' ')
  );
  currentPlayerColor: string = 'X'; // the current player's color ('X' or 'O'), starting with 'X'
  gameOver: boolean = false; // a boolean indicating whether the game is over
  isADraw: boolean = false; // a boolean indicating whether the game ended in a draw
  winner: string | null = null; // the winner of the game, if there is one (null if no winner yet)
  stateUpdater?: () => void; // an optional function to update the UI or game state, set externally
  // Constructor to initialize the board
  constructor() {
    this.reset(); // call the reset method to initialize the board
  }
  // Method to reset the game board and state
  reset(realReset: boolean = true) {
    this.matrix = Array.from({ length: 6 }, () => Array(7).fill(' ')); // reinitialize the matrix to empty spaces
    this.currentPlayerColor = 'X'; // reset the current player to 'X'
    this.winner = null; // clear the winner
    this.isADraw = false; // reset draw status
    this.gameOver = false; // reset gameOver status
    // If realReset is true and a stateUpdater is provided, call it to refresh the UI or game state
    if (realReset && this.stateUpdater) {
      this.stateUpdater();
    }
  }
  // Method to drop a disc into a column
  dropDisc(column: number): boolean {
    if (this.gameOver) return false; // if the game is over, do nothing and return false

    // Loop through the rows from bottom to top to find the first empty spot in the column
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = this.currentPlayerColor; // place the current player's disc in the empty spot
        this.checkWin(); // Check if this move wins the game
        // If the game is not over, switch to the other player
        if (!this.gameOver) {
          this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
        }
        // If a stateUpdater is provided, call it to refresh the UI or game state
        if (this.stateUpdater) {
          this.stateUpdater();
        }
        return true; // return true indicating the disc was successfully dropped
      }
    }

    return false; // if the column is full, return false
  }

  // Method to check for a win or draw condition
  checkWin(): void {
    // Use the WinCheck module to determine if the current player has won
    if (WinCheck.checkWin(this.matrix, this.currentPlayerColor)) {
      this.winner = this.currentPlayerColor;
      this.gameOver = true;
      return;
    }

    // Check for a draw (if no empty spaces are left on the board)
    if (!this.matrix.flat().includes(' ')) {
      this.isADraw = true;
      this.gameOver = true;
    }
  }
  // Method to check if the game is a draw
  drawCheck(): boolean {
    return !this.winner && !this.matrix.flat().includes(' ');
  }
  // Method to check for a winner
  winCheck(): string | false {
    return this.winner || false; // return the winner if there is one, or false if there isn't
  }
}
