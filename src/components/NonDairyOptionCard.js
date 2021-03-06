import React, { Component } from 'react';

// const baseURL = 'http://localhost:3001/'
const baseURL = 'https://camooflage.herokuapp.com/'
const nonDairyOptionsURL = baseURL + 'non_dairy_options'
const boardPinsURL = baseURL + 'board_pins'
const boardsURL = baseURL + 'boards'
const categoriesURL = baseURL + 'categories'
const brandsURL = baseURL + 'brands'

export default class NonDairyOptionCard extends Component {

  state = {
    addToBoardID: undefined,
    editable: false,
    boardPin: this.props.boardPin,
    allergens: [],
    brand: "",
    categoryName: "",
    categoryProductType: "",
    addToBoard: false
  }

  componentDidMount = () => {
    this.getAllergenTags()
    this.getBrand()
    this.getCategory()
  }

  getBrand = () => {
    fetch(brandsURL + `/${this.props.brandID}`)
    .then(resp => resp.json())
    .then(brand => this.setState({
      ...this.state,
      brand: brand.name
    }))
  }

  getCategory = () => {
    fetch(categoriesURL + `/${this.props.categoryID}`)
    .then(resp => resp.json())
    .then(category => this.setState({
      ...this.state,
      categoryName: category.name,
      categoryProductType: category.product_type
    }))
  }

  getBoardSelection = (event) => {
    this.props.getAllUserBoards()
    let selectedBoard = this.props.boards.find(board => board.name === event.target.value)
    // let selectedBoard = this.props.boards.filter(board => board.id === event.target.value)[0]
    // debugger
    this.setState({
      addToBoardID: selectedBoard.id
    })
  }

  addOptionToBoard = () => {

    if (typeof this.state.addToBoardID === "undefined"){
      console.log("Please select a board to continue")
    } else {
      const newBoardPin = {
        board_id: this.state.addToBoardID, 
        non_dairy_option_id: this.props.id,
        favorite: false
      }
  
      const reqObj = {}
  
      reqObj.headers = {"Content-Type": "application/json"}
      reqObj.method = "POST"
      reqObj.body = JSON.stringify(newBoardPin)
  
      fetch(boardPinsURL, reqObj)
      .then(resp => resp.json())
      .then(newBoardPin => this.setState({ addToBoardID: undefined }))
    }
  }

  editOption = () => {
    this.setState({
      editable: !this.state.editable
    })
  }

  fetchBoardPin = (id) => {
    fetch(boardPinsURL)
    .then(resp => resp.json())
    .then(boardPins => {
      let foundBoardPin = boardPins.find(boardPin => boardPin.non_dairy_option_id === id && boardPin.board_id === this.props.boardID)
      this.favoriteOption(foundBoardPin)
    })
  }

  favoriteOption = (pin) => {
    const favoriteBoardPin = {
      board_id: pin.board_id, 
      non_dairy_option_id: pin.non_dairy_option_id,
      favorite: true
    }

    console.log(pin)
    console.log(favoriteBoardPin)

    const reqObj = {}

    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "PATCH"
    reqObj.body = JSON.stringify(favoriteBoardPin)

    fetch(boardPinsURL + `/${pin.id}`, reqObj)
    .then(resp => resp.json())
    .then(boardPin => this.setState({
      boardPin: favoriteBoardPin
    }))
  }

  getAllergenTags = () => {
    let allergens = this.props.allergens
    let allergensArray = allergens.split(", ").map(allergen => allergen.toLowerCase())
    this.setState({
      ...this.state,
      allergens: allergensArray
    })
  }

