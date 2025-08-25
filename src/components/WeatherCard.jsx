import React from "react";

const WeatherCard = ({ weatherData, isRefreshing, forecastData }) => {
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className={`weather-card ${isRefreshing ? "refreshing" : ""}`}>
            <div className="city-name">
                <h1>{weatherData.name}</h1>
                <p className="current-date">
                    {new Date().toLocaleDateString("ru-RU", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            <div className="current-weather">
                <div className="temperature">
                    <h2>{Math.round(weatherData.main.temp)}°C</h2>
                    <p>
                        Ощущается как {Math.round(weatherData.main.feels_like)}
                        °C
                    </p>
                </div>
                <div className="weather-icon">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                        className="weather-img"
                    />
                    <p className="weather-description">
                        {weatherData.weather[0].description}
                    </p>
                </div>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <div className="detail-icon">💨</div>
                    <div className="detail-info">
                        <p>Ветер</p>
                        <h4>{weatherData.wind.speed} м/с</h4>
                    </div>
                </div>

                <div className="detail-item">
                    <div className="detail-icon">💧</div>
                    <div className="detail-info">
                        <p>Влажность</p>
                        <h4>{weatherData.main.humidity}%</h4>
                    </div>
                </div>

                <div className="detail-item">
                    <div className="detail-icon">🌡️</div>
                    <div className="detail-info">
                        <p>Давление</p>
                        <h4>
                            {Math.round(weatherData.main.pressure * 0.750064)}{" "}
                            мм
                        </h4>
                    </div>
                </div>

                <div className="detail-item">
                    <div className="detail-icon">❄️</div>
                    <div className="detail-info">
                        <p>Мин. температура</p>
                        <h4>
                            {Math.round(forecastData.list[0].main.temp_min)}°C
                        </h4>
                    </div>
                </div>
            </div>

            <div className="sun-times">
                <div className="sun-time">
                    <div className="sun-icon">🌅</div>
                    <p>Восход: {formatTime(weatherData.sys.sunrise)}</p>
                </div>
                <div className="sun-time">
                    <div className="sun-icon">🌇</div>
                    <p>Закат: {formatTime(weatherData.sys.sunset)}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
