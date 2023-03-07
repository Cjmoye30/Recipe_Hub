// Event listeners for search and random generate button
$("#random-button-search").click(function () {
    singleRandomMeal();
})

// Event handler tied to the newly created buttons if there is more than 1 option available for the recipe that they entered
// Grabbing the ID from the target of the element of the button we are clicking
// Using that ID to then pull the recipe contents from the ID function 
$("#recipe-results").click(function (e) {
    var buttonID = e.target.id;
    mealByID(buttonID);
})

$("#recipe-search-form").on("submit", function (e) {
    e.preventDefault();
    var userRecipe = $("#user-recipe-input").val();
    console.log(userRecipe);
    searchByName(userRecipe);
})

// Fetch recipe by name
function searchByName(meal) {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // Console Logging all of the data
            var recipeOptionsNum = data.meals.length;
            console.log(recipeOptionsNum);

            for (var i = 0; i < recipeOptionsNum; i++) {
                var idMeal = data.meals[i].idMeal;
                console.log(idMeal);
                var mealOptionEl = $("<button>").text(data.meals[i].strMeal).attr("id", idMeal).addClass("recipe-option");
                $("#recipe-results").append(mealOptionEl);
            }
        })
}

// Fetch random recipe
function singleRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var mealData = data.meals[0];
            for (var i = 1; i < 20; i++) {
                if (mealData[["strIngredient" + i]] !== "" && mealData[["strMeasure" + i]] !== "") {
                    var ingredient = mealData["strIngredient" + i];
                    var measure = mealData["strMeasure" + i];
                    console.log(ingredient + "\n" + measure);
                }
            }
        })
}

// Fetch recipe by ID
function mealByID(id) {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var mealData = data.meals[0];
            for (var i = 1; i < 20; i++) {
                if (mealData[["strIngredient" + i]] !== "" && mealData[["strMeasure" + i]] !== "") {
                    var ingredient = mealData["strIngredient" + i];
                    var measure = mealData["strMeasure" + i];
                    console.log(ingredient + "\n" + measure);
                }
            }
        })
}