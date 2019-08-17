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
    this.handleJoinSiteTime = this.handleJoinSiteTime.bind(this);
    this.handleLeaveSitetime = this.handleLeaveSitetime.bind(this);
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
      const resLessons = await axios.get('http://localhost:5000/api/lessons');
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
  onCreateLesson() {
    this.props.history.push(
      `/sites/${this.props.match.params.id}/createlesson`
    );
  }
  handleLessonView(lessonId) {
    this.props.history.push(`/lessons/${lessonId}`);
  }
  handleJoinSiteTime(userId, siteTimeId) {
    axios
      .put('http://localhost:5000/api/users/sitetimes/join', {
        userId: userId,
        siteTimeId: siteTimeId
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
        //this.props.history.push('/sites');
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
        />
      </Container>
    );
  }
}

export default withRouter(Site);
