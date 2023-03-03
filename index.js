

// Search meals by name:
function searchByName(meal) {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            var mealName = data.meals[0].strMeal;
            console.log(mealName);

            var areaOfOrigin = data.meals[0].strArea;
            console.log(areaOfOrigin);

            var xyz = "strIngredient1";
            console.log(data.meals[0]);
            
        })
}

searchByName("Duck Confit");


// Return a single random meal:
function singleRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log("Single Random Meal Data:");
            var randomMealString = data.meals[0].strMeal;
            // searchByName(randomMealString);
            // console.log("Single random meal: " + data.meals[0].strMeal);
        })
}
// This function needs to be paired with the button which will generate a random recipe
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
mealByID(52907);

