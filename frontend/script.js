
document.addEventListener('DOMContentLoaded', () => {

    const defaultCity = "New Delhi";
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
        updateWeatherInfo(lastSearchedCity);
        updateForecastInfo(lastSearchedCity);
    } else {
        updateWeatherInfo(defaultCity);
        updateForecastInfo(defaultCity);
    }


    const container = document.getElementById('todayForecastContainerRef');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');


    const scroll = (direction) => {
        if (!container) return;
        const scrollAmount = container.offsetWidth * 0.8;
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    if (leftBtn) leftBtn.addEventListener('click', () => scroll('left'));
    if (rightBtn) rightBtn.addEventListener('click', () => scroll('right'));
});

const cityInput = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() != "") {
        updateWeatherInfo(cityInput.value);
        updateForecastInfo(lastSearchedCity);
        console.log(cityInput.value);
        cityInput.value = "";
        cityInput.blur()
    }

})

cityInput.addEventListener("keydown", (event) => {

    if (event.key.trim() == "Enter" && cityInput.value.trim() != "") {
        updateWeatherInfo(cityInput.value);
        updateForecastInfo(cityInput.value);
        console.log(cityInput.value);
        cityInput.value = "";
        cityInput.blur()
    }

})


function getCloudConditionShort(text) {
    const cloudCondition = {

        // Rain (1063-1246)
        "Patchy rain possible": "Patchy rain",
        "Patchy rain in nearby": "Rain nearby",
        "Patchy light drizzle": "Light drizzle",
        "Patchy light in nearby": "Light neaby",
        "Light drizzle": "Drizzle",
        "Patchy rain nearby": "Rain nearby",
        "Patchy light rain": "Light rain",
        "Light rain": "Rain",
        "Moderate rain at times": "Mod rain",
        "Moderate rain": "Mod rain",
        "Heavy rain at times": "Heavy rain",
        "Moderate or heavy rain in area with thunder": "Heavy rain",
        "Heavy rain": "Heavy rain",
        "Light freezing rain": "Freeze rain",
        "Moderate or heavy freezing rain": "Heavy frz rain",
        "Light rain shower": "Rain shower",
        "Moderate or heavy rain shower": "Heavy shower",
        "Torrential rain shower": "Torrential rain",

        // Snow (1066-1264)
        "Patchy snow possible": "Patchy snow",
        "Patchy snow nearby": "snow nearby",
        "Patchy light snow": "Light snow",
        "Light snow": "Snow",
        "Patchy moderate snow": "Mod snow",
        "Moderate snow": "Mod snow",
        "Patchy heavy snow": "Heavy snow",
        "Heavy snow": "Heavy snow",
        "Light snow showers": "Snow showers",
        "Moderate or heavy snow showers": "Heavy snow showers",
        "Moderate or heavy snow showers ": "Heavy snow showers",
        "Light sleet": "Sleet",
        "Moderate or heavy sleet": "Heavy sleet",
        "Patchy sleet possible": "Patchy sleet",
        "Light sleet showers": "Sleet showers",
        "Moderate or heavy sleet showers": "Heavy sleet",

        // Thunder (1087-1282)
        "Thundery outbreaks possible": "Thunder",
        "Thundery outbreaks in nearby": "Thunder nearby",
        "Patchy light rain with thunder": "T-storm",
        "Moderate or heavy rain with thunder": "Heavy storm",
        "Patchy light snow with thunder": "Snow T-storm",
        "Moderate or heavy snow with thunder": "snow T-storm",

        // Fog/Mist (1030-1147)
        "Mist": "Mist",
        "Fog": "Fog",
        "Freezing fog": "Frz fog",
        "Patchy freezing drizzle nearby": "Frz drizzle",

        // Extreme (1114-1276)
        "Blowing snow": "Blowing snow",
        "Blizzard": "Blizzard",
        "Ice pellets": "Ice pellets",
        "Light showers of ice pellets": "Ice showers",
        "Moderate or heavy showers of ice pellets": "Heavy ice",
        "Sandstorm": "Sandstorm",
        "Duststorm": "Duststorm",

        // Special cases
        "Patchy freezing drizzle": "Frz drizzle",
        "Patchy freezing drizzle in nearby": "Frz nearby",
        "Freezing drizzle": "Frz drizzle",
        "Heavy freezing drizzle": "Heavy frz drizzle",
        "Patchy light snow with thunder": "Snow T-storm",

    }
    return cloudCondition[text] || text;
}

