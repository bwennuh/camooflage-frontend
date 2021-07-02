import React, { Component } from 'react';
import Navbar from './Navbar.js';

const baseURL = 'http://localhost:3001/'
const usersURL = baseURL + 'users'

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

  getUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  getPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  confirmPassword = (event) => {
    this.setState({
      reconfirmPassword: event.target.value
    })
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
    let username = this.state.username

    fetch(usersURL)
    .then(resp => resp.json())
    .then(users => {
      let takenUsername = users.filter(user => user.username === username)
      let usernameError = document.getElementById("enter-username-error")


      if (takenUsername.length > 0){
        usernameError.innerText = "Username already taken."
      } else {
        usernameError.innerText = "Valid username ✅"
      }
    })

    let passwordError = document.getElementById("re-enter-password-error")

    if (this.state.password !== this.state.reconfirmPassword){
      
      passwordError.innerText = "Passwords do not match ❌"

      let passwordInput = document.getElementById("password-input")
      passwordInput.value = ""

      let reconfirmRasswordInput = document.getElementById("reconfirm-password-input")
      reconfirmRasswordInput.value = ""
    } else {
      passwordError.innerText = "Passwords match ✅"
    }
  }

  submitUserInfoHandler = (event) => {
    event.preventDefault()
    console.log("Testing submit user info handler")
  }

  renderContinueButton = () => {
    let continueButton = document.getElementById("continue-button")
    continueButton.style.display = "block"
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
              <input type="text" onChange={(event) => this.getUsername(event)}  placeholder="username" required></input><br></br>
              <p id="enter-username-error" className="form-errors"></p>

              <label>Choose a password:</label><br></br>
              <input id="password-input" type="password" onChange={(event) => this.getPassword(event)} placeholder="password" required></input><br></br>
              <p id="enter-password-error" className="form-errors"></p>

              <label>Re-enter password:</label><br></br>
              <input id="reconfirm-password-input" type="password" onChange={(event) => this.confirmPassword(event)} placeholder="re-enter password" required></input><br></br>
              <p id="re-enter-password-error" className="form-errors"></p>

              <button id="submit-username-password-button" type="submit" onClick={() => this.renderContinueButton()}>Submit</button>

            </form>

            <button style={{display: "none"}} id="continue-button" onClick={() => this.changeToUserInfo()}>Continue</button>
          </div>
          : null }

          { this.state.display === "user-info" ?
          <div className="user-info-form">
            <form onSubmit={(event) => this.submitUserInfoHandler(event)}>
              <label>First name:</label><br></br>
              <input type="text" placeholder="first name" required></input><br></br>

              <label>Last name:</label><br></br>
              <input type="text" placeholder="last name"></input><br></br>

              <label>Email:</label><br></br>
              <input type="email" placeholder="example@example.com" required></input><br></br>

              <button type="submit">Submit</button>

            </form>

            <button onClick={() => this.props.changeToLogin()}>Continue to log in page:</button>

          </div>
          : null }


        </div>
      </div>
    )
  }
}