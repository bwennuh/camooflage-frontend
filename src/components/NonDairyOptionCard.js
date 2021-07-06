import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class NonDairyOptionCard extends Component {

  state = {
    addToBoardID: this.props.boards[0]?.id,
    removeFromBoardID: 0
  }

  getBoardSelection = (event) => {
    let selectedBoard = this.props.boards.filter(board => board.name === event.target.value)[0]
    this.setState({
      addToBoardID: selectedBoard.id
    })
  }

  addOptionToBoard = () => {
    const newBoardPin = {
      board_id: this.state.addToBoardID, 
      non_dairy_option_id: this.props.id
    }

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "POST"
    reqObj.body = JSON.stringify(newBoardPin)

    fetch(boardPinsURL, reqObj)
    .then(resp => resp.json())
    .then(newBoardPin => this.setState({ addToBoardID: 0 }))
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

          { this.props.boardCard ? 
            <div className="board-non-dairy-option-cards">
              <button value={id} onClick={(event) => this.props.removeOptionFromBoard(event)}>Remove pin</button>
            </div> 
            :
            <div className="main-feed-non-dairy-option-cards">
              <label htmlFor={`${name}-select-board`}>Add to board:</label><br></br>
              <select name="Boards" id={`${name}-select-board`} onChange={(event) => this.getBoardSelection(event)} default="Select board:">
                {boards.map(board => <option value={board.name}>Board: {board.name}</option>)}
              </select><br></br>
              <button onClick={() => this.addOptionToBoard()}>Add to board</button>
            </div> }

        </div>
      </div>
    )
  }
}