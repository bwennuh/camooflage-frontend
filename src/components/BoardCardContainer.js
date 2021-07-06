import React, { Component } from 'react';
import BoardCard from './BoardCard.js';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'

export default class BoardCardContainer extends Component {

  state = {
    boards: [],
    name: "",
    description: "",
    userID: this.props.user.id,
    showCreateBoardForm: false
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
  }

  searchBoards = () => {
    const searchBoards = this.state?.boards.filter(board => board.name.includes(this.props.searchText))
    return searchBoards
  }

  deleteBoard = (event) => {
    let boardID = +event.target.value

    const updatedBoards = this.state.boards.filter(board => board.id !== boardID)

    fetch(boardsURL + `/${boardID}`, {method: "DELETE"})
    .then(() => this.setState({ 
      ...this.state,
      boards: updatedBoards
    }))
  }

  render(){

    return(
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
          {this.searchBoards()?.map(board => 
            <BoardCard 
            key={board.id} 
            id={board.id} 
            name={board.name} 
            description={board.description}
            boards={this.props.boards}
            changeToNonDairyOptionsPage={this.props.changeToNonDairyOptionsPage}
            deleteBoard={this.deleteBoard} />)}
        </div>
      </div>
    )
  }
}