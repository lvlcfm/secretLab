import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { removeJWT, removeUser } from '../../utils/utils';

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
    return (
      <div>
        <button onClick={this._logOut}>Logout</button>
      </div>
    );
  }
}
export default withRouter(LogOut);
