'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(5555, function() {
  console.log('Node app is running on port', 5555);
});
