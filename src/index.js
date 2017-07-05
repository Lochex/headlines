import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import './index.css';


// let hashHistory = Router.hashHistory;
render(
  <HashRouter>
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (localStorage.User ? (<Redirect push to="/news" />) : (<Login />))}
        />
        <Route
          path="/news"
          render={() => (!localStorage.User ? (<Redirect to="/" />) : (<App />))}
        />
      </Switch>
    </div>
  </HashRouter>, document.getElementById('root'),
);
