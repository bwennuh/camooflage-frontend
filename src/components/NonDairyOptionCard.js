import React, { Component } from 'react';

export default class NonDairyOptionCard extends Component {

  render(){

    let {id, name, allergens, description, image, brandID, categoryID} = this.props

    return(
      <div className="non-dairy-option-card">
        <div>
          <h1>NON-DAIRY OPTION CARD</h1>
          <ul>
            <li>ID # {id}</li>
            <li>Brand ID # {brandID}</li>
            <li>Category ID # {categoryID}</li>
            <li>{name}</li>
            <li>{description}</li>
            <li>{allergens}</li>
            <li><img src={image}></img></li>
          </ul>

        <div class="dropdown">
          <button class="dropdown-button">Add to board</button>
          <div class="dropdown-options">
            <p>Board 1</p>
            <p>Board 2</p>
            <p>Board 3</p>
          </div>
        </div>

        </div>
      </div>
    )
  }
}