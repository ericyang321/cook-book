const axios = require('axios');

import React, { Component } from 'react';
import Search from './Search';
import RecipeCard from './RecipeCard';

class App extends Component {
  constructor() {
    super();
    this.state = {value: "", ingredients:[], "fetching": false, returnedRecipes: null};
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
      self.setState({returnedRecipes: null});
      axios.post('http://localhost:8000/result', __ingredients)
      .then(response => {
        self.setState({fetching: false});
        self.setState({returnedRecipes: response.data});
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
          <Search ingredientsInput={this.ingredientsInput} submit_button={this.submit_button} value={this.state.value}/>
          <div className='form-container'>
            <div className='loading-container'>
              { fetching && <div className='loading'></div> }
            </div>
          </div>
        </section>
        <section className='form-container'>

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
      </div>
    )
  }
};


export default App;
