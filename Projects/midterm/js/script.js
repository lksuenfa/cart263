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
function preload() {}

// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
function draw() {
  if (screen < SIMULATION_SCREEN) {
    //display screen
    displayScreen = new Screen(screen);
    displayScreen.updateScreen();
  } else {
    background(0);
  }
}

function mousePressed() {
  //change screens on click
  screen++;
}
