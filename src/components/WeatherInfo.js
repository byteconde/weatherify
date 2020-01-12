import React from "react";
import "../styles/Weather.css";

function WeatherInfo(props) {
  const { temp, humidity, desc, city, icon } = props.data;
  return (
    <React.Fragment>
      <div className="description-icon">
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="weather-icon"
          className="img-icon"
        ></img>
        <h3>{desc}</h3>
      </div>
      <section className="weather-data-flex">
        <div className="header-description">
          <h4>City</h4>
          <p>{city}</p>
        </div>
        <div className="header-description">
          <h4>Temperature</h4>
          <p>
            {temp} <span className="degree-symbol"></span> C
          </p>
        </div>
        <div className="header-description">
          <h4>Humidity</h4>
          <p>{humidity}%</p>
        </div>
      </section>
    </React.Fragment>
  );
}

export default WeatherInfo;
