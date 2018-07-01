const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send('Hello from Express!');
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})
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