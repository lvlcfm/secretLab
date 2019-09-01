import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { getJWT } from '../../utils/utils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

const LessonContainer = styled.div`
  margin-right: 24px;
  margin-top: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

const LessonSummary = styled.div`
  border-left: solid #333 5px;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 10px;
`;

const LessonOverview = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const LessonExitTicket = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      summary: '',
      content: '',
      media: '',
      week: '',
      siteTime: '',
      exitTicket: '',
      siteId: '',
      day: ''
    };
  }

  async componentDidMount() {
    const token = getJWT();
    try {
      const resLesson = await axios.get(
        `/api/lessons/${this.props.match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(resLesson.data);
      this.setState({
        title: resLesson.data.title ? resLesson.data.title : '',
        summary: resLesson.data.summary ? resLesson.data.summary : '',
        content: resLesson.data.content ? resLesson.data.content : '',
        media: resLesson.data.media ? resLesson.data.media : '',
        week: resLesson.data.week ? resLesson.data.week : '',
        exitTicket: resLesson.data.exitTicket ? resLesson.data.exitTicket : '',
        startTime: resLesson.data.siteTime_id
          ? resLesson.data.siteTime_id.startTime
          : '',
        endTime: resLesson.data.siteTime_id
          ? resLesson.data.siteTime_id.endTime
          : '',
        day: resLesson.data.siteTime_id ? resLesson.data.siteTime_id.day : ''
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log(this.state.media);
    return (
      <Container>
        <div>
          <LessonContainer>
            <h1>{this.state.title ? this.state.title : ''}</h1>
            <div>Week #{this.state.week ? this.state.week : ''}</div>
            <div>{this.state.day ? this.state.day : ''}</div>

            <div>
              {this.state.startTime
                ? moment
                    .tz(this.state.startTime, 'America/Los_Angeles')
                    .format('h:mm a')
                : ''}{' '}
              -{' '}
              {this.state.endTime
                ? moment
                    .tz(this.state.endTime, 'America/Los_Angeles')
                    .format('h:mm a')
                : ''}
            </div>
            {this.state.media !== '' ? (
              <a href={this.state.media}>Slides</a>
            ) : (
              ''
            )}
            <LessonSummary>
              <div>{this.state.summary ? this.state.summary : ''}</div>
            </LessonSummary>

            <LessonOverview>
              <div
                style={{
                  fontSize: '2em'
                }}
              >
                Overview
              </div>
              {this.state.content ? this.state.content : ''}
            </LessonOverview>

            <LessonExitTicket>
              <div
                style={{
                  fontSize: '1.5em'
                }}
              >
                Exit Ticket
              </div>
              <a href={this.state.exitTicket ? this.state.exitTicket : ''}>
                AirTable Link
              </a>
            </LessonExitTicket>
          </LessonContainer>
        </div>
      </Container>
    );
  }
}
export default withRouter(Lesson);
