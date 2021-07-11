import React, { Component } from 'react';
import ProfileBoardCard from './ProfileBoardCard';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'

export default class ProfileBoardCardContainer extends Component {

  state = {
    boards: [],
    userID: this.props.userID,
    showCreateBoardForm: false,
    showAllBoards: true,
    boardPageID: 0,
    pinsToBeDeleted: []
  }

  componentDidMount = () => {
    this.fetchUserBoards()
  }

  fetchUserBoards = () => {
    fetch(boardsURL)
    .then(resp => resp.json())
    .then(boards => {
      const userBoards = boards.filter(board => board.user_id === this.props.userID)
      this.setState({
        boards: userBoards
      })
    })
  }

  render(){

    const boards = this.state.boards

    return (
      <div className="profile-boards-displays">
        <h1>PROFILE BOARD CONTAINER</h1>
        { boards.map(board => <ProfileBoardCard key={board.id} id={board.id} name={board.name} description={board.description} />)}
      </div>
    )
  }
}