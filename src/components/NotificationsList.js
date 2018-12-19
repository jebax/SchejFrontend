import React, { Component } from 'react'
import axios from 'axios'

export default class NotificationsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: [],
      emergencies: []
    }
  }

  componentWillMount() {
    axios.get(
      `${process.env.REACT_APP_API_URL}/requestsbyuser/${localStorage['id']}`
    )
    .then(response => {
      this.setState({ requests: response.data })
    })

    setTimeout(() => {
      axios.get(
        `${process.env.REACT_APP_API_URL}/emergency_requests?user_id=${localStorage['id']}`
      )
      .then(response => {
        console.log(response)
        this.setState({ emergencies: response.data })
      })
    }, 20)
  }

  handleEmergencyApprove = (event) => {
    const index = event.target.attributes.index.value
    let emergencies = [...this.state.emergencies]
    let emergency = {...emergencies[index]}
    emergency.approved = true
    emergencies[index] = emergency
    this.setState({emergencies})

    axios.patch(
      `${process.env.REACT_APP_API_URL}/emergencyshift/${this.state.emergencies[index].shiftId}`, {
        respondent_id: localStorage['id']
      }
    )

    this.deleteEmergencyRequest(this.state.emergencies[index].id)
  }

  handleApprove = (event) => {
    const index = event.target.attributes.index.value
    let requests = [...this.state.requests]
    let request = {...requests[index]}
    request.approved = true
    requests[index] = request
    this.setState({requests})

    axios.patch(
      `${process.env.REACT_APP_API_URL}/shifts/${this.state.requests[index].requesterShift.id}?other_id=${this.state.requests[index].respondentShift.id}`
    )
    .then(response => {
      console.log(response)
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

  deleteEmergencyRequest = (emergencyId) => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}/emergency_requests/${emergencyId}`
    )
  }

  deleteRequest = (requestId) => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}/requests/${requestId}`
    )
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  formatDate = (time) => {
    return new Date(parseInt(time)).toLocaleString("en-GB", { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'})
  }

  formatEmergencyRequestContent = () => {
    return this.state.emergencies.map((emergency, index) => {
      if (emergency.approved) {
        return <div id="emergency-box" key={index}><span>Thanks! You have now taken on this shift. You are a hero!</span></div>
      } else {
      return (
        <div id="emergency-box" key={index}>
          <span id="emergency-message">Comment: {this.state.emergencies[index].comment}</span><br />
          <span>{this.state.emergencies[index].name} has an emergency and cannot make their shift on </span>
          <span>{this.formatDate(this.state.emergencies[index].start)} until </span>
          <span>{this.formatDate(this.state.emergencies[index].end)}</span><br />
          <button id="approve-emergency-button" className="custom-button" index={index} onClick={this.handleEmergencyApprove}>Approve</button><br /><br />
        </div>
      )
    }
    })
  }

  formatRequestContent = () => {
    return this.state.requests.map((request, index) => {
      if (request.approved) {
        return <div id="approve-notification-box" key={index}><span>Thanks! Your shifts have been swapped.</span></div>
      } else if (request.declined){
        return <div id="decline-notification-box" key={index}><span>You have declined to swap.</span></div>
      } else {
        return (
          <div id="notification-box" key={index}>
            <span id="notification-message"><b>{this.state.requests[index].requesterShift.name}</b> wants to swap shifts with you.</span><br />
            <span id="requester-shift-details">Their shift: {this.formatDate(this.state.requests[index].requesterShift.start)} - {this.formatDate(this.state.requests[index].requesterShift.end)}</span><br />
            <span id="respondent-shift-details">Your shift: {this.formatDate(this.state.requests[index].respondentShift.start)} - {this.formatDate(this.state.requests[index].respondentShift.end)}</span><br />
            <button id="approve-swap-button" className="custom-button" index={index} onClick={this.handleApprove}>Approve</button>
            <button id="decline-swap-button" className="custom-button" index={index} onClick={this.handleDecline}>Decline</button><br /><br />
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
          <span><b>Emergency Requests:</b></span>
          <br />
          {this.formatEmergencyRequestContent()}
        </div>
      </div>
  )}
}
