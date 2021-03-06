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

  //  //display leaf behind Glass
  leaf = new Leaf(leafImage);

  //draw glass
  glass = new Glass();
}

// draw()
function draw() {
  if (screen < SIMULATION_SCREEN) {
    //display screen
    displayScreen = new Screen(screen);
    displayScreen.updateScreen();
  } else if (screen === SIMULATION_SCREEN) {
    background(245, 27, 103);
    leaf.display();
    glass.display();

    //Hand posture
    // if there is a hand detected in the array predictions
    if (predictions.length > 0) {
      //change screens
      screen = 5;
    }
  } else if (screen === 5) {
    background(245, 27, 103);
    leaf.display();
    glass.display();

    console.log(randomNen.name);

    // animate leaf according to nen type

    //if enhancement water increases and leaf floats
    if (randomNen.name === "enhancement") {
      glass.increase();
      leaf.float();

      //if conjuration, make impurities appear
    } else if (randomNen.name === "conjuration") {
      // glass.impurities();

      //make impurities appear
      let impurities = 10;

      //make up to 10 appear
      for (let i = 0; i < impurities; i++) {
        //positioned randomly within water
        let x = random(520, 630);
        let y = random(280, 350);
        stroke(0);
        strokeWeight(4);
        point(x, y);
      }

      //if emission change colour of water
    } else if (randomNen.name === "emission") {
      glass.changeColour();

      //if manipulation make leaf move
    } else if (randomNen.name === "manipulation") {
      leaf.move();

      //if specialization make water disappear
    } else if (randomNen.name === "specialization") {
      glass.disappear();
      leaf.fall();
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
}

//display Nen  and its properties
function displayNen() {
  let nenProfile = `Oooh! ${randomNen.divination}
  Your aura type is ${randomNen.name}.
  You will be able to ${randomNen.description}.
  `;

  push();
  textSize(32);
  textAlign(LEFT, CENTER);
  fill(255, 255, 0);
  rectMode(CENTER);
  text(nenProfile, width / 2, height / 2, width / 2, height / 2);

  pop();
}
