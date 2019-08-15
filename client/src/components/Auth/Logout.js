import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { removeJWT, removeUser } from '../../utils/utils';
import styled from 'styled-components';

const Logout = styled.div`
  color: white;
`;

class LogOut extends Component {
  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }

  async _logOut() {
    removeJWT();
    removeUser();
    this.props.history.push('/');
  }

  render() {
    return <Logout onClick={this._logOut}>Logout</Logout>;
  }
}
export default withRouter(LogOut);
