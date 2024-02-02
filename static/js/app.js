//Reading in the URLs for the data
let pref_lat_longUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.pref_lat_long.json";
let cities_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.cities_clean.json";
let shinkansen_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.shinkansen_clean.json";
let prefecture_clean_renameUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.prefecture_clean_rename.json";
let life_expUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.life_exp.json";
let cities_lat_long_clean_renameUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.cities_lat_long_clean_rename.json";
let university_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.university_clean.json";

//Request for data used in the dropdown menu
d3.json(prefecture_clean_renameUrl).then(function(data) {
  console.log(data);
  return d3.json(university_cleanUrl).then(function(data1){
    console.log(data1);
    createPrefAllInfo(data, data1);
  })
});

//Request to pref_lat_longUrl
d3.json(pref_lat_longUrl).then(function(data) {
  console.log(data);
  createPrefInfo(data);
});

//Request to cities_lat_long_clean_renameUrl
d3.json(cities_lat_long_clean_renameUrl).then(function(data) {
  console.log(data);
  createCitiesCoordinates(data);
});

//Request to cities_lat_long_clean_renameUrl
d3.json(university_cleanUrl).then(function(data) {
  console.log(data);
  createUniversities(data);
});

//Creating the dropdown menu
function createPrefAllInfo(prefecture_clean_rename, university_clean) {
    //Creating an array of all the prefectures to populate the dropdown menu
    let pref = prefecture_clean_rename.map(prefecture => prefecture.prefecture_en);
    //Populate dropdown menu with prefecture name
    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu.selectAll("option")
        .data(pref)
        .enter()
        .append("option")
        .text(pref => pref)
}



//Creating the prefecture layer
let prefectures = L.layerGroup();
//function to create the basic popup, need to add additional information to the popup, include life exp, population, and shinkansen station
function createPrefInfo(pref_lat_long) {
  let marker_limit = pref_lat_long.length;
  for (let i = 0; i < marker_limit; i++) {
  L.marker([pref_lat_long[i].lat, pref_lat_long[i].long])
    .bindPopup(`<h5>${pref_lat_long[i].prefecture_en}</h5>`)
    .addTo(prefectures);
  }}

  

//creating the major cities layer
let majorCities = L.layerGroup();

function createCitiesCoordinates(cities_lat_long) {
  let marker_limit = cities_lat_long.length;
  for (let i = 0; i<marker_limit;i++) {
  L.marker([cities_lat_long[i].lat, cities_lat_long[i].lng])
    .bindPopup(`<h2>${cities_lat_long[i].city_ascii}</h2>
    <hr>
    <h3>Population: ${cities_lat_long[i].population}</h3>`)
    .addTo(majorCities);
  }
}

//creating the universities layer
let universities = L.layerGroup();
function createUniversities(universitiesClean) {
  let marker_limit = universitiesClean.length;
  for (let i = 0; i<marker_limit;i++) {
  L.marker([universitiesClean[i].latitude, universitiesClean[i].longitude])
    .bindPopup(`<h2>${universitiesClean[i].name}</h2>
    <hr>
    <h3>Rating(1-5): ${universitiesClean[i].review_rating}</h3>
    <h3>Difficulty(A-F): ${universitiesClean[i].difficulty_rank}</h3>`)
    .addTo(universities);
  }
}

//Base layers
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

//Layer groups
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

//Overlay Maps
let overlayMaps = {
  "Prefecture": prefectures,
  "Major Cities": majorCities,
  "Universities": universities
};

let myMap = L.map("map", {
  center: [36, 137],
  zoom: 5,
  layers: [street, prefectures]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


//adding the animation to the title
document.querySelector('.page-title .title').style.transform = 'translateY(-300%)';
anime({
  targets: '.page-title .title',
  duration: 3000,
  translateY: 35
});

//adding the animation to the sub-title
document.querySelector('.page-title .sub-title').style.opacity = 0
anime({
  targets: '.page-title .sub-title',
  opacity: 1,
  duration: 20000,
  delay: 2500
})