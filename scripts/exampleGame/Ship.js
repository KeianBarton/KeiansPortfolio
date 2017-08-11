function Ship() {
  this.size = gameCanvas.size/10;
  this.x = gameCanvas.size/2;
  this.initialY = 0.95*gameCanvas.size - this.size/2;
  this.y = this.initialY;
  this.imageName = "shipCentre";
  gameView.drawShip(this);
};

Ship.prototype = {
  updatePosition: function() {
    if (!gameEngine.isPaused) {
      this.x += (this.relativePositionToMouse())/8;
      if (this.x<0.1*gameCanvas.size) { this.x = 0.1*gameCanvas.size; }
      if (this.x>0.9*gameCanvas.size) { this.x = 0.9*gameCanvas.size; }
      this.y = this.initialY
        - 0.2*((gameEngine.difficultyFactor-1)/4)*gameCanvas.size;
    }
    gameView.drawShip(this);
  },
  relativePositionToMouse: function() {
    return gameEngine.mousex-this.x;
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
  }
};
