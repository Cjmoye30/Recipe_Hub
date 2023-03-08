$(function () {

    // start of maps api
    function initMap() {

        var map = L.map("my-map").setView([35.2271, -80.8431], 14);

        // Get your own API Key on https://myprojects.geoapify.com
        var myAPIKey = "fd3d5e013b4b4cea96e30a0054594a65";

        // Retina displays require different mat tiles quality
        var isRetina = L.Browser.retina;

        var baseUrl =
            "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
        var retinaUrl =
            "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

        // Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
        L.tileLayer(isRetina ? retinaUrl : baseUrl, {
            attribution:
                'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
            apiKey: myAPIKey,
            maxZoom: 14,
            id: "osm-bright",
        }).addTo(map);
    }
    //   fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=place:51ad15dd56663554c0591d95d55d619a4140f00101f90107b5020000000000c00206920309436861726c6f747465&lang=en&limit=30&apiKey=fd3d5e013b4b4cea96e30a0054594a65")
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    $("#recipe-search-form").on("submit", function (e) {
        e.preventDefault();
        var userRecipe = $("#user-recipe-input").val();
        console.log(userRecipe);
        searchByName(userRecipe);
    })

    // Event handler tied to the newly created buttons if there is more than 1 option available for the recipe that they entered
    // Grabbing the ID from the target of the element of the button we are clicking
    // Using that ID to then pull the recipe contents from the ID function 
    $("#recipe-results").click(function (e) {
        var buttonID = e.target.id;
        mealByID(buttonID);
    })

    // Event listeners for search and random generate button
    $("#random-button-search").click(function () {
        singleRandomMeal();
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

    // init functions
    
    initMap();
});
