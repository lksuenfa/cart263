"use strict";

/**************************************************
Secret Hunter Exam
Leanne Suen Fa

Use water divination to discover your aura type and become a real Hunter.
**************************************************/

//screens
let displayScreen = undefined;
let screen = 0; //start with screen 0 which is title screen
// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
function draw() {
  //display screen
  displayScreen = new Screen(screen);
  displayScreen.updateScreen();
}

function mousePressed() {
  //change screens on click
  screen++;
}
