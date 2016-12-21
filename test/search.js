var chakram = require('chakram'),
    expect = chakram.expect;

describe("Nutritionix API", function() {

    describe("Search Endpoint", function () {
        var foodItemsURI = "http://localhost:8081/api/fooditems/";
        var foodItemPost;

        before(function () {
            var apiErrorSchema = {
                properties: {
                    error: {
                        properties: {
                            status: {type: "integer"},
                            message: {type: "string"}
                        },
                        required: ["status", "message"]
                    }
                },
                required: ["error"]
            };

            chakram.addProperty("api", function(){});
            chakram.addMethod("error", function (respObj, status, message) {
                expect(respObj).to.have.schema(apiErrorSchema);
                expect(respObj).to.have.status(status);
                expect(respObj).to.have.json('error.message', message);
                expect(respObj).to.have.json('error.status', status);
            });
        });


        before(function () {
            foodItemPost = chakram.post(foodItemsURI+"chicken sandwich");
        });


        var shouldSupportItemSearch = function (search) {
            it("should support item search for '"+search+"'", function () {
                var searchStringCheck = chakram.post(foodItemsURI+search);
                return expect(searchStringCheck).to.have.status(200);
            });
        };

        it("should return name, levenshteinDistance, and hit for any queried food item", function () {
            return expect(foodItemPost).to.have.schema('nutritionix.searchResults', {
                type: "array",
                nutritionix: {
                    searchResults: {
                        type: "object",
                        properties: {
                            name: {type: "string"},
                            levenshteinDistance: {type: "integer"},
                            hit: {type: "array"}
                        },
                        required: ["name", "levenshteinDistance", "hit"]
                } }
            });
        });

        shouldSupportItemSearch('asparagus tips');
        shouldSupportItemSearch('broccoli spears');
        shouldSupportItemSearch('boiled carrots');
        shouldSupportItemSearch('cauliflower cheese');
        shouldSupportItemSearch('celery sticks');
        shouldSupportItemSearch('corn on the cob');
        shouldSupportItemSearch('cucumber salad');
        shouldSupportItemSearch('iceberg lettuce');
        shouldSupportItemSearch('grilled mushrooms');
        shouldSupportItemSearch('red onion and kidney beans');
        shouldSupportItemSearch('red and green pepper');
        shouldSupportItemSearch('new boiled potatoes');
        shouldSupportItemSearch('sauted spinach');
        shouldSupportItemSearch('grilled squash');
        shouldSupportItemSearch('zucchini');
        shouldSupportItemSearch('cherry tomato and mozarella salad');
        shouldSupportItemSearch('burger with bleu cheese');
        shouldSupportItemSearch('cheddar cheese and ham toastie');
        shouldSupportItemSearch('cottage cheese dip');
        shouldSupportItemSearch('goat cheese and beetroot salad');
        shouldSupportItemSearch('mozzarella and basil salad');
        shouldSupportItemSearch('chicken sandwich');

    });
});
