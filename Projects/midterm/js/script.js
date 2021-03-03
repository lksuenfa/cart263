"use strict";

/**************************************************
Secret Hunter Exam
Leanne Suen Fa

Use water divination to discover your aura type and become a real Hunter.

to do:
try to load script into a JSON file
**************************************************/

//screens
let displayScreen = undefined;
let screen = 0; //start with screen 0 which is title screen
const SIMULATION_SCREEN = 4;

//glass
let glass = undefined;

function preload() {}

// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

// draw()
function draw() {
  if (screen < SIMULATION_SCREEN) {
    //display screen
    displayScreen = new Screen(screen);
    displayScreen.updateScreen();
  } else {
    background(245, 27, 103);

    //draw glass
    glass = new Glass();
    glass.display();
  }
}

function mousePressed() {
  //change screens on click
  screen++;
}
