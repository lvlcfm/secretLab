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

const LessonContainer = styled.form`
  border-left: solid #333 5px;
  margin-right: 24px;
  margin-top: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

class EditLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: '',
      siteTimes: [],
      lesson_title: '',
      lesson_summary: '',
      lesson_content: '',
      lesson_media: '',
      lesson_week: '',
      lesson_siteTime: '',
      lesson_exitTicket: '',
      lesson_siteId: '',
      siteObj: '',
      site_id: '',
      day: '',
      startTime: '',
      endTime: '',
      siteNumber: '',
      siteTimeId: ''
    };

    this.change = this.change.bind(this);
    this.handleSiteTimeChange = this.handleSiteTimeChange.bind(this);

    this.submit = this.submit.bind(this);
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
      const resSite = await axios.get(`/api/sites/${resLesson.data.site_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.setState({
        siteObj: resSite.data,
        site_id: resSite.data._id,
        day: resLesson.data.siteTime_id.day,
        startTime: resLesson.data.siteTime_id.startTime,
        endTime: resLesson.data.siteTime_id.endTime,
        siteNumber: resLesson.data.siteTime_id.siteNumber,
        siteTime_id: resLesson.data.siteTime_id._id,
        siteTimes: resSite.data.siteTimes,
        lesson_title: resLesson.data.title ? resLesson.data.title : '',
        lesson_summary: resLesson.data.summary ? resLesson.data.summary : '',
        lesson_content: resLesson.data.content ? resLesson.data.content : '',
        lesson_media: resLesson.data.media ? resLesson.data.media : '',
        lesson_week: resLesson.data.week ? resLesson.data.week : '',
        lesson_exitTicket: resLesson.data.exitTicket
          ? resLesson.data.exitTicket
          : '',
        lesson_siteTime_id: resLesson.data.siteTime_id
          ? resLesson.data.siteTime_id
          : '',
        lesson_site_id: resLesson.data.site_id ? resLesson.data.site_id : ''
      });
    } catch (e) {
      console.log(e);
    }
  }

  // takes an event and creates a key,value pair
  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSiteTimeChange(event) {
    const newTimeList = this.state.siteTimes.filter(
      site => parseInt(site.siteNumber) === parseInt(event.target.value)
    );
    const newTime = newTimeList[0];
    this.setState({
      day: newTime.day,
      startTime: newTime.startTime,
      endTime: newTime.endTime,
      siteNumber: newTime.siteNumber,
      siteTime_id: newTime._id
    });
  }
  submit(event) {
    const token = getJWT();
    event.preventDefault();
    axios
      .put(
        `/api/lessons/${this.props.match.params.id}`,
        {
          title: this.state.lesson_title,
          summary: this.state.lesson_summary,
          content: this.state.lesson_content,
          media: this.state.lesson_media,
          week: this.state.lesson_week,
          exitTicket: this.state.lesson_exitTicket,
          site_id: this.state.site_id,
          siteTime_id: this.state.siteTime_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        // storing token from server
        this.props.history.push(`/sites/${this.state.site_id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var optionList = [];

    if (this.state.siteObj) {
      for (
        let index = 0;
        index < this.state.siteObj.siteTimes.length;
        index++
      ) {
        const siteTime = this.state.siteObj.siteTimes[index];
        if (siteTime._id !== this.state.siteTime_id) {
          optionList.push(
            <option key={siteTime._id} value={siteTime.siteNumber}>
              {`[${siteTime.siteNumber}] ${moment
                .tz(siteTime.startTime, 'America/Los_Angeles')
                .format('h:mm a')}-${moment
                .tz(siteTime.endTime, 'America/Los_Angeles')
                .format('h:mm a')} ${siteTime.day}`}
            </option>
          );
        }
      }
    }
    return (
      <Container>
        <div>
          <div>
            <div>EDIT LESSON PLAN</div>
          </div>
          <LessonContainer onSubmit={this.submit}>
            <div>
              <label htmlFor="lesson_title">
                Lesson Title
                <input
                  id="lesson_title"
                  type="text"
                  name="lesson_title"
                  onChange={this.change}
                  value={this.state.lesson_title}
                />
              </label>
            </div>
            <div>
              <label htmlFor="lesson_summary">
                Lesson Summary
                <input
                  id="lesson_summary"
                  type="text"
                  name="lesson_summary"
                  onChange={this.change}
                  value={this.state.lesson_summary}
                />
              </label>
            </div>
            <div>
              <label htmlFor="lesson_content">
                Lesson content
                <input
                  id="lesson_content"
                  type="text"
                  name="lesson_content"
                  onChange={this.change}
                  value={this.state.lesson_content}
                />
              </label>
            </div>
            <div>
              <label htmlFor="lesson_media">
                Lesson Media
                <input
                  id="lesson_media"
                  type="text"
                  name="lesson_media"
                  onChange={this.change}
                  value={this.state.lesson_media}
                />
              </label>
            </div>
            <div>
              <label htmlFor="lesson_week">
                Lesson Week
                <input
                  id="lesson_week"
                  type="text"
                  name="lesson_week"
                  onChange={this.change}
                  value={this.state.lesson_week}
                />
              </label>
            </div>
            <div>
              <label htmlFor="lesson_exitTicket">
                Lesson ExitTicket
                <input
                  id="lesson_exitTicket"
                  type="text"
                  name="lesson_exitTicket"
                  onChange={this.change}
                  value={this.state.lesson_exitTicket}
                />
              </label>
            </div>
            <div>
              <label>
                Site Time
                <select
                  id="siteTimeId"
                  name="siteTimeId"
                  onChange={this.handleSiteTimeChange}
                >
                  {this.state.siteTime_id ? (
                    <option
                      key={this.state.siteTime_id}
                      value={this.state.siteNumber}
                    >
                      {`[${this.state.siteNumber}] ${moment
                        .tz(this.state.startTime, 'America/Los_Angeles')
                        .format('h:mm a')}-${moment
                        .tz(this.state.endTime, 'America/Los_Angeles')
                        .format('h:mm a')} ${this.state.day}`}
                    </option>
                  ) : (
                    ''
                  )}
                  {optionList.length > 0
                    ? optionList.map(option => {
                        return option;
                      })
                    : ''}
                </select>
              </label>
            </div>
            <input type="submit" value="submit" />
          </LessonContainer>
        </div>
      </Container>
    );
  }
}
export default withRouter(EditLesson);
