// Setup variables

var gameCanvas;
var gameEngine;

function Main() {
  gameCanvas = new GameCanvas(300,60);
  gameCanvas.createCanvas();
  gameEngine.startNewGame();
}

// Main game canvas

function GameCanvas(size,fps) {
  this.size = size;
  this.fps = fps;
}

GameCanvas.prototype = {
  createCanvas: function() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.width = this.size;
    this.height = this.size;
    this.canvas.id = "javaScriptGameArea";
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(gameEngine.updateFrame,1000/this.fps);
    document.getElementById("javaScriptExample").appendChild(this.canvas);
  }
};
