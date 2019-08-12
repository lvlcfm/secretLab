import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logout from '../Auth/Logout';
import { getJWT, getUser } from '../../utils/utils';
import '../../stylesheets/navbar.css';

class Navbar extends Component {
  render() {
    const anovaToken = getJWT();
    const anovaUser = getUser();
    console.log(anovaToken);
    console.log(anovaUser);
    console.log("this is when we haven't been logged on");
    if (anovaToken === null && anovaToken === null) {
      return <div></div>;
    } else {
      return (
        <div className="navbar-container">
          <div className="navbar-items-left">
            <Link className="navbar-item" to="/">
              LOGO
            </Link>
          </div>
          <div className="navbar-items-right">
            <Link className="navbar-item" to="/">
              home
            </Link>
            <Link className="navbar-item" to="/sites">
              sites
            </Link>
            <Link className="navbar-item" to="/sites">
              my sites
            </Link>
            <Logout />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Navbar);
