// Meteors collection

function Meteors() {
  this.list=[];
};

Meteors.prototype = {
  add: function(meteor){
    this.list.push(meteor);
  },
  remove: function(meteor){
    var index = this.list.indexOf(meteor);
    this.list.splice(index,1);
  },
  updatePositions: function() {
    // Reversed loop as we may need to delete meteors from the Meteors array
    for (var i = this.list.length-1; i>=0; i--) {
      if (!gameEngine.isPaused) {
        this.list[i].updatePosition();
      } else {
        gameView.drawMeteor(this.list[i]);
      }
    }
  }
};

// Single meteor

function Meteor(x,y,speed,size,meteorType,spin) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.meteorType = meteorType;
  this.spin = spin;
  this.angle = 0;
};

Meteor.prototype = {
  updatePosition: function() {
    if (!gameEngine.isGameOver && this.hasCrashedWithShip()) {
      gameEngine.isGameOver = true;
      gameEngine.pauseBeforeGameOverScreen();
      ship.explode(this);
      this.remove();
      return;
    }
    this.y += this.speed;
    this.angle += this.spin;
    gameView.drawMeteor(this);
    if (this.y > gameCanvas.size + this.size) {
      if (!gameEngine.isGameOver) {
        gameEngine.updateScore(100);
      }
      this.remove();
    }
  },
  hasCrashedWithShip: function() {
    return (this.calcDistanceToShip()<=0.8*this.size) ? true : false;
  },
  calcDistanceToShip: function() {
    return Math.sqrt(Math.pow(ship.x-this.x,2)+Math.pow(ship.y-this.y,2));
  },
  remove: function() {
    gameEngine.meteors--;
    meteors.remove(this);
    this.y=-100;
    this.speed=0;
  }
};

// Meteors on start screen

function StartScreenMeteor() {
  this.direction = Math.random()*Math.PI*2;
  this.randomizeAttributes();
  this.setOutsideCanvas();
};

StartScreenMeteor.prototype = {
  randomizeAttributes: function() {
    this.speed = 1 + Math.random()*4;
    this.angle = Math.random()*Math.PI*2;
    this.spin = Math.PI * (-1/gameEngine.fps + Math.random()*2/gameEngine.fps);
    this.meteorType = Math.ceil(5*Math.random());
    this.size = 0.06*gameCanvas.size+0.06*Math.random()*gameCanvas.size;
  },
  updatePosition: function() {
    this.x += this.speed*Math.cos(this.direction);
    this.y += this.speed*Math.sin(this.direction);
    this.angle += this.spin;
    if (this.x < -this.size ||
        this.x > gameCanvas.size + this.size ||
        this.y < -this.size ||
        this.y > gameCanvas.size + this.size) {
          this.loopMeteor();
    }
    gameView.drawMeteor(this);
  },
  loopMeteor: function() {
    this.setOutsideCanvas();
    this.randomizeAttributes();
  },
  setOutsideCanvas: function() {
    // Make the meteor move to one of 4 possible scenarios for looping:
    // In particular, 1 represents entering from top of canvas
    //                2 represents entering from right of canvas
    //                3 represents entering from bottom of canvas
    //                4 represents entering from left of canvas
    // Angles are measured anticlockwise from the horziontal
    var loopChoice = Math.ceil(4*Math.random());
    if (loopChoice == 1) {
      this.x = Math.random()*gameCanvas.size;
      this.y = -this.size - 0.5*Math.random()*gameCanvas.size;
      this.direction = Math.PI + Math.random()*Math.PI;
    } else if (loopChoice == 2) {
      this.x = gameCanvas.size + this.size + 0.5*Math.random()*gameCanvas.size;
      this.y = Math.random()*gameCanvas.size;
      this.direction = Math.PI/2 + Math.random()*Math.PI;
    } else if (loopChoice == 3) {
      this.x = Math.random()*gameCanvas.size;
      this.y = gameCanvas.size + this.size + 0.5*Math.random()*gameCanvas.size;
      this.direction = Math.random()*Math.PI;
    } else {
      this.x = -this.size - 0.5*Math.random()*gameCanvas.size;
      this.y = Math.random()*gameCanvas.size;
      this.direction = 3*Math.PI/2 + Math.random()*Math.PI;
    }
  }
};
