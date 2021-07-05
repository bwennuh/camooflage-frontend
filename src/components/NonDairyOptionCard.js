import React, { Component } from 'react';

export default class NonDairyOptionCard extends Component {

  state = {
    boardID: 0
  }

  // dropdownButtonClick = () => {
  //   let dropdown = document.getElementById("dropdown-options")
  //   dropdown.classList.toggle("show")
  // }

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
  }

  // dropdownClose = (event) => {
  //   if (!event.target.matches(".dropdown-button")){
  //     let dropdownOptions = document.getElementsByClassName("dropdown-options")
  //     for (let i = 0; i < dropdownOptions.length; i++){
  //       let openDropdown = dropdownOptions[i]
  //       if (openDropdown.classList.contains("show")){
  //         openDropdown.classList.remove("show")
  //       }
  //     }
  //   }
  // }

  render(){

    let {id, name, allergens, description, image, brandID, categoryID, boards} = this.props

    return(
      <div className="non-dairy-option-card">
        <div>
          <h1>NON-DAIRY OPTION CARD</h1>
          <ul>
            <li>ID # {id}</li>
            <li>Brand ID # {brandID}</li>
            <li>Category ID # {categoryID}</li>
            <li>{name}</li>
            <li>{description}</li>
            <li>{allergens}</li>
            <li><img src={image}></img></li>
          </ul>

        {/* <div className="dropdown">
          <button className="dropdown-button" onClick={() => this.dropdownButtonClick()}>Add to board</button>
          <div id="dropdown-options" className="dropdown-options">
            {boards.map(board => <p>Board: {board.name}</p>)}
          </div>
        </div> */}

        <select name="Boards" id="select-board" onChange={(event) => this.getBoardSelection(event)} default="Select board:">
          <option disabled selected value>-- Select a board --</option>
          {boards.map(board => <option value={board.name}>Board: {board.name}</option>)}
        </select><br></br>
        <button onClick={() => this.addOptionToBoard()}>Add to board</button>

        </div>
      </div>
    )
  }
}