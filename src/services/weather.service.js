import openMeteoClient from "../clients/openMeteo.client.js";
import { mapOpenMeteoHourlyToWeather, mapOpenMeteoDailyToWeather } from "../models/weather/weather.mapper.js";
import { mapGeolocationData } from "../models/geolocation/geolocation.mapper.js";
import * as hourlyRepository from "../repositories/weather.hourly.repository.js";
import * as dailyRepository from "../repositories/weather.daily.repository.js";

function isFresh(latestWeather) {
    const cacheDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
    return (
        latestWeather &&
        latestWeather.createdAt &&
        new Date() - new Date(latestWeather.createdAt) < cacheDuration
    );
}

export async function getHourlyWeather(latitude, longitude, locationName = "Unknown", date = null) {
    try{
        date = date || new Date().toISOString().split("T")[0];
        const latestWeather = await hourlyRepository.findLatestByLocationAndDate(latitude, longitude, date);
        if (isFresh(latestWeather)) {
            return latestWeather;
        }
    }catch(error){
        console.error("Error fetching latest hourly weather from repository:", error);
    }

    const data = await openMeteoClient.getMeteoHourlyWeather(latitude, longitude, date);
    const weather = mapOpenMeteoHourlyToWeather(data, locationName);
    await hourlyRepository.saveHourly(weather);
    return weather;
}

export async function getDailyWeather(latitude, longitude, locationName = "Unknown") {
    try{
        const latestWeather = await dailyRepository.findLatestByLocation(latitude, longitude);
        if (isFresh(latestWeather)) {
            return latestWeather;
        }
    }catch(error){
        console.error("Error fetching latest daily weather from repository:", error);
    }

    const data = await openMeteoClient.getMeteoDailyWeather(latitude, longitude);
    const weather = mapOpenMeteoDailyToWeather(data, locationName);
    await dailyRepository.saveDaily(weather);
    return weather;
}

export async function getGeolocation(name, locale = "en") {
    const data = await openMeteoClient.getGeolocation(name, locale);
    return mapGeolocationData(data);
}

export default {
    getHourlyWeather,
    getDailyWeather,
    getGeolocation
};
