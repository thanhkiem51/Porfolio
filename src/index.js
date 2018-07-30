// nodemon --exec "heroku local" --signal SIGTERM

'use strict';
var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	mysql = require('mysql');
//init the app by serving index file
var	app = express();
var port= process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('public'));

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});



// var mapProject = require('./map-project');
// app.use('/mapProject',mapProject); 
app.get('/endpoint', function(req,res) {
	console.log("something happen");
	res.send("what");
})
//start the server
app.listen(port);

// var db= require('./db.js');
// db();

// var mysql = require('mysql');
// var con = mysql.createConnection({
// 	  host: "den1.mysql2.gear.host",
// 	  user: "namwinmysql",
// 	  password: "Pro1995!"
// 	});


// con.connect(function(err) {
// 	if (err) throw err;
// 	console.log("Connected!");
// });

// app.use('/mapdb',function(req,res) {
// 	res.send("hey");
// });
// require('./db')(app);
