import React, { Component } from 'react';

export default class Navbar extends Component {

  render(){
    return(
      <div className="navbar">

        <div className="navbar-displays">

          {/* <h1>NAVBAR</h1> */}
          { this.props.display === "home" ? 
            <div id="home-page-navbar">
              <img width="100" height="auto" id="navbar-logo" src="https://i.imgur.com/0s5Q1Ie.png" alt="Camooflage Cow"></img>
              <button className="active home-button">Home</button>
              <button className="my-boards-button" onClick={() => this.props.changeToBoardsPage()}>My Boards</button>
              <input placeholder="search by product name" onChange={(event) => this.props.handleSearchText(event.target.value)} className="search-bar"></input>
              <button className="my-profile-button" onClick={() => this.props.changeToProfilePage()}>My Profile</button>
              <button className="log-out-button" onClick={() => this.props.changeToLogin()}>Log Out</button>
            </div> 
            : null }

          { this.props.display === "boards" ? 
            <div id="boards-page-navbar">
              <img width="100" height="auto" id="navbar-logo" src="https://i.imgur.com/0s5Q1Ie.png" alt="Camooflage Cow"></img>
              <button className="home-button" onClick={() => this.props.changeToNonDairyOptionsPage()}>Home</button>
              <button className="active my-boards-button">My Boards</button>
              <input placeholder="search by board name" onChange={(event) => this.props.handleSearchText(event.target.value)} className="search-bar"></input>
              <button className="my-profile-button" onClick={() => this.props.changeToProfilePage()}>My Profile</button>
              <button className="log-out-button" onClick={() => this.props.changeToLogin()}>Log Out</button>
            </div> 
            : null }

          { this.props.display === "profile" ? 
            <div id="profile-page-navbar">
              <img width="100" height="auto" id="navbar-logo" src="https://i.imgur.com/0s5Q1Ie.png" alt="Camooflage Cow"></img>
              <button className="home-button" onClick={() => this.props.changeToNonDairyOptionsPage()}>Home</button>
              <button className="my-boards-button" onClick={() => this.props.changeToBoardsPage()}>My Boards</button>
              <button className="active my-profile-button">My Profile</button>
              <button className="log-out-button" onClick={() => this.props.changeToLogin()}>Log Out</button>
            </div> 
            : null }

        </div>

      </div>
    )
  }
}