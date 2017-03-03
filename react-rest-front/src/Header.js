import React, { Component } from 'react';
import App from './App';
import About from './About'

class Header extends React.Component {
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
      content = <App />
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
};

export default Header;
