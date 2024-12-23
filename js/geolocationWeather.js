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

    if (!data || !data.forecast || data.forecast.length === 0) {
      displayFallbackCatMessage(
        "Tut mir leid, aktuell konnten keine Wetterdaten in deiner Region gefunden werden. Aber hier ist ein Katzenbild:"
      );
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    displayFallbackCatMessage(
      "Tut mir leid, aktuell konnten keine Wetterdaten in deiner Region gefunden werden. Aber hier ist ein Katzenbild:"
    );
  }
}

// Funktion zur Anzeige der Wetterdaten
function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  const noWeatherMessage = document.getElementById("no-weather-message");

  if (!data || !data.forecast || data.forecast.length === 0) {
    displayFallbackCatMessage(
      "Tut mir leid, aktuell konnten keine Wetterdaten in deiner Region gefunden werden. Aber hier ist ein Katzenbild:"
    );
    return;
  }

  // Verstecke die Fallback-Nachricht, wenn Daten erfolgreich geladen werden
  noWeatherMessage.style.display = "none";

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

// Funktion zur Anzeige der Fallback-Nachricht und eines Katzenbildes
async function displayFallbackCatMessage(message) {
  const weatherInfo = document.getElementById("weather-info");
  const noWeatherMessage = document.getElementById("no-weather-message");
  const catContainer = document.getElementById("cat-image");

  // Zeige die Fallback-Nachricht an
  noWeatherMessage.style.display = "block";
  noWeatherMessage.innerText = message;

  // Leere die Wetterinfo und lade ein Katzenbild
  weatherInfo.innerHTML = "";

  if (!catContainer) {
    const newCatContainer = document.createElement("div");
    newCatContainer.id = "cat-image";
    newCatContainer.className = "text-center";
    document.getElementById("weather-section").appendChild(newCatContainer);

    const catAPI = "https://api.thecatapi.com/v1/images/search?limit=1";

    // Abrufen eines Katzenbildes
    try {
      const response = await fetch(catAPI);
      const data = await response.json();

      newCatContainer.innerHTML = ""; // Leeren des Containers

      const img = document.createElement("img");
      img.src = data[0].url;
      img.alt = "Niedliches Katzenbild";
      img.className = "cat-image";
      img.style.maxWidth = "100%";
      img.style.marginTop = "20px";
      newCatContainer.appendChild(img);
    } catch (error) {
      console.error("Fehler beim Abrufen des Katzenbildes:", error);
      newCatContainer.innerHTML =
        "<p>Leider konnte kein Katzenbild geladen werden. 😿</p>";
    }
  }
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
        displayFallbackCatMessage(
          "Tut mir leid, wir konnten deinen Standort nicht ermitteln. Aber hier ist ein Katzenbild:"
        );
      }
    );
  } else {
    displayFallbackCatMessage(
      "Geolocation wird von deinem Browser nicht unterstützt. Aber hier ist ein Katzenbild:"
    );
  }
}

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", getUserLocation);
