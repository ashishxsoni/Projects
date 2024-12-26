const input = document.querySelector('city-input').val;
const submit = document.querySelector('search_btn');
const box = document.querySelector('weather-info');


const API_KEY = '9dda46c07c694e7fb1e142045242612'; // Replace with your OpenWeatherMap API key
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log('Weather Data:', data); // Process the data
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
