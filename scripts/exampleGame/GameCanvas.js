function GameCanvas(size) {
  this.size = size;
};

GameCanvas.prototype = {
  createCanvas: function() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "javaScriptGameArea";
    this.canvas.innerHTML =
      "Your browser does not support the HTML5 canvas tag.";
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.context = this.canvas.getContext("2d");
    document.getElementById("javaScriptExample").appendChild(this.canvas);

    this.canvas.addEventListener("touchend",gameEngine.handleTouchEnd);
    this.canvas.addEventListener("click",gameEngine.handleClick);

    this.canvas.addEventListener("mousemove",gameEngine.updateMouse);
    this.canvas.addEventListener("touchmove",gameEngine.updateMouse);
    this.canvas.addEventListener("mouseleave",gameEngine.updateMouse);

    this.canvas.addEventListener("mousedown",this.stopEvent);
    this.canvas.addEventListener("contextmenu",this.stopEvent);

  },
  stopEvent: function(e) {
    e.preventDefault();
  }
};
