import React, { Component } from 'react'
import axios from 'axios'

export default class NewShiftForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startYear: "",
      startMonth: "",
      startDay: "",
      startHour: "",
      shiftDuration: "",
      formattedDate: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.formatDate()
    this.createNewShiftRequest()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createNewShiftRequest = () => {
    const self = this
    axios.post(
      'http://localhost:3001/api/v1/shifts', {
        title: localStorage['email'],
        start_date: this.state.formattedDate.getTime(),
        end_date: this.state.formattedDate.setHours(this.state.formattedDate.getHours()+this.state.shiftDuration)
      }
    )
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  formatDate = () => {
    this.setState({
      formattedDate: new Date(this.state.startYear, this.state.startMonth, this.state.startDay, this.state.startHour)
    })
  }



  render() {
    return (
      <form className='new-shift-form' onSubmit={this.handleSubmit}>
        <input id='new-shift-start-year-entry' type='text' name='startYear' placeholder='Start year' onChange={this.handleChange} />
        <input id='new-shift-start-month-entry' type='text' name='startMonth' placeholder='Start month' onChange={this.handleChange} />
        <input id='new-shift-start-day-entry' type='text' name='startDay' placeholder='Start day' onChange={this.handleChange} />
        <input id='new-shift-start-hour-entry' type='text' name='startHour' placeholder='Start hour' onChange={this.handleChange} />
        <input id='new-shift-duration-entry' type='text' name='shiftDuration' placeholder='Shift duration (hours)' onChange={this.handleChange} />
        <button id='new-shift-submit'>Submit</button>
      </form>
    )
  }
}
