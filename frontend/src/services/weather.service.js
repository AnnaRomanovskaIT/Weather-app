export async function getHourlyForecast(latitude, longitude, cityName, date=null) {
    const response = await fetch(
        `/api/weather/hourly?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&name=${encodeURIComponent(cityName)}${date ? `&date=${encodeURIComponent(date)}` : ''}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}

export async function getDailyForecast(latitude, longitude, cityName) {
    const response = await fetch(
        `/api/weather/daily?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&name=${encodeURIComponent(cityName)}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}
