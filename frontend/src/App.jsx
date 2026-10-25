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

    async function handleSearch() {
        setSelectedLocation(null);
        setWeather(null);

        const results = await searchLocations(city);
        setLocations(results);
    }

    async function handleLocationSelect(location) {
        setSelectedLocation(location);

        const result = await getForecast(
            location.latitude,
            location.longitude,
            location.name
        );

        setWeather(result);
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