export async function getForecast(latitude, longitude, cityName) {
    const response = await fetch(`/api/weather?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&name=${encodeURIComponent(cityName)}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}