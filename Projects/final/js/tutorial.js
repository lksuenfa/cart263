"use strict";

//first screen
let screen = 0;

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
  text:
    "Symptoms are hypoglycemia Oscar might feel will depend on its severity. \n He might feel trembling, palpitations, sweating, anxiety, hunger, nausea or tingling at first. \nIf this blood sugar drops lower he will feel difficulty concentrating, confused,\n headaches, dizzy, weak, drowsy, blurry vision, he will have difficulties speaking.\n \nWithout appropriate treatment, Oscar will die.",
};

let glucagon = {
  x: 200,
  y: 90,
  img: undefined,
  width: 75,
  height: 50,
  clicked: false,
  text:
    "Glucagon is an emergency medication used to treat severe hypoglycemia.\n It needs to be administered by another person as Oscar will be unconscious.\n If he doesn't wake up after 15min, we need to call 911.",
};

let juice = {
  x: 600,
  y: 200,
  img: undefined,
  width: 50,
  height: 50,
  clicked: false,
  text:
    "If the symptoms are not severe, a snack can be given to increase \n the level of blood sugar. This snack needs quick sugar like 15g glucose tablets,\n 1 TBS honey, 1/2 glass of juice or 15g candy ",
};

let glucometer = {
  x: 50,
  y: 300,
  img: undefined,
  width: 75,
  height: 100,
  clicked: false,
  text:
    "This is a glucometer. It is used to measure the blood sugar.\n The normal value of blood glucose is 4-7 before eating and\n 5-10 when measured 2h after a meal. Below 2.8 is very low. ",
};

function preload() {
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
  switch (screen) {
    case 0:
      startScreen();
      break;

    case 1:
      scene1();
      break;
  }
}

function startScreen() {
  background(211);
  let textDisplay =
    " Oscar has diabetes. \n Because of the medication he takes, \nhis blood sugar might drop too low \n causing a condition called hypoglycemia. \n\nExplore his environment to find how to manage this.";
  addText(textDisplay, height / 2);
}

function scene1() {
  background(211);

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

function mousePressed() {
  screen++;

  clickObject(oscar.x, oscar.y, oscar.width, oscar.height, oscar.text);
  clickObject(
    glucagon.x,
    glucagon.y,
    glucagon.width,
    glucagon.height,
    glucagon.text
  );

  clickObject(
    glucometer.x,
    glucometer.y,
    glucometer.width,
    glucometer.height,
    glucometer.text
  );
  clickObject(juice.x, juice.y, juice.width, juice.height, juice.text);
}

//click on obejct to get text
function clickObject(objectX, objectY, width, height, textDisplay) {
  let d = dist(objectX, objectY, mouseX, mouseY);
  if (d < width / 2 || d < height / 2) {
    push();
    noStroke();
    rect(0, 540, windowWidth, 200);
    fill(255);

    addText(textDisplay, kitchen.height + 100);

    pop();
  }
}

function addText(textDisplay, y) {
  push();
  fill(0);
  textAlign(CENTER, CENTER);
  text(textDisplay, width / 2, y);
  pop();
}
