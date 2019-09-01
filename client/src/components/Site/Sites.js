import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SitesList from './SitesList';
import { getUser, getJWT } from '../../utils/utils';

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
      userRole: '',
      sites: [],
      userSiteRequests: [],
      userSites: []
    };
    this.handleDeleteSite = this.handleDeleteSite.bind(this);
    this.handleEditSite = this.handleEditSite.bind(this);
    this.handleSiteView = this.handleSiteView.bind(this);
    this.handleJoinSite = this.handleJoinSite.bind(this);
  }
  async componentDidMount() {
    try {
      const user = getUser();
      const token = getJWT();
      const resUser = await axios.get(`/api/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resAllSites = await axios.get('/api/sites', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resUserSiteRequests = await axios.get(
        `/api/requests/site/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      this.setState({
        sites: resAllSites.data,
        userSiteRequests: resUserSiteRequests.data,
        userRole: resUser.data.role,
        userSites: resUser.data.sites
      });
    } catch (e) {
      console.log(e);
    }
  }
  handleSiteView(siteId) {
    this.props.history.push(`/sites/${siteId}`);
  }
  handleEditSite(siteId) {
    this.props.history.push(`/editsite/${siteId}`);
  }
  handleDeleteSite(siteId) {
    const token = getJWT();
    axios
      .delete(`/api/sites/${siteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        // storing token from server
        axios
          .get('/api/sites', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
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
    const token = getJWT();
    axios
      .post(
        '/api/requests',
        {
          requester: userId,
          requestType: 'SITE',
          site_id: siteId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(async res => {
        const user = getUser();
        const resUserSiteRequests = await axios.get(
          `/api/requests/site/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.setState({ userSiteRequests: resUserSiteRequests.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const user = getUser();
    return (
      <div>
        {user.role === 'EXEC' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '100px'
            }}
          >
            <Link
              style={{
                color: '#333',
                textDecoration: 'none',
                border: 'solid #333 3px',
                borderRadius: '6px',
                boxShadow: '4px 4px 0px #333',
                padding: '10px'
              }}
              to="/createsite"
            >
              Create Site
            </Link>
          </div>
        ) : (
          ''
        )}

        <Container>
          <SitesList
            userRole={this.state.userRole}
            userSiteRequests={this.state.userSiteRequests}
            sites={this.state.sites}
            userSites={this.state.userSites}
            handleDeleteSite={this.handleDeleteSite}
            handleEditSite={this.handleEditSite}
            handleSiteView={this.handleSiteView}
            handleJoinSite={this.handleJoinSite}
          />
        </Container>
      </div>
    );
  }
}

export default withRouter(Sites);
