import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
// const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'
const boardsURL = baseURL + 'boards'

export default class NonDairyOptionCard extends Component {

  state = {
    addToBoardID: undefined,
    // addToBoardID: this.props.boards[0]?.id,
    editable: false
    // removeFromBoardID: 0,
    // moveToBoardID: 0,
    // boardPinToBeUpdated: {}
  }

  // componentDidMount = () => {
  //   this.setInitialBoardID()
  // }
  
  // setInitialBoardID = () => {
  //   if (this.props.boards.length > 0){
  //     this.setState({
  //       addToBoardID: this.props.boards[0]?.id
  //     })
  //   }
  // }

  getBoardSelection = (event) => {
    this.props.getAllUserBoards()
    let selectedBoard = this.props.boards.find(board => board.name === event.target.value)
    // let selectedBoard = this.props.boards.filter(board => board.id === event.target.value)[0]
    // debugger
    this.setState({
      addToBoardID: selectedBoard.id
    })
  }

  addOptionToBoard = () => {

    if (typeof this.state.addToBoardID === "undefined"){
      alert ("Please select a board to continue")
    } else {
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
      .then(newBoardPin => this.setState({ addToBoardID: undefined }))
    }
    // const newBoardPin = {
    //   board_id: this.state.addToBoardID, 
    //   non_dairy_option_id: this.props.id
    // }

    // const reqObj = {}

    // reqObj.headers = {"Content-Type": "application/json"}
    // reqObj.method = "POST"
    // reqObj.body = JSON.stringify(newBoardPin)

    // fetch(boardPinsURL, reqObj)
    // .then(resp => resp.json())
    // .then(newBoardPin => this.setState({ addToBoardID: 0 }))
  }

  editOption = () => {
    this.setState({
      editable: !this.state.editable
    })
  }

  render(){

    let {id, name, allergens, description, image, brandID, categoryID, boards, boardCard, editable} = this.props

    return(
      <div className="non-dairy-option-card">
        <div>
          <h4>NON-DAIRY OPTION CARD</h4>
          <div className="non-dairy-option-info">
            <p>ID # {id}</p>
            <p>Brand ID # {brandID}</p>
            <p>Category ID # {categoryID}</p>
            <p>{name}</p>
            <p>{description}</p>
            <p>{allergens}</p>
            <img src={image} alt="Non Dairy Option"></img>
          </div>

          { boardCard ? 
            <div className="board-non-dairy-option-cards">
              { editable ? 
                <div className="non-dairy-option-board-card-buttons">
                  { boards.filter(board => board.id !== this.props.boardID).length === 0 ? null :
                  <div className="edit-buttons">
                  <button value={id} onClick={() => this.editOption()}>Edit option</button>
                  </div> }
                  <div className="delete-buttons">
                  <button value={id} onClick={(event) => this.props.removeOptionFromBoard(event)}>Remove option</button>
                  </div>
                </div>
              : null }

              { this.state.editable === true ? 
                <div className="edit-option-on-board">

                  <div className="main-feed-non-dairy-option-cards">
                    
                    {/* <label htmlFor={`${name}-select-board`}>Move to board:</label><br></br> */}
                    {/* <button value={id} onClick={() => this.props.moveOptionToNewBoard(id, this.state.addToBoardID, this.props.boardID)}>Move to new board</button><br></br> */}

                    { boards.length > 0 ?
                      <div>
                        { boards.filter(board => board.id !== this.props.boardID).length === 0 ? null : 
                        <div>
                          <button value={id} onClick={() => this.props.moveOptionToNewBoard(id, this.state.addToBoardID, this.props.boardID)}>Move to new board</button><br></br>
                          <select name="Boards" id={`${name}-select-board`} onChange={(event) => this.getBoardSelection(event)} defaultValue="">
                            <option disabled value="">Select a board:</option>
                            { boards.filter(board => board.id !== this.props.boardID).map(board => <option value={board.name}>Board: {board.name}</option>) }
                          </select><br></br>
                        </div>
                        }
                      </div> 
                      : null }
                    {/* <button value={id} onClick={() => this.props.moveOptionToNewBoard(id, this.state.addToBoardID, this.props.boardID)}>Move to board</button> */}
                  </div>
                  
                </div> 
                : null }

            </div> 
            :
            <div className="main-feed-non-dairy-option-cards">
              { boards.length > 0 ? 
                <span>
                  {/* <label htmlFor={`${name}-select-board`}>Add to board:</label><br></br> */}
                    <button onClick={() => this.addOptionToBoard()}>Add to board</button><br></br>
                    <select name="Boards" id={`${name}-select-board`} onChange={(event) => this.getBoardSelection(event)} defaultValue="">
                    <option disabled value="">Select a board:</option>
                      { boards.map(board => <option value={board.name}>Board: {board.name}</option>) }
                    </select><br></br>
                    
                </span> 
              : <button onClick={() => this.props.changeToBoardsPage()}>Create new board</button> }

            </div> }

        </div>
      </div>
    )
  }
}