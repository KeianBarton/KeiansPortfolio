// For mouse update positions and cursor hiding, see the game canvas

function Cursor(size) {
  this.x = gameCanvas.size/2;
  this.y = gameCanvas.size/2;
  this.size = size;
};

Cursor.prototype = {
  updatePosition: function() {
    this.x = gameCanvas.mousex;
    this.y = gameCanvas.mousey;
    this.draw();
  },
  draw: function() {
    var ctx = gameCanvas.context;
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.lineTo(-this.size/2,this.size);
    ctx.lineTo(0,this.size/2);
    ctx.lineTo(this.size/2,this.size);
    ctx.lineTo(0,0);
    ctx.shadowBlur = this.size;
    ctx.shadowColor = "green";
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.restore();
  }
};
