import React, { Component } from 'react';
import App from './App';
import About from './About'

class Header extends Component {
  constructor() {
    super();
    this.state = {page: 'HOME'};
    this.goToHome = this.goToHome.bind(this);
    this.goToAbout = this.goToAbout.bind(this);
  }

  goToHome () {
    this.setState({
      page: 'HOME'
    })
  }

  goToAbout () {
    this.setState({
      page: 'ABOUT'
    })
  }

  throttle () {
    // Fires every 250ms instead.
  }

  componentDidMount () {
    let lastKnownScrollPosition = 0;
    let tick = false;
    let opacity;
    let blurredBackground = document.getElementById('blurred-background');;
    window.addEventListener('scroll', function(e) {
      lastKnownScrollPosition = window.scrollY;
      opacity = (lastKnownScrollPosition / 100.0)
      if (!tick) {
        window.requestAnimationFrame(function() {
          blurredBackground.style.opacity = opacity;
          tick = false;
        });
      }
      tick = true;
    });
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
        <div id='nav-bar'>
          <button className='nav-button' onClick={this.goToHome}>HOME</button>
          <button className='nav-button' onClick={this.goToAbout}>ABOUT</button>
        </div>
        {content}
      </div>
    )
  }
};

export default Header;
