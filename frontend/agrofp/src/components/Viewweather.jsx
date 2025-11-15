import React, { useState } from 'react';
import axios from 'axios';
import Farmerheader from './Farmerheader';
import '../assets/Viewweather.css';

const Viewweather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState('');

  //const API_KEY = '782ea76044733a5f89ce5e486fd8c524';
   //const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getCrops = (temp, humidity) => {
    if (temp >= 25 && temp <= 35 && humidity >= 50) return ['🌾 Rice', '🌽 Maize', '🌻 Sunflower'];
    if (temp >= 20 && temp <= 30 && humidity < 50) return ['🍅 Tomato', '🥔 Potato', '🥒 Cucumber'];
    if (temp < 20) return ['🥬 Spinach', '🥕 Carrot', '🌿 Fenugreek'];
    if (temp > 35) return ['🍬 Sugarcane', '🌶️ Chili', '🍆 Eggplant'];
    return ['🚫 No suitable crops found'];
  };

  const handleSearch = async () => {
    try {
      setError('');
      setWeather(null);
      setCrops([]);

      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const geoRes = await axios.get(geoUrl);
      if (geoRes.data.length === 0) {
        setError('City not found');
        return;
      }

      const { lat, lon } = geoRes.data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const weatherRes = await axios.get(weatherUrl);

      const {
        temp,
        humidity,
        feels_like,
        pressure,
        sea_level,
        grnd_level
      } = weatherRes.data.main;

      const description = weatherRes.data.weather[0].description;

      setWeather({
        temp,
        humidity,
        feels_like,
        pressure,
        sea_level,
        grnd_level,
        description
      });

      setCrops(getCrops(temp, humidity));
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <>
      <Farmerheader />
      <div className="weather-container">
        <h2>🌦️ Weather & Crop Suggestion</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {weather && (
          <div className="weather-details">
            <h3>🌍 Weather in {city}</h3>
            <p><strong>Temperature:</strong> {weather.temp} °C</p>
            <p><strong>Feels Like:</strong> {weather.feels_like} °C</p>
            <p><strong>Humidity:</strong> {weather.humidity} %</p>
            <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
            {weather.sea_level && <p><strong>Sea Level:</strong> {weather.sea_level} hPa</p>}
            {weather.grnd_level && <p><strong>Ground Level:</strong> {weather.grnd_level} hPa</p>}
            <p><strong>Description:</strong> {weather.description}</p>

            <h4>🌱 Suitable Crops:</h4>
            <ul>
              {crops.map((crop, idx) => (
                <li key={idx}>{crop}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Viewweather;
