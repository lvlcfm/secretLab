import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logout from '../Auth/Logout';
import { getJWT, getUser } from '../../utils/utils';
import '../../stylesheets/navbar.css';

class Navbar extends Component {
  render() {
    const anovaToken = localStorage.getItem('anovaToken');
    const anovaUser = localStorage.getItem('anovaUser');
    if (anovaToken === null && anovaUser === null) {
      return <div></div>;
    } else {
      return (
        <div className="navbar-container">
          <div className="navbar-items-left">
            <Link className="navbar-item" to="/sites">
              LOGO
            </Link>
          </div>
          <div className="navbar-items-right">
            <Link className="navbar-item" to="/home">
              home
            </Link>
            <Link className="navbar-item" to="/sites">
              sites
            </Link>
            <Link className="navbar-item" to="/dashboard">
              dashboard
            </Link>
            <Logout />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Navbar);
