import React, { Component } from 'react';
import NonDairyOptionCard from './NonDairyOptionCard.js';
import NonDairyOptionPage from './NonDairyOptionPage.js';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
// const boardsURL = baseURL + 'boards'
const brandsURL = baseURL + 'brands'

export default class NonDairyOptionCardContainer extends Component {

  state = {
    nonDairyOptions: [],
    showAllOptions: true,
    nonDairyOptionPageID: 0,
    // boards: []
    userID: this.props.userID,
    allAllergens: this.props.allAllergens,
    allBrands: [],
    applyFilter: false,
    searchFilters: [],
    brandIDFilters: []
  }

  componentDidMount = () => {
    this.fetchNonDairyOptions()
    this.fetchBrands()
  }

  fetchNonDairyOptions = () => {
    fetch(nonDairyOptionsURL)
    .then(resp => resp.json())
    .then(nonDairyOptions => this.setState({
       ...this.state, 
       nonDairyOptions: nonDairyOptions 
      }))
  }

  fetchBrands = () => {
    fetch(brandsURL)
    .then(resp => resp.json())
    .then(brands => {
      let brandNames = brands.map(brand => brand.name)
      this.setState({
       ...this.state, 
       allBrands: brands
      })
    })
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

  applyFilters = () => {
    this.setState({
      ...this.state,
      applyFilter: true
    })
  }

  addAllergenSearchFilter = (searchFilter) => {
    this.setState({
      ...this.state,
      searchFilters: [...this.state.searchFilters, searchFilter]
    })
  }

  removeAllergenSearchFilter = (searchFilter) => {
    let updatedSearchFilters = this.state.searchFilters.filter(filter => filter !== searchFilter)
    this.setState({
      ...this.state,
      searchFilters: updatedSearchFilters
    })
  }

  toggleAllergenFilter = (allergen) => {
    let allergenInput = document.getElementById(allergen + "-allergen-input")

    if (allergenInput.checked){
      this.addAllergenSearchFilter(allergen)
    } else {
      this.removeAllergenSearchFilter(allergen)
    }
  }

  addBrandSearchFilter = (brandID) => {
    this.setState({
      ...this.state,
      brandIDFilters: [...this.state.brandIDFilters, brandID]
    })
  }

  removeBrandSearchFilter = (brandID) => {
    let updatedbrandFilters = this.state.brandIDFilters.filter(filter => filter !== brandID)
    this.setState({
      ...this.state,
      brandIDFilters: updatedbrandFilters
    })
  }

  toggleBrandFilter = (brand) => {
    let brandInput = document.getElementById(brand.name + "-brand-input")

    if (brandInput.checked){
      this.addBrandSearchFilter(brand.id)
    } else {
      this.removeBrandSearchFilter(brand.id)
    }
  }

  render(){

    const nonDairyOptions = this.state.nonDairyOptions
    let searchFilters = this.state.searchFilters
    let brandFilters = this.state.brandIDFilters

    // const searchOptions = nonDairyOptions.filter(nonDairyOption => nonDairyOption.name.toLowerCase().includes(this.props.searchText.toLowerCase()))
    let searchOptions
    let filteredOptions


    if (nonDairyOptions.length > 0){
      searchOptions = nonDairyOptions.filter(nonDairyOption => nonDairyOption.name.toLowerCase().includes(this.props.searchText.toLowerCase()))

      // filteredOptions = searchOptions.filter(nonDairyOption => searchFilters.map(filter => !nonDairyOption.allergens.includes(filter)))

      if (searchFilters.length > 0 && brandFilters.length === 0){
        // debugger
        filteredOptions = searchOptions.filter(option => !searchFilters.includes(option.allergens.toLowerCase()))

      } else if (searchFilters.length === 0 && brandFilters.length > 0){

        filteredOptions = searchOptions.filter(option => brandFilters.includes(option.brand_id))

      } else if (searchFilters.length > 0 && brandFilters.length > 0) {

        filteredOptions = searchOptions.filter(option => !searchFilters.includes(option.allergens.toLowerCase()))
        filteredOptions = filteredOptions.filter(option => brandFilters.includes(option.brand_id))

      } else {
        filteredOptions = searchOptions
      }

    } else {
      searchOptions = []
    }

    return nonDairyOptions.length > 0 ? (
      <div className="non-dairy-options-displays">
      { this.state.showAllOptions === true ?
        <div className="non-dairy-card-container">
          <div>
            <h1>NON-DAIRY OPTION CARD CONTAINER</h1>

            { this.state.applyFilter === false ? <button onClick={() => this.applyFilters()}>Apply filters</button> :
              <div className="filter-checkboxes">
                <div className="filter-allergen-checkboxes">
                <h2>Allergens to avoid:</h2>
                { this.props.allAllergens.map( allergen => (
                  <div className="filter-checkbox">
                    <label>{allergen}</label>
                    <input id={`${allergen}-allergen-input`} value={allergen} type="checkbox" onChange={() => this.toggleAllergenFilter(allergen)}/>
                  </div>
                  ))}
                </div> 

                <div className="filter-brand-checkboxes">
                <h2>Brands:</h2>
                { this.state.allBrands.map( brand => (
                  <div className="filter-checkbox">
                    <label>{brand.name}</label>
                    <input id={`${brand.name}-brand-input`} value={brand.name} type="checkbox" onChange={() => this.toggleBrandFilter(brand)}/>
                  </div>
                  ))}
                </div> 

              </div>
            }
            <br></br>

            {/* {this.searchNonDairyOptions()?.map(nonDairyOption =>  */}
            {/* { searchOptions.map(nonDairyOption =>  */}
              { filteredOptions.map(nonDairyOption => 
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