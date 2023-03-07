
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
            for (var i = 0; i < 20; i++) {
                if (mealData[["strIngredient"+i]] !== "") {
                    console.log(mealData["strIngredient"+i]);
                }
            }

        })

}
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

// start of maps api

var requestOptions = {
    method: 'GET',
  };
  
  fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=fd3d5e013b4b4cea96e30a0054594a65", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=place:51ad15dd56663554c0591d95d55d619a4140f00101f90107b5020000000000c00206920309436861726c6f747465&lang=en&limit=30&apiKey=fd3d5e013b4b4cea96e30a0054594a65")
        .then(response => response.json())
        .then(result => {
          // create a new map object
          const map = new Geoapify.Map({
            apiKey: 'fd3d5e013b4b4cea96e30a0054594a65',
            basemap: 'bright-v9',
            container: 'map-container',
            // center the map on the first result
            center: [result.features[0].properties.lon, result.features[0].properties.lat], 
            // set the initial zoom level
            zoom: 13 
          });

          // add a marker for each result
          result.features.forEach(feature => {
            const marker = new Geoapify.Marker({
              coordinates: [feature.properties.lon, feature.properties.lat],
              color: 'blue'
            });
            map.addMarker(marker);
          });
        })
        .catch(error => console.log('error', error));
