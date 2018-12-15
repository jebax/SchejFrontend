import React, { Component } from 'react'
import '../flatpickr-custom.css'
import Flatpickr from 'react-flatpickr'
import axios from 'axios'

export default class NewShiftForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDate: null,
      startDate: null,
      endDate: null
    }
  }

  componentWillMount() {
    this.setState({
      currentDate: this.formatDate(12),
      startDate: this.formatDate(12),
      endDate: this.formatDate(20)
    })
  }

  formatDate = hours => {
    return new Date(new Date().setHours(new Date().getHours() + hours))
  }

  handleSubmit = event => {
    event.preventDefault()
    this.createNewShiftRequest()
  }

  createNewShiftRequest = () => {
    let stateCopy = this.state
    console.log(stateCopy)
    axios.post(
      `${process.env.REACT_APP_API_URL}/shifts`, {
        user_id: localStorage['id'],
        title: localStorage['name'],
        email: localStorage['email'],
        start_time: stateCopy.startDate.getTime(),
        end_time: stateCopy.endDate.getTime()
      }
    )
    .then(response => {
      this.props.history.push('/')
      this.props.history.push('/shifts')
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div id='new-shift-form'>
        <h3 className='popup-title'>Add a new shift</h3>
        <p className='new-shift-label'>Shift start:</p>
        <Flatpickr data-enable-time
          value={this.state.currentDate}
          onChange={startDate => { this.setState({ startDate: startDate[0] }) }}
          options={{minDate: this.state.currentDate}}
        />
        <br />
        <p className='new-shift-label'>Shift end:</p>
        <Flatpickr data-enable-time
          value={this.state.endDate}
          onChange={endDate => { this.setState({ endDate: endDate[0] }) }}
          options={{minDate: this.state.startDate}}
        />
        <br />
        <form className='new-shift-form' onSubmit={this.handleSubmit}>
          <button id='new-shift-submit' className='custom-button'>Submit</button>
        </form>
      </div>
    )
  }
}
