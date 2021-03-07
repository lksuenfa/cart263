class Leaf {
  constructor(img) {
    this.leaf = {
      x: width / 2 - 20,
      y: height / 2 - 85,
      img: img,
      vy: 10,
      vx: random(-2, 2),
    };
  }

  //fall to bottom of glass
  fall() {
    if (this.leaf.y < 610) {
      this.leaf.y += this.leaf.vy;
    }
  }

  //move slightly right and left
  move() {
    this.leaf.x += this.leaf.vx;
  }

  //move up following water
  float() {
    if (this.leaf.y > 140) {
      //move leaf up too
      this.leaf.y -= this.leaf.vy;
    }
  }

  //display leaf
  display() {
    push();
    imageMode(CENTER);
    image(this.leaf.img, this.leaf.x, this.leaf.y);
    pop();
  }
}
