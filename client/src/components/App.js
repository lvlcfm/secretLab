import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Sites from './Site/Sites';
import NavBar from './Navigation/Navbar';
import CreateSite from './Site/CreateSite';
import Site from './Site/Site';
import CreateLesson from './Lesson/CreateLesson';
import Lesson from './Lesson/Lesson';
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
          <Route
            path="/sites/:id"
            exact
            render={props => <Site {...props} />}
          />
          <Route exact path="/createsite" component={CreateSite} />
          <Route
            exact
            path="/sites/:id/createlesson"
            component={CreateLesson}
          />
          <Route exact path="/lessons/:id" component={Lesson} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
