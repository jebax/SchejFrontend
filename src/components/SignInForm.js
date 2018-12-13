import React, { Component } from 'react'
import IndexTitle from './IndexTitle'
import axios from 'axios'
import { setAuthStorage } from '../actions/authentication'

export default class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      authenticationToken: localStorage['authenticationToken']
    }
}

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.createUserRequest()
  }

  createUserRequest = () => {
    const self = this
    axios.post(
      'http://localhost:3001/api/v1/sign_in',
      {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response)
        if (response.data['error']){
          alert('Wrong email or password')
        } else {
          setAuthStorage(response.data)
          self.props.history.push('/shifts')
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    redirectSignUp = () => {
      this.props.history.push('/sign_up')
    }

    isValidated = () => {
      return this.state.email.length > 0 && this.state.password.length > 0
    }

    render() {
      return (
        <div id='sign-in-page'>
          <IndexTitle />
          <form className='sign-in-form' onSubmit={this.handleSubmit}>
            <input id='sign-in-email-entry' className='sign-in-entry' type='text' name='email' placeholder='Email' onChange={this.handleChange} /><br />
            <input id='sign-in-password-entry' className='sign-in-entry' type='password' name='password' placeholder='Password' onChange={this.handleChange} /><br />
            <button id='sign-in-submit' className='custom-button' disabled={!this.isValidated()}>Submit</button>
          </form>
          <button id='sign-up-button' className='custom-button' onClick={this.redirectSignUp}>Sign Up</button>
        </div>
      )
    }
    }
