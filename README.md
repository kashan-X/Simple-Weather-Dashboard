#  WeatherNow Dashboard

> A sleek, real-time weather dashboard with 5-day forecasts, data visualizations, and a built-in weather assistant chatbot.

**Live Demo:** [weather-forcaster-2.netlify.app](https://weather-forcaster-2.netlify.app/)

---

##  Overview

WeatherNow Dashboard is a fully client-side web application that fetches live weather data using the OpenWeatherMap API. Users can search any city worldwide to get current conditions, a detailed 5-day forecast, temperature analytics with charts, and interact with a basic weather assistant chatbot all wrapped in a polished dark/light themed UI.

---

##  Features

###  Current Weather
- Real-time temperature, feels-like, humidity, and wind speed
- Dynamic background images that change based on weather condition (rain, clear sky, mist, haze, etc.)
- Weather condition icon from OpenWeatherMap

###  5-Day Forecast Table
- Full 40-entry (3-hour interval) forecast data in a clean table
- Columns: Date & Time, Temperature, Feels Like, Condition (with icon), Humidity
- Sort forecast by temperature — ascending (`weather asort`) or descending (`weather dsort`) via chatbot

###  Temperature Analytics (Charts)
Three live-rendered charts using **Chart.js**:
- **Bar Chart** – Temperature across the first 5 forecast periods
- **Doughnut Chart** – Distribution of weather conditions (e.g., rain, clear, clouds)
- **Line Trend Chart** – Temperature trend across the first 5 forecast periods

###  Summary Stats Cards
Quick-glance cards showing:
-  Highest temperature
-  Lowest temperature
-  Average temperature
-  Total forecast data points

###  Weather Assistant Chatbot
An interactive chatbox supporting natural-language-style commands:

| Command | Response |
|---|---|
| `weather today` | Confirms current loaded city |
| `weather highest` | Returns highest temperature |
| `weather lowest` | Returns lowest temperature |
| `weather average` | Returns average temperature |
| `weather asort` | Sorts forecast ascending by temperature |
| `weather dsort` | Sorts forecast descending by temperature |
| `filter <condition>` | Filters forecast table by weather condition (e.g. `filter rain`) |

###  Geolocation Support
- "Use my location" button auto-detects the user's coordinates and fetches weather for their current city

###  Search History
- Last 6 searched cities stored in `localStorage`
- Clickable chips to instantly re-fetch any previous city

###  Dark / Light Theme
- Toggle between dark (default) and light themes
- Theme preference saved to `localStorage`

###  Unit Toggle (°C / °F)
- Switch between Celsius and Fahrenheit at any time
- All displayed temperatures, charts, and table values update instantly

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | App structure and layout |
| **CSS3** | Custom styling with CSS variables for dual theming |
| **Vanilla JavaScript (ES6+)** | All logic — API calls, DOM manipulation, chart rendering |
| **Chart.js** | Bar, Doughnut, and Line chart rendering |
| **OpenWeatherMap API** | Current weather + 5-day forecast data |
| **Geolocation API** | Browser-based location detection |
| **LocalStorage** | Theme preference and search history persistence |
| **Google Fonts** | `Space Grotesk` + `JetBrains Mono` typography |
| **Netlify** | Live deployment and hosting |

---

##  Project Structure

```
Simple-Weather-Dashboard/
│
├── design.html          # Main HTML entry point
├── design.css           # All styles with dark/light CSS variable theming
├── design.js            # Core logic: API fetching, display, navigation, history, geolocation
├── chart.js             # Chart.js chart initialization (bar, doughnut, line)
├── Chatbox.js           # Weather assistant chatbot logic
├── README.md            # Project documentation
│
└── Images/
    ├── logo1.png
    ├── picture.jpg
    ├── light_rain.jpeg
    ├── scattered_clouds.jpeg
    ├── clear_sky.jpeg
    ├── haze.jpeg
    ├── overcast_clouds.jpeg
    ├── clouds.jpeg
    ├── broken_clouds.jpeg
    ├── mist.jpeg
    ├── smoke.jpeg
    └── sunny.jpg
```

---

##  Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- An active internet connection (for API calls and Google Fonts)
- *(Optional)* A local server like VS Code Live Server for best results

### Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kashan-code/Simple-Weather-Dashboard.git
   ```

2. **Navigate to the project folder:**
   ```bash
   cd Simple-Weather-Dashboard
   ```

3. **Open the app:**
   - Simply open `design.html` in your browser, **or**
   - Use VS Code's Live Server extension for a better local experience

>  The OpenWeatherMap API key is included in `design.js` for demo purposes. For production use, move it to a backend or environment variable.

---

##  API Reference

This project uses two **OpenWeatherMap** endpoints:

| Endpoint | Used For |
|---|---|
| `api.openweathermap.org/data/2.5/weather` | Current weather by city name or coordinates |
| `api.openweathermap.org/data/2.5/forecast` | 5-day / 3-hour forecast by city name |

Sign up for a free API key at [openweathermap.org](https://openweathermap.org/api).

---

##  UI Pages

| View | Description |
|---|---|
| **Dashboard** | Search bar, current weather widget, summary stats, 3 charts |
| **Forecast Table** | Full 40-row forecast table + chatbot side panel |

Navigation between views is handled via the sidebar (`Dashboard` / `Forecast Table` links).

---

##  Design Highlights

- **Dual theme system** using CSS custom properties (`--bg-base`, `--accent`, `--text-primary`, etc.) — zero JS needed to restyle
- **Dynamic weather backgrounds** — the widget hero image changes based on the live weather condition
- **Responsive stat grid** — auto-fills columns based on available width
- **Sticky chatbot** — the assistant panel stays in view while scrolling the forecast table
- **Animated charts** — all three Chart.js charts use eased 1.5s animations on render

---

##  Known Limitations

- The chatbot is rule-based (keyword matching) — it does not use an AI/NLP backend
- Background images must be manually provided in the `Images/` folder; missing images fall back gracefully
- The API key is exposed client-side — not recommended for production deployment without a proxy

---

##  Contributing

Contributions are welcome! Feel free to:
- Open an issue for bugs or feature requests
- Fork the repo and submit a pull request

---

##  Author

**Kashan**
- GitHub: [@kashan-code](https://github.com/kashan-X)
- Live Project: [weather-forcaster-2.netlify.app](https://weather-forcaster-2.netlify.app/)

---

##  License

This project is open source and available under the [MIT License](LICENSE).
