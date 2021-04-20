let lenDefault;
let min;
var angle;

var angle;
var trunkLen;

function setup() {
  createCanvas(600, 500);
  angle = createSlider(0, TWO_PI, PI / 4, 0.0001);
  trunkLen = createSlider(10, 150, 100, 1);
  min = createSlider(1, 10, 2, 1);
  stroke(255);
}

function draw() {
  background(51);
  translate(width/2, height);
  branch(trunkLen.value());
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > min.value()) {
    push();
    rotate(angle.value());
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle.value());
    branch(len * 0.67);
    pop();
  }
}