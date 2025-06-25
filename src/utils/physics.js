// Physics calculations for greenhouse environment

/**
 * Calculate Vapor Pressure Deficit (VPD)
 * @param {number} temperature - Temperature in Celsius
 * @param {number} humidity - Relative humidity as percentage
 * @returns {number} VPD in kPa
 */
export const calculateVPD = (temperature, humidity) => {
  // Saturated vapor pressure calculation (Buck equation)
  const svp = 0.61121 * Math.exp((18.678 - temperature / 234.5) * (temperature / (257.14 + temperature)));
  
  // Actual vapor pressure
  const avp = svp * (humidity / 100);
  
  // Vapor Pressure Deficit
  const vpd = svp - avp;
  
  return parseFloat(vpd.toFixed(3));
};

/**
 * Calculate Dew Point
 * @param {number} temperature - Temperature in Celsius
 * @param {number} humidity - Relative humidity as percentage
 * @returns {number} Dew point in Celsius
 */
export const calculateDewPoint = (temperature, humidity) => {
  const a = 17.27;
  const b = 237.7;
  
  const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  
  return parseFloat(dewPoint.toFixed(2));
};

/**
 * Calculate Heat Index (feels like temperature)
 * @param {number} temperature - Temperature in Celsius
 * @param {number} humidity - Relative humidity as percentage
 * @returns {number} Heat index in Celsius
 */
export const calculateHeatIndex = (temperature, humidity) => {
  // Convert to Fahrenheit for calculation
  const tempF = (temperature * 9/5) + 32;
  
  if (tempF < 80) return temperature;
  
  const hi = -42.379 + 
    2.04901523 * tempF + 
    10.14333127 * humidity - 
    0.22475541 * tempF * humidity - 
    6.83783e-3 * tempF * tempF - 
    5.481717e-2 * humidity * humidity + 
    1.22874e-3 * tempF * tempF * humidity + 
    8.5282e-4 * tempF * humidity * humidity - 
    1.99e-6 * tempF * tempF * humidity * humidity;
  
  // Convert back to Celsius
  return parseFloat(((hi - 32) * 5/9).toFixed(2));
};

/**
 * Assess plant stress level based on environmental conditions
 * @param {Object} conditions - Weather conditions object
 * @returns {Object} Stress assessment
 */
export const assessPlantStress = (conditions) => {
  const { temperature, humidity, wind, cloudCover } = conditions;
  
  const vpd = calculateVPD(temperature.celsius, humidity);
  const dewPoint = calculateDewPoint(temperature.celsius, humidity);
  
  let stressLevel = 'low';
  let stressFactors = [];
  
  // Temperature stress
  if (temperature.celsius < 10 || temperature.celsius > 35) {
    stressLevel = temperature.celsius < 5 || temperature.celsius > 40 ? 'high' : 'medium';
    stressFactors.push('Temperature stress');
  }
  
  // Humidity stress
  if (humidity > 85 || humidity < 30) {
    if (stressLevel === 'low') stressLevel = 'medium';
    if (humidity > 90 || humidity < 20) stressLevel = 'high';
    stressFactors.push('Humidity stress');
  }
  
  // VPD stress
  if (vpd < 0.4 || vpd > 1.6) {
    if (stressLevel === 'low') stressLevel = 'medium';
    if (vpd < 0.2 || vpd > 2.0) stressLevel = 'high';
    stressFactors.push('VPD stress');
  }
  
  // Wind stress
  if (wind.speed_kph > 25) {
    if (stressLevel === 'low') stressLevel = 'medium';
    if (wind.speed_kph > 40) stressLevel = 'high';
    stressFactors.push('Wind stress');
  }
  
  return {
    level: stressLevel,
    factors: stressFactors,
    vpd,
    dewPoint,
    recommendations: generateStressRecommendations(stressLevel, stressFactors)
  };
};

/**
 * Generate recommendations based on stress assessment
 * @param {string} stressLevel - Overall stress level
 * @param {Array} stressFactors - Array of stress factors
 * @returns {Array} Array of recommendations
 */
const generateStressRecommendations = (stressLevel, stressFactors) => {
  const recommendations = [];
  
  if (stressFactors.includes('Temperature stress')) {
    recommendations.push('Adjust heating/cooling systems');
    recommendations.push('Consider thermal mass modifications');
  }
  
  if (stressFactors.includes('Humidity stress')) {
    recommendations.push('Adjust ventilation rates');
    recommendations.push('Monitor irrigation frequency');
  }
  
  if (stressFactors.includes('VPD stress')) {
    recommendations.push('Balance temperature and humidity');
    recommendations.push('Optimize transpiration conditions');
  }
  
  if (stressFactors.includes('Wind stress')) {
    recommendations.push('Install windbreaks or barriers');
    recommendations.push('Reduce ventilation if possible');
  }
  
  if (stressLevel === 'high') {
    recommendations.push('Implement emergency protocols');
    recommendations.push('Monitor plants closely for damage');
  }
  
  return recommendations;
};

/**
 * Calculate optimal growing degree days
 * @param {number} maxTemp - Maximum temperature
 * @param {number} minTemp - Minimum temperature
 * @param {number} baseTemp - Base temperature for crop (default 10°C)
 * @returns {number} Growing degree days
 */
export const calculateGDD = (maxTemp, minTemp, baseTemp = 10) => {
  const avgTemp = (maxTemp + minTemp) / 2;
  return Math.max(0, avgTemp - baseTemp);
};

export default {
  calculateVPD,
  calculateDewPoint,
  calculateHeatIndex,
  assessPlantStress,
  calculateGDD
};