import { getWeatherIcon } from "../utils/weather.utils";

function formatTime(time) {
    const date = new Date(time);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function WeatherForecast({ location, weather }) {
    if (!weather) {
        return <p>Loading forecast...</p>;
    }

    return (
        <section className="weather-forecast">
            <h2>
                {location.name}, {location.countryName}
            </h2>

            <p className="forecast-date">{weather.date}</p>

            <div className="forecast-scroll">
                <div className="forecast-list">
                    {weather.forecast.map((item) => (
                        <div key={item.time} className="forecast-item">
                            <div className="forecast-main">
                                <span className="forecast-time">
                                    {formatTime(item.time)}
                                </span>

                                <span className="forecast-icon">
                                    {getWeatherIcon(
                                        item.weatherCode,
                                        item.isDay
                                    )}
                                </span>

                                <span className="forecast-temperature">
                                    {Math.round(item.temperature)}°
                                </span>
                            </div>

                            <div className="forecast-details">
                                <span>
                                    Feels like{" "}
                                    {Math.round(item.apparentTemperature)}°
                                </span>

                                <span>💧 {item.humidity}%</span>

                                <span>
                                    🌧️ {item.precipitationProbability}%
                                </span>

                                <span>
                                    💨 {Math.round(item.windSpeed)} km/h
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WeatherForecast;