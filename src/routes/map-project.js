'use strict';

const mysql = require('mysql'),
	  express = require('express');
const app = express();

app.get('/endpoint',(req,res) => {
	console.log("something happen");
	res.send("what");
})

module.exports = app;


// module.exports = router;
// var mysql = require('mysql');

// var db = function() {
// 	//establish connection to db
// 	var con = mysql.createConnection({
// 	  host: "den1.mysql2.gear.host",
// 	  user: "namwinmysql",
// 	  password: "Pro1995!"
// 	});


// 	con.connect(function(err) {
// 	  if (err) throw err;
// 	  console.log("Connected!");
// 	});


// 	var app=express();
//  	app.get('/mapdb',function(req,res) {
//  		alert("reached");
//  		connection.query('SELECT * FROM statestaffinglevel WHERE state LIKE "A%"'),
//  			function (err,result) {
//  				if (err) throw err;
//  				res.send('result');
//  			}
//  	})
// };
// module.exports = db;

 // module.exports = {
 //  foo: function () {
 //    // whatever
 //  },
 //  bar: function () {
 //    // whatever
 //  }


