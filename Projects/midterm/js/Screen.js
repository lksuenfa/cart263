class Screen {
  constructor(screen) {
    // text colour
    this.red = {
      r: 214,
      g: 51,
      b: 37,
    };

    //background colour
    this.aqua = {
      r: 198,
      g: 242,
      b: 229,
    };

    //default font size
    this.fontSize = 16;

    this.font = "DotGothic16";
    //positioning
    this.x = width / 2;
    this.y = height / 2;

    //screen title
    this.screen = screen;
  }

  //switch to move from screen to screen
  updateScreen() {
    switch (this.screen) {
      case 0:
        this.scene0();
        break;
      case 1:
        this.scene1();
        break;
    }
  }

  // scene 0 : title screen
  scene0() {
    push();
    background(255);
    fill(0);
    textSize(this.fontSize * 4);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    text("SECRET HUNTER EXAM", this.x, this.y);
    pop();

    push();
    fill(this.red.r, this.red.g, this.red.b);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);
    textFont(this.font);
    text("<< Click to start >>", this.x, this.y + 100);
    pop();

    responsiveVoice.speak("Welcome! ");
  }

  //scene 1:
  scene1() {
    push();
    background(this.aqua.r, this.aqua.g, this.aqua.b);
    fill(this.red.r, this.red.g, this.red.b);
    textSize(this.fontSize);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    text(
      "In order to survive and perform your duties as a Hunter,  you will need to stand among the strongest and thrive. You will need to harness the power of Nen and develop your individual style. ",
      this.x,
      this.y
    );
    pop();

    this.next();
  }

  //go to next page
  next() {
    push();
    fill(this.red.r, this.red.g, this.red.b);
    textSize(this.fontSize);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    text("<< Next page >>", this.x, this.y + 100);
    pop();
  }
}
