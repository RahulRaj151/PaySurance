const express = require('express');
const axios = require('axios');

const router = express.Router();

// Get weather data
router.get('/check', async (req, res) => {
  try {
    const { latitude, longitude, city } = req.query;

    // Try OpenWeather API if key is available
    if (process.env.OPENWEATHER_API_KEY && process.env.OPENWEATHER_API_KEY !== 'your_openweather_key') {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        const data = response.data;
        return res.json({
          temperature: data.main.temp,
          rainfall: data.rain?.['1h'] || 0,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          city: data.name,
          timestamp: new Date(),
        });
      } catch (err) {
        console.log('OpenWeather API failed, using mock data');
      }
    }

    // Mock data for testing
    const mockWeather = {
      temperature: 35 + Math.random() * 15,
      rainfall: Math.random() * 50,
      humidity: 60 + Math.random() * 30,
      description: 'Partly cloudy',
      city: city || 'Delhi',
      timestamp: new Date(),
    };

    res.json(mockWeather);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get AQI data
router.get('/aqi', async (req, res) => {
  try {
    const { latitude, longitude, city } = req.query;

    // Mock AQI data for testing
    const mockAQI = {
      aqi: Math.round(50 + Math.random() * 200),
      pm25: Math.round(20 + Math.random() * 150),
      pm10: Math.round(30 + Math.random() * 200),
      no2: Math.round(20 + Math.random() * 100),
      o3: Math.round(30 + Math.random() * 150),
      city: city || 'Delhi',
      timestamp: new Date(),
    };

    res.json(mockAQI);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
