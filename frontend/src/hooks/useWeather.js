import { useState } from "react";

import {
    getHourlyForecast,
    getDailyForecast,
} from "../services/weather.service.js";

function useWeather() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);

    const [selectedHour, setSelectedHour] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function selectLocation(location) {
        setSelectedLocation(location);
        setLoading(true);
        setError(null);

        setHourlyWeather(null);
        setDailyWeather(null);
        setSelectedHour(null);
        setSelectedDate(daily.forecast[0]?.time);

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

            const now = new Date();

            const currentHour = hourly.forecast.find((item) => {
                const itemDate = new Date(item.time);

                return (
                    itemDate.getFullYear() === now.getFullYear() &&
                    itemDate.getMonth() === now.getMonth() &&
                    itemDate.getDate() === now.getDate() &&
                    itemDate.getHours() === now.getHours()
                );
            });

            setSelectedHour(currentHour ?? hourly.forecast[0]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function selectDay(date) {
        setSelectedDate(date);
        setLoading(true);
        setError(null);

        try {
            const hourly = await getHourlyForecast(
                selectedLocation.latitude,
                selectedLocation.longitude,
                selectedLocation.name,
                date
            );

            setHourlyWeather(hourly);
            setSelectedHour(hourly.forecast[0]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
        
        function resetWeather() {
    setSelectedLocation(null);
    setHourlyWeather(null);
    setDailyWeather(null);
    setSelectedHour(null);
    setError(null);
}

return {
    selectedLocation,
    hourlyWeather,
    dailyWeather,
    selectedHour,
    selectedDate,
    loading,
    error,
    selectLocation,
    selectDay,
    setSelectedHour,
    resetWeather,
};
}

export default useWeather;