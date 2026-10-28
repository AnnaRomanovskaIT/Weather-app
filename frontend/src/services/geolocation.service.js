export async function searchLocations(name) {
    const response = await fetch(
        `/api/locations?name=${encodeURIComponent(name)}&locale=en`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}
