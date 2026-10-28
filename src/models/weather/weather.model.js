export class Weather {
    constructor({ id, date, location, forecast, createdAt }) {
        this.id = id;
        this.date = date;
        this.location = location;
        this.forecast = forecast;
        this.createdAt = createdAt;
    }
}

export class Location {
    constructor({ name, latitude, longitude }) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class ForecastHourly {
    constructor({
        time,
        temperature,
        apparentTemperature,
        weatherCode,
        humidity,
        precipitationProbability,
        windSpeed,
        isDay,
    }) {
        this.time = time;
        this.temperature = temperature;
        this.apparentTemperature = apparentTemperature;
        this.weatherCode = weatherCode;
        this.humidity = humidity;
        this.precipitationProbability = precipitationProbability;
        this.windSpeed = windSpeed;
        this.isDay = isDay;
    }
}

export class ForecastDaily {
    constructor({
        time,
        temperatureMax,
        temperatureMin,
        weatherCode,
        precipitationProbability,
        windSpeed,
    }) {
        this.time = time;
        this.temperatureMax = temperatureMax;
        this.temperatureMin = temperatureMin;
        this.weatherCode = weatherCode;
        this.precipitationProbability = precipitationProbability;
        this.windSpeed = windSpeed;
    }
}
