// src/classes/WinCheck.ts
export default class WinCheck {
  static checkWin(matrix: Array<Array<string>>, color: string): boolean {
    const offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 win
      [[0, 0], [1, -1], [2, -2], [3, -3]] // diagonal 2 win
    ];

    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[0].length; c++) {
        for (const winType of offsets) {
          let colorsInCombo = '';
          for (const [ro, co] of winType) {
            const newRow = r + ro;
            const newCol = c + co;

            // Check if newRow and newCol are within bounds
            if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length) {
              colorsInCombo += matrix[newRow][newCol];
            } else {
              colorsInCombo += ' '; 
            }
          }
          if (colorsInCombo === color.repeat(4)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
