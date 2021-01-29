class SausageDog extends Animal {
  constructor(x, y, image, angle, sound) {
    super(x, y, image, angle);

    this.found = false;
    this.rotationSpeed = 0.25;
    this.grow = 5;

    this.sound = sound;
  }

  update() {
    super.update();

    if (this.found) {
      this.angle += this.rotationSpeed;
      this.image.width += this.grow;
      this.image.length += this.grow;
    }
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
