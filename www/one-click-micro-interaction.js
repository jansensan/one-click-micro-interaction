// consts
TRIGGER_INTERVAL = 500;
DISTANCE_THRESHOLD = 32;

// vars
var dragStart = -1;
var dragEnd = -1;
var dragDuration = -1;

var triggerInterval;
var isTriggeringAvailable = true;

var points = [];


// processing methods
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  noStroke();
  var c = color(32, 32, 32, 10);
  fill(c);
  rect(0, 0, windowWidth, windowHeight);


  for (let i = 0; i < points.length; i++) {
    var p = points[i];

    // 
    var distance = dist(mouseX, mouseY, p.x, p.y);
    if (distance < DISTANCE_THRESHOLD) {
      p.vx += (p.x - mouseX) * 0.5;
      p.vy += (p.y - mouseY) * 0.5;
    }
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.5;
    p.vy *= 0.5;

    // draw point
    blendMode(NORMAL);
    noStroke();
    fill(255);
    ellipse(p.x, p.y, 4, 4);
  }
}


// methods definitions
function createPoints() {
  var numPoints = getRandomInRange(16, 32);
  for (let i = 0; i < numPoints; i++) {
    var point = {
      x: mouseX + getRandomInRange(-2, 2),
      y: mouseY + getRandomInRange(-2, 2),
      vx: 0,
      vy: 0,
    };
    points.push(point);
  }
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function startInterval() {
  isTriggeringAvailable = false;
  triggerInterval = setInterval(
    () => {
      isTriggeringAvailable = true;
    },
    TRIGGER_INTERVAL
  );
}

function trigger() {
  if (!isTriggeringAvailable) {
    return;
  }
  startInterval();
  createPoints();
}


// event handlers
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  dragStart = new Date().getTime();
}

function mouseDragged() {
  dragDuration = new Date().getTime() - dragStart;
  var modulo = dragDuration % 1000;
  if (dragDuration > 1000 && modulo < 20) {
    trigger();
  }
}

function mouseReleased() {
  window.close();
}
