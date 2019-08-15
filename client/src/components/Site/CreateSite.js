import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SiteTimeList from './SiteTimeList';

class CreateSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: '',
      schoolAddress: '',
      classroom: '',
      style: '',
      level: '',
      semester: '',
      year: '',
      siteContactName: '',
      siteContactEmail: '',
      siteTimes: [
        {
          startTime: new Date(),
          endTime: new Date(),
          day: 'monday',
          siteNumber: 0
        },
        {
          startTime: new Date(),
          endTime: new Date(),
          day: 'tuesday',
          siteNumber: 1
        }
      ],
      startTime: new Date(),
      endTime: new Date(),
      siteNumber: '',
      day: 'monday'
    };

    this.change = this.change.bind(this);

    this.submit = this.submit.bind(this);

    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleAddSiteTime = this.handleAddSiteTime.bind(this);
    this.handleDeleteSiteTime = this.handleDeleteSiteTime.bind(this);
  }

  // handle start time
  handleStartTimeChange(date) {
    this.setState({
      endTime: date
    });
  }
  handleEndTimeChange(date) {
    this.setState({
      startTime: date
    });
  }
  handleAddSiteTime() {
    //something something add to current array
    this.setState(prevState => ({
      siteTimes: [
        {
          day: this.state.day,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          siteNumber: parseInt(this.state.siteNumber)
        },
        ...prevState.siteTimes
      ]
    }));
  }
  handleDeleteSiteTime(siteNum) {
    const newSites = this.state.siteTimes.filter(
      site => parseInt(site.siteNumber) !== siteNum
    );
    this.setState(prevState => ({
      siteTimes: [...newSites]
    }));
  }

  // takes an event and creates a key,value pair
  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/sites', {
        schoolName: this.state.schoolName,
        schoolAddress: this.state.schoolAddress,
        classroom: this.state.classroom,
        style: this.state.style,
        level: this.state.level,
        semester: this.state.semester,
        year: this.state.year,
        siteContactName: this.state.siteContactName,
        siteContactEmail: this.state.siteContactEmail,
        siteTimes: this.state.siteTimes
      })
      .then(res => {
        // storing token from server
        this.props.history.push('/sites');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div>CREATE A</div>
            <div>SITE</div>
          </div>
          <div>
            <div>RENDER SITE TIMES</div>
            <SiteTimeList
              sites={this.state.siteTimes}
              handleDeleteSiteTime={this.handleDeleteSiteTime}
            />
            <div>
              Site Time
              <div>
                Start Time:
                <DatePicker
                  selected={this.state.startTime}
                  onChange={this.handleChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                />
              </div>
              <div>
                End Time:
                <DatePicker
                  selected={this.state.endTime}
                  onChange={this.handleChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                />
              </div>
            </div>
            <div>
              CURRENT DAY SELECTED: {this.state.day} NOPE
              <label>
                Day
                <select id="day" name="day" onChange={this.change}>
                  <option value="monday">monday</option>
                  <option value="tuesday">tuesday</option>
                  <option value="wednesday">wednesday</option>
                  <option value="thursday">thursday</option>
                  <option value="friday">friday</option>
                  <option value="saturday">saturday</option>
                  <option value="sunday">sunday</option>
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="siteNumber">
                Site Number THIS IS THE NUMBER: {this.state.siteNumber}
                <input
                  id="siteNumber"
                  type="text"
                  name="siteNumber"
                  onChange={this.change}
                  value={this.state.siteNumber}
                />
              </label>
            </div>
            <button onClick={this.handleAddSiteTime}>ADD</button>
          </div>
          <form onSubmit={this.submit}>
            <div>
              <label htmlFor="schoolName">
                School Name
                <input
                  id="schoolname"
                  type="text"
                  name="schoolName"
                  onChange={this.change}
                  value={this.state.schoolName}
                />
              </label>
            </div>
            <div>
              <label htmlFor="schoolAddress">
                School Address
                <input
                  id="schoolAddress"
                  type="text"
                  name="schoolAddress"
                  onChange={this.change}
                  value={this.state.schoolAddress}
                />
              </label>
            </div>
            <div>
              <label htmlFor="classroom">
                Classroom
                <input
                  id="classroom"
                  type="text"
                  name="classroom"
                  onChange={this.change}
                  value={this.state.classroom}
                />
              </label>
            </div>
            <div>
              <label htmlFor="style">
                Style
                <input
                  id="style"
                  type="text"
                  name="style"
                  onChange={this.change}
                  value={this.state.style}
                />
              </label>
            </div>
            <div>
              <label htmlFor="level">
                Level
                <input
                  id="level"
                  type="text"
                  name="level"
                  onChange={this.change}
                  value={this.state.level}
                />
              </label>
            </div>
            <div>
              <label htmlFor="semester">
                Semester
                <input
                  id="semester"
                  type="text"
                  name="semester"
                  onChange={this.change}
                  value={this.state.semester}
                />
              </label>
            </div>
            <div>
              <label htmlFor="year">
                Year
                <input
                  id="year"
                  type="text"
                  name="year"
                  onChange={this.change}
                  value={this.state.year}
                />
              </label>
            </div>
            <div>
              <label htmlFor="siteContactName">
                Site Contact Name
                <input
                  id="siteContactName"
                  type="text"
                  name="siteContactName"
                  onChange={this.change}
                  value={this.state.siteContactName}
                />
              </label>
            </div>
            <div>
              <label htmlFor="siteContactEmail">
                Site Contact Email
                <input
                  id="siteContactEmail"
                  type="text"
                  name="siteContactEmail"
                  onChange={this.change}
                  value={this.state.siteContactEmail}
                />
              </label>
            </div>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default CreateSite;
