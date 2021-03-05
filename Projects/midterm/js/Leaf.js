class Leaf {
  constructor(img) {
    this.leaf = {
      x: width / 2 - 20,
      y: height / 2 - 85,
      img: img,
      vy: 10,
      vx: 10,
    };
    const glassHeight = width / 2 - 100;
  }

  move() {
    // if (this.leaf.x < width / 2 - 40) {
    this.leaf.x += this.leaf.vx;
    // } else if (this.leaf.x > width / 2) {
    //   this.leaf.x -= this.leaf.vx;
    // }
  }
  float() {
    if (this.leaf.x > glassHeight) {
      this.leaf.y -= this.leaf.vy;
    }
  }
  display() {
    push();
    imageMode(CENTER);
    image(this.leaf.img, this.leaf.x, this.leaf.y);
    pop();
  }
}
