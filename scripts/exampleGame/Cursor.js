// For mouse update positions and cursor hiding, see the game canvas

function Cursor(size) {
  this.x = gameCanvas.size/2;
  this.y = gameCanvas.size/2;
  this.size = size;
};

Cursor.prototype = {
  updatePosition: function() {
    this.x = gameEngine.mousex;
    this.y = gameEngine.mousey;
    gameView.drawCursor(this);
  }
};
