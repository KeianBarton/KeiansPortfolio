// Setup variables

var gameCanvas;
var gameEngine;

function Main() {
  gameCanvas = new GameCanvas(300,60);
  gameCanvas.createCanvas();
  gameEngine.startNewGame();
  gameEngine.startGameplay();
};
