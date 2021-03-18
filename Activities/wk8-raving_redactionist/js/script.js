// ******
// Leanne Suen Fa
//
// Absinthe recipe is being hacked by Russians
// As they randomly try to uncover the recipe to reveal it to the world.
// ****

"use strict";

$(`.top-secret`).on(`click`, redact);

// event: when clicking, remove .revealed to put back .redacted
function redact(event) {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}

//every 500ms play function revelation
setInterval(revelation, 500);

function revelation() {
  //reveal according to randomness (see attemptReveal)
  $(`.redacted`).each(attemptReveal);

  //make score appear of number of text blocks revealed
  document.getElementById("score").innerHTML =
    `Number of secrets revealed: ` + $(`.revealed`).length;
}

// random probability to reveal text
function attemptReveal() {
  //r is a random number between 0 and 1
  let r = Math.random();

  //1/10 chance  for r to be <0.1
  //if r is less than 0.1, remove .redacted and substitute for .revealed
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
