import * as Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  private buttonBg: Phaser.GameObjects.Rectangle;
  private buttonText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, callback: () => void) {
    super(scene, x, y);

    this.buttonBg = scene.add.rectangle(0, 0, 150, 40, 0x3498db);
    this.buttonText = scene.add.text(0, 0, text, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#fff',
    });

    this.add(this.buttonBg);
    this.add(this.buttonText);

    this.buttonBg.setInteractive({ useHandCursor: true });

    this.buttonBg.on('pointerdown', () => {
      callback();
    });

    scene.add.existing(this);
  }
}
