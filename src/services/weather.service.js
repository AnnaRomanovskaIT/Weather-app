import openMeteoClient from "../clients/openMeteo.client.js";
import { mapOpenMeteoToWeather } from "../models/weather/weather.mapper.js";
import { mapGeolocationData } from "../models/geolocation/geolocation.mapper.js";
import * as weatherRepository from "../repositories/weather.repository.js";

export async function getWeather(
    latitude,
    longitude,
    locationName = "Unknown"
) {
    const data = await openMeteoClient.getMeteoWeather(latitude, longitude);
    const weather = mapOpenMeteoToWeather(data, locationName);
    await weatherRepository.save(weather);
    return weather;
}

export async function getGeolocation(name, locale = "en") {
    const data = await openMeteoClient.getGeolocation(name, locale);
    return mapGeolocationData(data);
}

export async function getLatestWeatherByLocationName(locationName) {
    return weatherRepository.findLatestByLocationName(locationName);
}

export async function getWeatherById(weatherId) {
    return weatherRepository.findById(weatherId);
}

export default {
    getWeather,
    getGeolocation,
    getLatestWeatherByLocationName,
    getWeatherById,
};
