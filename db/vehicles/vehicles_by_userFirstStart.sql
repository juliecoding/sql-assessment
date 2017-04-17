SELECT * FROM vehicles 
JOIN users
ON vehicles.ownerId = users.id
WHERE UPPER(users.firstname) LIKE UPPER($1) || '%'