import { useState } from "react";

import SearchBox from "./components/SearchBox";
import LocationResults from "./components/LocationResults";
import WeatherDashboard from "./components/WeatherDashboard";

import { searchLocations } from "./services/geolocation.service.js";
import useWeather from "./hooks/UseWeather";

import "./App.css";

function App() {
    const [city, setCity] = useState("");
    const [locations, setLocations] = useState([]);

    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const weather = useWeather();

    async function handleSearch() {
        if (!city.trim()) {
            setSearchError("City name cannot be empty");
            return;
        }

        setSearchLoading(true);
        setSearchError(null);
        setLocations([]);

        try {
            const results = await searchLocations(city);
            setLocations(results);
        } catch (err) {
            setSearchError(err.message);
        } finally {
            setSearchLoading(false);
        }
    }

    function handleCityChange(value) {
        setCity(value);
        setLocations([]);
        setSearchError(null);
        weather.resetWeather();
    }

    return (
        <div className="app">
            <header>
                <SearchBox
                    city={city}
                    onCityChange={handleCityChange}
                    onSearch={handleSearch}
                />
            </header>

            {!weather.selectedLocation && (
                <LocationResults
                    locations={locations}
                    onSelect={weather.selectLocation}
                />
            )}

            {(searchLoading || weather.loading) && <p>Loading...</p>}

            {(searchError || weather.error) && (
                <p>{searchError || weather.error}</p>
            )}

            {weather.selectedLocation &&
                weather.hourlyWeather &&
                weather.dailyWeather && (
                    <WeatherDashboard
                        location={weather.selectedLocation}
                        currentWeather={weather.selectedHour}
                        hourlyWeather={weather.hourlyWeather}
                        dailyWeather={weather.dailyWeather}
                        selectedHour={weather.selectedHour}
                        onHourSelect={weather.setSelectedHour}
                        selectedDate={weather.selectedDate}
                        onDaySelect={weather.selectDay}
                    />
                )}
        </div>
    );
}

export default App;