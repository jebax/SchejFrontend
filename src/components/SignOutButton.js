import React, { Component } from 'react'
import axios from 'axios'
import { deleteAuthStorage } from '../actions/authentication'

export default class SignOutButton extends Component {

  handleClick = () => {
    let self = this
    axios.delete(
      `${process.env.REACT_APP_API_URL}/sign_out`,
      {
        authentication_token: localStorage['authenticationToken']
      }
    )
    .then(response => {
      deleteAuthStorage()
      self.props.history.push('/')
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <button
        id='sign-out-button'
        className='custom-button'
        onClick={this.handleClick}
      >
        Sign Out
      </button>
    )
  }
}
