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
  width: 400px;
`;

class Navbar extends Component {
  render() {
    const anovaToken = localStorage.getItem('anovaToken');
    const anovaUser = localStorage.getItem('anovaUser');
    const userObj = JSON.parse(anovaUser);
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
                margin: 0,
                marginLeft: '10px'
              }}
              to="/home"
            >
              SECRET LABS
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
            {userObj.role === 'EXEC' ? (
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
            ) : (
              ''
            )}

            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                margin: 0
              }}
              to="/profile"
            >
              profile
            </Link>
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                margin: 0
              }}
              to="/settings"
            >
              settings
            </Link>
            <Logout />
          </NavbarItemsRight>
        </NavbarContainer>
      );
    }
  }
}

export default withRouter(Navbar);
