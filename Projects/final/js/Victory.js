class Victory extends Phaser.Scene {
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

    let description = `The sweet Oscar has gone \nto meet his  ancestors in heaven. \nHe will be dearly missed`;

    this.add.text(100, 100, description, style);

    this.input.on("pointerdown", () => this.scene.start("play"));
  }
}
