import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class ProfileFavoriteCard extends Component {

  state = {
    id: this.props.id,
    nonDairyOption: {}
  }

  componentDidMount = () => {
    this.fetchNonDairyOption()
  }

  fetchNonDairyOption = () => {
    fetch(nonDairyOptionsURL + `/${this.props.nonDairyOptionID}`)
    .then(resp => resp.json())
    .then(nonDairyOption => this.setState({
      ...this.state,
      nonDairyOption: nonDairyOption
    }))
  }

  render(){

    let {name, allergens, description, image, brand_id, category_id} = this.state.nonDairyOption

    return(
      <div className="profile-favorite-card">
        

        {/* <div className="heart-container">
          <div className="heart-shape">
          </div>
        </div> */}

        <div className="profile-favorite-card-info">
          {/* <h1>FAVORITE CARD</h1> */}
            <p>{name}</p>
            <div className="heart-shape">
            </div>
            <img src={image} alt="non-dairy option"></img>
            {/* <p>{description}</p> */}
        </div>

      </div>
    )
  }
}