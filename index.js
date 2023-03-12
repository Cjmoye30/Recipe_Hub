$(function () {

    // start of maps api
    function initMap() {

        var map = L.map("my-map").setView([35.2271, -80.8431], 13);

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
            maxZoom: 13,
            id: "osm-bright",
        }).addTo(map);
        var markerIcon = L.icon({
            iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&iconType=awesome&apiKey=${myAPIKey}`,
            iconSize: [25, 40], // size of the icon
            iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
        });

        fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=place:51ad15dd56663554c0591d95d55d619a4140f00101f90107b5020000000000c00206920309436861726c6f747465&lang=en&limit=20&apiKey=fd3d5e013b4b4cea96e30a0054594a65")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                result.features.forEach((feature) => {
                    let markerPopup = L.popup().setContent(
                        `<div>${feature.properties.address_line1}</div><div>${feature.properties.address_line2}</div>`
                    );
                    let marker = L.marker(
                        [feature.properties.lat, feature.properties.lon],
                        { icon: markerIcon }
                    )
                        .bindPopup(markerPopup).addTo(map);
                });
            })
            .catch((error) => console.log("error", error));
    }

    // end of map api

    // start of recipe api


    // Query Selectors / Event Handlers

    $("#recipe-search-form").on("submit", function (e) {
        e.preventDefault();
        $("#recipe-results").text("")
        var userRecipe = $("#user-recipe-input").val();

        console.log(userRecipe);
        searchByName(userRecipe);
    })

    // Event handler tied to the newly created buttons if there is more than 1 option available for the recipe that they entered
    // Grabbing the ID from the target of the element of the button we are clicking
    // Using that ID to then pull the recipe contents from the ID function 
    $("#search-results-container").click(function (e) {
        var buttonID = e.target.id;

        // Send the user value to local storage
        console.log(buttonID);
        searchHistory.push(buttonID);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        setTimeout(function () {
            location.href = "landingPage.html";
        }, 250)

    })

    // Fetch recipe by name
    // Should limit the search results to 5, and then have a button to search for more which would increase the index by 5
    function searchByName(meal) {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                // Console Logging all of the data

                var recipeOptionsNum = data.meals.length;
                var searchIndex = 0;
                console.log(recipeOptionsNum);


                // Wrap the for loop in a function and if a button is clicked, then run the fuction again

                // Show more options
                $("#show-more").click(function () {
                    showOptions()
                })

                function showOptions() {
                    for (var i = 0; i < recipeOptionsNum; i += 5) {
                        var idMeal = data.meals[i].idMeal;
                        var mealOptionEl = $("<button>").text(data.meals[i].strMeal).attr("id", idMeal).addClass("recipe-option");
                        $("#search-results-container").append(mealOptionEl);
                        searchIndex++;
                        $("#results-qty").text(searchIndex + " out of " + recipeOptionsNum);
                    }
                }
                showOptions();
            })
    }



    // Fetch random recipe
    function singleRandomMeal() {

        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data);

                var mealID = data.meals[0].idMeal;
                searchHistory.push(mealID);
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            })
    }

    var searchHistory = [];
    function initStorage() {
        var storedRecipes = JSON.parse(localStorage.getItem("searchHistory"));
        if (storedRecipes !== null) {
            searchHistory = storedRecipes;
            console.log(searchHistory);
        }

    }

    // Event listeners for search and random generate button
    // Adding a delay so that the function can run before transitioning to the next page
    $("#random-button-search").click(function () {
        singleRandomMeal();
        setTimeout(function () {
            location.href = "landingPage.html";
        }, 250)
    })

    // init functions

    initStorage();
    initMap();
});
