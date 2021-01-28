"use strict";

/**************************************************
Where is sausage dog?
CART263 week 1
Leanne Suen Fa

Find the sausage dog.
**************************************************/

// Constants for image loading
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100; // Number of images to display

const ANIMAL_IMAGE_PREFIX = `assets/images/animal`;
const SAUSAGE_DOG_IMAGE = `assets/images/sausage-dog.png`;

// Array of the loaded animal images
let animalImages = [];
// Array of animal objects
let animals = [];

//sausage dog image
let sausageDogImage = undefined;
let sausageDog = undefined;

// Loads all the animal images and the sausage dog image
function preload() {
  // Loop once for each animal image, starting from 0
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    animalImages.push(animalImage);
  }

  //load sausage dog image
  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  createAnimals();
  createSausageDog();
}

// createAnimals()
// Creates all the animals at random positions with random animal images
function createAnimals() {
  //create animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animal = createRandomAnimal();
    animals.push(animal);
  }
}

// createRandomAnimal()
// Create an animal object at a random position with a random image
// then return that created animal
function createRandomAnimal() {
  let x = random(0, width);
  let y = random(0, height);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

// createSausageDog()
// Creates a sausage dog at a random position
function createSausageDog() {
  //create sausage dog
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function draw() {
  background(255, 255, 0);

  updateAnimals();
  //makes sausageDog appear
  sausageDog.update();
}

// Calls the update() method for all animals
function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
}

function mousePressed() {
  sausageDog.mousePressed();
}
