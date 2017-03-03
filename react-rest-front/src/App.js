import React, { Component } from 'react';
import './App.css';
import About from './About';
import Search from './Search';
let axios = require('axios');



class App extends React.Component {
  constructor() {
    super();
    this.state = {value: "",
                  ingredients:[]};

    this.submit_button = this.submit_button.bind(this);
    this.ingredientsInput = this.ingredientsInput.bind(this);
  }
  ingredientsInput(event){
    this.setState({value: event.target.value});
    console.log(event.target.value);
  }
  submit_button(){
    let inputData = {value: this.state.value};
    let __ingredients = this.state.ingredients;
    __ingredients.push(inputData);
    this.setState({ingredients:__ingredients},()=>{
    axios.post('http://localhost:8000/result', __ingredients)
    });
    
    console.log(inputData);
  }
  render() {
      return (
        <Search ingredientsInput={this.ingredientsInput} submit_button={this.submit_button} value={this.state.value}/>

      )
  }
};


export default App;
