import Phaser from "phaser";
import background from "./assets/background.jpg";
import handImage from "./assets/hand.png";

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
  }

  create() {
    // var tableSprite = this.add.sprite(400, 300, "tableImage");
    // var deckSprite = this.add.sprite(600, 400, "deckImage");

    // var cardRun = { id: 1, name: "Card Run", image: "cardRunImage" };
    // var cardSleep = { id: 2, name: "Card Sleep", image: "cardSleepImage" };
    // var cardWink = { id: 3, name: "Card Wink", image: "cardWinkImage" };

    // hand.push(cardRun);
    // hand.push(cardSleep);
    // hand.push(cardWink);

    // hand.forEach(function(card) {
    //   var cardSprite = this.add.sprite(0, 0, card.image);
    //   cardSprite.setInteractive();

    //   cardSprite.on(
    //     "pointerdown",
    //     function(pointer) {
    //       console.log("Вы выбрали карту:", card.name);
    //     },
    //     this
    //   );

    //   var cardOffsetX = 50;
    //   var cardOffsetY = 0;
    //   var cardSpacing = 20;

    //   cardSprite.x =
    //     handSprite.x -
    //     hand.length * cardOffsetX +
    //     cardOffsetX * hand.indexOf(card) +
    //     cardSpacing * hand.indexOf(card);
    //   cardSprite.y = handSprite.y + cardOffsetY;
    // }, this);

    const bg = this.add.image(gameWidth / 2, gameHeight / 2, "background");

    const scaleX = gameWidth / bg.width;
    const scaleY = gameHeight / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);

    var handSprite = this.add.sprite(300, gameHeight - 150, "handImage").setScale(0.5);
    handSprite.setAngle(-30);

  }
}
