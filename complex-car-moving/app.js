var intervalId;
var gameAreaWidth = 0;
var gameAreaHeight = 0;
var iteration = 0;

var roadBrickWidth = 10;
var roadBrickHeight = 10;
var roadSize = 150;
var carWidth;
var carHeight;
var carPos;
var nearBlock;

var crash = 0;
var best = 0;

$(document).ready(function() {
  gameAreaWidth = $('#game-area').width();
  gameAreaHeight = $('#game-area').height();

  carWidth = $('#car').width();
  carHeight = $('#car').height();

  roadMargin = (gameAreaWidth - roadSize) / 2;

  $('#start').click(start);
  $('#stop').click(stop);
  roadInit();
});

function start() {
  getCarPos();
  nearBlock = Math.ceil(carPos.front / roadBrickWidth) * roadBrickWidth;
  $('#car').css({ left: toCar($('#brick-0-' + nearBlock).position().left + roadSize / 2) });
  intervalId = setInterval(loop, 20);
}

function stop() {
  clearInterval(intervalId);
}

function loop() {
  iteration++;
  roadLoop();
  checkColision();
}

function getCarPos() {
  var carTopPos = $('#car').position().top;
  var carLeftPos = $('#car').position().left;
  //  toPos => because the 0 of the car is the middle of the game-area (250px)
  carPos = {
    back: carTopPos,
    front: carTopPos + carHeight,
    left : toPos(carLeftPos - carWidth / 2),
    right : toPos(carLeftPos + carWidth / 2)
  };
}

function checkColision(){
  getCarPos();
  var blockLeft = $('#brick-0-' + nearBlock).position().left;
  var blockRight = $('#brick-1-' + nearBlock).position().left;

  if(carPos.left < blockLeft || carPos.right > blockRight){
    stop();
    crash++;
    $('#crash').html(crash);
    
    if($('#best').html() < best){
      $('#best').html(best);
    }
    best = 0;
  }else{
    best++;
  }

  $('#current').html(best);
}

function toPos(value) {
  return value + gameAreaWidth / 2;
}

function toCar(value) {
  return value - gameAreaWidth / 2;
}