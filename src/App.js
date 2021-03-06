import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from 'components/layout/Alert/Alert';
import Header from 'components/layout/Header/Header';
import Register from 'components/register/Register';
import store from 'store';
import Login from 'components/login/Login';

import './App.scss';
import { loadUser } from './actions/auth';
import GirdList from 'components/gridlists/GirdList';
import Upload from 'components/upload/Upload';
import Friend from 'components/friend/Friend';
import PrivateRoute from 'components/hoc/PrivateRoute';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
          <PrivateRoute path="/upload" component={Upload} />
          <PrivateRoute path="/friends" component={Friend} />
          <PrivateRoute path="/pictures" component={GirdList} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
