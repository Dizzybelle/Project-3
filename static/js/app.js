//Reading in the URLs for the data
let pref_lat_longUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.pref_lat_long.json";
let cities_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.cities_clean.json";
let shinkansen_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.shinkansen_clean.json";
let prefecture_clean_renameUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.prefecture_clean_rename.json";
let life_expUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.life_exp.json";
let cities_lat_long_clean_renameUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.cities_lat_long_clean_rename.json";
let university_cleanUrl = "https://github.com/Dizzybelle/Project-3/blob/main/data/Japan_Travel.university_clean.json";

//Request to pref_lat_longUrl
d3.json(pref_lat_longUrl).then(function(data) {
  console.log(data);
  createPrefCoordinates(data);
});

// request to cities_cleanURL
d3.json(cities_cleanUrl).then(function(data1) {
  console.log(data1);
})
//request to shinkansen_cleanURL
d3.json(shinkansen_cleanUrl).then(function(data2) {
  console.log(data2);
})
//request to prefecture_clean_renameURL
d3.json(prefecture_clean_renameUrl).then(function(data3) {
  console.log(data3);
})
//request to life_expURL
d3.json(life_expUrl).then(function(data4) {
  console.log(data4);
})
//request to cities_lat_long_cleanURL
d3.json(cities_lat_long_clean_renameUrl).then(function(data5) {
  console.log(data5);
})
//request to university_cleanURL
d3.json(university_cleanUrl).then(function(data6) {
  console.log(data6);
})

//function to create the basic popup, need to add additional information to the popup, include life exp, population, and shinkansen station
function createPrefCoordinates(pref_lat_long) {

  let marker_limit = pref_lat_long.length;

  for (let i = 0; i < marker_limit; i++) {
  L.marker([pref_lat_long[i].lat, pref_lat_long[i].long])
    .bindPopup(`<h5>${pref_lat_long[i].prefecture_en}</h5>`) //need to add in html and css for the popup formatting
    .addTo(myMap);
}}

function drop_down() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  d3.json(prefecture_clean_renameUrl).then((data3) => {
    let pref = data3.prefecture_en
  })


}

//add in a map layer so can just look at the major cities, with population of each city, info in cities_lat_long_clean_rename

//also could add in a map layer with universities

let myMap = L.map("map", {
  center: [36, 137],
  zoom: 5
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
