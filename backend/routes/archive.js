var express = require('express');
var router = express.Router();
var DBConnection = require("../sql/SQLConnection");

router.get("/", function(req, res) {
    const query = "SELECT * FROM archive";
    DBConnection.query(query, function (err, rows) {
        if (err) {
            res.send(JSON.stringify(err));
        }
        res.send(JSON.stringify(rows));
    });
});

router.post("/create", function(req, res) {
    const { text } = req.body;
    const query = `INSERT INTO archive (text) VALUES ("${text}")`;
    DBConnection.query(query, function (err, response) {
        if (err) {
            res.send(JSON.stringify(err));
        }
        res.send(JSON.stringify(response));
    });
});

router.delete("/delete", function(req, res) {
    const { id } = req.query;
    const query = `DELETE FROM archive WHERE id = ${id}`;
    DBConnection.query(query, function (err, response) {
        if (err) {
            res.send(JSON.stringify(err));
        }
        res.send(JSON.stringify(response));
    });
});


module.exports = router;
