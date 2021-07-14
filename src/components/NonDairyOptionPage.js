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
    brand: "",
    boardPage: this.props.boardPage,
    link: "",
    recommendations: ""
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
        brandID: nonDairyOption.brand_id,
        link: nonDairyOption.link,
        recommendations: nonDairyOption.recommendations
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

    let {nonDairyOptionID, name, allergens, description, image, categoryID, categoryName, categoryType, brandID, brand, boardPage, link, recommendations} = this.state

    return(
      <div className="non-dairy-option-page">
        { boardPage === false ? <button className="back-to-all-options-button" onClick={() => this.props.changeToAllOptions()}>Back to all options</button> : null }

        <h1>{name.toUpperCase()}</h1>
        <h2>{brand}</h2>

        <div className="non-dairy-option-main-info">

          <div className="non-dairy-option-info">
            <img src={image} alt="Non Dairy Option"></img>
            {/* <p>Category ID # {categoryID} - {categoryName}; Type: {categoryType}</p> */}
            <p>Allergen(s): {allergens}</p>
            <p>{description}</p>

          </div>

          <div className="non-dairy-personalized-notes">
            <p>Recommendations:<br></br>{recommendations}</p>
            <p>Link: <br></br><a href={link}>Where to buy!</a></p>
          </div>


         </div>
      </div>
    )
  }
}