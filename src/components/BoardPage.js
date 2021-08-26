import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';
import NonDairyOptionPage from './NonDairyOptionPage.js';

// const baseURL = 'http://localhost:3001/'
const baseURL = 'https://camooflage.herokuapp.com/'
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
    editBoard: false,
    viewNonDairyOptionPage: false,
    nonDairyOptionPageID: 0,
    nonDairyOption: {}
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

  toggleDeleteBoard = () => {
    this.setState({
      deleteBoard: !this.state.deleteBoard
    })
  }

  viewNonDairyOptionPage = (id) => {
    // this.fetchNonDairyOption(id)
    this.setState({
      ...this.state,
      viewNonDairyOptionPage: true,
      nonDairyOptionPageID: id
    })
  }

  viewBoardPage = () => {
    this.setState({
      ...this.state,
      viewNonDairyOptionPage: false,
      nonDairyOptionPageID: 0
    })
  }

  fetchNonDairyOption = (id) => {
    fetch(nonDairyOptionsURL + `/${id}`)
    .then(resp => resp.json())
    .then(nonDairyOption => {
      this.setState({
        ...this.state,
        nonDairyOption: nonDairyOption
      })
      this.viewNonDairyOptionPage(id)
    })
  }

  render(){

    let { boardID, name, description, boardPins, nonDairyOptions, nonDairyOption } = this.state

    return(
      <div className="board-page">
        { this.state.viewNonDairyOptionPage === false ? 
        <button className="back-to-boards-button" onClick={() => this.props.changeToAllBoards()}>Back to boards</button>
        : null }
        

        { this.state.viewNonDairyOptionPage === false ? 
        <div className="board-page-containers">

          <div className="board-info">
            <h1>{name.toUpperCase()}</h1>
            <h3>{description}</h3>

            {/* <p>{`Board id: ${boardID}`}</p>
            <p>{`Board name: ${name}`}</p>
            <p>{`Board description: ${description}`}</p> */}
          </div>

          <div className="board-page-non-dairy-options">
            {/* <div className="board-page-non-dairy-option"> */}
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
              moveOptionToNewBoard={this.moveOptionToNewBoard}
              getAllUserBoards={this.props.getAllUserBoards}
              // viewNonDairyOptionPage={this.viewNonDairyOptionPage}
              fetchNonDairyOption={this.fetchNonDairyOption}
              boardPin={this.state.boardPins.find(boardPin => boardPin.non_dairy_option_id === nonDairyOption.id)}
              />)}
              {/* </div> */}
            <br></br>

          </div>

          <div className="edit-board">
            <button className="add-more-options-button" onClick={(id) => this.props.changeToNonDairyOptionsPage(id)}>Add more options</button><br></br>

            <button className="edit-board-button" value={boardID} onClick={(event) => this.editBoard(event)}>Edit Board</button>

            { this.state.editBoard ? 
            <form className="edit-board-form" onSubmit={(event) => this.saveBoardChanges(event)}>
              <label>Board name:</label><br></br>
                  <input type="text" onChange={(event) => this.editBoardName(event)}  placeholder="Board Name"></input><br></br>

                  <label>Board description:</label><br></br>
                  <input type="text" onChange={(event) => this.editBoardDescription(event)}  placeholder="Board Description"></input><br></br>

              <button id="save-board-changes-button" className="edit-board-buttons" type="submit">Save changes</button>
              <button className="edit-board-buttons" onClick={() => this.cancelBoardChanges()}>Cancel changes</button>
            </form> 
            : null }
          </div>
          
          <div className="delete-board">
            { this.state.deleteBoard === false ? 
            <button className="delete-board-button" onClick={() => this.toggleDeleteBoard()}>Delete Board</button> 
            : 
            <div className="delete-board-options">
              <label>Are you sure?</label><br></br>
              {/* <button value={boardID} onClick={(event) => this.props.deleteBoard(event)}>Yes</button> */}
              {/* <button value={boardID} onClick={(event) => this.props.deleteBoardPins(event)}>Yes</button> */}
              <button className="yes-button" value={boardID} onClick={() => this.props.deleteBoardPins(boardID, this.state.boardPins)}>Yes</button>
              <button className="no-button" onClick={() => this.toggleDeleteBoard()}>No</button>
            </div>
            }
          </div>
        </div>
        :
        <div className="non-dairy-option-page-containers">

          <div className="non-dairy-option-page">
            <button className="back-to-board-button" onClick={() => this.viewBoardPage()}>Back to board</button>

            <NonDairyOptionPage 
              id={nonDairyOption.id} 
              userID={this.state.userID} 
              boards={this.props.boards}
              boardPage={true}
              boardID={this.state.boardID}
              boardPin={this.state.boardPins.find(boardPin => boardPin.non_dairy_option_id === nonDairyOption.id)}
            />

          </div>

        </div>
        }


      </div>
    )
  }
}