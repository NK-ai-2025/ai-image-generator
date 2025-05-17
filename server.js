const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const REPLICATE_API_URL = "https://api.replicate.com/v1/predictions";

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(REPLICATE_API_URL, {
      version: "a9758cbf0bf708f32404a9c88ccf8e5d53c9c6c1576c85e251e2f8db1d40845c", // SDXL
      input: { prompt }
    }, {
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error generating image" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
