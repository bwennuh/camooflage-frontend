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
    avatar: ""
  }

  render(){
    return(
      <div className="signup-page">
        <Navbar />
        <div>
          <h1>SIGN-UP PAGE</h1>
        </div>
      </div>
    )
  }
}