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
      <form id="request-swap-form">
        <select className="menu" name="userShift" onChange={this.handleChange} value={this.state.chosenShift}>
          {this.state.userShifts.map( (shift, index) => {
            return <option className="menu-item" key={index} value={shift.id}>{this.formatDate(shift.start_time)}-{this.formatDate(shift.end_time)}</option>
          } )}
        </select>
      </form>
    )
  }
}
