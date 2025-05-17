document.getElementById('generate-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const prompt = document.getElementById('prompt').value;
  const resolution = document.getElementById('resolution').value; // Assuming resolution is part of the settings

  try {
    const response = await axios.post('/generate-image', { prompt, resolution });
    document.getElementById('generated-image').src = response.data.imageUrl; // Display the generated image
  } catch (error) {
    alert('Error generating image');
  }
});
