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
      vy: 1,
    };

    this.impurities = 100;
  }

  //change colour of water
  changeColour() {
    this.water.colour.r = random(100, 255);
    this.water.colour.g = random(100, 255);
    this.water.colour.b = random(100, 255);
  }

  //increase water
  increase() {
    if (this.water.x > this.glass.x) {
      this.water.height += this.water.vy;
      this.water.y -= this.water.vy;
    }
  }

  //make water disappear by turning it transparent
  disappear() {
    this.water.colour.a = 0;
  }

  //make impurities appear in water
  impurities() {
    for (let i = 0; i < this.impurities; i++) {
      let x = random(this.water.x, this.water.x + this.water.width);
      let y = random(this.water.y, this.water.y + this.water.height);
      stroke(255);
      point(x, y);
    }
  }

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
