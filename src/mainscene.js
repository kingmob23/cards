import Phaser from "phaser";
import background from "./assets/background.jpg";
import handImage from "./assets/hand.png";
import cardRunImage from "./assets/run.png";
import cardSleepImage from "./assets/sleep.png";
import cardWinkImage from "./assets/wink.png";
import backImage from "./assets/back.svg";
import enemyImage from "./assets/enemy.png";

const gameWidth = 1024;
const gameHeight = 576;

const playerTablePositions = [
  { x: 200, y: gameHeight - 180 },
  { x: 300, y: gameHeight - 180 },
  { x: 400, y: gameHeight - 180 },
  { x: 500, y: gameHeight - 180 },
  { x: 600, y: gameHeight - 180 }
];

const botTablePositions = [
  { x: 200, y: 80 },
  { x: 300, y: 80 },
  { x: 400, y: 80 },
  { x: 500, y: 80 },
  { x: 600, y: 80 }
];

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.botHand = [];
    this.turn = "player";
    this.playerTableQueue = [...playerTablePositions];
    this.botTableQueue = [...botTablePositions];
  }

  preload() {
    this.load.image("background", background);
    this.load.image("handImage", handImage);
    this.load.image("cardRunImage", cardRunImage);
    this.load.image("cardSleepImage", cardSleepImage);
    this.load.image("cardWinkImage", cardWinkImage);
    this.load.image("backImage", backImage);
    this.load.image("enemyImage", enemyImage);
  }

  create() {
    const bg = this.add.image(gameWidth / 2, gameHeight / 2, "background");

    const scaleX = gameWidth / bg.width;
    const scaleY = gameHeight / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);

    const backSprite = this.addSprite(
      gameWidth - 180,
      gameHeight / 2,
      "backImage",
      0.2,
      90
    );

    const handSprite = this.addSprite(
      -250,
      gameHeight - 80,
      "handImage",
      0.3,
      -30
    );

    const moveToDeck = this.tweens.add({
      targets: handSprite,
      x: gameWidth - 250,
      ease: "Power2",
      duration: 2000,
      onComplete: () => {
        this.takeCard(handSprite);
        this.takeCardBot();
      }
    });
  }

  addSprite(x, y, image, scale, angle = 0) {
    return this.add.sprite(x, y, image).setScale(scale).setAngle(angle);
  }

  takeCard(handSprite) {
    let card = this.add
      .sprite(handSprite.x + 100, handSprite.y - 50, "backImage")
      .setScale(0.2);

    card.setDepth(0);
    handSprite.setDepth(1);

    const returnToStart = this.tweens.add({
      targets: handSprite,
      x: -250,
      y: gameHeight - 80,
      ease: "Power2",
      duration: 2000,
      onComplete: () => this.revealCards()
    });

    const moveCard = this.tweens.add({
      targets: card,
      x: -200,
      ease: "Power2",
      duration: 2000
    });
  }

  takeCardBot() {
    let card = this.addSprite(500, 250, "backImage", 0.2);

    const giveToBot = this.tweens.add({
      targets: card,
      x: 100,
      y: 100,
      ease: "Power2",
      duration: 2000,
      onComplete: () => {
        this.botHand.push({
          name: "enemyImage",
          sprite: null
        });
      }
    });
  }

  botTurn() {
    if (this.botHand.length > 0) {
      let botCard = this.botHand.pop();

      botCard.sprite = this.addSprite(gameWidth / 2, 80, "backImage", 0.25);
      botCard.sprite.setAngle(180);

      const moveToTable = this.tweens.add({
        targets: botCard.sprite,
        x: gameWidth / 2,
        y: gameHeight / 2,
        ease: "Power2",
        duration: 2000,
        onComplete: () => {
          botCard.sprite.setTexture(botCard.name);
          this.moveCardToTable(botCard.sprite, this.botTableQueue);
          this.startTurn("player");
        }
      });
    }
  }

  revealCards() {
    const startingX = 100;
    const spacing = 170;

    const cardWinkSprite = this.addSprite(
      startingX + spacing * 2,
      gameHeight + 200,
      "cardWinkImage",
      0.25
    ).setInteractive();

    cardWinkSprite.on("pointerdown", () => {
      if (this.turn === "player") {
        this.moveCardToTable(cardWinkSprite, this.playerTableQueue);
        this.startTurn("bot");
        this.botTurn();
      }
    });

    const moveUpTween = this.tweens.add({
      targets: cardWinkSprite,
      y: "-=300",
      ease: "Power2",
      duration: 2000
    });
  }

  moveCardToTable(card, tableQueue) {
    card.removeInteractive();

    let targetPosition = tableQueue.shift();

    const moveUpTween = this.tweens.add({
      targets: card,
      x: targetPosition.x,
      y: targetPosition.y,
      scale: "-=0.1",
      ease: "Power2",
      duration: 2000
    });
  }

  startTurn(turn) {
    this.turn = turn;
  }
}
