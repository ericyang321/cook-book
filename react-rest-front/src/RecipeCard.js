import React from 'react';

const RecipeCard = ({name, rating, ingredients, sourceName}) => {
  return (
    <div>
      <p>Recipe Name: {name}</p>
      <p>Rating: {rating}</p>
      <p>Ingredients: {ingredients}</p>
      <p>From: {sourceName}</p>
      <hr />
    </div>
  )
}

export default RecipeCard;
