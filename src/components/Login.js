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
    display: "",
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

  render(){
    return(
      <div className="login-page">
        <div className="login-header">
          <h1>CAMOOFLAGE LOGIN PAGE</h1>
          <h2>Login Form</h2>
          <form onSubmit={(event) => this.loginFormSubmitHandler(event)}>
            <label>Username:</label><br></br>
            <input onChange={(event) => this.getUsername(event)} placeholder="username"></input><br></br>
            <label>Password:</label><br></br>
            <input onChange={(event) => this.getPassword(event)} placeholder="password"></input><br></br>
            <button type="submit">Log In</button>
          </form>
          {/* {this.state.display === "home" ? console.log("Switch to home!") : console.log("Did not switch to home...")} */}
          {/* {this.state.display === "home" ? <Home /> : null}
          {this.state.display === "sign-up" ? <SignUp /> : null} */}
        </div>
      </div>
    )
  }
}