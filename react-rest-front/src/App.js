import React, { Component } from 'react';
import './App.css';
import Search from './Search';
let axios = require('axios');

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
    // preventDefault stops default browser redirection event on button click
    e.preventDefault();
    // destructuring out value and ingredients into variables
    const { value, ingredients } = this.state;
    // future loader
    this.setState({fetching: true});

    let inputData = {value: value};
    let __ingredients = ingredients;
    // the self variable is create in order to retain this context for setState function
    const self = this;
    __ingredients.push(inputData);

    this.setState({ingredients:__ingredients}, () => {
      axios.post('http://localhost:8000/result', __ingredients)
      .then(response => {
        self.setState({fetching: false});
        self.setState({returnedRecipes: []});
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
            { fetching && <p>Loading...</p> }
          </div>
        </section>
        <section className='form-container'>
          { returnedRecipes.map(recipe =>{
            return (
              <div key={recipe.id}>
                <p>Recipe Name: {recipe.recipeName}</p>
                <p>Rating: {recipe.rating}</p>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>From: {recipe.sourceName}</p>
                <hr />
              </div>
            )
          }) }
        </section>
      </div>
    )
  }
};


export default App;
