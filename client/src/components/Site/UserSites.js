import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import UserSitesList from './UserSitesList';
import Onboard from '../Onboard/Onboard';
import { getUser } from '../../utils/utils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class UserSites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSites: [],
      userRoleRequests: [],
      roleRequest: 'MENTEE',
      userRole: ''
    };
    this.handleSiteView = this.handleSiteView.bind(this);
    this.handleRoleRequestChange = this.handleRoleRequestChange.bind(this);
    this.handleRoleRequestSubmit = this.handleRoleRequestSubmit.bind(this);
  }
  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('anovaUser'));
    try {
      const resUserSites = await axios.get(
        `http://localhost:5000/api/users/${user._id}`
      );
      const resUserRoleRequests = await axios.get(
        `http://localhost:5000/api/requests/role/${user._id}`
      );
      this.setState({
        userSites: resUserSites.data.sites,
        userRoleRequests: resUserRoleRequests.data,
        userRole: resUserSites.data.role
      });
    } catch (e) {
      console.log(e);
    }
  }
  handleSiteView(siteId) {
    this.props.history.push(`/sites/${siteId}`);
  }
  handleRoleRequestChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleRoleRequestSubmit() {
    const user = getUser();
    axios
      .post('http://localhost:5000/api/requests', {
        requester: user._id,
        requestType: 'ROLE',
        roleRequest: this.state.roleRequest
      })
      .then(res => {
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.userRole === 'GUEST') {
      return (
        <Container>
          <Onboard
            userRole={this.state.userRole}
            userRoleRequests={this.state.userRoleRequests}
            handleRoleRequestChange={this.handleRoleRequestChange}
            handleRoleRequestSubmit={this.handleRoleRequestSubmit}
          />
        </Container>
      );
    } else {
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
}

export default withRouter(UserSites);
