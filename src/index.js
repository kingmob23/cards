import Phaser from "phaser";
import MainScene from "./mainscene";
import logo from "./assets/logo.png";
import mainMenu from "./assets/mainMenu.jpg"

const gameWidth = 1024;
const gameHeight = 576;

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("logo", logo);
    this.load.image("mainMenu", mainMenu);
  }

  create() {
    const mainMenu = this.add.image(gameWidth / 2, gameHeight / 2, "mainMenu");

    const scaleX = gameWidth / mainMenu.width;
    const scaleY = gameHeight / mainMenu.height;
    const scale = Math.max(scaleX, scaleY);
    mainMenu.setScale(scale).setScrollFactor(0);

    const logo = this.add.image(400, 150, "logo");

    this.add.rectangle(740, 420, 150, 50, 0x000000);

    this.add
      .text(700, 400, "Start", { fill: "#0f0", fontSize: '32px' })
      .setInteractive()
      .on("pointerdown", () => this.startGame());

    this.tweens.add({
      targets: logo,
      y: 250,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }

  startGame() {
    this.scene.start("MainScene");
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1024,
  height: 576,
  scene: [MyGame, MainScene]
};

const game = new Phaser.Game(config);
