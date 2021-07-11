import React, { Component } from 'react';
import ProfileBoardCardContainer from './ProfileBoardCardContainer';
import ProfileFavoriteCardContainer from './ProfileFavoriteCardContainer';

const baseURL = 'http://localhost:3001/'
const usersURL = baseURL + 'users'

export default class ProfilePage extends Component {

  state = {
    username: "",
    // updatedUsername: "",
    password: "",
    updatedPassword: "",
    reconfirmPassword: "",
    firstName: "",
    updatedFirstName: "",
    lastName: "",
    updatedLastName: "",
    email: "",
    updatedEmail: "",
    phoneNumber: "",
    updatedPhoneNumber: "",
    address: "",
    updatedAddress: "",
    bio: "",
    updatedBio: "",
    avatar: "",
    id: this.props.userID,
    display: "profile-page",
    editProfile: false
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

  editProfile = () => {
    this.setState({
      ...this.state,
      editProfile: true
    })
  }

  updateProfile = (event) => {
    event.preventDefault()

    let updatedPasswordError = document.getElementById("re-enter-updated-password-error")
    let updatedPasswordInput = document.getElementById("update-password-input")
    let reconfirmRasswordInput = document.getElementById("reconfirm-updated-password-input")

    if (this.state.updatedPassword !== ""){
      
      if (this.state.updatedPassword === this.state.password){
        updatedPasswordError.innerText = "Password is the same as previous password ❌"
        updatedPasswordInput.value = ""
        reconfirmRasswordInput.value = ""
        this.setState({
          ...this.state,
          updatedPassword: "",
          reconfirmPassword: ""
        })
      } else {

        if (this.state.updatedPassword !== this.state.reconfirmPassword){
        
          updatedPasswordError.innerText = "Passwords do not match ❌"
    
          updatedPasswordInput.value = ""
          reconfirmRasswordInput.value = ""

          this.setState({
            ...this.state,
            updatedPassword: "",
            reconfirmPassword: ""
          })
        } else {
          this.submitUpdatedPasswordProfile(this.state.updatedPassword)
        }
      }
    } else {
      this.submitUpdatedProfile()
    }
  }

  submitUpdatedPasswordProfile = (password) => {
    console.log("Testing submitting updated profile w/ password change")

    let firstName
    if (this.state.updatedFirstName !== ""){
      firstName = this.state.updatedFirstName
    } else {
      firstName = this.state.firstName
    }

    let lastName
    if (this.state.updatedLastName !== ""){
      lastName = this.state.updatedLastName
    } else {
      lastName = this.state.lastName
    }

    let bio
    if (this.state.updatedBio !== ""){
      bio = this.state.updatedBio
    } else {
      bio = this.state.bio
    }

    let email
    if (this.state.updatedEmail !== ""){
      email = this.state.updatedEmail
    } else {
      email = this.state.email
    }

    let address
    if (this.state.updatedAddress !== ""){
      address = this.state.updatedAddress
    } else {
      address = this.state.address
    }

    let phoneNumber
    if (this.state.updatedPhoneNumber !== ""){
      phoneNumber = this.state.updatedPhoneNumber
    } else {
      phoneNumber = this.state.phoneNumber
    }

    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      address: address,
      username: this.state.username,
      password: password,
      bio: bio,
      avatar: this.state.avatar
    }

    // console.log(updatedUser)

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "PATCH"
    reqObj.body = JSON.stringify(updatedUser)

    fetch(usersURL + `/${this.state.id}`, reqObj)
    .then(resp => resp.json())
    .then(user => {
      this.setState({
        ...this.state,
        password: user.password,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        address: user.address,
        bio: user.bio,
        avatar: user.avatar,
        editProfile: false
      })
    })
  }

  submitUpdatedProfile = () => {
    console.log("Testing submitting updated profile with same password")

    let firstName
    if (this.state.updatedFirstName !== ""){
      firstName = this.state.updatedFirstName
    } else {
      firstName = this.state.firstName
    }

    let lastName
    if (this.state.updatedLastName !== ""){
      lastName = this.state.updatedLastName
    } else {
      lastName = this.state.lastName
    }

    let bio
    if (this.state.updatedBio !== ""){
      bio = this.state.updatedBio
    } else {
      bio = this.state.bio
    }

    let email
    if (this.state.updatedEmail !== ""){
      email = this.state.updatedEmail
    } else {
      email = this.state.email
    }

    let address
    if (this.state.updatedAddress !== ""){
      address = this.state.updatedAddress
    } else {
      address = this.state.address
    }

    let phoneNumber
    if (this.state.updatedPhoneNumber !== ""){
      phoneNumber = this.state.updatedPhoneNumber
    } else {
      phoneNumber = this.state.phoneNumber
    }

    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      address: address,
      username: this.state.username,
      password: this.state.password,
      bio: bio,
      avatar: this.state.avatar
    }

    // console.log(updatedUser)

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "PATCH"
    reqObj.body = JSON.stringify(updatedUser)

