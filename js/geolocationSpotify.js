// Funktion zur Authentifizierung bei der Spotify API
async function getSpotifyAccessToken() {
  const clientId = "c9cbeb823ce445d58fd67c76d8b0fdb8"; // Ersetze mit deiner Spotify-Client-ID
  const clientSecret = "96920963ad1f49bea093bba43d3bc79d"; // Ersetze mit deinem Spotify-Client-Secret

  const tokenUrl = "https://accounts.spotify.com/api/token";

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`), // Base64-codierte Authentifizierung
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Funktion zum Abrufen von Songs basierend auf dem Standort
async function getCountrySpecificTracks(countryCode, token) {
  const query = encodeURIComponent(`Top Hits ${countryCode}`);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=playlist&market=${countryCode}&limit=1`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.playlists && data.playlists.items.length > 0) {
    // Hole die erste Playlist und ihre Tracks
    const playlistId = data.playlists.items[0].id;
    return getTracksFromPlaylist(playlistId, token);
  }

  throw new Error("Keine Playlists gefunden.");
}

// Funktion zum Abrufen von Tracks aus einer Playlist
async function getTracksFromPlaylist(playlistId, token) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data.items.map((item) => ({
    name: item.track.name,
    artist: item.track.artists.map((artist) => artist.name).join(", "),
    url: item.track.external_urls.spotify,
  }));
}

// Hauptfunktion zur Integration der Spotify-Sektion
async function loadSpotifyTracks(countryCode) {
  const spotifyList = document.getElementById("spotify-list");

  try {
    const token = await getSpotifyAccessToken();
    const tracks = await getCountrySpecificTracks(countryCode, token);

    spotifyList.innerHTML = ""; // Liste zurücksetzen

    tracks.forEach((track) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <a href="${track.url}" target="_blank" class="text-decoration-none text-primary">
            ${track.name} - ${track.artist}
          </a>`;
      spotifyList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Spotify-Tracks:", error);
    spotifyList.innerHTML = `
        <li class="text-center text-danger">
          Keine Musikempfehlungen verfügbar. 😢
        </li>`;
  }
}
