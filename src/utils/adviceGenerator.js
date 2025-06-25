// Advice generation utilities for greenhouse management

/**
 * Generate disease prevention advice based on weather conditions
 * @param {Object} weather - Weather data object
 * @returns {Object} Disease prevention advice
 */
export const generateDiseaseAdvice = (weather) => {
  const { humidity, temperature, precipitation } = weather;
  const advice = {
    category: 'disease_prevention',
    priority: 'low',
    risks: [],
    actions: []
  };

  // High humidity risks
  if (humidity > 80) {
    advice.priority = humidity > 90 ? 'high' : 'medium';
    advice.risks.push('Fungal disease development');
    advice.actions.push('Increase ventilation immediately');
    advice.actions.push('Reduce watering frequency');
    
    if (humidity > 85) {
      advice.actions.push('Apply preventive fungicide spray');
      advice.actions.push('Install dehumidification systems');
    }
  }

  // Temperature + humidity combination
  if (temperature.celsius >= 15 && temperature.celsius <= 25 && humidity > 75) {
    advice.priority = 'high';
    advice.risks.push('Optimal conditions for pathogen growth');
    advice.actions.push('Monitor for early disease symptoms');
    advice.actions.push('Implement strict sanitation protocols');
  }

  // Precipitation risks
  if (precipitation.mm > 0) {
    advice.risks.push('Increased moisture promoting disease');
    advice.actions.push('Ensure proper drainage');
    advice.actions.push('Avoid overhead watering');
  }

  return advice;
};

/**
 * Generate irrigation advice based on weather conditions
 * @param {Object} weather - Weather data object
 * @returns {Object} Irrigation advice
 */
export const generateIrrigationAdvice = (weather) => {
  const { humidity, temperature, wind, precipitation } = weather;
  const advice = {
    category: 'irrigation',
    priority: 'medium',
    recommendations: [],
    timing: 'morning'
  };

  // High temperature conditions
  if (temperature.celsius > 30) {
    advice.priority = 'high';
    advice.recommendations.push('Increase watering frequency');
    advice.recommendations.push('Consider misting systems');
    advice.timing = 'early morning and evening';
  }

  // Low humidity conditions
  if (humidity < 40) {
    advice.recommendations.push('Increase irrigation to compensate for high evaporation');
    advice.recommendations.push('Use mulching to retain moisture');
  }

  // Windy conditions
  if (wind.speed_kph > 15) {
    advice.recommendations.push('Increase watering due to wind-induced water loss');
    advice.recommendations.push('Protect plants from drying winds');
  }

  // Recent precipitation
  if (precipitation.mm > 5) {
    advice.recommendations.push('Reduce irrigation for 1-2 days');
    advice.recommendations.push('Monitor soil moisture levels');
  }

  return advice;
};

/**
 * Generate ventilation advice based on weather conditions
 * @param {Object} weather - Weather data object
 * @returns {Object} Ventilation advice
 */
export const generateVentilationAdvice = (weather) => {
  const { temperature, humidity, wind } = weather;
  const advice = {
    category: 'ventilation',
    priority: 'medium',
    settings: {},
    actions: []
  };

  // Temperature-based ventilation
  if (temperature.celsius > 25) {
    advice.priority = 'high';
    advice.settings.level = 'high';
    advice.settings.airChanges = '60-80/hour';
    advice.actions.push('Maximize natural ventilation');
    advice.actions.push('Activate exhaust fans');
  } else if (temperature.celsius < 15) {
    advice.settings.level = 'low';
    advice.settings.airChanges = '20-30/hour';
    advice.actions.push('Minimize heat loss');
    advice.actions.push('Use controlled ventilation');
  } else {
    advice.settings.level = 'medium';
    advice.settings.airChanges = '40-50/hour';
  }

  // Humidity-based adjustments
  if (humidity > 80) {
    advice.priority = 'high';
    advice.actions.push('Increase ventilation to reduce humidity');
    advice.actions.push('Use dehumidification if available');
  }

  // Wind considerations
  if (wind.speed_kph > 20) {
    advice.actions.push('Reduce ventilation openings to prevent plant damage');
    advice.actions.push('Monitor for cold drafts');
  }

  return advice;
};

