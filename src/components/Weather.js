import React, { useState } from "react";
import "../styles/Weather.css";
import WeatherInfo from "../components/WeatherInfo";

function Weather() {
  const API_KEY = "753ac4f8f1658bb87e5013e530692bd6";
  const [searchQuery, setSearchQuery] = useState();
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    desc: null,
    city: null
  });
  const [isValidCity, setIsValidCity] = useState(true);

  const updateSearchQuery = event => {
    let city = event.target.value;
    let isValid = validCity(city);
    setSearchQuery(city);

    if (isValid || city === "") {
      setIsValidCity(true);
    } else {
      setIsValidCity(false);
    }
  };

  const validCity = city => {
    let regex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    return regex.test(city);
  };

  const getWeatherData = async () => {
    if (!validCity || searchQuery === "") {
      setIsValidCity(false);
      return;
    }
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&lang=sp&appid=${API_KEY}`
    )
      .then(response => response.json())
      .then(data =>
        setWeatherData({
          temp: KelvinToCelsius(data.main.temp),
          humidity: data.main.humidity,
          desc: data.weather[0].main,
          city: data.name,
          icon: data.weather[0].icon
        })
      );
  };
  const KelvinToCelsius = temp => {
    return (temp - 273.15).toFixed(0);
  };

  return (
    <section className="weather-container">
      <header className="weather-header">
        <h3>
          {" "}
          Weatherify
          <span aria-label="emoji-rain" role="img">
            🌎
          </span>
        </h3>
        <div>
          <input
            placeholder="Enter your city"
            className="search-input"
            onChange={updateSearchQuery}
            maxLength="60"
          />
          <button className="material-icons" onClick={getWeatherData}>
            search
          </button>
        </div>
      </header>
      <p className="error">{isValidCity ? "" : "Invalid City"}</p>
      <section className="weather-info">
        {weatherData.temp === null ? (
          <p>
            No weather to display <i className="material-icons">wb_sunny</i>
          </p>
        ) : (
          <WeatherInfo data={weatherData} />
        )}
      </section>
    </section>
  );
}

export default Weather;
