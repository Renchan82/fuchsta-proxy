const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/fuelprice', async (req, res) => {
  try {
    const response = await axios.get('https://zylalabs.com/api/8269/fuel-prices-api/fuel', {
      headers: {
        'Authorization': 'Bearer l5nVNsa99REbMzmh5WpQOQiV7LDoiKYEdAltK9t1'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Fehler:', error.message);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy läuft auf http://localhost:${PORT}`);
});
