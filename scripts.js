document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeather(location);
});

async function fetchWeather(location) {
    const apiKey = '2a48f7e53c265e22fbc08c60146168c2'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
    
    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        displayCurrentWeather(weatherData);
        
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    currentWeatherDiv.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Conditions: ${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';
    
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
    forecastList.forEach(item => {
        forecastDiv.innerHTML += `
            <div>
                <h3>${new Date(item.dt_txt).toLocaleDateString()}</h3>
                <p>Temperature: ${item.main.temp} °C</p>
                <p>Humidity: ${item.main.humidity} %</p>
                <p>Conditions: ${item.weather[0].description}</p>
            </div>
        `;
    });
}
