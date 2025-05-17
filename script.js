async function generateImage() {
  const prompt = document.getElementById('prompt').value;
  const res = await fetch('/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  const img = document.createElement('img');
  img.src = data.image;
  document.getElementById('image-container').innerHTML = '';
  document.getElementById('image-container').appendChild(img);
}
