SELECT * FROM vehicles 
JOIN users
ON vehicles.ownerId = users.id
WHERE users.firstname LIKE $1 || '%'