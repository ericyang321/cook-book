import React, { Component } from 'react';
import Search from './Search';
import RecipeCard from './RecipeCard';
import ErrorCard from './ErrorCard';
import FetchYummley from './FetchYummley';

class App extends Component {
  constructor() {
    super();
    this.state = {value: "", ingredients:[], "fetching": false, returnedRecipes: []};
    this.submit_button = this.submit_button.bind(this);
    this.ingredientsInput = this.ingredientsInput.bind(this);
  }

  goToHome() {
    this.setState({page: 'HOME'})
  }

  goToAbout() {
    this.setState({page: 'ABOUT'})
  }

  ingredientsInput(event) {
    this.setState({value: event.target.value});
  }

  submit_button(e){
    e.preventDefault();

    this.setState({fetching: true});
    const { value, ingredients } = this.state;
    let inputData = {value: value.toLowerCase()};
    let _ingredients = ingredients;
    _ingredients.push(inputData);

    this.setState({ingredients:_ingredients}, () => {
      this.setState({returnedRecipes: []});

      /**
       *Accepts ingredients user typed through search bar, and performs fetch request to Yummley API.
       */
      FetchYummley(_ingredients)
      .then(response => {
        if(response.length === 0){
          this.setState({returnedRecipes: false})
        }else{
          this.setState({returnedRecipes: response})
        }
        this.setState({fetching: false});
      })
    });

    /**
     *Reset ingredients state so that old list of ingredients aren't
     *carried over with subsequent fetch requests
     */
    this.setState({ingredients: []});
  }

  render() {
    const { fetching,
            returnedRecipes,
            value,
          } = this.state;
    return (
      <div>

        <section className='search-container'>
          <Search
            ingredientsInput={this.ingredientsInput}
            submit_button={this.submit_button}
            value={value}
            fetching={fetching}
          />
          <div className='content-container'></div>
        </section>

        <section className='content-container'>
          { !returnedRecipes && <ErrorCard /> }
          <div className='flexed-result-container'>
            {returnedRecipes && returnedRecipes.map(recipe => {
              const { key, name, rating, ingredients, sourceName } = recipe;
              return (
                <RecipeCard
                  key={key}
                  name={name}
                  rating={rating}
                  ingredients={ingredients}
                  sourceName={sourceName}
                />
              )
            })}
          </div>
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
