import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
// const boardsURL = baseURL + 'boards'

export default class NonDairyOptionCardContainer extends Component {

  state = {
    nonDairyOptions: []
    // boards: []
    // userID: this.props.userID
  }

  componentDidMount = () => {
    this.fetchNonDairyOptions()
  }

  fetchNonDairyOptions = () => {
    fetch(nonDairyOptionsURL)
    .then(resp => resp.json())
    .then(nonDairyOptions => this.setState({ ...this.state, nonDairyOptions: nonDairyOptions }))
  }

  // findUserBoards = (boards) => {
  //   let userID = this.state.userID
  //   let filteredBoards = boards.filter(board => board.user_id === userID)
  //   return filteredBoards
  // }

  // fetchUserBoards = () => {
  //   fetch(boardsURL)
  //   .then(resp => resp.json())
  //   .then(boards => {
  //     let filteredBoards = this.findUserBoards(boards)
      
  //     this.setState({
  //       ...this.state,
  //       boards: filteredBoards
  //     })
  //   })
  // }

  render(){

    const nonDairyOptions = this.state.nonDairyOptions

    const searchOptions = nonDairyOptions.filter(nonDairyOption => nonDairyOption.name.toLowerCase().includes(this.props.searchText.toLowerCase()))

    return nonDairyOptions.length > 0 ? (
      <div className="non-dairy-card-conatiner">
        <div>
          <h1>NON-DAIRY OPTION CARD CONTAINER</h1>
          {/* {this.searchNonDairyOptions()?.map(nonDairyOption =>  */}
          { searchOptions.map(nonDairyOption => 
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
          // boards={this.state.boards}
          boardID={0}
          boardCard={false}
          getAllUserBoards={this.props.getAllUserBoards}
          changeToBoardsPage={this.props.changeToBoardsPage} />)}
        </div>
      </div>
    ) : (<span>~ Loading non-dairy options ~</span>)
  }
}