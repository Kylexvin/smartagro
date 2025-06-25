import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Cloud, Activity } from 'lucide-react';

const MetricsGrid = ({ weather }) => {
  if (!weather) return null;

  const metrics = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: "Temperature",
      value: `${weather.temperature.celsius}°C`,
      subValue: `${weather.temperature.fahrenheit}°F`,
      color: "text-red-500"
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "Humidity",
      value: `${weather.humidity}%`,
      subValue: weather.precipitation.mm > 0 ? `${weather.precipitation.mm}mm rain` : "No precipitation",
      color: "text-blue-500"
    },
    {
      icon: <Wind className="w-6 h-6" />,
      label: "Wind",
      value: `${weather.wind.speed_kph} km/h`,
      subValue: `${weather.wind.direction} ${weather.wind.degree}°`,
      color: "text-green-500"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: "Visibility",
      value: `${weather.visibility} km`,
      subValue: `Pressure: ${weather.pressure} hPa`,
      color: "text-purple-500"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      label: "Cloud Cover",
      value: `${weather.cloudCover}%`,
      subValue: `UV Index: ${weather.uvIndex}`,
      color: "text-gray-500"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "Air Quality",
      value: `EPA: ${weather.airQuality['us-epa-index']}`,
      subValue: `PM2.5: ${weather.airQuality.pm2_5.toFixed(1)}`,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md border">
          <div className="flex items-center gap-3 mb-2">
            <div className={metric.color}>{metric.icon}</div>
            <span className="font-medium text-gray-700">{metric.label}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
          <div className="text-sm text-gray-500">{metric.subValue}</div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;