function getCloudIcon(text) {

    const cloudIcon = {

        // Sunny/Clear
        "Sunny": "☀️",
        "Sunny ": "☀️",
        "Clear ": "🌙",
        "Clear": "🌙",

        // Cloudy
        "Partly Cloudy": "⛅",
        "Partly Cloudy ": "⛅",
        "Partly cloudy": "⛅",
        "Partly cloudy ": "⛅",
        "Cloudy": "☁️",
        "Cloudy ": "☁️",
        "Overcast": "☁️",
        "Overcast ": "☁️",

        // Rain
        "Patchy rain possible": "🌦️",
        "Patchy rain nearby": "🌦️",
        "Light rain": "🌧️",
        "Rain shower ": "🌧️",
        "Light rain shower": "🌧️",
        "Moderate or heavy rain shower": "🌧️",
        "Light rain ": "🌧️",
        "Moderate rain": "🌧️",
        "Drizzle": "🌧️",
        "Heavy rain": "🌨️", // Using cloud+rain emoji
        "Light freezing rain": "🌧️",
        "Moderate or heavy freezing rain": "🌧️",

        // Snow
        "Light snow": "❄️",
        "Moderate snow": "❄️",
        "Heavy snow": "❄️",
        "Light snow showers": "❄️",
        "Moderate or heavy snow showers": "❄️",
        "Blowing snow": "🌬️",
        "Blizzard": "❄️",

        // Thunder
        "Thundery outbreaks possible": "🌩️",
        "Thundery outbreaks possible ": "🌩️",
        "Thunderstorm": "⛈️", // Single cloud+lightning emoji
        "Thunderstorm ": "⛈️", // Single cloud+lightning emoji
        "Patchy light rain with thunder": "⛈️",
        "Patchy light rain with thunder ": "⛈️",
        "Thundery outbreaks in nearby": "⛈️",
        "Moderate or heavy rain with thunder": "⛈️",
        "Moderate or heavy rain in area with thunder": "⛈️",
        "Patchy light rain with thunder": "⛈️",

        // Fog/Mist
        "Mist": "🌫️",
        "Mist ": "🌫️",
        "Fog": "🌁",
        "Fog ": "🌁",
        "Freezing fog": "",
        "Patchy freezing drizzle nearby": "🌁",

        // Extreme
        "Tornado": "🌪️",
        "Hail": "🌨️", // Ice emoji
        "Freezing fog": "🌁",

        // Dust/Sand
        "Sandstorm": "🌪️",
        "Duststorm": "🌪️",

        // Default
        "Unknown": "🌈"
    };

    return cloudIcon[text] || cloudIcon["Unknown"];
}

function getCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString("en-GB", options);
}


async function getFetchData(city) {
    const apiUrl = `https://weatherly-app-backend.onrender.com/api/current?city=${city}` ;
    try {
        const response = await fetch(apiUrl);
        return response.json();

    }
    catch (error) {
        console.error("Weather Data Fetching Failed:", error)
        return false;
    }

}

async function updateWeatherInfo(city) {

    const weatherData = await getFetchData(city);

    if (weatherData) {
        // Save to localStorage
        localStorage.setItem('lastSearchedCity', city);

        console.log(weatherData);

        const {
            location: { name },
            current: { humidity, temp_c, uv, feelslike_c, wind_kph, pressure_mb, condition: { text } },

        } = weatherData;

        document.querySelector(".city-txt").textContent = name;
        document.querySelector(".temp-txt").textContent = Math.round(temp_c) + '°C';
        document.querySelector(".day-date-txt").textContent = getCurrentDate();
        document.querySelector(".cloud-condition-txt").textContent = text;
        document.querySelector(".cloud-icon-txt").textContent = getCloudIcon(text);


        document.querySelector(".real-feel-txt").textContent = Math.round(feelslike_c) + '°C';
        document.querySelector(".humidity-txt").textContent = humidity + '%';
        document.querySelector(".wind-txt").textContent = Math.round(wind_kph) + ' km/h';
        document.querySelector(".uv-index-txt").textContent = Math.round(uv) + ' of 11';
        document.querySelector(".pressure-txt").textContent = pressure_mb + "mb";

    }
}


