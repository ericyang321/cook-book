let express = require('express');
let app = express();
let https = require('https');
let unirest = require('unirest');

let ingredients = 'rice%2Cchicken%2Ccabbage%2Cradish%2Ceggs';

// These code snippets use an open-source library. http://unirest.io/nodejs

function getRecipe() {
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + ingredients + "&limitLicense=false&number=5&ranking=1")
    .header("X-Mashape-Key", "SUacssKijWmsh8CvaZd8knrnNR0up1NrLi4jsnqjqDwmkNi46m")
    .header("Accept", "application/json")
    .end(function (res) {
      let result = res.body;
      function getRecipeTitle(array) {
        for (let i = 0; i < array.length; i++) {
          let recipeTitle = array[i].title;
          console.log(recipeTitle)
        }
      };
      getRecipeTitle(result);
      
    })
};

getRecipe();

