class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.vx = 0;
    this.vy = -2;
  }

  update() {
    this.display();
    this.move();
  }

  move() {
    //movement of bubble
    this.x += this.vx;
    this.y += this.vy;

    //reset bubble position if reaches top
    if (this.y < 0) {
      this.x = random(width);
      this.y = height;
    }
  }

  //reset position of bubble if touched
  checkPopping(tipX, tipY) {
    let d = dist(tipX, tipY, this.x, this.y);

    if (d < this.size / 2) {
      this.x = random(width);
      this.y = height;
    }
  }

  //display bubble
  display() {
    push();
    fill(0, 100, 200);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
