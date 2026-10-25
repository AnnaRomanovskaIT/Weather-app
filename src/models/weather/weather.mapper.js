import { Forecast, Location, Weather } from "./weather.model.js";

export function mapOpenMeteoToWeather(data, locationName) {
    const forecast = data.hourly.time.map(
        (time, index) =>
            new Forecast({
                time,
                temperature: data.hourly.temperature_2m[index],
                weatherCode: data.hourly.weather_code[index],
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
