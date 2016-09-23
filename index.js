/* jshint node: true */
/* jshint loopfunc: true */
'use strict';

/* ---------- IMPORTS ---------- */
var express = require('express');
var bodyParser = require('body-parser');

var RouterApi = require('./Routes/Api');

// var User = require('./Lib/User');


/* ---------- INIT EXPRESS SERVER ---------- */
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.set('json spaces', 2);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



app.get('/', function (req, res) {
  console.log('test');
  res.sendfile('./public/index.html');
});


RouterApi.init(app);


var server = app.listen(15302, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening ah http://%s:%s', host, port);
});
server.timout = 999999;
