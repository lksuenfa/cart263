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

    let description = `Oscar is feeling so much better. \n He will grab lunch and watch drama.`;

    this.add.text(100, 100, description, style);

    this.input.on("pointerdown", () => this.scene.start("play"));
  }
}