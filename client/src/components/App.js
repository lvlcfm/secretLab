import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Sites from './Site/Sites';
import UserSites from './Site/UserSites';
import NavBar from './Navigation/Navbar';
import CreateSite from './Site/CreateSite';
import EditSite from './Site/EditSite';
import Site from './Site/Site';
import CreateLesson from './Lesson/CreateLesson';
import Lesson from './Lesson/Lesson';
import EditLesson from './Lesson/EditLesson';
import Dashboard from './Dashboard/Dashboard';
import Requests from './Request/Requests';
import Profile from './User/Profile';
import Roster from './Roster/Roster';
import Settings from './Settings/Settings';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/sites" component={Sites} />
          <Route exact path="/home" component={UserSites} />
          <Route
            path="/sites/:id"
            exact
            render={props => <Site {...props} />}
          />
          <Route exact path="/createsite" component={CreateSite} />
          <Route exact path="/editsite/:id" component={EditSite} />
          <Route
            exact
            path="/sites/:id/createlesson"
            component={CreateLesson}
          />
          <Route exact path="/lessons/:id" component={Lesson} />
          <Route exact path="/edit/lessons/:id" component={EditLesson} />
          <Route exact path="/sites/:id/roster" component={Roster} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/requests" component={Requests} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
