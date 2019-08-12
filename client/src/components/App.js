import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Sites from './Site/Sites';
import NavBar from './Navigation/Navbar';
import CreateSite from './Site/CreateSite';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/sites" component={Sites} />
          <Route exact path="/createsite" component={CreateSite} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
