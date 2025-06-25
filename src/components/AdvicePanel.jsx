import React from 'react';
import { Sun, Thermometer, Droplet } from 'lucide-react';

const AdvicePanel = ({ optimalConditions }) => {
  if (!optimalConditions) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm text-yellow-800">
        No optimal conditions available.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Optimal Growing Conditions</h3>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-red-500" />
          <span>Temperature: <strong>{optimalConditions.temperature}</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <Droplet className="w-5 h-5 text-blue-500" />
          <span>Humidity: <strong>{optimalConditions.humidity}</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <Sun className="w-5 h-5 text-yellow-500" />
          <span>Sunlight: <strong>{optimalConditions.sunlight}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default AdvicePanel;
