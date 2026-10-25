export async function getForecast(latitude, longitude, cityName) {
    const response = await fetch(`/api/weather?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&name=${encodeURIComponent(cityName)}`);

    if (!response.ok) {
        throw new Error("Failed to search locations");
    }

    return response.json();
}