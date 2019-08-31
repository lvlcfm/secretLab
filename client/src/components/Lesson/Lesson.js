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
  border-left: solid #333 5px;
  margin-right: 24px;
  margin-top: 50px;
  padding-left: 10px;
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
      siteId: ''
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
          : ''
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const momentLikeThis = moment
      .tz(this.state.startTime, 'America/Los_Angeles')
      .format('h:mm a');
    console.log(momentLikeThis);
    return (
      <Container>
        <div>
          <div>
            <div>Lesson of the Day</div>
          </div>
          <LessonContainer onSubmit={{}}>
            <div>
              Title:
              {this.state.title ? this.state.title : ''}
            </div>
            <div>
              Summary
              {this.state.summary ? this.state.summary : ''}
            </div>
            <div>
              content
              {this.state.content ? this.state.content : ''}
            </div>
            <div>Media Content {this.state.media ? this.state.media : ''}</div>
            <div>Week: {this.state.week ? this.state.week : ''}</div>
            <div>
              ExitTicket: {this.state.exitTicket ? this.state.exitTicket : ''}
            </div>
            <div>
              Start Time:{' '}
              {this.state.startTime
                ? moment
                    .tz(this.state.startTime, 'America/Los_Angeles')
                    .format('h:mm a')
                : ''}
            </div>
            <div>
              End Time:{' '}
              {this.state.endTime
                ? moment
                    .tz(this.state.endTime, 'America/Los_Angeles')
                    .format('h:mm a')
                : ''}
            </div>
          </LessonContainer>
        </div>
      </Container>
    );
  }
}
export default withRouter(Lesson);
