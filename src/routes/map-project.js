'use strict';

var mysql = require('mysql'),
	  express = require('express');
var app = express();

// establish mysql connection to GearHost
var connection = mysql.createConnection({
	host: "den1.mysql2.gear.host",
	user: "namwinmysql",
	password: "Pro1995!",
	database: "namwinmysql"
});

//Handling request to get table details
app.get('/fetch',function(req,res) {
	connection.query('SELECT stateID,a.state,ready,busy,threshold1,threshold2,threshold3 '+
					'FROM statestaffinglevel a JOIN statedetail b '+
					'ON a.state=b.state',
		function (err,result) {
			if (err) throw err;
			res.send(result);
		})


});

//Handling request to update table records
app.post('/update',function(req,res) {
	var value = req.query['value'];
})
// app.get('/update',(req,res) => {
// 	console.log("something happen");
// 	res.send("what");
// })
module.exports = app;