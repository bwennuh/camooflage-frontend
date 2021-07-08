import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class BoardPage extends Component {

  state = {
    boardID: this.props.id,
    userID: this.props.userID,
    name: "",
    previousName: "",
    description: "",
    previousDescription: "",
    boardPins: [],
    nonDairyOptions: [],
    deleteBoard: false,
    editBoard: false
  }

  componentDidMount = () => {
    this.fetchBoardInfo()
  }

  fetchBoardInfo = () => {
    fetch(boardsURL + `/${this.state.boardID}`)
    .then(resp => resp.json())
    .then(board => {
      this.setState({
        ...this.state,
        name: board.name,
        previousName: board.name,
        description: board.description,
        previousDescription: board.description
      })
      this.fetchBoardPins()
    })
  }

  fetchBoardPins = () => {
    fetch(boardPinsURL)
    .then(resp => resp.json())
    .then(allBoardPins => {
      const boardPins = allBoardPins.filter(boardPin => boardPin.board_id === this.state.boardID)
      this.setState({
        ...this.state,
        boardPins: boardPins
      })
      this.fetchNonDairyOptions()
    })
  }

  fetchNonDairyOptions = () => {
    let boardPins = this.state.boardPins
    let nonDairyOptionIDs = boardPins.map(boardPin => boardPin.non_dairy_option_id)

    if (nonDairyOptionIDs.length > 0){
      let nonDairyOptions = nonDairyOptionIDs.map(id => {
        fetch(nonDairyOptionsURL + `/${id}`)
        .then(resp => resp.json())
        .then(nonDairyOption => this.setState({
          ...this.state,
          nonDairyOptions: [...this.state.nonDairyOptions, nonDairyOption]
        }))
      })
    }
  }

  removeOptionFromBoard = (event) => {
    let deletedBoardPin = this.state.boardPins.find(boardPin => boardPin.board_id === this.state.boardID && boardPin.non_dairy_option_id === +event.target.value)

    let updatedBoardPins = this.state.boardPins.filter(boardPin => boardPin.id !== deletedBoardPin.id)
    console.log(updatedBoardPins)

    let updatedNonDairyOptions = this.state.nonDairyOptions.filter(nonDairyOption => nonDairyOption.id !== deletedBoardPin.non_dairy_option_id)

    fetch(boardPinsURL + `/${deletedBoardPin.id}`, {method: "DELETE"})
    .then(() => this.setState({ 
      boardPins: updatedBoardPins,
      nonDairyOptions: updatedNonDairyOptions
    }))
  }


  moveOptionToNewBoard = (nonDairyOptionID, newBoardID, previousBoardID) => {
    const oldBoardPin = this.state.boardPins.find(boardPin => boardPin.board_id === previousBoardID && boardPin.non_dairy_option_id === nonDairyOptionID)

    const filteredBoardPins = this.state.boardPins.filter(boardPin => boardPin.id !== oldBoardPin.id)

    const updatedNonDairyOptions = this.state.nonDairyOptions.filter(nonDairyOption => nonDairyOption.id !== oldBoardPin.non_dairy_option_id)

    const updatedBoardPin = {
        board_id: newBoardID, 
        non_dairy_option_id: nonDairyOptionID
      }

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "PATCH"
    reqObj.body = JSON.stringify(updatedBoardPin)

    fetch(boardPinsURL + `/${oldBoardPin.id}`, reqObj)
    .then(resp => resp.json())
    .then(() => this.setState({
      boardPins: filteredBoardPins,
      nonDairyOptions: updatedNonDairyOptions
      }))
  }

  editBoard = (event) => {
    console.log("Add updated board logic")
    console.log(`Board id: ${event.target.value}`)

    this.setState({
      editBoard: true
    })
  }

  editBoardName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  editBoardDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  saveBoardChanges = (event) => {
    event.preventDefault()

    let boardID = this.state.boardID

    const editedBoard = {
      name: this.state.name, 
      description: this.state.description,
      user_id: this.state.userID
    }

    console.log(editedBoard)

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "PATCH"
    reqObj.body = JSON.stringify(editedBoard)

    fetch(boardsURL + `/${boardID}`, reqObj)
    .then(resp => resp.json())
    .then(() => {
      this.setState({
        ...this.state,
        editBoard: false,
        previousName: editedBoard.name,
        previousDescription: editedBoard.description
      })
      this.props.getEditedBoards()
    })
  }

  cancelBoardChanges = () => {
    this.setState({
      ...this.state,
      name: this.state.previousName,
      description: this.state.previousDescription
    })
  }

  render(){

    let { boardID, name, description, boardPins, nonDairyOptions } = this.state

    return(
      <div className="board-page">

        <div className="board-info">
          <h1> ~ BOARD INFO HERE ~</h1>

          <p>{`Board id: ${boardID}`}</p>
          <p>{`Board name: ${name}`}</p>
          <p>{`Board description: ${description}`}</p>
        </div>

        <button onClick={() => this.props.changeToAllBoards()}>Go back to boards</button>

        <div className="board-page-non-dairy-options">

          { nonDairyOptions.map(nonDairyOption => 
            <NonDairyOptionCard 
            key={nonDairyOption.id} 
            id={nonDairyOption.id} 
            name={nonDairyOption.name} 
            description={nonDairyOption.description} 
            allergens={nonDairyOption.allergens} 
            image={nonDairyOption.image}
            brandID={nonDairyOption.brand_id} 
            categoryID={nonDairyOption.category_id}
            boards={this.props.boards}
            boardID={boardID}
            boardCard={true}
            editable={true}
            removeOptionFromBoard={this.removeOptionFromBoard}
            moveOptionToNewBoard={this.moveOptionToNewBoard} />)}
          <br></br>
          <button onClick={(id) => this.props.changeToNonDairyOptionsPage(id)}>Add more options</button>

        </div>

        <div className="edit-board">
          <button value={boardID} onClick={(event) => this.editBoard(event)}>Edit Board</button>

          {this.state.editBoard ? 
          <form onSubmit={(event) => this.saveBoardChanges(event)}>
            <label>Board name:</label><br></br>
                <input type="text" onChange={(event) => this.editBoardName(event)}  placeholder="Board Name" required></input><br></br>

                <label>Board description:</label><br></br>
                <input type="text" onChange={(event) => this.editBoardDescription(event)}  placeholder="Board Description"></input><br></br>

            <button type="submit">Save changes</button>
            <button onClick={() => this.cancelBoardChanges()}>Cancel changes</button>
          </form> 
          : null }
        </div>
        
        <div className="delete-board">
          { this.state.deleteBoard === false ? 
          <button onClick={() => this.toggleDeleteBoard()}>Delete Board</button> 
          : 
          <div className="delete-board-options">
            <label>Are you sure?</label><br></br>
            <button value={boardID} onClick={(event) => this.props.deleteBoard(event)}>Yes</button>
            <button onClick={() => this.toggleDeleteBoard()}>No</button>
          </div>
           }
        </div>


      </div>
    )
  }
}