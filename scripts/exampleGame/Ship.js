function Ship(x,y,startY,size,imageName) {
  this.x = x;
  this.y = y;
  this.startY = startY;
  this.size = size;
  this.imageName = imageName;
  gameView.drawShip(this);
};

Ship.prototype = {
  updatePosition: function() {
    if (!gameEngine.isPaused) {
      this.x += 0.125*(this.relativePositionToMouse());
      if (this.x<0.1*gameCanvas.size) { this.x = 0.1*gameCanvas.size; }
      if (this.x>0.9*gameCanvas.size) { this.x = 0.9*gameCanvas.size; }
      this.y = this.startY
        - 0.2*((gameEngine.difficultyFactor-1)/4)*gameCanvas.size;
    }
    if (!gameEngine.isGameOver) {
      gameView.drawShip(this);
    }
  },
  relativePositionToMouse: function() {
    return gameEngine.mouseX-this.x;
  },
  isMovingLeft: function() {
    if (this.relativePositionToMouse()<-0.02*gameCanvas.size) {
      return true;
    }
    return false;
  },
  isMovingRight: function() {
    if (this.relativePositionToMouse()>0.02*gameCanvas.size) {
      return true;
    }
    return false;
  },
  explode: function(meteor) {
    shipExplosion = new Explosion(this.x,this.y,this.size,meteor.speed);
  }
};
