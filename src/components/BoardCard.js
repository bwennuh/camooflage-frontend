import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class BoardCard extends Component {

  state = {
    boardPins: [],
    nonDairyOptions: [],
    deleteBoard: false,
    viewBoardPage: false
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
        .then(nonDairyOption => this.setState({
          nonDairyOptions: [...this.state.nonDairyOptions, nonDairyOption]
        }))
      })
    }
  }

  // toggleDeleteBoard = () => {
  //   this.setState({
  //     deleteBoard: !this.state.deleteBoard
  //   })
  // }

  render(){

    let {id, name, description} = this.props

    return(
      <div className="board-card">

        <div className="board-card-info">
          <h1>{name.toUpperCase()}</h1>
            {/* <p>ID # {id}</p>
            <p>{name}</p> */}
            <p className="big-p-tag">{description}</p>
        </div>

        <div className="board-non-dairy-options">

          { this.state.nonDairyOptions.map(nonDairyOption => 
          <div className="board-non-dairy-option">
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
            editable={false}
            changeToNonDairyOptionsPage={this.props.changeToNonDairyOptionsPage}
            // removeOptionFromBoard={this.removeOptionFromBoard}
            // moveOptionToNewBoard={this.moveOptionToNewBoard} 
            />
            </div>)}
          <br></br>
          {/* <button onClick={(id) => this.props.changeToNonDairyOptionsPage(id)}>Add options</button> */}

        </div>

        <div className="view-board">
          <button className="view-board-button" value={id} onClick={() => this.props.changeToBoardPage(id)}>View Board</button>
        </div>

        {/* <div className="edit-board">
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
           }
        </div> */}


      </div>
    )
  }
}