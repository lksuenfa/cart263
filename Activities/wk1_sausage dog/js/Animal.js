class Animal {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.angle = 0;
  }

  update() {
    this.display();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

  // Check if the x is greater than the left side and less that the right side
  // and greater than the top and less than the bottom of the image
  // Uses the width and height properties of the image to track its size
  overlap(x, y) {
    if (
      mouseX > this.x - this.image.width / 2 &&
      mouseX < this.x + this.image.width / 2 &&
      mouseY > this.y - this.image.height / 2 &&
      mouseY < this.y + this.image.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
