document.getElementById('generate-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const prompt = document.getElementById('image-prompt').value;
  const loadingMessage = document.getElementById('loading-message');
  const imageElement = document.getElementById('generated-image');

  loadingMessage.style.display = 'block';
  imageElement.style.display = 'none';

  try {
    const response = await fetch('https://your-backend-url/api/generate-image', { // Replace with your backend API URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    imageElement.src = data.imageUrl; // Assuming the backend returns the image URL in the response
    imageElement.style.display = 'block';
  } catch (error) {
    alert('Error generating image: ' + error.message);
  } finally {
    loadingMessage.style.display = 'none';
  }
});
