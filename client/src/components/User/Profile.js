import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getUser, getJWT } from '../../utils/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      preferredName: '',
      firstName: '',
      lastName: '',
      pronouns: '',
      role: '',
      email: ''
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }
  async componentDidMount() {
    const user = getUser();
    const token = getJWT();
    const resUser = await axios.get(
      `http://localhost:5000/api/users/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    this.setState({
      preferredName: resUser.data.preferredName
        ? resUser.data.preferredName
        : '',
      firstName: resUser.data.firstName ? resUser.data.firstName : '',
      lastName: resUser.data.lastName ? resUser.data.lastName : '',
      pronouns: resUser.data.pronouns ? resUser.data.pronouns : '',
      role: resUser.data.role ? resUser.data.role : '',
      email: resUser.data.email ? resUser.data.email : ''
    });
  }
  handleEdit() {
    this.setState({ editable: true });
  }
  handleCancelEdit() {
    this.setState({ editable: false });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  //handle sanitation can be attacked by changing the role through this form
  async handleProfileUpdate(event) {
    event.preventDefault();
    try {
      const user = getUser();
      const token = getJWT();
      const resUserUpdate = await axios.put(
        `http://localhost:5000/api/users/profile/${user._id}`,
        {
          preferredName: this.state.preferredName,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          pronouns: this.state.pronouns
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(resUserUpdate);
      this.setState({
        preferredName: resUserUpdate.data.preferredName,
        firstName: resUserUpdate.data.firstName,
        lastName: resUserUpdate.data.lastName,
        pronouns: resUserUpdate.data.pronouns,
        editable: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.editable) {
      return (
        <Container>
          ProfileTIME
          <div>
            <div>Preferred Name: {this.state.preferredName}</div>
            <div>Pronouns: {this.state.pronouns}</div>
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>email: {this.state.email}</div>
            <div>role: {this.state.role}</div>
            <button onClick={this.handleEdit}>EDIT</button>
          </div>
        </Container>
      );
    } else {
      return (
        <Container>
          <div>edit</div>
          <form onSubmit={this.handleProfileUpdate}>
            <div>
              <label htmlFor="preferredName">
                Preffered Name
                <input
                  id="preferredName"
                  type="text"
                  name="preferredName"
                  onChange={this.handleChange}
                  value={this.state.preferredName}
                />
              </label>
            </div>
            <div>
              <label htmlFor="pronouns">
                Pronouns
                <input
                  id="pronouns"
                  type="text"
                  name="pronouns"
                  onChange={this.handleChange}
                  value={this.state.pronouns}
                />
              </label>
            </div>
            <div>
              <label htmlFor="firstName">
                First Name
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </label>
            </div>
            <div>
              <label htmlFor="lastName">
                Last Name
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </label>
            </div>
            <button onClick={this.handleEdit}>cancel</button>
            <input type="submit" value="submit" />
          </form>
        </Container>
      );
    }
  }
}

export default Profile;
