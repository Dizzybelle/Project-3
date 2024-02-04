# Project-3
**Project Overview and Purpose**:
  The idea for our project was to create a webpage to help people who are thinking about moving to Japan, or thinking about visiting Japan.
  We wanted our page to have basic information to help people decide where they might want to think about moving/visiting. Information such
  as the population in each prefecture, a map of towns/cities, a map of universities, bullet train stations in a prefecture etc. To this 
  end we created graphs, and interactive map, and a dropdown menu that allows users to view information about a given prefecture. We also
  wanted the webpage to catch someones attention so we added in an animation for the title and subtitle when the page is loaded. To add
  in the animation we used the anime library in JavaScript.

  
**How to use our project**:
  User interaction with the proejct is straight forward. There are two graphs at the top of the page with life expectancy by prefecture
  and population by prefecture. Then there is a map of Japan. The map has a street view layer and a topographical layer that users can
  switch between, to allow a user to see what areas are more or less mountainous. Then there is a layer that shows prefecture name and
  location, a layer that shows towns and cities and their population, and a layer that shows universities with a pop-up showing 
  the rating and difficulty of the university. At the bottom of the page users can select an individual prefecture from a dropdown menu
  to display what bullet train stations and lines there are in the prefecture, what universities there are in the prefecture, and what
  cities there are in the prefecture.


**Ethical Considerations**:
  The datasets we used for this project were all publically available for public use. Also the data in general that was used for this 
  project is widely avaiable. We are putting the data in a more user accessible format. Given this that are minimal ethical concerns
  for our project.

**Data Sources**: We used the following data sources in our project
  World Cities Database (worldcities.csv) https://simplemaps.com/data/world-cities
  Japan life Expectancy (Japan_life_expectancy.csv) https://www.kaggle.com/datasets/gianinamariapetrascu/japan-life-expectancy 
  Japanese Universities https://www.kaggle.com/datasets/webdevbadger/japanese-universities 
  Japen Prefecture Latitude Longitude (Japan_prefecture_latlng.csv) https://www.kaggle.com/datasets/corochann/japan-prefecture-latitude-longitude 
  Shinkansen Stations in Japan https://www.kaggle.com/datasets/japandata509/shinkansen-stations-in-japan 
  City and prefecture
  Prefecture.csv (https://github.com/nobuf/list-of-cities-in-japan/blob/master/build/prefectures.csv)
  Cities_in_japan_2023.csv (https://github.com/nobuf/list-of-cities-in-japan/blob/master/build/cities_in_japan_2023.csv) 

**References for Code**:
  Most of the code used was from previous homeworks (modified and added to), except for the code for looping through data to create a 
  list of unique items, this code came from https://stackoverflow.com/questions/60522032/loop-over-objects-inside-a-list-and-return-unique-values
