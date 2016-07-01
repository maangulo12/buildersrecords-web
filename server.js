'use strict';

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 4444));

app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Running on http://localhost:' + app.get('port') + '/');
});
