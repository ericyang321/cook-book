const axios = require('axios');

import React, { Component } from 'react';
import Search from './Search';
import RecipeCard from './RecipeCard';
import ErrorCard from './ErrorCard';

class App extends Component {
  constructor() {
    super();
    this.state = {value: "", ingredients:[], "fetching": false, returnedRecipes: []};
    this.submit_button = this.submit_button.bind(this);
    this.ingredientsInput = this.ingredientsInput.bind(this);
  }

  goToHome() {
    this.setState({
      page: 'HOME'
    })
  }

  goToAbout() {
    this.setState({
      page: 'ABOUT'
    })
  }

  ingredientsInput(event){
    this.setState({value: event.target.value});
  }

  submit_button(e){
    e.preventDefault();
    const { value, ingredients } = this.state;

    this.setState({fetching: true});

    let inputData = {value: value};
    let __ingredients = ingredients;

    const self = this;
    __ingredients.push(inputData);
    this.setState({ingredients:__ingredients}, () => {
      self.setState({returnedRecipes: []});
      axios.post('http://localhost:8000/result', __ingredients)
      .then(response => {
        if(response.data.length === 0){
          self.setState({returnedRecipes: false})
        } else {
          self.setState({returnedRecipes: response.data})
        }
        self.setState({fetching: false});
      })
    });
    // Reset ingredients state so that old list of ingredients aren't carried over with every request
    this.setState({ingredients: []})
  }

  render() {
    const { fetching, returnedRecipes } = this.state;
    return (
      <div>
        <section className='search-container'>
          <Search ingredientsInput={this.ingredientsInput} submit_button={this.submit_button} value={this.state.value} fetching={fetching}/>
          <div className='content-container'>

          </div>
        </section>
        <section className='content-container'>
          { !returnedRecipes && <ErrorCard /> }
          { returnedRecipes && returnedRecipes.map(recipe => {
            const { key, name, rating, ingredients, sourceName } = recipe;
          /* Here is where the RecipeCard components is inserted */
            return (
              <RecipeCard
                key={key}
                name={name}
                rating={rating}
                ingredients={ingredients}
                sourceName={sourceName}
              />
            )
          }) }
        </section>
        <div id='blurred-background'></div>
        <div id='acknowledgements'>
          Recipe search powered by <a href='http://www.yummly.co/recipes'>Yummley</a>
        </div>
      </div>
    )
  }
};


export default App;
