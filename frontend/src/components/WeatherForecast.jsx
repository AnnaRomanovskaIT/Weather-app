function formatTime(time) {
    const date = new Date(time);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function getWeatherIcon(weatherCode) {
    if (weatherCode === 0) {
        return "☀️";
    }

    if (weatherCode === 1 || weatherCode === 2) {
        return "🌤️";
    }

    if (weatherCode === 3) {
        return "☁️";
    }

    if ([45, 48].includes(weatherCode)) {
        return "🌫️";
    }

    if ([51, 53, 55, 56, 57].includes(weatherCode)) {
        return "🌦️";
    }

    if ([61, 63, 65, 66, 67].includes(weatherCode)) {
        return "🌧️";
    }

    if ([71, 73, 75, 77].includes(weatherCode)) {
        return "🌨️";
    }

    if ([80, 81, 82].includes(weatherCode)) {
        return "🌦️";
    }

    if ([95, 96, 99].includes(weatherCode)) {
        return "⛈️";
    }

    return "🌡️";
}

function WeatherForecast({ location, weather }) {
    if (!weather) {
        return <p>Loading forecast...</p>;
    }

    const currentHour = new Date();
    currentHour.setMinutes(0, 0, 0);

    const upcomingForecast = weather.forecast.filter(
        (item) => new Date(item.time) >= currentHour
    );

    return (
        <section className="weather-forecast">
            <h2>
                {location.name}, {location.countryName}
            </h2>

            <p className="forecast-date">
                {weather.date}
            </p>

            <div className="forecast-scroll">
                <div className="forecast-list">
                    {upcomingForecast.map((item) => (
                        <div
                            key={item.time}
                            className="forecast-item"
                        >
                            <span className="forecast-time">
                                {formatTime(item.time)}
                            </span>

                            <span className="forecast-icon">
                                {getWeatherIcon(item.weatherCode)}
                            </span>

                            <span className="forecast-temperature">
                                {Math.round(item.temperature)}°
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WeatherForecast;