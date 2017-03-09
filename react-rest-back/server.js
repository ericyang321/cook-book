const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});

app.post('/result',(req, res) =>{
  let allowedIngredientString = "";

  const ingredientsArray = req.body[0].value.split(" ");

  ingredientsArray.forEach(ingredient => {
    allowedIngredientString += "&allowedIngredient[]=" + ingredient
  })

  axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=1abc20d0&_app_key=1ff19cc3a553063941f5e4f530e42f74${allowedIngredientString}`)
  .then(response => {
    let results = [];
    response.data.matches.forEach(match => {
      let { recipeName, rating, ingredients, id, sourceDisplayName } = match;
      results.push({
        key: id,
        name: recipeName,
        rating,
        ingredients,
        sourceName: sourceDisplayName
      });
    });
    return results;
  })
  .then(recipes => {
    return res.status(200).json(recipes);
  })
  .catch(issue => {
    return err.status(404).json(issue);
  })
})

app.listen(8000, () => {
  console.log('Server Started on http://localhost:8000');
  console.log('Press CTRL + C to stop server');
});




