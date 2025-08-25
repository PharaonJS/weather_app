import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import LoadingScreen from "./components/LoadingScreen";
import ErrorMessage from "./components/ErrorMessage";
import Creator from "./components/Creator";

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState("Таганрог");
    const [activeTab, setActiveTab] = useState("current");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        fetchAllWeatherData(city);
    }, [city]);

    const fetchAllWeatherData = async (cityName) => {
        try {
            setLoading(true);
            const API_KEY = "31a10cc5862fea555a3a366c4f6f28bc";

            const currentResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`,
            );

            if (!currentResponse.ok) {
                throw new Error("Город не найден");
            }

            const currentData = await currentResponse.json();

            try {
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`,
                );

                if (forecastResponse.ok) {
                    const forecastData = await forecastResponse.json();
                    setForecastData(forecastData);
                }
            } catch (forecastError) {
                console.warn("Ошибка загрузки прогноза:", forecastError);
                setForecastData(null);
            }

            setWeatherData(currentData);
            setError(null);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
            setForecastData(null);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchAllWeatherData(city);
    };

    const handleCityChange = (newCity) => {
        setCity(newCity);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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
        return <LoadingScreen />;
    }

    return (
        <div className={`weather-app ${getBackgroundClass()}`}>
            <div className="container">
                <SearchBox onCityChange={handleCityChange} />

                {error && <ErrorMessage message={error} />}

                {weatherData && (
                    <>
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === "current" ? "active" : ""}`}
                                onClick={() => handleTabChange("current")}
                            >
                                Сейчас
                            </button>
                            <button
                                className={`tab ${activeTab === "forecast" ? "active" : ""}`}
                                onClick={() => handleTabChange("forecast")}
                            >
                                5 дней
                            </button>
                            <button
                                className="refresh-btn"
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                            >
                                {isRefreshing ? "⏳" : "🔄"}
                            </button>
                        </div>

                        <div className="weather-content" ref={contentRef}>
                            {activeTab === "current" ? (
                                <WeatherCard
                                    weatherData={weatherData}
                                    isRefreshing={isRefreshing}
                                    forecastData={forecastData}
                                />
                            ) : (
                                <Forecast
                                    forecastData={forecastData}
                                    cityName={weatherData.name}
                                />
                            )}
                        </div>
                    </>
                )}

                <Creator />
            </div>
        </div>
    );
};

export default App;
