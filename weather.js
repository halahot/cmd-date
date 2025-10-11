#!/usr/bin/env node

import http from "http";
import readline from "readline";
import { config } from "./config.js";

// Создаём интерфейс для ввода из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Приглашение для ввода города
rl.question("Введите название города: ", (cityInput) => {
  const city = cityInput.trim();

  if (!city) {
    console.log("Вы не ввели название города.");
    rl.close();
    return;
  }

  // 1️⃣ Получаем координаты через геокодинг
  const geoUrl = `${config.GEOCODING_API_URL}?name=${encodeURIComponent(
    city
  )}&count=1&language=ru`;

  http
    .get(geoUrl, (geoRes) => {
      let geoData = "";

      geoRes.on("data", (chunk) => (geoData += chunk));
      geoRes.on("end", () => {
        try {
          const geo = JSON.parse(geoData);
          if (!geo.results || geo.results.length === 0) {
            console.log("❌ Город не найден.");
            rl.close();
            return;
          }

          const { latitude, longitude, name, country } = geo.results[0];

          // 2️⃣ Получаем погоду по координатам
          const weatherUrl = `${config.WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

          http
            .get(weatherUrl, (weatherRes) => {
              let weatherData = "";

              weatherRes.on("data", (chunk) => (weatherData += chunk));
              weatherRes.on("end", () => {
                try {
                  const weather = JSON.parse(weatherData);
                  const current = weather.current_weather;

                  if (!current) {
                    console.log("Не удалось получить данные о погоде.");
                    rl.close();
                    return;
                  }

                  console.log("\nПогода сейчас:");
                  console.log(`Город: ${name}, ${country}`);
                  console.log(`Температура: ${current.temperature}°C`);
                  console.log(`Скорость ветра: ${current.windspeed} км/ч`);
                  console.log(`Время обновления: ${current.time}`);
                } catch (err) {
                  console.error("Ошибка обработки данных погоды:", err.message);
                }
                rl.close();
              });
            })
            .on("error", (err) => {
              console.error("Ошибка при запросе погоды:", err.message);
              rl.close();
            });
        } catch (err) {
          console.error("Ошибка обработки данных геокодинга:", err.message);
          rl.close();
        }
      });
    })
    .on("error", (err) => {
      console.error("Ошибка при запросе координат:", err.message);
      rl.close();
    });
});
