//Reading in the URLs for the data
let pref_lat_longUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.pref_lat_long.json";
let cities_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.cities_clean.json";
let shinkansen_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.shinkansen_clean.json";
let prefecture_clean_renameUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.prefecture_clean_rename.json";
let life_expUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.life_exp.json";
let cities_lat_long_clean_renameUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.cities_lat_long_clean_rename.json";
let university_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.university_clean.json";
let final_data_cleanUrl = "https://raw.githubusercontent.com/Dizzybelle/Project-3/main/data/Japan_Travel.final_data_clean.json";

//for dropdown menu need
  //prefecture name (final_data_clean)
  //life expectancy (final_data_clean)
  //population (final_data_clean)
  //cities (final_data_clean)//////////////////////
  //universities/////////////////////////
  //train stations (final_data_clean)
  //shinkansen line (final_data_clean)
//Request for data used in the dropdown menu
d3.json(prefecture_clean_renameUrl).then(function(data) {
  console.log(data);
  return d3.json(university_cleanUrl).then(function(data1){
    console.log(data1);
    return d3.json(final_data_cleanUrl).then(function(data2){
    console.log(data2)
    createPrefAllInfo(data, data1, data2);
  })})
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

//Creating the dropdown menu, barrowed and modified this code from the belly_button_challenge
function createPrefAllInfo(prefecture_clean_rename, university_clean, final_data_clean) {
    //Creating an array of all the prefectures to populate the dropdown menu
    let pref = prefecture_clean_rename.map(prefecture => prefecture.prefecture_en);
    //Populate dropdown menu with prefecture name
    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu.selectAll("option")
        .data(pref)
        .enter()
        .append("option")
        .text(pref => pref)
  
    //Function to get list of universities
    function getPrefUniversityInfo () {
      let prefName = d3.select("#selDataset").property("value");
      // selectedPrefecture = prefName
      //Looked up parseInt to convert a string to an integer on stack overflow
      // subjectID = parseInt(subjectIDString)
      let prefUniversityData = university_clean.filter(university => university.state === prefName)
      let universitiesPrefecture = prefUniversityData.map(university => university.name);
      //Looked up how to display text on stack overflow
      let prefInfo = document.getElementById("prefecture-universities");
      prefInfo.innerText = '';
      //Iterate through the array to make individual lines to display, looked up on stack overflow
      universitiesPrefecture.forEach(element => {
          let prefData = document.createElement('p');
          prefData.textContent = element;
          prefInfo.appendChild(prefData);
      });
    }

    //Function to get list of cities
    function getPrefCitiesInfo () {
      let prefName = d3.select("#selDataset").property("value");
      let prefectureCities = final_data_clean.filter(city => city.Prefecture === prefName);
      let uniqueCities = [];
      //looked up on stackoverflow how to loop through to create a list of unique items
      prefectureCities.forEach(city=> { let cityName = city.city_en;
        if (!uniqueCities.includes(cityName)){
          uniqueCities.push(cityName)
        }
      })
      let prefInfo = document.getElementById("prefecture-cities");
      prefInfo.innerText = '';
      uniqueCities.forEach(element => {
          let prefData = document.createElement('p');
          prefData.textContent = element;
          prefInfo.appendChild(prefData);
      });
    }

    //Function to get Shinkansen (Bullet Train) Stations
    function getTrainStations () {
      let prefName = d3.select("#selDataset").property("value");
      let prefectureStations = final_data_clean.filter(station => station.Prefecture === prefName);
      let uniqueStations = [];
      prefectureStations.forEach(station=> { let stationName = station.Station_Name;
        if (!uniqueStations.includes(stationName)){
          uniqueStations.push(stationName)
        }
      })
      let prefInfo = document.getElementById("prefecture-train-stations");
      prefInfo.innerText = '';
      uniqueStations.forEach(element => {
          let prefData = document.createElement('p');
          prefData.textContent = element;
          prefInfo.appendChild(prefData);
      });
    }

    //Function to get Shinkansen (Bullet Train) Lines in a prefecture
    function getTrainLines () {
      let prefName = d3.select("#selDataset").property("value");
      let prefectureLines = final_data_clean.filter(line => line.Prefecture === prefName);
      let uniqueLines = [];
      prefectureLines.forEach(line=> { let lineName = line.Shinkansen_Line;
        if (!uniqueLines.includes(lineName)){
          uniqueLines.push(lineName)
        }
      })
      let prefInfo = document.getElementById("prefecture-train-lines");
      prefInfo.innerText = '';
      uniqueLines.forEach(element => {
          let prefData = document.createElement('p');
          prefData.textContent = element;
          prefInfo.appendChild(prefData);
      });
    }

  //Selecting new prefecture info with change in dropdown menu
  function prefectureSelected(){
    getPrefUniversityInfo();
    getPrefCitiesInfo();
    getTrainStations();
    getTrainLines ();
  }
  d3.selectAll("#selDataset").on("change", prefectureSelected);
};

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
  duration: 6000,
  translateY: 35
});

//adding the animation to the sub-title
document.querySelector('.page-title .sub-title').style.opacity = 0
anime({
  targets: '.page-title .sub-title',
  opacity: 1,
  duration: 20000,
  delay: 4000
})