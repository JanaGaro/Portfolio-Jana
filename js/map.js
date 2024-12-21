// Funktion zur Anzeige der Karte
function displayMap(lat, lon) {
  // Initialisiere die Karte
  const map = L.map("map").setView([lat, lon], 13); // Zoom-Stufe: 13

  // Tile-Layer hinzufügen (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Marker hinzufügen
  L.marker([lat, lon]).addTo(map).bindPopup("Du bist hier!").openPopup();
}

// Funktion zur Ermittlung des Standorts
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Zeige Standortinformationen an
        document.getElementById(
          "location-info"
        ).innerText = `Standort: Breite ${lat}, Länge ${lon}`;

        // Zeige Karte
        displayMap(lat, lon);
      },
      (error) => {
        console.error("Fehler bei der Standortermittlung:", error);
        document.getElementById("location-info").innerText =
          "Standort konnte nicht ermittelt werden.";
      }
    );
  } else {
    document.getElementById("location-info").innerText =
      "Geolocation wird von diesem Browser nicht unterstützt.";
  }
}

// Initialisiere Standort und Karte, wenn die Seite geladen wird
document.addEventListener("DOMContentLoaded", getUserLocation);
