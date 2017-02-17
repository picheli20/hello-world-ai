var turnSide;
var turnTime = 0;
var turnSize;

function roadInit() {
  buildInitialRoad();
  checkRoad();
}

function roadLoop() {
  checkRoad();
  turnRoad();
}

function turnRoad() {
  if(turnTime < iteration){
    turnTime = iteration + Math.random() * 50;
    turnSide = Math.random() * 2;
    turnSize = Math.random() * (roadBrickHeight + 1);
    if(turnSide > 1){
      turnSize = turnSize * -1
    }
  }
  var brickCurrentPosition = [
    $('#brick-0-' + (gameAreaHeight - roadBrickHeight)).position().left, 
    $('#brick-1-' + (gameAreaHeight - roadBrickHeight)).position().left
  ];


  if(brickCurrentPosition[0] + turnSize > 0 && brickCurrentPosition[1] + turnSize < 500){
    $('#brick-0-' + (gameAreaHeight - roadBrickHeight)).css({ left: brickCurrentPosition[0] + turnSize });
    $('#brick-1-' + (gameAreaHeight - roadBrickHeight)).css({ left: brickCurrentPosition[1] + turnSize });
  }else{
    turnSide = 2;
  }

}

function checkRoad() {
  for (var i = 0; i < gameAreaHeight; i += roadBrickHeight) {
    // if the next brick is too left get the possition and it's not the last
    if (i + roadBrickHeight !== gameAreaHeight && $('#brick-0-' + (i + roadBrickHeight)).position().left !== $('#brick-0-' + i).position().left) {
      $('#brick-0-' + i).css({ left: $('#brick-0-' + (i + roadBrickHeight)).position().left });
      $('#brick-1-' + i).css({ left: $('#brick-1-' + (i + roadBrickHeight)).position().left });
    }

  }

}


function buildInitialRoad() {
  var template = '';
  for (var i = 0; i < gameAreaHeight; i += roadBrickHeight) {
    template += buildRoadBrick(i, roadMargin, 'brick-0-' + i);
    template += buildRoadBrick(i, gameAreaWidth - roadMargin, 'brick-1-' + i);
  }
  $('#game-area').append(template);
}

function buildRoadBrick(top, left, id) {
  return '<div class="road-brick" style="top: ' + top + 'px;left: ' + left + 'px;" id="' + id + '"></div>'
}

