import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logout from '../Auth/Logout';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.45rem;
  padding-bottom: 1.0875rem;
  width: 100%;
  background: #333333;
`;
const NavbarItemsLeft = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavbarItemsRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 300px;
`;

class Navbar extends Component {
  render() {
    const anovaToken = localStorage.getItem('anovaToken');
    const anovaUser = localStorage.getItem('anovaUser');
    if (anovaToken === null && anovaUser === null) {
      return <div></div>;
    } else {
      return (
        <NavbarContainer>
          <NavbarItemsLeft>
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                margin: 0
              }}
              to="/sites"
            >
              LOGO
            </Link>
          </NavbarItemsLeft>
          <NavbarItemsRight>
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                margin: 0
              }}
              to="/home"
            >
              home
            </Link>
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                margin: 0
              }}
              to="/sites"
            >
              sites
            </Link>
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                margin: 0
              }}
              to="/dashboard"
            >
              dashboard
            </Link>
            <Logout />
          </NavbarItemsRight>
        </NavbarContainer>
      );
    }
  }
}

export default withRouter(Navbar);
