'use strict';

var mysql = require('mysql'),
	  express = require('express');
var app = express();

// establish mysql connection to GearHost
var connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

app.get('/getMenu',function(req,res) {
	connection.query('SELECT * FROM menu',
		function (err,result) {
			if (err) throw err;
			res.send(result);
		})
});

app.get('/getContributors',function(req,res) {
	connection.query('SELECT * FROM menu_contributor',
		function (err,result) {
			if (err) throw err;
			res.send(result);
		})
});

app.post('/addFood',function(req,res) {

	let item = req.body['item'];
	let calories = req.body['calories'];
	let type = req.body['type'];
	let insert_item = 'INSERT INTO menu(name,calories,type) VALUES ("'+item+'",'+calories+',"'+type+'");';

	connection.query(insert_item,
		function (err,result) {
			if (err) 
				res.send(err);
			else
				res.send(result);
		});

	// res.send('your item is '+item +' calories is ' + calories + ' type is '+type + ' contributor '+contributor);
});

app.post('/addContributor',function(req,res) {
	let contributor = req.body['contributor'];
	connection.query('INSERT INTO menu_contributor VALUES ("'+contributor+'")',
	function (err,result) {
		if (err) 
			res.send(err);
		else
			res.send(result);
	});
})

module.exports = app;