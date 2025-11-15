const OWM_KEY = "YOUR_API_KEY";
const CITY = "Buenos Aires,AR";
const UNITS = "metric";

async function getWeather() {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY)}&units=${UNITS}&appid=${OWM_KEY}`);
    if (!res.ok) throw new Error("Weather fetch failed");
    const data = await res.json();

    const now = data.list[0];
    document.getElementById("temp").textContent = Math.round(now.main.temp);
    document.getElementById("desc").textContent = now.weather[0].description;

    const forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = "";

    for (let day = 1; day <= 3; day++) {
      const idx = day * 8;
      if (!data.list[idx]) continue;
      const f = data.list[idx];
      const dt = new Date(f.dt * 1000);
      const options = { weekday: "short", month: "short", day: "numeric" };
      const label = dt.toLocaleDateString(undefined, options);
      const li = document.createElement("li");
      li.textContent = `${label}: ${Math.round(f.main.temp)}°C — ${f.weather[0].description}`;
      forecastEl.appendChild(li);
    }
  } catch (err) {
    console.error("Weather error", err);
    document.getElementById("desc").textContent = "Weather unavailable";
    document.getElementById("forecast").innerHTML = "<li>Forecast unavailable</li>";
  }
}

getWeather();