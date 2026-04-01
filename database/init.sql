CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE sensor_readings (
    id SERIAL PRIMARY KEY,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    co FLOAT,
    alcohol FLOAT,
    co2 FLOAT,
    toluene FLOAT,
    nh3 FLOAT,
    acetone FLOAT,
    max FLOAT,
    geom geography(Point, 4326) NOT NULL
);

INSERT INTO sensor_readings (co, alcohol, co2, toluene, nh3, acetone, max, geom)
SELECT
  random(), 
  random(), 
  300 + random()*400, 
  random(), 
  random(), 
  random(), 
  random()*400,
  ST_SetSRID(
    ST_MakePoint(
      32.03 + random()*0.1,
      49.42 + random()*0.05
    ), 
    4326
  )::geography
FROM generate_series(1, 100);