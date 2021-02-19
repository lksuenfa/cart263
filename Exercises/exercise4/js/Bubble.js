class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.vx = 0;
    this.vy = -2;

    this.score = 0;
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

      //if bubble pops, its speed increases individually
      this.vy += -5;

      //Score increases +1
      // this.score++;
      return true;
    } else {
      return false;
    }
  }

  //display bubble
  display() {
    push();

    fill(0, 100, 200, 100);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();

    //no displays lots of scores
    // push();
    // textSize(36);
    // fill(255);
    // textAlign(CENTER, CENTER);
    // text(this.score, width - 100, height - 100);
    // pop();
  }
}
