const toggleButton = document.getElementById("mode-toggle");

// Beim Laden der Seite prüfen, ob der Dark-Mode aktiviert ist
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleButton.innerText = "Light Mode";
}

// Event Listener für den Button
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleButton.innerText = "Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleButton.innerText = "Dark Mode";
  }
});

const toggleSwitch = document.getElementById("mode-toggle");

// Beim Laden der Seite prüfen, ob Dark Mode aktiviert ist
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleSwitch.checked = true;
}

// Event Listener für den Schalter
toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});
