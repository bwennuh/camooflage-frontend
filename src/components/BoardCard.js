import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

export default class BoardCard extends Component {

  state = {
    boardPins: [],
    nonDairyOptions: []
  }

  render(){

    let {id, name, description} = this.props

    return(
      <div className="board-card">
        <div className="board-card-info">
          <h1>BOARD CARD</h1>
            <p>ID # {id}</p>
            <p>{name}</p>
            <p>{description}</p>
        </div>
        <div className="board-non-dairy-options">

        </div>
      </div>
    )
  }
}