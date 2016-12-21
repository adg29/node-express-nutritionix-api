var stopword = require("stopword");

  // Transform input into tokenized, filtered words and build an encoded search string for the API

var SearchString = function(input){
	this.input = input || '';
	this.tokens = this.tokenize(this.input);
	this.filtered = this.filter(this.tokens);
	this.filteredAndEncoded = this.encode(this.filtered.join(' '));
};

SearchString.prototype.tokenize = function(input){
	var toTokenize = input || this.input;
	// Tokenize the search string 
	return toTokenize.split(' ');
}
SearchString.prototype.filter = function(tokens){
	var toFilter = tokens || this.tokens;
  	// Filter out stop words 
 	var filteredTokens = stopword.removeStopwords(toFilter);
 	return filteredTokens;
}
SearchString.prototype.encode = function(str){
	var toEncode = str || this.filtered.join(' ');
  	return encodeURI(toEncode);
}

module.exports = SearchString;
