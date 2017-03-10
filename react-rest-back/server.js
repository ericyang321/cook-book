const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios');
const bodyParser = require('body-parser');


//Setting up body parser to handle data in json or encoded url form
//body-parser will parse any data sent in post requests to your server, and attach that data to the body property of the request (req.body)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/recipes',(req,response) =>{
  http.get("http://api.yummly.com/v1/api/recipes?_app_id=1abc20d0&_app_key=1ff19cc3a553063941f5e4f530e42f74&q=onion+soup", (res) =>{
    let body = "";
    res.on('data', (chunk) =>{
      body += chunk;
    });
    res.on('end',()=>{
      var parsed = JSON.parse(body);
      response.send(parsed);
      console.log(parsed)
    });
  });
});

app.post('/result',(req, res) =>{
  let allowedIngredientString = "";
  // Convert the submitted string from front-end into an array
  const ingredientsArray = req.body[0].value.split(" ");

  ingredientsArray.forEach(ingredient => {
    allowedIngredientString += "&allowedIngredient[]=" + ingredient
  })

  axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=1abc20d0&_app_key=1ff19cc3a553063941f5e4f530e42f74${allowedIngredientString}`)
  .then(response => {
    let insert;
    let results = [];
    response.data.matches.forEach(match => {
      const { recipeName, rating, ingredients, id, sourceDisplayName } = match;
      insert = {
        id,
        recipeName,
        rating,
        ingredients,
        sourceName: sourceDisplayName
      }
      results.push(insert);
    })
    return results;
  })
  .then(resultsArray => {
    res.status(200).json(resultsArray);
  })
  .catch(err => {
    res.status(404).json(err);
  })
});


function getRecipeTitle(array) {
        for (let i = 0; i < array.length; i++) {
          let recipeTitle = array[i].title;
          console.log(recipeTitle);
        }
      };

// getRecipe();
app.listen(8000, () => {
  console.log('Server Started on http://localhost:8000');
  console.log('Press CTRL + C to stop server');
});




