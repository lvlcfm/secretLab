import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

class CreateSite extends Component {
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
      exitTicket: ''
    };

    this.change = this.change.bind(this);

    this.submit = this.submit.bind(this);
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
      .post('http://localhost:5000/api/lessons', {
        title: this.state.title
      })
      .then(res => {
        // storing token from server
        this.props.history.push(`/sites/${this.props.match.params.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="signUpBox">
          <img src="../public/img/logo-lower.png" className="logo" />
          <div className="title">
            <div className="anova">CREATE A</div>
            <div className="labs">LESSON</div>
          </div>
          <form onSubmit={this.submit}>
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
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default CreateSite;
