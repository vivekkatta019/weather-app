// app.js
document.addEventListener('DOMContentLoaded', () => {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "1031e82180981b48e6b9fba105594774";

    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const errorMessage = document.getElementById('errorMessage');
    const infoContainer = document.getElementById('info');
    const weatherImage = document.getElementById('weatherImage');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const tempMin = document.getElementById('tempMin');
    const tempMax = document.getElementById('tempMax');
    const feelsLike = document.getElementById('feelsLike');
    const weatherDescription = document.getElementById('weatherDescription');

    const getWeatherData = async (city) => {
        try {
            const response = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const jsonData = await response.json();
            return {
                city: city,
                temp: jsonData.main.temp,
                tempMin: jsonData.main.temp_min,
                tempMax: jsonData.main.temp_max,
                humidity: jsonData.main.humidity,
                feelsLike: jsonData.main.feels_like,
                weather: jsonData.weather[0].description
            };
        } catch (error) {
            throw error;
        }
    };

    const updateUI = (info) => {
        cityName.textContent = `City Name:${info.city}`;
        temperature.textContent = `Temperature: ${info.temp} °C`;
        humidity.textContent = `Humidity: ${info.humidity}%`;
        tempMin.textContent = `Min Temperature: ${info.tempMin} °C`;
        tempMax.textContent = `Max Temperature: ${info.tempMax} °C`;
        feelsLike.textContent = `Feels Like: ${info.feelsLike} °C`;
        weatherDescription.textContent = `Weather: ${info.weather}`;

        // Update image based on weather
        const hot_url = "https://media.istockphoto.com/id/1254065595/photo/hot-summer-or-heat-wave-background.jpg?s=1024x1024&w=is&k=20&c=FaZwWyck7yOcZQGFIFUsChGv532Wh8eN9nrk5tMyCkg=";
        const cold_url = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
        const rain_url = "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=is&k=20&c=GMlTyTFSxiKCiWyDI-NjFFN0RX6Z5yzRbdR3ThuJEyA=";

        weatherImage.src = info.humidity > 80 ? rain_url : (info.temp > 15) ? hot_url : cold_url;
        infoContainer.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    };

    const handleSearch = async () => {
        const city = cityInput.value;
        try {
            const info = await getWeatherData(city);
            updateUI(info);
        } catch (error) {
            errorMessage.classList.remove('hidden');
            infoContainer.classList.add('hidden');
        }
    };

    searchButton.addEventListener('click', handleSearch);
});
