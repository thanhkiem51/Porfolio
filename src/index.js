/*
	Main file to deploy the app
*/

'use strict';
var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');

var	app = express();
var port= process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up end points for map project
app.use('/mapProject', require('./routes/map-project.js'));
app.use('/menuProject',require('./routes/menu-project.js'));
app.use('/mangaBrowser',require('./routes/manga-project.js');

//serving static files in public folder + ensuring all CSS and JS are loaded
app.use('/', express.static('public'));

//routing all request to index file on page refresh to prevent "cannot GET" error
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


//start the server
app.listen(port);