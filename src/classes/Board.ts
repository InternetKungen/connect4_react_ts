// src/classes/Board.ts
import WinCheck from './Wincheck';

export default class Board {
  matrix: Array<Array<string>> = Array.from({ length: 6 }, () => Array(7).fill(' '));
  currentPlayerColor: string = 'X';
  gameOver: boolean = false;
  isADraw: boolean = false;
  winner: string | null = null;
  stateUpdater?: () => void;

  constructor() {
    this.reset();
  }

  reset(realReset: boolean = true) {
    this.matrix = Array.from({ length: 6 }, () => Array(7).fill(' '));
    this.currentPlayerColor = 'X';
    this.winner = null;
    this.isADraw = false;
    this.gameOver = false;
    if (realReset && this.stateUpdater) {
      this.stateUpdater();
    }
  }

  dropDisc(column: number): boolean {
    if (this.gameOver) return false;

    // Find the first empty row from the bottom up
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = this.currentPlayerColor;
        this.checkWin();  // Check for a win condition
        if (!this.gameOver) {
          this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
        }
        if (this.stateUpdater) {
          this.stateUpdater();
        }
        return true;
      }
    }

    // If column is full, return false
    return false;
  }

  checkWin(): void {
    if (WinCheck.checkWin(this.matrix, this.currentPlayerColor)) {
      this.winner = this.currentPlayerColor;
      this.gameOver = true;
      return;
    }

    // Check for a draw
    if (!this.matrix.flat().includes(' ')) {
      this.isADraw = true;
      this.gameOver = true;
    }
  }

  drawCheck(): boolean {
    return !this.winner && !this.matrix.flat().includes(' ');
  }

  winCheck(): string | false {
    return this.winner || false;
  }

   // Method to get available columns for making a move
  getAvailableColumns(): number[] {
    return this.matrix[0].map((_, colIndex) => colIndex)
      .filter(colIndex => this.matrix[0][colIndex] === ' ');
  }
}




