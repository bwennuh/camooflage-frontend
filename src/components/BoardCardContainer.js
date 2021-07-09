import React, { Component } from 'react';
import BoardCard from './BoardCard.js';
import BoardPage from './BoardPage.js';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'
const boardPinsURL = baseURL + 'board_pins'

export default class BoardCardContainer extends Component {

  state = {
    boards: [],
    // name: "",
    // description: "",
    userID: this.props.user.id,
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
      const userBoards = boards.filter(board => board.user_id === this.props.user.id)
      this.setState({
        boards: userBoards
      })
    })
  }

  toggleCreateNewBoardForm = () => {
    this.setState({
      showCreateBoardForm: !this.state.showCreateBoardForm
    })
  }

  getNewBoardName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  getNewBoardDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  createNewUserBoard = (event) => {
    event.preventDefault()

    const newBoard = {
      name: this.state.name, 
      description: this.state.description,
      user_id: this.state.userID
    }

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "POST"
    reqObj.body = JSON.stringify(newBoard)

    fetch(boardsURL, reqObj)
    .then(resp => resp.json())
    .then(newBoard => this.setState({ 
      boards: [...this.state.boards, newBoard],
      name: "",
      description: "",
      userID: this.props.user.id,
      showCreateBoardForm: false
     }))

     this.props.updateBoards(newBoard)
  }

  deleteBoardPins = (boardID, pins) => {

    if (pins.length > 0){
      // pins.map(pin => console.log(pin.id))
      pins.map(pin => {
        fetch(boardPinsURL + `/${pin.id}`, {method: "DELETE"})
        .then(() => {
          this.setState({
            pinsToBeDeleted: pins
          })
          // this.deleteBoard(boardID)
        })
      })
      this.deleteBoard(boardID)
    } else {
      this.deleteBoard(boardID)
    }
  }

  deleteBoard = (boardID) => {
    const updatedBoards = this.state.boards.filter(board => board.id !== boardID)
    // debugger
    fetch(boardsURL + `/${boardID}`, {method: "DELETE"})
    .then(() => {
        this.props.removeDeletedBoard(updatedBoards)
        this.setState({ 
        ...this.state,
        boards: updatedBoards,
        showAllBoards: true
      })
    })
  }
  
  // deleteBoard = (event) => {
  //   let boardID = +event.target.value
  //   this.deleteBoardPins(boardID)

  //   const updatedBoards = this.state.boards.filter(board => board.id !== boardID)
  //   debugger
  //   // fetch(boardsURL + `/${boardID}`, {method: "DELETE"})
  //   // .then(() => {
  //   //     this.props.removeDeletedBoard(updatedBoards)
  //   //     this.setState({ 
  //   //     ...this.state,
  //   //     boards: updatedBoards,
  //   //     showAllBoards: true
  //   //   })
  //   // })
  // }

  changeToBoardPage = (id) => {
    this.setState({
      ...this.state,
      showAllBoards: false,
      boardPageID: id
    })
  }

  changeToAllBoards = () => {
    this.setState({
      showAllBoards: true,
      boardPageID: 0
    })
  }

  getEditedBoards = () => {
    fetch(boardsURL)
    .then(resp => resp.json())
    .then(boards => {
      const userBoards = boards.filter(board => board.user_id === this.props.user.id)
      this.setState({
        boards: userBoards
      })
    })
  }

  // searchBoards = () => {
  //   const searchBoards = this.state?.boards.filter(board => board.name.toLowerCase().includes(this.props.searchText.toLowerCase()))
  //   return searchBoards
  // }

  render(){

    const boards = this.state.boards

    const searchBoards = this.state?.boards.filter(board => board.name.toLowerCase().includes(this.props.searchText.toLowerCase()))

    return boards.length > 0 ? (
      <div className="boards-displays">
      { this.state.showAllBoards === true ?
      <div className="board-card-conatiner">
        <div className="board-cards">
          <h1>BOARD CARD CONTAINER</h1>
          <button onClick={() => this.toggleCreateNewBoardForm()}>Add new board</button><br></br>
          { this.state.showCreateBoardForm ? 
            <div className="create-board-form">
              <form onSubmit={(event) => this.createNewUserBoard(event)}>
                <label>Board name:</label><br></br>
                <input type="text" onChange={(event) => this.getNewBoardName(event)}  placeholder="Board Name" required></input><br></br>

                <label>Board description:</label><br></br>
                <input type="text" onChange={(event) => this.getNewBoardDescription(event)}  placeholder="Board Description"></input><br></br>

                <button id="create-board-button" type="submit">Create board</button>
              </form>
            </div>
           : null }

          {/* {this.state.boards.map(board =>  */}
          {/* {this.searchBoards()?.map(board =>  */}
          { searchBoards.map(board => 
            <BoardCard 
              key={board.id} 
              id={board.id} 
              name={board.name} 
              description={board.description}
              boards={this.state.boards}
              changeToNonDairyOptionsPage={this.props.changeToNonDairyOptionsPage}
              // deleteBoard={this.deleteBoard}
              // updateBoard={this.updateBoard}
              changeToBoardPage={this.changeToBoardPage} 
            />)}
        </div>
      </div>
      : 
      <div className="board-card-page">
        <h1>BOARD CARD PAGE</h1>
        <BoardPage 
          id={this.state.boardPageID} 
          userID={this.state.userID} 
          changeToAllBoards={this.changeToAllBoards}
          boards={this.state.boards}
          changeToNonDairyOptionsPage={this.props.changeToNonDairyOptionsPage}
          changeToBoardPage={this.changeToBoardPage}
          deleteBoard={this.deleteBoard}
          deleteBoardPins={this.deleteBoardPins}
          getEditedBoards={this.getEditedBoards}
          getAllUserBoards={this.props.getAllUserBoards}
          removeDeletedBoard={this.props.removeDeletedBoard} 
         />
      </div>
      }

      </div>
    ) : ((<span>~ Loading boards ~</span>))
  }
}