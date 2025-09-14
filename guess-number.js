#!/usr/bin/env node

const readline = require("readline");

class GuessNumberGame {
  constructor(min = 0, max = 100) {
    this.min = min;
    this.max = max;
    this.secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    console.log(`Загадано число в диапазоне от ${this.min} до ${this.max}`);

    this.rl.on("line", (input) => {
      this.processInput(input.trim());
    });

    this.rl.on("close", () => {
      process.exit(0);
    });
  }

  processInput(input) {
    const number = parseInt(input);

    if (isNaN(number)) {
      return;
    }

    if (number === this.secretNumber) {
      console.log(`Отгадано число ${this.secretNumber}`);
      this.rl.close();
      return;
    }

    if (number < this.secretNumber) {
      console.log("Больше");
    } else {
      console.log("Меньше");
    }
  }
}

const game = new GuessNumberGame();
game.start();
