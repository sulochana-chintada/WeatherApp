const apiKey = "3045dd712ffe6e702e3245525ac7fa38";

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const weatherIcon = data.weather[0].icon;
    const weatherDescription = data.weather[0].main;
    const date = new Date(data.dt * 1000);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    const city = data.name;
    const country = data.sys.country;

    const weatherContainer = document.createElement('div');
    weatherContainer.classList.add('weather');

    weatherContainer.innerHTML = `
       
        
       <h1> <p><b>City: ${city}, ${country}</b></p></h1>
       <h3> <p>Time: ${timeStr} , Date: ${dateStr}</p>
        </h3>
        <h1>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"/> </h1>
        <p><h1><b>Condition: ${weatherDescription}</b></h1></p>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${windSpeed} m/s</p>
        <p>Pressure: ${pressure} hPa</p>
        
    `;

    const main = document.getElementById('main');
    main.innerHTML = "";
    main.appendChild(weatherContainer);
}

function Ktoc(K) {
    return Math.round(K - 273.15);
}


const form = document.getElementById('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = document.getElementById('search').value.trim();
    if (city !== '') {
        try {
            const response = await fetch(url(city));
            const data = await response.json();
            addWeatherToPage(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
});