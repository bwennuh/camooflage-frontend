import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const usersURL = baseURL + 'users'
const boardsURL = baseURL + 'boards'

export default class SignUp extends Component {

  state = {
    username: "",
    password: "",
    reconfirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    display: "sign-up",
    validUsername: false,
    validPassword: false
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

  getFirstName = (event) => {
    this.setState({
      firstName: event.target.value
    })
  }

  getLastName = (event) => {
    this.setState({
      lastName: event.target.value
    })
  }

  getEmail = (event) => {
    this.setState({
      email: event.target.value
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
        this.setState({
          validUsername: true
        })
      }

      let passwordError = document.getElementById("re-enter-password-error")

      if (this.state.password !== this.state.reconfirmPassword){
        
        passwordError.innerText = "Passwords do not match ❌"
  
        let passwordInput = document.getElementById("password-input")
        passwordInput.value = ""
  
        let reconfirmRasswordInput = document.getElementById("reconfirm-password-input")
        reconfirmRasswordInput.value = ""
      } else {
        passwordError.innerText = "Passwords match ✅"
        this.setState({
          validPassword: true
        })
      }
      // debugger
      if (this.state.validPassword === true && this.state.validUsername === true){
        this.renderContinueButton()
      }
      // this.renderContinueButton()
    })

    // let passwordError = document.getElementById("re-enter-password-error")

    // if (this.state.password !== this.state.reconfirmPassword){
      
    //   passwordError.innerText = "Passwords do not match ❌"

    //   let passwordInput = document.getElementById("password-input")
    //   passwordInput.value = ""

    //   let reconfirmRasswordInput = document.getElementById("reconfirm-password-input")
    //   reconfirmRasswordInput.value = ""
    // } else {
    //   passwordError.innerText = "Passwords match ✅"
    //   this.setState({
    //     validPassword: true
    //   })
    // }

    // this.renderContinueButton()
  }

  submitUserInfoHandler = (event) => {
    event.preventDefault()
    this.createNewUser()
    this.renderLoginContinueButton()
  }

  renderContinueButton = () => {

    if (this.state.validUsername === true && this.state.validPassword === true){
      console.log("Testing username and password validation + then need to render button")
      let clickedSubmitButton = document.getElementById("submit-username-password-button")
      clickedSubmitButton.style.display = "none"
      let continueButton = document.getElementById("continue-button")
      continueButton.style.display = "block"
    } 
    // else {
    //   console.log("Why isn't this check working")
    // }
  }

  renderLoginContinueButton = () => {
    let clickedSubmitButton = document.getElementById("submit-personal-info-button")
    clickedSubmitButton.style.display = "none"
    let loginContinueButton = document.getElementById("login-continue-button")
    loginContinueButton.style.display = "block"
  }

  createNewUser = () => {
    const newUser = {
      first_name: this.state.firstName, 
      last_name: this.state.lastName, 
      email: this.state.email, 
      phone_number: "", 
      address: "", 
      username: this.state.username, 
      password: this.state.password, 
      bio: "", 
      avatar: ""
    }

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "POST"
    reqObj.body = JSON.stringify(newUser)

    fetch(usersURL, reqObj)
    .then(resp => resp.json())
    .then(newUser => {
      this.setState({
        ...this.state,
        username: "", 
        password: "",
        first_name: "", 
        last_name: "", 
        email: ""
      })
      this.createDefaultBoardForNewUser(newUser.id)
    })

  }

  createDefaultBoardForNewUser = (id) => {
    console.log("New user id:")
    console.log(id)

    const defaultBoard = {
      name: "Default Board", 
      description: "Let's start adding some options!",
      user_id: id
    }

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "POST"
    reqObj.body = JSON.stringify(defaultBoard)

    fetch(boardsURL, reqObj)
    .then(resp => resp.json())
    .then(() => console.log("New default board created!"))
  }

  render(){
    return(
      <div className="signup-page">
        <div>
          <h1>SIGN-UP PAGE</h1>

          { this.state.display === "sign-up" ?
          <div className="username-password-form">
            <form onSubmit={(event) => this.submitUsernamePasswordHandler(event)}>
              <label>Choose a username:</label><br></br>
              <input type="text" onChange={(event) => this.getUsername(event)}  placeholder="username" required></input><br></br>
              <p id="enter-username-error" className="form-errors"></p>

              <label>Choose a password:</label><br></br>
              <input id="password-input" type="password" onChange={(event) => this.getPassword(event)} placeholder="password" autoComplete="on" required></input><br></br>
              <p id="enter-password-error" className="form-errors"></p>

              <label>Re-enter password:</label><br></br>
              <input id="reconfirm-password-input" type="password" onChange={(event) => this.confirmPassword(event)} placeholder="re-enter password" autoComplete="on" required></input><br></br>
              <p id="re-enter-password-error" className="form-errors"></p>

              {/* <button id="submit-username-password-button" type="submit" onClick={(event) => this.renderContinueButton(event)}>Submit</button> */}
              <button id="submit-username-password-button" type="submit">Submit</button>

            </form>

            <button style={{display: "none"}} id="continue-button" onClick={() => this.changeToUserInfo()}>Continue</button>
          </div>
          : null }

          { this.state.display === "user-info" ?
          <div className="user-info-form">
            <form onSubmit={(event) => this.submitUserInfoHandler(event)}>
              <label>First name:</label><br></br>
              <input id="first-name-input" type="text" onChange={(event) => this.getFirstName(event)} placeholder="first name" required></input><br></br>

              <label>Last name:</label><br></br>
              <input id="last-name-input" type="text" onChange={(event) => this.getLastName(event)} placeholder="last name"></input><br></br>

              <label>Email:</label><br></br>
              <input id="email-input" type="email" onChange={(event) => this.getEmail(event)} placeholder="example@example.com" required></input><br></br>

              {/* <button id="submit-personal-info-button" type="submit" onClick={(event) => this.renderContinueButton(event)}>Submit</button> */}
              {/* <button id="submit-personal-info-button" type="submit" onClick={() => this.renderLoginContinueButton()}>Submit</button> */}
              <button id="submit-personal-info-button" type="submit">Submit</button>

            </form>

            <button style={{display: "none"}} id="login-continue-button" onClick={() => this.props.changeToLogin()}>Continue to log in page:</button>

          </div>
          : null }


        </div>
      </div>
    )
  }
}