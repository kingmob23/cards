import Phaser from "phaser";
import background from "./assets/background.jpg";
import handImage from "./assets/hand.png";
import cardRunImage from "./assets/run.png";
import cardSleepImage from "./assets/sleep.png";
import cardWinkImage from "./assets/wink.png";

const gameWidth = 1024;
const gameHeight = 576;

var hand = [];
var table = [];
var deck = [];

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("background", background);
    this.load.image("handImage", handImage);
    this.load.image("cardRunImage", cardRunImage);
    this.load.image("cardSleepImage", cardSleepImage);
    this.load.image("cardWinkImage", cardWinkImage);
  }

  create() {
    const bg = this.add.image(gameWidth / 2, gameHeight / 2, "background");

    const scaleX = gameWidth / bg.width;
    const scaleY = gameHeight / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);

    var cardRun = { id: 1, name: "Card Run", image: "cardRunImage" };
    var cardSleep = { id: 2, name: "Card Sleep", image: "cardSleepImage" };
    var cardWink = { id: 3, name: "Card Wink", image: "cardWinkImage" };

    hand.push(cardRun);
    hand.push(cardSleep);
    hand.push(cardWink);

    var cardRunSprite = this.add
      .sprite(350, 200, "cardRunImage")
      .setScale(0.3)
      .setAngle(-20);

    var cardSleepSprite = this.add
      .sprite(400, 200, "cardSleepImage")
      .setScale(0.3)
      .setAngle(0);

    var cardWinkSprite = this.add
      .sprite(500, 200, "cardWinkImage")
      .setScale(0.3)
      .setAngle(25);

    var handSprite = this.add
      .sprite(300, gameHeight - 150, "handImage")
      .setScale(0.5)
      .setAngle(-30);
  }
}
