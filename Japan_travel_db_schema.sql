DROP TABLE IF EXISTS worldcities;
DROP TABLE IF EXISTS life_exp;
DROP TABLE IF EXISTS japanese_universities;
DROP TABLE IF EXISTS pref_latlng;
DROP TABLE IF EXISTS shinkansen_clean;
DROP TABLE IF EXISTS prefecture_clean;
DROP TABLE IF EXISTS cities_clean;

CREATE TABLE cities_clean (
	city_en VARCHAR(50) PRIMARY KEY,
	prefecture_id INT		
);
--SELECT * FROM cities_clean

CREATE TABLE prefecture_clean (
	prefecture_id INT PRIMARY KEY,
	prefecture_en VARCHAR(50),
	FOREIGN KEY (prefecture_id) REFERENCES cities_clean(prefecture_id)
);
--SELECT * FROM prefecture_clean

CREATE TABLE shinkansen_clean(
	Station_Name VARCHAR(50) PRIMARY KEY,
	Shinkansen_Line VARCHAR(50),
	Prefecture VARCHAR(50), 
	FOREIGN KEY (Prefecture) REFERENCES prefecture_clean(prefecture_en)	
);
--SELECT * FROM shinkansen_clean

CREATE TABLE pref_latlng(
	code INT,
	prefecture_en VARCHAR(50) PRIMARY KEY,
	lat DECIMAL,
	long DECIMAL,
	FOREIGN KEY (prefecture_en) REFERENCES prefecture_clean(prefecture_en)
);
--SELECT * FROM pref_latlng

CREATE TABLE university_clean (
	name VARCHAR(50) PRIMARY KEY,
	state VARCHAR(50),
	review_rating DECIMAL,
	difficulty_rank VARCHAR(10),
	FOREIGN KEY (state) REFERENCES prefecture_clean(prefecture_en)
);
--SELECT * FROM japanese_universities

CREATE TABLE life_exp (
	pref_id INT,
	Prefecture VARCHAR(50) PRIMARY KEY,
	Life_expectancy DECIMAL,
	FOREIGN KEY (Prefecture) REFERENCES prefecture_clean(prefecture_en)
);
--SELECT * FROM life_exp

CREATE TABLE cities_lat_long_clean_rename (
	city_ascii VARCHAR(30) PRIMARY KEY,
	lat DECIMAL,
	lng DECIMAL,
	admin_name VARCHAR(50),
	population INT,
	FOREIGN KEY (city_ascii) REFERENCES cities_clean(city_en)
);
--SELECT * FROM worldcities
