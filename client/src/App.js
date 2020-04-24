import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/signin' />
          </Route>
          <Route path='/signup'>
            <>
              <h1>Register</h1>
              <Register />
            </>
          </Route>
          <Route path='/signin'>
            <>
              <h1>Login:</h1>
              <Login />
            </>
          </Route>
          <PrivateRoute path='/jokes' component={Jokes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
