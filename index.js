const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  const replicateApiKey = process.env.REPLICATE_API_KEY;

  try {
    const response = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version: "a9758cb3...replace_with_correct_version_id...",
        input: { prompt: prompt }
      },
      {
        headers: {
          Authorization: `Token ${replicateApiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
