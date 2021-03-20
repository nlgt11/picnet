import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from 'components/layout/Alert/Alert';
import Header from 'components/layout/Header/Header';
import Register from 'components/register/Register';
import store from 'store';
import Login from 'components/login/Login';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Alert />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <div>Home page</div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
