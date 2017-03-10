import React, { Component } from 'react';


class ProductItem extends React.Component {
    render() {
    	    console.log(this.props.returnedRecipes);
    	    this.props.returnedRecipes.map(recipe =>{
    	    	let recipeName = recipe.recipeName;
    	    	console.log(recipeName)
    	    })

        return (


            <div className="col-xs-12 col-sm-6 col-md-3">

            { this.props.returnedRecipes.map(recipe =>{

                <div onClick={this.props.handleClick} key={recipe.id}>
                                    <p>Recipe Name: {recipe.recipeName}</p>
                <p>Rating: {recipe.rating}</p>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>From: {recipe.sourceName}</p>
                <hr />
                </div>
            
            }) }

            </div>
        )
    }
};
export default ProductItem;