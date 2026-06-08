// ===== STATE =====
let temperatures = [];
let currentUnit = 'C'; // 'C' or 'F'
let lastWeatherData = null;
let lastForecastData = null;
const API_KEY = 'd3383bcd0dc8e166ea2bb8a958140f4f';
let total_dataEntries = [];

// ===== UNIT HELPERS =====
function toDisplay(tempC) {
    if (currentUnit === 'F') return Math.round((tempC * 9/5) + 32);
    return Math.round(tempC);
}
function unitLabel() { return currentUnit === 'F' ? '°F' : '°C'; }

// ===== THEME TOGGLE =====
function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeIcon').textContent = saved === 'dark' ? '☀️' : '🌙';
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.getElementById('themeIcon').textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
});

// ===== UNIT TOGGLE =====
document.getElementById('celsiusBtn').addEventListener('click', () => {
    currentUnit = 'C';
    document.getElementById('celsiusBtn').classList.add('active');
    document.getElementById('fahrenheitBtn').classList.remove('active');
    refreshDisplayedData();
});

document.getElementById('fahrenheitBtn').addEventListener('click', () => {
    currentUnit = 'F';
    document.getElementById('fahrenheitBtn').classList.add('active');
    document.getElementById('celsiusBtn').classList.remove('active');
    refreshDisplayedData();
});

function refreshDisplayedData() {
    if (lastWeatherData) displayWeather(lastWeatherData);
    if (lastForecastData) displayForecast(lastForecastData);
}

// ===== SEARCH HISTORY =====
function getHistory() {
    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
}

function addToHistory(city) {
    let history = getHistory();
    history = history.filter(c => c.toLowerCase() !== city.toLowerCase());
    history.unshift(city);
    if (history.length > 6) history = history.slice(0, 6);
    localStorage.setItem('searchHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('search-history');
    const history = getHistory();
    container.innerHTML = '';
    if (history.length === 0) return;

    const label = document.createElement('span');
    label.style.cssText = 'font-size:11px;color:var(--text-muted);align-self:center;margin-right:4px;';
    label.textContent = 'Recent:';
    container.appendChild(label);

    history.forEach(city => {
        const chip = document.createElement('button');
        chip.className = 'history-chip';
        chip.innerHTML = `<span class="chip-icon">🕐</span>${city}`;
        chip.addEventListener('click', () => {
            document.getElementById('cityInput').value = city;
            WeatherData();
        });
        container.appendChild(chip);
    });
}

// ===== GEOLOCATION =====
document.getElementById('geoBtn').addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }
    document.getElementById('geoBtn').textContent = '⏳';
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );
                const data = await res.json();
                document.getElementById('cityInput').value = data.name;
                document.getElementById('geoBtn').textContent = '📍';
                WeatherData();
            } catch {
                alert('Could not detect location weather.');
                document.getElementById('geoBtn').textContent = '📍';
            }
        },
        () => {
            alert('Location access denied. Please allow location or type a city name.');
            document.getElementById('geoBtn').textContent = '📍';
        }
    );
});

// ===== MAIN WEATHER FETCH =====
async function WeatherData() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) { alert('Please enter a city name.'); return; }

    document.getElementById('spinner').style.display = 'flex';
    temperatures = [];

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (res.ok) {
            const data = await res.json();
            if (data.cod === 200) {
                lastWeatherData = data;
                displayWeather(data);
                addToHistory(data.name);
                await fetchForecast(city);
            } else {
                throw new Error(data.message);
            }
        } else {
            const err = await res.json();
            throw new Error(err.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        document.getElementById('spinner').style.display = 'none';
    }
}

async function fetchForecast(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (res.ok) {
        const data = await res.json();
        lastForecastData = data.list;
        total_dataEntries = data.list;
        displayForecast(data.list);
    } else {
        const err = await res.json();
        throw new Error(err.message);
    }
}

// ===== DISPLAY WEATHER =====
function displayWeather(data) {
    const widget = document.getElementById('weather-widget');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temp = toDisplay(data.main.temp);
    const feelsLike = toDisplay(data.main.feels_like);
    const unit = unitLabel();

    widget.innerHTML = `
        <h2>
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            ${data.name}, ${data.sys.country}
        </h2>
        <div class="weather-stats">
            <div class="weather-stat">
                <div class="stat-label">Temperature</div>
                <div class="stat-value">${temp}<span class="stat-unit"> ${unit}</span></div>
            </div>
            <div class="weather-stat">
                <div class="stat-label">Feels Like</div>
                <div class="stat-value">${feelsLike}<span class="stat-unit"> ${unit}</span></div>
            </div>
            <div class="weather-stat">
                <div class="stat-label">Humidity</div>
                <div class="stat-value">${data.main.humidity}<span class="stat-unit"> %</span></div>
            </div>
            <div class="weather-stat">
                <div class="stat-label">Wind</div>
                <div class="stat-value">${data.wind.speed}<span class="stat-unit"> m/s</span></div>
            </div>
            <div class="weather-stat">
                <div class="stat-label">Condition</div>
                <div class="stat-value" style="font-size:14px;text-transform:capitalize">${data.weather[0].description}</div>
            </div>
        </div>
    `;
    BackgroundImage(data.weather[0].description);
}

