import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class BoardCard extends Component {

  state = {
    boardPins: [],
    nonDairyOptions: [],
    deleteBoard: false
  }

  componentDidMount = () => {
    this.fetchBoardPins()
  }

  fetchBoardPins = () => {
    fetch(boardPinsURL)
    .then(resp => resp.json())
    .then(allBoardPins => {
      const boardPins = allBoardPins.filter(boardPin => boardPin.board_id === this.props.id)
      this.setState({
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
        .then(nonDairyOption => this.setState({nonDairyOptions: [...this.state.nonDairyOptions, nonDairyOption]}))
      })
    }
  }

  removeOptionFromBoard = (event) => {
    let deletedBoardPin = this.state.boardPins.find(boardPin => boardPin.board_id === this.props.id && boardPin.non_dairy_option_id === +event.target.value)

    let updatedBoardPins = this.state.boardPins.filter(boardPin => boardPin.id !== deletedBoardPin.id)
    console.log(updatedBoardPins)

    let updatedNonDairyOptions = this.state.nonDairyOptions.filter(nonDairyOption => nonDairyOption.id !== deletedBoardPin.non_dairy_option_id)

    fetch(boardPinsURL + `/${deletedBoardPin.id}`, {method: "DELETE"})
    .then(() => this.setState({ 
      boardPins: updatedBoardPins,
      nonDairyOptions: updatedNonDairyOptions
    }))
  }

  toggleDeleteBoard = () => {
    this.setState({
      deleteBoard: !this.state.deleteBoard
    })
  }

  render(){

    let {id, name, description} = this.props

    return(
      <div className="board-card">

        <div className="board-card-info">
          <h1>BOARD CARD</h1>
            <p>ID # {id}</p>
            <p>{name}</p>
            <p>{description}</p>
        </div>

        <div className="board-non-dairy-options">

          { this.state.nonDairyOptions.map(nonDairyOption => 
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
            boardCard={true}
            removeOptionFromBoard={this.removeOptionFromBoard} />)}
          <br></br>
          <button onClick={(id) => this.props.changeToNonDairyOptionsPage(id)}>Add options</button>

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
           }
        </div>


      </div>
    )
  }
}