/**
 * Generate pest management advice based on weather conditions
 * @param {Object} weather - Weather data object
 * @returns {Object} Pest management advice
 */
export const generatePestAdvice = (weather) => {
  const { temperature, humidity, wind } = weather;
  const advice = {
    category: 'pest_management',
    priority: 'low',
    risks: [],
    actions: []
  };

  // Warm, humid conditions favor many pests
  if (temperature.celsius > 20 && humidity > 60) {
    advice.priority = 'medium';
    advice.risks.push('Increased insect activity');
    advice.actions.push('Monitor for pest populations');
    advice.actions.push('Consider beneficial insect releases');
  }

  // Very warm conditions
  if (temperature.celsius > 30) {
    advice.risks.push('Spider mite proliferation');
    advice.actions.push('Increase humidity to deter spider mites');
    advice.actions.push('Implement regular misting');
  }

  // Calm conditions
  if (wind.speed_kph < 5) {
    advice.risks.push('Reduced natural pest dispersal');
    advice.actions.push('Increase air circulation');
    advice.actions.push('Monitor for pest concentration');
  }

  return advice;
};

/**
 * Generate comprehensive greenhouse advice
 * @param {Object} weatherData - Complete weather data object
 * @returns {Object} Comprehensive advice object
 */
export const generateComprehensiveAdvice = (weatherData) => {
  const { weather } = weatherData;
  
  const diseaseAdvice = generateDiseaseAdvice(weather);
  const irrigationAdvice = generateIrrigationAdvice(weather);
  const ventilationAdvice = generateVentilationAdvice(weather);
  const pestAdvice = generatePestAdvice(weather);

  // Determine overall priority
  const priorities = [diseaseAdvice.priority, irrigationAdvice.priority, ventilationAdvice.priority, pestAdvice.priority];
  const overallPriority = priorities.includes('high') ? 'high' : priorities.includes('medium') ? 'medium' : 'low';

  return {
    timestamp: new Date().toISOString(),
    overallPriority,
    categories: {
      disease: diseaseAdvice,
      irrigation: irrigationAdvice,
      ventilation: ventilationAdvice,
      pest: pestAdvice
    },
    summary: generateAdviceSummary(diseaseAdvice, irrigationAdvice, ventilationAdvice, pestAdvice)
  };
};

/**
 * Generate advice summary
 * @param {...Object} adviceObjects - Various advice objects
 * @returns {Array} Summary of key recommendations
 */
const generateAdviceSummary = (...adviceObjects) => {
  const summary = [];
  
  adviceObjects.forEach(advice => {
    if (advice.priority === 'high') {
      summary.push(`HIGH PRIORITY: ${advice.category.replace('_', ' ').toUpperCase()}`);
    }
  });

  // Add top 3 most important actions
  const allActions = [];
  adviceObjects.forEach(advice => {
    if (advice.actions) {
      allActions.push(...advice.actions);
    }
    if (advice.recommendations) {
      allActions.push(...advice.recommendations);
    }
  });

  const topActions = [...new Set(allActions)].slice(0, 3);
  summary.push(...topActions);

  return summary;
};

/**
 * Calculate risk score based on environmental conditions
 * @param {Object} weather - Weather data object
 * @returns {number} Risk score from 0-100
 */
export const calculateRiskScore = (weather) => {
  let score = 0;

  // Temperature risks
  if (weather.temperature.celsius < 10 || weather.temperature.celsius > 35) {
    score += 20;
  }

  // Humidity risks
  if (weather.humidity > 85 || weather.humidity < 30) {
    score += 25;
  }

  // Wind risks
  if (weather.wind.speed_kph > 25) {
    score += 15;
  }

  // Precipitation risks
  if (weather.precipitation.mm > 10) {
    score += 10;
  }

  // UV risks
  if (weather.uvIndex > 8) {
    score += 10;
  }

  // Air quality risks
  if (weather.airQuality['us-epa-index'] > 2) {
    score += 20;
  }

  return Math.min(100, score);
};

export default {
  generateDiseaseAdvice,
  generateIrrigationAdvice,
  generateVentilationAdvice,
  generatePestAdvice,
  generateComprehensiveAdvice,
  calculateRiskScore
};