// load assets

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: `boot` });
  }

  preload() {
    this.load.image(`unwell`, `assets/images/unwell.svg`);
    this.load.image(`kitchen`, `assets/images/kitchen.svg`);
    this.load.image(`glucagon`, `assets/images/glucagon.svg`);
    this.load.image(`glucometer`, `assets/images/glucometer.svg`);
    this.load.image(`juice`, `assets/images/juice.svg`);

    // Switch to the Play scene after loading using 'complete' event listener
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create() {
    let style = {
      fontFamily: `Kiwi Maru`,
      fontSize: 40,
      color: `#bf0442`,
    };

    let load = `Loading...`;

    // add text
    this.add.text(100, 300, load, style);
  }

  update() {}
}
