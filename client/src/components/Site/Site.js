import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import LessonList from '../Lesson/LessonList';
import JoinSiteTimeList from '../Site/JoinSiteTimeList';
import { getUser } from '../../utils/utils';

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
    this.handleRosterView = this.handleRosterView.bind(this);
    this.handleJoinSiteTime = this.handleJoinSiteTime.bind(this);
    this.handleLeaveSitetime = this.handleLeaveSitetime.bind(this);
    this.handleDeleteLesson = this.handleDeleteLesson.bind(this);
    this.handleEditLesson = this.handleEditLesson.bind(this);
    this.state = {
      lessons: [],
      allSiteTimes: [],
      userSitetimes: []
    };
  }
  async componentDidMount() {
    const user = getUser();
    try {
      //get lesosns by SITE ID
      const resUserSiteTimes = await axios.get(
        `http://localhost:5000/api/users/sitetimes/${user._id}`
      );
      const resLessons = await axios.get(
        `http://localhost:5000/api/lessons/site/${this.props.match.params.id}`
      );
      const resSiteTimes = await axios.get(
        `http://localhost:5000/api/sitetimes/site/${this.props.match.params.id}`
      );
      this.setState({
        userSiteTimes: resUserSiteTimes.data.siteTimes,
        lessons: resLessons.data,
        allSiteTimes: resSiteTimes.data
      });
    } catch (e) {
      console.log(e);
    }
  }
  handleRosterView() {
    this.props.history.push(`/sites/${this.props.match.params.id}/roster`);
  }
  onCreateLesson() {
    this.props.history.push(
      `/sites/${this.props.match.params.id}/createlesson`
    );
  }
  handleLessonView(lessonId) {
    this.props.history.push(`/lessons/${lessonId}`);
  }
  handleEditLesson(lessonId) {
    this.props.history.push(`/edit/lessons/${lessonId}`);
  }
  async handleDeleteLesson(lessonId) {
    try {
      await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`);
      const resLessons = await axios.get(
        `http://localhost:5000/api/lessons/site/${this.props.match.params.id}`
      );
      this.setState({ lessons: resLessons.data });
    } catch (e) {}
  }
  handleJoinSiteTime(userId, siteTimeId, siteId) {
    axios
      .put('http://localhost:5000/api/users/sitetimes/join', {
        userId: userId,
        siteTimeId: siteTimeId,
        siteId: siteId
      })
      .then(async res => {
        // need to update lessons
        const user = getUser();
        const resUserSiteTimes = await axios.get(
          `http://localhost:5000/api/users/sitetimes/${user._id}`
        );
        const resLessons = await axios.get('http://localhost:5000/api/lessons');
        const resSiteTimes = await axios.get(
          `http://localhost:5000/api/sitetimes/site/${this.props.match.params.id}`
        );
        this.setState({
          userSiteTimes: resUserSiteTimes.data.siteTimes,
          lessons: resLessons.data,
          allSiteTimes: resSiteTimes.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleLeaveSitetime(userId, siteTimeId) {
    axios
      .put('http://localhost:5000/api/users/sitetimes/leave', {
        userId: userId,
        siteTimeId: siteTimeId
      })
      .then(async res => {
        //need to refresh state
        const user = getUser();
        const resUserSiteTimes = await axios.get(
          `http://localhost:5000/api/users/sitetimes/${user._id}`
        );
        const resLessons = await axios.get('http://localhost:5000/api/lessons');
        const resSiteTimes = await axios.get(
          `http://localhost:5000/api/sitetimes/site/${this.props.match.params.id}`
        );
        this.setState({
          userSiteTimes: resUserSiteTimes.data.siteTimes,
          lessons: resLessons.data,
          allSiteTimes: resSiteTimes.data
        });
        console.log('welp we mae it');
      })
      .catch(err => {
        console.log(err);
      });
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
          <button onClick={this.handleRosterView}>WHOSE IN OUR SITE??</button>
        </div>
        <JoinSiteTimeList
          userSiteTimes={this.state.userSiteTimes}
          allSiteTimes={this.state.allSiteTimes}
          handleJoinSiteTime={this.handleJoinSiteTime}
          handleLeaveSiteTime={this.handleLeaveSitetime}
        />
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
          handleDeleteLesson={this.handleDeleteLesson}
          handleEditLesson={this.handleEditLesson}
        />
      </Container>
    );
  }
}

export default withRouter(Site);
