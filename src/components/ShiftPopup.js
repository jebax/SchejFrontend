import React, { Component } from "react";
import Popup from "reactjs-popup";
import RequestSwapForm from "./RequestSwapForm";

export default class ShiftPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formatStart: '',
      formatEnd: '',
      showingRequestForm: false
    }
  }
  componentWillMount() {
    console.log(this.props);
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

  render() {
    if (this.state.showingRequestForm) {
      return (
        <div id='request-swap'>
          <h3 id='shift-swap-title'>Request a shift swap</h3>
          <RequestSwapForm
            shiftInfo = {this.props.shiftInfo}
            history={this.props.history}
          />
        </div>
      )
    } else {
      return(
        <div id='shift-popup'>
          <h3 id='shift-swap-title'>Shift Information</h3>
          <div className='shift-info'>
            <p className='shift-info-label'>Employee name:</p>
            <p className='shift-info-entry'>{this.props.shiftInfo.title}</p>
          </div>
          <div className='shift-info'>
            <p className='shift-info-label'>Contact email address:</p>
            <p className='shift-info-entry'>{this.props.shiftInfo.email}</p>
          </div>
          <div className='shift-info'>
            <p className='shift-info-label'>Start time:</p>
            <p className='shift-info-entry'>{this.state.formatStart}</p>
          </div>
          <div className='shift-info'>
            <p className='shift-info-label'>End time:</p>
            <p className='shift-info-entry'>{this.state.formatEnd}</p>
          </div>
          <br />
          <section id='toggle-popup-state'>
            <button id='toggle-popup-content' className='custom-button' onClick={this.changeState}>Request shift swap</button>
          </section>
        </div>
      )
    }
  }
}
