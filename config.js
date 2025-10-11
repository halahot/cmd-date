import dotenv from "dotenv";
dotenv.config();

export const config = {
  WEATHER_API_URL:
    process.env.WEATHER_API_URL || "https://api.open-meteo.com/v1/forecast",
  GEOCODING_API_URL:
    process.env.GEOCODING_API_URL ||
    "https://geocoding-api.open-meteo.com/v1/search",
};
