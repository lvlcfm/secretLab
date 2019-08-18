import React, { Component } from 'react';
import RosterEntryList from './RosterEntryList';
import axios from 'axios';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosterEntries: []
    };
  }

  async componentDidMount() {
    const resRosterEntries = await axios.get(
      `http://localhost:5000/api/rosters/site/${this.props.match.params.id}`
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
