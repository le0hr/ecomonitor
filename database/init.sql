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