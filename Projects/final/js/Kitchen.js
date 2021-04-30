const BLOODSUGAR = {
  severeLow: 2.8,
  low: 3.5,
  hypoglycemia: 4,
  good: 5,
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

    //drag object
    this.input.setDraggable(this.glucometer);
    this.input.setDraggable(this.juice);
    this.input.setDraggable(this.glucagon);
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    //add audio
    // this.music = this.sound.add("theme");
    // this.music.play();

    //set a general style for text
    this.textStyle = {
      fontFamily: `Kiwi Maru`,
      fontSize: 20,
      color: `#bf0442`,
      backgroundColor: `#fff0b8`,
    };

    //set a highlight style for text
    this.highlightStyle = {
      fontFamily: `Kiwi Maru`,
      fontSize: 100,
      color: `#bf0442`,
      backgroundColor: `black`,
    };

    //set a random number for BG value
    this.bloodSugarValue = this.random(2, 3);

    //display text
    this.symptoms = this.add.text(100, 500, ``, this.textStyle);
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

    //create a health bar
    this.healthBar.maxWidth = 200;
    this.healthBar.maxHeight = 10;
    this.healthBar.setOrigin(0, 0);
    this.updateHealth();
  }

  update() {
    //lose if BG falls below 0.1
    if (this.bloodSugarValue < 0.1) {
      this.add.text(100, 100, `Game Over`, this.highlightStyle);
      this.input.on("pointerdown", () => this.scene.start("lose"));
    }

    //win if BG > 5
    else if (this.bloodSugarValue >= BLOODSUGAR.good) {
      this.add.text(100, 100, `You Win`, this.highlightStyle);
      this.input.on("pointerdown", () => this.scene.start("victory"));
    }

    this.updateHealth();
    this.updateBloodSugarDisplay();
    this.checkOverlap();
    this.interact();
  }

  //Update health Bar
  //Adapted from Pippin Barr
  updateHealth() {
    //ratio of blood sugar reading as a fraction of the max blood sugar for display
    this.ratio = this.bloodSugarValue / BLOODSUGAR.max;
    //display this ratio as proportional to max height
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
    //if BG < or = 2.8, severe hypoglycemia
    if (this.bloodSugarValue < BLOODSUGAR.severeLow) {
      //baseline BG decrease rate
      this.metabolism(-0.005, 0);

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
        this.metabolism(0, 0.03);
        this.updateBloodSugarDisplay();
        this.symptoms.text = "Oscar will feel better soon!!";
        this.glucagon.setVisible(false);
      }
    }
    //if BG > 2.8 but not good enough to win
    else if (
      this.bloodSugarValue >= BLOODSUGAR.severeLow &&
      this.bloodSugarValue < BLOODSUGAR.good
    ) {
      this.metabolism(-0.005, 0.001);
      //if check Oscar with glucometer
      if (this.checkOscar) {
        //if severely low blood sugar
        if (this.bloodSugarValue <= BLOODSUGAR.low) {
          this.symptoms.text = "Oscar is feeling dizzy and drowsy";
        }
        //if blood sugar low
        else if (this.bloodSugarValue <= BLOODSUGAR.hypoglycemia) {
          this.symptoms.text = "Oscar is feeling hungry and nauseous";
        }
        //if blood sugar > 4
        else this.symptoms.text = "Oscar is feeling a lot better";
      }

      //if juice given
      if (this.giveJuice) {
        this.metabolism(0, 0.01);
        this.updateBloodSugarDisplay();

        this.response.text = "Check Oscar's blood sugar is increasing again";
        this.response.setVisible(true);
      }

      //if glucagon given
      if (this.giveGlucagon) {
        this.response.text =
          "*****It is not that bad! There is no need for glucagon.****";
        this.response.setVisible(true);
        this.symptoms.setVisible(false);
      }
    }
  }

  metabolism(consumption, intake) {
    //continuous decrease  of blood sugar value
    this.bloodSugarValue += consumption + intake;
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
  random(min, max) {
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
