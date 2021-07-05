import React, { Component } from 'react';
import Navbar from './Navbar.js';
import NonDairyOptionCardContainer from './NonDairyOptionCardContainer.js'

const baseURL = 'http://localhost:3001/'
// const usersURL = baseURL + 'users'
// const boardsURL = baseURL + 'boards'
// const recipesURL = baseURL + 'recipes'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
// const boardPinsURL = baseURL + 'board_pins'
// const recipePinsURL = baseURL + 'recipe_pins'
// const categoriesURL = baseURL + 'categories'
// const brandsURL = baseURL + 'brands'

export default class Home extends Component {

  state = {
    user: this.props.user,
    searchText: "",
    display: "home"
    // nonDairyOptions: []
  }

  // componentDidMount = () => {
  //   this.fetchNonDairyOptions()
  // }

  // fetchNonDairyOptions = () => {
  //   fetch(nonDairyOptionsURL)
  //   .then(resp => resp.json())
  //   .then(nonDairyOptions => this.setState({
  //     ...this.state,
  //     nonDairyOptions: nonDairyOptions
  //   }))
  // }

  handleSearchText = (text) => {
    this.setState({
      searchText: text
    })
  }

  render(){

    let {address, avatar, bio, email, first_name, last_name, phone_number, username, password, id} = this.state?.user


    return(
      <div className="home-page">
        <Navbar user={this.props.user} handleSearchText={this.handleSearchText} display={this.state.display}/>
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
            <NonDairyOptionCardContainer searchText={this.state.searchText}/>
          </div>

          <div className="profile-page">

          </div>

        </div>
      </div>
    )
  }
}