const APP_PORT = 8081;

var express = require("express");
var mongoskin = require("mongoskin");
var bodyParser = require("body-parser");
var reqPromise = require('request-promise')  
var stopword = require("stopword");
var levenshtein = require('fast-levenshtein');


var app = express();

var db = mongoskin.db("mongodb://@localhost:27017/nutritionixdb", {safe: true});
// helper for searching by ID
var id = mongoskin.helper.toObjectID;

var allowMethods = function(req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
}

app.use(allowMethods);

// define behavior of param when receieved via URL e.g. /api/:collection/:id
app.param(":collection", function(req, res, next, collection) {
	req.collection = db.collection(collection);
	next();
});

app.get('/api/:collection', function(req, res, next) {
  req.collection.find({}, {
    limit: 20,
    sort: [['_id', -1]]
  }).toArray(function(e, results) {
    if (e) return next(e);
    res.send(results);
  });
})

app.listen(APP_PORT, function() {
	console.log("Express listening on port " + APP_PORT);
});



