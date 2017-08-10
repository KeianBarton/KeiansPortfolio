// Create meteors on a regular basis

var gameEngine = new GameEngine();
var stars;
var meteors;
var ship;
var cursor;

function GameEngine() {
  this.difficultyFactor = 1;
  this.meteors = 0;
  this.score = 0;
  this.frame = 1;
  this.gameOver = 0;
  // In seconds
  this.difficultyProgression =
    // easy - 1 meteor spawns every 1.5 seconds for scores less than 1000
    [[1000,1500,1],
    [2000,1325,1],
    [3000,1250,1],
    [4000,1125,1],
    [5000,1000,1],
    [10000,875,2],
    [15000,750,2],
    [20000,625,2],
    // hard - 3 meteors spawns every 0.5 seconds for scores less than 25000
    [25000,625,3]];
  this.timeBeforeNextMeteor = this.difficultyProgression[0][0];
};

gameEngine.startNewGame = function() {
  stars = new Stars(200,gameCanvas.size/400,this.difficultyFactor,1.5);
  meteors = new Meteors();
  ship = new Ship();
  cursor = new Cursor(gameCanvas.size/25);
};

// Controller functions

gameEngine.startGameplay = function() {
  setInterval(this.createMeteors,1000/gameCanvas.fps);
}

gameEngine.createMeteors = function() {
  if(!gameCanvas.isActive) { return; }
  for (var j = 0; j<gameEngine.difficultyProgression.length; j++) {
    if (gameEngine.score < gameEngine.difficultyProgression[j][0] &&
      gameEngine.timeBeforeNextMeteor<= 0) {
      gameEngine.timeBeforeNextMeteor=gameEngine.difficultyProgression[j][1]
      gameEngine.createMeteor(gameEngine.difficultyProgression[j][2]);
      return;
    }
  }
  // game will continue on hardest setting
  var lastLevel = gameEngine.difficultyProgression.length-1;
  if (gameEngine.score >= gameEngine.difficultyProgression[lastLevel][0] &&
    gameEngine.timeBeforeNextMeteor<= 0) {
    gameEngine.timeBeforeNextMeteor=gameEngine.difficultyProgression[lastLevel][1]
    gameEngine.createMeteor(gameEngine.difficultyProgression[lastLevel][2]);
    return;
  }
};

gameEngine.createMeteor = function(number) {
  for (var i = 1; i<=number; i++){
    var meteorImage = Math.ceil(5*Math.random());
    var meteorSize = gameCanvas.size/15+Math.random()*gameCanvas.size/15;
    var meteorX = 0.1*gameCanvas.size+0.8*Math.random()*gameCanvas.size;
    var meteorY = -meteorSize;
    if (i>1) {
      // Adjust the starting point of meteors when multiple are created
      meteorY = -meteorSize - Math.random()*gameCanvas.size;
    }
    var meteorSpeed = gameEngine.difficultyFactor;
    var meteor =
      new Meteor(meteorX,meteorY,meteorSpeed,meteorSize,meteorImage);
    meteors.add(meteor);
    this.meteors++;
  }
};

gameEngine.updateScore = function(score) {
  this.score+=score;
  this.updateDifficultyFactor();
};

gameEngine.updateDifficultyFactor = function() {
  if (this.score<25000) {
    this.difficultyFactor = 1+this.score/6250;
  } else {
    this.difficultyFactor = 5;
  }
}

// View functions

gameEngine.updateFrame = function() {
  var ctx = gameCanvas.context;

  // Only continue the game if the canvas is active
  if (!gameCanvas.isActive){
    if (!gameCanvas.isDimmed){
      gameCanvas.dimFrame();
    }
    return;
  }

  gameCanvas.isDimmed=false;
  ctx.globalAlpha = 1;
  ctx.clearRect(0,0,gameCanvas.size,gameCanvas.size);
  stars.updatePositions();
  meteors.updatePositions();
  ship.updatePosition();
  cursor.updatePosition();

  gameEngine.frame++;
  gameEngine.timeBeforeNextMeteor -= 1000/gameCanvas.fps;
};
