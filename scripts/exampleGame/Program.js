// Setup variables

var gameCanvas;
var stars;

function Main() {
  gameCanvas = new GameCanvas(300,300,60);
  gameCanvas.initialize();
  stars = new Stars(200,1,0.5,1.5);
  stars.initialize();
}

// Main game canvas

function GameCanvas(width,height,fps) {
  this.width = width;
  this.height = height;
  this.fps = fps;
}

GameCanvas.prototype = {
  initialize: function() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.id = "javaScriptGameArea";
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(redrawGameArea,1000/this.fps);
    document.getElementById("javaScriptExample").appendChild(this.canvas);
  }
};

// Update drawings

function redrawGameArea() {
  var ctx = gameCanvas.context;
  ctx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  stars.updatePositions();
}
