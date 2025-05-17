document.getElementById('settings-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const resolution = document.getElementById('resolution').value;
  const location = document.getElementById('location').value;

  try {
    const response = await axios.post('/save-settings', { resolution, location });
    if (response.data.status === 'Settings updated successfully!') {
      alert('Settings saved successfully');
    }
  } catch (error) {
    alert('Error saving settings');
  }
});
