const apiKey = 'YOUR-API-KEY';
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');
const cityInput = document.getElementById('city-input');

// Add event listeners for both button click and Enter key press
document.getElementById('search-button').addEventListener('click', () => {
  handleSearch();
});

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// Function to handle search input
function handleSearch() {
  const city = cityInput.value.trim();
  console.log(`Input value: ${city}`); // Log the input value
  if (city) {
    fetchWeather(city);
  } else {
    errorMessage.textContent = 'Please enter a city name.';
  }
}

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    console.log(`City entered: ${city}`); // Log the city input

    // Clear previous results and errors, show loading indicator
    errorMessage.textContent = '';
    weatherResult.style.display = 'none';
    const loadingIndicator = showLoading();

    // Make the API call
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    console.log(`API response status: ${response.status}`); // Log the response status

    // Check if the response is valid
    if (!response.ok) throw new Error('City not found');

    // Parse the response data
    const data = await response.json();
    console.log('API Response Data:', data); // Log the API response data

    // Display weather data
    displayWeather(data);
  } catch (error) {
    console.error('Error:', error.message); // Log the error
    errorMessage.textContent = error.message; // Show error message to the user
  } finally {
    hideLoading(); // Hide the loading indicator
  }
}

// Function to display weather data
function displayWeather(data) {
  document.getElementById('city-name').textContent = `City: ${data.name}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('weather-description').textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Show the weather result section
  weatherResult.style.display = 'block';
}

// Function to show loading indicator
function showLoading() {
  const loadingIndicator = document.createElement('p');
  loadingIndicator.id = 'loading';
  loadingIndicator.textContent = 'Loading...';
  document.body.appendChild(loadingIndicator);
  return loadingIndicator;
}

// Function to hide loading indicator
function hideLoading() {
  const loadingIndicator = document.getElementById('loading');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}