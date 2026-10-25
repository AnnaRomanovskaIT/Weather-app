export async function searchLocations(name) {
    const response = await fetch(`/api/locations?name=${encodeURIComponent(name)}&locale=en`);

    if (!response.ok) {
        throw new Error("Failed to search locations");
    }

    return response.json();
}