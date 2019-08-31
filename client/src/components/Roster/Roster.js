import React, { Component } from 'react';
import RosterEntryList from './RosterEntryList';
import axios from 'axios';
import { getJWT } from '../../utils/utils';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosterEntries: []
    };
  }

  async componentDidMount() {
    const token = getJWT();
    const resRosterEntries = await axios.get(
      `/api/rosters/site/${this.props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    this.setState({ rosterEntries: resRosterEntries.data });
  }
  render() {
    return (
      <div>
        <RosterEntryList rosterEntries={this.state.rosterEntries} />
      </div>
    );
  }
}

export default Roster;
