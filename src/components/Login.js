import React, { Component } from 'react';
import Home from './Home.js';
import SignUp from './SignUp.js';

const baseURL = 'http://localhost:3001/'
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
    loggedInUser: {}
  }

  fetchUser = () => {
    let username = this.state.username
    let password = this.state.password

    if (username !== "" && password !== ""){

      fetch(usersURL)
      .then(resp => resp.json())
      .then(users => {
        let foundUser = users?.find(user => user.username === username)

        if (foundUser){
          console.log(foundUser)

          let userPassword = foundUser.password
          if (userPassword === password){
            console.log("Both username + password match")

            this.setState({
              loggedInUser: foundUser
            })
            this.changeToHome()

          } else {
            alert("Password does not match")
          }

        } else {
          alert("Did not find anyone with that username")
        }

      })

    } else {
      alert("Please enter both your username and your password to continue.")
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
      display: "login"
    })
  }

  render(){
    return(
      <div className="login-page">
      {this.state.display === "login" ?
        <div className="login-header">

          <h1>CAMOOFLAGE LOGIN PAGE</h1>
          <h2>Login Form</h2>
          <form onSubmit={(event) => this.loginFormSubmitHandler(event)}>
            <label>Username:</label><br></br>
            <input type="text" onChange={(event) => this.getUsername(event)} placeholder="username" required></input><br></br>
            <label>Password:</label><br></br>
            <input type="password" onChange={(event) => this.getPassword(event)} placeholder="password" autoComplete="on" required></input><br></br>
            <button type="submit">Log In</button>
          </form>

          <button onClick={() => this.changeToSignUp()}>Sign Up!</button>
        </div>
        : null }

        <div className="change-to-home">
          { this.state.display === "home" ? 
          <Home user={this.state?.loggedInUser}/>
          : null }
        </div>

        <div className="change-to-signup">
          {this.state.display === "sign-up" ? <SignUp changeToLogin={this.changeToLogin}/> : null}
        </div>

      </div>
    )
  }
}