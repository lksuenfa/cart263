class Glass {
  constructor() {
    this.glass = {
      x: width / 2 - 100,
      y: 100,
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
      colour: {
        r: 132,
        g: 186,
        b: 227,
        a: 200,
      },
    };
  }

  //change colour of water
  changeColour() {
    this.water.colour.r = random(100, 255);
    this.water.colour.g = random(100, 255);
    this.water.colour.b = random(100, 255);
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
    rect(
      this.glass.x + 20,
      this.glass.y + 110,
      this.glass.width * 0.75,
      this.glass.height * 0.75
    );
    pop();
  }
}
