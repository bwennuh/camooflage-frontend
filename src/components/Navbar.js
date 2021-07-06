import React, { Component } from 'react';

export default class Navbar extends Component {

  render(){
    return(
      <div className="navbar">
        <div>
          <h1>NAVBAR</h1>
          { this.props.display === "home" ? 
            <div id="home-page-navbar">
              <button onClick={() => this.props.changeToBoardsPage()}>My Boards</button>
              <button onClick={() => this.props.changeToProfilePage()}>My Profile</button>
              <input placeholder="search by product name..." onChange={(event) => this.props.handleSearchText(event.target.value)} className="search-bar"></input>
            </div> 
            : null }

          { this.props.display === "boards" ? 
            <div id="boards-page-navbar">
              <button onClick={() => this.props.changeToNonDairyOptionsPage()}>Home</button>
              <button onClick={() => this.props.changeToProfilePage()}>My Profile</button>
              <input placeholder="search by board name..." onChange={(event) => this.props.handleSearchText(event.target.value)} className="search-bar"></input>
            </div> 
            : null }

          { this.props.display === "profile" ? 
            <div id="profile-page-navbar">
              <button onClick={() => this.props.changeToNonDairyOptionsPage()}>Home</button>
              <button onClick={() => this.props.changeToBoardsPage()}>My Boards</button>
            </div> 
            : null }

        </div>
      </div>
    )
  }
}