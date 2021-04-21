class Play extends Phaser.Scene {
  constructor() {
    super({ key: `play` });
  }

  create() {
    //add Oscar picture
    this.unwell = this.add.image(500, 300, `unwell`);

    // add text
    let style = {
      fontFamily: `Kiwi Maru`,
      fontSize: 20,
      color: `#bf0442`,
    };

    let description = `Oscar has diabetes and is feeling faint ... Help him feel better.`;

    this.add.text(100, 400, description, style);

    this.input.on(
      "pointerup",
      function (pointer) {
        this.scene.start("kitchen");
      },
      this
    );
  }

  update() {}
}
