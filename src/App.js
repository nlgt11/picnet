import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from 'components/layout/Alert/Alert';
// import Footer from 'components/layout/Footer/Footer';
// import Header from 'components/layout/Header/Header';
import Register from 'components/register/Register';
import store from 'store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route path="/register">
            <Register />
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
