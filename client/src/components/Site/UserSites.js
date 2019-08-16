import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import UserSitesList from './UserSitesList';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSites: []
    };
    this.handleSiteView = this.handleSiteView.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('anovaUser'));
    console.log(user);
    console.log('^THIS AS USER?');
    axios
      .post(`http://localhost:5000/api/users/${user._id}`)
      .then(res => {
        // storing token from server
        console.log(res.data);
        this.setState({ userSites: res.data.sites });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSiteView(siteId) {
    this.props.history.push(`/sites/${siteId}`);
  }

  render() {
    return (
      <Container>
        <UserSitesList
          userSites={this.state.userSites}
          handleSiteView={this.handleSiteView}
        />
      </Container>
    );
  }
}

export default withRouter(Sites);
