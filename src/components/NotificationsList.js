import React, { Component } from 'react'
import axios from 'axios'

export default class NotificationsList extends Component {
  constructor(props) {
  super(props)
  this.state = {
    requests: [
      {
        requesterId: '2',
      }
    ]}
  }

  render() {
    return(
      <div>
        <span>{this.state.requests[0].requesterId} wants to swap shifts with you.</span>
      </div>
    )
  }

}
