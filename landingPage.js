$(function () {

    // Return home
    $("#return-to-main").click(function () {
        location.href = "index.html";
    })

    var recipeLog = JSON.parse(localStorage.getItem("searchHistory"));
    var lastRecipe = recipeLog[recipeLog.length - 1];
    console.log(lastRecipe);

    // Fetch recipe by ID
    function mealByID(id) {

        fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data.meals[0].idMeal);
                var name = data.meals[0].strMeal;
                var mealData = data.meals[0];
                for (var i = 1; i < 20; i++) {
                    if (mealData[["strIngredient" + i]] !== "" && mealData[["strMeasure" + i]] !== "" && mealData[["strMeasure" + i]] !== null) {
                        var ingredient = mealData["strIngredient" + i];
                        var measure = mealData["strMeasure" + i];
                        var ingredientEl = $("<li>").html("<span class = 'ingredient'>" + ingredient + "</span> <span class = 'measure'>" + measure + "</span>").addClass("ingredientsAndMeasure");
                        $("#recipe-ingredients").append(ingredientEl);
                    }
                }

                var recipeTitle = data.meals[0].strMeal;
                var recipeImg = data.meals[0].strMealThumb;
                var recipeInstrustions = data.meals[0].strInstructions;

                $("#recipe-title").text(recipeTitle);
                $("#recipe-img").attr("src", recipeImg);
                $("#recipe-instructions").text(recipeInstrustions);

                return name;
            })
    }

    // Search recipe on button click from history
    $("#searchHistory").click(function (e) {
        $("#recipe-ingredients").text("");
        mealByID(e.target.id);
    })

    mealByID(lastRecipe);
})

// Displaying local storage in recent searches section
function displaySearches() {

    // Retrieve local storage and store as a variable
    var storedRecipes = JSON.parse(localStorage.getItem("searchHistory"));

    if (storedRecipes.length !== null) {
        $("#clearHistory").attr("style", "display: block");
    }

    for (var i = 0; i < storedRecipes.length; i++) {

        // Creating a list item for each of the stored items

        // Fetching the name of each of the stored items
        fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + storedRecipes[i])
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {

                // Targeting the name of the recipe
                var name = data.meals[0].strMeal;

                // Create and append list elements
                var listEl = $("<button>").addClass("button is-responsive search-history-buttons").attr("id", data.meals[0].idMeal);
                listEl.text(name);
                $("#searchHistory").append(listEl);
            })
    }
}

// Clear Local Storage
$("#clearHistory").click(function () {
    localStorage.clear();
    $("#searchHistory").text("");
    $("#clearHistory").attr("style", "display: none");
})

displaySearches();