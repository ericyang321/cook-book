import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import './index.css';
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import App from './App'

ReactDOM.render((
    <Router history = {browserHistory}>
      <Route path ="/" component ={Header}>
        <IndexRoute component ={App}/>
      </Route>
    </Router>
  ), document.getElementById('root')
);
