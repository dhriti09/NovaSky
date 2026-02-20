const weatherApi = {
    key: "828cc99e0335c9476a8f751b7c386d9a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

let dat, lat, long;

const searchInputBox = document.getElementById('input-box');
const searchButton = document.getElementById('button');

// Search on Enter Key
searchInputBox.addEventListener('keypress', async (event) => {
    if (event.keyCode === 13) {
        if (searchInputBox.value.trim() !== "") {
            await getWeatherReport(searchInputBox.value);
            document.querySelector('.weather-body').style.display = "block";
        }
    }
});

// Search on Button Click
searchButton.addEventListener("click", async () => {
    if (searchInputBox.value.trim() !== "") {
        await getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

// Fetch Weather Data
async function getWeatherReport(city) {
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('City not found');
        }

        showWeatherReport(data);
        lat = data.coord.lat;
        long = data.coord.lon;
        await fetching(); 
    } catch (err) {
        console.error(err);
        showErrorMessage();
    }
}

function showErrorMessage() {
    document.getElementById('city').innerText = 'City Not Found!';
    document.getElementById('date').innerText = '';
    document.getElementById('temp').innerText = '';
    document.getElementById('min-max').innerText = '';
    document.getElementById('weather').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('wind').innerText = '';
    document.getElementById('pressure').innerText = '';
    document.querySelector("#myChart").style.display = "none";
}

// Update UI with Data
function showWeatherReport(weather) {
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let humidity = document.getElementById('humidity');
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;

    let wind = document.getElementById('wind');
    wind.innerText = `Wind: ${weather.wind.speed} kmph`;

    let press = document.getElementById('pressure');
    press.innerText = `Pressure: ${weather.main.pressure} hPa`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    showWeatherImage(weatherType.innerText);
}

// Background Change Logic
function showWeatherImage(type) {
    const body = document.body;
    const video = document.getElementById('bg-video');

    if (video) {
        video.style.display = "none"; 
    }

    if (type === 'Clear') {
        body.style.backgroundImage = "url('clear1.jpg')";
    } else if (type === 'Clouds') {
        body.style.backgroundImage = "url('clouds.jpg')";
    } else if (type === 'Haze' || type === 'Mist') {
        body.style.backgroundImage = "url('clouds.jpg')";
    } else if (type === 'Rain') {
        body.style.backgroundImage = "url('rain.jpg')";
    } else if (type === 'Snow') {
        body.style.backgroundImage = "url('snow.jpg')";
    } else if (type === 'Thunderstorm') {
        body.style.backgroundImage = "url('thunder.jpg')";
    } else {
        body.style.backgroundImage = "url('Clear1.jpg')";
    }
}

// Icons Insertion
function addIcons() {
    const icons = [
        { id: "himg", src: "icons8-humidity-64.png" },
        { id: "wimg", src: "icons8-wind-64.png" },
        { id: "pimg", src: "gauge (1).png" }
    ];

    icons.forEach(icon => {
        let container = document.getElementById(icon.id);
        if (container && container.innerHTML === "") {
            let img = document.createElement("img");
            img.src = icon.src;
            img.height = 40;
            container.appendChild(img);
        }
    });
}
addIcons();

// Date Formatter
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

// Hourly Forecast for Chart
async function fetching() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,daily&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            dat = data;
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
        }
    } catch (err) {
        console.error("Chart Fetch Error:", err);
    }
}

// YAHAN CHANGES KIYE GAYE HAIN (New Enhanced drawChart)
function drawChart() {
    if (!dat || !dat.hourly) return;

    // Tooltip role 'html' enable kiya
    const chartData = [
        ['Time', 'Temp', { role: 'style' }, { role: 'tooltip', type: 'string', 'p': { 'html': true } }]
    ];
    
    for (let i = 0; i < 12; i++) {
        let timeLabel = format(new Date(dat.hourly[i].dt * 1000));
        let temp = Math.floor(dat.hourly[i].temp);
        let weatherMain = dat.hourly[i].weather[0].main;

        // Emoji Symbols (Bina external image ke icon)
        let symbol = "☀️"; 
        if (weatherMain === "Clear") symbol = "☀️";
        else if (weatherMain === "Clouds") symbol = "☁️";
        else if (weatherMain === "Rain") symbol = "🌧️";
        else if (weatherMain === "Thunderstorm") symbol = "⚡";
        else if (weatherMain === "Snow") symbol = "❄️";
        else if (weatherMain === "Haze" || weatherMain === "Mist") symbol = "🌫️";

        // Custom Tooltip Design
        let tooltipHtml = `
            <div style="padding:10px; background: rgba(0, 0, 0, 0.85); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white; min-width: 90px; text-align: center; font-family: 'Segoe UI', Tahoma, sans-serif;">
                <div style="font-size: 11px; margin-bottom: 3px; opacity: 0.7;">${timeLabel}</div>
                <div style="font-size: 22px; margin: 2px 0;">${symbol}</div>
                <div style="font-size: 16px; font-weight: bold;">${temp}°C</div>
                <div style="font-size: 11px; margin-top: 3px; color: #aaa;">${weatherMain}</div>
            </div>
        `;

        chartData.push([timeLabel, temp, 'color: white', tooltipHtml]);
    }

    const dataTable = google.visualization.arrayToDataTable(chartData);

    const options = {
        title: 'Temperature Trend (Next 12 Hours)',
        titleTextStyle: { color: 'white', fontSize: 16 },
        hAxis: { 
            textStyle: {color: 'white', fontSize: 10},
            gridlines: { color: 'transparent' }
        },
        vAxis: { 
            textStyle: {color: 'white', fontSize: 10},
            gridlines: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        legend: 'none',
        backgroundColor: 'transparent',
        chartArea: { width: '85%', height: '70%' },
        curveType: 'function', 
        colors: ['#ffffff'],
        // HTML Tooltip enable kiya
        tooltip: { isHtml: true, trigger: 'both', ignorebounds: true },
        focusTarget: 'category',
        pointSize: 6,
        dataOpacity: 0.8
    };

    document.querySelector("#myChart").style.display = "block";
    const chart = new google.visualization.AreaChart(document.getElementById('myChart'));
    chart.draw(dataTable, options);
}

function format(date) {
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ampm;
}

window.onresize = () => {
    if (dat) drawChart();
};