import { useEffect, useRef } from "react";
import { getWeatherIcon } from "../utils/weather.utils";

function formatTime(time) {
    const date = new Date(time);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function HourlyForecast({
    weather,
    selectedHour,
    onHourSelect,
}) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!weather || !selectedHour || !scrollRef.current) {
            return;
        }

        const element = document.getElementById(
            `hour-${selectedHour.time}`
        );

        if (!element) {
            return;
        }

        scrollRef.current.scrollLeft = element.offsetLeft;
    }, [weather, selectedHour]);

    function scroll(direction) {
        if (!scrollRef.current) {
            return;
        }

        scrollRef.current.scrollBy({
            left: direction * 300,
            behavior: "smooth",
        });
    }

    if (!weather) {
        return <p>Loading forecast...</p>;
    }

    return (
        <section className="hourly-forecast">
            <h2>Today's Forecast</h2>

            <div className="forecast-container">
                <button
                    type="button"
                    className="forecast-arrow forecast-arrow-left"
                    onClick={() => scroll(-1)}
                    aria-label="Show earlier hours"
                >
                    ←
                </button>

                <div
                    ref={scrollRef}
                    className="forecast-scroll"
                >
                    <div className="forecast-list">
                        {weather.forecast.map((item) => (
                        <button
                            key={item.time}
                            id={`hour-${item.time}`}
                            type="button"
                            className={`forecast-item ${
                                selectedHour?.time === item.time ? "selected" : ""
                            }`}
                            onClick={() => onHourSelect(item)}
                        >
                            <span className="forecast-time">
                                {formatTime(item.time)}
                            </span>

                            <span className="forecast-icon">
                                {getWeatherIcon(
                                    item.weatherCode,
                                    item.isDay
                                )}
                            </span>

                            <span className="forecast-temperature">
                                {Math.round(item.temperature)}°
                            </span>
                        </button>
                    ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="forecast-arrow forecast-arrow-right"
                    onClick={() => scroll(1)}
                    aria-label="Show later hours"
                >
                    →
                </button>
            </div>
        </section>
    );
}

export default HourlyForecast;