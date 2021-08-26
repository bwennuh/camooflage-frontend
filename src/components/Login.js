import React, { Component } from 'react';
import Home from './Home.js';
import SignUp from './SignUp.js';

// const baseURL = 'http://localhost:3001/'
const baseURL = 'https://camooflage.herokuapp.com/'
const usersURL = baseURL + 'users'
// const boardsURL = baseURL + 'boards'
// const recipesURL = baseURL + 'recipes'
// const nonDairyOptionsURL = baseURL + 'non_dairy_options'
// const boardPinsURL = baseURL + 'board_pins'
// const recipePinsURL = baseURL + 'recipe_pins'
// const categoriesURL = baseURL + 'categories'
// const brandsURL = baseURL + 'brands'


export default class Login extends Component {

  state = {
    display: "login",
    username: "",
    password: "",
    loggedInUser: {},
    showErrors: false
  }

  fetchUser = () => {
    let username = this.state.username
    let password = this.state.password

    if (username !== "" && password !== ""){

      fetch(usersURL)
      .then(resp => resp.json())
      .then(users => {
        let foundUser = users.find(user => user.username === username)

        if (foundUser){
          let userPassword = foundUser.password
          if (userPassword === password){
            this.setState({
              ...this.state,
              loggedInUser: foundUser,
              showErrors: false
            })
            this.changeToHome()

          } else {
            this.setState({
              showErrors: true
            })
          }

        } else {
          this.setState({
            showErrors: true
          })
        }
      })
    }
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

  loginFormSubmitHandler = (event) => {
    event.preventDefault()
    this.fetchUser()
  }

  changeToHome = () => {
    this.setState({
      display: "home"
    })
  }

  changeToSignUp = () => {
    this.setState({
      display: "sign-up"
    })
  }

  changeToLogin = () => {
    this.setState({
      display: "login",
      username: "",
      password: "",
      loggedInUser: {},
      showErrors: false
    })
  }

  render(){
    return(
      <div className="login-page">

      { this.state.display === "login" ?
        <div className="login">

          <div className="login-header">
            <div className="camooflage-title">CA<span className="moo">MOO</span>FLAGE</div>
            <img id="login-logo" src="https://i.imgur.com/0s5Q1Ie.png" alt="Camooflage Cow"></img>
            {/* <h2>Login</h2> */}
          </div>

          <div clasName="login-form-container">
            <form className="login-form" onSubmit={(event) => this.loginFormSubmitHandler(event)}>
              <span className="login-title">SIGN IN</span><br></br>
              {/* <label>Username:</label><br></br> */}
              <input type="text" onChange={(event) => this.getUsername(event)} placeholder="username" required></input><br></br>
              {/* <label>Password:</label><br></br> */}
              <input type="password" onChange={(event) => this.getPassword(event)} placeholder="password" autoComplete="on" required></input><br></br><br></br>
              { this.state.showErrors ? <p className="login-errors">Username or password is not correct.</p> : null }
              <button className="login-button" type="submit">Log In</button><br></br>
            </form>
          </div>

          <div className="sign-up-container">
            <span className="sign-up">Don't have an account with us?</span><br></br>

            <button className="sign-up-button" onClick={() => this.changeToSignUp()}>Sign Up!</button>
          </div>

        </div>
        : null }

        <div className="change-to-home">
          { this.state.display === "home" ? 
          <Home 
            user={this.state?.loggedInUser}
            changeToLogin={this.changeToLogin}
          />
          : null }
        </div>

        <div className="change-to-signup">
          {this.state.display === "sign-up" ? <SignUp changeToLogin={this.changeToLogin}/> : null}
        </div>

      </div>
    )
  }
}