class Glass {
  constructor() {
    this.glass = {
      x: width / 2 - 100,
      y: 150,
      width: 150,
      height: 500,
      colour: {
        r: 192,
        g: 232,
        b: 240,
        a: 150,
      },
    };

    this.water = {
      x: this.glass.x + 20,
      y: this.glass.y + 110,
      width: this.glass.width * 0.75,
      height: this.glass.height * 0.75,
      colour: {
        r: 132,
        g: 186,
        b: 227,
        a: 200,
      },
      vy: 10,
    };

    // this.impurities = {
    //   x: random(this.water.x, this.water.x + this.water.width),
    //   y: random(this.water.y, this.water.y + this.water.height),
    //   size: 10,
    // };

    this.impurities = 10;
  }

  //change colour of water
  changeColour() {
    this.water.colour.r = random(100, 255);
    this.water.colour.g = random(100, 255);
    this.water.colour.b = random(100, 255);
  }

  //increase water
  increase() {
    //if water can only go up 10px above glass level
    if (
      this.water.y > this.glass.y - 10 &&
      this.water.y < this.glass.y + this.glass.height
    ) {
      //increase water
      this.water.height += this.water.vy;
      //move position of water.y so that it looks like it is increasing instead of moving down the screen
      this.water.y -= this.water.vy;
    }
  }

  //make water disappear by turning it transparent
  disappear() {
    this.water.colour.a = 0;
  }

  //make impurities appear in water
  // impurities() {
  //   for (let i = 0; i < this.impurities; i++) {
  //   let x = random(this.water.x, this.water.x + this.water.width);
  //   let y = random(this.water.y, this.water.y + this.water.height);
  //     stroke(0);
  //     strokeWeight(4);
  //     point(x, y);
  //   }
  //
  // push();
  // fill(0);
  // ellipse(impurities.x, impurities.y, impurities.size);
  // pop();
  // }

  display() {
    //display glass
    push();
    noFill();
    stroke(
      this.glass.colour.r,
      this.glass.colour.g,
      this.glass.colour.b,
      this.glass.colour.a
    );
    strokeWeight(6);
    rect(this.glass.x, this.glass.y, this.glass.width, this.glass.height);
    pop();

    //display water
    push();
    noStroke();
    fill(
      this.water.colour.r,
      this.water.colour.g,
      this.water.colour.b,
      this.water.colour.a
    );
    rect(this.water.x, this.water.y, this.water.width, this.water.height);
    pop();
  }
}
