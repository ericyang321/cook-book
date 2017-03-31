import React from 'react';
import { render } from 'react-dom';
import Header from './Header';
import './index.css';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './App'

render((
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <IndexRoute component={App}/>
      </Route>
    </Router>
  ), document.getElementById('root')
);
