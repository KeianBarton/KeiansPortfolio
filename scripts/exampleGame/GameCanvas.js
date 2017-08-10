function GameCanvas(size,fps) {
  this.size = size;
  this.fps = fps;
};

GameCanvas.prototype = {
  createCanvas: function() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "javaScriptGameArea";
    this.canvas.innerHTML =
      "Your browser does not support the HTML5 canvas tag.";
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.canvas.addEventListener("mouseover",this.activateCanvas);
    this.canvas.addEventListener("mouseout",this.deactivateCanvas);
    this.canvas.addEventListener("mousemove",this.updateMouse);
    this.canvas.addEventListener('contextmenu',this.preventRightClick);
    this.context = this.canvas.getContext("2d");
    document.getElementById("javaScriptExample").appendChild(this.canvas);

    this.isActive = false;
    this.isDimmed = false;

    this.mousex = this.size/2;
    this.mousey = this.size/2;
    this.interval = setInterval(gameEngine.updateFrame,1000/this.fps);
  },
  updateMouse: function(e) {
    gameCanvas.mousex =e.clientX-gameCanvas.canvas.getBoundingClientRect().left;
    gameCanvas.mousey = e.clientY-gameCanvas.canvas.getBoundingClientRect().top;
  },
  preventRightClick: function(e) {
    e.preventDefault();
  },
  activateCanvas: function() {
    gameCanvas.isActive = true;
    gameCanvas.canvas.style.cursor = "none";
  },
  deactivateCanvas: function() {
    gameCanvas.isActive = false;
    gameCanvas.canvas.style.cursor = "default";
  },
  dimFrame: function() {
    var ctx = this.context;
    this.isDimmed=true;
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,gameCanvas.size,gameCanvas.size);
    ctx.globalAlpha = 1;
  }
};
