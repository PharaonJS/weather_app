import React from "react";

const WeatherCard = ({ weatherData }) => {
    // форматируем время
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // возвращаем dom элементы
    return (
        // город и дата
        <div className="weather-card">
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

            {/* краткое инфо о самой погоде */}
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

            {/* подробное инфо */}
            <div className="weather-details">
                {/* ветер */}
                <div className="detail-item">
                    <div className="detail-icon">💨</div>
                    <div className="detail-info">
                        <p>Ветер</p>
                        <h4>{weatherData.wind.speed} м/с</h4>
                    </div>
                </div>

                {/* влажность*/}
                <div className="detail-item">
                    <div className="detail-icon">💧</div>
                    <div className="detail-info">
                        <p>Влажность</p>
                        <h4>{weatherData.main.humidity}%</h4>
                    </div>
                </div>

                {/* давление */}
                <div className="detail-item">
                    <div className="detail-icon">🌡️</div>
                    <div className="detail-info">
                        <p>Давление</p>
                        <h4>{weatherData.main.pressure} hPa</h4>
                    </div>
                </div>
                {/* мин темпа */}

                <div className="detail-item">
                    <div className="detail-icon">❄️</div>
                    <div className="detail-info">
                        <p>Мин. температура</p>
                        <h4>{Math.round(weatherData.main.temp_min)}°C</h4>
                    </div>
                </div>
            </div>

            {/* восход-закат */}
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
