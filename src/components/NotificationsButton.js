import React, { Component } from 'react'
import NotificationsList from './NotificationsList'
import Popup from "reactjs-popup";
import axios from 'axios'

export default class NotificationsButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      requestsNumber: 0,
      notificationsOpen: false
    }

    this.openNotificationsModal = this.openNotificationsModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.getRequestsNumber()
  }

  getRequestsNumber = () => {
    console.log('hello')
    axios.get(
      `${process.env.REACT_APP_API_URL}/requestsbyuser/${localStorage['id']}`
    )
    .then(response => {
      this.setState({ requestsNumber: response.data.length })
    })
  }

  openNotificationsModal = () => {
    this.setState({
      notificationsOpen: true
    })
  }

  closeModal() {
    this.getRequestsNumber()
    setTimeout(() => {
      this.props.onClose()
      this.setState({ notificationsOpen: false })
    }, 20)
  }

  render() {
    return (
      <article>
        <button
          id='notifications-button'
          className='custom-button'
          onClick={this.openNotificationsModal}
        >
          Notifications ({this.state.requestsNumber})
        </button>
        <Popup
          open={this.state.notificationsOpen}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <NotificationsList />
        </Popup>
      </article>
    )
  }
}
