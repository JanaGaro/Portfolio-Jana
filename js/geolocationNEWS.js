// Funktion für Reverse Geocoding, um den Ortsnamen zu ermitteln
async function getCityFromCoordinates(lat, lon) {
  const apiKey = "542e8698798348a0aea3e4f06b027810";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=de`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Extrahiere den Ortsnamen und das Land
      const city =
        data.results[0].components.city ||
        data.results[0].components.town ||
        data.results[0].components.village ||
        "Unbekannter Ort";
      const country = data.results[0].components.country || "Unbekanntes Land";

      // Zeige den Ort und das Land an
      document.getElementById(
        "location-info"
      ).innerText = `Mein Standort: ${city}, ${country}`;

      // Nachrichten laden (unter Berücksichtigung von Sprache und Land)
      fetchLocalNews(city);
    } else {
      document.getElementById("location-info").innerText =
        "Standort konnte nicht ermittelt werden.";
    }
  } catch (error) {
    console.error("Fehler beim Reverse Geocoding:", error);
    document.getElementById("location-info").innerText =
      "Standort konnte nicht ermittelt werden.";
  }
}

// Funktion zum Abrufen von Nachrichten
async function fetchLocalNews(city) {
  const apiKey = "0c63feb51aa64e98bdbfe4a528eb5076";

  const url = `https://newsapi.org/v2/everything?q=${city}&language=de&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const noNewsMessage = document.getElementById("no-news-message");
    const newsList = document.getElementById("news-list");

    if (data.articles && data.articles.length > 0) {
      // Nachrichten gefunden: Verberge den Hinweistext und zeige die Nachrichten
      noNewsMessage.style.display = "none";
      newsList.innerHTML = ""; // Liste zurücksetzen

      const firstThreeArticles = data.articles.slice(0, 3); // Nur die ersten 3 Nachrichten
      firstThreeArticles.forEach((article) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        newsList.appendChild(listItem);
      });

      // Nachrichten nebeneinander anzeigen
      newsList.style.display = "flex";
    } else {
      // Keine Nachrichten gefunden: Zeige Hinweistext und Random Fact
      noNewsMessage.style.display = "block";
      newsList.innerHTML = ""; // Liste zurücksetzen

      // Random Fact hinzufügen
      const factUrl =
        "https://uselessfacts.jsph.pl/api/v2/facts/random?language=de";
      const factResponse = await fetch(factUrl, {
        headers: { Accept: "application/json" },
      });
      const factData = await factResponse.json();

      const factText = factData.text;

      const factItem = document.createElement("li");
      factItem.style.backgroundColor = "#b2a993";
      factItem.style.color = "white";
      factItem.style.padding = "20px";
      factItem.style.borderRadius = "10px";
      factItem.style.textAlign = "center";
      factItem.innerHTML = factText;

      newsList.appendChild(factItem);

      // Nur den Fact anzeigen (kein Flexbox-Layout für mehrere Kacheln)
      newsList.style.display = "block";
    }
  } catch (error) {
    console.error(
      "Fehler beim Abrufen der Nachrichten oder des Random Facts:",
      error
    );
    document.getElementById("news-list").innerHTML = `
      <li class="text-center text-danger">
        Weder Nachrichten noch Random Facts konnten geladen werden. 😢
      </li>`;
  }
}

// Funktion zur Ermittlung des Benutzerstandorts
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Reverse Geocoding, um den Ortsnamen zu ermitteln
        getCityFromCoordinates(lat, lon);
      },
      (error) => {
        document.getElementById("location-info").innerText =
          "Standort konnte nicht ermittelt werden.";
        console.error(error);
      }
    );
  } else {
    document.getElementById("location-info").innerText =
      "Geolocation wird von deinem Browser nicht unterstützt.";
  }
}

// Initialisieren der Standortsuche
getUserLocation();
