function GameView() {
};

GameView.prototype = {
  dimFrame: function() {
    gameEngine.isDimmed = true;
    var ctx = gameCanvas.context;
    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,gameCanvas.size,gameCanvas.size);
    ctx.restore();
  },
  drawStar: function(star) {
    var ctx = gameCanvas.context;
    ctx.save();
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
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
    ctx.translate(ship.x-0.5*ship.size,ship.y-0.5*ship.size);
    ctx.drawImage(image,0,-0.27*ship.size,ship.size,1.4*ship.size);
    //ctx.fillRect(0,0,ship.size,ship.size); hitbox, for reference
    ctx.restore();
  },
  drawMeteor: function(meteor) {
    var ctx = gameCanvas.context;
    // The meteor will be one of 5 images
    var imageName = "meteor"+meteor.meteorType.toString();
    var image = document.getElementById(imageName);
    ctx.save();
    ctx.translate(meteor.x,meteor.y);
    ctx.rotate(meteor.angle);
    ctx.drawImage(image,-0.5*meteor.size,-0.5*meteor.size,meteor.size,meteor.size);
    ctx.restore();
  },
  drawCursor: function(cursor) {
    if (gameEngine.mouseX<0 ||
        gameEngine.mouseX>gameView.size ||
        gameEngine.mouseY<0 ||
        gameEngine.mouseY>gameView.size) {
      return;
    }
    var ctx = gameCanvas.context;
    ctx.save();
    ctx.beginPath();
    ctx.translate(cursor.x,cursor.y);
    ctx.lineTo(-0.5*cursor.size,cursor.size);
    ctx.lineTo(0,0.5*cursor.size);
    ctx.lineTo(0.5*cursor.size,cursor.size);
    ctx.lineTo(0,0);
    ctx.shadowBlur = cursor.size;
    ctx.shadowColor = "green";
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.restore();
  },
  disableMouse: function() {
    gameCanvas.canvas.style.cursor = "none";
  },
  drawGameOverFrame: function() {
    if (gameView.showGameOverFrame) {
      gameView.dimFrame();
      gameView.drawGameOverText();
    }
  },
  drawRedScreenWhenFast: function() {
    if (gameEngine.isPaused ||
      gameEngine.difficultyFactor<2.5) {
      return;
    }
    var ctx = gameCanvas.context;
    ctx.save();
    ctx.globalAlpha = 0.3*(gameEngine.difficultyFactor-2.5)/2.5;
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,gameCanvas.size,gameCanvas.size);
    ctx.restore();
  },
  drawShipExplosion: function() {
    var ctx = gameCanvas.context;
    var se = shipExplosion;
    // The png files will be looped through for an animation
    var animationFrame = se.animationFrame++;
    if (animationFrame>10) { return; }
    var imageName = "shipExplosion"+animationFrame.toString();
    var image = document.getElementById(imageName);
    ctx.save();
    ctx.translate(se.x-0.5*se.size,se.y-0.5*se.size);
    // compare to drawShip for scaling
    ctx.drawImage(image,0,-0.27*se.size,se.size,1.4*se.size);
    ctx.restore();
  },
  drawText: function(fontX,fontY,fontSize,fontString,text,colour) {
    var ctx = gameCanvas.context;
    ctx.save();
    ctx.font = fontString;
    ctx.fillStyle = "white";
    if (!gameEngine.isDimmed) {
      ctx.shadowBlur = fontSize*2;
      ctx.shadowColor = colour;
    }
    ctx.fillStyle = colour;
    ctx.fillText(text,fontX,fontY);
    ctx.restore();
  },
  drawScoreText: function(fontY) {
    var fontColour = "white";
    var fontSize = 0.06*gameCanvas.size;
    var fontString = "bold "+fontSize.toString()+"px Courier New";
    var fontX = 0.04*gameCanvas.size;
    // localeString will add number separators
    var text = "SCORE: " + gameEngine.score.toLocaleString();
    this.drawText(fontX,fontY,fontSize,fontString,text,fontColour);
  },
  drawStartGameText: function() {
    var fontReferenceSize = 0.1*gameCanvas.size;

    var fontColour1 = "white";
    var fontSize1 = 0.05*gameCanvas.size;
    var fontString1 = "bold "+fontSize1.toString()+"px Courier New";
    var fontX1 = 0.19*gameCanvas.size;
    var fontY1 = 0.5*gameCanvas.size - 1.6*fontReferenceSize;
    var text1 = "KEIAN BARTON PRESENTS";

    var fontColour2 = "#00B2FF";
    var fontSize2 = 0.1*gameCanvas.size;
    var fontString2 = "bold "+fontSize2.toString()+"px Courier New";
    var fontX2 = 0.18*gameCanvas.size;
    var fontY2 = 0.5*gameCanvas.size - 0.8*fontReferenceSize;
    var text2 = "MISCHIEVOUS";

    var fontColour3 = "#00B2FF";
    var fontSize3 = 0.12*gameCanvas.size;
    var fontString3 = "bold "+fontSize3.toString()+"px Courier New";
    var fontX3 = 0.26*gameCanvas.size;
    var fontY3 = 0.5*gameCanvas.size + 0.1*fontReferenceSize;
    var text3 = "METEORS";

    var fontColour4 = "white";
    var fontSize4 = 0.06*gameCanvas.size;
    var fontString4 = "bold "+fontSize4.toString()+"px Courier New";
    var fontX4 = 0.18*gameCanvas.size;
    var fontY4 = 0.5*gameCanvas.size + 1.8*fontReferenceSize;
    var text4 = "CLICK/TAP TO START";

    this.drawText(fontX1,fontY1,fontSize1,fontString1,text1,fontColour1);
    this.drawGameTitle();
    // These can be used in case you do not wish to use an image title
    //this.drawText(fontX2,fontY2,fontSize2,fontString2,text2,fontColour2);
    //this.drawText(fontX3,fontY3,fontSize3,fontString3,text3,fontColour3);
    if (gameEngine.isTextFlashingOnScreen) {
      this.drawText(fontX4,fontY4,fontSize4,fontString4,text4,fontColour4);
    }
  },
  drawGameTitle: function() {
    var ctx = gameCanvas.context;
    ctx.save();
    var imageName = "gameTitle";
    var image = document.getElementById(imageName);
    var titleX = 0.06*gameCanvas.size;
    var titleY = gameEngine.titleY;
    var titleWidth = 0.9*gameCanvas.size;
    var titleHeight = 0.45*gameCanvas.size;
    ctx.drawImage(image,titleX,titleY,titleWidth,titleHeight);
    ctx.restore();
  },
  drawGameOverText: function() {
    var fontColour1 = "red";
    var fontSize1 = 0.1*gameCanvas.size;
    var fontString1 = "bold "+fontSize1.toString()+"px Courier New";
    var fontX1 = 0.23*gameCanvas.size;
    var fontY1 = 0.5*gameCanvas.size - fontSize1;
    var text1 = "GAME OVER";

    var fontColour2 = "white";
    var fontSize2 = 0.06*gameCanvas.size;
    var fontString2 = "bold "+fontSize2.toString()+"px Courier New";
    var fontX2 = 0.25*gameCanvas.size;
    var fontY2 = 0.5*gameCanvas.size;
    var text2 = "SCORE: " + gameEngine.score.toLocaleString();

    var fontColour3 = "white";
    var fontSize3 = 0.05*gameCanvas.size;
    var fontString3 = "bold "+fontSize3.toString()+"px Courier New";
    var fontX3 = 0.07*gameCanvas.size;
    var fontY3 = 0.5*gameCanvas.size + 1*fontSize1;
    var text3 = "CLICK/TAP TO START A NEW GAME";

    this.drawText(fontX1,fontY1,fontSize1,fontString1,text1,fontColour1);
    this.drawText(fontX2,fontY2,fontSize2,fontString2,text2,fontColour2);
    if (gameEngine.isTextFlashingOnScreen) {
      this.drawText(fontX3,fontY3,fontSize3,fontString3,text3,fontColour3);
    }
  },
  drawPausedFrame: function() {
    if (gameEngine.isNewGame) {
      gameView.dimFrame();
      startScreenMeteor.updatePosition();
      gameView.drawStartGameText();
    } else {
      gameView.drawScoreText(gameEngine.scoreTextY);
      gameView.dimFrame();

      var fontColour1 = "white";
      var fontSize1 = 0.1*gameCanvas.size;
      var fontString1 = "bold "+fontSize1.toString()+"px Courier New";
      var fontX1 = 0.32*gameCanvas.size;
      var fontY1 = 0.5*gameCanvas.size - 0.5*fontSize1;
      var text1 = "PAUSED";

      var fontColour2 = "white";
      var fontSize2 = 0.06*gameCanvas.size;
      var fontString2 = "bold "+fontSize2.toString()+"px Courier New";
      var fontX2 = 0.12*gameCanvas.size;
      var fontY2 = 0.5*gameCanvas.size + 0.5*fontSize1;
      var text2 = "CLICK/TAP TO CONTINUE";
      this.drawText(fontX1,fontY1,fontSize1,fontString1,text1,fontColour1);
      if (gameEngine.isTextFlashingOnScreen) {
        this.drawText(fontX2,fontY2,fontSize2,fontString2,text2,fontColour2);
      }
    }
  }
};
