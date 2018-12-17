import React, { Component } from 'react'
import axios from 'axios'

export default class NotificationsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: []
    }
  }

  componentWillMount() {
    axios.get(
      `${process.env.REACT_APP_API_URL}/requestsbyuser/${localStorage['id']}`
    )
    .then(response => {
      this.setState({ requests: response.data })
    })
    .then(response => {
      console.log(this.state)
    })
  }

  handleApprove = (event) => {
    const index = event.target.attributes.index.value
    let requests = [...this.state.requests]
    let request = {...requests[index]}
    request.approved = true
    requests[index] = request
    this.setState({requests})

    axios.patch(
      `${process.env.REACT_APP_API_URL}/shifts/${this.state.requests[index].currentShift.id}?other_id=${this.state.requests[index].requestedShift.id}`
    )
    .then(response => {
      console.log('hello')
    })

    this.deleteRequest(this.state.requests[index].id)
  }

  handleDecline = (event) => {
    const index = event.target.attributes.index.value
    let requests = [...this.state.requests]
    let request = {...requests[index]}
    request.declined = true
    requests[index] = request
    this.setState({requests})

    this.deleteRequest(this.state.requests[index].id)
  }

  deleteRequest = (requestId) => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}/requests/${requestId}`
    )
    .then(response => {
      console.log('hi')
    })
    .catch(error => {
      console.log(error)
    })
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
            <span>{this.state.requests[index].requestedShift.name} wants to swap shifts with you.</span>
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
        <h3 className='popup-title'>Notifications</h3>
        <div id='notifications-list'>
          {this.formatRequestContent()}
        </div>
      </div>
  )}
}
