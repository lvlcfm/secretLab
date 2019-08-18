import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

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

class CreateLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: '',
      siteTimes: [],
      title: '',
      summary: '',
      content: '',
      media: '',
      week: '',
      siteTime: '',
      exitTicket: '',
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

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/sites/${this.props.match.params.id}`)
      .then(res => {
        // storing token from server
        this.setState({
          siteObj: res.data,
          site_id: res.data._id,
          day: res.data.siteTimes[0].day,
          startTime: res.data.siteTimes[0].startTime,
          endTime: res.data.siteTimes[0].endTime,
          siteNumber: res.data.siteTimes[0].siteNumber,
          siteTimeId: res.data.siteTimes[0]._id,
          siteTimes: res.data.siteTimes
        });
      })
      .catch(err => {
        console.log(err);
      });
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
      siteTimeId: newTime._id
    });
  }
  submit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/lessons', {
        title: this.state.title,
        summary: this.state.summary,
        content: this.state.content,
        media: this.state.media,
        week: this.state.week,
        exitTicket: this.state.exitTicket,
        site_id: this.state.site_id,
        siteTime_id: this.state.siteTimeId
      })
      .then(res => {
        this.props.history.push(`/sites/${this.props.match.params.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container>
        <div>
          <div>
            <div>CREATE A LESSON ????</div>
          </div>
          <LessonContainer onSubmit={this.submit}>
            <div>
              <label htmlFor="title">
                Lesson Title
                <input
                  id="title"
                  type="text"
                  name="title"
                  onChange={this.change}
                  value={this.state.title}
                />
              </label>
            </div>
            <div>
              <label htmlFor="summary">
                Lesson Summary
                <input
                  id="summary"
                  type="text"
                  name="summary"
                  onChange={this.change}
                  value={this.state.summary}
                />
              </label>
            </div>
            <div>
              <label htmlFor="content">
                Lesson content
                <input
                  id="content"
                  type="text"
                  name="content"
                  onChange={this.change}
                  value={this.state.content}
                />
              </label>
            </div>
            <div>
              <label htmlFor="media">
                Lesson Media
                <input
                  id="media"
                  type="text"
                  name="media"
                  onChange={this.change}
                  value={this.state.media}
                />
              </label>
            </div>
            <div>
              <label htmlFor="week">
                Lesson Week
                <input
                  id="week"
                  type="text"
                  name="week"
                  onChange={this.change}
                  value={this.state.week}
                />
              </label>
            </div>
            <div>
              <label htmlFor="exitTicket">
                Lesson ExitTicket
                <input
                  id="exitTicket"
                  type="text"
                  name="exitTicket"
                  onChange={this.change}
                  value={this.state.exitTicket}
                />
              </label>
            </div>
            <div>
              <label>
                Site Time
                <select
                  id="siteTime"
                  name="siteTime"
                  onChange={this.handleSiteTimeChange}
                >
                  {this.state.siteObj
                    ? this.state.siteObj.siteTimes.map(siteTime => (
                        <option key={siteTime._id} value={siteTime.siteNumber}>
                          {`${siteTime.siteNumber} ${siteTime.startTime} ${siteTime.day}`}
                        </option>
                      ))
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
export default CreateLesson;
