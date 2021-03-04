"use strict";

/**************************************************
Secret Hunter Exam
Leanne Suen Fa

Use water divination to discover your aura type and become a real Hunter.

to do:
try to load script into a JSON file
**************************************************/

//screens
const SIMULATION_SCREEN = 4;
let displayScreen = undefined;
let screen = 0; //start with screen 0 which is title screen

//glass
let glass = undefined;

//Leaf
let leafImage = undefined;
let leaf = undefined;

//global variable to store nen data
let nenData;
let randomNen;
let nenInfo = {
  type: undefined,
  description: undefined,
  divination: undefined,
};

//preload()
function preload() {
  leafImage = loadImage("assets/images/leaf.png");
}

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

    //display leaf behind Glass
    leaf = new Leaf(leafImage);
    leaf.display();

    //draw glass
    glass = new Glass();
    glass.display();

    //DOES NOT WORK
    //animations
    if (nenInfo.type === "enhancement") {
      glass.increase();
    } else if (nenInfo.type === "conjurer") {
      glass.impurities();
    }
    if (nenInfo.type === "emission") {
      glass.changeColour();
    } else if (nenInfo.type === "manipulation") {
      leaf.move();
    } else if (nenInfo.type === "specialization") {
      glass.disappear();
    }

    //display nen info
    else displayNen();
  }
}

//mousePressed()
function mousePressed() {
  //change screens on click
  screen++;

  //load nen data during simulation screen only
  if (screen === SIMULATION_SCREEN) {
    loadJSON("assets/data/nen.json", nenLoaded);
  }
}

function nenLoaded(data) {
  nenData = data;

  //choose a random nen type
  randomNen = random(nenData.nen_types);
  //assign name of nen type
  nenInfo.type = randomNen.name;
  nenInfo.description = randomNen.description;
  nenInfo.divination = randomNen.divination;
}

//display Nen  and its properties
function displayNen() {
  let nenProfile = `Oooh! ${nenInfo.divination}
  Your aura type is ${nenInfo.type}.
  You will be able to ${nenInfo.description}.
  `;

  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, 255, 0);
  rectMode(CENTER);
  text(nenProfile, width / 2, height / 2, width / 2, height / 2);

  pop();
}
