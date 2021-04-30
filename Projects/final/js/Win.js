class Win extends Phaser.Scene {
  constructor() {
    super({ key: `win` });
  }

  create() {
    // add text
    let style = {
      fontFamily: `Kiwi Maru`,
      fontSize: 50,
      color: `#bf0442`,
    };

    let description = `Oscar is feeling so much better`;

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