async function getFetchForecastData(city) {
    const apiForecastUrl = `https://weatherly-app-backend.onrender.com/api/forecast?city=${city}` ;
    try {
        const response = await fetch(apiForecastUrl);
        return response.json();

    }
    catch (error) {
        console.error("Forecast Fetching Failed:", error)
        return false;
    }
}


async function updateForecastInfo(city) {
    const forecastData = await getFetchForecastData(city);
    if (!forecastData) return;


    if (forecastData) {
        // Save to localStorage
        localStorage.setItem('lastSearchedCity', city);

        console.log(forecastData);

        const {

            forecast: {
                forecastday: [{ day: { daily_chance_of_rain } }]
            },
            forecast: { forecastday },

        } = forecastData;

        document.querySelector(".rain-chance-txt").textContent = daily_chance_of_rain + "%";

        //Hourly Forecast

        const nowTime = new Date();
        const currentHour = nowTime.getHours();

        // 1. Get today's remaining hours (current hour → 23:00)
        const todayHours = forecastday[0].hour
            .filter(hour => new Date(hour.time).getHours() >= currentHour);

        // 2. Get next day's hours (00:00 → 01:00)
        const remainingHours = 24 - todayHours.length;
        const tomorrowHours = forecastData.forecast.forecastday[1]?.hour
            ?.slice(0, remainingHours) || [];


        const hourlyForecast = [...todayHours, ...tomorrowHours];

        hourlyForecast.forEach((hour, i) => {
            const hourlyForecastElement = document.querySelector(`.forecast-hour-${i}`);
            if (hourlyForecastElement) {

                hourlyForecastElement.querySelector(".forecast-hour-txt").textContent = hour.time.slice(11);
                hourlyForecastElement.querySelector(".forecast-hour-temp-txt").textContent = `${Math.round(hour.temp_c)}°C`;
                hourlyForecastElement.querySelector(".forecast-hour-cloud-icon-txt").textContent = getCloudIcon(hour.condition.text);
                hourlyForecastElement.querySelector(".forecast-hour-cloud-condition-txt").textContent = getCloudConditionShort(hour.condition.text);

            }
        });


        const fiveDaysForecast = forecastday.slice(0, 3);

        fiveDaysForecast.forEach((day, i) => {
            const fiveDaysForecastElement = document.querySelector(`.forecast-fivedays-day-${i}`);

            if (!fiveDaysForecastElement) {
                console.error(`Element .forecast-fivedays-day-${i} not found`);
                return; // Skip this iteration if element doesn't exist
            }

            const date = new Date(day.date);
            const dayName = date.toLocaleDateString("en-US", { weekday: 'long', timeZone: 'UTC' });
            const formattedDate = `${date.getDate()} ${date.toLocaleDateString('en-US', {
                month: 'short', timeZone: 'UTC'
            })}`;

            // const date = new Date(day.date + 'T00:00:00Z');
            // const dayName = date.toLocaleDateString("en-US", { weekday: 'long', timeZone: 'UTC' });
            // const formattedDate = `${date.getDate()} ${date.toLocaleDateString('en-US', {
            //     month: 'short', day: 'numeric', timeZone: 'UTC'
            // })}`;

            if (fiveDaysForecastElement) {
                fiveDaysForecastElement.querySelector(".forecast-today-date-text").textContent = `${formattedDate} ${dayName}`;
                fiveDaysForecastElement.querySelector(".forecast-today-cloud-icon-text").textContent = getCloudIcon(day.day.condition.text);
                fiveDaysForecastElement.querySelector(".forecast-today-cloud-text").textContent = getCloudConditionShort(day.day.condition.text);
                fiveDaysForecastElement.querySelector(".forecast-today-both-celsius-text").textContent = ` ${Math.round(day.day.maxtemp_c)}°C/${Math.round(day.day.mintemp_c)}°C `;

            }
        });

    }
}

