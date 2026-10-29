import { getWeatherIcon } from "../utils/weather.utils";

function CurrentWeather({ location, weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <section className="current-weather">
            <h2>{location.name}</h2>

            <span>
                {Math.round(weather.temperature)}°
            </span>

            <span>
                {getWeatherIcon(weather.weatherCode, weather.isDay)}
            </span>

            <p>
                Feels like{" "}
                {Math.round(weather.apparentTemperature)}°
            </p>
        </section>
    );
}

export default CurrentWeather;