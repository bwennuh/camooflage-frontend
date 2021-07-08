import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

const baseURL = 'http://localhost:3001/'
const boardsURL = baseURL + 'boards'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class BoardPage extends Component {

  state = {
    boardID: this.props.id,
    // userID: this.props.userID,
    name: "",
    description: "",
    boardPins: [],
    nonDairyOptions: []
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
        description: board.description
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

  render(){

    return(
      <div className="board-page">

        <div className="board-info">
          <h1> ~ BOARD INFO HERE ~</h1>
        </div>

        <button onClick={() => this.props.changeToAllBoards()}>Go back to boards</button>

        <div className="board-non-dairy-options">

          {/* { this.state.nonDairyOptions.map(nonDairyOption => 
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
            boardID={id}
            boardCard={true}
            removeOptionFromBoard={this.removeOptionFromBoard}
            moveOptionToNewBoard={this.moveOptionToNewBoard} />)}
          <br></br>
          <button onClick={(id) => this.props.changeToNonDairyOptionsPage(id)}>Add options</button>

        </div>

        <div className="edit-board">
          <button value={id} onClick={(event) => this.props.updateBoard(event)}>Edit Board</button>
        </div>
        
        <div className="delete-board">
          { this.state.deleteBoard === false ? 
          <button onClick={() => this.toggleDeleteBoard()}>Delete Board</button> 
          : 
          <div className="delete-board-options">
            <label>Are you sure?</label><br></br>
            <button value={id} onClick={(event) => this.props.deleteBoard(event)}>Yes</button>
            <button onClick={() => this.toggleDeleteBoard()}>No</button>
          </div>
           } */}
        </div>


      </div>
    )
  }
}