// ===== DISPLAY FORECAST =====
function displayForecast(data) {
    const table = document.getElementById('forecast-table');
    const unit = unitLabel();

    table.innerHTML = `
        <thead>
            <tr>
                <th>Date & Time</th>
                <th>Temp (${unit})</th>
                <th>Feels Like (${unit})</th>
                <th>Condition</th>
                <th>Humidity</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');

    let Temperatures = [];
    const weatherConditionsCount = {};
    temperatures = [];

    data.forEach(entry => {
        const date = new Date(entry.dt * 1000).toLocaleString();
        const temp = toDisplay(entry.main.temp);
        const feelsLike = toDisplay(entry.main.feels_like);
        const condition = entry.weather[0].description;
        const humidity = entry.main.humidity;
        const icon = entry.weather[0].icon;

        tbody.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${temp} ${unit}</td>
                <td>${feelsLike} ${unit}</td>
                <td style="text-transform:capitalize; display:flex; align-items:center; gap:6px;">
                    <img src="https://openweathermap.org/img/wn/${icon}.png" style="width:28px;height:28px;" alt="">
                    ${condition}
                </td>
                <td>${humidity}%</td>
            </tr>
        `;

        temperatures.push(toDisplay(entry.main.temp));
        Temperatures.push(toDisplay(entry.main.temp));
        weatherConditionsCount[condition] = (weatherConditionsCount[condition] || 0) + 1;
    });

    // Update summary stats
    updateStatsCards(Temperatures, unit);
    chart_Maker(Temperatures, weatherConditionsCount);
}

// ===== SUMMARY STATS CARDS =====
function updateStatsCards(temps, unit) {
    if (!temps.length) return;
    document.getElementById('stats-cards').style.display = 'grid';
    document.getElementById('stat-high').textContent = `${Math.max(...temps)} ${unit}`;
    document.getElementById('stat-low').textContent = `${Math.min(...temps)} ${unit}`;
    document.getElementById('stat-avg').textContent = `${(temps.reduce((a,b) => a+b, 0) / temps.length).toFixed(1)} ${unit}`;
    document.getElementById('stat-count').textContent = `${temps.length} pts`;
}

// ===== TEMPERATURE HELPERS =====
function getHighestTemperature(arr) { return Math.max(...arr).toFixed(1); }
function getlowestTemperature(arr) { return Math.min(...arr).toFixed(1); }
function getaverageTemperature(arr) { return (arr.reduce((a,b) => a+b, 0) / arr.length).toFixed(1); }

function sortTemperaturesAscending() {
    total_dataEntries.sort((a, b) => a.main.temp - b.main.temp);
    displayForecast(total_dataEntries);
}
function sortTemperaturesDecending() {
    total_dataEntries.sort((a, b) => b.main.temp - a.main.temp);
    displayForecast(total_dataEntries);
}

// ===== NAV =====
document.getElementById('getWeatherBtn').addEventListener('click', WeatherData);
document.getElementById('cityInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') WeatherData();
});

function Table_details() {
    document.getElementById('weather-details').style.display = 'none';
    document.getElementById('forecast-container').style.display = 'block';
    document.getElementById('chatbox-container').style.display = 'block';
    document.querySelector('.for_forcast_chatbox_container').style.display = 'flex';
}
function Dashboard_details() {
    document.getElementById('weather-details').style.display = 'block';
    document.getElementById('forecast-container').style.display = 'none';
    document.getElementById('chatbox-container').style.display = 'none';
    document.querySelector('.for_forcast_chatbox_container').style.display = 'none';
}

document.getElementById('table').addEventListener('click', Table_details);
document.getElementById('dashboard').addEventListener('click', Dashboard_details);

// ===== BACKGROUND IMAGE =====
function BackgroundImage(desc) {
    const widget = document.getElementById('weather-widget');
    const map = {
        'light rain': 'Images/light_rain.jpeg',
        'moderate rain': 'Images/light_rain.jpeg',
        'heavy rain': 'Images/light_rain.jpeg',
        'scattered clouds': 'Images/scattered_clouds.jpeg',
        'clear sky': 'Images/clear_sky.jpeg',
        'haze': 'Images/haze.jpeg',
        'overcast clouds': 'Images/overcast_clouds.jpeg',
        'few clouds': 'Images/clouds.jpeg',
        'broken clouds': 'Images/broken_clouds.jpeg',
        'mist': 'Images/mist.jpeg',
        'smoke': 'Images/smoke.jpeg',
    };
    widget.style.backgroundImage = `url('${map[desc] || 'Images/sunny.jpg'}')`;
}

// ===== INIT =====
initTheme();
renderHistory();