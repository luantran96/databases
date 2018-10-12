var mysql = require('mysql');
var Sequelize = require('sequelize');


var db = new Sequelize('chat', 'student', 'student');

var con = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'chat'
});


module.exports.con = db;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


  