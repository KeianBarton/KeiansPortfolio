function Ship() {
  this.size = gameCanvas.size/10;
  this.x = gameCanvas.size/2;
  this.initialY = 0.95*gameCanvas.size - this.size/2;
  this.y = this.initialY;
  this.draw();
};

Ship.prototype = {
  updatePosition: function() {
    this.x += (this.relativePositionToMouse())/8;
    if (this.x<0.1*gameCanvas.size) { this.x = 0.1*gameCanvas.size; }
    if (this.x>0.9*gameCanvas.size) { this.x = 0.9*gameCanvas.size; }
    this.y = this.initialY
      - 0.2*((gameEngine.difficultyFactor-1)/4)*gameCanvas.size;
    this.draw();
  },
  relativePositionToMouse: function() {
    return gameCanvas.mousex-this.x;
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
  draw: function() {
    var imageName = "shipCentre";
    if (this.isMovingLeft()) {
      imageName = "shipLeft";
    }
    if (this.isMovingRight()) {
      imageName = "shipRight";
    }
    var ctx = gameCanvas.context;
    // The ship will be one of 3 images - left, centre, right
    var image = document.getElementById(imageName);
    ctx.save();
    ctx.shadowOffsetY = this.size;
    ctx.shadowBlur = 2*this.size;
    ctx.shadowColor = "#00B2FF";
    ctx.translate(this.x-this.size/2,this.y-this.size/2);
    ctx.drawImage(image,0,0,this.size,this.size);
    ctx.restore();
  }
};
