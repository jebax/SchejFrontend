import React, { Component } from 'react'
import axios from 'axios'
import Popup from "reactjs-popup";

export default class RequestSwapForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      chosenShift: '',
      userShift: "",
      userShifts: []
    }
  }

  componentWillMount() {
    axios.get(
      `${process.env.REACT_APP_API_URL}/shiftsbyuser/${localStorage['id']}`
    )
    .then(response => {
      this.setState({
        userShifts: response.data,
        chosenShift: this.props.shiftInfo.shiftId
      })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.patch(
      `${process.env.REACT_APP_API_URL}/shifts/${this.state.userShift}?other_id=${this.state.chosenShift}`
    )
    .then(response => {
      console.log('hello')
      this.props.history.push('/')
      this.props.history.push('/shifts')
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    setTimeout(() => {
      console.log(this.state)
    }, 100)
  }

  formatDate = (time) => {
    return new Date(parseInt(time)).toLocaleString('en-GB')
  }

  render() {
    return(
      <form id="request-swap-form" onSubmit={this.handleSubmit}>
        <span className='shift-info-label'>Select a shift:</span>
        <select className="menu" name="userShift" onChange={this.handleChange} value={this.state.userShift}>
          <option className='menu-item'>My shifts</option>
          {this.state.userShifts.map( (shift, index) => {
            if (new Date(parseInt(shift.start_time)) > new Date()) {
              return <option className="menu-item" key={index} value={shift.id}>{this.formatDate(shift.start_time)}-{this.formatDate(shift.end_time)}</option>
            }
          })}
        </select>
        <br />
        <button id='confirm-swap-request-form' className='custom-button'>Confirm</button>
      </form>
    )
  }
}
