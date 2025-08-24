// импорты
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import LoadingScreen from "./components/LoadingScreen";
import ErrorMessage from "./components/ErrorMessage";
import Creator from "./components/Creator";

// основной код
const App = () => {
    // статы
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState("Таганрог");

    // проверка на рефактор города
    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    // парсинг даты с апи
    const fetchWeatherData = async (cityName) => {
        try {
            setLoading(true);
            const API_KEY = "31a10cc5862fea555a3a366c4f6f28bc";
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`,
            );

            if (!response.ok) {
                // если нет ответа от сервака
                throw new Error("Город не найден");
            }

            // рефакторим дату и очищаем ошибку
            const data = await response.json();
            setWeatherData(data);
            setError(null);
        } catch (err) {
            // очищаем дату и рефакторим ошибку в случае неудачи
            setError(err.message);
            setWeatherData(null);
        } finally {
            // скажем Нет загрузке!!!
            setLoading(false);
        }
    };

    const handleCityChange = (newCity) => {
        setCity(newCity);
    };

    // определяем фон в зависимости от погоды
    const getBackgroundClass = () => {
        if (!weatherData) return "default-bg";

        const mainWeather = weatherData.weather[0].main.toLowerCase();
        if (mainWeather.includes("cloud")) return "cloudy-bg";
        if (mainWeather.includes("rain")) return "rainy-bg";
        if (mainWeather.includes("clear")) return "sunny-bg";
        if (mainWeather.includes("snow")) return "snowy-bg";
        return "default-bg";
    };

    if (loading) {
        // возвращаем dom загрузки
        return <LoadingScreen />;
    }

    // возвращаем dom элементы
    return (
        <div className={`weather-app ${getBackgroundClass()}`}>
            <div className="container">
                <SearchBox onCityChange={handleCityChange} />

                {error && <ErrorMessage message={error} />}

                {weatherData && <WeatherCard weatherData={weatherData} />}

                <Creator />
            </div>
        </div>
    );
};

export default App;
