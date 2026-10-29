import { useState } from "react";

import SearchBox from "./components/SearchBox";
import LocationResults from "./components/LocationResults";
import WeatherDashboard from "./components/WeatherDashboard";

import { searchLocations } from "./services/geolocation.service.js";
import {
    getHourlyForecast,
    getDailyForecast,
} from "./services/weather.service.js";

import "./App.css";

function App() {
    const [city, setCity] = useState("");
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSearch() {
        if (!city.trim()) {
            setError("City name cannot be empty");
            return;
        }

        setLoading(true);
        setError(null);
        setLocations([]);
        setSelectedLocation(null);
        setHourlyWeather(null);
        setDailyWeather(null);

        try {
            const results = await searchLocations(city);
            setLocations(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleLocationSelect(location) {
        setCity(location.name);
        setSelectedLocation(location);
        setLoading(true);
        setError(null);
        setHourlyWeather(null);
        setDailyWeather(null);

        try {
            const [hourly, daily] = await Promise.all([
                getHourlyForecast(
                    location.latitude,
                    location.longitude,
                    location.name
                ),
                getDailyForecast(
                    location.latitude,
                    location.longitude,
                    location.name
                ),
            ]);

            setHourlyWeather(hourly);
            setDailyWeather(daily);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app">
            <header>
                <SearchBox
                    city={city}
                    onCityChange={(value) => {
                        setCity(value);
                        setSelectedLocation(null);
                    }}
                    onSearch={handleSearch}
                />
            </header>

            {!selectedLocation && (
                <LocationResults
                    locations={locations}
                    onSelect={handleLocationSelect}
                />
            )}

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {selectedLocation && hourlyWeather && dailyWeather && (
                <WeatherDashboard
                    location={selectedLocation}
                    currentWeather={hourlyWeather.forecast[0]}
                    hourlyWeather={hourlyWeather}
                    dailyWeather={dailyWeather}
                />
            )}
        </div>
    );
}

export default App;