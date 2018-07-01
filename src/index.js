var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static('public'));
// viewed at http://localhost:8080
// app.get('/', function(req, res) {
// 	alert(path.basename(path.dirname('index.html')));
//     res.sendFile(path('/index.html'));
// });

app.listen(8080);
// 'use strict';
// var express = require('express'),
//   bodyParser = require('body-parser'),
//   path = require('path')
//   // Datastore = require('nedb');

// var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// var port = process.env.PORT || 5000;

// app.use('/', express.static('public'));

// app.listen(port);
// console.log('Magic happens on port ' + port);
// alert("hey");