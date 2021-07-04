import React, { Component } from 'react';
import Navbar from './Navbar.js';

export default class Home extends Component {

  state = {
    user: this.props.user
  }

  render(){

    let {address, avatar, bio, email, first_name, last_name, phone_number, username, password, id} = this.state?.user


    return(
      <div className="home-page">
        <Navbar user={this.props.user}/>
        <div>
          <h1>HOME PAGE</h1>
          <ul>
            <li>{first_name + ' ' + last_name}</li>
            <li>{bio}</li>
            <li>{email}</li>
            <li>{address}</li>
            <li>{phone_number}</li>
            <li>Username: {username}</li>
            <li>Password: {password}</li>
            <li>User Id: {id}</li>
            <img src={avatar} alt="avatar"></img>
          </ul>

          <div className="boards-page">

          </div>

          <div className="profile-page">

          </div>

        </div>
      </div>
    )
  }
}