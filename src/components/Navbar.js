import React, { Component } from 'react';

export default class Navbar extends Component {

  render(){
    return(
      <div className="navbar">
        <div>
          <h1>NAVBAR</h1>
          { this.props.display === "home" ? <input placeholder="search by name..." onChange={(event) => this.props.handleSearchText(event.target.value)} className="search-bar"></input> : null}
        </div>
      </div>
    )
  }
}