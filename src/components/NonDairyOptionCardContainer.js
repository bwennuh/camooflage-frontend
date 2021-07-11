import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';
import NonDairyOptionPage from './NonDairyOptionPage.js';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
// const boardsURL = baseURL + 'boards'

export default class NonDairyOptionCardContainer extends Component {

  state = {
    nonDairyOptions: [],
    showAllOptions: true,
    nonDairyOptionPageID: 0,
    // boards: []
    userID: this.props.userID
  }

  componentDidMount = () => {
    this.fetchNonDairyOptions()
  }

  fetchNonDairyOptions = () => {
    fetch(nonDairyOptionsURL)
    .then(resp => resp.json())
    .then(nonDairyOptions => this.setState({ ...this.state, nonDairyOptions: nonDairyOptions }))
  }

  changeToNonDairyOptionPage = (id) => {
    this.setState({
      ...this.state,
      showAllOptions: false,
      nonDairyOptionPageID: id
    })
  }

  changeToAllOptions = () => {
    this.setState({
      showAllOptions: true,
      nonDairyOptionPageID: 0
    })
  }

  render(){

    const nonDairyOptions = this.state.nonDairyOptions

    // const searchOptions = nonDairyOptions.filter(nonDairyOption => nonDairyOption.name.toLowerCase().includes(this.props.searchText.toLowerCase()))
    let searchOptions

    if (nonDairyOptions.length > 0){
      searchOptions = nonDairyOptions.filter(nonDairyOption => nonDairyOption.name.toLowerCase().includes(this.props.searchText.toLowerCase()))
    } else {
      searchOptions = []
    }

    return nonDairyOptions.length > 0 ? (
      <div className="non-dairy-options-displays">
      { this.state.showAllOptions === true ?
        <div className="non-dairy-card-container">
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
                boardPin={{}}
                boardID={0}
                boardCard={false}
                getAllUserBoards={this.props.getAllUserBoards}
                changeToBoardsPage={this.props.changeToBoardsPage}
                changeToNonDairyOptionsPage={this.props.changeToNonDairyOptionsPage}
                changeToNonDairyOptionPage={this.changeToNonDairyOptionPage} 
              />) }
          </div>
        </div>
        : 
        <div className="non-dairy-option-page">
          <h1>NON DAIRY OPTION PAGE</h1>
          <NonDairyOptionPage 
            id={this.state.nonDairyOptionPageID} 
            userID={this.state.userID} 
            boards={this.props.boards}
            boardPage={false}
            changeToAllOptions={this.changeToAllOptions} 
          />
        </div> }
      </div>
    ) : (<span>~ Loading non-dairy options ~</span>)
  }
}