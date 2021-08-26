import React, { Component } from 'react';

// const baseURL = 'http://localhost:3001/'
const baseURL = 'https://camooflage.herokuapp.com/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class ProfileBoardCard extends Component {

  state = {
    id: this.props.id,
    name: this.props.name,
    description: this.props.description
  }

  render(){

    let {id, name, description} = this.state

    return(
      <div className="profile-board-card">

        <div className="profile-board-card-info">
          {/* <h1>BOARD CARD</h1> */}
            {/* <p>ID # {id}</p> */}
            <h2>{name}</h2>
            <p>{description}</p>
        </div>

      </div>
    )
  }
}