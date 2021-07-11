import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class ProfileFavoriteCard extends Component {

  state = {
    // id: this.props.id,
    // name: this.props.name,
    // description: this.props.description
  }

  render(){

    // let {id, name, description} = this.state

    return(
      <div className="profile-favorite-card">

        <div className="profile-favorite-card-info">
          <h1>FAVORITE CARD</h1>
            {/* <p>ID # {id}</p>
            <p>{name}</p>
            <p>{description}</p> */}
        </div>

      </div>
    )
  }
}