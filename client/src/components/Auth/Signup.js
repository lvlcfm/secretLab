import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import axios from 'axios';
import ANovaLogo from '../../assets/logo-lower.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 150px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: row;
  font-size: 1.5em;
  text-align: center;
  color: #1f898b;
  margin-bottom: 50px;
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
`;
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
      <Container>
        <Wrapper>
          <img
            style={{ width: '100px' }}
            src={ANovaLogo}
            alt="ANova Logo"
          ></img>
          <Title>
            <div>ANova Labs </div>
          </Title>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="SIGNUP WITH GOOGLE"
            onSuccess={this.handleOnSuccess}
            onFailure={this.handleOnFailure}
            cookiePolicy={'single_host_origin'}
            responseType="id_token"
          />
        </Wrapper>
      </Container>
    );
  }
}

export default withRouter(Signup);
