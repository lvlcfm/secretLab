import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import ANovaLogo from '../../assets/logo-lower.png';

class Signup extends Component {
  handleOnSuccess = response => {
    axios
      .post('http://localhost:5000/api/signup', response.profileObj)
      .then(res => {
        console.log(res.data);

        localStorage.setItem('anovaToken', JSON.stringify(res.data.token));
        localStorage.setItem('anovaUser', JSON.stringify(res.data.user));
        this.props.history.push('/home');
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleOnFailure = response => {
    console.log(response);
    this.props.history.push('/login');
  };
  render() {
    return (
      <div>
        <div>
          <div>ANova </div>
          <div>Labs </div>
        </div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="SIGNUP WITH GOOGLE"
          onSuccess={this.handleOnSuccess}
          onFailure={this.handleOnFailure}
          cookiePolicy={'single_host_origin'}
          responseType="id_token"
        />
      </div>
    );
  }
}

export default withRouter(Signup);
