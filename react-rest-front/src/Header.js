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

  blurOverlay (lastKnownScrollPosition) {
    var blurOverlayOpacity = (lastKnownScrollPosition / 300.0)
    document.getElementById('blurred-background').style.opacity = blurOverlayOpacity;
  }

  componentDidMount () {
    let lastKnownScrollPosition = 0;
    let tick = false;
    window.addEventListener('scroll', (e) => {
      // decouple the scroll event from the background update, semi-throttle background blurring actions
      lastKnownScrollPosition = window.scrollY;
      if (!tick) {
        window.requestAnimationFrame(() => {
          this.blurOverlay(lastKnownScrollPosition);
          tick = false;
        });
      }
    tick = true;
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
