"use strict";

/**************************************************
Exercise 3  Spy Profile Generator++
Leanne Suen Fa

**************************************************/

// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

let resetButton = undefined;

let state = `title`;

let data;

let passwordEntered = false;

function preload() {
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );

  instrumentData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  );

  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
}
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  data = JSON.parse(localStorage.getItem(`spy-profile-data`));
}

function resetSpyProfile() {
  localStorage.removeItem(`spy-profile-data`);
  generateSpyProfile();
}
/**
Assigns across the profile properties from the data to the current profile
*/
function spyData(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
}

/**
Generates a spy profile from JSON data
*/
function generateSpyProfile() {
  spyProfile.name = prompt(`Agent! What is your name?`);

  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;

  spyProfile.secretWeapon = random(objectData.objects);

  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

/**
Displays the current spy profile.
*/
function draw() {
  background(15, 46, 27);

  //display screens
  switch (state) {
    case `title`:
      title();
      break;

    case `simulation`:
      simulation();
      break;
  }

  //does not work ...how to refresh page to reset profile
  // if (data === null) {
  //   generateSpyProfile();
  // }
}

function title() {
  push();
  textFont(`Courier, monospace`);
  fill(0, 255, 99);
  textSize(36);
  textAlign(CENTER, CENTER);

  text(`Welcome to the Secret Agent portal`, width / 2, height / 2);
  text(`Click to enter`, width / 2, height / 2 + 100);
  pop();
}

function simulation() {
  //reset resetButton
  resetButton = createButton("Reset Profile");
  resetButton.size(100, 50);
  resetButton.position(width / 2, width / 2 - 100);
  resetButton.mousePressed(resetSpyProfile);

  // resetSpyProfile();
  //if there is saved data
  if (data !== null && passwordEntered === false) {
    let password = prompt(`Agent! What is your password?`);

    //if password is correct, can see the rest of the profile
    if (password === data.password) {
      spyData(data);
      passwordEntered = true;
    }
  } else {
    generateSpyProfile();
  }

  //welcome user when entering the page...does not work
  responsiveVoice.speak("Welcome Agent", "Bangla India Male");

  let profile = `**SPY PROFILE! TOP SECRET**

  Name : ${spyProfile.name}
  Alias : ${spyProfile.alias}
  Secret Weapons : ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}
  `;

  push();
  textFont(`Courier, monospace`);
  fill(0, 255, 99);
  textSize(24);
  textAlign(LEFT, TOP);

  text(profile, 100, 100);
  pop();
}
function mousePressed() {
  //start simulation after click
  if (state == `title`) {
    state = `simulation`;
  }
}
