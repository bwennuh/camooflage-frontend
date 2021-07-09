import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
// const boardPinsURL = baseURL + 'board_pins'
// const boardsURL = baseURL + 'boards'

export default class NonDairyOptionPage extends Component {

  state = {
    nonDairyOptionID: this.props.id,
    userID: this.props.userID,
    name: "",
    description: "",
    allergens: "",
    image: "",
    categoryID: "",
    brandID: ""
  }

  componentDidMount = () => {
    this.fetchNonDairyOptionInfo()
  }

  fetchNonDairyOptionInfo = () => {
    fetch(nonDairyOptionsURL + `/${this.state.nonDairyOptionID}`)
    .then(resp => resp.json())
    .then(nonDairyOption => {
      this.setState({
        ...this.state,
        name: nonDairyOption.name,
        description: nonDairyOption.description,
        allergens: nonDairyOption.allergens,
        image: nonDairyOption.image,
        categoryID: nonDairyOption.category_id,
        brandID: nonDairyOption.brand_id
      })
    })
  }

  render(){

    let {nonDairyOptionID, name, allergens, description, image, brandID, categoryID} = this.state

    return(
      <div className="non-dairy-option-page">
        <div>
          <h4>NON-DAIRY OPTION PAGE</h4>
          <div className="non-dairy-option-info">
            <p>ID # {nonDairyOptionID}</p>
            <p>Brand ID # {brandID}</p>
            <p>Category ID # {categoryID}</p>
            <p>{name}</p>
            <p>{description}</p>
            <p>{allergens}</p>
            <img src={image} alt="Non Dairy Option"></img>
          </div>

          <button onClick={() => this.props.changeToAllOptions()}>Back to all options</button>

         </div>
      </div>
    )
  }
}