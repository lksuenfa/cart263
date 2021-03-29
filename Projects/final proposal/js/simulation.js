"use strict";

let bloodSugar = document.getElementById("blood-sugar");

// display random blood sugar
bloodSugar.innerHTML = " Blood sugar : " + randomIntFromInterval(1, 15);

// Generate a random number and round it up
function randomIntFromInterval(min, max) {
  // Generate a random number between intervals https://gist.github.com/spyesx/485e4584aae767201f41
  let randomNum = Math.random() * (max - min + 1) + min;
  // round the answer to 1 decimal place https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  let roundedNum = Math.round(randomNum * 10) / 10;
  return roundedNum;
}
