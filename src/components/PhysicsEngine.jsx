import React from 'react';
import { Zap } from 'lucide-react';

const PhysicsEngine = ({ advice, optimalConditions }) => {
  if (!advice || !optimalConditions) return null;

  const physicsAdvice = advice.find(item => item?.physics);
  const physics = physicsAdvice?.physics;

  const temperature = optimalConditions?.targetTemperature || {};
  const humidity = optimalConditions?.targetHumidity || {};
  const ventilation = optimalConditions?.ventilationSettings || {};

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold text-gray-800">Physics Engine Analysis</h3>
      </div>

      {physics && (
        <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-yellow-500">
          <h4 className="font-semibold text-gray-800 mb-2">Vapor Pressure Deficit (VPD)</h4>
          <p className="text-gray-600">{physics}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temperature Targets */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">Temperature Targets</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Day:</span>
              <span className="font-medium">
                {temperature.day != null ? `${temperature.day}°C` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Night:</span>
              <span className="font-medium">
                {temperature.night != null ? `${temperature.night}°C` : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Controls */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">Environmental Controls</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Humidity Target:</span>
              <span className="font-medium">{humidity.range || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current:</span>
              <span className="font-medium text-red-600">{humidity.current || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ventilation:</span>
              <span className="font-medium">{ventilation.level || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsEngine;
