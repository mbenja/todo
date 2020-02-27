var mysql = require('mysql');
var credentials = require("./credentials");

const connection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
});

connection.connect();

module.exports = connection;