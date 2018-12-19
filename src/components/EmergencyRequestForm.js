import React, { Component } from 'react'
import axios from 'axios'

export default class EmergencyRequestForm extends Component {
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
        <label className='shift-info-label' for='comment'>Comment:</label>
        <input className='shift-info-entry' id="comment" type="text" name="comment" placeholder="Why do you need to swap?" onChange={this.handleChange} /><br /><br />
        <section id='confirm-emergency'>
          <button id="confirm-emergency-request" className='custom-button'>Confirm</button>
        </section>
      </form>
    )
  }
}
