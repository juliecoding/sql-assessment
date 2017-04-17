var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

var massiveUri = connString;

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({ connectionString: connString },
    function(err, localdb) {
        db = localdb;
        app.set('db', db);

        db.user_create_seed(function(err, table) {
            if (err) {
                console.log("Error creating table", err);
            } else {
                console.log("User Table Init");
            }
        });
        db.vehicle_create_seed(function(err, table) {
            if (err) {
                console.log("Error creating vehicles table", err);
            } else {
                console.log("Vehicle Table Init")
            }
        });
    })


/****** ENDPOINTS *******/
// var end = function(err, results) {
//     if (err) {
//         console.error(err);
//     } else {
//         res.status(200).send(results);
//     }
// };


app.get('/api/users', function(req, res, next) {
    db.users.read_users([], function(err, results) {
        if (err) {
            console.error(err);
        } else {
            res.status(200).send(results);
        }
    })
});

app.get('/api/vehicles', function(req, res, next) {
    db.vehicles.read_vehicles([], function(err, results) {
        if (err) {
            console.error(err);
        } else {
            res.status(200).send(results);
        }
    })
});

app.post('/api/users', function(req, res, next) {
    db.users.post_user([
        req.body.firstname,
        req.body.lastname,
        req.body.email
    ], function(err, results) {
        if (err) {
            console.error(err);
        } else {
            res.status(200).send(results);
        }
    })
});

app.post('/api/vehicles', function(req, res, next) {
    db.vehicles.post_vehicle([
        req.body.make,
        req.body.model,
        req.body.year,
        req.body.ownerId
    ], function(err, results) {
        if (err) {
            console.error(err);
        } else {
            res.status(200).send(results);
        }
    })
});

app.get('/api/user/:userId/vehiclecount', function(req, res, next) {
    db.vehicles.vehicle_count([req.params.userId], function(err, results) {
        var vehiclesPerUser = results.length;
        if (err) {
            console.error(err);
        } else {
            res.status(200).send({ "count": vehiclesPerUser });
        }
    })
});

app.get('/api/user/:userId/vehicle', function(req, res, next) {
    db.vehicles.vehicle_count([req.params.userId], function(err, results) {
        if (err) {
            console.error(err);
        } else {
            res.status(200).send(results);
        }
    })
});

//* Create an endpoint at `GET '/api/vehicle?email=UsersEmail'` that will find all vehicles that belong to the user with the provided users Email
app.get('/api/vehicle', function(req, res, next) {
    if (req.query.email) {
        db.vehicles.vehicles_by_email([req.query.email], function(err, results) {
            if (err) {
                console.error(err);
            } else {
                res.status(200).send(results);
            }
        })
    } else if (req.query.userFirstStart) {
        console.log(req.query.userFirstStart);
        db.vehicles.vehicles_by_userFirstStart([req.query.userFirstStart], function(err, results) {
            if (err) {
                console.error(err);
            } else {
                res.status(200).send(results);
            }
        })
    }
});


// app.get('/api/vehicle', function(req, res, next) {
//     db.vehicles.vehicles_by_email([req.query.email], function(err, results) {
//         if (err) {
//             console.error(err);
//         } else {
//             res.status(200).send(results);
//         }
//     })
// });


app.listen('3000', function() {
    console.log("Successfully listening on : 3000")
});

module.exports = app;