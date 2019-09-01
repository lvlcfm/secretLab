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

const Field = styled.div`
  margin: 10px;
  margin-left: 0px;
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
    const resUser = await axios.get(`/api/users/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
        `/api/users/profile/${user._id}`,
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
          <div
            style={{
              background: 'linear-gradient(180deg,transparent 65%,#5dceb3 65%)',
              display: 'inline',
              marginLeft: '10px',
              fontSize: '2em',
              marginBottom: '20px'
            }}
          >
            Profile (❍ᴥ❍ʋ)
          </div>
          <div>
            <Field>Preferred Name: {this.state.preferredName}</Field>
            <Field>Pronouns: {this.state.pronouns}</Field>
            <Field>First Name: {this.state.firstName}</Field>
            <Field>Last Name: {this.state.lastName}</Field>
            <Field>email: {this.state.email}</Field>
            <Field>role: {this.state.role}</Field>
            <button
              style={{
                color: '#333',
                backgroundColor: '#5CCFB4',
                textDecoration: 'none',
                border: 'solid #333 3px',
                borderRadius: '6px',
                boxShadow: '4px 4px 0px #333',
                padding: '10px',
                margin: '10px',
                marginLeft: '0px'
              }}
              onClick={this.handleEdit}
            >
              EDIT
            </button>
          </div>
        </Container>
      );
    } else {
      return (
        <Container>
          <div
            style={{
              background: 'linear-gradient(180deg,transparent 65%,#5dceb3 65%)',
              display: 'inline',
              marginLeft: '10px',
              fontSize: '2em',
              marginBottom: '20px'
            }}
          >
            Profile (❍ᴥ❍ʋ)
          </div>
          <form onSubmit={this.handleProfileUpdate}>
            <Field>
              <label htmlFor="preferredName">
                Preffered Name
                <input
                  style={{
                    border: 'none',
                    borderBottom: '3px solid #333',
                    marginLeft: '10px'
                  }}
                  id="preferredName"
                  type="text"
                  name="preferredName"
                  onChange={this.handleChange}
                  value={this.state.preferredName}
                />
              </label>
            </Field>
            <div>
              <label htmlFor="pronouns">
                Pronouns
                <input
                  style={{
                    border: 'none',
                    borderBottom: '3px solid #333',
                    marginLeft: '10px'
                  }}
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
                  style={{
                    border: 'none',
                    borderBottom: '3px solid #333',
                    marginLeft: '10px'
                  }}
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
                  style={{
                    border: 'none',
                    borderBottom: '3px solid #333',
                    marginLeft: '10px'
                  }}
                  id="lastName"
                  type="text"
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </label>
            </div>
            <button
              style={{
                color: '#333',
                backgroundColor: '#EE7E80',
                textDecoration: 'none',
                border: 'solid #333 3px',
                borderRadius: '6px',
                boxShadow: '4px 4px 0px #333',
                padding: '10px',
                margin: '10px',
                marginLeft: '0px'
              }}
              onClick={this.handleEdit}
            >
              cancel
            </button>
            <input
              style={{
                color: '#333',
                backgroundColor: '#5CCFB4',
                textDecoration: 'none',
                border: 'solid #333 3px',
                borderRadius: '6px',
                boxShadow: '4px 4px 0px #333',
                padding: '10px',
                margin: '10px',
                marginLeft: '0px'
              }}
              type="submit"
              value="update"
            />
          </form>
        </Container>
      );
    }
  }
}

export default Profile;
