import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logout from '../Auth/Logout';

class Navbar extends Component {
  render() {
    const anovaToken = localStorage.getItem('anovaToken');
    const anovaUser = localStorage.getItem('anovaUser');
    if (anovaToken === null && anovaUser === null) {
      return <div></div>;
    } else {
      return (
        <div>
          <div>
            <Link to="/sites">LOGO</Link>
          </div>
          <div>
            <Link to="/home">home</Link>
            <Link to="/sites">sites</Link>
            <Link to="/dashboard">dashboard</Link>
            <Logout />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Navbar);
