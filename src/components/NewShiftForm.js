import React, { Component } from 'react'
import axios from 'axios'

export default class NewShiftForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startYear: "",
      startMonth: "",
      startDay: "",
      startHour: ""
    }
  }

  render() {
    return (
      <form id='new-shift-form'>
        <input id='new-shift-start-year-entry' type='text' name='startYear' placeholder='Start year' />
        <input id='new-shift-start-month-entry' type='text' name='startMonth' placeholder='Start month' />
        <input id='new-shift-start-day-entry' type='text' name='startDay' placeholder='Start day' />
        <input id='new-shift-start-hour-entry' type='text' name='startHour' placeholder='Start hour' />
        <input id='new-shift-duration-entry' type='text' name='shiftDuration' placeholder='Shift duration (hours)' />
      </form>
    )
  }
}
