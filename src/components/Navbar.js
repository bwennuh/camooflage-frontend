import React, { Component } from 'react';

export default class Home extends Component {

  state = {
    user: this.props.user
  }

  render(){
    return(
      <div className="home-page">
        <div>
          <h1>NAVBAR</h1>
        </div>
      </div>
    )
  }
}