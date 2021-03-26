/**
Code Taker
Leanne Suen Fa

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// modal dialog at the start of the game
$(`#introduction-dialog`).dialog({
  modal: true,

  // click button to close modal and start
  buttons: {
    Start: function () {
      $(this).dialog(`close`);
    },
  },
});

//
$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function () {
      $(this).dialog(`close`);
    },
  },
});

$(`.secret`).one(`mouseover`, function (event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({ helper: `clone` });
});

$(`#answer`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);

    // check if right
    if ($(this).text() === `orange`) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
