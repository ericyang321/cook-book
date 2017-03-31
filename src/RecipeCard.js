import React from 'react';

const RecipeCard = ({name, rating, ingredients, sourceName}) => {
  const googleUrlParse = (string) => {
    return string.split(' ').join('+');
  }

  return (
    <div className='recipe-cards'>
      <p className='title'>{name}</p>
      <p className='ratings'>{rating} / 5 </p>
      <div className='ingredients'>
        {ingredients.map(ingred => {
          return <span key={ingred} className='ingred'>{ingred},   </span>
        })}
        <p className='separator'></p>
      </div>
      <a
        href={"https://www.google.com/search?q="+ googleUrlParse(sourceName) + " " + googleUrlParse(name)}
        className='google-search'
        target="_blank"
      >
        Click Me To Google The Steps
      </a>
    </div>
  )
}

export default RecipeCard;
