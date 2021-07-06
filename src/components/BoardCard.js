import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'

export default class BoardCard extends Component {

  state = {
    boardPins: [],
    nonDairyOptions: []
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
      console.log(nonDairyOptionIDs)
      let nonDairyOptions = nonDairyOptionIDs.map(id => {
        fetch(nonDairyOptionsURL + `/${id}`)
        .then(resp => resp.json())
        .then(nonDairyOption => this.setState({nonDairyOptions: [...this.state.nonDairyOptions, nonDairyOption]}))
      })
    } else {
      console.log("No options for board.")
    }

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
          {/* { this.state.boardPins.length > 0 ? this.state.boardPins.map(boardPin => <NonDairyOptionCard id={boardPin.non_dairy_option_id}/>) : null } */}

          { this.state.nonDairyOptions.map(nonDairyOption => 
            // console.log(nonDairyOption.name)
            <NonDairyOptionCard 
            key={nonDairyOption.id} 
            id={nonDairyOption.id} 
            name={nonDairyOption.name} 
            description={nonDairyOption.description} 
            allergens={nonDairyOption.allergens} 
            image={nonDairyOption.image}
            brandID={nonDairyOption.brand_id} 
            categoryID={nonDairyOption.category_id}
            boards={this.props.boards} />)}

        </div>

      </div>
    )
  }
}