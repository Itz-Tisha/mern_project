import React, { useState } from 'react';
import axios from 'axios';
import Farmerheader from './Farmerheader';
import '../assets/Viewweather.css';
const Viewweather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = '782ea76044733a5f89ce5e486fd8c524'; // Use your actual API key here

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

      // Step 1: Get coordinates from city name
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const geoRes = await axios.get(geoUrl);
      if (geoRes.data.length === 0) {
        setError('City not found');
        return;
      }

      const { lat, lon } = geoRes.data[0];

      // Step 2: Get weather using lat/lon
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const weatherRes = await axios.get(weatherUrl);
      const { temp, humidity } = weatherRes.data.main;

      setWeather({
        temp,
        humidity,
        description: weatherRes.data.weather[0].description,
      });

      setCrops(getCrops(temp, humidity));
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <>
    <Farmerheader/>
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🌦️ Weather & Crop Suggestion</h2>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '0.5rem', width: '80%', marginRight: '0.5rem' }}
      />
      <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '1rem' }}>
          <h3>🌍 Weather in {city}</h3>
          <p><strong>Temperature:</strong> {weather.temp} °C</p>
          <p><strong>Humidity:</strong> {weather.humidity} %</p>
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
