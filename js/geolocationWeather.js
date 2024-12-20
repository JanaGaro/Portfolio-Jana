// Funktion, um das Wetter basierend auf Geokoordinaten abzurufen
async function fetchWeather(lat, lon) {
  const apiKey = "NGYuqD1bW2SIU6wYVTRF8A70CXWxpI599P3p6hNg";
  const url = `https://forecast.meteonomiqs.com/v3_1/forecast/${lat}/${lon}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
      mode: "no-cors",
    });

    if (!response.ok) {
      throw new Error(`Fehler: ${response.status}`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    document.getElementById("weather-info").innerText =
      "Wetterdaten konnten nicht geladen werden.";
  }
}

// Funktion zur Anzeige der Wetterdaten
function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");

  if (!data || !data.forecast || data.forecast.length === 0) {
    weatherInfo.innerText = "Keine Wetterdaten verfügbar.";
    return;
  }

  // Extrahiere relevante Wetterdaten
  const forecast = data.forecast[0]; // Erste Prognose (aktuelle Wetterdaten)
  const temperature = forecast.temperature.value; // Temperatur
  const condition = forecast.condition.description; // Wetterbedingung (z. B. "Sonnig")
  const iconUrl = forecast.condition.icon; // URL für das Wetter-Icon

  weatherInfo.innerHTML = `
    <h3>Aktuelles Wetter</h3>
    <p><img src="${iconUrl}" alt="${condition}" title="${condition}" /></p>
    <p>${temperature}°C, ${condition}</p>
  `;
}

// Funktion zur Ermittlung des Standorts des Benutzers
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetchWeather(lat, lon); // Wetterdaten abrufen
      },
      (error) => {
        console.error("Fehler bei der Standortermittlung:", error);
        document.getElementById("weather-info").innerText =
          "Standort konnte nicht ermittelt werden.";
      }
    );
  } else {
    document.getElementById("weather-info").innerText =
      "Geolocation wird von diesem Browser nicht unterstützt.";
  }
}

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", getUserLocation);
