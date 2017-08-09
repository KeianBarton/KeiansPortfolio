// Create meteors on a regular basis

var gameEngine = new GameEngine();
var stars;
var meteors;

function GameEngine() {
  this.difficulty = 1;
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
  stars = new Stars(200,this.difficulty,0.5,1.5);
  meteors = new Meteors();
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
    var meteorSize = gameCanvas.width/15+Math.random()*gameCanvas.width/15;
    var meteorX = 0.05*gameCanvas.width+0.8*Math.random()*gameCanvas.width;
    var meteorY = -meteorSize;
    if (i>1) {
      // Adjust the starting point of meteors when multiple are created
      meteorY = -meteorSize - Math.random()*gameCanvas.height;
    }
    var meteorSpeed = gameEngine.difficulty;
    var meteor =
      new Meteor(meteorX,meteorY,meteorSpeed,meteorSize,meteorImage);
    meteors.add(meteor);
    this.meteors++;
  }
};

gameEngine.updateScore = function(score) {
  this.score+=score;
  this.updateDifficulty();
};

gameEngine.updateDifficulty = function() {
  if (this.score<25000) {
    this.difficulty = 1+this.score/5000;
  } else {
    this.difficulty = 5;
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
  ctx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  stars.updatePositions();
  meteors.updatePositions();
  gameEngine.frame++;
  gameEngine.timeBeforeNextMeteor -= 1000/gameCanvas.fps;
};
