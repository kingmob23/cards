import Phaser from "phaser";

const gameWidth = 1024;
const gameHeight = 576;

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("background", "src/assets/background.jpg");
  }

  create() {
    const bg = this.add.image(gameWidth / 2, gameHeight / 2, "background");

    const scaleX = gameWidth / bg.width;
    const scaleY = gameHeight / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);
  }
}
