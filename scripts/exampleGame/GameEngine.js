var gameView;
var stars;
var startScreenMeteor;
var meteors;
var ship;
var shipExplosion;
var cursor;
var updateFrameSetInterval;
var createMeteorsSetInterval;
var pauseBeforeGameOverScreenSetTimeout;

function GameEngine(fps, isMobile) {
  this.fps = fps;
  this.isMobile = isMobile;
  this.setGameEngineValues();
};

GameEngine.prototype = {
  setGameEngineValues: function(mouseX,mouseY) {
    this.difficultyFactor = 1;
    this.meteors = 0;
    this.score = 0;
    this.frame = 1;
    this.isDimmed = true;
    this.isNewGame = true;
    this.isGameOver = false;
    this.isPaused = true;
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
    this.mouseX = -1;
    this.mouseY = -1;
  },
  startNewGame: function() {
    gameView = new GameView();

    startScreenMeteor = new StartScreenMeteor();

    var numberOfStars = gameEngine.isMobile ? 50 : 100;
    var starSize = 0.002*gameCanvas.size;
    var starSpeed = this.difficultyFactor;
    var starSizeSpread = 1.5;
    stars = new Stars(numberOfStars,starSize,starSpeed,starSizeSpread);

    meteors = new Meteors();

    var shipX = 0.5*gameCanvas.size;
    var shipSize = 0.1*gameCanvas.size;
    var shipInitialY = 0.95*gameCanvas.size - 0.5*shipSize;
    var shipY = shipInitialY;
    var shipImage = "shipCentre";
    ship = new Ship(shipX,shipY,shipInitialY,shipSize,shipImage);

    var cursorX = 0.5*gameCanvas.size;
    var cursorY = 0.5*gameCanvas.size;
    var cursorSize = 0.04*gameCanvas.size;
    cursor = new Cursor(cursorX,cursorY,cursorSize);

    updateFrameSetInterval = setInterval(this.updateFrame,1000/this.fps);
    createMeteorsSetInterval = setInterval(this.createMeteors,1000/this.fps);
  },
  resetGame: function() {
    this.setGameEngineValues();
  },
  createMeteors: function() {
    if(gameEngine.isPaused) { return; }
    for (var j = 0; j<gameEngine.difficultyProgression.length; j++) {
      if (gameEngine.score < gameEngine.difficultyProgression[j][0] &&
        gameEngine.timeBeforeNextMeteor<= 0) {
        gameEngine.timeBeforeNextMeteor=gameEngine.difficultyProgression[j][1]
        gameEngine.createMeteor(gameEngine.difficultyProgression[j][2]);
        return;
      }
    }
    // game will continue on hardest setting
    var maxDifficultyLevel = gameEngine.difficultyProgression.length-1;
    if (gameEngine.score >=
        gameEngine.difficultyProgression[maxDifficultyLevel][0] &&
      gameEngine.timeBeforeNextMeteor<= 0) {
      gameEngine.timeBeforeNextMeteor=
        gameEngine.difficultyProgression[maxDifficultyLevel][1]
      gameEngine.createMeteor(
        gameEngine.difficultyProgression[maxDifficultyLevel][2]);
      return;
    }
  },
  createMeteor: function(number) {
    for (var i = 1; i<=number; i++){
      var meteorImage = Math.ceil(5*Math.random());
      var meteorSize = 0.06*gameCanvas.size+0.06*Math.random()*gameCanvas.size;
      var meteorX = 0.1*gameCanvas.size+0.8*Math.random()*gameCanvas.size;
      var meteorY = -meteorSize;
      // Adjust the starting point of meteors when multiple are created
      // Make sure this distance is at least the ship's height apart
      if (i > 1) {
        meteorY = -meteorSize - ship.size -
          Math.random()*(gameCanvas.size-ship.size);
      }
      var meteorSpeed = 3*gameEngine.difficultyFactor;
      // meteor spin (per frame) is randomly assigned between -pi/fps and pi/fps
      var meteorSpin =
        Math.PI * (-1/gameEngine.fps + Math.random()*2/gameEngine.fps);
      var meteor =
        new Meteor(meteorX,meteorY,meteorSpeed,meteorSize,meteorImage,meteorSpin);
      meteors.add(meteor);
      this.meteors++;
    }
  },
  updateScore: function(score) {
    this.score+=score;
    this.updateDifficultyFactor();
  },
  updateDifficultyFactor: function() {
    if (this.score<25000) {
      this.difficultyFactor = 1+4*this.score/25000;
    } else {
      this.difficultyFactor = 5;
    }
  },
  updateCursorPosition: function(e) {
    gameView.disableMouse();
    if (!gameEngine.isMobile) {
      gameEngine.mouseX =e.clientX-gameCanvas.canvas.getBoundingClientRect().left;
      gameEngine.mouseY = e.clientY-gameCanvas.canvas.getBoundingClientRect().top;
    } else {
      var touchList = e.changedTouches;
      var lastTouch = touchList[touchList.length-1];
      gameEngine.mouseX = lastTouch.pageX-gameCanvas.canvas.getBoundingClientRect().left;
      gameEngine.mouseY = lastTouch.pageY-gameCanvas.canvas.getBoundingClientRect().top;
    }
  },
  handleClick: function(e) {
    e.preventDefault();
    if (gameEngine.isGameOver) {
      if (gameView.showGameOverFrame) {
        clearInterval(flashTextSetInterval);
        clearInterval(updateFrameSetInterval);
        clearInterval(createMeteorsSetInterval);
        clearTimeout(pauseBeforeGameOverScreenSetTimeout);
        gameEngine.resetGame();
        gameEngine.startNewGame();
      }
      return;
    }
    if (gameEngine.isMobile) {
      if (gameEngine.isNewGame || gameEngine.isPaused) {
        gameEngine.unpause();
      }
    } else {
      if (gameEngine.isPaused) {
        gameEngine.unpause();
      } else {
        gameEngine.pause();
      }
    }
  },
  handleTouchEnd: function(e) {
    e.preventDefault();
    // On mobile devices, disable pausing by clicking
    gameEngine.pause();
  },
  pause: function() {
    gameCanvas.isDimmed = true;
    gameEngine.isPaused = true;
  },
  unpause: function() {
    gameEngine.isPaused = false;
  },
  pauseBeforeGameOverScreen : function() {
    pauseBeforeGameOverScreenSetTimeout =
      setTimeout(function(){ gameView.showGameOverFrame = true; }, 1500);
  },
  updateFrame: function() {
    var ctx = gameCanvas.context;
    ctx.globalAlpha = 1;
    ctx.clearRect(0,0,gameCanvas.size,gameCanvas.size);
    stars.updatePositions();
    ship.updatePosition();
    meteors.updatePositions();
    gameView.drawRedScreenWhenFast();
    if (gameEngine.isPaused) {
      gameView.drawPausedFrame();
    } else {
      if (gameEngine.isGameOver) {
        shipExplosion.updatePosition();
        gameView.drawGameOverFrame();
        if(gameView.scoreTextY>-0.085*gameCanvas.size) {
          gameView.scoreTextY--;
        }
      }
      gameEngine.isDimmed = false;
      gameView.drawScoreText(gameView.scoreTextY);
      gameEngine.timeBeforeNextMeteor -= 1000/gameEngine.fps;
      if (gameEngine.frame>1) { gameEngine.isNewGame = false; }
      gameEngine.frame++;
    }
    cursor.updatePosition();
  }
};
