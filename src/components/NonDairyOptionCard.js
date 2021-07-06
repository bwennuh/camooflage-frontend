import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class NonDairyOptionCard extends Component {

  state = {
    boardID: this.props.boards[0].id
  }

  getBoardSelection = (event) => {
    console.log(event.target.value)
    let selectedBoard = this.props.boards.filter(board => board.name === event.target.value)[0]
    console.log(selectedBoard.id)
    this.setState({
      boardID: selectedBoard.id
    })
  }

  addOptionToBoard = () => {
    console.log("Add option to board logic here ~")
    const newBoardPin = {
      board_id: this.state.boardID, 
      non_dairy_option_id: this.props.id
    }

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "POST"
    reqObj.body = JSON.stringify(newBoardPin)

    fetch(boardPinsURL, reqObj)
    .then(resp => resp.json())
    .then(newBoardPin => this.setState({ boardID: 0 }))
  }

  render(){

    let {id, name, allergens, description, image, brandID, categoryID, boards} = this.props

    return(
      <div className="non-dairy-option-card">
        <div>
          <h1>NON-DAIRY OPTION CARD</h1>
          <div className="non-dairy-option-info">
            <p>ID # {id}</p>
            <p>Brand ID # {brandID}</p>
            <p>Category ID # {categoryID}</p>
            <p>{name}</p>
            <p>{description}</p>
            <p>{allergens}</p>
            <img src={image} alt="Non Dairy Option"></img>
          </div>
        
          <label htmlFor={`${name}-select-board`}>Add to board:</label><br></br>
          <select name="Boards" id={`${name}-select-board`} onChange={(event) => this.getBoardSelection(event)} default="Select board:">
            {boards.map(board => <option value={board.name}>Board: {board.name}</option>)}
          </select><br></br>
          <button onClick={() => this.addOptionToBoard()}>Add to board</button>

        </div>
      </div>
    )
  }
}