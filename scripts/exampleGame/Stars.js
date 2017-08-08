// Combination of stars

function Stars(number,size,speed,sizeSpread) {
  this.number = number;
  this.size = size;
  this.speed = speed;
  this.sizeSpread = sizeSpread;
  for (var i=1; i<=this.number; i++) {
    var x = gameCanvas.width*Math.random();
    var y = gameCanvas.height*Math.random();
    var star = new Star(x,y,this.speed,this.size,this.sizeSpread);
    star.draw();
    Stars["star"+i] = star;
  }
}

Stars.prototype = {
  updatePositions: function() {
    for (var i=1; i<=this.number; i++) {
      var star = Stars["star"+i];
      star.updatePosition();
      star.draw();
    }
  }
};

// Single star

function Star(x,y,speed,radius,sizeSpread) {
  // Stars start randomly distributed on the canvas
  this.x = x;
  this.y = y;
  // Star radius and speed is randomly assigned
  var sizeSpreadDiff = sizeSpread/2;
  var multiplier = (1-sizeSpreadDiff)*radius +
                    sizeSpread*Math.random();
  this.radius = multiplier*radius;
  this.speed = multiplier*speed;
  ;
}

Star.prototype = {
  updatePosition: function() {
    this.y = this.y + this.speed;
    // Loop stars if they move off the canvas; randomly between -50 and 0
    if (this.y > gameCanvas.height){
      this.y = Math.floor(-50 + 50*Math.random());
    }
  },
  draw: function() {
    // Draw stars using the canvas context
    var ctx = gameCanvas.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  }
};
