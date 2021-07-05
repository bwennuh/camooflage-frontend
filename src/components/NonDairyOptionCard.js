import React, { Component } from 'react';

export default class NonDairyOptionCard extends Component {

  state = {
    board: 0
  }

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

        <div className="dropdown">
          <button className="dropdown-button">Add to board</button>
          <div className="dropdown-options">
            {this.props.boards.map(board => <p>Board: {board.name}</p>)}
          </div>
        </div>

        </div>
      </div>
    )
  }
}