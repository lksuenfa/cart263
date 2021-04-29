/**************************************************
Hypoglycemia tutorial
Help Oscar stay alive
Leanne Suen Fa

+ On click, display appropriate text
+ Call dialogue text from JSON file
**************************************************/

"use strict";

//first screen
let screen = 0;

let dialogue;

//Kitchen
let kitchen = {
  x: 350,
  y: 250,
  img: undefined,
  width: 700,
  height: 500,
};

let oscar = {
  x: 400,
  y: 400,
  img: undefined,
  width: 100,
  height: 150,
  clicked: false,
};

let glucagon = {
  x: 200,
  y: 90,
  img: undefined,
  width: 75,
  height: 50,
  clicked: false,
};

let juice = {
  x: 600,
  y: 200,
  img: undefined,
  width: 50,
  height: 50,
  clicked: false,
};

let glucometer = {
  x: 50,
  y: 300,
  img: undefined,
  width: 75,
  height: 100,
  clicked: false,
};

function preload() {
  dialogue = loadJSON("assets/data/dialogue.json");
  kitchen.img = loadImage("assets/images/kitchen.svg ");
  oscar.img = loadImage("assets/images/unwell.svg ");
  glucagon.img = loadImage("assets/images/glucagon.svg ");
  glucometer.img = loadImage("assets/images/glucometer.svg ");
  juice.img = loadImage("assets/images/juice.svg ");
}
function setup() {
  createCanvas(700, 700);
}

function draw() {
  //create scenes to display  information in order
  switch (screen) {
    case 0:
      startScreen();
      break;

    case 1:
      tutorial();
      break;
  }
}

//stores components of start screen
function startScreen() {
  background(211);
  addText(dialogue.tutorial.intro, height / 2);
}

function tutorial() {
  background(211);
  addImg();
}

//On mouse press
function mousePressed() {
  screen++;
  onClick();
}

//collect all images in one function
function addImg() {
  imageMode(CENTER);
  image(kitchen.img, kitchen.x, kitchen.y, kitchen.width, kitchen.height);
  image(oscar.img, oscar.x, oscar.y, oscar.width, oscar.height);
  image(glucagon.img, glucagon.x, glucagon.y, glucagon.width, glucagon.height);
  image(
    glucometer.img,
    glucometer.x,
    glucometer.y,
    glucometer.width,
    glucometer.height
  );
  image(juice.img, juice.x, juice.y, juice.width, juice.height);
}

//collect all clickObject functions for each items on screen
function onClick() {
  clickObject(
    oscar.x,
    oscar.y,
    oscar.width,
    oscar.height,
    dialogue.tutorial.oscar
  );
  clickObject(
    glucagon.x,
    glucagon.y,
    glucagon.width,
    glucagon.height,
    dialogue.tutorial.glucagon
  );

  clickObject(
    glucometer.x,
    glucometer.y,
    glucometer.width,
    glucometer.height,
    dialogue.tutorial.glucometer
  );
  clickObject(
    juice.x,
    juice.y,
    juice.width,
    juice.height,
    dialogue.tutorial.juice
  );
}
//click on obejct to get text
function clickObject(objectX, objectY, width, height, textDisplay) {
  //distance between mouse and object
  let d = dist(objectX, objectY, mouseX, mouseY);

  //if mouse on object
  if (d < width / 2 || d < height / 2) {
    push();
    noStroke();
    rect(0, 540, windowWidth, 200);
    fill(255);

    addText(textDisplay, kitchen.height + 100);

    pop();
  }
}

//text properties
function addText(textDisplay, y) {
  push();
  fill(0);
  textAlign(CENTER, CENTER);
  text(textDisplay, width / 2, y);
  pop();
}
