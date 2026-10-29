function AirConditions({ weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <section className="air-conditions">
            <h2>Air Conditions</h2>

            <div className="conditions-grid">
                <div className="condition">
                    <span className="condition-label">Feels like</span>
                    <span className="condition-value">
                        {Math.round(weather.apparentTemperature)}°
                    </span>
                </div>

                <div className="condition">
                    <span className="condition-label">Wind</span>
                    <span className="condition-value">
                        {Math.round(weather.windSpeed)} km/h
                    </span>
                </div>

                <div className="condition">
                    <span className="condition-label">Humidity</span>
                    <span className="condition-value">
                        {weather.humidity}%
                    </span>
                </div>

                <div className="condition">
                    <span className="condition-label">
                        Chance of rain
                    </span>
                    <span className="condition-value">
                        {weather.precipitationProbability}%
                    </span>
                </div>
            </div>
        </section>
    );
}

export default AirConditions;