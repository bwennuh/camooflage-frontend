import React, { Component } from 'react';
import BoardCard from './BoardCard.js';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'

export default class BoardCardContainer extends Component {

  state = {
    boards: []
  }

  componentDidMount = () => {
    this.fetchUserBoards()
  }

  fetchUserBoards = () => {
    fetch(boardsURL)
    .then(resp => resp.json())
    .then(boards => {
      const userBoards = boards.filter(board => board.user_id === this.props.user.id)
      this.setState({
        boards: userBoards
      })
    })
  }

  render(){

    return(
      <div className="board-card-conatiner">
        <div className="board-cards">
          <h1>BOARD CARD CONTAINER</h1>
          {this.state.boards.map(board => 
          <BoardCard 
          key={board.id} 
          id={board.id} 
          name={board.name} 
          description={board.description}
          boards={this.props.boards} />)}
        </div>
      </div>
    )
  }
}