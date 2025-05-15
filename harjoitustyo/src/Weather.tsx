import { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const getClothingTip = (temp: number, description: string) => {
    if (description.toLowerCase().includes("sade")) {
      return "Muista sadevaatteet ja kumisaappaat!";
    } else if (temp < 0) {
      return "Pue lämpimästi: toppahaalari ja hanskat!";
    } else if (temp >= 0 && temp < 10) {
      return "Kevyt haalari ja pipo sopivat hyvin.";
    } else if (temp >= 10 && temp < 20) {
      return "Kevyt takki ja collegehousut riittävät.";
    } else {
      return "T-paita ja shortsit riittävät – muista aurinkorasva!";
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    setShowTip(false);
    const apiKey = 'f9d6b894757f57fcfd3e38e5874acc2d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=fi`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Virhe haettaessa säätietoja:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h2 className="title">Sää ja pukeutuminen</h2>

      <div className="input-group">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Syötä kaupunki"
          className="city-input"
        />
        <button onClick={fetchWeather} className="fetch-button">Hae sää</button>
      </div>

      {loading && <p>Haetaan säätietoja...</p>}

      {weather && weather.cod === 200 && (
        <div className="weather-box">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>Lämpötila: {weather.main.temp}°C</p>

          {!showTip && (
            <button onClick={() => setShowTip(true)} className="tip-button">
              Pukeutumisvinkki
            </button>
          )}

          {showTip && (
            <p className="tip-text">
              {getClothingTip(weather.main.temp, weather.weather[0].description)}
            </p>
          )}
        </div>
      )}

      {weather && weather.cod !== 200 && !loading && (
        <p className="error-text">Kaupunkia ei löytynyt. Tarkista nimi.</p>
      )}
    </div>
  );
};

export default Weather;