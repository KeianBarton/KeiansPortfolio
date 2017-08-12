// For mouse update positions and cursor hiding, see the game engine and view

function Cursor(x,y,size) {
  this.x = x;
  this.y = y;
  this.size = size;
};

Cursor.prototype = {
  updatePosition: function() {
    this.x = gameEngine.mouseX;
    this.y = gameEngine.mouseY;
    gameView.drawCursor(this);
  }
};
