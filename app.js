var express = require('express');
var app = express();
var request = require('request');
var util = require('util');

var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');

var port 			= process.env.PORT || 5000; 

//Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 								//Simulate DELETE/PUT requests

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/comps', function (req, res) {
	var url = req.body.url;

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body) // Print the google web page.
	    res.send(body);
	  }
	});
});

app.post('/api/fetchComps', function (req, res) {
	var url = req.body.url;

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body) // Print the google web page.
	    res.send(body);
	  }
	});
});

app.post('/api/getPhotos', function (req, res) {
	var url = req.body.url;
	console.log('get photos: ' + url);

	request(url, function (error, response, body) {
		console.log('get photos request');
	  if (!error && response.statusCode == 200) {
	    // console.log(body) // Print the google web page.
	    res.send(body);
	  }
	});
});

app.post('/api/loadPhotos', function (req, res) {
	var url = req.body.url;
	console.log('loading photos: ' + url);

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body) // Print the google web page.
	    res.send(body);
	  } else {
	  	console.log(error);
	  }
	});
});


app.listen(port, function () {
  console.log('Example app listening on port 5000!');
});