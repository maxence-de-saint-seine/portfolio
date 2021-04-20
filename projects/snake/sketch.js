const scale = 20;
const margin = 20;
const minWidth = 200;

let frame = 5;
let cols = 25;
let rows = 15;

let frameSelect;
let colsSelect;
let rowsSelect;

let canvasWidth = cols * scale;
let canvasHeight = rows * scale + margin;

function setup() {
  frameSelect = createInput(frame);
  frameSelect.size(50);
  colsSelect = createInput(cols);
  colsSelect.size(50);
  rowsSelect = createInput(rows);
  rowsSelect.size(50);
  start = createButton('start');
  start.mousePressed(startGame);

  startGame();
}

function draw() {  
  background(51);
  displayInputs();
  stroke(0);

  for(i=1; i<cols; i ++){
    line(i * scale, 0, i * scale, rows * scale);
  }
  for (i = 1; i < rows; i++){
    line(0, i * scale, cols * scale, i * scale);
  }

  food.show();
  snake.show();
  snake.move();
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.yspeed == 0) {
    snake.xspeed = 0;
    snake.yspeed = -1;
  } else if (keyCode === DOWN_ARROW && snake.yspeed == 0) {
    snake.xspeed = 0;
    snake.yspeed = 1;
  } else if (keyCode === RIGHT_ARROW && snake.xspeed == 0) {
    snake.xspeed = 1;
    snake.yspeed = 0;
  } else if (keyCode === LEFT_ARROW && snake.xspeed == 0) {
    snake.xspeed = -1;
    snake.yspeed = 0;
  }
}

function displayInputs() {
  fill(255);
  noStroke();
  textAlign(LEFT);

  text("Frame", 0, height-3); shift = margin + frameSelect.width;
  text("Cols", shift, height-3); shift += margin + colsSelect.width;
  text("Rows", shift, height-3);
}

function startGame() {
  frame = frameSelect.value();
  frameRate(parseInt(frame));
  cols = colsSelect.value();
  rows = rowsSelect.value();

  canvasWidth = cols * scale;
  canvasHeight = rows * scale + margin;
  if (canvasWidth < minWidth) { canvasWidth = minWidth;}
  createCanvas(canvasWidth, canvasHeight);

  frameSelect.position(0, 0, 'relative');
  colsSelect.position(margin, 0, 'relative');
  rowsSelect.position(margin*2, 0, 'relative');
  start.position(margin * 3, 0, 'relative');

  food = new Food();
  snake = new Snake();
}