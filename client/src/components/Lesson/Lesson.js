import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Lesson extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.match.params.id);
    return <div>LESSON PLAN BABY</div>;
  }
}

export default withRouter(Lesson);
