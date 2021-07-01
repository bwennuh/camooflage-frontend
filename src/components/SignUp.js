import React, { Component } from 'react';
import Navbar from './Navbar.js';

export default class SignUp extends Component {

  state = {
    username: "",
    password: "",
    reconfirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    bio: "",
    avatar: "",
    display: "sign-up"
  }

  changeToUserInfo = () => {
    this.setState({
      display: "user-info"
    })
  }

  changeToSignUpStart = () => {
    this.setState({
      display: "sign-up"
    })
  }

  submitUsernamePasswordHandler = (event) => {
    event.preventDefault()
    console.log("Testing submit username + password handler")
  }

  submitUserInfoHandler = (event) => {
    event.preventDefault()
    console.log("Testing submit user info handler")
  }

  render(){
    return(
      <div className="signup-page">
        <Navbar />
        <div>
          <h1>SIGN-UP PAGE</h1>

          { this.state.display === "sign-up" ?
          <div className="username-password-form">
            <form onSubmit={(event) => this.submitUsernamePasswordHandler(event)}>
              <label>Choose a username:</label><br></br>
              <input placeholder="username"></input><br></br>

              <label>Choose a password:</label><br></br>
              <input placeholder="password"></input><br></br>

              <label>Re-enter password:</label><br></br>
              <input placeholder="re-enter password"></input><br></br>

              <button type="submit">Submit</button>

            </form>

            <button onClick={() => this.changeToUserInfo()}>Continue</button>
          </div>
          : null }

          { this.state.display === "user-info" ?
          <div className="user-info-form">
            <form onSubmit={(event) => this.submitUserInfoHandler(event)}>
              <label>First name:</label><br></br>
              <input placeholder="first name"></input><br></br>

              <label>Last name:</label><br></br>
              <input placeholder="last name"></input><br></br>

              <label>Email:</label><br></br>
              <input placeholder="example@example.com"></input><br></br>

              <button type="submit">Submit</button>

            </form>

            <button type="submit" onClick={() => this.props.changeToLogin()}>Continue to log in page:</button>

          </div>
          : null }


        </div>
      </div>
    )
  }
}