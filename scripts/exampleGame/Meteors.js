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
    for (var i = 0; i<this.list.length; i++) {
      this.list[i].updatePosition();
      this.list[i].draw();
    }
  }
};

// Single meteor

function Meteor(x,y,speed,size,meteorType) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.meteorType = meteorType;
  // meteor spin (per frame) is randomly assigned between -pi/fps and pi/fps
  this.angle = 0;
  this.spin = Math.PI * (-1/gameCanvas.fps + Math.random()*2/gameCanvas.fps);
};

Meteor.prototype = {
  updatePosition: function() {
    this.y = this.y + this.speed;
    this.angle += this.spin;
    if (this.y > gameCanvas.height + this.size) {
      gameEngine.updateScore();
      this.remove();
    }
  },
  draw: function() {
    // Draw meteors using the canvas context
    var ctx = gameCanvas.context;
    // The meteor will be one of 5 images
    var imageName = "meteor"+this.meteorType.toString();
    var image = document.getElementById(imageName);
    ctx.save();
    ctx.translate(this.x+this.size/2,this.y+this.size/2);
    ctx.rotate(this.angle);
    ctx.drawImage(image,-this.size/2,-this.size/2,this.size,this.size);
    ctx.restore();
  },
  remove: function() {
    gameEngine.meteors--;
    meteors.remove(this);
    this.y=-100;
    this.speed=0;
  }
};
