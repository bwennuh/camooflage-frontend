import React, { Component } from 'react';

export default class BoardCard extends Component {

  render(){

    let {id, name, description} = this.props

    return(
      <div className="board-card">
        <div>
          <h1>BOARD CARD</h1>
          <ul>
            <li>ID # {id}</li>
            <li>{name}</li>
            <li>{description}</li>
          </ul>
        </div>
      </div>
    )
  }
}