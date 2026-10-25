import "dotenv/config";

export const config = {
    port: process.env.PORT || 3000,

    mongodbUri: process.env.MONGODB_URI,

    openMeteo: {
        weatherUrl:
            process.env.OPEN_METEO_WEATHER_URL ??
            "https://api.open-meteo.com/v1/forecast",

        geocodingUrl:
            process.env.OPEN_METEO_GEOCODING_URL ??
            "https://geocoding-api.open-meteo.com/v1/search",
    },
};
