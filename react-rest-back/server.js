let express = require('express');
let app = express();

let unirest = require('unirest');

let ingredients = 'rice%2Cchicken%2Ccabbage%2Cradish%2Ceggs';

// These code snippets use an open-source library. http://unirest.io/nodejs

	

app.get('/recipes',(req, response) =>{
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1")
    .header("X-Mashape-Key", "SUacssKijWmsh8CvaZd8knrnNR0up1NrLi4jsnqjqDwmkNi46m")
    .header("Accept", "application/json")
    .end(function (result) {
      let recipeResults = result.body;
      response.send(result.body)
    });
	
})


app.listen(8000, () => {
  console.log('Server Started on http://localhost:8000');
  console.log('Press CTRL + C to stop server');
});

