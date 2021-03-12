/**
Haikuu Generator
Leanne Suen Fa


*/

"use strict";

//haiku lines
let haikuLines = {
  fiveSyllableLines: [
    `O, to be a tree`,
    `The cat does not know`,
    `We are all forests`,
    ` You have done your best`,
    ` They are all gone now`,
  ],
  sevenSyllableLines: [
    `Say the things left unsaid `,
    `  Never believe the wind's lies `,
    ` The autumn stretches its legs `,
    ` Nothing can satisfy you `,
    ` They will not come back again`,
  ],
};

let titleData = [
  `Octopus in a bottle`,
  `Sadness in the dark`,
  `Dawn and floss`,
  `To try or not to try`,
  `Unagi`,
];
let title = document.getElementById(`title`);
let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

setupLine();
addEventListeners();

//make responsive voice recite poem
responsiveVoice.speak(
  title.innerText + line1P.innerText + line2P.innerText + line3P.innerText
);

// choose random haiku line and place it in html
function setupLine() {
  title.innerText = random(titleData);
  line1P.innerText = random(haikuLines.fiveSyllableLines);
  line2P.innerText = random(haikuLines.sevenSyllableLines);
  line3P.innerText = random(haikuLines.fiveSyllableLines);
}

// Change each line using event listeners
function addEventListeners() {
  line1P.addEventListener(`click`, lineClicked);
  line2P.addEventListener(`click`, lineClicked);
  line3P.addEventListener(`click`, lineClicked);
}

/**
Triggers a fade out when a line is clicked
*/
function lineClicked(event) {
  fadeOut(event.target, 1);
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity;

  if (opacity > 0) {
    requestAnimationFrame(function () {
      fadeOut(element, opacity);
    });
  } else {
    setNewLine(element);
    fadeIn(element, 0);
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function () {
      fadeIn(element, opacity);
    });
  }
}

/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = random(haikuLines.fiveSyllableLines);
  } else if (element === line2P) {
    element.innerText = random(haikuLines.sevenSyllableLines);
  }
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
