import React, { Component } from "react";
import RequestSwapForm from "./RequestSwapForm";
import EmergencyRequestForm from "./EmergencyRequestForm";

export default class ShiftPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formatStart: '',
      formatEnd: '',
      showingRequestForm: false,
      showingEmergencyForm: false
    }
  }
  componentWillMount() {
    this.setState({
      formatStart: this.props.shiftInfo.start.toLocaleString("en-GB"),
      formatEnd: this.props.shiftInfo.end.toLocaleString("en-GB")
    })
  }

  changeState = () => {
    this.setState({
      showingRequestForm: true
    })
  }

  emergencyRequest = () => {
    this.setState({
      showingEmergencyForm: true
    })
  }

  formatEmergencyRequest = () => {
    if (this.props.shiftInfo.userId === parseInt(localStorage['id'])) {
      return(
        <button id='toggle-emergency-popup-content' className='custom-button' onClick={this.emergencyRequest}>Request emergency cover</button>
    )}
  }

  render() {
    if (this.state.showingRequestForm) {
      return (
        <div id='request-swap'>
          <h3 className='popup-title'>Request a shift swap</h3>
          <RequestSwapForm
            shiftInfo = {this.props.shiftInfo}
            history={this.props.history}
          />
        </div>
      )
    } else if (this.state.showingEmergencyForm) {
        return (
          <div id='emergency-request'>
            <h3 className='popup-title'>Emergency Request Form</h3>
            <EmergencyRequestForm
              shiftInfo = {this.props.shiftInfo}
              history={this.props.history}
            />
          </div>
        )
    } else {
      return(
        <div id='shift-popup'>
          <h3 className='popup-title'>Shift Information</h3>
          <div className='shift-info'>
            <p className='shift-info-label'>Employee name:</p>
            <p className='shift-info-entry'>{this.props.shiftInfo.title}</p>
          </div>
          <br />
          <div className='shift-info'>
            <p className='shift-info-label'>Contact email address:</p>
            <p className='shift-info-entry'>{this.props.shiftInfo.email}</p>
          </div>
          <br />
          <div className='shift-info'>
            <p className='shift-info-label'>Start time:</p>
            <p className='shift-info-entry'>{this.state.formatStart}</p>
          </div>
          <br />
          <div className='shift-info'>
            <p className='shift-info-label'>End time:</p>
            <p className='shift-info-entry'>{this.state.formatEnd}</p>
          </div>
          <br />
          <section id='toggle-popup-state'>
            <button id='toggle-popup-content' className='custom-button' onClick={this.changeState}>Request shift swap</button>
            {this.formatEmergencyRequest()}
          </section>
        </div>
      )}
    }
}
