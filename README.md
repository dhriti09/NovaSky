
 📋 Project Description

The NovaSky Weather App is a front-end web application that provides users with real-time weather updates for any city worldwide. By integrating the **OpenWeatherMap API**, the app fetches current conditions including temperature, humidity, wind speed, and atmospheric pressure.

What sets this project apart is its **interactive data visualization**: it utilizes **Google Charts** to render a 12-hour temperature forecast trend with custom HTML tooltips. The interface is highly immersive, starting with a video background that transitions into thematic high-definition images (Rain, Snow, Clouds, etc.) based on the city's current weather state.

---

 🛠️ Key Features

* **Real-time Data:** Fetches live weather metrics using the `OpenWeatherMap API`.
* **Dynamic Visuals:** The background video/image changes automatically to match the weather status (e.g., Thunderstorm, Haze, Clear).
* **Interactive Forecast Chart:** An `AreaChart` displays the temperature trend for the next 12 hours with emoji-based status icons and custom tooltips.
* **Responsive Glassmorphism Design:** A modern, translucent UI built with CSS backdrop filters that works seamlessly across desktops and mobile devices.
* **Intuitive Search:** Supports both button clicks and "Enter" key triggers for a smooth user experience.

---
 🗂️ Tech Stack

**Frontend**  HTML5, CSS3 (Flexbox/Grid, Animations) 
**Scripting**  JavaScript (ES6+, Async/Await) 
**API**  OpenWeatherMap (Current & OneCall APIs) 
**Charts**  Google Visualization API (Corechart) 

---

## 🚀 How to Use

1. **Clone the Repository:**   `
git clone : https://github.com/dhriti09/Novasky.git



2. **API Key:** The project currently uses a hardcoded API key. For production, it is recommended to use your own key from [OpenWeatherMap](https://openweathermap.org/api).
3. **Launch:** Open `index.html` in any modern web browser.
4. **Search:** Enter a city name (e.g., "London" or "Tokyo") and hit Enter to see the magic happen.

---

## 📸 Preview Logic

The application uses a specific logic to switch environments based on the API response:

Clear: Sunny background.
Clouds/Haze/Mist: Overcast/Foggy imagery.
Rain/Thunderstorm: Rainy or lightning visuals.
Snow: Winter/Snowy landscapes.

