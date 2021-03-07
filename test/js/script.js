"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let glass = {
  x: 500,
  y: 170,
  width: 150,
  height: 500,
  colour: {
    r: 192,
    g: 232,
    b: 240,
    a: 150,
  },
};

let water = {
  x: glass.x + 20,
  y: glass.y + 110,
  width: glass.width * 0.75,
  height: glass.height * 0.75,
  colour: {
    r: 132,
    g: 186,
    b: 227,
    a: 200,
  },
  vy: 10,
};

let leaf = {
  x: 530,
  y: 260,
  img: undefined,
  vy: 10,
  vx: 10,
};

let impurities = 10;

function preload() {
  leaf.img = loadImage("assets/images/leaf.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  displayGlass();

  push();
  strokeWeight(8);
  stroke(255, 0, 0);
  //500,170
  point(glass.x, glass.y);
  pop();

  push();
  strokeWeight(8);
  stroke(0, 255, 0);
  //500,170
  point(glass.x + glass.width, glass.y + glass.height);
  pop();

  // for (let i = 0; i < impurities; i++) {
  //   let x = random(water.x, water.x + water.width);
  //   let y = random(water.y, water.y + water.height);
  //   stroke(255);
  //   strokeWeight(4);
  //   point(x, y);
  // }

  if (leaf.y < 610) {
    leaf.y += leaf.vy;
  }

  // this.leaf.y = constrain(this.leaf.y, height / 2 - 85, height / 2 + 100);
}

function mousePressed() {
  // } else if (this.leaf.x > width / 2) {
  //   this.leaf.x -= this.leaf.vx;
  // }
}

function displayGlass() {
  image(leaf.img, leaf.x, leaf.y);

  //display glass
  push();
  noFill();
  stroke(glass.colour.r, glass.colour.g, glass.colour.b, glass.colour.a);
  strokeWeight(6);
  rect(glass.x, glass.y, glass.width, glass.height);
  pop();

  //display water
  push();
  noStroke();
  fill(water.colour.r, water.colour.g, water.colour.b, water.colour.a);
  rect(water.x, water.y, water.width, water.height);
  pop();
}
