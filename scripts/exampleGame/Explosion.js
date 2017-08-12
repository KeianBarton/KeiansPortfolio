function Explosion(x,y,size,speed) {
  this.animationFrame = 1;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.size = 4*size;
};

Explosion.prototype = {
  updatePosition: function() {
    this.y += this.speed;
    // explosion animation will grow 1.5 times the size over 10 frames
    this.size += 0.05*this.size;
    gameView.drawShipExplosion();
  }
};
