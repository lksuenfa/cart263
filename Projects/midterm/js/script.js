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

//user's webcam
let video = undefined;

//handpose model
let handpose = undefined;

//current set of predictions
let predictions = [];

//preload()
function preload() {
  leafImage = loadImage("assets/images/leaf.png");
}

// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  //load handpose
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log(`Model loaded`);
  });

  //listen for predictions
  handpose.on(`predict`, function (results) {
    console.log(results);
    predictions = results;
  });

  noStroke();
}

// draw()
function draw() {
  if (screen < SIMULATION_SCREEN) {
    //display screen
    displayScreen = new Screen(screen);
    displayScreen.updateScreen();
  } else if (screen === SIMULATION_SCREEN) {
    background(245, 27, 103);

    //display leaf behind Glass
    leaf = new Leaf(leafImage);
    leaf.display();

    //draw glass
    glass = new Glass();
    glass.display();

    //Hand posture
    // if there is a hand detected in the array predictions
    if (predictions.length > 0) {
      //change screens
      screen = 5;
    }
  } else if (screen === 5) {
    // DOES NOT WORK
    // animations;

    background(0);

    // background(245, 27, 103);
    //display leaf behind Glass
    leaf = new Leaf(leafImage);
    leaf.display();

    //draw glass
    glass = new Glass();
    glass.display();

    //does not work
    //animate leaf according to nen type
    if (nenInfo.type === "enhancement") {
      glass.increase();
    } else if (nenInfo.type === "conjurer") {
      glass.impurities();
    } else if (nenInfo.type === "emission") {
      glass.changeColour();
    } else if (nenInfo.type === "manipulation") {
      leaf.move();
    } else if (nenInfo.type === "specialization") {
      glass.disappear();
    }

    // display nen info
    displayNen();
  }
}

//mousePressed()
function mousePressed() {
  //change screens on click
  if (screen < SIMULATION_SCREEN) {
    screen++;
  }

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
