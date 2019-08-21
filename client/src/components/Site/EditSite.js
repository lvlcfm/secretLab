import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SiteTimeList from './SiteTimeList';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;
const ItemsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
`;

const AddSiteContainer = styled.div`
  border-left: solid #333 5px;
  margin-right: 24px;
  margin-top: 50px;
  padding-left: 10px;
`;

const SchoolInfoContainer = styled.form`
  border-left: solid #333 5px;
  margin-right: 24px;
  margin-top: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

class EditSite extends Component {
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
      siteTimes: [],
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
  async componentDidMount() {
    try {
      const resSite = await axios.get(
        `http://localhost:5000/api/sites/${this.props.match.params.id}`
      );

      this.setState({
        schoolName: resSite.data.schoolName ? resSite.data.schoolName : '',
        classroom: resSite.data.classroom ? resSite.data.classroom : '',
        level: resSite.data.level ? resSite.data.level : '',
        schoolAddress: resSite.data.schoolAddress
          ? resSite.data.schoolAddress
          : '',
        semester: resSite.data.semester ? resSite.data.semester : '',
        siteContactEmail: resSite.data.siteContactEmail
          ? resSite.data.siteContactEmail
          : '',
        siteContactName: resSite.data.siteContactName
          ? resSite.data.siteContactName
          : '',
        style: resSite.data.style ? resSite.data.style : '',
        year: resSite.data.year ? resSite.data.year : '',
        siteTimes: resSite.data.siteTimes ? resSite.data.siteTimes : ''
      });

      console.log(resSite.data);
    } catch (e) {
      console.log(e);
    }
  }

  // handle start time
  handleStartTimeChange(date) {
    this.setState({
      startTime: date
    });
  }
  handleEndTimeChange(date) {
    this.setState({
      endTime: date
    });
  }
  handleAddSiteTime() {
    //something something add to current array
    //DELETE site times individually and re query the site
    this.setState(prevState => ({
      siteTimes: [
        {
          day: this.state.day,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          siteNumber: parseInt(this.state.siteNumber),
          siteType: 'NEW'
        },
        ...prevState.siteTimes
      ]
    }));
  }
  async handleDeleteSiteTime(siteNum) {
    const newSites = this.state.siteTimes.filter(
      site => parseInt(site.siteNumber) !== siteNum
    );

    // checking to see if we need to delete the item
    // in the DB as opposed to deleting it in FE local state
    for (let index = 0; index < this.state.siteTimes.length; index++) {
      const siteTimeEl = this.state.siteTimes[index];
      if (siteTimeEl.siteNumber === siteNum) {
        if (siteTimeEl.hasOwnProperty('_id')) {
          await axios.delete(
            `http://localhost:5000/api/sitetimes/${siteTimeEl._id}`
          );
        }
      }
    }

    //DELETE DIRECTLY HERE WITH AXIOS CALL, if it doesn't haave a _id then setState
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
    // FUTURE SELF
    // YOU MUST KEEP TRACK OF NEW SITE TIMES -- MAKE THEM
    // IN THE BACKEND AND THEN UPDATE THE TIMES
    // WE MUST HOLD ALL THE AACTIONS TO THE SITE TIMES SOMEHOW
    //UNTIL WE UPDATAE THE WHOKE SITE COMPLETE
    //KEEP TRACK OF NEW SITES
    // when updtaing the site, create the new site times
    // then update the site with them...
    axios
      .put(`http://localhost:5000/api/sites/${this.props.match.params.id}`, {
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
      <Container>
        <div>EDIT SITE</div>
        <ItemsContainer>
          <div>
            <div>SITE TIME SLOTS</div>
          </div>
          <SiteTimeList
            sites={this.state.siteTimes ? this.state.siteTimes : []}
            handleDeleteSiteTime={this.handleDeleteSiteTime}
          />
          <AddSiteContainer>
            <div>
              ADD A TIME SLOT
              <div>
                Start Time:
                <DatePicker
                  selected={this.state.startTime}
                  onChange={this.handleStartTimeChange}
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
                  onChange={this.handleEndTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                />
              </div>
            </div>
            <div>
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
                Site Number
                <input
                  id="siteNumber"
                  type="text"
                  name="siteNumber"
                  onChange={this.change}
                  value={this.state.siteNumber}
                />
              </label>
            </div>
            <button onClick={this.handleAddSiteTime}>ADD TIME SLOT</button>
          </AddSiteContainer>
          <SchoolInfoContainer onSubmit={this.submit}>
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

            <input type="submit" value="UPDATE SITE" />
          </SchoolInfoContainer>
        </ItemsContainer>
      </Container>
    );
  }
}
export default EditSite;
