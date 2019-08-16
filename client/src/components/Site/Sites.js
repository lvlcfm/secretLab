import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SitesList from './SitesList';

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
      sites: []
    };
    this.handleDeleteSite = this.handleDeleteSite.bind(this);
    this.handleSiteView = this.handleSiteView.bind(this);
    this.handleJoinSite = this.handleJoinSite.bind(this);
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/sites')
      .then(res => {
        // storing token from server
        this.setState({ sites: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSiteView(siteId) {
    this.props.history.push(`/sites/${siteId}`);
  }
  handleDeleteSite(siteId) {
    axios
      .delete(`http://localhost:5000/api/sites/${siteId}`)
      .then(res => {
        // storing token from server
        axios
          .get('http://localhost:5000/api/sites')
          .then(res => {
            // storing token from server
            this.setState({ sites: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleJoinSite(siteId, userId) {
    axios
      .post('http://localhost:5000/api/requests', {
        requester: userId,
        requestType: 'SITE',
        site_id: siteId
      })
      .then(res => {
        // go back to sites
        this.props.history.push('/sites');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '100px'
          }}
        >
          <Link to="/createsite">Create Site</Link>
        </div>
        <Container>
          <SitesList
            sites={this.state.sites}
            handleDeleteSite={this.handleDeleteSite}
            handleSiteView={this.handleSiteView}
            handleJoinSite={this.handleJoinSite}
          />
        </Container>
      </div>
    );
  }
}

export default withRouter(Sites);
