import { ForecastHourly, ForecastDaily, Location, Weather } from "./weather.model.js";

export function mapOpenMeteoHourlyToWeather(data, locationName) {
    const forecast = data.hourly.time.map(
        (time, index) =>
            new ForecastHourly({
                time,
                temperature: data.hourly.temperature_2m[index],
                apparentTemperature: data.hourly.apparent_temperature[index],
                weatherCode: data.hourly.weather_code[index],
                humidity: data.hourly.relative_humidity_2m[index],
                precipitationProbability:
                    data.hourly.precipitation_probability[index],
                windSpeed: data.hourly.wind_speed_10m[index],
                isDay: data.hourly.is_day[index],
            })
    );

    return new Weather({
        id: crypto.randomUUID(),
        date: data.hourly.time[0].split("T")[0],
        location: new Location({
            name: locationName,
            latitude: data.latitude,
            longitude: data.longitude,
        }),
        forecast,
        createdAt: new Date(),
    });
}

export function mapOpenMeteoDailyToWeather(data, locationName) {
    const forecast = data.daily.time.map(
        (date, index) =>
            new ForecastDaily({
                time: date,
                temperatureMax: data.daily.temperature_2m_max[index],
                temperatureMin: data.daily.temperature_2m_min[index],
                weatherCode: data.daily.weather_code[index],
                precipitationProbability:
                    data.daily.precipitation_probability_max[index],
                windSpeed: data.daily.wind_speed_10m_max[index],
            })
    );

    return new Weather({
        id: crypto.randomUUID(),
        date: data.daily.time[0],
        location: new Location({
            name: locationName,
            latitude: data.latitude,
            longitude: data.longitude,
        }),
        forecast,
        createdAt: new Date(),
    });
}

export function mapMongoDocumentToWeather(document) {
    if (!document) {
        return null;
    }

    const { _id, ...weather } = document;

    return {
        ...weather,
        id: _id.toString(),
    };
}
