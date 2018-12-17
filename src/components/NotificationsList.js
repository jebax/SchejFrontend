import React, { Component } from 'react'
import axios from 'axios'

export default class NotificationsList extends Component {
  constructor(props) {
  super(props)
  this.state = {
    requests: [
      {
        requesterId: '2',
        approved: false,
        declined: false
      },
      {
        requesterId: '3',
        approved: false,
        declined: false
      }
    ]}
  }

  handleApprove = (event) => {
    const index = event.target.attributes.index.value
    let requests = [...this.state.requests]
    let request = {...requests[index]}
    request.approved = true
    requests[index] = request
    this.setState({requests})
  }
  handleDecline = (event) => {
    const index = event.target.attributes.index.value
    let requests = [...this.state.requests]
    let request = {...requests[index]}
    request.declined = true
    requests[index] = request
    this.setState({requests})
  }

  formatRequestContent = () => {
    return this.state.requests.map((request, index) => {
      if (request.approved) {
        return <div key={index}><span>Thanks! Your shifts have been swapped.</span></div>
      } else if (request.declined){
        return <div key={index}><span>You have declined to swap.</span></div>
      } else {
        return (
          <div key={index}>
            <span>{this.state.requests[index].requesterId} wants to swap shifts with you.</span>
            <button id="approve-swap-button" className="custom-button" index={index} onClick={this.handleApprove}>Approve</button>
            <button id="decline-swap-button" className="custom-button" index={index} onClick={this.handleDecline}>Decline</button>
          </div>

        )

      }
    })
  }

  render() {
    return(
      <div>
        {this.formatRequestContent()}
      </div>
  )}
}
