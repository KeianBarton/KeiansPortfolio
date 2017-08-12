var gameCanvas;
var gameEngine;

function Main() {
  var isMobile = BrowserIsMobile();
  var canvasSize = isMobile ? 300 : 640; // configurable
  var fps = isMobile ? 60 : 60; // configurable
  gameCanvas = new GameCanvas(canvasSize);
  gameEngine = new GameEngine(fps,isMobile);
  gameCanvas.createCanvas();
  gameEngine.startNewGame();
};

// Logic used from
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function BrowserIsMobile() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
