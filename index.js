const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

const API_URL = "https://fuel-prices-api1.p.rapidapi.com/fuel-prices?country=DE";
const API_KEY = process.env.ZYLA_API_KEY; // Setzt du auf Render als Umgebungsvariable

const eurToPln = 4.3;

app.get("/prices", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "fuel-prices-api1.p.rapidapi.com"
      }
    });

    const data = response.data;

    // Beispielhaft angenommen, passe ggf. an!
    const euroPreise = {
      superE10: data.fuelPrices.gasoline,
      diesel: data.fuelPrices.diesel,
      lpg: data.fuelPrices.lpg
    };

    const plnPreise = {
      superE10: (euroPreise.superE10 * eurToPln).toFixed(2),
      diesel: (euroPreise.diesel * eurToPln).toFixed(2),
      lpg: (euroPreise.lpg * eurToPln).toFixed(2)
    };

    res.json({
      euro: euroPreise,
      pln: plnPreise,
      stand: new Date().toISOString().split("T")[0]
    });

  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    res.status(500).json({ error: "API-Zugriff fehlgeschlagen" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy läuft auf Port ${PORT}`);
});

