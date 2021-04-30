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
    this.bloodSugar = {
      initial: this.random(2, 3),
      displayed: undefined,
    };

    this.rate = {
      decrease: -0.005,
      increase: 0.01,
      rapidIncrease: 0.02,
      zero: 0,
    };

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
    this.music = this.sound.add("theme");
    this.music.play();

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

    //set up first BG reading
    this.bloodSugar.displayed = this.bloodSugar.initial;

    //display text

    this.symptoms = this.add.text(100, 500, ``, this.textStyle); //symptoms

    this.response = this.add.text(100, 550, ``, this.textStyle); // response
    //BG reading
    this.bloodSugarDisplay = this.add.text(
      20,
      20,
      this.bloodSugar.displayed,
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
    //baseline BG decreasing
    this.metabolism(this.rate.decrease, this.rate.zero);
    this.updateBloodSugarDisplay();
    this.updateHealth();
    this.updateBloodSugarDisplay();
    this.checkOverlap();
    this.interact();
    this.end();
  }

  //Update health Bar
  //Adapted from Pippin Barr
  updateHealth() {
    //ratio of blood sugar reading as a fraction of the max blood sugar for display
    this.ratio = this.bloodSugar.displayed / BLOODSUGAR.max;
    //display this ratio as proportional to max height
    this.healthBar.setScale(
      this.healthBar.maxWidth * this.ratio,
      this.healthBar.maxHeight
    );
  }

  // Update the Blood sugar display
  updateBloodSugarDisplay() {
    this.bloodSugarDisplay.text =
      Math.round(this.bloodSugar.displayed * 10) / 10;
  }

  //interactions of juice, blood sugar reading and glucagon with oscar
  interact() {
    //display  initial status of symptoms
    if (this.bloodSugar.displayed < this.bloodSugar.initial) {
      if (this.checkOscar) {
        this.symptoms.setVisible(this.checkOscar);
        //start with severe hypoglycemia <= 2.8
        if (this.bloodSugar.initial <= BLOODSUGAR.severeLow) {
          this.symptoms.text = "Help! Oscar has fainted!!";
        }
        //start with moderate hypoglycemia <= 3.5
        else if (this.bloodSugar.initial <= BLOODSUGAR.low) {
          this.symptoms.text = "Oscar is feeling dizzy and drowsy";
        }
        //start with light hypoglycemia <= 3.5
        else if (this.bloodSugar.initial <= BLOODSUGAR.hypoglycemia) {
          this.symptoms.text = "Oscar is feeling hungry and nauseous";
        }
      }
    }
    //if BG improving from initial
    else if (this.bloodSugar.displayed > this.bloodSugar.initial) {
      if (this.checkOscar) {
        this.symptoms.setVisible(this.checkOscar);
        this.symptoms.text = "Oscar is feeling better!!";
      }
    }

    //treat hypoglycemia
    //if BG < or = 2.8, severe hypoglycemia
    if (this.bloodSugar.displayed < BLOODSUGAR.severeLow) {
      //if juice given
      if (this.giveJuice) {
        this.response.text =
          "This is an emergency! Oscar is unconscious, he can't drink juice!";
        this.response.setVisible(this.giveJuice);
      }

      //if glucagon given
      if (this.giveGlucagon) {
        this.metabolism(this.rate.zero, this.rate.increase);
        this.updateBloodSugarDisplay();
      }
    } else {
      //if glucagon given
      if (this.giveGlucagon) {
        this.response.text =
          "***** There is no need for glucagon. Give him a snack****";
        this.response.setVisible(this.giveGlucagon);
      }

      //if juice given
      if (this.giveJuice) {
        this.metabolism(this.rate.zero, this.rate.rapidIncrease);
        this.updateBloodSugarDisplay();

        this.response.text = "Check Oscar's blood sugar is increasing again";
        this.response.setVisible(this.giveJuice);

        //make glucagon disappear after giving juice
        this.glucagon.setVisible(false);
      }
    }
  }

  //continuous decrease  of blood sugar value
  metabolism(consumption, intake) {
    this.bloodSugar.displayed += consumption + intake;
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

  end() {
    //lose if BG falls below 0.1
    if (this.bloodSugar.displayed < 0.1) {
      this.add.text(100, 100, `Game Over`, this.highlightStyle);
      //on click change scene
      this.input.on("pointerdown", () => this.scene.start("lose"));
    }
    //win if above 5
    else if (this.bloodSugar.displayed >= BLOODSUGAR.good) {
      this.add.text(100, 100, `Game Over`, this.highlightStyle);
      //on click change scene
      this.input.on("pointerdown", () => this.scene.start("win"));
    }
  }
}
