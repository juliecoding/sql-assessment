-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see

--Create a table called Vehicles that has an id, make, model, year, and ownerId (a foreign key to users)

--DROP TABLE IF EXISTS vehicles;

CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    make VARCHAR(500),
    model VARCHAR(500),
    year INTEGER,
    ownerId INTEGER REFERENCES users(id)
);

INSERT INTO vehicles (make, model, year, ownerId) VALUES 
('Toyota', 'Camry', 1991, 1),
('Honda', 'Civic', 1995, 1),
('Ford', 'Focus', 2005, 1),
('Ford', 'Taurus', 2003, 2),
('VW', 'Bug', 2010, 2),
('Mini', 'Coup', 2013, 3);
