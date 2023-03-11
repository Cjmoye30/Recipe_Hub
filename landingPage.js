$(function () {

    // Return home
    $("#return-to-main").click(function(){
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
                var mealData = data.meals[0];
                for (var i = 1; i < 20; i++) {
                    if (mealData[["strIngredient" + i]] !== "" && mealData[["strMeasure" + i]] !== "" && mealData[["strMeasure" + i]] !== null) {
                        var ingredient = mealData["strIngredient" + i];
                        var measure = mealData["strMeasure" + i];
                        var ingredientPlusMeasure = ingredient + "\n" + measure;
                        var ingredientEl = $("<li>").text(ingredientPlusMeasure);
                        $("#recipe-ingredients").append(ingredientEl);
                    }
                }
    
                var recipeTitle = data.meals[0].strMeal;
                var recipeImg = data.meals[0].strMealThumb;
                var recipeInstrustions = data.meals[0].strInstructions;
    
                $("#recipe-title").text(recipeTitle);
                $("#recipe-img").attr("src", recipeImg);
                $("#recipe-instructions").text(recipeInstrustions)
            })
    }
    mealByID(lastRecipe);

})

