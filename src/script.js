// DOM Elements
const errorMessage = document.getElementById('error-message');
const weatherInfo = document.getElementById('weather-info');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const locationButton = document.getElementById('location-button');
const showMoreBtn = document.getElementById('show-more');
const forecastGrid = document.getElementById('forecast-grid');

// Show error message function
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!API_KEY) {
    showError('Weather API key is missing. Please add your API key to the .env file.');
    throw new Error('Weather API key is missing');
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather background mapping
const weatherBackgrounds = {
    'Clear': 'clear-sky',
    'Clouds': 'clouds',
    'Rain': 'rain',
    'Drizzle': 'rain',
    'Thunderstorm': 'thunderstorm',
    'Snow': 'snow',
    'Mist': 'mist',
    'Fog': 'mist',
    'Haze': 'mist'
};

// Get location's date and time
function getLocationDateTime(timestamp, timezoneOffset) {
    const utcTime = new Date(timestamp);
    const locationTime = new Date(utcTime.getTime() + (timezoneOffset * 1000));
    return locationTime;
}

// Format date
function formatDate(timestamp, timezoneOffset) {
    const date = getLocationDateTime(timestamp, timezoneOffset);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time
function formatTime(timestamp, timezoneOffset) {
    const date = getLocationDateTime(timestamp * 1000, timezoneOffset);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Update current time
function updateCurrentTime(timezoneOffset) {
    const timeElement = document.getElementById('time');
    if (timeElement) {
        const currentTime = getLocationDateTime(Date.now(), timezoneOffset);
        timeElement.textContent = currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
}

// Set weather background
function setWeatherBackground(weatherMain) {
    document.body.className = '';
    const backgroundClass = weatherBackgrounds[weatherMain] || '';
    if (backgroundClass) {
        document.body.classList.add(backgroundClass);
    }
}

// Get country info
async function getCountryInfo(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!response.ok) {
            throw new Error(`Country info request failed: ${response.statusText}`);
        }
        const [data] = await response.json();
        return {
            name: data.name.common,
            continent: data.continents[0]
        };
    } catch (error) {
        console.error('Error fetching country info:', error);
        return null;
    }
}

// Update weather UI
async function updateWeatherUI(weatherData) {
    try {
        const locationTime = getLocationDateTime(Date.now(), weatherData.timezone);
        
        document.getElementById('location').textContent = weatherData.name;
        
        // Get and display country info
        const countryInfo = await getCountryInfo(weatherData.sys.country);
        if (countryInfo) {
            document.getElementById('location-info').textContent = 
                `${countryInfo.name}, ${countryInfo.continent}`;
        }
        
        document.getElementById('date').textContent = formatDate(locationTime, weatherData.timezone);
        document.getElementById('temperature').textContent = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('description').textContent = weatherData.weather[0].description;
        document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `${weatherData.wind.speed} m/s`;
        document.getElementById('sunrise').textContent = formatTime(weatherData.sys.sunrise, weatherData.timezone);
        document.getElementById('sunset').textContent = formatTime(weatherData.sys.sunset, weatherData.timezone);

        // Set weather background
        setWeatherBackground(weatherData.weather[0].main);

        // Start updating time continuously
        updateCurrentTime(weatherData.timezone);
        // Update time every second
        if (window.timeInterval) clearInterval(window.timeInterval);
        window.timeInterval = setInterval(() => updateCurrentTime(weatherData.timezone), 1000);
    } catch (error) {
        console.error('Error updating weather UI:', error);
        showError('Error updating weather information');
    }
}

// Process forecast data to get daily forecasts
function processForecastData(forecastData) {
    const dailyForecasts = {};
    
    forecastData.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                dt: forecast.dt,
                temp: {
                    min: forecast.main.temp_min,
                    max: forecast.main.temp_max
                },
                weather: forecast.weather[0]
            };
        } else {
            // Update min/max temperatures
            dailyForecasts[date].temp.min = Math.min(dailyForecasts[date].temp.min, forecast.main.temp_min);
            dailyForecasts[date].temp.max = Math.max(dailyForecasts[date].temp.max, forecast.main.temp_max);
        }
    });

    return Object.values(dailyForecasts).slice(0, 8);
}

// Update forecast UI
function updateForecastUI(forecastData) {
    try {
        forecastGrid.innerHTML = '';
        const dailyForecasts = processForecastData(forecastData);

        dailyForecasts.forEach(day => {
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            forecastCard.innerHTML = `
                <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather.icon}@2x.png" 
                     alt="${day.weather.description}">
                <div class="temp-range">
                    <span class="max">${Math.round(day.temp.max)}°</span>
                    <span class="min">${Math.round(day.temp.min)}°</span>
                </div>
            `;
            forecastGrid.appendChild(forecastCard);
        });
    } catch (error) {
        console.error('Error updating forecast UI:', error);
        showError('Error updating forecast information');
    }
}

// Fetch weather data
async function fetchWeatherData(lat, lon) {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
            fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        ]);

        if (!weatherResponse.ok) {
            throw new Error(`Weather data not available: ${weatherResponse.statusText}`);
        }
        if (!forecastResponse.ok) {
            throw new Error(`Forecast data not available: ${forecastResponse.statusText}`);
        }

        const [weatherData, forecastData] = await Promise.all([
            weatherResponse.json(),
            forecastResponse.json()
        ]);

        if (!weatherData || !forecastData || !weatherData.main || !forecastData.list) {
            throw new Error('Invalid data received from weather service');
        }

        errorMessage.classList.add('hidden');
        weatherInfo.classList.remove('hidden');
        
        await updateWeatherUI(weatherData);
        updateForecastUI(forecastData);
    } catch (error) {
        showError(`Unable to get weather data: ${error.message}`);
        console.error('Error:', error);
    }
}

// Handle search
async function handleSearch(e) {
    e.preventDefault();
    const location = searchInput.value.trim();
    
    if (!location) {
        showError('Please enter a location');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`Location search failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data || data.length === 0) {
            throw new Error('Location not found');
        }

        fetchWeatherData(data[0].lat, data[0].lon);
    } catch (error) {
        showError(`Unable to find location: ${error.message}`);
        console.error('Error:', error);
    }
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherData(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                showError('Unable to get your location. Please search for a city.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser. Please search for a city.');
    }
}

// Toggle forecast visibility
function toggleForecast() {
    forecastGrid.classList.toggle('expanded');
    showMoreBtn.textContent = forecastGrid.classList.contains('expanded') ? 'Hide' : 'Show';
}

// Event listeners
searchForm.addEventListener('submit', handleSearch);
locationButton.addEventListener('click', getCurrentLocation);
showMoreBtn.addEventListener('click', toggleForecast);

// Initial check for API key before getting current location
if (API_KEY) {
    getCurrentLocation();
}
