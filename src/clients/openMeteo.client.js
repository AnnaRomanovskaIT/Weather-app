import { ExternalApiError } from "../errors/external-api.error.js";
import { config } from "../config/config.js";

function getUrl(latitude, longitude) {
    return `${config.openMeteo.weatherUrl}?` + `latitude=${latitude}` + `&longitude=${longitude}` + "&timezone=auto";
}

async function getMeteoHourlyWeather(latitude, longitude, date = null) {
    let url = getUrl(latitude, longitude);

    url +=
        "&hourly=" +
        "temperature_2m," +
        "apparent_temperature," +
        "weather_code," +
        "relative_humidity_2m," +
        "precipitation_probability," +
        "wind_speed_10m," +
        "is_day";

    if (date) {
        url += `&start_date=${date}&end_date=${date}`;
    } else {
        url += "&forecast_days=1";
    }

    const response = await fetch(url);

    if (!response.ok) {
        const details = await response.json();

        throw new ExternalApiError(
            `Open-Meteo request failed: ${details.reason}`,
            response.status,
            details
        );
    }

    return response.json();
}

async function getMeteoDailyWeather(latitude, longitude) {
    let url = getUrl(latitude, longitude);
    url +=
        "&daily=" +
        "weather_code," +
        "temperature_2m_max," +
        "temperature_2m_min," +
        "precipitation_probability_max," +
        "wind_speed_10m_max" +
        "&forecast_days=7";

    const response = await fetch(url);

if (!response.ok) {
    const details = await response.json();

    console.error("Open-Meteo error:", details);

    throw new ExternalApiError(
        "Open-Meteo request failed",
        response.status,
        details
    );
    }

    return response.json();
}

async function getGeolocation(cityName, locale = "en") {
    const response = await fetch(
        `${config.openMeteo.geocodingUrl}?` +
            `name=${encodeURIComponent(cityName)}` +
            "&count=10" +
            `&language=${locale}` +
            "&format=json"
    );

    if (!response.ok) {
        throw new ExternalApiError("Open-Meteo request failed", response.status);
    }

    return response.json();
}

export default {
    getMeteoHourlyWeather,
    getMeteoDailyWeather,
    getGeolocation,
};
