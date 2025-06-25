import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Eye, Cloud, Sun, AlertTriangle, CheckCircle, Activity, Zap, Target, Cpu, Database, Wifi } from 'lucide-react';

// Animated background component
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/20"></div>
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        /> 
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
  </div>
);

// Holographic border component
const HoloBorder = ({ children, className = "", glowColor = "green" }) => (
  <div className={`relative ${className}`}>
    <div className={`absolute inset-0 bg-gradient-to-r from-${glowColor}-500/20 to-${glowColor}-300/20 rounded-lg blur-sm`}></div>
    <div className={`relative bg-black/80 backdrop-blur-sm border border-${glowColor}-500/50 rounded-lg overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${glowColor}-500/10 to-transparent animate-pulse`}></div>
      {children}
    </div>
  </div>
);

// Scanning line animation
const ScanLine = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan"></div>
  </div>
);

// WeatherHero Component
const WeatherHero = ({ location, weather }) => {
  if (!location || !weather) return null;

  return (
    <HoloBorder className="mb-8 transform hover:scale-[1.02] transition-all duration-500">
      <div className="p-8 relative">
        <ScanLine />
        <div className="flex justify-between items-start text-green-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-green-400 animate-pulse" />
              <h1 className="text-4xl font-bold text-green-300 tracking-wider">
                {location.name}
              </h1>
            </div>
            <p className="text-green-400/80 text-lg font-mono">
              {location.region}, {location.country}
            </p>
            <div className="flex items-center gap-6">
              <div className="text-6xl font-bold text-green-300 font-mono glow-text">
                {weather.temperature.celsius}°C
              </div>
              <div className="space-y-2">
                <p className="text-xl text-green-200 font-semibold">{weather.condition.text}</p>
                <p className="text-green-400/70 font-mono">
                  THERMAL INDEX: {weather.temperature.feelsLike}°C
                </p>
              </div>
            </div>
          </div>
          <div className="text-right space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg animate-pulse"></div>
              <img 
                src={`https:${weather.condition.icon}`} 
                alt={weather.condition.text} 
                className="w-20 h-20 relative z-10 drop-shadow-2xl" 
              />
            </div>
            <p className="text-sm text-green-400/80 font-mono">
              TIMESTAMP: {new Date(location.localTime).toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-green-400/50"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-green-400/50"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-green-400/50"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-green-400/50"></div>
      </div>
    </HoloBorder>
  );
};

// MetricsGrid Component
const MetricsGrid = ({ weather }) => {
  if (!weather) return null;

  const metrics = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: "THERMAL",
      value: `${weather.temperature.celsius}°C`,
      subValue: `${weather.temperature.fahrenheit}°F`,
      color: "red",
      level: Math.min(100, (weather.temperature.celsius / 40) * 100)
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "HUMIDITY",
      value: `${weather.humidity}%`,
      subValue: weather.precipitation.mm > 0 ? `${weather.precipitation.mm}mm` : "DRY",
      color: "blue",
      level: weather.humidity
    },
    {
      icon: <Wind className="w-6 h-6" />,
      label: "AIRFLOW",
      value: `${weather.wind.speed_kph} KPH`,
      subValue: `${weather.wind.direction} ${weather.wind.degree}°`,
      color: "cyan",
      level: Math.min(100, (weather.wind.speed_kph / 50) * 100)
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: "VISIBILITY",
      value: `${weather.visibility} KM`,
      subValue: `${weather.pressure} HPA`,
      color: "purple",
      level: Math.min(100, (weather.visibility / 20) * 100)
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      label: "CLOUD DENSITY",
      value: `${weather.cloudCover}%`,
      subValue: `UV: ${weather.uvIndex}`,
      color: "gray",
      level: weather.cloudCover
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "AIR QUALITY",
      value: `EPA: ${weather.airQuality['us-epa-index']}`,
      subValue: `PM2.5: ${weather.airQuality.pm2_5.toFixed(1)}`,
      color: "orange",
      level: Math.min(100, (weather.airQuality['us-epa-index'] / 6) * 100)
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <HoloBorder key={index} className="group hover:scale-105 transition-all duration-500">
          <div className="p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className={`text-${metric.color}-400 animate-pulse`}>
                {metric.icon}
              </div>
              <span className="font-mono text-green-300 text-sm tracking-wider">
                {metric.label}
              </span>
            </div>
            
            <div className="text-3xl font-bold text-green-200 mb-2 font-mono glow-text">
              {metric.value}
            </div>
            
            <div className="text-sm text-green-400/70 mb-4 font-mono">
              {metric.subValue}
            </div>
            
            {/* Progress bar */}
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-${metric.color}-600 to-${metric.color}-400 rounded-full transition-all duration-1000 glow-bar`}
                style={{ width: `${metric.level}%` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            
            <ScanLine />
          </div>
        </HoloBorder>
      ))}
    </div>
  );
};

// PhysicsEngine Component
const PhysicsEngine = ({ advice, optimalConditions }) => {
  if (!advice || !optimalConditions) return null;

  const getPhysicsData = () => {
    const physicsAdvice = advice.find(item => item.physics);
    return physicsAdvice ? physicsAdvice.physics : null;
  };

  const physics = getPhysicsData();

  return (
    <HoloBorder className="mb-8" glowColor="cyan">
      <div className="p-8 relative">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="w-8 h-8 text-cyan-400 animate-spin-slow" />
          <h3 className="text-2xl font-bold text-cyan-300 font-mono tracking-wider">
            QUANTUM PHYSICS ENGINE
          </h3>
          <div className="flex gap-1 ml-auto">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        {physics && (
          <HoloBorder className="mb-6" glowColor="yellow">
            <div className="p-4 border-l-4 border-yellow-400">
              <h4 className="font-mono text-yellow-300 mb-2 tracking-wider">
                ENVIRONMENTAL ANALYSIS
              </h4>
              <p className="text-green-200 font-mono text-sm leading-relaxed">
                {physics}
              </p>
            </div>
          </HoloBorder>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HoloBorder glowColor="red">
            <div className="p-6">
              <h4 className="font-mono text-red-300 mb-4 tracking-wider flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                THERMAL TARGETS
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-mono">DAY CYCLE:</span>
                  <span className="text-red-300 font-bold font-mono">
                    {optimalConditions.targetTemperature.day}°C
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-mono">NIGHT CYCLE:</span>
                  <span className="text-red-300 font-bold font-mono">
                    {optimalConditions.targetTemperature.night}°C
                  </span>
                </div>
              </div>
            </div>
          </HoloBorder>

          <HoloBorder glowColor="blue">
            <div className="p-6">
              <h4 className="font-mono text-blue-300 mb-4 tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4" />
                ENVIRONMENTAL MATRIX
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-mono">HUMIDITY TARGET:</span>
                  <span className="text-blue-300 font-bold font-mono">
                    {optimalConditions.targetHumidity.range}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-mono">CURRENT STATUS:</span>
                  <span className="text-red-400 font-bold font-mono">
                    {optimalConditions.targetHumidity.current}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-mono">VENTILATION:</span>
                  <span className="text-blue-300 font-bold font-mono">
                    {optimalConditions.ventilationSettings.level}
                  </span>
                </div>
              </div>
            </div>
          </HoloBorder>
        </div>
        
        <ScanLine />
      </div>
    </HoloBorder>
  );
};

// AdvicePanel Component
const AdvicePanel = ({ greenhouse, optimalConditions }) => {
  if (!greenhouse) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getPriorityIcon = (priority) => {
    return priority === 'high' ? 
      <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" /> : 
      <CheckCircle className="w-5 h-5 text-yellow-400" />;
  };

  return (
    <div className="space-y-8">
      <HoloBorder>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-green-300 font-mono tracking-wider">
              ADVISORY PROTOCOL
            </h3>
            <div className={`px-4 py-2 rounded-full font-mono text-sm tracking-wider border-2 ${
              greenhouse.priority === 'high' ? 'border-red-500 bg-red-500/20 text-red-300' :
              greenhouse.priority === 'medium' ? 'border-yellow-500 bg-yellow-500/20 text-yellow-300' :
              'border-green-500 bg-green-500/20 text-green-300'
            } animate-pulse`}>
              {greenhouse.priority.toUpperCase()} PRIORITY
            </div>
          </div>
        </div>
      </HoloBorder>

      {greenhouse.advice.map((advice, index) => (
        <HoloBorder key={index} glowColor={getPriorityColor(advice.priority)} className="group hover:scale-[1.02] transition-all duration-500">
          <div className="p-6 relative">
            <div className="flex items-start gap-4 mb-6">
              {getPriorityIcon(advice.priority)}
              <div className="flex-1">
                <h4 className="text-xl font-bold text-green-300 mb-2 font-mono tracking-wider">
                  {advice.title}
                </h4>
                <p className="text-green-200/80 leading-relaxed font-mono text-sm">
                  {advice.message}
                </p>
              </div>
            </div>

            <HoloBorder glowColor="green">
              <div className="p-4">
                <h5 className="font-mono text-green-300 mb-4 tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  RECOMMENDED ACTIONS:
                </h5>
                <div className="space-y-3">
                  {advice.actions.map((action, actionIndex) => (
                    <div key={actionIndex} className="flex items-start gap-3 group/item hover:bg-green-500/10 p-2 rounded transition-all duration-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0 group-hover/item:animate-pulse" />
                      <span className="text-green-200 font-mono text-sm leading-relaxed">
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </HoloBorder>
            
            <ScanLine />
          </div>
        </HoloBorder>
      ))}

      {greenhouse.riskAssessment && (
        <HoloBorder glowColor="orange">
          <div className="p-6 relative">
            <h4 className="text-xl font-bold text-orange-300 mb-6 font-mono tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              THREAT ASSESSMENT MATRIX
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-300 font-mono glow-text">
                  {greenhouse.riskAssessment.totalRisks}
                </div>
                <div className="text-sm text-green-400/80 font-mono tracking-wider">
                  TOTAL THREATS
                </div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold font-mono glow-text ${
                  greenhouse.riskAssessment.riskLevel === 'high' ? 'text-red-400' :
                  greenhouse.riskAssessment.riskLevel === 'medium' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {greenhouse.riskAssessment.riskLevel.toUpperCase()}
                </div>
                <div className="text-sm text-green-400/80 font-mono tracking-wider">
                  THREAT LEVEL
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 font-mono glow-text">
                  {optimalConditions?.lightingRecommendation?.duration || 'N/A'}
                </div>
                <div className="text-sm text-green-400/80 font-mono tracking-wider">
                  PHOTON CYCLES
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {greenhouse.riskAssessment.risks.map((risk, index) => (
                <HoloBorder key={index} glowColor="red">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                      <span className="font-mono text-red-300 font-semibold tracking-wider">
                        {risk.type.toUpperCase()} THREAT - {risk.level.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-green-200/80 mb-3 font-mono text-sm">
                      {risk.description}
                    </p>
                    <p className="text-xs text-green-400/70 font-mono">
                      <span className="text-cyan-400">COUNTERMEASURE:</span> {risk.prevention}
                    </p>
                  </div>
                </HoloBorder>
              ))}
            </div>
            
            <ScanLine />
          </div>
        </HoloBorder>
      )}
    </div>
  );
};

// AIAssistant Component
const AIAssistant = ({ status, lastUpdated }) => {
  return (
    <HoloBorder glowColor="purple" className="sticky top-8">
      <div className="p-6 relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-purple-500/30 rounded-full animate-ping"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-300 font-mono tracking-wider">
              NEXUS AI CORE
            </h3>
            <p className="text-sm text-green-400/70 font-mono">
              Smart Greenhouse Advisor
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              status === 'success' ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            <span className="text-sm font-mono text-green-300 tracking-wider">
              {status === 'success' ? 'ONLINE & MONITORING' : 'OFFLINE'}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Wifi className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs text-green-400/70 font-mono">
              LAST SYNC: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'NEVER'}
            </span>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
            <div className="text-xs text-purple-300 font-mono mb-2 tracking-wider">
              SYSTEM STATUS
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="text-green-400">CPU: 85%</div>
              <div className="text-green-400">MEM: 67%</div>
              <div className="text-green-400">NET: STABLE</div>
              <div className="text-green-400">AI: ACTIVE</div>
            </div>
          </div>
        </div>
        
        <ScanLine />
      </div>
    </HoloBorder>
  );
};

// Main App Component
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/weather/eldoret');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setWeatherData(data);
      } else {
        throw new Error('API returned error status');
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(`Failed to fetch weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground />
        <div className="text-center z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
          </div>
          <p className="font-mono text-xl tracking-wider animate-pulse">
            INITIALIZING NEXUS PROTOCOL...
          </p>
          <div className="mt-4 flex justify-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground />
        <HoloBorder glowColor="red" className="z-10">
          <div className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold font-mono mb-4 tracking-wider">
              SYSTEM FAILURE
            </h2>
            <p className="text-red-300/80 mb-6 font-mono">{error}</p>
            <button 
              onClick={fetchWeatherData} 
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded font-mono tracking-wider hover:from-red-500 hover:to-red-600 transition-all duration-300 border border-red-500/50"
            >
              RESTART PROTOCOL
            </button>
          </div>
        </HoloBorder>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {weatherData && (
            <>
              <WeatherHero 
                location={weatherData.location} 
                weather={weatherData.weather} 
              />

              <MetricsGrid weather={weatherData.weather} />

              <PhysicsEngine 
                advice={weatherData.greenhouse.advice}
                optimalConditions={weatherData.greenhouse.optimalConditions}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <AdvicePanel 
                    greenhouse={weatherData.greenhouse}
                    optimalConditions={weatherData.greenhouse.optimalConditions}
                  />
                </div>

                <div>
                  <AIAssistant 
                    status={weatherData.status}
                    lastUpdated={weatherData.timestamp}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;