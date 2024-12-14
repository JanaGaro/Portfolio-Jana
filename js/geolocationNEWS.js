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
      ).innerText = `Standort: ${city}, ${country}`;

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
      // Keine Nachrichten gefunden: Zeige Hinweistext und Witz
      noNewsMessage.style.display = "block";
      newsList.innerHTML = ""; // Liste zurücksetzen

      // Witz hinzufügen
      const jokeUrl = "https://v2.jokeapi.dev/joke/Any?lang=de";
      const jokeResponse = await fetch(jokeUrl);
      const jokeData = await jokeResponse.json();

      let jokeText = "";
      if (jokeData.type === "single") {
        jokeText = jokeData.joke;
      } else if (jokeData.type === "twopart") {
        jokeText = `${jokeData.setup} - ${jokeData.delivery}`;
      }

      const jokeItem = document.createElement("li");
      jokeItem.style.backgroundColor = "#b2a993";
      jokeItem.style.color = "white";
      jokeItem.style.padding = "20px";
      jokeItem.style.borderRadius = "10px";
      jokeItem.style.textAlign = "center";
      jokeItem.innerHTML = jokeText;

      newsList.appendChild(jokeItem);

      // Nur Witz anzeigen (kein Flexbox-Layout für mehrere Kacheln)
      newsList.style.display = "block";
    }
  } catch (error) {
    console.error(
      "Fehler beim Abrufen der Nachrichten oder des Witzes:",
      error
    );
    document.getElementById("news-list").innerHTML = `
      <li class="text-center text-danger">
        Weder Nachrichten noch Witze konnten geladen werden. 😢
      </li>`;
  }
}

// Funktion zum Anzeigen von Nachrichten
function displayNews(articles) {
  const newsList = document.getElementById("news-list");
  newsList.innerHTML = ""; // Liste zurücksetzen

  articles.forEach((article) => {
    const listItem = document.createElement("li");
    listItem.className = "mb-3";
    listItem.innerHTML = `<a href="${article.url}" target="_blank" class="text-decoration-none text-primary">
      ${article.title}
    </a>`;
    newsList.appendChild(listItem);
  });
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
