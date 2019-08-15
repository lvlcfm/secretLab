import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import axios from 'axios';
import ANovaLogo from '../../assets/logo-lower.png';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Container = styled.div`
  background-color: rgba(247, 247, 247, 0.86);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 6px -6px 10px #d2edfc, -6px 6px 10px #d2edfc;
  border-radius: 16px;
  margin-top: 100px;
`;
const Wrapper = styled.section`
  width: 350px;
  height: 480px;
  background-color: rgba(247, 247, 247, 0.86);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 6px -6px 10px #d2edfc, -6px 6px 10px #d2edfc;
  border-radius: 16px;
  margin-top: 100px;
`;

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
      <div>
        <Wrapper>
          <Title>YUP</Title>
          <div>
            <div>ANova </div>
            <div>Labs </div>
          </div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={this.handleOnSuccess}
            onFailure={this.handleOnFailure}
            cookiePolicy={'single_host_origin'}
            responseType="id_token"
          />
        </Wrapper>
      </div>
    );
  }
}

export default withRouter(Signin);
