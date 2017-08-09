// Setup variables

var gameCanvas;
var gameEngine;

function Main() {
  gameCanvas = new GameCanvas(300,60);
  gameCanvas.createCanvas();
  gameEngine.startNewGame();
  gameEngine.startGameplay();
};

// Main game canvas

function GameCanvas(size,fps) {
  this.size = size;
  this.fps = fps;
};

GameCanvas.prototype = {
  createCanvas: function() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "javaScriptGameArea";
    this.canvas.innerHTML =
      "Your browser does not support the HTML5 canvas tag.";
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.canvas.addEventListener("mouseover",this.activateCanvas);
    this.canvas.addEventListener("mouseout",this.deactivateCanvas);
    this.canvas.addEventListener("mousemove",this.updateMouse);
    this.context = this.canvas.getContext("2d");
    document.getElementById("javaScriptExample").appendChild(this.canvas);

    this.isActive = false;
    this.isDimmed = false;

    this.mousex = 0;
    this.mousey = 0;
    this.width = this.size;
    this.height = this.size;
    this.interval = setInterval(gameEngine.updateFrame,1000/this.fps);
  },
  updateMouse: function(event) {
    this.mousex =event.clientX-this.getBoundingClientRect().left;
    this.mousey = event.clientY-this.getBoundingClientRect().top;
  },
  activateCanvas: function() {
    gameCanvas.isActive = true;
    gameCanvas.canvas.style.cursor = "none";
  },
  deactivateCanvas: function() {
    gameCanvas.isActive = false;
    gameCanvas.canvas.style.cursor = "default";
  },
  dimFrame: function() {
    var ctx = this.context;
    this.isDimmed=true;
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height);
    ctx.globalAlpha = 1;
  }
};
