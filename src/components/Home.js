import React, { Component } from 'react';
import Navbar from './Navbar.js';

export default class Home extends Component {

  state = {
    user: this.props.user
  }

  render(){
    return(
      <div className="home-page">
        <Navbar />
        <div>
          <h1>HOME PAGE</h1>
        </div>
      </div>
    )
  }
}