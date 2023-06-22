import Phaser from "phaser";
import background from "./assets/background.jpg";
import handImage from "./assets/hand.png";
import cardRunImage from "./assets/run.png";
import cardSleepImage from "./assets/sleep.png";
import cardWinkImage from "./assets/wink.png";
import backImage from "./assets/back.svg";
import tableImage from "./assets/table.png";

const gameWidth = 1024;
const gameHeight = 576;

const tablePositions = [
  { x: 200, y: gameHeight - 180 },
  { x: 300, y: gameHeight - 180 },
  { x: 400, y: gameHeight - 180 },
  { x: 500, y: gameHeight - 180 },
  { x: 600, y: gameHeight - 180 }
];

var tableQueue = [...tablePositions];

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
    this.load.image("backImage", backImage);
    this.load.image("tableImage", tableImage);
  }

  create() {
    const bg = this.add.image(gameWidth / 2, gameHeight / 2, "background");

    const scaleX = gameWidth / bg.width;
    const scaleY = gameHeight / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);

    var tableSprite = this.add
      .sprite(gameWidth / 2, gameHeight / 2, "tableImage")
      .setScale(0.55)
      .setAngle(0);

    var backSprite = this.add
      .sprite(gameWidth - 180, gameHeight - 150, "backImage")
      .setScale(0.2)
      .setAngle(0);

    // Предположим, что рука изначально находится за пределами экрана
    var handSprite = this.add
      .sprite(-250, gameHeight - 80, "handImage")
      .setScale(0.3)
      .setAngle(-30);

    var moveToDeck = this.tweens.add({
      targets: handSprite,
      x: gameWidth - 250,
      ease: "Power2",
      duration: 2000,
      onComplete: () => this.takeCard(handSprite)
    });
  }

  takeCard(handSprite) {
    var card = this.add
      .sprite(handSprite.x + 100, handSprite.y - 50, "backImage")
      .setScale(0.2);

    card.setDepth(0);
    handSprite.setDepth(1);

    var returnToStart = this.tweens.add({
      targets: handSprite,
      x: -250,
      y: gameHeight - 80,
      ease: "Power2",
      duration: 2000,
      onComplete: () => this.revealCards()
    });

    var moveCard = this.tweens.add({
      targets: card,
      x: -200,
      ease: "Power2",
      duration: 2000
    });
  }

  revealCards() {
    var startingX = 100;
    var spacing = 170;

    var cardRunSprite = this.add
      .sprite(startingX, gameHeight + 200, "cardRunImage")
      .setScale(0.25)
      .setInteractive();

    var cardSleepSprite = this.add
      .sprite(startingX + spacing, gameHeight + 200, "cardSleepImage")
      .setScale(0.25)
      .setInteractive();

    var cardWinkSprite = this.add
      .sprite(startingX + spacing * 2, gameHeight + 200, "cardWinkImage")
      .setScale(0.25)
      .setInteractive();

    cardRunSprite.on("pointerdown", () => this.moveCardToTable(cardRunSprite));
    cardSleepSprite.on("pointerdown", () =>
      this.moveCardToTable(cardSleepSprite)
    );
    cardWinkSprite.on("pointerdown", () =>
      this.moveCardToTable(cardWinkSprite)
    );

    var moveUpTween = this.tweens.add({
      targets: [cardRunSprite, cardSleepSprite, cardWinkSprite],
      y: "-=300",
      ease: "Power2",
      duration: 2000
    });
  }

  moveCardToTable(card) {
    card.removeInteractive(); // Сделаем карту неинтерактивной

    var targetPosition = tableQueue.shift(); // Берем первую свободную позицию на столе

    var moveUpTween = this.tweens.add({
      targets: card,
      x: targetPosition.x,
      y: targetPosition.y,
      scale: "-=0.1",
      ease: "Power2",
      duration: 2000
    });
  }
}
