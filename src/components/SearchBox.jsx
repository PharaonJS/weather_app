import React, { useState } from "react";

const SearchBox = ({ onCityChange }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            onCityChange(searchInput.trim());
            setSearchInput("");
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-box">
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Введите город..."
                className="search-input"
            />
            <button type="submit" className="search-btn">
                <span className="search-icon">🔍</span>
            </button>
        </form>
    );
};

export default SearchBox;
