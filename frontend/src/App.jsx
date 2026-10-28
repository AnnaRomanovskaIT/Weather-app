import { useState } from "react";

import SearchBox from "./components/SearchBox";
import LocationResults from "./components/LocationResults";
import WeatherForecast from "./components/WeatherForecast";

import { searchLocations } from "./services/geolocation.service.js";
import { getForecast } from "./services/weather.service.js";

import "./App.css";

function App() {
    const [city, setCity] = useState("");
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [weather, setWeather] = useState(null);

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
        setWeather(null);

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
        setWeather(null);
        setLoading(true);
        setError(null);

        try {
            const result = await getForecast(
                location.latitude,
                location.longitude,
                location.name
            );

            setWeather(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app">
            <h1>Weather App</h1>

            <SearchBox
                city={city}
                onCityChange={(value) => {
                    setCity(value);
                    setSelectedLocation(null);
                }}
                onSearch={handleSearch}
            />

            {!selectedLocation && (
                <LocationResults
                    locations={locations}
                    onSelect={handleLocationSelect}
                />
            )}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {selectedLocation && (
                <WeatherForecast
                    location={selectedLocation}
                    weather={weather}
                />
            )}
        </div>
    );
}

export default App;
