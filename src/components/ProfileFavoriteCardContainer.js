import React, { Component } from 'react';
import ProfileFavoriteCard from './ProfileFavoriteCard';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'
const boardPinsURL = baseURL + 'board_pins'

export default class ProfileFavoriteCardContainer extends Component {

  state = {
    boards: [],
    boardIDs: [],
    boardPins: [],
    favorites: [],
    userID: this.props.userID
  }

  componentDidMount = () => {
    this.fetchUserBoards()
  }

  fetchUserBoards = () => {
    fetch(boardsURL)
    .then(resp => resp.json())
    .then(boards => {
      const userBoards = boards.filter(board => board.user_id === this.props.userID)
      const userBoardIDs = userBoards.map(board => board.id)
      this.setState({
        ...this.state,
        boards: userBoards,
        boardIDs: userBoardIDs
      })
      this.fetchBoardPins()
    })
  }

  fetchBoardPins = () => {
    fetch(boardPinsURL)
    .then(resp => resp.json())
    .then(boardPins => {
      const userBoardPinArrays = this.state.boardIDs.map(boardID => boardPins.filter(boardPin => boardPin.board_id === boardID))
      const userBoardPins = userBoardPinArrays.filter(array => array.length > 0).flat()
      // const userBoardPins = boardPins.filter(boardPin => this.state.boardIDs.map(boardID => boardPin.board_id === boardID))
      // debugger
      this.setState({
        ...this.state,
        boardPins: userBoardPins
      })
      this.findFavorites(userBoardPins)
    })
  }

  findFavorites = (pins) => {
    let favorites = pins.filter(pin => pin.favorite === true)
    this.setState({
      ...this.state,
      favorites: favorites
    })
  }

  render(){

    const favorites = this.state.favorites

    return (
      <div className="profile-boards-displays">
        <h1>PROFILE FAVORITES CONTAINER</h1>
        {/* <ProfileFavoriteCard /> */}
        { favorites.map(favorite => <ProfileFavoriteCard />)}
      </div>
    )
  }
}