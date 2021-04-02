"use strict";

//first screen
let screen = 0;

function setup() {
  createCanvas(500, 700);
}

function draw() {
  switch (screen) {
    case 0:
      startScreen();
      break;

    case 1:
      scene1();
      break;

    case 2:
      scene2();
      break;

    case 3:
      // scene3();
      break;
  }
}

function startScreen() {
  push();
  background(255);
  fill(0);
  textAlign(CENTER, CENTER);
  text("how to inject glucagon", width / 2, height / 2);
  pop();
}

function scene1() {
  let speech =
    "glucagon is an emergency medication indicated in the treatment of severe hypoglycemia";
  push();
  background(211);
  fill(0);
  textAlign(CENTER, CENTER);
  text(speech, width / 2, height / 2);
  pop();

  //make responsive voice  read instructions
  responsiveVoice.speak(speech);
}

function scene2() {
  let speech = "haha";
  push();
  background(211);
  fill(0);
  textAlign(CENTER, CENTER);
  text(speech, width / 2, height / 2);
  pop();

  //make responsive voice  read instructions
  responsiveVoice.speak(speech);
}

function mousePressed() {
  screen++;
}
