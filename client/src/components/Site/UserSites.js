import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import UserSitesList from './UserSitesList';

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
      <div>
        SITES
        <UserSitesList
          userSites={this.state.userSites}
          handleSiteView={this.handleSiteView}
        />
      </div>
    );
  }
}

export default withRouter(Sites);
