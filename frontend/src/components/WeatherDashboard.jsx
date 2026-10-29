import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import AirConditions from "./AirConditions";

function WeatherDashboard({
    location,
    currentWeather,
    hourlyWeather,
    dailyWeather,
}) {
    return (
        <main className="weather-dashboard">
            <div className="dashboard-main">
                <CurrentWeather
                    location={location}
                    weather={currentWeather}
                />

                <HourlyForecast weather={hourlyWeather} />

                <AirConditions weather={currentWeather} />
            </div>

            <DailyForecast weather={dailyWeather} />
        </main>
    );
}

export default WeatherDashboard;