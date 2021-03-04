class Leaf {
  constructor(img) {
    this.leaf = {
      x: width / 2 - 20,
      y: height / 2 - 85,
      img: img,
      vy: 1,
    };
    const glassHeight = width / 2 - 100;
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
