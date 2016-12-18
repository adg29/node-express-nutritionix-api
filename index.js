const APP_PORT = 8081;

var express = require("express");
var mongoskin = require("mongoskin");
var bodyParse = require("body-parser");
var reqPromise = require('request-promise')  
var stopword = require("stopword");
var levenshtein = require('fast-levenshtein');


var app = express();

var allowMethods = function(req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
}

app.listen(APP_PORT, function() {
	console.log("Express listening on port " + APP_PORT);
});



