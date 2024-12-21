var careerEvents = [
  {
    date: "August 2017 - Juli 2020",
    content: "Ausbildung zur Kauffrau EFZ, Einwohnergemeinde Erlach",
  },
  {
    date: "März 2020",
    content: "Ausbildung zur Kauffrau EFZ, Commune Le Landeron",
  },
  {
    date: "Dezember 2021 - Januar 2022",
    content: "Verwaltungsangestellte, Enwohnergemeinde Vinelz",
  },
  {
    date: "September 2020 - Juli 2023",
    content: "Verwaltungsangestellte, Einwohnergemeinde Erlach",
  },
  {
    date: "August 2023 - Heute",
    content: "Customer Service Mitarbeiterin ERP, BKW Building Solutions AG",
  },
];

var educationEvents = [
  {
    date: "2008 - 2014",
    content: "Primarschule, Gampelen",
  },
  {
    date: "2014 - 2017",
    content: "Oberstufenzentrum, Ins",
  },
  {
    date: "2017 - 2020",
    content: "BWT Berufs- und Weiterbildungszentrum, Lyss",
  },
  {
    date: "2020 - 2022",
    content: "Bwd Bildungszentrum für Wirtschaft und Dienstelistung, Bern",
  },
  {
    date: "2020 - 2022",
    content: "Bwd Bildungszentrum für Wirtschaft und Dienstelistung, Bern",
  },
  {
    date: "2022 - Heute",
    content: "Berner Fachhochschule, Bern",
  },
];

function loadTimelines() {
  $("#career-timeline").roadmap(careerEvents, {
    eventsPerSlide: 5,
  });

  $("#education-timeline").roadmap(educationEvents, {
    eventsPerSlide: 6,
  });
}

$(window).on("scroll", function () {
  loadTimelines();
});

// Initial load
loadTimelines();
