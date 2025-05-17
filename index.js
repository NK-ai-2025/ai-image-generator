document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await axios.post('/login', { email, password });
    if (response.status === 200) {
      window.location.href = '/settings.html'; // Redirect to settings page after login
    }
  } catch (error) {
    alert('Invalid credentials');
  }
});

document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await axios.post('/register', { email, password });
    alert('Registration successful');
  } catch (error) {
    alert('Error during registration');
  }
});
