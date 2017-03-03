import React, { Component } from 'react';
import './App.css';
import About from './About';
import Search from './Search';
let axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    // this.state.page is what will be used to track which page to render
    this.state = {
      page: 'HOME'
    }
    // we need to bind our methods to the component itself
    this.goToHome = this.goToHome.bind(this);
    this.goToAbout = this.goToAbout.bind(this);
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
  render() {
    let content
    if (this.state.page === 'HOME') {
      content = <Home />
    } else if (this.state.page === 'ABOUT') {
      content = <About />
    }
    return (
      <div>
        <div>
          <button onClick={this.goToHome}>HOME</button>
          <button onClick={this.goToAbout}>ABOUT</button>
        </div>
        {content}
      </div>
    )
  }
}

class Home extends React.Component {
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
