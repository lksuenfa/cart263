class Kitchen extends Phaser.Scene {
  constructor() {
    super({ key: `kitchen` });
  }

  create() {
    //add Oscar picture as sprite
    let sprite = this.add.sprite(500, 300, `unwell`).setInteractive();

    // add text
    let style = {
      fontFamily: `Kiwi Maru`,
      fontSize: 20,
      color: `#bf0442`,
    };

    let description = `yoo`;

    // change text when clicking on spriteon click
    sprite.on("pointerdown", function (pointer) {
      this.add.text(100, 400, description, style);
    });
  }

  update() {}
}