  render(){

    let {id, name, allergens, description, image, brandID, categoryID, boards, boardCard, editable} = this.props

    return(
      <div className="non-dairy-option-card">
        <div className="non-dairy-card-main">
        <div>
          { boardCard ? 
          <div>
            { editable ? 
            <div>
              { this.state.boardPin.hasOwnProperty("favorite") ?
                <div className="favorite-button-wrapper">
                { this.state.boardPin.favorite === false ? <button className="base-button white-to-darkPink-button" onClick={() => this.fetchBoardPin(id)}>Add to favorites</button> : <button className="heart-button">????</button> }
                </div> : null }
            </div> : null }
          </div> : null }

          {/* <h4>NON-DAIRY OPTION CARD</h4> */}
          <div className="non-dairy-option-info">
            <h3>{name}</h3>

            {/* <img src={image} alt="Non Dairy Option"></img> */}

            <picture>
              <img width="100" height="200" src={image} alt="Non Dairy Option"></img>
            </picture>

            {/* <p>ID # {id}</p> */}
            {/* <p>Brand ID # {brandID} - {this.state.brand}</p> */}
            <h4>{this.state.brand.toUpperCase()}</h4>
            {/* <p>Category ID # {categoryID} - {this.state.categoryName} ({this.state.categoryProductType})</p> */}

            {/* <p>{description}</p> */}
            {/* <p>Allergens: {allergens}</p> */}
          </div>

          { boardCard ? 
            <div className="board-non-dairy-option-cards">
              { editable ? 
                <div className="non-dairy-option-board-card-buttons">

                  <div className="view-non-dairy-option-page-buttons">  
                    <button className="base-button pink-to-darkPink-button bottom-margin-20px wide-button" onClick={() => this.props.fetchNonDairyOption(id)}>View Page</button>
                  </div>

                  { boards.filter(board => board.id !== this.props.boardID).length === 0 ? null :
                  <div className="edit-buttons">
                    <button className="edit-button" value={id} onClick={() => this.editOption()}>Edit option</button>
                  </div> }

                </div>
              : null }

              { this.state.editable === true ? 
                <div className="edit-option-on-board">

                  <div className="main-feed-non-dairy-option-cards">
                    
                    { boards.length > 0 ?
                      <div>
                        { boards.filter(board => board.id !== this.props.boardID).length === 0 ? null : 
                        <div className="board-selection-container">

                          <select className="board-select" name="Boards" id={`${name}-select-board`} onChange={(event) => this.getBoardSelection(event)} defaultValue="">
                            <option disabled value="">Select a board:</option>
                            { boards.filter(board => board.id !== this.props.boardID).map(board => <option value={board.name}>Board: {board.name}</option>) }
                          </select><br></br>
                          <button className="move-option-button" value={id} onClick={() => this.props.moveOptionToNewBoard(id, this.state.addToBoardID, this.props.boardID)}>Move to board</button><br></br>

                          <div className="delete-buttons">
                            <button className="delete-button" value={id} onClick={(event) => this.props.removeOptionFromBoard(event)}>Remove option</button>
                          </div>
                        </div>

                        
                        }
                      </div> 
                      : null }

                  </div>
                  
                </div> 
                : null }

            </div> 
            :
            <div className="main-feed-non-dairy-option-cards">

              <div className="view-non-dairy-option-page-buttons"> 

                <button className="base-button pink-to-darkPink-button bottom-margin-20px wide-button" onClick={() => this.props.changeToNonDairyOptionPage(id)}>View Page</button><br></br>

              { boards.length > 0 ? 
                <span>
                  {/* <label htmlFor={`${name}-select-board`}>Add to board:</label><br></br> */}

                    <select className="board-select" name="Boards" id={`${name}-select-board`} onChange={(event) => this.getBoardSelection(event)} defaultValue="">
                    <option disabled value="">Select a board:</option>
                      { boards.map(board => <option value={board.name}>Board: {board.name}</option>) }
                    </select><br></br>
                    <button className="base-button pink-to-darkPink-button wide-button bottom-margin-20px" onClick={() => this.addOptionToBoard()}>Add to board</button><br/>
                    
                </span> 
                : <button onClick={() => this.props.changeToBoardsPage()}>Create new board</button> }


                  {/* <div className="view-non-dairy-option-page-buttons">  
                    <button onClick={() => this.props.changeToNonDairyOptionPage(id)}>View Page</button>
                  </div> */}
              </div>

            </div> }

        </div>
        </div>
      </div>
    )
  }
}