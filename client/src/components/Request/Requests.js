import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import RequestList from './RequestList';
import { getUser, getJWT } from '../../utils/utils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 100px;
`;

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
    this.handleApproveRequest = this.handleApproveRequest.bind(this);
    this.handleDenyRequest = this.handleDenyRequest.bind(this);
  }
  componentDidMount() {
    const user = getUser();
    const token = getJWT();
    axios
      .get('http://localhost:5000/api/requests', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.setState({ requests: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleApproveRequest(requestId, requestType) {
    const user = getUser();
    const token = getJWT();
    axios
      .put(
        `http://localhost:5000/api/requests/${requestId}`,
        {
          requestProps: { status: 'APPROVED' },
          requestType: requestType
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        // go back to sites
        axios
          .get('http://localhost:5000/api/requests', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            this.setState({ requests: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDenyRequest(requestId, requestType) {
    const user = getUser();
    const token = getJWT();
    axios
      .put(
        `http://localhost:5000/api/requests/${requestId}`,
        {
          requestProps: { status: 'DENIED' },
          requestType: requestType
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        // go back to sites
        axios
          .get('http://localhost:5000/api/requests', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            this.setState({ requests: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container>
        <RequestList
          requests={this.state.requests}
          handleApproveRequest={this.handleApproveRequest}
          handleDenyRequest={this.handleDenyRequest}
        />
      </Container>
    );
  }
}

export default withRouter(Requests);
