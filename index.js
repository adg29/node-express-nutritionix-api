const APP_PORT = 8081;

var express = require("express");
var monk = require("monk");
var bodyParser = require("body-parser");
var reqPromise = require('request-promise')  
var stopword = require("stopword");
var levenshtein = require('fast-levenshtein');


var app = express();

var db = monk("mongodb://@localhost:27017/nutritionixdb");

var allowMethods = function(req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
}

app.use(allowMethods);

// define behavior of param when receieved via URL e.g. /api/:collection/:id
app.param(":collection", function(req, res, next, collection) {
	req.collection = db.get(collection, {safe: true});
	next();
});

app.get('/api/:collection', function(req, res, next) {
  req.collection.find({}, {
    limit: 20
    // ,	fields: { searchResults: 1 }
  }).then(function(docs) {
    res.send(docs);
  })
    .catch(function(err) {
      console.log(err.stack);
      res.send('Error fetching items from ' + req.params.collection);
    })
  ;
})

app.post('/api/:collection/:item', function(req, res, next) {
  // Tokenize the search string and filter out stop words 
  var filteredTokens = stopword.removeStopwords(req.params.item.split(' '));
  // Use the tokenized words to build a clean search string for the API
  var apiSearchString = encodeURI(filteredTokens.join(" "));

  // Perform the search against the https://api.nutritionix.com/v1_1/search endpoint
  reqPromise({
    uri: 'https://api.nutritionix.com/v1_1/search/'+apiSearchString,
    qs: {
      results: '0:20',
      appId: '488d926c',
      appKey: '9177fe4638f8dfcd93ced560965f7690'
    },
    json: true
  })
    .then(function(data) {
      var scoredHits = data.hits.map(function(d, i) {
        var distance = levenshtein.get(d.fields['item_name'], apiSearchString);
        var scoredHit = {
          name: d.fields['item_name'],
          levenshteinDistance: distance,
          hit: d.fields
        };
        return scoredHit;
      });

      var searchResponse = {
          searchString: apiSearchString,
          searchResults: scoredHits
        }

      req.collection.insert(searchResponse).then(function(){
	      res.send({
	        nutritionix: searchResponse
	      })
      })

    })
    .catch(function(err) {
      console.log(err.stack);
      res.send('Error fetching, scoring, and storing item ' + apiSearchString);
    })
})



app.listen(APP_PORT, function() {
	db.then(function() {
	  	console.log('Connected to Mongo');
		console.log("Express listening on port " + APP_PORT);
	})	
});



