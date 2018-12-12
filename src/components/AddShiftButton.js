import React, { Component } from 'react'

export default class AddShiftButton extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.history.push("/shifts/new")
  }

  render() {
    console.log(this.props)
    return(
      <button id="add-shift-button" onClick={this.handleClick}>Add Shift</button>
    )
  }
}
