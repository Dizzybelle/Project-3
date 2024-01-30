//Reading in Japan.Travel.pref_lat_lng.json
const pref_lat_lng = "data/Japan_Travel_lat_lng";

// Fetch the JSON data and console log it
d3.json(pref_lat_lng).then(function(data));


document.addEventListener("")
let myMap = L.map("map", {
    center: [36, 137],
    zoom: 5
  });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);