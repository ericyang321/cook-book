const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');


//Setting up body parser to handle data in json or encoded url form
//body-parser will parse any data sent in post requests to your server, and attach that data to the body property of the request (req.body)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.post('/result',(req,res) =>{
  console.log(req.body)
})
// These code snippets use an open-source library. http://unirest.io/nodejs

function getRecipeTitle(array) {
        for (let i = 0; i < array.length; i++) {
          let recipeTitle = array[i].title;
          console.log(recipeTitle);
        }
      };

// getRecipe();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()) //whenever you receive info in the body of post request, it parses and stores it in the body property of your request

app.listen(8000, () => {
  console.log('Server Started on http://localhost:8000');
  console.log('Press CTRL + C to stop server');
});




