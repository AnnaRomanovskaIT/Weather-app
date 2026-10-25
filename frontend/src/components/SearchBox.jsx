function SearchBox({ city, onCityChange, onSearch }) {
    return (
        <div>
            <input
                value={city}
                onChange={(event) => onCityChange(event.target.value)}
                placeholder="Enter a city"
            />

            <button onClick={onSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBox;