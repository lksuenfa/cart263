"use strict";

/**************************************************
Bubble popper
Pippin Barr

Pop bubbles with finger
**************************************************/
//user's webcam
let video = undefined;

//handpose model
let handpose = undefined;

//current set of predictions
let predictions = [];

//bubble
// let bubble = undefined;
const NUM_BUBBLES = 10;
let bubbles = [];

//score
let score = 0;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(640, 480);

  //access user's webcam
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

  for (let i = 0; i < NUM_BUBBLES; i++) {
    let x = random(width);
    let y = random(height, height + 200);
    let bubble = new Bubble(x, y);
    bubbles.push(bubble);
  }
}

// draw()
function draw() {
  background(0);

  //Hand posture
  //if there is a hand detected in the array predictions
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    //draw pin body following index movement
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    //draw pin head following index base
    push();
    noStroke();

    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    //check bubble popping
    for (let i = 0; i < bubbles.length; i++) {
      let popped = bubbles[i].checkPopping(tipX, tipY);

      if (popped) {
        score++;
      }
    }

    // bubbles.displayScore();
  }

  //display bubble and make it move
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
  }

  push();
  textSize(36);
  fill(255);
  textAlign(CENTER, CENTER);
  text(score, width - 100, 100);
  pop();
}
