import { getWeatherIcon, formatDay } from "../utils/weather.utils";

function DailyForecast({ weather }) {
    if (!weather) {
        return <p>Loading forecast...</p>;
    }

    return (
        <section className="daily-forecast">
            <h2>7-Day Forecast</h2>

            <div className="daily-list">
                {weather.forecast.map((item) => (
                    <div key={item.time} className="daily-item">
                        <span className="daily-day">
                            {formatDay(item.time)}
                        </span>

                        <span className="daily-icon">
                            {getWeatherIcon(item.weatherCode)}
                        </span>

                        <span className="daily-temperature">
                            {Math.round(item.temperatureMin)}° /{" "}
                            {Math.round(item.temperatureMax)}°
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default DailyForecast;