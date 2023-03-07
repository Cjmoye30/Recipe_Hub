// HTML Selectors
$("#random-button-search").click(function(){
    console.log("Pull a random recipie on button click");
    singleRandomMeal();
})


// Search meals by name:
function searchByName(meal) {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // Console Logging all of the data
            console.log(data);

            var mealName = data.meals[0].strMeal;
            console.log(mealName);

            var areaOfOrigin = data.meals[0].strArea;
            console.log(areaOfOrigin);

            
        })
}
// searchByName("Duck Confit");

var form = $("#recipe-search-form");
form.on("submit", function(e){
    e.preventDefault();
    var userRecipe = $("#user-recipe-input").val();
    console.log(userRecipe);
    searchByName(userRecipe);
})

// Function which will return random meal
// This function needs to be paired with the button which will generate a random recipe
function singleRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var mealData = data.meals[0];
            console.log(mealData);

            // Loop which logs all of the ingredients which are not blank
            // There are a max of 20 ingredients - some of which are blankk
            // WIP

            // Same thing needs to be done for the measures - and then the two of them need to be linked together
            for (var i = 1; i < 20; i++) {
                if (mealData[["strIngredient"+i]] !== "" && mealData[["strMeasure"+i]] !== "") {
                    var ingredient = mealData["strIngredient"+i];
                    var measure = mealData["strMeasure"+i];
                    console.log(ingredient +"\n"+measure);
                }
            }
        })
}

// Will delete out this once it is tied to our HTML search button
singleRandomMeal();

// List all ingredients
function ingredients(){
    var url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

    fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log("All Ingredients Data:");
        console.log(data);

    })
}

// Search meals by first letter:
function searchByFirstLetter(x) {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=" + x)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("Searching meals by the first letter:");

            var len = data.meals.length;
            console.log(len);
            console.log(data);

            for (var i = 0; i < len; i++) {
                console.log("Meal Name: " + data.meals[i].strMeal)
            }
        })
}
// searchByFirstLetter("i");

// Meal Details by ID

function mealByID(id) {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
        })
}
// mealByID(52907);

