import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import RequestList from './RequestList';

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
    axios
      .get('http://localhost:5000/api/requests')
      .then(res => {
        this.setState({ requests: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleApproveRequest(requestId, requestType) {
    axios
      .put(`http://localhost:5000/api/requests/${requestId}`, {
        requestProps: { status: 'APPROVED' },
        requestType: requestType
      })
      .then(res => {
        // go back to sites
        axios
          .get('http://localhost:5000/api/requests')
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
    axios
      .put(`http://localhost:5000/api/requests/${requestId}`, {
        requestProps: { status: 'DENIED' },
        requestType: requestType
      })
      .then(res => {
        // go back to sites
        axios
          .get('http://localhost:5000/api/requests')
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
      <div>
        SITES
        <RequestList
          requests={this.state.requests}
          handleApproveRequest={this.handleApproveRequest}
          handleDenyRequest={this.handleDenyRequest}
        />
      </div>
    );
  }
}

export default withRouter(Requests);
