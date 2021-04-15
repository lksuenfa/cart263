/**
Leanne Suen Fa
Hypoglycemia simulation game

Navigate through the basic steps of managing variations in blood sugar level
*/

"use strict";

// does not work
// display the options as an accordion
// https://jqueryui.com/accordion/

$(function () {
  $("#options").accordion();
});

$(`#select`).on(`click`, appear);

// change appearance of options when clicking on how to
function appear(event) {
  $(`#option`).removeClass(`h4`);
  $(`#option`).addClass(`clicked`);
}
