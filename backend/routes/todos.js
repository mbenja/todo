var express = require('express');
var router = express.Router();
var DBConnection = require("../sql/SQLConnection");

router.get("/", function(req, res) {
    const query = "SELECT * FROM todos";
    DBConnection.query(query, function (err, rows) {
        if (err) {
            res.send(JSON.stringify(err));
        }
        res.send(JSON.stringify(rows));
    });
});

module.exports = router;
