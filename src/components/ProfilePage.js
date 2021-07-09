import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const usersURL = baseURL + 'users'

export default class ProfilePage extends Component {

  state = {
    username: "",
    password: "",
    reconfirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    bio: "",
    avatar: "",
    id: this.props.userID,
    display: "profile-page"
  }

  componentDidMount = () => {
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    fetch(usersURL + `/${this.props.userID}`)
    .then(resp => resp.json())
    .then(user => this.setState({
      ...this.state,
      username: user.username,
      password: user.password,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phoneNumber: user.phone_number,
      address: user.address,
      bio: user.bio,
      avatar: user.avatar,
    })
  )}

  render(){

    let {username, password, reconfirmPassword, firstName, lastName, email, phoneNumber, address, bio, avatar, id} = this.state

    return(
      <div className="profile-page">
        <div>
          <h1>Profile Page</h1>
            <p>Name: {firstName + ' ' + lastName}</p>
            <p>Bio: {bio}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Phone number: {phoneNumber}</p>
            <p>Username: {username}</p>
            <p>Password: {password}</p>
            <p>User Id: {id}</p>
            <p>Profile avatar:</p>
            <img src={avatar} alt="avatar"></img><br></br>
            <br></br>
            <p>Placeholder avatar:</p>
            <img src="https://image.shutterstock.com/image-vector/illustration-cute-cow-260nw-347317901.jpg"></img>
        </div>
      </div>
    )
  }
}