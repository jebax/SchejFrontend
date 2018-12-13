import React, { Component } from "react";
import Popup from "reactjs-popup";

export default class ShiftPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formatStart: '',
      formatEnd: ''
    }
  }
  componentWillMount() {
    console.log(this.props);
    this.setState({
      formatStart: this.props.shiftInfo.start.toLocaleString("en-GB"),
      formatEnd: this.props.end.toLocaleString("en-GB")
    })
  }
  render() {
    return(
      <div>
      <ul>
      <li>Contact email address: {this.props.shiftInfo.title}</li>
      <li>Start time: {this.state.formatStart}</li>
      </ul>
      </div>
    )

  }


}
