
A node js API service that can allow a user to search for food item calorie content using the requirements below

**Requirements**

* Build the app using node js and mongo

* Sign up for the nutritionix API developer (free) version

* Tokenize the search string and filter out stop words (there are lots of tokenizer libraries in NPM - e.g. "natural") 

* Use the tokenized words to build a clean search string for the API

* Perform the search against the https://api.nutritionix.com/v1_1/search endpoint

* Store the original search string in a document along with the returned matches in embedded documents

* Use the levenshtein distance algorithm to score the returned food Item against the string submitted in the search, and store this along with each result, and return results to the user

* Query the endpoint with every item in the food items xls file, storing the results in the process 

* Export the results from mongo and include the JSON in your final output

**Questions**

* Identify and explain any opportunities for improving the service/implementation suggested above

* Explain some pro’s and con’s of filtering out the stop words

**Operations**

* Draw a picture of how a production facing tool that performs the same function might operate

* What operational concerns would need to be addressed - e.g. public facing end point, security

* How could such an endpoint be monitored for errors or throughput rate

**Extra Points**

* Write the code using promises

* Write pseudo code for how the service might respond to repeat searches for the same item

