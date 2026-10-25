function LocationResults({ locations, onSelect }) {
    return (
        <div className="location-results">
            {locations.map((location) => (
                <button
                    key={location.id}
                    className="location-result"
                    onClick={() => onSelect(location)}
                >
                    <strong>{location.name}</strong>
                    <span>{location.countryName}</span>
                </button>
            ))}
        </div>
    );
}

export default LocationResults;