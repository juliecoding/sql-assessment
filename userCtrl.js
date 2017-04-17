var db = require('db');

module.exports = {
    create: function(req, res) {
        db.users.read_users([], function(err, results) {
            if (err) {
                console.error(err);
                return res.send(err);
            } else {
                res.send(results);
            }
        })
    }
}