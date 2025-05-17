const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

app.use(bodyParser.json());
app.use(express.static('public')); // Serves index.html

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "a9758cbf7c52f8c74a27b3c44f2fdf1e10ff5e8f38b5bb12c4aa6c3f96e444b8", // Replicate stable-diffusion
        input: { prompt }
      },
      {
        headers: {
          'Authorization': `Token ${REPLICATE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const prediction = response.data;
    const getUrl = async () => {
      while (
        prediction.status !== 'succeeded' &&
        prediction.status !== 'failed'
      ) {
        const result = await axios.get(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
          headers: {
            'Authorization': `Token ${REPLICATE_API_KEY}`
          }
        });
        if (result.data.status === 'succeeded') {
          return result.data.output[0];
        } else if (result.data.status === 'failed') {
          throw new Error('Image generation failed.');
        }
        await new Promise(r => setTimeout(r, 1000)); // Wait 1s before checking again
      }
    };

    const imageUrl = await getUrl();
    res.json({ image_url: imageUrl });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong while generating image.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
