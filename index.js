const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Your image generation endpoint
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  // Call your AI image generator function here, passing the prompt
  // Example: const imageUrl = await generateImage(prompt);
  
  const imageUrl = "https://your-cloud-storage-url/generated-image.jpg";  // Replace this with actual image URL from the generator

  res.json({ imageUrl });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
