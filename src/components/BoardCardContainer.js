import React, { Component } from 'react';
import BoardCard from './BoardCard.js';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'

export default class BoardCardContainer extends Component {

  state = {
    boards: []
  }

  componentDidMount = () => {
    this.fetchBoards()
  }

  fetchBoards = () => {
    fetch(boardsURL)
    .then(resp => resp.json())
    .then(boards => this.setState({boards}))
  }

  getUserBoards = () => {
    const userBoards = this.state.boards.filter(board => board.user_id === this.props.user.id)
    return userBoards
  }

  render(){

    return(
      <div className="board-card-conatiner">
        <div>
          <h1>BOARD CARD CONTAINER</h1>
          {this.getUserBoards().map(board => 
          <BoardCard 
          key={board.id} 
          id={board.id} 
          name={board.name} 
          description={board.description} />)}
        </div>
      </div>
    )
  }
}