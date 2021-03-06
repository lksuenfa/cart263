class Lose extends Phaser.Scene {
  constructor() {
    super({ key: `lose` });
  }

  create() {
    // add text
    let style = {
      fontFamily: `Kiwi Maru`,
      fontSize: 50,
      color: `#bf0442`,
    };

    let description = `The sweet Oscar has joined \nhis ancestors in heaven.`;

    this.add.text(100, 100, description, style);

    let startAgain = `<Click to restart>`;
    // add text
    let secondStyle = {
      fontFamily: `Kiwi Maru`,
      fontSize: 20,
      color: `#bf0442`,
    };

    this.add.text(100, 250, startAgain, secondStyle);

    this.input.on("pointerdown", () => this.scene.start("play"));
  }
}
