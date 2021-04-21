/**************************************************
Hypoglycemia simulation
Help Oscar stay alive
Leanne Suen Fa

Select the proper items in the correct order according to the random blood sugar reading
+ Set up using Phaser 3
**************************************************/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 700,
  backgroundColor: `#fff0b8`,
  scene: [Boot, Play, Kitchen],
};

let game = new Phaser.Game(config);
