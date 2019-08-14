import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import '../../stylesheets/login.scss';
import ANovaLogo from '../../assets/logo-lower.png';

class Signin extends Component {
  handleOnSuccess = response => {
    axios
      .post('http://localhost:5000/api/login', response.profileObj)
      .then(res => {
        localStorage.setItem('anovaToken', JSON.stringify(res.data.token));
        localStorage.setItem('anovaUser', JSON.stringify(res.data.user));
        this.props.history.push('/home');
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/signup');
      });
  };
  handleOnFailure = response => {
    console.log(response);
    this.props.history.push('/signup');
  };
  render() {
    return (
      <div className="signUpBox">
        <img src={ANovaLogo} alt="anova labs logo" className="logo" />
        <div className="title">
          <div className="anova">ANova </div>
          <div className="labs">Labs </div>
        </div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={this.handleOnSuccess}
          onFailure={this.handleOnFailure}
          cookiePolicy={'single_host_origin'}
          responseType="id_token"
        />
      </div>
    );
  }
}

export default withRouter(Signin);
