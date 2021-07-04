import React, { Component } from 'react';
import Navbar from './Navbar.js';

export default class ProfilePage extends Component {

  render(){

    return(
      <div className="profile-page">
        <Navbar />
        <div>
          <h1>Profile Page</h1>
        </div>
      </div>
    )
  }
}