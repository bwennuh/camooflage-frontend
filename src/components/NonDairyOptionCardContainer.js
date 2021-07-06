import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'

export default class NonDairyOptionCardContainer extends Component {

  state = {
    nonDairyOptions: []
  }

  componentDidMount = () => {
    this.fetchNonDairyOptions()
  }

  fetchNonDairyOptions = () => {
    fetch(nonDairyOptionsURL)
    .then(resp => resp.json())
    .then(nonDairyOptions => this.setState({nonDairyOptions}))
  }

  filterNonDairyOptions = () => {
    const filteredOptions = this.state?.nonDairyOptions.filter(nonDairyOption => nonDairyOption.name.includes(this.props.searchText))
    return filteredOptions
  }

  render(){

    return(
      <div className="non-dairy-card-conatiner">
        <div>
          <h1>NON-DAIRY OPTION CARD CONTAINER</h1>
          {this.filterNonDairyOptions().map(nonDairyOption => 
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