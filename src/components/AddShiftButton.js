import React, { Component } from 'react'

export default class AddShiftButton extends Component {
  handleClick = () => {
    this.props.history.push("/shifts/new")
  }

  render() {
    return(
      <button id="add-shift-button" onClick={this.handleClick}>Add Shift</button>
    )
  }
}
