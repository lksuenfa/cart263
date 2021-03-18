"use strict";

$(`.top-secret`).on(`click`, redact);

function redact(event) {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}
setInterval(revelation, 500);

function revelation() {
  $(`.redacted`).each(attemptReveal);
  document.getElementById("score").innerHTML =
    `Number of secrets revealed: ` + $(`.revealed`).length;
}

function attemptReveal() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
