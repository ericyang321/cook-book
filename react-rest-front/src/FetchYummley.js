import axios from 'axios';

function FetchYummley(ingredients) {
  return new Promise(function(resolve, reject){
    let allowedIngredientString = "";
    const ingredientsArray = ingredients[0].value.split(" ");

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
          name: recipeName.toLowerCase(),
          rating,
          ingredients,
          sourceName: sourceDisplayName
        });
      });

      resolve(results);
    })
    .catch(issue => {
      reject(issue);
    })
  })
}

export default FetchYummley;
