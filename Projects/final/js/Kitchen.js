class Kitchen extends Phaser.Scene {
  constructor() {
    super({ key: `kitchen` });
  }

  create() {
    const MAXBLOODSUGAR = 7;

    //add images
    this.kitchen = this.add.image(500, 200, `kitchen`);
    this.kitchen.setScale(2.5);
    this.healthBar = this.add.image(450, 200, `healthBar`);

    //add sprites
    this.oscar = this.add.sprite(500, 300, `unwell`).setInteractive();
    this.glucometer = this.add.sprite(250, 250, `glucometer`).setInteractive();
    this.glucometer.setScale(0.5);
    this.juice = this.add.sprite(700, 150, `juice`).setInteractive();
    this.juice.setScale(0.5);
    this.glucagon = this.add.sprite(400, 80, `glucagon`).setInteractive();
    this.glucagon.setScale(0.25);

    // add text
    this.style = {
      fontFamily: `Kiwi Maru`,
      fontSize: 20,
      color: `#bf0442`,
    };

    this.description = `Explore Oscar's environment to find out what's wrong`;
    this.bloodSugarValue = randomIntFromInterval(1, 3);

    //display text
    this.textDisplay = this.add.text(100, 500, this.description, this.style);
    this.bloodSugarDisplay = this.add.text(
      20,
      20,
      this.bloodSugarValue,
      this.style
    );
    //set visibility of item
    this.bloodSugarDisplay.setVisible(false);

    //drag object
    this.input.setDraggable(this.glucometer);
    this.input.setDraggable(this.juice);
    this.input.setDraggable(this.glucagon);
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // change text when clicking on spriteon click
    this.oscar.on("pointerdown", function (pointer) {
      //if BG < 2.8, Oscar faints
      if (this.bloodSugarValue < 2.8) {
        this.textDisplay.text = "Help! Oscar has fainted!!";
      }
      // if BG between 2.8 and 3.5, then display neuroglycopenic symptoms
      else if (this.bloodSugarValue > 2.8 && this.bloodSugarValue < 3.5) {
        this.textDisplay.text = "Oscar is feeling dizzy and drowsy";

        //if BG between 3.5 and 4 then display autonomic symptoms
      } else if (this.bloodSugarValue > 3.5 && this.bloodSugarValue < 4) {
        this.textDisplay.text = "Oscar is feeling hungry and nauseous";

        //no hypoglycemia if BG > 4
      } else if (this.bloodSugarValue > 4) {
        this.textDisplay.text = "Oscar is feeling a lot better";
      }
    });

    //health bar
    //source; Pippin Barr
    this.healthBar.maxWidth = 200;
    this.healthBar.maxHeight = 10;
    this.healthBar.setOrigin(0, 0);

    //ratio of blood sugar reading as a fraction of the max blood sugar for display
    this.ratio = this.bloodSugarValue / MAXBLOODSUGAR;

    //display this ratio as proportional to max height
    this.healthBar.setScale(
      this.healthBar.maxWidth * this.ratio,
      this.healthBar.maxHeight
    );
  }

  update() {
    //continuous decrease  of blood sugar value
    this.bloodSugarValue -= 0.00001;
    this.bloodSugarDisplay = this.add.text(
      20,
      20,
      this.bloodSugarValue,
      this.style
    );

    //check for overlap
    //source: Pippin Barr
    this.overlap = Phaser.Geom.Intersects.RectangleToRectangle(
      this.oscar.getBounds(),
      this.glucometer.getBounds()
    );

    //display if overlap is true
    this.bloodSugarDisplay.setVisible(this.overlap);
  }
}

// Generate a random number and round it up
function randomIntFromInterval(min, max) {
  // Generate a random number between intervals https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomNum = Math.random() * (max - min + 1) + min;
  // round the answer to 1 decimal place https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  let roundedNum = Math.round(randomNum * 10) / 10;
  return roundedNum;
}
