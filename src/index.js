// nodemon --exec "heroku local" --signal SIGTERM

'use strict';
var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port= process.env.PORT || 5000;
app.use('/', express.static('public'));


// app.get('/', function(req, res) {
// 	alert(path.basename(path.dirname('index.html')));
//     res.sendFile(path('/index.html'));
// });

app.listen(port);