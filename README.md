# Recipe_Hub

## Description
- This web application will allow a user to search a recipe and then be presented with an interactive map of local grocery stores near them based on their location


## User Story
```
AS A user that enjoys cooking and eating food
I WANT to be able to look up recipes and find local grocery stores
SO THAT I can get the required ingredients for the recipe selected
```

## Acceptance Criteria
* Must use at least two server-side APIs
* Must use a CSS framework other than Bootstrap
* Must be interactive (i.e: accept and respond to user input)
* Use at least one new third-party API
* Must have a polished UI
* Must meet good quality coding standards
* Does not use alerts, confirms or prompts (look into modals)
* Must be deployed to GitHub Pages


## Concept
**`Given`** I am user who wants to find recipes
**`When`**  I click a button named random recipe
**`Then`**  I am taken to a new page which displays the random recipe

**`Given`**  I am a user who views a list of recipes
**`When`** I search the name of a dish or food item
**`Then`**  I am presented with a list of recipes

**`Given`** I am a user who wants to prepare a recipe
**`When`** I view a recipe
**`Then`**  I also view ingredients for that recipe

**`Given`** I am a user who wants to get recipe ingredients
**`When`** I enter my location
**`Then`** I can view a list of grocery stores

## Installation / Live Site
[Github Pages Live Site](https://cjmoye30.github.io/Project1_Recipe_Hub/)

## Usage / Screenshot
<img width="1201" alt="Screenshot 2023-03-13 at 9 46 24 PM" src="https://user-images.githubusercontent.com/122712555/224871121-4f0ec173-5dad-4beb-89af-7601394ae988.png">

## What we learned

### [HTML/CSS: Bulma](https://bulma.io/)
- Utilized HTML to style website
- Merging files may cause conflicts
- Easy to use (documentation and site)
- Less codes to write (readily available codes)
- Forced to ultilize columns (grid system)
- Does not include Javacript
- Not as customizable as CSS (styling, colors, fonts...)
- CSS override chanllenges
- Good responsiveness on mobile 

### [API 1: TheMealDB](https://www.themealdb.com/api.php)
- Full meal details (ingredients)
- Recipe photos included
- Randomn meal search options
- Meal categories available

### [API 2: Geoapify](https://www.geoapify.com/)
- Free API access
- Flexible configuration
- Utilized two seperate API's created a for loop for plotting markers

## Resources / Credits
* [Presentation](https://docs.google.com/presentation/d/1jQ-VpiBo03JUBuU0R8XDv61vs0MOMoEUB0hWLaX8zTY/edit?usp=sharing)
