SELECT * FROM vehicles
JOIN users
ON users.id = vehicles.ownerId
WHERE vehicles.year > 2000
ORDER BY vehicles.year DESC;