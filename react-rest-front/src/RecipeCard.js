import React from 'react';

const RecipeCard = ({name, rating, ingredients, sourceName}) => {
  return (
    <div className='recipe-cards'>
      <p>Recipe Name: {name}</p>
      <p>Rating: {rating}</p>
      <p>Ingredients: {ingredients}</p>
      <p>From: {sourceName}</p>
    </div>
  )
}

export default RecipeCard;
