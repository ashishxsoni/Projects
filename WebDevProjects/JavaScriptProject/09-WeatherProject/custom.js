const submit = document.querySelector("#search_btn");
const box = document.querySelector("#weather-info");
const API_KEY = ""; // Replace with your OpenWeatherMap API key

submit.addEventListener("click", () => {
  const city = document.querySelector("#city-input").value.trim(); // Get city value on button click

  if (city === "") {
    box.innerHTML = "<p class='text-lg' >Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found or network error");
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
        console.log("Weather Data:", data); // Debugging

        // Populate weather info
        box.innerHTML = `
          <h2 class="text-2xl font-bold mb-2">Weather in ${data.name}, ${data.sys.country}</h2>
          <p class="text-lg"><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p class="text-lg"><strong>Weather:</strong> ${data.weather[0].description}</p>
          <p class="text-lg"><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p class="text-lg"><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
          <img class="mx-auto mt-3" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        `;
    
        // Apply Tailwind classes to style the weather info box
        box.setAttribute(
            "class",
            "bg-gray-700 text-white p-4 mt-4 rounded-lg shadow-md border border-gray-600 text-center"
        );
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      box.innerHTML = "<p>City not found. Please try again.</p>";
    });
});



/* 
Check Json Format using Google via full Url Including Api 
    in this JSON response:

    "coord": Contains the coordinates of the location (longitude and latitude).
    "weather": An array of weather conditions. Each element provides details like weather ID, main description, detailed description, and icon code.
    "main": Includes main weather parameters: temperature, pressure, humidity, minimum and maximum temperatures.
    "wind": Provides wind speed and direction.
    "clouds": Contains cloudiness information.
    "sys": System data, including country code, sunrise, and sunset times.
    "name": The name of the city.
    "cod": Internal parameter indicating the status of the response.

     */