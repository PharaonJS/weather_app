import React from "react";

const Forecast = ({ forecastData, cityName }) => {
    if (!forecastData || !forecastData.list) {
        return <div className="error-message">Нет данных прогноза</div>;
    }

    const groupForecastByDay = () => {
        const grouped = {};

        forecastData.list.forEach((item) => {
            if (!item || !item.dt || !item.main || !item.weather) return;

            const date = new Date(item.dt * 1000).toLocaleDateString("ru-RU");
            if (!grouped[date]) {
                grouped[date] = {
                    items: [],
                    minTemp: item.main.temp_min || 0,
                    maxTemp: item.main.temp_max || 0,
                    weather: item.weather[0] || {},
                };
            }

            grouped[date].items.push(item);
            if (item.main.temp_min !== undefined) {
                grouped[date].minTemp = Math.min(
                    grouped[date].minTemp,
                    item.main.temp_min,
                );
            }
            if (item.main.temp_max !== undefined) {
                grouped[date].maxTemp = Math.max(
                    grouped[date].maxTemp,
                    item.main.temp_max,
                );
            }

            const itemHour = new Date(item.dt * 1000).getHours();
            if (itemHour >= 11 && itemHour <= 13 && item.weather[0]) {
                grouped[date].weather = item.weather[0];
            }
        });

        return grouped;
    };

    const dailyForecast = groupForecastByDay();
    const forecastDays = Object.entries(dailyForecast).slice(0, 5);

    return (
        <div className="forecast">
            <h2 className="forecast-title">Прогноз на 5 дней - {cityName}</h2>
            <div className="forecast-grid">
                {forecastDays.map(([date, dayData], index) => (
                    <div
                        key={date}
                        className="forecast-day"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <h3 className="forecast-date">
                            {new Date(
                                dayData.items[0]?.dt * 1000,
                            ).toLocaleDateString("ru-RU", {
                                weekday: "short",
                                day: "numeric",
                            })}
                        </h3>
                        {dayData.weather && dayData.weather.icon && (
                            <>
                                <img
                                    src={`https://openweathermap.org/img/wn/${dayData.weather.icon}.png`}
                                    alt={
                                        dayData.weather.description || "Погода"
                                    }
                                    className="forecast-icon"
                                />
                                <div className="forecast-temps">
                                    <span className="max-temp">
                                        ↑{Math.round(dayData.maxTemp)}°
                                    </span>
                                    <span className="min-temp">
                                        ↓{Math.round(dayData.minTemp)}°
                                    </span>
                                </div>
                                {dayData.weather.description && (
                                    <p className="forecast-desc">
                                        {dayData.weather.description}
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
