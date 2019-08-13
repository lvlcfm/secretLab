import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LessonList from '../Lesson/LessonList';

class Site extends Component {
  constructor(props) {
    super(props);
    this.onCreateLesson = this.onCreateLesson.bind(this);
    this.handleLessonView = this.handleLessonView.bind(this);
    this.state = {
      lessons: []
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/lessons')
      .then(res => {
        this.setState({ lessons: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onCreateLesson() {
    this.props.history.push(
      `/sites/${this.props.match.params.id}/createlesson`
    );
  }
  handleLessonView(lessonId) {
    this.props.history.push(`/lessons/${lessonId}`);
  }
  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <button onClick={this.onCreateLesson}>CREATE THEEEEE LESSON</button>
        <LessonList
          lessons={this.state.lessons}
          handleLessonView={this.handleLessonView}
        />
      </div>
    );
  }
}

export default withRouter(Site);
