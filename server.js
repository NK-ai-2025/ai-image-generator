const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like images, CSS, JS

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Make sure index.html is in the root folder
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
