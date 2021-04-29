const BLOODSUGAR = {
  severeLow: 2.8,
  low: 3.5,
  hypoglycemia: 4,
  max: 7,
};

class Kitchen extends Phaser.Scene {
  constructor() {
    super({ key: `kitchen` });
  }

  create() {
    //add images
    this.kitchen = this.add.image(500, 200, `kitchen`);
    this.healthBar = this.add.image(450, 200, `healthBar`);

    //add sprites
    this.oscar = this.add.sprite(500, 300, `unwell`).setInteractive();
    this.glucometer = this.add.sprite(250, 250, `glucometer`).setInteractive();
    this.juice = this.add.sprite(700, 150, `juice`).setInteractive();
    this.glucagon = this.add.sprite(400, 80, `glucagon`).setInteractive();

    //scale images to fit screen
    this.kitchen.setScale(2.5);
    this.glucagon.setScale(0.25);
    this.juice.setScale(0.5);
    this.glucometer.setScale(0.5);

    // //create drop zone
    // this.oscar.input.dropZone = true;

    //drag object
    this.input.setDraggable(this.glucometer);
    this.input.setDraggable(this.juice);
    this.input.setDraggable(this.glucagon);
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    //to uncomment
    //add audio
    // this.music = this.sound.add("theme");
    // this.music.play();

    //set a general style for text
    this.textStyle = {
      fontFamily: `Kiwi Maru`,
      fontSize: 20,
      color: `#bf0442`,
    };

    // add text
    this.description = `Explore Oscar's environment to find out what's wrong`;
    //set a random number for BG value
    this.bloodSugarValue = this.randomIntFromInterval(2, 3);

    //display text
    this.symptoms = this.add.text(100, 500, this.description, this.textStyle);
    this.response = this.add.text(100, 550, ``, this.textStyle);
    this.bloodSugarDisplay = this.add.text(
      20,
      20,
      this.bloodSugarValue,
      this.textStyle
    );
    //set visibility of item
    this.symptoms.setVisible(false);
    this.response.setVisible(false);
    this.bloodSugarDisplay.setVisible(false);

    //health bar
    //source; Pippin Barr
    this.healthBar.maxWidth = 200;
    this.healthBar.maxHeight = 10;
    this.healthBar.setOrigin(0, 0);

    //ratio of blood sugar reading as a fraction of the max blood sugar for display
    this.ratio = this.bloodSugarValue / BLOODSUGAR.maxSUGAR;

    //display this ratio as proportional to max height
    this.healthBar.setScale(
      this.healthBar.maxWidth * this.ratio,
      this.healthBar.maxHeight
    );
  }

  update() {
    //continuous decrease  of blood sugar value until 0
    if (this.bloodSugarValue > 0) {
      this.bloodSugarValue -= 0.005;
    }

    this.updateHealth();
    this.updateBloodSugarDisplay();
    this.checkOverlap();
    this.interact();
  }

  //Update health Bar
  //Adapted from Pippin Barr
  updateHealth() {
    // Recalculate current blood sugar ratio
    this.ratio = this.bloodSugarValue / BLOODSUGAR.maxSUGAR;
    // Update the width of the health bar
    this.healthBar.setScale(
      this.healthBar.maxWidth * this.ratio,
      this.healthBar.maxHeight
    );
  }

  // Update the Blood sugar display
  updateBloodSugarDisplay() {
    this.bloodSugarDisplay.text = Math.round(this.bloodSugarValue * 10) / 10;
  }

  //interactions of juice, blood sugar reading and glucagon with oscar
  interact() {
    this.finalStyle = {
      fontFamily: `Kiwi Maru`,
      fontSize: 100,
      color: `#bf0442`,
      backgroundColor: `black`,
    };

    //lose if BG falls below 0.1
    if (this.bloodSugarValue < 0.1) {
      this.add.text(100, 100, `Game Over`, this.finalStyle);
      this.input.on("pointerdown", () => this.scene.start("lose"));
    }

    //if BG < or = 2.8, severe hypoglycemia
    else if (this.bloodSugarValue <= BLOODSUGAR.severeLow) {
      //if overlap with glucometer
      if (this.checkOscar) {
        this.symptoms.text = "Help! Oscar has fainted!!";
      }

      //if overlap with juice
      if (this.giveJuice) {
        this.response.text =
          "This is an emergency! Oscar is unconscious, he can't drink juice!";
        this.response.setVisible(this.giveJuice);
      }

      //if overlap with glucagon
      if (this.giveGlucagon) {
        this.bloodSugarValue += 0.01; //increase BG
        this.updateBloodSugarDisplay();
        this.symptoms.text = "Oscar will feel better soon!!";
      }

      //if BG > 2.8 but less than max allowed in game
    } else if (
      this.bloodSugarValue > BLOODSUGAR.severeLow &&
      this.bloodSugarValue < BLOODSUGAR.max
    ) {
      if (this.checkOscar) {
        if (this.bloodSugarValue <= BLOODSUGAR.low) {
          this.symptoms.text = "Oscar is feeling dizzy and drowsy";
        } else if (this.bloodSugarValue <= BLOODSUGAR.hypoglycemia) {
          this.symptoms.text = "Oscar is feeling hungry and nauseous";
        } else this.symptoms.text = "Oscar is feeling a lot better";
      }

      if (this.giveJuice) {
        this.bloodSugarValue += 0.01; //increase BG
        this.updateBloodSugarDisplay();

        this.response.text = "Check Oscar's blood sugar is increasing again";
        this.response.setVisible(this.giveJuice);
      }

      if (this.giveGlucagon) {
        this.response.text =
          "It is not that bad! There is no need for glucagon.";
        this.response.setVisible(this.giveGlucagon);
        this.symptoms.text = "Oscar will feel better soon!!";
      }
    }
  }

  //check for overlap
  //Adapted from Pippin Barr
  checkOverlap() {
    //if glucometer and oscar overlap
    this.checkOscar = Phaser.Geom.Intersects.RectangleToRectangle(
      this.oscar.getBounds(),
      this.glucometer.getBounds()
    );

    //display if overlap is true
    this.bloodSugarDisplay.setVisible(this.checkOscar);
    this.symptoms.setVisible(this.checkOscar);

    //overlap juice and oscar
    this.giveJuice = Phaser.Geom.Intersects.RectangleToRectangle(
      this.oscar.getBounds(),
      this.juice.getBounds()
    );

    //overlap glucagon and oscar
    this.giveGlucagon = Phaser.Geom.Intersects.RectangleToRectangle(
      this.oscar.getBounds(),
      this.glucagon.getBounds()
    );
  }
  // // Generate a random number and round it up
  randomIntFromInterval(min, max) {
    // Generate a random number between intervals
    //Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNum = Math.random() * (max - min + 1) + min;
    // round the answer to 1 decimal place
    //Adapted from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    let roundedNum = Math.round(randomNum * 10) / 10;
    return roundedNum;
  }
}

// when dropped
// this.input.on("drop", function (pointer, gameObject, dropZone) {
//   if (this.giveJuice || this.giveGlucagon) {
//     this.bloodSugarValue += 3;
//
//     gameObject.x = gameObject.input.dragStartX;
//     gameObject.y = gameObject.input.dragStartY;
//   }
//   gameObject.input.enabled = false;
// });
//
// if dragged and dropped away from Oscar, come back to initial position
// this.input.on("dragend", function (pointer, gameObject, dropped) {
//   if (!dropped) {
//     gameObject.x = gameObject.input.dragStartX;
//     gameObject.y = gameObject.input.dragStartY;
//   }
// });
