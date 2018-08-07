'use strict';

var mysql = require('mysql'),
	  express = require('express');
var app = express();

// establish mysql connection to GearHost
var connection = mysql.createConnection({
	host: "den1.mysql2.gear.host",
	user: "namwinmysql",
	password: "Pro1995!",
	database: "namwinmysql",
});

// router.route("/name/:myName/age/:myage").get(function(req, res) {
// name = req.params.myName;
// age = req.params.myage;
// });

module.exports = app;