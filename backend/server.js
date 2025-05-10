require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Current Weather (Your exact endpoint)
app.get('/api/current', async (req, res) => {
    const { city } = req.query;
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}&aqi=yes`
        );
        res.json(await response.json());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Forecast (Your exact endpoint)
app.get('/api/forecast', async (req, res) => {
    const { city } = req.query;
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3&aqi=yes`
        );
        res.json(await response.json());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 