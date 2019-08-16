import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import LessonList from '../Lesson/LessonList';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
`;

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
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '100px'
          }}
        >
          <button onClick={this.onCreateLesson}>CREATE THEEEEE LESSON</button>
        </div>
        <LessonList
          lessons={this.state.lessons}
          handleLessonView={this.handleLessonView}
        />
      </Container>
    );
  }
}

export default withRouter(Site);
