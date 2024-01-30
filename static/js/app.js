//Reading in Japan.Travel.pref_lat_lng.json
let pref_lat_lng_data = "data/Japan_Travel.pref_lat_long.json";

//URL for API query to USGS, querying all earthquakes for the past 7 day
//Performing a get request to the query url
d3.json(pref_lat_lng_data).then(function(pref_lat_lng){
    createFeatures(pref_lat_lng.features);
});


let myMap = L.map("map", {
    center: [36, 137],
    zoom: 5
  });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);