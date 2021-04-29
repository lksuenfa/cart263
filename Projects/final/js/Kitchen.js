const MAXBLOODSUGAR = 7;

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
    // const MAXBLOODSUGAR = 7;

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
    // this.input.on("drop", function (pointer, gameObject, dropZone) {
    //   this.bloodSugarValue += 3;
    //   gameObject.input.enabled = false;
    // });

    //if dragged and dropped away from Oscar, come back to initial position
    // this.input.on("dragend", function (pointer, gameObject, dropped) {
    //   if (!dropped) {
    //     gameObject.x = gameObject.input.dragStartX;
    //     gameObject.y = gameObject.input.dragStartY;
    //   }
    // });

    //to uncomment
    //add audio
    // this.music = this.sound.add("theme");
    // this.music.play();

    // add text
    this.style = {
      fontFamily: `Kiwi Maru`,
      fontSize: 20,
      color: `#bf0442`,
    };

    this.description = `Explore Oscar's environment to find out what's wrong`;
    this.bloodSugarValue = randomIntFromInterval(2, 3);

    //display text
    this.symptoms = this.add.text(100, 550, this.description, this.style);
    this.response = this.add.text(100, 500, `sdfs`, this.style);
    this.response.setVisible(false);
    this.bloodSugarDisplay = this.add.text(
      20,
      20,
      this.bloodSugarValue,
      this.style
    );
    //set visibility of item
    this.bloodSugarDisplay.setVisible(false);

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
    //continuous decrease  of blood sugar value until 0
    if (this.bloodSugarValue > 0) {
      this.bloodSugarValue -= 0.005;
    }

    //Source: Pippin Barr
    this.bloodSugarDisplay.text = Math.round(this.bloodSugarValue * 10) / 10; // Update the text

    // Recalculate current blood sugar ratio
    this.ratio = this.bloodSugarValue / MAXBLOODSUGAR;
    // Update the width of the health bar
    this.healthBar.setScale(
      this.healthBar.maxWidth * this.ratio,
      this.healthBar.maxHeight
    );
    // updateHealthBar();

    // display symptoms according to BG
    //if BG < 2.8, Oscar faints
    if (this.bloodSugarValue <= BLOODSUGAR.severeLow && this.checkOscar) {
      this.symptoms.text = "Help! Oscar has fainted!!";
    }
    // if BG between 2.8 and 3.5, then display neuroglycopenic symptoms
    else if (
      this.bloodSugarValue > 2.9 &&
      this.bloodSugarValue < 3.5 &&
      this.checkOscar
    ) {
      this.symptoms.text = "Oscar is feeling dizzy and drowsy";
    }

    //if BG between 3.5 and 4 then display autonomic symptoms
    else if (
      this.bloodSugarValue > 3.5 &&
      this.bloodSugarValue < 4 &&
      this.checkOscar
    ) {
      this.symptoms.text = "Oscar is feeling hungry and nauseous";

      //no hypoglycemia if BG > 4
    } else if (this.bloodSugarValue > 4 && this.checkOscar) {
      this.symptoms.text = "Oscar is feeling a lot better";
    }

    this.symptoms.setVisible(false);

    //check for overlap
    //source: Pippin Barr
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

    //if juice given to Oscar
    if (
      //if blood sugar not severely low
      this.bloodSugarValue > BLOODSUGAR.severeLow &&
      //limit increase to max blood sugar
      this.bloodSugarValue < MAXBLOODSUGAR &&
      this.giveJuice
    ) {
      this.bloodSugarValue += 0.01; //increase BG
      this.bloodSugarDisplay.text = Math.round(this.bloodSugarValue * 10) / 10; //update text display

      this.response.text = "Check Oscar's blood sugar is increasing again";
      this.response.setVisible(this.giveJuice);
      // this.symptoms.setVisible(false);
    } else if (this.bloodSugarValue < BLOODSUGAR.severeLow && this.giveJuice) {
      this.response.text =
        "This is an emergency! Oscar is unconscious, he can't drink juice!";
      this.response.setVisible(this.giveJuice);
      // this.symptoms.setVisible(false);
    }

    //overlap glucagon and oscar
    this.giveGlucagon = Phaser.Geom.Intersects.RectangleToRectangle(
      this.oscar.getBounds(),
      this.glucagon.getBounds()
    );

    // console.log(BLOODSUGAR.severelow);
    // console.log(
    //   this.bloodSugarValue < 2.8w && this.giveGlucagon
    // );
    //if glucagon given
    if (this.bloodSugarValue > BLOODSUGAR.severeLow && this.giveGlucagon) {
      this.bloodSugarValue += 0.01;
      this.bloodSugarDisplay.text = Math.round(this.bloodSugarValue * 10) / 10; //update text display

      this.response.text = "Check Oscar's blood sugar is increasing again";
      this.response.setVisible(this.giveGlucagon);

      this.symptoms.text = "Oscar will feel better soon!!";
    } else if (
      this.bloodSugarValue > BLOODSUGAR.severeLow &&
      this.giveGlucagon
    ) {
      this.response.text = "It is not that bad! There is no need for glucagon.";
      this.response.setVisible(this.giveGlucagon);
      this.symptoms.text = "Oscar will feel better soon!!";
    }
  }
}

function updateHealthBar() {
  // // Recalculate current blood sugar ratio
  // this.ratio = this.bloodSugarValue / MAXBLOODSUGAR;
  // // Update the width of the health bar
  // this.healthBar.setScale(
  //   this.healthBar.maxWidth * this.ratio,
  //   this.healthBar.maxHeight
  // );
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
