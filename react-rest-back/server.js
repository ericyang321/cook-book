let express = require('express');
let app = express();
const http = require('http');




app.get('/recipes',(req,response) =>{
  http.get("http://api.yummly.com/v1/api/recipes?_app_id=1abc20d0&_app_key=1ff19cc3a553063941f5e4f530e42f74&q=onion+soup", (res) =>{
    let body = "";
    res.on('data', (chunk) =>{
      body += chunk;
    });
    res.on('end',()=>{
      var parsed = JSON.parse(body);
      response.send(parsed);

    
    });
 

  });
})







// These code snippets use an open-source library. http://unirest.io/nodejs


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




