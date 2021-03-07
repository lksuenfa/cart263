class Screen {
  constructor(screen) {
    // text colour
    this.red = {
      r: 245,
      g: 27,
      b: 103,
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

    this.text = {
      scene1: `To survive and perform your duties as a Hunter,
      you will need to thrive among the strongest.
      You can only achieve this by harnessing the power of Nen.`,

      scene2: `There are 6 types of aura.
      Every individual is born having one of these six.
      Upon learning one's own aura type, a student of Nen can set about learning to apply the
      technique in a unique way that suits their personality, which can develop into a unique skill.`,

      scene3: `We will use water divination to determine your aura type.
      Place your hands around the glass of water and focus.`,
    };
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

      case 2:
        this.scene2();
        break;

      case 3:
        this.scene3();
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

    //make responsive voice welcome user
    responsiveVoice.speak("Welcome HUNTER! ");
  }

  //scene 1:
  scene1() {
    push();
    this.formatingText();
    text(this.text.scene1, this.x, this.y);
    pop();

    this.next();
  }

  //scene 2:
  scene2() {
    push();
    this.formatingText();
    text(this.text.scene2, this.x, this.y);
    pop();

    //go to next page
    this.next();
  }

  //scene 3:
  scene3() {
    push();
    this.formatingText();
    text(this.text.scene3, this.x, this.y);
    pop();

    //go to next page
    this.next();
  }

  //formating
  formatingText() {
    background(this.aqua.r, this.aqua.g, this.aqua.b);
    fill(this.red.r, this.red.g, this.red.b);
    textSize(this.fontSize);
    textFont(this.font);
    textAlign(CENTER, CENTER);
  }
  //display go to next page
  next() {
    push();
    fill(this.red.r, this.red.g, this.red.b);
    textSize(this.fontSize);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    text("Next page >>", this.x, this.y + 100);
    pop();
  }
}
