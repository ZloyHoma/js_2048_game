'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

// Write your code here

while (game.getStatus() === 'playing') {
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        game.moveLeft();
        console.log('Left arrow pressed');
        break;
      case 'ArrowRight':
        game.moveRight();
        console.log('Right arrow pressed');
        break;
      case 'ArrowUp':
        game.moveUp();
        console.log('Up arrow pressed');
        break;
      case 'ArrowDown':
        game.moveDown();
        console.log('Down arrow pressed');
        break;
      default:
        break;
    }
  });
}
