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

//Handling request to get table details
app.get('/fetch',function(req,res) {
	connection.query('SELECT stateID,a.state,ready,busy,threshold1,threshold2,threshold3, lat, `long`'+
					'FROM statestaffinglevel a JOIN statedetail b '+
					'ON a.state=b.state WHERE b.stateID!=0',
		function (err,result) {
			if (err) res.send(err);
			res.send(result);
		})
});


//update staffing in state table
app.post('/update',function(req,res) {
	let value = req.body['option'];
	let sql = "CALL ";
	if (value=='origin')
		sql+="restore_origin();";
	else if (value=='update1')
		sql+="update_1();";
	else if (value=='update2')
		sql+="update_2();";
	connection.query(sql,
	function (err,result) {
		if (err) throw err;
		res.send(result);
	})
})
module.exports = app;