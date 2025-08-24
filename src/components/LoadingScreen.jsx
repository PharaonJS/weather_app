import React from "react";

const LoadingScreen = () => {
    return (
        <div className="weather-app loading-bg">
            <div className="loader">
                <div className="weather-icon">
                    <div className="sun"></div>
                </div>
                <p>Загрузка данных о погоде...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
