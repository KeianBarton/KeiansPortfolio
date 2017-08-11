var gameCanvas;
var gameEngine;
var gameView;

function Main() {
  gameCanvas = new GameCanvas(300);
  gameEngine = new GameEngine(60);
  gameView = new GameView();
  gameCanvas.createCanvas();
  gameEngine.startNewGame();
  gameEngine.startGameplay();
};
