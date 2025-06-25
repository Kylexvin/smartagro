import React from 'react';

const WeatherHero = ({ location, weather }) => {
  if (!location || !weather) return null;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{location.name}</h1>
          <p className="text-blue-100 mb-4">{location.region}, {location.country}</p>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold">{weather.temperature.celsius}°C</div>
            <div>
              <p className="text-lg">{weather.condition.text}</p>
              <p className="text-blue-200">Feels like {weather.temperature.feelsLike}°C</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <img src={`https:${weather.condition.icon}`} alt={weather.condition.text} className="w-16 h-16 mb-2" />
          <p className="text-sm text-blue-200">
            {new Date(location.localTime).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherHero;