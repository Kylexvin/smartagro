import React from 'react';
import { Zap } from 'lucide-react';

const AIAssistant = ({ status, lastUpdated }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">AI Assistant Status</h3>
          <p className="text-sm text-gray-600">Smart Greenhouse Advisor</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm font-medium text-gray-700">
          {status === 'success' ? 'Online & Monitoring' : 'Offline'}
        </span>
      </div>
      
      <p className="text-xs text-gray-500">
        Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
      </p>
    </div>
  );
};

export default AIAssistant;