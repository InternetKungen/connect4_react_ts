// src/classes/WinCheck.ts
// This class contains the logic to check for a win condition in a Connect-4 style game
export default class WinCheck {
  // Takes the game board (matrix) and the current player's color as inputs
  static checkWin(matrix: Array<Array<string>>, color: string): boolean {
    // Define possible win patterns (offsets) relative to any starting cell in the matrix
    const offsets = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ], // horizontal win pattern (4 consecutive in a row)
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ], // vertical win pattern (4 consecutive in a column)
      [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ], // diagonal win pattern (bottom-left to top-right)
      [
        [0, 0],
        [1, -1],
        [2, -2],
        [3, -3],
      ], // diagonal win pattern (top-left to bottom-right)
    ];

    // Iterate over each cell in the matrix (row and column) treating each cell as a potential starting point for a winning sequence
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[0].length; c++) {
        // For each cell, check each win pattern defined in offsets
        for (const winType of offsets) {
          let colorsInCombo = ''; // initialize an empty string to build the color combination
          // Check the current win pattern by applying the offsets
          for (const [ro, co] of winType) {
            const newRow = r + ro; // Calculate the row index for the current offset
            const newCol = c + co; // Calculate the column index for the current offset

            // Check if the newRow and newCol are within the bounds of the matrix
            if (
              newRow >= 0 &&
              newRow < matrix.length &&
              newCol >= 0 &&
              newCol < matrix[0].length
            ) {
              colorsInCombo += matrix[newRow][newCol]; // add the color at the calculated position to the combination string
            } else {
              colorsInCombo += ' '; // if out of bounds, add an empty space to the combination string
            }
          }
          // If the combination string matches four consecutive pieces of the current player's color, return true
          if (colorsInCombo === color.repeat(4)) {
            return true; // A win condition is met
          }
        }
      }
    }
    // If no win condition is found, return false
    return false;
  }
}
