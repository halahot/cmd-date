#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const logFileName = process.argv[2];

if (!logFileName) {
  console.log("Ошибка: укажите имя лог-файла при запуске.");
  process.exit(1);
}

const logFilePath = path.resolve(logFileName);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Случайное число (1 - Орел, 2 - Решка)
const random = Math.floor(Math.random() * 2) + 1;

rl.question("Орел (1) или Решка (2)? Введите число: ", (answer) => {
  const userChoice = parseInt(answer, 10);

  let result;
  if (userChoice === random) {
    result = "Угадал!";
  } else {
    result = "Не угадал!";
  }

  console.log(`Выпало: ${random}. ${result}`);

  const logEntry = `Игрок выбрал: ${userChoice}, выпало: ${random}, результат: ${result}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Ошибка записи в файл:", err);
    } else {
      console.log("Результат сохранен в", logFilePath);
    }
    rl.close();
  });
});
