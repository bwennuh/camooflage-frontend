import React, { Component } from 'react';

const baseURL = 'http://localhost:3001/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const categoriesURL = baseURL + 'categories'
const brandsURL = baseURL + 'brands'

export default class NonDairyOptionPage extends Component {

  state = {
    nonDairyOptionID: this.props.id,
    userID: this.props.userID,
    name: "",
    description: "",
    allergens: "",
    image: "",
    categoryID: "",
    categoryName: "",
    categoryType: "",
    brandID: "",
    brand: ""
  }

  componentDidMount = () => {
    this.fetchNonDairyOptionInfo()
  }

  fetchNonDairyOptionInfo = () => {
    fetch(nonDairyOptionsURL + `/${this.state.nonDairyOptionID}`)
    .then(resp => resp.json())
    .then(nonDairyOption => {
      this.setState({
        ...this.state,
        name: nonDairyOption.name,
        description: nonDairyOption.description,
        allergens: nonDairyOption.allergens,
        image: nonDairyOption.image,
        categoryID: nonDairyOption.category_id,
        brandID: nonDairyOption.brand_id
      })
      this.fetchBrand()
      this.fetchCategory()
    })
  }

  fetchBrand = () => {
    fetch(brandsURL + `/${this.state.brandID}`)
    .then(resp => resp.json())
    .then(brand => this.setState({
      ...this.state,
      brand: brand.name
    }))
  }

  fetchCategory = () => {
    fetch(categoriesURL + `/${this.state.categoryID}`)
    .then(resp => resp.json())
    .then(category => this.setState({
      ...this.state,
      categoryName: category.name,
      categoryType: category.product_type
    }))
  }

  render(){

    let {nonDairyOptionID, name, allergens, description, image, categoryID, categoryName, categoryType, brandID, brand} = this.state

    return(
      <div className="non-dairy-option-page">
        <button onClick={() => this.props.changeToAllOptions()}>Back to all options</button>
        <h1>{`NON-DAIRY OPTION PAGE FOR: ${name.toUpperCase()}`}</h1>

        <div className="non-dairy-option-main-info">

          <div className="non-dairy-option-info">
            <img src={image} alt="Non Dairy Option"></img>
            <p>Non-Dairy Option ID # {nonDairyOptionID} - {name}</p>
            <p>Brand ID # {brandID} - {brand}</p>
            <p>Category ID # {categoryID} - {categoryName}; Type: {categoryType}</p>
            <p>Description: {description}</p>
            <p>Allergen(s): {allergens}</p>
          </div>

          <div className="non-dairy-personalized-notes">
            <p>Add personalized description, notes, and recommendations here!</p>
            <p>Add link for where to buy product here!</p>
          </div>


         </div>
      </div>
    )
  }
}