import React, { Component } from 'react'
import axios from 'axios'

export default class NewShiftForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      emergencyShift: '',
      comment: ''
    }
  }

  render() {
    return(
      <form id="emergency-request-form" onSubmit={this.handleSubmit}>
        <input id="comment" type="text" placeholder="comment" onChange={this.handleChange} />
        <button id="confirm-emergency-request" className='custom-button'>Confirm</button>
      </form>
    )
  }


}
