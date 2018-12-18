import React, { Component } from 'react'
import axios from 'axios'

export default class NewShiftForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      comment: ''
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    axios.post(
      `${process.env.REACT_APP_API_URL}/emergency_requests`, {
        emergency_shift_id: this.props.shiftInfo.shiftId,
        comment: this.state.comment
      })
      .then(response => {
        this.props.history.push('/')
        this.props.history.push('/shifts')
      })
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
