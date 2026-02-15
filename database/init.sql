CREATE TABLE sensor_readings (
    id SERIAL PRIMARY KEY,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lpg FLOAT,
    ch4 FLOAT,
    co FLOAT,
    alcohol FLOAT,
    benzene FLOAT,
    hexane FLOAT,
    lat FLOAT,
    lng FLOAT
);

INSERT INTO sensor_readings (lpg, ch4, co, alcohol, benzene, hexane, lat, lng)
VALUES (0.45, 0.12, 0.05, 0.01, 0.002, 0.001, 49.444, 32.059);