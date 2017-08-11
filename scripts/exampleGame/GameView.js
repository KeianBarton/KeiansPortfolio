// View functions

function GameView() {};

GameView.prototype = {
  redrawFrame: function() {
    var ctx = gameCanvas.context;
    ctx.globalAlpha = 1;
    ctx.clearRect(0,0,gameCanvas.size,gameCanvas.size);
    stars.updatePositions();
    meteors.updatePositions();
    ship.updatePosition();
    if (gameEngine.isPaused) {
      gameView.dimFrame();
    } else {
      gameEngine.frame++;
      gameEngine.timeBeforeNextMeteor -= 1000/gameEngine.fps
    }
    cursor.updatePosition();
  },
  dimFrame: function() {
    var ctx = gameCanvas.context;
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,gameCanvas.size,gameCanvas.size);
    ctx.globalAlpha = 1;
  },
  drawStar: function(star) {
    var ctx = gameCanvas.context;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2, true);
    ctx.fillStyle = "white";
    ctx.fill();
  },
  drawShip: function(ship) {
    var imageName;
    if (!gameEngine.isPaused) {
      imageName = "shipCentre";
      if (ship.isMovingLeft()) {
        imageName = "shipLeft";
      }
      if (ship.isMovingRight()) {
        imageName = "shipRight";
      }
      ship.imageName=imageName;
    } else {
      imageName=ship.imageName;
    }
    var ctx = gameCanvas.context;
    // The ship will be one of 3 images - left, centre, right
    var image = document.getElementById(imageName);
    ctx.save();
    ctx.shadowOffsetY = ship.size;
    ctx.shadowBlur = 2*ship.size;
    ctx.shadowColor = "#00B2FF";
    ctx.translate(ship.x-ship.size/2,ship.y-ship.size/2);
    ctx.drawImage(image,0,0,ship.size,ship.size);
    ctx.restore();
  },
  drawMeteor: function(meteor) {
    var ctx = gameCanvas.context;
    // The meteor will be one of 5 images
    var imageName = "meteor"+meteor.meteorType.toString();
    var image = document.getElementById(imageName);
    ctx.save();
    ctx.shadowBlur = meteor.size*2;
    ctx.shadowColor = "orange";
    ctx.translate(meteor.x,meteor.y);
    ctx.rotate(meteor.angle);
    ctx.drawImage(image,-meteor.size/2,-meteor.size/2,meteor.size,meteor.size);
    ctx.restore();
  },
  drawCursor: function(cursor) {
    if (gameEngine.mousex<0 ||
        gameEngine.mousex>gameView.size ||
        gameEngine.mousey<0 ||
        gameEngine.mousey>gameView.size) {
      return;
    }
    var ctx = gameCanvas.context;
    ctx.save();
    ctx.beginPath();
    ctx.translate(cursor.x,cursor.y);
    ctx.lineTo(-cursor.size/2,cursor.size);
    ctx.lineTo(0,cursor.size/2);
    ctx.lineTo(cursor.size/2,cursor.size);
    ctx.lineTo(0,0);
    ctx.shadowBlur = cursor.size;
    ctx.shadowColor = "green";
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.restore();
  },
  disableMouse: function() {
    gameCanvas.canvas.style.cursor = "none";
  }
};
