// Create meteors on a regular basis

var gameEngine = {};
var stars;
var meteors;

gameEngine.startNewGame = function() {
  this.difficulty = 1;
  this.meteors = 0;
  this.score = 0;
  this.frame = 1;
  this.gameOver = 0;
  stars = new Stars(200,this.difficulty,0.5,1.5);
  meteors = new Meteors();
  // this interval is fixed at the moment and needs to be variable
  setInterval(this.createMeteors,1500 - 200*this.difficulty);
};

gameEngine.createMeteors = function() {
  var meteorImage = Math.ceil(5*Math.random());
  var meteorX = 0.05*gameCanvas.width+0.8*Math.random()*gameCanvas.width;
  var meteorSize = gameCanvas.width/15+Math.random()*gameCanvas.width/15;
  var meteorSpeed = gameEngine.difficulty;
  var meteor = new Meteor(meteorX,-meteorSize,meteorSpeed,meteorSize,meteorImage);
  meteors.add(meteor);
  gameEngine.meteors++;
};

gameEngine.updateScore = function() {
  gameEngine.score+=100;
  if (gameEngine.score<5000) {
    gameEngine.difficulty = 1+gameEngine.score/1000;
  } else {
    gameEngine.difficulty = 5;
  }
}

// Update view

gameEngine.updateFrame = function() {
  gameCanvas.frame++;
  var ctx = gameCanvas.context;
  ctx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  stars.updatePositions();
  meteors.updatePositions();
};
