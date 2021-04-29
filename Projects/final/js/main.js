/**************************************************
Hypoglycemia simulation
Help Oscar stay alive
Leanne Suen Fa

Select the proper items in the correct order according to the random blood sugar reading
+ Set up a Phaser 3 Project
+ Display a different message and add points to health bar in response to draggable objects
**************************************************/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 700,
  backgroundColor: `#fff0b8`,
  scene: [Boot, Play, Kitchen, Victory, Lose],
};

let game = new Phaser.Game(config);