    fetch(usersURL + `/${this.state.id}`, reqObj)
    .then(resp => resp.json())
    .then(user => {
      this.setState({
        ...this.state,
        password: user.password,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        address: user.address,
        bio: user.bio,
        avatar: user.avatar,
        editProfile: false
      })
    })
  }

  // updateUsername = (event) => {
  //   this.setState({
  //     updatedUsername: event.target.value
  //   })
  // }

  updatePassword = (event) => {
    this.setState({
      ...this.state,
      updatedPassword: event.target.value
    })

    // let newPassword = event.target.value
    
    // if (newPassword !== this.state.password){
    //   this.setState({
    //     updatedPassword: newPassword
    //   })
    // } else {
    //   alert("Password has not been changed")
    // }

  }

  confirmUpdatedPassword = (event) => {
    this.setState({
      ...this.state,
      reconfirmPassword: event.target.value
    })
  }

  updateFirstName = (event) => {
    this.setState({
      ...this.state,
      updatedFirstName: event.target.value
    })
  }

  updateLastName = (event) => {
    this.setState({
      ...this.state,
      updatedLastName: event.target.value
    })
  }

  updateEmail = (event) => {
    this.setState({
      ...this.state,
      updatedEmail: event.target.value
    })
  }

  updateAddress = (event) => {
    this.setState({
      ...this.state,
      updatedAddress: event.target.value
    })
  }

  updateBio = (event) => {
    this.setState({
      ...this.state,
      updatedBio: event.target.value
    })
  }

  updatePhoneNumber = (event) => {
    this.setState({
      ...this.state,
      updatedPhoneNumber: event.target.value
    })
  }

  render(){

    let {username, password, reconfirmPassword, firstName, lastName, email, phoneNumber, address, bio, avatar, id} = this.state

    return(
      <div className="profile-page">
        <h1>Profile Page</h1>
        <div className="profile-page-containers">
          
          <div className="profile-info">

            <div className="profile-avatar">
              <p>Profile avatar:</p>
              <img src={avatar} alt="avatar"></img><br></br>
              <br></br>
              <p>Placeholder avatar:</p>
              <img src="https://image.shutterstock.com/image-vector/illustration-cute-cow-260nw-347317901.jpg" alt="default-avatar"></img>
            </div>

            <div className="profile-main-info">
              <p>Name: {firstName + ' ' + lastName}</p>
              <p>Bio: {bio}</p>
              <p>Email: {email}</p>
              <p>Address: {address}</p>
              <p>Phone number: {phoneNumber}</p>
              <p>Username: {username}</p>
              <p>Password: {password}</p>
              <p>User Id: {id}</p>
            </div>

            <div className="edit-profile">
              <button onClick={() => this.editProfile()}>Edit profile</button>

              { this.state.editProfile === true ? 
                <div className="edit-profile-form">
                  <form onSubmit={(event) => this.updateProfile(event)}>

                    {/* <label>Username:</label><br></br>
                    <input type="text" onChange={(event) => this.updateUsername(event)}  placeholder={username}></input><br></br>
                    <p id="update-username-error" className="form-errors"></p> */}

                    <label>Update password:</label><br></br>
                    <input id="update-password-input" type="password" onChange={(event) => this.updatePassword(event)} placeholder="password" autoComplete="on"></input><br></br>
                    <p id="update-password-error" className="form-errors"></p>

                    <label>Re-enter password:</label><br></br>
                    <input id="reconfirm-updated-password-input" type="password" onChange={(event) => this.confirmUpdatedPassword(event)} placeholder="re-enter password" autoComplete="on"></input><br></br>
                    <p id="re-enter-updated-password-error" className="form-errors"></p>

                    <label>First Name:</label><br></br>
                    <input id="first-name-input" type="text" onChange={(event) => this.updateFirstName(event)} placeholder={firstName} autoComplete="on"></input><br></br>

                    <label>Last Name:</label><br></br>
                    <input id="last-name-input" type="text" onChange={(event) => this.updateLastName(event)} placeholder={lastName} autoComplete="on"></input><br></br>

                    <label>Bio:</label><br></br>
                    <input id="bio-input" type="text" onChange={(event) => this.updateBio(event)} placeholder={bio} autoComplete="on"></input><br></br>

                    <label>Email:</label><br></br>
                    <input id="email-input" type="email" onChange={(event) => this.updateEmail(event)} placeholder={email} autoComplete="on"></input><br></br>

                    <label>Address:</label><br></br>
                    <input id="address-input" type="text" onChange={(event) => this.updateAddress(event)} placeholder={address} autoComplete="on"></input><br></br>

                    <label>Phone number:</label><br></br>
                    <input id="phone-number-input" type="text" onChange={(event) => this.updatePhoneNumber(event)} placeholder={phoneNumber} autoComplete="on"></input><br></br>

                    <button type="submit">Update profile</button>
                  </form>
                </div> 
              : null }
            </div>

          </div>

          <div className="profile-boards-favorites">

            <div className="profile-boards">
              <p>Profile boards go here</p>
              <ProfileBoardCardContainer userID={this.state.id} />
            </div>

            <div className="profile-favorites">
              <p>Profile favorites go here</p>
              <ProfileFavoriteCardContainer userID={this.state.id} />
            </div>

          </div>




        </div>
      </div>
    )
  }
}