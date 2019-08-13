import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Lesson extends Component {
  render() {
    console.log(this.props.match.params.id);
    return <div>LESSON PLAN BABY</div>;
  }
}

export default withRouter(Lesson);
