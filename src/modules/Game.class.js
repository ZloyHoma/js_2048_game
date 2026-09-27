'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    this.board = initialState || [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.status = 'playing';

    // eslint-disable-next-line no-console
    console.log(initialState);
  }

  moveLeft() {
    const rows = this.getState(); // метод getState() вертає поле гри

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]; // отримуємо поточний рядок
      let newRow = row.filter((cell) => cell !== 0); // видаляємо нулі з рядка

      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j] === newRow[j + 1]) {
          newRow[j] *= 2; // подвоюємо значення клітинки
          newRow[j + 1] = 0; // встановлюємо наступну клітинку в 0
          this.score += newRow[j];
          // додаємо до рахунку значення об'єднаної клітинки
          j++; // пропускаємо клітинку бо вона = 0
        }
      }

      newRow = newRow.filter((cell) => cell !== 0);
      // видаляємо нулі після об'єднання клітинок

      while (newRow.length < row.length) {
        newRow.push(0); // додаємо нулі в кінець рядка, щоб зберегти довжину
      }
      rows[i] = newRow; // оновлюємо рядок у масиві rows
    }

    this.board = rows;
  }

  moveRight() {
    const rows = this.getState(); // метод getState() вертає поле гри

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]; // отримуємо поточний рядок
      let newRow = row.filter((cell) => cell !== 0); // видаляємо нулі з рядка

      for (let j = newRow.length - 1; j >= 0; j--) {
        if (newRow[j] === newRow[j - 1]) {
          newRow[j] *= 2; // подвоюємо значення клітинки
          newRow[j - 1] = 0; // встановлюємо попередню клітинку в 0
          this.score += newRow[j];
          // додаємо до рахунку значення об'єднаної клітинки
          j--; // пропускаємо клітинку бо вона = 0
        }
      }

      newRow = newRow.filter((cell) => cell !== 0);
      // видаляємо нулі після об'єднання клітинок

      while (newRow.length < row.length) {
        newRow.unshift(0); // додаємо нулі в початок рядка, щоб зберегти довжину
      }
      rows[i] = newRow; // оновлюємо рядок у масиві rows
    }

    this.board = rows;
  }

  moveUp() {
    const rows = this.getState(); // метод getState() вертає поле гри

    for (let j = 0; j < rows[0].length; j++) {
      const col = rows.map((row) => row[j]); // отримуємо поточний стовпець
      let newCol = col.filter((cell) => cell !== 0);

      for (let i = 0; i < newCol.length - 1; i++) {
        if (newCol[i] === newCol[i + 1]) {
          newCol[i] *= 2;
          newCol[i + 1] = 0;
          this.score += newCol[i];
          i++;
        }
      }

      newCol = newCol.filter((cell) => cell !== 0);

      while (newCol.length < rows.length) {
        newCol.push(0);
      }

      for (let i = 0; i < rows.length; i++) {
        rows[i][j] = newCol[i];
      }
    }

    this.board = rows;
  }

  moveDown() {
    const rows = this.getState(); // метод getState() вертає поле гри

    for (let j = 0; j < rows[0].length; j++) {
      const col = rows.map((row) => row[j]); // отримуємо поточний стовпець
      let newCol = col.filter((cell) => cell !== 0);

      for (let i = newCol.length - 1; i >= 0; i--) {
        if (newCol[i] === newCol[i + 1]) {
          newCol[i] *= 2;
          newCol[i + 1] = 0;
          this.score += newCol[i];
          i--;
        }
      }

      newCol = newCol.filter((cell) => cell !== 0);

      while (newCol.length < rows.length) {
        newCol.unshift(0);
      }

      for (let i = 0; i < rows.length; i++) {
        rows[i][j] = newCol[i];
      }
    }

    this.board = rows;
    this.addRandomCell();
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.board;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */
  start() {
    this.status = 'playing';
    this.addRandomCell();
    this.addRandomCell();
  }

  /**
   * Resets the game.
   */
  restart(initialState = null) {
    this.board = initialState || this.initializeBoard();
    this.score = 0;
    this.status = 'playing';
  }

  // Add your own methods here
  addRandomCell() {
    const cells = [...this.board];
    const emptyCells = cells.filter((cell) => cell === 0);
    const randCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const randValue = Math.random() < 0.9 ? 2 : 4;

    randCell.classList.add(`field-cell--${randValue}`);
    randCell.textContent = randValue;
  }
}

module.exports = Game;
