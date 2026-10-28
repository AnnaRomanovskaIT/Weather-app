function SearchBox({ city, onCityChange, onSearch }) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSearch();
            }}
        >
            <input value={city} onChange={(event) => onCityChange(event.target.value)} placeholder="Enter a city" />

            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBox;
