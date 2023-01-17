let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, PI, PI/4, 0.01);
  slider.position(10, 10);
}

function draw() {
  background(0);
  stroke(255);

  // cantor(width - (width - 50), height/2, width - (width - (width - 50)) * 2);
  // squareFractal(width - (width - 50), height/2, width - (width - (width - 50)), height/2);
  
  translate(width / 2, height);
  fractalTree(200);
}

function cantor(x, y, length) {
  let parts = 3;
  if (length > 1) {
    line(x, y, x + length, y);

    y += 10;
    cantor(x, y, length/parts);
    cantor(x + length*(parts-1)/parts, y, length/parts);
  }
}

function squareFractal(x1, y1, x2, y2) {
  
  line(x1,y1,x2,y2);
  
  let dx = x2-x1;
  let dy = y2-y1;
  
  if (dx == 0 && dy > 4) {
    squareFractal(x1-dy/3,y1,x1+dy/3,y1);
    squareFractal(x1-dy/3,y2,x1+dy/3,y2);
  } else if (dy == 0 && dx > 4) {
    squareFractal(x1,y1-dx/3,x1,y1+dx/3);
    squareFractal(x2,y1-dx/3,x2,y1+dx/3);
  }
}

function fractalTree(length) {
  let angle = slider.value();
  line(0, 0, 0, -length);

  if (length > 4) {
    push();
    translate(0, -length);
    rotate(angle);
    fractalTree(length * 0.67);
    pop();

    push();
    translate(0, -length);
    rotate(-angle);
    fractalTree(length * 0.67);
    pop();
  }
}

function sierpinskiTriangle(x, y, l) {
  // Base triangle 
  triangle(x, y, x + l, y, x + l / 2, y - l);

  // Recursion to draw the next generation
  if (l > 5) {
    sierpinskiTriangle(x, y, l / 2);
    sierpinskiTriangle(x + l/2, y, l/2);
    sierpinskiTriangle(x + l/4, y - l/2, l/2)
  }
}

function sierpinskiChaos(x1, y1, x2, y2, x3, y3) {
  // Corners of the triangle
  let p1 = {
    x: x1,
    y: y1
  },
  p2 = {
    x: x2,
    y: y2
  },
  p3 = {
    x: x3,
    y: y3
  };

  let corners = [p1, p2, p3];

  noFill();
  stroke(255);
  triangle(x1, y1, x2, y2, x3, y3);

  // Get a random point inside the triangle
  let p = {
    x: random(x1, x2),
    y: random(y3, y1)
  };

  // Draw the point
  stroke(255);
  point(p.x, p.y);

  // Draw the next generation
  for (let i = 0; i < 10000; i++) {
    let nextCorner = random(corners);
    p.x = (p.x + nextCorner.x) / 2;
    p.y = (p.y + nextCorner.y) / 2;
    point(p.x, p.y);
  }
}