import { getWeatherIcon } from "../utils/weather.utils";

function formatDay(date) {
    return new Date(date).toLocaleDateString([], {
        weekday: "short",
    });
}

function DailyForecast({ weather, selectedDate, onDaySelect }) {
    if (!weather) {
        return <p>Loading forecast...</p>;
    }

    return (
        <section className="daily-forecast">
            <h2>7-Day Forecast</h2>

            <div className="daily-list">
                {weather.forecast.map((item) => (
                    <button
                        key={item.time}
                        type="button"
                        className={`daily-item ${
                            selectedDate === item.time ? "selected" : ""
                        }`}
                        onClick={() => onDaySelect(item.time)}
                    >
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
                    </button>
                ))}
            </div>
        </section>
    );
}

export default DailyForecast;