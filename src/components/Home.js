import React, { Component } from 'react';
import Navbar from './Navbar.js';
import NonDairyOptionCardContainer from './NonDairyOptionCardContainer.js'
import BoardCardContainer from './BoardCardContainer.js'
import ProfilePage from './ProfilePage.js';

const baseURL = 'http://localhost:3001/'
// const usersURL = baseURL + 'users'
const boardsURL = baseURL + 'boards'
// const recipesURL = baseURL + 'recipes'
// const nonDairyOptionsURL = baseURL + 'non_dairy_options'
// const boardPinsURL = baseURL + 'board_pins'
// const recipePinsURL = baseURL + 'recipe_pins'
// const categoriesURL = baseURL + 'categories'
// const brandsURL = baseURL + 'brands'

export default class Home extends Component {

  state = {
    user: this.props.user,
    searchText: "",
    display: "home",
    boards: []
    // nonDairyOptions: []
  }

  componentDidMount = () => {
    this.fetchUserBoards()
  }

  findUserBoards = (boards) => {
    let user = this.state.user
    let userID = user.id
    let filteredBoards = boards.filter(board => board.user_id === userID)
    return filteredBoards
  }

  fetchUserBoards = () => {
    fetch(boardsURL)
    .then(resp => resp.json())
    .then(boards => {
      let filteredBoards = this.findUserBoards(boards)
      
      this.setState({
        ...this.state,
        boards: filteredBoards
      })
    })
  }

  handleSearchText = (text) => {
    this.setState({
      searchText: text
    })
  }

  changeToNonDairyOptionsPage = () => {
    this.setState({
      display: "home"
    })
  }

  changeToBoardsPage = () => {
    this.setState({
      display: "boards"
    })
  }

  changeToProfilePage = () => {
    this.setState({
      display: "profile"
    })
  }

  render(){

    // let {address, avatar, bio, email, first_name, last_name, phone_number, username, password, id} = this.state?.user


    return(
      <div className="home-page">
        <Navbar user={this.props.user} handleSearchText={this.handleSearchText} display={this.state.display} changeToNonDairyOptionsPage={this.changeToNonDairyOptionsPage} changeToBoardsPage={this.changeToBoardsPage} changeToProfilePage={this.changeToProfilePage}/>
        <div>
          <h1>HOME PAGE</h1>
            {/* <p>{first_name + ' ' + last_name}</p>
            <p>{bio}</p>
            <p>{email}</p>
            <p>{address}</p>
            <p>{phone_number}</p>
            <p>Username: {username}</p>
            <p>Password: {password}</p>
            <p>User Id: {id}</p>
            <img src={avatar} alt="avatar"></img> */}

          <div className="non-dairy-options-page">
            { this.state.display === "home" ? <NonDairyOptionCardContainer searchText={this.state.searchText} boards={this.state.boards}/> : null }
          </div>

          <div className="boards-page">
            { this.state.display === "boards" ? <BoardCardContainer user={this.props.user} boards={this.state.boards}/> : null }
          </div>

          <div className="profile-page">
            { this.state.display === "profile" ? <ProfilePage userID={this.state.user.id}/> : null }

          </div>

        </div>
      </div>
    )
  }
}