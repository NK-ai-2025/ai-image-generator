const express = require('express');
const path = require('path');
const app = express();

// Serve static files (index.html and other assets)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(10000, () => {
  console.log('Server is running on port 10000');
});
