const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { generateImage } = require('./imageGenerator'); // Your image generation logic
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// In-memory storage for simplicity (You can use a database for production)
let users = [];
let userSettings = {};

// Serve login/register page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve settings page (user needs to be logged in)
app.get('/settings.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

// Serve image generation page
app.get('/generate.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'generate.html'));
});

// Login route (simple example)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Register route (simple example)
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  
  // Simple email check (in real cases, use proper validation)
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return res.status(400).send({ message: 'Email already in use' });
  }

  users.push({ email, password });
  res.status(200).send({ message: 'Registration successful' });
});

// Save user settings (resolution and location)
app.post('/save-settings', (req, res) => {
  const { resolution, location } = req.body;
  // Assuming user is logged in (you can add session or JWT to track user)
  userSettings = { resolution, location };

  res.status(200).send({ status: 'Settings updated successfully!' });
});

// Handle image generation
app.post('/generate-image', async (req, res) => {
  const { prompt, resolution } = req.body;

  // Example resolution mapping
  let imageResolution = resolution || '1024x1024'; // Default resolution
  const [width, height] = imageResolution.split('x').map(Number);

  try {
    const generatedImage = await generateImage(prompt, width, height); // Call to your image generation logic
    res.status(200).send({ imageUrl: generatedImage });
  } catch (error) {
    res.status(500).send({ message: 'Image generation failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
